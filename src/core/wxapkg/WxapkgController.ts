import { info } from '@utils/colors'
import { BaseLogger } from '@utils/logger'
import { BaseError } from '@utils/exceptions'
import { flashDisk } from '@baseController/SaveController'
import { getConfig, getInnerConfig } from '@baseController/ConfigController'
import { WorkerController } from '@baseController/WorkerController'
import { PathController, ProduciblePath } from '@baseController/PathController'
import { TraverseVisitorKeys } from './types'
import { WxapkgDecompiler } from './WxapkgDecompiler'
import { WxapkgWxmlParser } from './WxapkgWxmlParser'
import { WxapkgAppConfigParser } from './WxapkgAppConfigParser'
import { createExposed, traverseModule } from './worker'

export class WxapkgError extends BaseError {}
export type ParsersKey = TraverseVisitorKeys | 'WxmlParserV1'
export type TraverseData = {
  source: string
  visitors: ParsersKey[]
  decompiler?: WxapkgDecompiler
}
export type TraverseExposed = ReturnType<typeof createExposed>
export interface WxapkgControllerOptions {
  wxapkgList: ProduciblePath[]
  wxAppId?: string
  mainSaveDir?: ProduciblePath
}

export class WxapkgController extends BaseLogger {
  private readonly decompilers: WxapkgDecompiler[]
  private readonly mainSaveDir: PathController
  // 解析结果的Promise
  private readonly parsersPromise: Promise<void>[]
  constructor(wxapkgList: ProduciblePath[])
  constructor(...wxapkgList: ProduciblePath[])
  constructor(options: WxapkgControllerOptions)
  constructor(v: WxapkgControllerOptions | ProduciblePath[] | ProduciblePath) {
    super()
    const options: WxapkgControllerOptions = Object.create(null)
    if (Array.isArray(v)) options.wxapkgList = v
    else Object.assign(options, v)
    const { wxapkgList, mainSaveDir, wxAppId } = options
    if (mainSaveDir) this.mainSaveDir = PathController.make(mainSaveDir)
    if (!wxapkgList.length) WxapkgError.throw(`No wxapkg available`)
    // 初始化反编译器
    this.decompilers = wxapkgList.map((p) => {
      const decompiler = new WxapkgDecompiler(p)
      wxAppId && decompiler.setExtractorWxAppId(wxAppId)
      return decompiler
    })
    this.parsersPromise = []
  }

  extractorSave() {
    // 保存之前清理一下之前的结果
    this.clearOldResult()
    // 保存提取之后的结果
    this.decompilers.forEach((d) => d.extractorSave())
  }
  extract(isNoParse: boolean) {
    // 提取文件
    this.decompilers.forEach((d) => d.extract())
    // 不解析直接保存结果
    if (isNoParse) return this.extractorSave()
    // 检测主包
    let mainDecompiler: WxapkgDecompiler
    this.decompilers.forEach((d) => {
      if (d.isMainPackage) {
        if (mainDecompiler) WxapkgError.throw(`There can only be one main package`)
        mainDecompiler = d
      }
    })
    // 不存在主包直接保存结果
    if (!mainDecompiler) return this.extractorSave()
    // 存在主包把其他子包的保存路径指向主包
    if (this.mainSaveDir) {
      const output = this.mainSaveDir
      mainDecompiler.saveDir = output
      if (output.isDirectory && output.deepListDir(1).length) {
        if (!getConfig('WxClearOutput'))
          WxapkgError.throw(`This output path is not empty, please use ${info('--clear-output')} force cleanup`)
        mainDecompiler.saveDir.rmrfSync()
      }
    }
    this.decompilers.forEach((d) => {
      if (d === mainDecompiler) return
      // 小程序插件暂时不能放到主包内
      if (d.isAppPlugin) return
      d.saveDir = mainDecompiler.saveDir
    })
    this.extractorSave()
  }

  clearOldResult() {
    if (!getConfig('WXClearSave')) return
    Array.from(new Set(this.decompilers.map((d) => d.saveDir))).forEach((ctrl) => {
      ctrl.rmrfSync()
      this.logger.debug(`Cleaned old result ${ctrl.logpath}`)
    })
  }

  async invokeTraverseWorker(): Promise<void> {
    const forEachVisitors = (decompiler: WxapkgDecompiler, visitors: ParsersKey[], exposed: TraverseExposed) => {
      const seen = new Set()
      visitors.forEach((key) => {
        if (key === 'WxmlParserV1') {
          const wxml = decompiler.parsers.WxmlParserV1 as WxapkgWxmlParser
          return wxml.parseV1()
        }
        if (key === 'AppConfigService') {
          const appConfig = decompiler.parsers.AppConfigService as WxapkgAppConfigParser
          if (appConfig.isGame) return appConfig.parseGame()
        }
        const parserLike = decompiler.parsers[key]
        exposed.setVisitor(key)
        !seen.has(parserLike) && this.parsersPromise.push(parserLike.parse(exposed.observable()))
        seen.add(parserLike)
      })
    }
    const results = await Promise.all(this.decompilers.map((d) => d.makeParserTraverse()))
    const temp: TraverseData[] = []
    results.forEach((items) => {
      if (!items) return
      temp.push(...items)
    })
    const tasks = temp.filter(Boolean)
    if (!tasks.length) {
      this.logger.warn('No task to traverse')
      return
    }
    if (tasks.length === 1) {
      const { decompiler, visitors, source } = tasks[0]
      const exposed = createExposed()
      forEachVisitors(decompiler, visitors, exposed)
      await exposed.startTraverse(source)
    } else {
      const wCtrl = new WorkerController<TraverseExposed, void>(traverseModule)
      tasks.forEach((item) => {
        const { decompiler, visitors, source } = item
        wCtrl.addTask((exposed) => {
          exposed.initWorker(getInnerConfig())
          forEachVisitors(decompiler, visitors, exposed)
          return exposed.startTraverse(source)
        })
      })
      await wCtrl.start(true)
    }
  }

  async saveFiles() {
    await Promise.all(this.parsersPromise)
    this.decompilers.forEach((d) => d.save())
    await flashDisk()
  }

  async exploit() {
    const isParse = getConfig('WXParse')
    this.extract(!isParse)
    isParse && (await this.invokeTraverseWorker())
    await this.saveFiles()
  }
}

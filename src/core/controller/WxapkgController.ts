import { WxapkgKeyFile, WxapkgType } from '@/enum'
import { WxapkgExtractor } from '@core/extractor/WxapkgExtractor'
import { BaseLogger } from '@utils/logger'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { WxssParser } from '@core/parser/wxapkg/WxssParser'
import { WxmlParser } from '@core/parser/wxapkg/WxmlParser'
import { ScriptParser } from '@core/parser/wxapkg/ScriptParser'
import { AppConfigParser } from '@core/parser/wxapkg/AppConfigParser'
import { matchScripts } from '@utils/matchScripts'
import { ParserLike, TraverseVisitorKeys, TVSubjectType } from '@core/parser/wxapkg/types'
import { createExposed, traverseModule } from '@core/workers/traverse'
import { Saver } from '@utils/classes/Saver'
import { WorkerController } from '@core/controller/WorkerController'
import { BaseError } from '@utils/exceptions'
import { getConfig, getInnerConfig } from '@core/controller/ConfigController'
import { getWccVersion } from '@utils/getWccVersion'
import { Observable } from 'observable-fns'
import { flashDisk, getSaveController, saveAble2String } from '@core/controller/SaveController'
import { info } from '@utils/colors'

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
interface SetAppOptions {
  viewSource?: string
  appConfigSource?: string
  serviceSource?: string
  setAppConfig?: boolean
}

export class WxapkgDecompiler extends BaseLogger {
  // 包路径
  private readonly pathCtrl: PathController
  // 解包器
  private readonly extractor: WxapkgExtractor
  // 解析器
  readonly parsers: Record<ParsersKey, ParserLike<Observable<TVSubjectType>, Promise<void>>>
  // 解析后使用的保存器
  private readonly saver: Saver
  // 遍历列表
  private readonly traverseList: TraverseData[]
  // 是否使用 V1 版本解析器
  get isParserV1() {
    const type = this.extractor.type
    // prettier-ignore
    return (
      type === WxapkgType.APP_V1 ||
      type === WxapkgType.APP_V2 ||
      type === WxapkgType.APP_SUBPACKAGE_V1
    )
  }
  // 是否使用 V3 版本解析器
  get isParserV3() {
    const type = this.extractor.type
    return (
      type === WxapkgType.APP_V3 ||
      type === WxapkgType.APP_V4 ||
      type === WxapkgType.APP_SUBPACKAGE_V2 ||
      type === WxapkgType.APP_PLUGIN_V1
    )
  }
  // 是否是主包
  get isMainPackage() {
    return this.extractor.isMainPackage
  }
  // 是否是子包
  get isSubpackage() {
    return this.extractor.isSubpackage
  }
  get isAppPlugin() {
    return this.extractor.isAppPlugin
  }
  // 当前包路径
  get path(): PathController {
    return this.pathCtrl
  }
  // 源码目录
  get sourceDir(): PathController {
    return this.extractor.sourceDir
  }
  // 保存的目录
  get saveDir(): PathController {
    return this.saver.saveDirectory
  }
  set saveDir(dir: ProduciblePath) {
    dir = dir || this.path.whitout()
    this.extractor.setSaver(dir)
    this.saver.saveDirectory = dir
  }

  constructor(path: ProduciblePath) {
    super()
    this.pathCtrl = PathController.make(path)
    // 默认保存路径为 path.whitout()
    this.extractor = new WxapkgExtractor({ path: this.path })
    this.saver = new Saver(this.extractor.saveDirectory)
    this.parsers = Object.create(null)
    this.traverseList = []
  }
  setExtractorWxAppId(appid: string) {
    this.extractor.setWxAppId(appid)
  }
  extract() {
    this.extractor.extract()
  }
  extractorSave(): void {
    this.extractor.save()
  }
  async makeParserTraverse(): Promise<TraverseData[]> {
    this.initParsers()
    await this.initTraverseList()
    const list = this.traverseList.filter((item) => item.source)
    if (!list.length) this.logger.warn(`File ${this.path.logpath} no data to parse`)
    return list.map((item) => Object.assign({ decompiler: this }, item))
  }
  initParsers() {
    if (!this.extractor.extracted) return
    this.parsers.ScriptParser = new ScriptParser(this.saver)
    switch (this.extractor.type) {
      case WxapkgType.APP_V1:
      case WxapkgType.APP_V2:
      case WxapkgType.APP_V3:
      case WxapkgType.APP_V4:
      case WxapkgType.APP_SUBPACKAGE_V1:
      case WxapkgType.APP_SUBPACKAGE_V2:
      case WxapkgType.APP_PLUGIN_V1:
        {
          const wxss = new WxssParser(this.saver)
          this.parsers.WxssParser = wxss
          this.parsers.WxssParserCommon = wxss
          this.parsers.WxssParserCommon2 = wxss
          if (!this.isSubpackage) {
            this.parsers.AppConfigService = new AppConfigParser(this.saver)
          }
          if (this.isParserV1) {
            this.parsers.WxmlParserV1 = new WxmlParser(this.saver)
          } else if (this.isParserV3) {
            this.parsers.WxmlParserV3 = new WxmlParser(this.saver)
          }
        }
        break
      case WxapkgType.GAME:
        this.parsers.AppConfigService = new AppConfigParser(this.saver)
        break
      case WxapkgType.GAME_SUBPACKAGE:
      case WxapkgType.GAME_PLUGIN:
        break
    }
  }
  async initTraverseList() {
    if (!this.extractor.extracted) return
    // 源码路径
    const sourceDir = this.sourceDir
    const getSource = (keyFile: WxapkgKeyFile) => {
      const ctrl = sourceDir.join(keyFile)
      return saveAble2String(getSaveController().get(ctrl.abspath))
    }
    const setApp = async (options?: SetAppOptions) => {
      const {
        serviceSource = getSource(WxapkgKeyFile.APP_SERVICE),
        viewSource = getSource(WxapkgKeyFile.APP_WXSS),
        appConfigSource,
        setAppConfig = true,
      } = options || {}
      const wccVersion = getWccVersion(viewSource)
      if (wccVersion) {
        this.logger.info(`The package ${this.pathCtrl.logpath} wcc version is: [${info(wccVersion)}]`)
      }
      if (setAppConfig) {
        const appConfigSource$1 = appConfigSource || getSource(WxapkgKeyFile.APP_CONFIG)
        const ACParser = this.parsers.AppConfigService as AppConfigParser
        ACParser.setSources(appConfigSource$1)
        ACParser.setServiceSource(serviceSource)
        this.traverseList.push({
          source: serviceSource,
          visitors: ['AppConfigService', 'ScriptParser'],
        })
      } else {
        this.traverseList.push({
          source: serviceSource,
          visitors: ['ScriptParser'],
        })
      }
      const styleResource = [viewSource, WxssParser.getHTMLStyleSource(sourceDir)].join(';\n')
      this.traverseList.push({
        source: styleResource,
        visitors: ['WxssParser', 'WxssParserCommon', 'WxssParserCommon2'],
      })
      if (this.isParserV1) {
        this.traverseList.push({
          source: viewSource,
          visitors: ['WxmlParserV1'],
        })
        const wxml = this.parsers.WxmlParserV1 as WxmlParser
        wxml.setSource(viewSource)
      } else if (this.isParserV3) {
        this.traverseList.push({
          source: viewSource,
          visitors: ['WxmlParserV3'],
        })
      }
    }
    const setOtherScript = async (name: WxapkgKeyFile) => {
      this.traverseList.push({
        source: getSource(name),
        visitors: ['ScriptParser'],
      })
    }

    switch (this.extractor.type) {
      case WxapkgType.APP_V1:
      case WxapkgType.APP_V4:
        await setApp({ viewSource: matchScripts(getSource(WxapkgKeyFile.PAGE_FRAME_HTML)) })
        break
      case WxapkgType.APP_V2:
      case WxapkgType.APP_V3:
        await setApp()
        break
      case WxapkgType.APP_SUBPACKAGE_V1:
      case WxapkgType.APP_SUBPACKAGE_V2:
        await setApp({
          viewSource: getSource(WxapkgKeyFile.PAGE_FRAME),
          setAppConfig: false,
        })
        break
      case WxapkgType.APP_PLUGIN_V1:
        await setApp({
          viewSource: getSource(WxapkgKeyFile.PAGEFRAME),
          serviceSource: getSource(WxapkgKeyFile.APPSERVICE),
          setAppConfig: false,
        })
        break
      case WxapkgType.GAME:
        {
          const appConfigSource = getSource(WxapkgKeyFile.APP_CONFIG)
          const gameSource = getSource(WxapkgKeyFile.GAME)
          const subContext = getSource(WxapkgKeyFile.SUBCONTEXT)
          const source = [gameSource, subContext].filter(Boolean).join(';\n')
          const ACParser = this.parsers.AppConfigService as AppConfigParser
          ACParser.setSources(appConfigSource)
          ACParser.setIsGame(true)
          this.traverseList.push({
            source: source,
            visitors: ['AppConfigService'],
          })
          await setOtherScript(WxapkgKeyFile.GAME)
        }
        break
      case WxapkgType.GAME_SUBPACKAGE:
        await setOtherScript(WxapkgKeyFile.GAME)
        break
      case WxapkgType.GAME_PLUGIN:
        await setOtherScript(WxapkgKeyFile.PLUGIN)
        break
    }
  }
  save() {
    this.saver.merge()
    getConfig('WXClearDecompile') && this.cleanup()
  }
  cleanup() {
    const dirCtrl = this.sourceDir
    this.logger.debug(`Start cleaning ${dirCtrl.logpath}`)
    const unlinks = [
      '.appservice.js',
      'appservice.js',
      'app-config.json',
      'app-service.js',
      'app-wxss.js',
      'appservice.app.js',
      'common.app.js',
      'page-frame.js',
      'page-frame.html',
      'pageframe.js',
      'webview.app.js',
      'subContext.js',
      'plugin.js',
    ]
    const inst = getSaveController()
    unlinks.forEach((p) => inst.delete(dirCtrl.join(p).abspath))
  }
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
      mainDecompiler.saveDir = this.mainSaveDir
      mainDecompiler.saveDir.rmrfSync()
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
          const wxml = decompiler.parsers.WxmlParserV1 as WxmlParser
          return wxml.parseV1()
        }
        if (key === 'AppConfigService') {
          const appConfig = decompiler.parsers.AppConfigService as AppConfigParser
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

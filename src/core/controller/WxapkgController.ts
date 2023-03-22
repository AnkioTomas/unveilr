import { WxapkgKeyFile, WxapkgType } from '@/enum'
import { WxapkgExtractor } from '@core/extractor/WxapkgExtractor'
import { BaseLogger } from '@utils/logger'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { WxssParser } from '@core/parser/wxapkg/WxssParser'
import { WxmlParser } from '@core/parser/wxapkg/WxmlParser'
import { ScriptParser } from '@core/parser/wxapkg/ScriptParser'
import { AppConfigParser } from '@core/parser/wxapkg/AppConfigParser'
import { matchScripts } from '@utils/matchScripts'
import { ParserLike, TraverseVisitorKeys } from '@core/parser/wxapkg/types'
import { createExposed, traverseModule } from '@core/workers/traverse'
import { Saver } from '@utils/classes/Saver'
import { WorkerController } from '@core/controller/WorkerController'
import { unlink } from '@utils/unlink'
import { BaseError } from '@utils/exceptions'

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

export class WxapkgDecompiler extends BaseLogger {
  // 包路径
  private readonly pathCtrl: PathController
  // 包类型
  private type: WxapkgType
  // 解包器
  private readonly extractor: WxapkgExtractor
  // 解析器
  readonly parsers: Record<ParsersKey, ParserLike>
  // 解析后使用的保存器
  private readonly saver: Saver
  // 遍历列表
  private readonly traverseList: TraverseData[]
  // 是否已经提取
  private isSaveExtracted = false
  // 是否支持解析
  get isSupported() {
    this.checkTypeAvailable()
    return this.type !== WxapkgType.APP_V3 && this.type !== WxapkgType.APP_SUBPACKAGE_V2
  }
  // 是否是分包
  get isSubpackage() {
    this.checkTypeAvailable()
    return (
      this.type === WxapkgType.APP_SUBPACKAGE_V1 ||
      this.type === WxapkgType.APP_SUBPACKAGE_V2 ||
      this.type === WxapkgType.GAME_SUBPACKAGE
    )
  }
  // 是否主包
  get isMainPackage() {
    this.checkTypeAvailable()
    return (
      this.type === WxapkgType.APP_V1 ||
      this.type === WxapkgType.APP_V2 ||
      this.type === WxapkgType.APP_V3 ||
      this.type === WxapkgType.GAME
    )
  }
  // 保存的目录
  get saveDirectory(): PathController {
    return this.extractor.saveDirectory
  }
  set saveDirectory(dir: ProduciblePath) {
    dir = dir || this.path.whitout()
    this.extractor.setSaver(dir)
    this.saver.saveDirectory = dir
  }
  get path(): PathController {
    return this.pathCtrl
  }

  constructor(path: ProduciblePath) {
    super()
    this.pathCtrl = PathController.make(path)
    // 默认保存路径为 path.whitout()
    this.extractor = new WxapkgExtractor({ path: this.path })
    this.saver = new Saver(this.saveDirectory)
    this.parsers = Object.create(null)
    this.traverseList = []
  }
  setExtractorWxAppId(appid: string) {
    this.extractor.setWxAppId(appid)
  }
  async extract() {
    const type = await this.extractor.extract()
    this.type = type
    this.logger.info(`The current package type is: [${type.blue.bold}]`)
    if (!this.isSupported)
      return this.logger.error(`Currently, parsing the view structure of ${type.bgRed.white.bold} is not supported`)
    if (type === WxapkgType.FRAMEWORK) return this.logger.warn(`Running the framework does not require unpacking`)
  }
  async makeParserTraverse(): Promise<TraverseData[]> {
    await this.extractor.save()
    this.isSaveExtracted = true
    this.initParsers()
    await this.initTraverseList()
    const list = this.traverseList.filter((item) => item.source)
    if (!list.length) this.logger.warn(`File ${this.path.logpath} no data to parse`)
    return list.map((item) => Object.assign({ decompiler: this }, item))
  }
  checkTypeAvailable() {
    if (!this.type) WxapkgError.throw(`Type not available, please unpack first`)
  }
  checkIsSaveExtracted() {
    if (!this.isSaveExtracted) WxapkgError.throw(`This operation must first save the extraction results`)
  }
  initParsers() {
    this.checkIsSaveExtracted()
    this.parsers.ScriptParser = new ScriptParser(this.saver)
    switch (this.type) {
      case WxapkgType.APP_V1:
      case WxapkgType.APP_V2:
      case WxapkgType.APP_V3:
      case WxapkgType.APP_SUBPACKAGE_V1:
      case WxapkgType.APP_SUBPACKAGE_V2:
        {
          const wxss = new WxssParser(this.saver)
          this.parsers.WxssParser = wxss
          this.parsers.WxssParserCommon = wxss
          this.parsers.WxssParserCommon2 = wxss
          if (!this.isSubpackage) {
            this.parsers.AppConfigService = new AppConfigParser(this.saver)
          }
          if (this.isSupported) {
            this.parsers.WxmlParserV1 = new WxmlParser(this.saver)
          }
        }
        break
      case WxapkgType.GAME:
        this.parsers.AppConfigService = new AppConfigParser(this.saver)
        break
      case WxapkgType.GAME_SUBPACKAGE:
      case WxapkgType.PLUGIN:
        break
    }
  }
  async initTraverseList() {
    this.checkIsSaveExtracted()
    // 源码路径
    const bdc = this.extractor.getSourceDir()
    const setApp = async (source?: string, setAppConfig = true) => {
      const serviceSource = await bdc.join(WxapkgKeyFile.APP_SERVICE).read('utf8')
      if (!source) {
        source = await bdc.join(WxapkgKeyFile.APP_WXSS).read('utf8')
      }
      if (setAppConfig) {
        const appConfigSource = await bdc.join(WxapkgKeyFile.APP_CONFIG).read('utf8')
        const ACParser = this.parsers.AppConfigService as AppConfigParser
        ACParser.setSources(appConfigSource)
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
      const styleResource = [source, WxssParser.getHTMLStyleSource(bdc)].join(';\n')
      this.traverseList.push({
        source: styleResource,
        visitors: ['WxssParser', 'WxssParserCommon', 'WxssParserCommon2'],
      })
      if (this.isSupported) {
        this.traverseList.push({
          source,
          visitors: ['WxmlParserV1'],
        })
        const wxml = this.parsers.WxmlParserV1 as WxmlParser
        wxml.setSource(source)
      }
    }
    const setOtherScript = async (name: string) => {
      this.traverseList.push({
        source: await bdc.join(name).read('utf8'),
        visitors: ['ScriptParser'],
      })
    }

    switch (this.type) {
      case WxapkgType.APP_V1:
        await setApp(matchScripts(await bdc.join(WxapkgKeyFile.PAGE_FRAME_HTML).read('utf8')))
        break
      case WxapkgType.APP_V2:
      case WxapkgType.APP_V3:
        await setApp()
        break
      case WxapkgType.APP_SUBPACKAGE_V1:
      case WxapkgType.APP_SUBPACKAGE_V2:
        await setApp(await bdc.join(WxapkgKeyFile.PAGE_FRAME).read('utf8'), false)
        break
      case WxapkgType.GAME:
        {
          const appConfigSource = await bdc.join(WxapkgKeyFile.APP_CONFIG).read('utf8')
          const gameSource = await bdc.join(WxapkgKeyFile.GAME).read('utf8')
          const subContext = await bdc.join(WxapkgKeyFile.SUBCONTEXT).read('utf8')
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
      case WxapkgType.PLUGIN:
        await setOtherScript(WxapkgKeyFile.PLUGIN)
        break
    }
  }
  async save() {
    await this.saver.save(true)
    await this.cleanup()
  }
  async cleanup() {
    const dirCtrl = this.saveDirectory
    this.logger.debug(`Start cleaning ${dirCtrl.logpath}`)
    const unlinks = [
      '.appservice.js',
      'app-config.json',
      'app-service.js',
      'app-wxss.js',
      'appservice.app.js',
      'common.app.js',
      'page-frame.js',
      'page-frame.html',
      'webview.app.js',
      'subContext.js',
    ]
    await Promise.all(unlinks.map((p) => unlink(dirCtrl.join(p), true)))
  }
}

export class WxapkgController extends BaseLogger {
  private readonly decompilers: WxapkgDecompiler[]
  private readonly mainSaveDir: PathController
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
    // 初始化反编译器
    this.decompilers = wxapkgList.map((p) => {
      const decompiler = new WxapkgDecompiler(p)
      wxAppId && decompiler.setExtractorWxAppId(wxAppId)
      return decompiler
    })
  }

  async calcDecompilersSaveDir() {
    let mainDecompiler: WxapkgDecompiler
    const find = async (decompiler: WxapkgDecompiler) => {
      await decompiler.extract()
      if (decompiler.isMainPackage) {
        if (mainDecompiler) WxapkgError.throw(`There can only be one main package`)
        mainDecompiler = decompiler
      }
    }
    await Promise.all(this.decompilers.map((d) => find(d)))
    // 存在主包把其他子包的保存路径指向主包
    if (mainDecompiler) {
      if (this.mainSaveDir) {
        mainDecompiler.saveDirectory = this.mainSaveDir
        mainDecompiler.saveDirectory.rmrfSync()
      }
      for (const decompiler of this.decompilers) {
        if (decompiler !== mainDecompiler) decompiler.saveDirectory = mainDecompiler.saveDirectory
      }
    }
  }

  async invokeTraverseWorker(): Promise<void> {
    function forEachVisitors(decompiler: WxapkgDecompiler, visitors: ParsersKey[], exposed: TraverseExposed) {
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
        !seen.has(parserLike) && parserLike.parse(exposed.observable())
        seen.add(parserLike)
      })
    }
    const results = await Promise.all(this.decompilers.map((d) => d.makeParserTraverse()))
    const tasks = results.flat()
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
          forEachVisitors(decompiler, visitors, exposed)
          return exposed.startTraverse(source)
        })
      })
      await wCtrl.start(true)
    }
  }

  async saveFiles() {
    await Promise.all(this.decompilers.map((d) => d.save()))
  }

  async exploit() {
    await this.calcDecompilersSaveDir()
    await this.invokeTraverseWorker()
    await this.saveFiles()
  }
}

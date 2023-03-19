import { WxapkgKeyFile, WxapkgType } from '@/enum'
import { WxapkgExtractor, WxapkgExtractorOptions } from '@core/extractor/WxapkgExtractor'
import { BaseLogger } from '@utils/logger'
import { isProduciblePath, PathController, ProduciblePath } from '@core/controller/PathController'
import { BaseError } from '@/utils'
import { WxssParser } from '@core/parser/wxapkg/WxssParser'
import { WxmlParser } from '@core/parser/wxapkg/WxmlParser'
import { ScriptParser } from '@core/parser/wxapkg/ScriptParser'
import { AppConfigParser } from '@core/parser/wxapkg/AppConfigParser'
import { matchScripts } from '@core/utils/matchScripts'
import { ParserLike, TraverseVisitorKeys } from '@core/parser/wxapkg/types'
import { createExposed, traverseModule } from '@core/workers/traverse'
import { Saver } from '@core/utils/Saver'
import { WorkerController } from '@core/controller/WorkerController'
import { unlink } from '@utils/unlink'

export class WxapkgError extends BaseError {}
export type ParsersKey = TraverseVisitorKeys | 'WxmlParserV1'
export type TraverseData = {
  source: string
  visitors: ParsersKey[]
}
export interface WxapkgControllerOptions {
  path: ProduciblePath
  extractorOptions?: WxapkgExtractorOptions
  saveDir?: ProduciblePath
}

export class WxapkgController extends BaseLogger {
  private readonly pathCtrl: PathController
  private saver: Saver
  private readonly extractor: WxapkgExtractor
  private readonly parsers: Record<ParsersKey, ParserLike>
  private saveDir: PathController

  constructor(path: ProduciblePath)
  constructor(options: WxapkgControllerOptions)
  constructor(v: WxapkgControllerOptions | ProduciblePath) {
    super()
    if (isProduciblePath(v)) v = { path: v }
    const { path, saveDir, extractorOptions } = v
    this.pathCtrl = PathController.make(path)
    this.saveDir = saveDir ? PathController.make(saveDir) : null
    this.extractor = new WxapkgExtractor(Object.assign({ path }, extractorOptions))
    this.parsers = Object.create(null)
  }

  private isNotSupported(type: WxapkgType): boolean {
    return type === WxapkgType.APP_V3 || type === WxapkgType.APP_SUBPACKAGE_V2
  }

  private isSubPackage(type: WxapkgType): boolean {
    return (
      type === WxapkgType.APP_SUBPACKAGE_V1 ||
      type === WxapkgType.APP_SUBPACKAGE_V2 ||
      type === WxapkgType.GAME_SUBPACKAGE
    )
  }
  getSourceDir(): PathController {
    const result = this.saveDir.deepListDir().find((path) => {
      const baseName = PathController.make(path).basename
      return baseName === WxapkgKeyFile.PAGE_FRAME || baseName === WxapkgKeyFile.GAME
    })
    return PathController.dir(result)
  }

  async exploit() {
    const type = await this.extractor.extract()
    if (!type) return
    this.logger.info(`The current package type is: [${type.blue.bold}]`)
    if (this.isNotSupported(type)) {
      this.logger.error(`Currently, parsing the view structure of ${type.bgRed.white.bold} is not supported`)
    }
    this.setSaverInfo(type)
    this.setParsers(type)
    await this.extractor.save()

    // 1. 根据不同的包类型给不同的解析器设置解析内容
    const list = (await this.setParserAndContents(type)).filter((item) => item.source)
    if (!list.length) this.logger.warn(`No data to parse`)
    type Exposed = ReturnType<typeof createExposed>
    const eachExposed = (visitors: ParsersKey[], exposed: Exposed) => {
      const seen = new Set()
      visitors.forEach((key) => {
        if (key === 'WxmlParserV1') {
          const wxml = this.parsers.WxmlParserV1 as WxmlParser
          return wxml.parseV1()
        }
        if (key === 'AppConfigService') {
          const appConfig = this.parsers.AppConfigService as AppConfigParser
          if (appConfig.isGame) return appConfig.parseGame()
        }
        const parserLike = this.parsers[key]
        exposed.setVisitor(key)
        !seen.has(parserLike) && parserLike.parse(exposed.observable())
        seen.add(parserLike)
      })
    }

    if (list.length === 1) {
      const { source, visitors } = list[0]
      const exposed = createExposed()
      eachExposed(visitors, exposed)
      await exposed.startTraverse(source)
    } else {
      const wCtrl = new WorkerController<Exposed, void>(traverseModule)
      list.forEach((item) => {
        const { source, visitors } = item
        wCtrl.addTask((t) => {
          eachExposed(visitors, t)
          return t.startTraverse(source)
        })
      })
      await wCtrl.start(true)
    }
    await this.saver.save(true)
    this.cleanup()
  }

  private setParsers(type: WxapkgType) {
    this.parsers.ScriptParser = new ScriptParser(this.saver)
    switch (type) {
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
          if (!this.isSubPackage(type)) {
            this.parsers.AppConfigService = new AppConfigParser(this.saver)
          }
          if (!this.isNotSupported(type)) {
            this.parsers.WxmlParserV1 = new WxmlParser(this.saver)
          }
        }
        break
      case WxapkgType.GAME:
      case WxapkgType.GAME_SUBPACKAGE:
      case WxapkgType.PLUGIN:
        break
    }
  }
  private setSaverInfo(type: WxapkgType) {
    if (this.saveDir) {
      this.saver = new Saver(this.saveDir)
      this.extractor.setSaver(this.saveDir)
      return
    }
    const dirname = this.isSubPackage(type) ? PathController.make(this.pathCtrl.dirname) : this.pathCtrl.whitout()
    this.saver = new Saver(dirname)
    this.extractor.setSaver(dirname)
    this.saveDir = dirname
  }
  cleanup() {
    const dirCtrl = this.saveDir
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
    unlinks.forEach((p) => unlink(dirCtrl.join(p)))
  }

  async setParserAndContents(type: WxapkgType): Promise<Array<TraverseData>> {
    const bdc = this.getSourceDir()
    const traverseList: Array<TraverseData> = []

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
        traverseList.push({
          source: serviceSource,
          visitors: ['AppConfigService', 'ScriptParser'],
        })
      } else {
        traverseList.push({
          source: serviceSource,
          visitors: ['ScriptParser'],
        })
      }
      const styleResource = [source, WxssParser.getHTMLStyleSource(bdc)].join(';\n')
      traverseList.push({
        source: styleResource,
        visitors: ['WxssParser', 'WxssParserCommon', 'WxssParserCommon2'],
      })
      if (type !== WxapkgType.APP_V3 && type !== WxapkgType.APP_SUBPACKAGE_V2) {
        traverseList.push({
          source,
          visitors: ['WxmlParserV1'],
        })
        const wxml = this.parsers.WxmlParserV1 as WxmlParser
        wxml.setSource(source)
      }
    }
    const setOtherScript = async (name: string) => {
      traverseList.push({
        source: await bdc.join(name).read('utf8'),
        visitors: ['ScriptParser'],
      })
    }

    switch (type) {
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
          traverseList.push({
            source: source,
            visitors: ['ScriptParser'],
          })
        }
        break
      case WxapkgType.GAME_SUBPACKAGE:
        await setOtherScript(WxapkgKeyFile.GAME)
        break
      case WxapkgType.PLUGIN:
        await setOtherScript(WxapkgKeyFile.PLUGIN)
        break
    }
    return traverseList
  }
}

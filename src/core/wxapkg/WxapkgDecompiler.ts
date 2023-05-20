import { Observable } from 'observable-fns'
import { BaseLogger } from '@utils/logger'
import { matchScripts } from '@utils/matchScripts'
import { info } from '@utils/colors'
import { Saver } from '@utils/classes/Saver'
import { PathController, ProduciblePath } from '@baseController/PathController'
import { getConfig } from '@baseController/ConfigController'
import { getSaveController, saveAble2String } from '@baseController/SaveController'
import { getWccVersion } from './utils/getWccVersion'
import { WxapkgExtractor } from './WxapkgExtractor'
import { ParserLike, TVSubjectType } from './types'
import { WxapkgKeyFile, WxapkgType } from './WxapkgEnums'
import { ParsersKey, TraverseData } from './WxapkgController'
import { WxapkgScriptParser } from './WxapkgScriptParser'
import { WxapkgWxssParser } from './WxapkgWxssParser'
import { WxapkgAppConfigParser } from './WxapkgAppConfigParser'
import { WxapkgWxmlParser } from './WxapkgWxmlParser'

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
    if (this.extractor.isFramework) return []
    this.initParsers()
    await this.initTraverseList()
    const list = this.traverseList.filter((item) => item.source)
    if (!list.length) this.logger.warn(`File ${this.path.logpath} no data to parse`)
    return list.map((item) => Object.assign({ decompiler: this }, item))
  }
  initParsers() {
    if (!this.extractor.extracted) return
    this.parsers.ScriptParser = new WxapkgScriptParser(this.saver)
    switch (this.extractor.type) {
      case WxapkgType.APP_V1:
      case WxapkgType.APP_V2:
      case WxapkgType.APP_V3:
      case WxapkgType.APP_V4:
      case WxapkgType.APP_SUBPACKAGE_V1:
      case WxapkgType.APP_SUBPACKAGE_V2:
      case WxapkgType.APP_PLUGIN_V1:
        {
          const wxss = new WxapkgWxssParser(this.saver)
          this.parsers.WxssParser = wxss
          this.parsers.WxssParserCommon = wxss
          this.parsers.WxssParserCommon2 = wxss
          if (!this.isSubpackage) {
            this.parsers.AppConfigService = new WxapkgAppConfigParser(this.saver)
          }
          // 虽然实例一样，但是名字不一样，使用的解析器也不一样
          if (this.isParserV1) {
            this.parsers.WxmlParserV1 = new WxapkgWxmlParser(this.saver)
          } else if (this.isParserV3) {
            this.parsers.WxmlParserV3 = new WxapkgWxmlParser(this.saver)
          }
        }
        break
      case WxapkgType.GAME:
        this.parsers.AppConfigService = new WxapkgAppConfigParser(this.saver)
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
        const ACParser = this.parsers.AppConfigService as WxapkgAppConfigParser
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
      const styleResource = [viewSource, WxapkgWxssParser.getHTMLStyleSource(sourceDir)].join(';\n')
      this.traverseList.push({
        source: styleResource,
        visitors: ['WxssParser', 'WxssParserCommon', 'WxssParserCommon2'],
      })
      if (this.isParserV1) {
        this.traverseList.push({
          source: viewSource,
          visitors: ['WxmlParserV1'],
        })
        const wxml = this.parsers.WxmlParserV1 as WxapkgWxmlParser
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
          const ACParser = this.parsers.AppConfigService as WxapkgAppConfigParser
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
    if (this.extractor.isFramework) return
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

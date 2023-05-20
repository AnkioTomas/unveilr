import { BaseExtractor, ExtractorError } from '@base/BaseExtractor'
import { WxapkgDecryptor } from './WxapkgDecryptor'
import { checkMacEncryption, checkWxapkg, checkWxapkgType } from './utils/checkWxapkg'
import { WxapkgKeyFile, WxapkgType } from './WxapkgEnums'
import { PackageSuffix } from '@enum/PackageSuffix'
import { isProduciblePath, PathController, ProduciblePath } from '@baseController/PathController'
import { Saver } from '@utils/classes/Saver'
import { info, link } from '@utils/colors'

export interface WxapkgFileHeader {
  infoLength: number
  dataLength: number
}

export interface WxapkgFileInfo {
  name: string
  start: number
  end: number
}

export interface WxapkgExtractorOptions {
  path: ProduciblePath
  wxAppId?: string
  saveDir?: ProduciblePath
}

export class WxapkgExtractor extends BaseExtractor {
  private wxAppId: string
  private saver: Saver
  private wxapkgType: WxapkgType
  private sourcePath: string
  private isExtracted: boolean

  constructor(path: ProduciblePath)
  constructor(options: WxapkgExtractorOptions)
  constructor(v: WxapkgExtractorOptions | ProduciblePath) {
    if (isProduciblePath(v)) {
      super(v)
    } else {
      const { path, saveDir, wxAppId } = v
      super(path)
      this.setSaver(saveDir)
      this.wxAppId = wxAppId
    }
    this.isExtracted = false
    this.suffix = PackageSuffix.WXAPKG
  }

  // 是否提取完成
  get extracted() {
    if (!this.isExtracted) ExtractorError.throw(`Need to extract first`)
    return true
  }

  // 包类型
  get type() {
    if (!this.wxapkgType) ExtractorError.throw(`WxapkgType not available, No extract or unsupported packages`)
    return this.wxapkgType
  }

  // 是否主包
  get isMainPackage() {
    return (
      this.type === WxapkgType.APP_V1 ||
      this.type === WxapkgType.APP_V2 ||
      this.type === WxapkgType.APP_V3 ||
      this.type === WxapkgType.APP_V4 ||
      this.type === WxapkgType.GAME
    )
  }

  // 是否是分包
  get isSubpackage() {
    return (
      this.type === WxapkgType.APP_SUBPACKAGE_V1 ||
      this.type === WxapkgType.APP_SUBPACKAGE_V2 ||
      this.type === WxapkgType.GAME_SUBPACKAGE
    )
  }

  // 是否是小程序插件
  get isAppPlugin() {
    return this.type === WxapkgType.APP_PLUGIN_V1
  }

  // 是否是游戏插件
  get isGamePlugin() {
    return this.type === WxapkgType.GAME_PLUGIN
  }

  // 是否是插件
  get isPlugin() {
    return this.isAppPlugin || this.isGamePlugin
  }

  // 是否是运行框架
  get isFramework() {
    return this.type === WxapkgType.FRAMEWORK
  }

  // 设置保存的路径
  setSaver(saveDir: ProduciblePath | undefined) {
    saveDir = saveDir || this.pathCtrl.whitout()
    if (!this.saver) {
      this.saver = new Saver(saveDir)
      return
    }
    this.saver.saveDirectory = saveDir
  }

  // 设置WxAppId
  setWxAppId(appid: string) {
    this.wxAppId = appid
  }

  save() {
    this.saver.merge()
  }

  get saveDirectory() {
    return this.saver.saveDirectory
  }

  get sourceDir(): PathController {
    return this.saveDirectory.join(this.sourcePath)
  }

  // 获取文件头信息
  getFileHeader(buf: Buffer): WxapkgFileHeader {
    if (!checkWxapkg(buf)) ExtractorError.throw(`File ${this.pathCtrl.logpath} is an invalid package!`)
    const unknownInfo = buf.readUInt32BE(1)
    unknownInfo && this.logger.warn('UnknownInfo: ', unknownInfo)
    return {
      infoLength: buf.readUInt32BE(5),
      dataLength: buf.readUInt32BE(9),
    }
  }

  // 获取包内的文件信息
  getFileByRaw(buf: Buffer): WxapkgFileInfo[] {
    const fileCount = buf.readUInt32BE(0)
    this.logger.debug(`Read file count ${fileCount}`)
    let _offset = 4
    return Array(fileCount)
      .fill(0)
      .map(() => {
        const nameOffset = buf.readUInt32BE(_offset)
        _offset += 4
        const name = buf.toString('utf8', _offset, _offset + nameOffset)
        _offset += nameOffset
        const start = buf.readUInt32BE(_offset)
        _offset += 4
        const end = start + buf.readUInt32BE(_offset)
        _offset += 4
        return {
          name,
          start,
          end,
        }
      })
  }

  extractInner(buf: Buffer): void {
    const isEncrypted = buf.subarray(0, 6).toString('hex') === '56314d4d5758'
    if (isEncrypted) {
      this.logger.debug(`File ${this.pathCtrl.logpath} encrypted, Starting decrypt`)
      const buffer = WxapkgDecryptor.decryptResult(this.pathCtrl, this.wxAppId)
      return this.extractInner(buffer)
    }
    this.logger.debug(`Starting extract ${this.pathCtrl.logpath}`)
    const { dataLength, infoLength } = this.getFileHeader(buf.subarray(0, 14))
    this.logger.debug(`Header info length ${infoLength}`)
    this.logger.debug(`Header data length ${dataLength}`)
    const files = this.getFileByRaw(buf.subarray(14, infoLength + 14))
    this.logger.debug(`Starting save extracted files`)
    let isExistProjectPrivateConfig = false
    const pathList = files.map((file) => {
      const { name, start, end } = file
      const path = name.startsWith('/') ? name.slice(1) : name
      if (path === WxapkgKeyFile.PROJECT_PRIVATE_CONFIG) isExistProjectPrivateConfig = true
      this.saver.add(path, buf.subarray(start, end))
      const basename = PathController.make(path).basename
      return { path, basename }
    })
    // 如果没有配置文件则添加默认配置
    if (!isExistProjectPrivateConfig) {
      this.saver.add(WxapkgKeyFile.PROJECT_PRIVATE_CONFIG, {
        setting: {
          es6: false,
          urlCheck: false,
        },
      })
    }
    const type = checkWxapkgType(pathList.map(({ basename }) => basename))
    if (!type) this.logger.warn(`Parsed packages are not supported`)
    this.logger.info(`The package ${this.pathCtrl.logpath} type is: [${info(type)}]`)
    this.wxapkgType = type
    if (type === WxapkgType.FRAMEWORK) {
      this.logger.warn(`Running the framework does not require unpacking`)
      this.isExtracted = true
      return
    }
    const isPlugin = this.isPlugin
    let sp = null
    pathList.forEach((item) => {
      const { basename } = item
      const isAvailable =
        basename === WxapkgKeyFile.APP_SERVICE ||
        basename === WxapkgKeyFile.APPSERVICE ||
        basename === WxapkgKeyFile.GAME ||
        (isPlugin && basename === WxapkgKeyFile.PLUGIN_JSON)
      if (!isAvailable) return
      if (!sp) return (sp = item)
      const currentLen = item.path.split('/').length
      const oldLen = sp.path.split('/').length
      sp = currentLen < oldLen ? item : sp
    })
    if (!sp) ExtractorError.throw(`File ${this.pathCtrl.logpath} source directory not found`)
    this.sourcePath = PathController.make(sp.path || '.').dirname
    this.isExtracted = true
  }

  extract(save?: boolean) {
    super.extract()
    const buf = this.pathCtrl.readSync()
    if (!checkMacEncryption(buf)) {
      const target = link(info('https://github.com/TinyNiko/mac_wxapkg_decrypt'))
      ExtractorError.throw(
        `Package ${this.pathCtrl.logpath} is an encrypted package for Mac
    please use ${target} to decrypt it before using it`,
      )
    }
    this.extractInner(buf)
    save && this.save()
  }
}

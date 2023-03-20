import { BaseExtractor, ExtractorError } from './BaseExtractor'
import { WxapkgDecryptor } from '@core/decryptor/WxapkgDecryptor'
import { checkMacEncryption, checkWxapkg, checkWxapkgType } from '@utils/checkWxapkg'
import { PackageSuffix, WxapkgType } from '@/enum'
import { isProduciblePath, PathController, ProduciblePath } from '@core/controller/PathController'
import { Saver } from '@utils/classes/Saver'

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
  readonly wxAppId: string
  private saver: Saver
  private wxapkgType: WxapkgType
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
    this.suffix = PackageSuffix.WXAPKG
  }
  setSaver(saveDir: ProduciblePath | undefined) {
    saveDir = saveDir || this.pathCtrl.whitout()
    if (!this.saver) {
      this.saver = new Saver(saveDir)
      return
    }
    this.saver.saveDirectory = saveDir
  }
  getFileHeader(buf: Buffer): WxapkgFileHeader {
    checkWxapkg(buf, new ExtractorError(`File ${this.pathCtrl.logpath} is an invalid package!`))
    const unknownInfo = buf.readUInt32BE(1)
    unknownInfo && this.logger.warn('UnknownInfo: ', unknownInfo)
    return {
      infoLength: buf.readUInt32BE(5),
      dataLength: buf.readUInt32BE(9),
    }
  }
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
  async _extract(buf: Buffer): Promise<void> {
    const isEncrypted = buf.subarray(0, 6).toString('hex') === '56314d4d5758'
    if (isEncrypted) {
      this.logger.debug(`File ${this.pathCtrl.logpath} encrypted, Starting decrypt `)
      const buffer = await WxapkgDecryptor.decryptResult(this.pathCtrl, this.wxAppId)
      return this._extract(buffer)
    }
    this.logger.debug(`Starting extract ${this.pathCtrl.logpath}`)
    const { dataLength, infoLength } = this.getFileHeader(buf.subarray(0, 14))
    this.logger.debug(`Header info length ${infoLength}`)
    this.logger.debug(`Header data length ${dataLength}`)
    const files = this.getFileByRaw(buf.subarray(14, infoLength + 14))
    this.logger.debug(`Starting save extracted files`)
    files.forEach((file) => {
      const { name, start, end } = file
      const path = name.startsWith('/') ? name.slice(1) : name
      const buffer = buf.subarray(start, end)
      this.saver.add({ path, buffer })
    })
    const list = files.map((file) => PathController.make(file.name).basename)
    this.wxapkgType = await checkWxapkgType(list)
  }
  async save() {
    await this.saver.save(true)
  }

  async extract(save?: boolean): Promise<WxapkgType> {
    super.extract()
    const buf = await this.pathCtrl.read()
    if (!checkMacEncryption(buf)) {
      const target = 'https://github.com/TinyNiko/mac_wxapkg_decrypt'
      ExtractorError.throw(
        `Package ${this.pathCtrl.logpath} is an encrypted package for Mac, please use ${target} to decrypt it before using it`,
      )
    }
    await this._extract(buf)
    if (!this.wxapkgType) this.logger.warn(`Parsed packages are not supported`)
    save && (await this.save())
    return this.wxapkgType
  }
}

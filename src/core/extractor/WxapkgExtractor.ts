import { BaseExtractor, ExtractorError } from './BaseExtractor'
import { isProduciblePath, ProduciblePath } from '@core/controller'
import { WxapkgDecryptor } from '@core/decryptor/WxapkgDecryptor'
import { checkWxapkg } from '@core/utils/checkWxapkg'
import { PackageSuffix } from '@/enum'

export interface WxapkgFileHeader {
  infoLength: number
  dataLength: number
}

export interface WxapkgFileInfo {
  name: string
  start: number
  end: number
}

export type WxapkgExtractorOptions =
  | {
      path: ProduciblePath
      wxAppId?: string
      parentDir?: ProduciblePath
    }
  | ProduciblePath
export class WxapkgExtractor extends BaseExtractor {
  readonly wxAppId: string
  readonly parentDir: ProduciblePath
  savePath: string
  constructor(options: WxapkgExtractorOptions) {
    if (isProduciblePath(options)) {
      super(options)
    } else {
      const { path, parentDir, wxAppId } = options
      super(path)
      this.parentDir = parentDir
      this.wxAppId = wxAppId
    }
    this.suffix = PackageSuffix.WXAPKG
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

  async saveFiles(files: WxapkgFileInfo[], buf: Buffer) {
    this.logger.debug(`Starting save files`)
    for (const file of files) {
      const targetDir = this.pathCtrl.whitout()
      const target = targetDir.join(file.name)
      target.mkdir()
      await target.write(buf.subarray(file.start, file.end))
      this.logger.debug(`Created ${target.logpath}`)
    }
  }
  async _extract(buf: Buffer): Promise<string> {
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
    await this.saveFiles(files, buf)
    this.savePath = this.pathCtrl.whitout().abspath
    this.logger.debug(`Extracted save to ${this.savePath}`)
  }

  async extract(): Promise<void> {
    super.extract()
    const buf = await this.pathCtrl.read()
    await this._extract(buf)
  }
}

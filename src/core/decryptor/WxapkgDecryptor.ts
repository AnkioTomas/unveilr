import { BaseDecryptor, DecryptorError } from '@core/decryptor/BaseDecryptor'
import { isProduciblePath, PathController, ProduciblePath } from '@core/controller'
import { decryptBuffer } from '@/utils'
import { checkWxapkg } from '@core/utils/checkWxapkg'
import { PackageSuffix } from '@/enum'

export interface WxapkgDecryptorOptions {
  path: ProduciblePath
  wxAppId?: string
  target?: ProduciblePath
  salt?: string
  iv?: string
}

export class WxapkgDecryptor extends BaseDecryptor {
  wxAppId: string
  readonly target: PathController
  readonly salt: string
  readonly iv: string
  private decryptedBuffer: Buffer

  constructor(options: WxapkgDecryptorOptions)
  constructor(path: ProduciblePath, wxAppId?: string, target?: ProduciblePath)
  constructor(path: WxapkgDecryptorOptions | ProduciblePath, wxAppId?: string, target?: ProduciblePath) {
    let options
    if (arguments.length === 1) {
      if (isProduciblePath(path)) {
        options = { path } as WxapkgDecryptorOptions
      } else {
        options = path as WxapkgDecryptorOptions
      }
    } else {
      options = {
        path,
        wxAppId,
        target: arguments.length === 3 ? target : void 0,
      } as WxapkgDecryptorOptions
    }
    super(options.path)
    this.suffix = PackageSuffix.WXAPKG
    this.wxAppId = options.wxAppId
    this.salt = options.salt || 'saltiest'
    this.iv = options.iv || 'the\x20iv:\x2016\x20bytes'
    this.target = options.target ? PathController.make(options.target) : void 0
    this._calcWxAppId()
  }

  get result(): Buffer {
    return this.decryptedBuffer
  }

  _calcWxAppId(): void {
    if (this.wxAppId) return
    const _result = this.pathCtrl.abspath.match(/wx[a-z\d]{16}/g)
    if (!_result) throw new DecryptorError('wxAppId must be required!')
    this.wxAppId = _result[0]
    this.logger.info(`From ${this.pathCtrl.logpath} detected wxAppId: ${this.wxAppId.blue.bold}`)
  }

  checkWxAppId() {
    if (!this.wxAppId || !/^wx[a-z\d]{16}$/.test(this.wxAppId)) {
      throw new DecryptorError(`wxAppId ${this.wxAppId || ''} must be a valid wxAppId`)
    }
  }

  async decrypt(buffer?: Buffer): Promise<void> {
    super.decrypt()
    buffer = buffer || (await this.pathCtrl.read())
    this._decrypt(buffer)
  }

  private _decrypt(buffer: Buffer) {
    try {
      this.checkWxAppId()
      const wxAppId = this.wxAppId
      const header = buffer.subarray(6, 0x406)
      const contents = buffer.subarray(0x406)
      const oriHeader = decryptBuffer(header, wxAppId, this.salt, this.iv)
      const xorKey = wxAppId.length < 2 ? 0x66 : wxAppId.charCodeAt(wxAppId.length - 2)
      const oriContents = Buffer.from(contents.map((b) => b ^ xorKey))
      this.decryptedBuffer = Buffer.concat([oriHeader.subarray(0, 0x3ff), oriContents])
      checkWxapkg(this.decryptedBuffer, 'Please check if wxAppId is correct')
      this.logger.debug('Decryption successful!')
    } catch (e) {
      throw new DecryptorError('Decryption failed! ' + e.message)
    }
  }

  async save(target?: ProduciblePath): Promise<void> {
    target = target ? PathController.make(target) : this.target
    if (!target) throw new DecryptorError('If you want to save please provide target!')
    if (!this.result) throw new DecryptorError('There is no decryption result yet!')
    await target.write(this.result)
    this.logger.debug(`Decryption save to ${target.logpath}`)
  }

  static async decryptResult(options: WxapkgDecryptorOptions): Promise<Buffer>
  static async decryptResult(path: ProduciblePath, wxAppId?: string, target?: ProduciblePath): Promise<Buffer>
  static async decryptResult(o: WxapkgDecryptorOptions | ProduciblePath, wxAppId?: string): Promise<Buffer> {
    const inst = isProduciblePath(o) ? new WxapkgDecryptor(o, wxAppId) : new WxapkgDecryptor(o)
    await inst.decrypt()
    return inst.result
  }
}

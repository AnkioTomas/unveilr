import { BaseError, BaseLogger } from '@/utils'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { Saver } from '@core/utils/Saveable'

export class DecryptorError extends BaseError {}
export class BaseDecryptor extends BaseLogger {
  readonly pathCtrl: PathController
  protected suffix: string
  readonly saver: Saver
  constructor(path: ProduciblePath) {
    super()
    this.pathCtrl = PathController.make(path)
    this.saver = new Saver(this.pathCtrl.dirname)
  }

  get decipherable() {
    return this.pathCtrl.isFile && this.pathCtrl.suffixWithout === this.suffix
  }

  decrypt(): void {
    if (!this.decipherable) {
      throw DecryptorError.make(`File ${this.pathCtrl.logpath} cannot be decrypted!`)
    }
  }
}

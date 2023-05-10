import { PathController, ProduciblePath } from './controller/PathController'
import { Saver } from '@utils/classes/Saver'
import { BaseError } from '@utils/exceptions'
import { BaseLogger } from '@utils/logger'

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
      DecryptorError.throw(`File ${this.pathCtrl.logpath} cannot be decrypted!`)
    }
  }
}

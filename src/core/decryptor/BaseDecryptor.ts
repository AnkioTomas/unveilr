import { getLogger } from '@/utils'
import { Logger } from 'winston'
import { PathController, ProduciblePath } from '@core/controller/PathController'

export class DecryptorError extends Error {
  constructor(msg) {
    super(msg)
    this.name = 'DecryptorError'
  }
}

export class BaseDecryptor {
  readonly pathCtrl: PathController
  readonly logger: Logger
  protected suffix: string
  constructor(path: ProduciblePath) {
    this.pathCtrl = PathController.make(path)
    this.logger = getLogger('Decryptor')
  }

  get decipherable() {
    return this.pathCtrl.isFile && this.pathCtrl.suffixWithout === this.suffix
  }

  decrypt(): void {
    if (!this.decipherable) {
      throw new DecryptorError(`File ${this.pathCtrl.logpath} cannot be decrypted!`)
    }
  }
}

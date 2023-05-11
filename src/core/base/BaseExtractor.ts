import { PathController, ProduciblePath } from './controller/PathController'
import { BaseError } from '@utils/exceptions'
import { BaseLogger } from '@utils/logger'

export class ExtractorError extends BaseError {}
export class BaseExtractor extends BaseLogger {
  readonly pathCtrl: PathController
  protected suffix: string
  constructor(path: ProduciblePath) {
    super()
    this.pathCtrl = PathController.make(path)
  }

  get extractable() {
    return this.pathCtrl.isFile && this.pathCtrl.suffixWithout === this.suffix
  }

  extract(): void {
    if (!this.extractable) {
      ExtractorError.throw(`File ${this.pathCtrl.logpath} cannot be extracted!`)
    }
  }
}

import { BaseError, BaseLogger } from '@/utils'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { Saver } from '@core/utils/Saver'

export class ExtractorError extends BaseError {}
export class BaseExtractor extends BaseLogger {
  readonly pathCtrl: PathController
  protected suffix: string
  protected saver: Saver
  constructor(path: ProduciblePath) {
    super()
    this.pathCtrl = PathController.make(path)
    this.saver = new Saver(this.pathCtrl.whitout())
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

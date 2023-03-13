import { getLogger } from '@/utils'
import { Logger } from 'winston'
import { PathController, ProduciblePath } from '@core/controller/PathController'

export class ExtractorError extends Error {
  constructor(msg) {
    super(msg)
    this.name = 'ExtractorError'
  }
}

export class BaseExtractor {
  readonly pathCtrl: PathController
  readonly logger: Logger
  protected suffix: string
  constructor(path: ProduciblePath) {
    this.pathCtrl = PathController.make(path)
    this.logger = getLogger('Extractor')
  }

  get extractable() {
    return this.pathCtrl.isFile && this.pathCtrl.suffixWithout === this.suffix
  }

  extract(): void {
    if (!this.extractable) {
      throw new ExtractorError(`File ${this.pathCtrl.logpath} cannot be extracted!`)
    }
  }
}

import { ProduciblePath, PathController } from '@core/controller'
import { getLogger } from '@/utils'
import { Logger } from 'winston'

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

  extract(): this {
    if (!this.extractable) {
      throw new ExtractorError(`File ${this.pathCtrl.logpath} cannot be extracted!`)
    }
    return this
  }
}

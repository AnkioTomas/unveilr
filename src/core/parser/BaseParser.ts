import { BaseError, BaseLogger } from '@/utils'
import { Saver } from '@core/utils/Saver'

export class ParserError extends BaseError {}
export abstract class BaseParser extends BaseLogger {
  protected saver: Saver
  protected constructor(saver: Saver) {
    super()
    this.saver = saver
  }
  abstract parse(...args: unknown[]): unknown
}

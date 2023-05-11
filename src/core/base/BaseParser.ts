import { Saver } from '@utils/classes/Saver'
import { BaseError } from '@utils/exceptions'
import { BaseLogger } from '@utils/logger'

export class ParserError extends BaseError {}
export abstract class BaseParser extends BaseLogger {
  protected saver: Saver
  protected constructor(saver: Saver) {
    super()
    this.saver = saver
  }
  abstract parse(...args: unknown[]): unknown
}

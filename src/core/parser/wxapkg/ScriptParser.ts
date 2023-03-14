import { BaseParser } from '../BaseParser'
import { ProduciblePath } from '@core/controller/PathController'

export class ScriptParser extends BaseParser {
  constructor(path: ProduciblePath) {
    super(path)
  }

  async parse(): Promise<void> {
    return void 0
  }
}

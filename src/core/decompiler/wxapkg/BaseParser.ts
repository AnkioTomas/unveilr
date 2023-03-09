import { isProduciblePath, PathController, ProduciblePath } from '@core/controller'
import { getLogger } from '@/utils'
import { Logger } from 'winston'

export class ParserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParserError'
  }
}
export interface ParsedInfo {
  path: string
  source: string
}

export class BaseParser {
  source: string
  readonly logger: Logger
  readonly pathCtrl: PathController
  parseResult: ParsedInfo[]

  constructor(source: Buffer)
  constructor(path: ProduciblePath)

  constructor(v: unknown) {
    this.logger = getLogger('Parser')
    if (isProduciblePath(v)) {
      this.pathCtrl = PathController.make(v)
      this.source = this.pathCtrl.read('utf8') as string
    } else if (v instanceof Buffer) {
      this.source = v.toString('utf8')
    }
  }

  save(target?: ProduciblePath): this {
    target = target ? PathController.make(target) : this.pathCtrl
    if (!target) throw new ParserError('If you want to save please provide target!')
    if (!this.parseResult) throw new ParserError('No parsed result yet!')
    this.parseResult.forEach((item) => PathController.make(item.path).mkdir().write(item.source, 'utf8'))
    return this
  }

  parse(_source?: Buffer): this {
    this.source = _source ? _source.toString('utf8') : this.source
    this.parseResult = null
    return this
  }
}

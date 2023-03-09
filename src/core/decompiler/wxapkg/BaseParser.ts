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
  path: ProduciblePath
  source: unknown
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
      if (this.pathCtrl.isFile) this.source = this.pathCtrl.read('utf8') as string
    } else if (v instanceof Buffer) {
      this.source = v.toString('utf8')
    }
  }

  save(isClean?: boolean): this
  save(target?: ProduciblePath, isClean?: boolean): this
  save(v?: boolean | ProduciblePath, isClean?: boolean): this {
    let _target, clean
    if (typeof v === 'boolean') {
      _target = void 0
      clean = v
    } else if (isProduciblePath(v)) {
      _target = v
      clean = isClean
    }
    _target = _target ? PathController.make(_target) : this.pathCtrl
    if (!_target) throw new ParserError('If you want to save please provide target!')
    if (!this.parseResult) throw new ParserError('No parsed result yet!')
    this.parseResult.forEach((item) => {
      if (!item.source) return
      const path = PathController.make(item.path).mkdir()
      let type
      if (typeof item.source === 'string') {
        path.write(item.source)
        type = 'Source'
      } else if (item.source instanceof Buffer) {
        path.write(item.source)
        type = 'Binary'
      } else if (typeof item.source === 'object') {
        path.writeJSON(item.source)
        type = 'JSON'
      } else {
        this.logger.warn(`Path ${item.path} not allow write type: ${typeof item.source}`)
      }
      type && this.logger.debug(`Parsed ${type} save to ${path.logpath}`)
    })
    if (clean) this.parseResult = null
    return this
  }

  parse(_source?: Buffer): this {
    this.source = _source ? _source.toString('utf8') : this.source
    this.parseResult = []
    return this
  }
}

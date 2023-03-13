import { getLogger } from '@/utils'
import { Logger } from 'winston'
import { isProduciblePath, PathController, ProduciblePath } from '@core/controller/PathController'

export class ParserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ParserError'
  }
}
export interface ParsedInfo {
  // 相对解包后的根路径
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
      if (this.pathCtrl.isFile) this.source = this.pathCtrl.readSync('utf8')
    } else if (v instanceof Buffer) {
      this.source = v.toString('utf8')
    }
  }

  async save(isClean?: boolean): Promise<void>
  async save(target?: ProduciblePath, isClean?: boolean): Promise<void>
  async save(v?: boolean | ProduciblePath, isClean?: boolean): Promise<void> {
    let _target: PathController, clean
    if (typeof v === 'boolean') {
      _target = void 0
      clean = v
    } else if (isProduciblePath(v)) {
      _target = PathController.make(v)
      clean = isClean
    }
    _target = _target ? _target : this.pathCtrl
    if (!_target) throw new ParserError('If you want to save please provide target!')
    if (!this.parseResult) throw new ParserError('No parsed result yet!')
    for (const item of this.parseResult) {
      if (!item.source) continue
      const path = _target.join(PathController.make(item.path).path).mkdir()
      let type
      if (typeof item.source === 'string') {
        await path.write(item.source)
        type = 'Source'
      } else if (item.source instanceof Buffer) {
        await path.write(item.source)
        type = 'Binary'
      } else if (typeof item.source === 'object') {
        await path.writeJSON(item.source)
        type = 'JSON'
      } else {
        this.logger.warn(`Path ${item.path} not allow write type: ${typeof item.source}`)
      }
      type && this.logger.debug(`Parsed ${type} save to ${path.logpath}`)
    }
    if (clean) this.parseResult = null
  }

  parse(_source?: Buffer): void {
    this.source = _source ? _source.toString('utf8') : this.source
    this.parseResult = []
  }
}

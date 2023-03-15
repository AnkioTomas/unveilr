import { BaseError, BaseLogger } from '@/utils'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { Saver } from '@core/utils/Saver'

export class ParserError extends BaseError {}
/**
 * 抽取解析器公共部分，提供 saver 和 pathCtrl 已经 logger
 * 必须自己实现一个 parse 方法
 * */
export abstract class BaseParser extends BaseLogger {
  readonly pathCtrl: PathController
  readonly saver: Saver
  protected constructor(path: ProduciblePath) {
    super()
    this.pathCtrl = PathController.make(path)
    this.saver = new Saver(this.pathCtrl)
  }
  async save(baseDir?: ProduciblePath): Promise<number> {
    baseDir && (this.saver.saveDirectory = baseDir)
    return this.saver.save(true)
  }
  abstract parse(...args: unknown[]): unknown
}

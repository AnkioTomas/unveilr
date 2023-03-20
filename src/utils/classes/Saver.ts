import { PathController, ProduciblePath } from '@core/controller/PathController'
import { BaseLogger } from '@utils/logger'
import { BaseError } from '@utils/exceptions'
export class SavingError extends BaseError {}
export type SaverItem = { path: ProduciblePath } & { buffer: string | Buffer | object }

export class Saver extends BaseLogger {
  private baseDir: PathController
  private saveList: SaverItem[]
  private saveCount: number
  static DoNotWriteToDisk = false
  static _alerted = false
  constructor(baseDir?: ProduciblePath) {
    super()
    this.saveList = []
    this.saveCount = 0
    this.saveDirectory = baseDir
    if (!Saver._alerted && Saver.DoNotWriteToDisk) {
      Saver._alerted = true
      this.logger.warn('Do not write to disk is enabled, the parsed file will not be saved!')
    }
  }
  set saveDirectory(dir: ProduciblePath) {
    this.baseDir = PathController.make(dir)
  }
  get saveDirectory(): PathController {
    return this.baseDir
  }
  get count() {
    return this.saveCount
  }

  add(item: SaverItem): this {
    this.saveList.push(item)
    return this
  }
  save(wait: true): Promise<number>
  save(wait?: false): this
  save(wait?: boolean): Promise<number> | this {
    if (!wait) return this
    let resolve
    const promise = new Promise<number>((r) => (resolve = r))
    Promise.all(
      Array(this.saveList.length)
        .fill(0)
        .map(() => this.saveItem(this.saveList.shift())),
    ).then(() => {
      resolve && resolve(this.count)
      this.logger.info(`Storage has written ${String(this.count).blue} files to ${this.saveDirectory}`)
    })
    return wait ? promise : this
  }
  private async saveItem(item: SaverItem) {
    const { path, buffer } = item
    const pCtrl = PathController.make(path)
    let target = pCtrl
    if (!pCtrl.isAbs) {
      if (!this.baseDir) SavingError.throw('BaseDir is not a directory!')
      target = this.baseDir.join(pCtrl.path)
    }
    if (!buffer) this.logger.warn(`You are trying to save a falsy data to ${target.logpath}`)
    target.mkdir()
    let type

    const flush = async (key: 'write' | 'writeUtf8' | 'writeJSON') => {
      if (Saver.DoNotWriteToDisk) return
      switch (key) {
        case 'write':
          await target.write(buffer as Buffer)
          break
        case 'writeUtf8':
          await target.write(String(buffer), 'utf8')
          break
        case 'writeJSON':
          await target.writeJSON(buffer as object)
          break
      }
    }
    let retPromise: Promise<void>
    if (typeof buffer === 'string') {
      retPromise = flush('writeUtf8')
      type = `source-${target.suffixWithout}`
    } else if (Buffer.isBuffer(buffer)) {
      retPromise = flush('write')
      type = 'binary'
    } else if (typeof buffer === 'object') {
      retPromise = flush('writeJSON')
      type = 'json'
    } else {
      this.logger.warn(`Path ${item.path} not allow write type: ${typeof buffer}`)
      retPromise = flush('writeUtf8')
    }
    // if (pCtrl.suffixWithout === 'json') {
    //   console.log(pCtrl.logpath, type)
    //   console.log(buffer)
    // }
    type && this.logger.debug(`File ${type} save to ${target.logpath}`)
    this.saveCount++
    return retPromise
  }
}

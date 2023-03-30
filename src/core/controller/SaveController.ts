import { BaseLogger } from '@utils/logger'
import { PathController } from '@core/controller/PathController'

export type SaveAble = string | Buffer | object
type Bucket = Map<string, SaveAble>

export class SaveController extends BaseLogger {
  static instance: SaveController
  static getInstance(): SaveController {
    if (!SaveController.instance) {
      SaveController.instance = new SaveController()
    }
    return SaveController.instance
  }

  private readonly fileBucket: Bucket
  private constructor() {
    super('Bucket', 'debug')
    this.fileBucket = new Map()
  }

  private saveAbleMax(s1: SaveAble, s2: SaveAble): SaveAble
  private saveAbleMax(...args: SaveAble[]): SaveAble {
    const length = (s: SaveAble) => (Buffer.isBuffer(s) || typeof s === 'string' ? s.length : JSON.stringify(s).length)
    const map = new Map<number, SaveAble>()
    args.forEach((_s) => map.set(length(_s), _s))
    return map.get(Math.max(...map.keys()))
  }

  set(path: string, buffer: SaveAble) {
    if (!path) return
    if (!PathController.make(path).isAbs) {
      this.logger.warn(`Path ${path} is not absolute!`)
      return
    }
    if (this.fileBucket.has(path)) buffer = this.saveAbleMax(this.fileBucket.get(path), buffer)
    this.fileBucket.set(path, buffer)
  }
  get<T extends SaveAble>(path: string): T | null {
    if (!path) return null
    const ctrl = PathController.make(path)
    return (this.fileBucket.get(ctrl.isAbs ? ctrl.path : ctrl.abspath) as T) || null
  }
  delete(path: string): boolean {
    if (!path) return false
    const ctrl = PathController.make(path)
    if (!ctrl.isAbs) return false
    return this.fileBucket.delete(ctrl.path)
  }
  pop<T extends SaveAble>(path: string): T | null {
    const data: T = this.get(path)
    this.delete(path)
    return data || null
  }

  private async saveFile(path: string, buffer: SaveAble) {
    const ctrl = PathController.make(path)
    if (!buffer) this.logger.warn(`You are trying to save a falsy data to ${ctrl.logpath}`)
    ctrl.mkdir()
    let type
    const flush = async (key: 'write' | 'writeUtf8' | 'writeJSON') => {
      switch (key) {
        case 'write':
          await ctrl.write(buffer as Buffer)
          break
        case 'writeUtf8':
          await ctrl.write(String(buffer), 'utf8')
          break
        case 'writeJSON':
          await ctrl.writeJSON(buffer as object)
          break
      }
    }
    let retPromise: Promise<void>
    if (typeof buffer === 'string') {
      retPromise = flush('writeUtf8')
      type = `source-${ctrl.suffixWithout}`
    } else if (Buffer.isBuffer(buffer)) {
      retPromise = flush('write')
      type = 'binary'
    } else if (typeof buffer === 'object') {
      retPromise = flush('writeJSON')
      type = 'json'
    } else {
      this.logger.warn(`Path ${ctrl.path} not allow write type: ${typeof buffer}`)
      retPromise = flush('writeUtf8')
    }
    type && this.logger.debug(`File ${type} save to ${ctrl.logpath}`)
    return retPromise
  }
  async flashDisk() {
    this.logger.debug('Flashing disk...')
    const keys = this.fileBucket.keys()
    let count = 0
    const promiseAll: Promise<void>[] = []
    for (const path of keys) {
      try {
        promiseAll.push(this.saveFile(path, this.pop(path)))
        count++
      } catch (e) {
        this.logger.error(`Error when saving file ${path}: ${e}`)
      }
    }
    await Promise.all(promiseAll)
    count && this.logger.info(`Storage has written ${String(count).blue} files`)
  }
}

export async function flashDisk() {
  await SaveController.getInstance().flashDisk()
}

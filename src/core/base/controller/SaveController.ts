import { BaseLogger } from '@utils/logger'
import { PathController, ProduciblePath } from './PathController'
import { info } from '@utils/colors'
import { checkSupport, reformat } from '@utils/reformat'

export type SaveAble = string | Buffer | object
export interface SaveAbleItem {
  key: string
  buffer: SaveAble
}
type Bucket = Map<string, SaveAble>

export class SaveController extends BaseLogger {
  static instance: SaveController
  static isClean = false
  static isSafeMode = false
  static isReFormat = false
  static readonly OVERRIDE_FILES: string[] = []
  static getInstance(): SaveController {
    if (!SaveController.instance) {
      SaveController.instance = new SaveController()
    }
    return SaveController.instance
  }
  static setIsClean(isClean: boolean) {
    SaveController.isClean = isClean
  }
  static setIsSafeMode(isSafeMode: boolean) {
    SaveController.isSafeMode = isSafeMode
    isSafeMode && getSaveController().logger.warn(`Safe mode is enabled, Will not write files to disk`)
  }
  static addOverrideFiles(overrideFiles: string[]) {
    SaveController.OVERRIDE_FILES.push(...overrideFiles)
  }

  static setIsReFormat(isReFormat: boolean) {
    SaveController.isReFormat = isReFormat
    isReFormat && getSaveController().logger.warn(`Turning on code formatting can slow down some operations`)
  }

  private readonly fileBucket: Bucket
  private constructor() {
    super('Bucket')
    this.fileBucket = new Map()
  }
  get keys() {
    return Array.from(this.fileBucket.keys())
  }

  // 返回长度最大的数据
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
    if (this.fileBucket.has(path)) {
      // 部分文件需要被覆盖不需要比较
      if (!SaveController.OVERRIDE_FILES.includes(PathController.make(path).basename)) {
        buffer = this.saveAbleMax(this.fileBucket.get(path), buffer)
      }
    }
    this.fileBucket.set(path, buffer)
  }
  get<T extends SaveAble>(path: string): T | null {
    if (!path) return null
    const ctrl = PathController.make(path)
    return (this.fileBucket.get(ctrl.isAbs ? ctrl.path : ctrl.abspath) as T) || null
  }
  delete(path: string, force?: boolean): boolean {
    if (!force && !SaveController.isClean) return false
    if (!path) return false
    const ctrl = PathController.make(path)
    if (!ctrl.isAbs) return false
    return this.fileBucket.delete(ctrl.path)
  }
  pop<T extends SaveAble>(path: string, force?: boolean): T | null {
    const data: T = this.get(path)
    this.delete(path, force)
    return data || null
  }

  private async saveFile(path: string, buffer: SaveAble) {
    const ctrl = PathController.make(path)
    if (!buffer) {
      this.logger.debug(`You are trying to save a falsy data to ${ctrl.logpath}`)
      buffer = ''
    }
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
    if (SaveController.isSafeMode) return
    this.logger.debug('Flashing disk...')
    const promiseAll = this.keys
      .map((path) => {
        try {
          let buffer = this.pop(path, true)
          if (SaveController.isReFormat && checkSupport(path)) {
            buffer = reformat(path, saveAble2String(buffer))
          }
          return this.saveFile(path, buffer)
        } catch (e) {
          this.logger.error(`Error when saving file ${path}: ${e}`)
        }
        return null
      })
      .filter(Boolean)
    await Promise.all(promiseAll)
    const count = promiseAll.length.toString()
    count && this.logger.info(`Storage has written ${info(count)} files`)
  }
  find(prefix: string): SaveAbleItem[] {
    const keys = this.fileBucket.keys()
    const result: SaveAbleItem[] = []
    if (!prefix) return []
    for (const key of keys) {
      if (!key.startsWith(prefix)) continue
      const buffer = this.get(key)
      if (!buffer) continue
      result.push({ key, buffer })
    }
    return result.filter(Boolean)
  }
}

export async function flashDisk() {
  await getSaveController().flashDisk()
}

export function findBuffer(path: ProduciblePath): SaveAbleItem[] {
  const prefix = PathController.make(path).abspath
  return getSaveController().find(prefix)
}

export function saveAble2String(buffer: SaveAble): string {
  if (!buffer) return ''
  if (Buffer.isBuffer(buffer)) return buffer.toString()
  if (typeof buffer === 'string') return buffer
  return JSON.stringify(buffer)
}

export function getSaveController() {
  return SaveController.getInstance()
}

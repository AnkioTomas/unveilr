import {
  readFileSync,
  WriteFileOptions,
  writeFileSync,
  statSync,
  existsSync,
  mkdirSync,
  readdirSync,
  copyFileSync,
  unlinkSync,
  rmdirSync,
  rmSync,
} from 'fs'
import { readdir, readFile, writeFile, unlink, rm } from 'fs/promises'
import { sep, dirname, extname, join, resolve, basename, relative, isAbsolute } from 'path'
import { ObjectEncodingOptions, OpenMode } from 'node:fs'
import { Abortable } from 'node:events'
import { grey } from '@utils/colors'

export type ProduciblePath = string | PathController
export type Optional<T> = T | null
export type ReadDirStringOption =
  | (ObjectEncodingOptions & {
      withFileTypes?: false | undefined
    })
  | BufferEncoding
  | null
export type ReadBufferOption =
  | ({
      encoding?: null | undefined
      flag?: OpenMode | undefined
    } & Abortable)
  | null
export type ReadStringOption =
  | (ObjectEncodingOptions &
      Abortable & {
        flag?: OpenMode | undefined
      })
  | BufferEncoding
  | null

export class PathController {
  readonly path: string
  exists = false
  isDirectory = false
  isFile = false

  constructor(path?: string) {
    this.path = path || ''
    this.reload()
  }

  reload(): this {
    this.exists = existsSync(this.path)
    if (this.exists) {
      try {
        const stat = statSync(this.path)
        this.isDirectory = stat.isDirectory()
        this.isFile = stat.isFile()
      } catch (e) {
        if (e.errno === -4058) this.exists = false
        this.isDirectory = false
        this.isFile = false
      }
    }
    return this
  }
  get suffix(): string {
    return extname(this.path)
  }

  get suffixWithout(): string {
    return this.suffix.slice(1)
  }

  get abspath(): string {
    return resolve(this.path)
  }

  get unixpath(): string {
    if (sep === '/') return this.path
    return this.path.replace(/\\/g, '/')
  }

  get absunixpath(): string {
    return PathController.make(this.abspath).unixpath
  }

  get logpath(): string {
    const dirML = 80
    const s =
      this.abspath.length - this.basename.length <= dirML
        ? this.abspath
        : this.abspath.slice(0, dirML) + '...' + this.basename
    return grey(s)
  }

  get dirname(): string {
    if (this.isDirectory) return this.path
    if (this.isFile) return dirname(this.path)
    return dirname(this.path)
  }

  get basename(): string {
    return basename(this.path)
  }

  get basenameWithout(): string {
    return basename(this.path, this.suffix)
  }

  get isAbs() {
    return isAbsolute(this.path)
  }

  relative(p: ProduciblePath): PathController {
    return PathController.make(relative(this.path, PathController.make(p).path))
  }

  async readdir(opt?: ReadDirStringOption, absolutePath?: boolean): Promise<string[]> {
    if (!this.isDirectory) return null
    const list = await readdir(this.path, opt)
    return absolutePath ? list.map((v) => resolve(this.abspath, v)) : list
  }

  async read(opt?: ReadBufferOption): Promise<Buffer>
  async read(opt?: ReadStringOption): Promise<string>
  async read(opt?: never): Promise<Buffer | string> {
    if (!this.isFile) return null
    return await readFile(this.path, opt)
  }

  readSync(opt?: ReadBufferOption): Buffer
  readSync(opt?: ReadStringOption): string
  readSync(opt?: never): Buffer | string {
    return readFileSync(this.path, opt)
  }

  async write(data: string | NodeJS.ArrayBufferView, options?: WriteFileOptions): Promise<this> {
    await writeFile(this.abspath, data, options)
    return this
  }
  writeSync(data: string | NodeJS.ArrayBufferView, options?: WriteFileOptions): this {
    writeFileSync(this.abspath, data, options)
    return this
  }

  async writeJSON(data: object): Promise<this> {
    return this.write(JSON.stringify(data, null, 2), 'utf8')
  }

  writeJSONSync(data: object): this {
    return this.writeSync(JSON.stringify(data, null, 2), 'utf8')
  }

  copy(_target: ProduciblePath): PathController {
    // copy single path
    const target = PathController.make(_target)
    if (this.isFile) return copyFileSync(this.path, target.mkdir().abspath), this
    // deep copy multiple directory
    if (this.isDirectory) {
      target.mkdir(true)
      this.deepListDir().forEach((t) => {
        const _tp = PathController.make(join(target.abspath, t.replace(this.abspath, '')))
        copyFileSync(t, _tp.mkdir().abspath)
      })
      return this
    }
    return this
  }

  move(_target: ProduciblePath): PathController {
    this.copy(_target).abspath
    if (this.isFile) unlinkSync(this.abspath)
    else if (this.isDirectory) rmdirSync(this.abspath, { recursive: true })
    return PathController.make(_target)
  }

  mkdir(self?: boolean): Optional<PathController> {
    if (this.exists) return this
    const _path = self ? this.path : dirname(this.path)
    mkdirSync(_path, { recursive: true })
    this.reload()
    return this
  }
  async unlink(): Promise<void> {
    await unlink(this.abspath)
    // this.reload()
  }
  unlinkSync(): void {
    unlinkSync(this.abspath)
    this.reload()
  }
  deepListDir(depth: number): string[]
  deepListDir(absolute?: boolean, depth?: number): string[]
  deepListDir(arg1?: boolean | number, arg2?: number): string[] {
    if (!this.isDirectory) return []
    const list: string[] = []
    let absolute: boolean
    let depth: number
    const deepPath = absolute ? this.absunixpath : this.unixpath
    switch (arguments.length) {
      case 0:
        absolute = false
        depth = Number.MAX_SAFE_INTEGER
        break
      case 1:
        if (typeof arg1 === 'boolean') {
          absolute = arg1
          depth = Number.MAX_SAFE_INTEGER
        } else if (typeof arg1 === 'number') {
          absolute = false
          depth = arg1 || Number.MAX_SAFE_INTEGER
        } else {
          throw new Error('arg1 must be boolean or number')
        }
        break
      case 2:
        absolute = arg1 as boolean
        depth = arg2 || Number.MAX_SAFE_INTEGER
    }
    const listFile = (dir: string): void => {
      readdirSync(dir).forEach((item) => {
        const fullPath = join(dir, item)
        if (statSync(fullPath).isDirectory()) {
          if (depth !== Number.MAX_SAFE_INTEGER) {
            // 一层不需要往下判断了
            if (depth === 1) return
            let prevDeep
            if (dir === deepPath) prevDeep = 1
            else {
              const croppedPath = PathController.make(dir).crop(deepPath).unixpath
              prevDeep = croppedPath.split('/').length + 1
            }
            if (prevDeep >= depth) return
          }
          listFile(fullPath)
        } else {
          list.push(fullPath)
        }
      })
    }
    listFile(deepPath)
    return list
  }

  join(...paths: string[]): PathController {
    return PathController.make(join(this.path, ...paths))
  }

  whitout(suffix?: string): PathController {
    return this.join('..', this.basenameWithout + (suffix || ''))
  }

  unix(): PathController {
    return PathController.make(this.unixpath)
  }

  crop(path: ProduciblePath): PathController {
    const newPath = this.unixpath.replace(PathController.make(path).unixpath + '/', '')
    return PathController.make(newPath)
  }

  async rmrf() {
    await rm(this.abspath, { recursive: true, force: true })
  }
  rmrfSync() {
    rmSync(this.abspath, { recursive: true, force: true })
  }

  toString(): string {
    return this.logpath
  }

  static unix(path: ProduciblePath): PathController {
    return PathController.make(path).unix()
  }

  static whitout(path: ProduciblePath, suffix?: string): PathController {
    return PathController.make(path).whitout(suffix)
  }

  static make(path?: ProduciblePath): PathController {
    path = path || ''
    return path instanceof PathController ? path : new PathController(path)
  }

  static dir(path: ProduciblePath): PathController {
    return PathController.make(PathController.make(path).dirname)
  }
}

export function isProduciblePath(value: unknown): value is ProduciblePath {
  return typeof value === 'string' || value instanceof PathController
}

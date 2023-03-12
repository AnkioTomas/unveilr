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
} from 'fs'
import { readdir, readFile, writeFile } from 'fs/promises'
import { sep, dirname, extname, join, resolve, basename, relative } from 'path'
import { grey, bold } from 'colors/safe'
import { ObjectEncodingOptions, OpenMode } from 'node:fs'
import { Abortable } from 'node:events'

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
  readonly exists: boolean = false
  readonly isDirectory: boolean = false
  readonly isFile: boolean = false

  constructor(path?: string) {
    this.path = path || ''
    this.exists = existsSync(this.path)
    if (this.exists) {
      const stat = statSync(this.path)
      this.isDirectory = stat.isDirectory()
      this.isFile = stat.isFile()
    }
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
    return bold(grey(s))
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
  async read(opt?: unknown): Promise<Buffer | string> {
    if (!this.isFile) return null
    return await readFile(this.path, opt)
  }

  readSync(opt?: ReadBufferOption): Buffer
  readSync(opt?: ReadStringOption): string
  readSync(opt?: unknown): Buffer | string {
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
    return this
  }

  deepListDir(absolute?: boolean): Optional<string[]> {
    if (!this.isDirectory) return null
    const list: string[] = []

    function listFile(dir) {
      readdirSync(dir).forEach((item) => {
        const fullPath = join(dir, item)
        statSync(fullPath).isDirectory() ? listFile(fullPath) : list.push(fullPath)
      })
      return list
    }

    listFile(absolute ? this.abspath : this.path)
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
}

export function isProduciblePath(value: unknown): value is ProduciblePath {
  return typeof value === 'string' || value instanceof PathController
}

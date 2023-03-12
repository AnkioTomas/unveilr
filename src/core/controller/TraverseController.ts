import { ProduciblePath } from '@/core'
import { TraverseOptions, Visitor } from '@babel/traverse'
import { BabelFileResult } from '@babel/core'
import { BuildParams, traverseAST } from '@/utils'

export class TraverseController {
  visitors: Visitor
  private fileBuilder: unknown
  private readonly dataSet: { [key: string]: unknown }
  constructor(path: ProduciblePath, opt?: TraverseOptions)
  constructor(builder: BuildParams, opt?: TraverseOptions)
  constructor(file: BabelFileResult, opt?: TraverseOptions)
  constructor(fileBuilder: unknown, visitor?: Visitor) {
    this.setFileBuilder(fileBuilder)
    this.visitors = visitor
    this.dataSet = {}
  }

  addVisitors(...visitors: Visitor[]): this {
    this.visitors = this._mergeVisitors(...visitors)
    return this
  }

  traverse(opt?: Pick<TraverseOptions, 'scope' | 'noScope'>): this {
    traverseAST(this.fileBuilder, { ...this.visitors, ...opt })
    return this
  }

  _mergeVisitors(...source: Visitor[]): Visitor {
    const dataMap = {}
    ;[this.visitors, ...source].forEach((item) => {
      if (typeof item !== 'object') return
      Object.keys(item).forEach((key) => {
        if (Array.isArray(dataMap[key])) {
          dataMap[key].push(item[key])
        } else {
          dataMap[key] = [item[key]]
        }
      })
    })
    Object.keys(dataMap).forEach((key) => {
      const fs = [...dataMap[key]]
      dataMap[key] = (...args) => fs.forEach((f) => f.apply(this, args))
    })
    return dataMap
  }

  setItem<T>(k: string, v: T): this {
    this.dataSet[k] = v
    return this
  }
  changeItem<T>(k: string, handler: (v: T) => T, _default: T): this {
    this.setItem(k, handler(this.getItem(k, _default)))
    return this
  }

  getItem<T>(k: string, _default?: T): T {
    return (this.dataSet[k] as T) || _default
  }
  popItem<T>(k: string, _default: T): T {
    const data = this.dataSet[k]
    delete this.dataSet[k]
    return (data as T) || _default
  }
  get data() {
    return this.dataSet
  }

  setFileBuilder(file: BabelFileResult): this
  setFileBuilder(path: ProduciblePath): this
  setFileBuilder(builder: BuildParams): this
  setFileBuilder(v: unknown): this {
    this.fileBuilder = v
    return this
  }
}

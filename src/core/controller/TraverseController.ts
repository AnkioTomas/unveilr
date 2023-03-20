import { TraverseOptions, Visitor } from '@babel/traverse'
import { BabelFileResult } from '@babel/core'
import { ProduciblePath } from '@core/controller/PathController'
import { BuildParams, traverseAST } from '@utils/ast'

export class TraverseController<DataType extends object = object> {
  visitors: Visitor
  private fileBuilder: unknown
  private readonly dataSet: DataType
  constructor(path: ProduciblePath, opt?: TraverseOptions)
  constructor(builder: BuildParams, opt?: TraverseOptions)
  constructor(file: BabelFileResult, opt?: TraverseOptions)
  constructor(fileBuilder: unknown, visitor?: Visitor) {
    this.setFileBuilder(fileBuilder)
    this.addVisitors(visitor)
    this.dataSet = Object.create(null)
  }

  addVisitors(...visitors: Visitor[]): this {
    this.visitors = this._mergeVisitors(...visitors)
    return this
  }

  async traverse(opt?: Pick<TraverseOptions, 'scope' | 'noScope'>): Promise<void> {
    return traverseAST(this.fileBuilder, { ...this.visitors, ...opt })
  }

  private _mergeVisitors(...source: Visitor[]): Visitor {
    const dataMap = {}
    ;[this.visitors, ...source].filter(Boolean).forEach((item) => {
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

  setItem(k: keyof DataType, v: DataType[keyof DataType]): this {
    this.dataSet[k] = v
    return this
  }
  changeItem(
    k: keyof DataType,
    handler: (v: DataType[keyof DataType]) => DataType[keyof DataType],
    _default: DataType[keyof DataType],
  ): this {
    this.setItem(k, handler(this.getItem(k, _default)))
    return this
  }

  getItem(k: keyof DataType, _default: DataType[keyof DataType]): DataType[keyof DataType] {
    return this.dataSet[k] || _default
  }
  popItem(k: keyof DataType, _default: DataType[keyof DataType]): DataType[keyof DataType] {
    const data = this.dataSet[k]
    delete this.dataSet[k]
    return data || _default
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

import { TraverseOptions, Visitor } from '@babel/traverse'
import { BabelFileResult } from '@babel/core'
import { ProduciblePath } from './PathController'
import { BuildParams, traverseAST } from '@utils/ast'

export class TraverseController {
  visitors: Visitor
  private fileBuilder: BabelFileResult | ProduciblePath | BuildParams
  constructor(path: ProduciblePath, opt?: TraverseOptions)
  constructor(builder: BuildParams, opt?: TraverseOptions)
  constructor(file: BabelFileResult, opt?: TraverseOptions)
  constructor(fileBuilder: BabelFileResult | ProduciblePath | BuildParams, visitor?: Visitor) {
    this.setFileBuilder(fileBuilder)
    this.addVisitors(visitor)
  }

  addVisitors(...visitors: Visitor[]): this {
    this.visitors = this._mergeVisitors(...visitors)
    return this
  }

  async traverse(opt?: Pick<TraverseOptions, 'scope' | 'noScope'>): Promise<void> {
    return traverseAST(this.fileBuilder as BuildParams, { ...this.visitors, ...opt })
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

  setFileBuilder(v: BabelFileResult | ProduciblePath | BuildParams): this {
    this.fileBuilder = v
    return this
  }
}

import { BaseParser } from '../BaseParser'
import { Saver } from '@utils/classes/Saver'
import { parseWxml } from '@utils/wxmlParserJs'
import { S2Observable, TraverseResult, TVSubject, WxmlParserV3Subject, ZArray } from '@core/parser/wxapkg/types'
import { Visitor } from '@babel/traverse'
import { parseJSONFromJSCode } from '@utils/ast'
import { filter } from 'observable-fns'

const zArrayFunctionNameRE = /gz\$gwx\d*_[A-Za-z_0-9]+/
const scopeNameRE = /\$gwx\d*$|\$gwx\d*_[A-Za-z_0-9]+/
function getFirst<T>(p: T | T[]) {
  return (Array.isArray(p) ? p : [p])[0]
}
function getZArrayKey(functionName: string): string {
  const match = functionName.match(/_\d+$/)
  return match ? match[0] : ''
}
function makeVisitor(result: TraverseResult): Visitor {
  const data: ZArray = { mul: Object.create(null) }
  const visitor = {
    FunctionExpression(path) {
      const parent = path.getFunctionParent()
      if (!parent) return
      if (!parent.isFunctionDeclaration()) return
      const fn = parent.get('id')
      if (!fn) return
      const functionName = fn.getSource()
      if (!zArrayFunctionNameRE.test(functionName)) return
      const zMap = {} // var a=11
      const zArr = [] // Z([3,'xx'])...
      const list = path.get('body.body')
      const blocks = Array.isArray(list) ? list : [list]
      blocks.forEach((p) => {
        if (p.isIfStatement() || p.isFunctionDeclaration()) return
        if (p.isVariableDeclaration()) {
          const declarations = p.get('declarations')[0]
          if (!declarations) return
          const { id, init } = declarations.node
          if (id.type === 'Identifier' && init.type === 'NumericLiteral') {
            zMap[id.name] = init.value
          }
        } else if (p.isExpressionStatement()) {
          const expr = p.get('expression')
          if (!expr.isCallExpression()) return
          const zArg = expr.get('arguments')[0]
          if (zArg.isArrayExpression() || zArg.isMemberExpression()) {
            zArr.push(parseJSONFromJSCode(zArg.getSource(), { ...zMap, z: zArr }))
          }
        }
      })
      const key = getZArrayKey(functionName)
      if (!key) return
      data.mul[key] = zArr
    },
    VariableDeclarator(path) {
      const id = path.get('id')
      const init = path.get('init')
      const defName = id.getSource()
      if (defName === 'nnm' && init.isObjectExpression()) {
        result.json = init.getSource()
      }
    },
  }
  result.z = data
  return visitor
}
export class WxmlParser extends BaseParser {
  private sources: string
  constructor(saver: Saver) {
    super(saver)
  }
  async parse(observable: S2Observable<TVSubject>): Promise<void> {
    let resolve
    const promise = new Promise<void>((_resolve) => (resolve = _resolve))
    // 订阅wxml解析器
    observable.pipe<S2Observable<WxmlParserV3Subject>>(filter((v) => v.WxmlParserV3)).subscribe({
      next: (value) => {
        const data = value.WxmlParserV3
        if (!data) return
        const { code, json, z } = data
        const dir = this.dir
        parseWxml(code, dir, json, z).then((result) => {
          Object.entries(result).forEach((args) => this.saver.add(...args))
        })
      },
      complete() {
        resolve && resolve()
      },
    })
    return promise
  }

  async parseV1() {
    const result = await parseWxml(this.sources, this.dir)
    Object.entries(result).forEach((args) => this.saver.add(...args))
  }

  get dir() {
    return this.saver.saveDirectory.path
  }

  static visitorV3(subject: WxmlParserV3Subject): Visitor {
    return {
      BlockStatement(path) {
        const parent = path.parentPath
        if (!parent) return
        if (!parent.isFunctionExpression()) return
        const params = parent.get('params')
        if (params.length !== 2) return
        if (params[0].getSource() !== 'path' || params[1].getSource() !== 'global') return
        const fn = path.find((p) => p.isAssignmentExpression())
        if (!fn) return
        const scopeName = getFirst(fn.get('left')).getSource()
        if (!scopeNameRE.test(scopeName)) return
        const result: TraverseResult = Object.create(null)
        path.traverse(makeVisitor(result))
        const contents = path.get('body').filter((p) => !p.isIfStatement())
        let next = 0
        const sourceIndex = contents.findIndex((p) => {
          if (p.isVariableDeclaration()) {
            const id = getFirst(p.get('declarations.0.id'))
            if (id && id.isIdentifier()) {
              const defineName = id.getSource()
              if (defineName === 'nv_require') {
                next = 1
                return true
              }
              return defineName === 'x'
            }
          }
          return false
        })
        const source = contents
          .slice(sourceIndex + next)
          .map((p) => p.getSource())
          .join('\n')
        result.scope = scopeName
        result.code = source
        subject.next({ WxmlParserV3: result })
      },
    }
  }

  setSource(sources: string) {
    this.sources = sources
  }
}

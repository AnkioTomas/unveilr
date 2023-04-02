import { BaseParser } from '../BaseParser'
import { Visitor } from '@babel/core'
import { S2Observable, ScriptParserSubject, TVSubject } from '@core/parser/wxapkg/types'
import { Saver } from '@utils/classes/Saver'
import { filter } from 'observable-fns'
import { PathController } from '@core/controller/PathController'

export class ScriptParser extends BaseParser {
  constructor(saver: Saver) {
    super(saver)
  }
  async parse(observable: S2Observable<TVSubject>): Promise<void> {
    let resolve
    const promise = new Promise<void>((_resolve) => (resolve = _resolve))
    observable.pipe<S2Observable<ScriptParserSubject>>(filter((v) => v.ScriptParser)).subscribe({
      next: (value) => {
        Object.entries(value.ScriptParser).forEach(([path, buffer]) => {
          // 小游戏插件以目录作为名字的define
          if (path.startsWith('__plugin__')) {
            if (!PathController.make(path).suffixWithout) {
              path = '__plugin__/index.js'
            }
          }
          this.saver.add(path, buffer)
        })
      },
      complete() {
        resolve && resolve()
      },
    })
    return promise
  }

  static visitor(subject: ScriptParserSubject): Visitor {
    return {
      CallExpression(path) {
        const callee = path.node.callee
        if (callee.type === 'Identifier' && callee.name === 'define') {
          const args = path.get('arguments')
          const [filenamePathNode, sourcePathNode] = args
          if (!filenamePathNode.isStringLiteral()) return
          if (sourcePathNode.node.type !== 'FunctionExpression') return
          const filename = filenamePathNode.node.value
          const body = sourcePathNode.get('body.body')
          const source = (Array.isArray(body) ? body : [body]).map((p) => p.getSource()).join('')
          subject.next({
            ScriptParser: {
              [filename]: source,
            },
          })
        }
      },
    }
  }
}

import { BaseParser } from '../BaseParser'
import { Visitor } from '@babel/core'
import { reformat } from '@utils/reformat'
import { S2Observable, ScriptParserSubject, TVSubject } from '@core/parser/wxapkg/types'
import { Saver } from '@core/utils/Saver'
import { filter } from 'observable-fns'

export class ScriptParser extends BaseParser {
  constructor(saver: Saver) {
    super(saver)
  }
  async parse(observable: S2Observable<TVSubject>): Promise<void> {
    observable.pipe<S2Observable<ScriptParserSubject>>(filter((v) => v.ScriptParser)).subscribe((value) => {
      Object.entries(value.ScriptParser).forEach(([path, buffer]) => this.saver.add({ path, buffer }))
    })
  }

  static visitor(subject: ScriptParserSubject): Visitor {
    return {
      CallExpression(path) {
        const callee = path.node.callee
        if (callee.type === 'Identifier' && callee.name === 'define') {
          const args = path.get('arguments')
          const [filenamePathNode, sourcePathNode] = args
          if (filenamePathNode.node.type !== 'StringLiteral') return
          if (sourcePathNode.node.type !== 'FunctionExpression') return
          const filename = filenamePathNode.node.value
          const body = sourcePathNode.get('body.body')
          const source = (Array.isArray(body) ? body : [body]).map((p) => p.getSource()).join('')
          subject.next({
            ScriptParser: {
              [filename]: reformat(source, { parser: 'babel' }),
            },
          })
        }
      },
    }
  }
}

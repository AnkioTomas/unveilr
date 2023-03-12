import * as babel from '@babel/core'
import type { BabelFileResult } from '@babel/core'
import { isProduciblePath, PathController, ProduciblePath } from '@core/controller'
import { traverse, Visitor } from '@babel/core'
import { TraverseOptions } from '@babel/traverse'

export function buildAST(path: ProduciblePath): BabelFileResult
export function buildAST(code: string, filename: string): BabelFileResult

export function buildAST(v: unknown, filename?: string): BabelFileResult {
  let code: string = v as string
  if (!filename) {
    const pCtrl = PathController.make(v as ProduciblePath)
    filename = pCtrl.abspath
    code = pCtrl.read('utf8') as string
  }
  const ast = babel.parseSync(code, { sourceFileName: filename })
  return new babel['File']({ filename }, { ast, code })
}

export type BuildParams = { code: string; filename?: string }

export function traverseAST(path: ProduciblePath, opt?: TraverseOptions): void
export function traverseAST(builder: BuildParams, opt?: TraverseOptions): void
export function traverseAST(file: BabelFileResult, opt?: TraverseOptions): void
export function traverseAST(v: unknown, opt: TraverseOptions): void {
  if (isProduciblePath(v)) return traverse(buildAST(v).ast, opt)
  if (typeof v === 'object' && v['code'] && (v['filename'] = v['filename'] || '.'))
    traverse(buildAST(v['code'], v['filename']).ast, opt)
  return traverse((v as BabelFileResult).ast, opt)
}
export { Visitor }

export function parseJSONFromJSCode(code: string) {
  // 防止恶意代码
  traverseAST(
    { code },
    {
      CallExpression() {
        throw Error('This code snippet is not safe')
      },
      AssignmentExpression() {
        throw Error('This code snippet is not safe')
      },
    },
  )
  return eval(code)
}

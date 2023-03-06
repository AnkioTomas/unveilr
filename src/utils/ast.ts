import * as babel from '@babel/core'
import type { BabelFileResult } from '@babel/core'
import { PathController, ProduciblePath } from '@controller/PathController'

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

import * as babel from '@babel/core'
import { traverse, Visitor, BabelFileResult } from '@babel/core'
import { TraverseOptions } from '@babel/traverse'
import { isProduciblePath, PathController, ProduciblePath } from '@core/controller/PathController'

export async function buildAST(path: ProduciblePath): Promise<BabelFileResult>
export async function buildAST(code: string, filename: string): Promise<BabelFileResult>

export async function buildAST(v: unknown, filename?: string): Promise<BabelFileResult> {
  let code: string = v as string
  if (!filename) {
    const pCtrl = PathController.make(v as ProduciblePath)
    filename = pCtrl.abspath
    code = await pCtrl.read('utf8')
  }
  const ast = await babel.parseAsync(code, { sourceFileName: filename })
  return new babel['File']({ filename }, { ast, code })
}

export type BuildParams = { code: string; filename?: string }

export async function traverseAST(path: ProduciblePath, opt?: TraverseOptions): Promise<void>
export async function traverseAST(builder: BuildParams, opt?: TraverseOptions): Promise<void>
export async function traverseAST(file: BabelFileResult, opt?: TraverseOptions): Promise<void>
export async function traverseAST(v: unknown, opt: TraverseOptions): Promise<void> {
  if (isProduciblePath(v)) {
    const file = await buildAST(v)
    return traverse(file.ast, opt)
  }
  if (typeof v === 'object' && v['code'] && (v['filename'] = v['filename'] || '.')) {
    const file = await buildAST(v['code'], v['filename'])
    return traverse(file.ast, opt)
  }
  return traverse((v as BabelFileResult).ast, opt)
}
export { Visitor }

export function parseJSONFromJSCode(code: string) {
  // 防止恶意代码
  const file = new babel['File']({ filename: '.' }, { ast: babel.parseSync(code), code })
  traverse(file.ast, {
    CallExpression(path) {
      throw Error(`This code snippet is not safe: ${path.getSource().bgRed.bold}`)
    },
    AssignmentExpression(path) {
      throw Error(`This code snippet is not safe: ${path.getSource().bgRed.bold}`)
    },
  })
  return eval(code)
}

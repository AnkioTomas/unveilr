import * as babel from '@babel/core'
import { traverse, Visitor, BabelFileResult } from '@babel/core'
import { TraverseOptions } from '@babel/traverse'
import { isProduciblePath, PathController, ProduciblePath } from '@baseController/PathController'
import { error } from '@utils/colors'

export async function buildAST(path: ProduciblePath): Promise<BabelFileResult>
export async function buildAST(code: string, filename: string): Promise<BabelFileResult>

export async function buildAST(v: ProduciblePath | string, filename?: string): Promise<BabelFileResult> {
  let code = v as string
  if (!filename) {
    const pCtrl = PathController.make(v as ProduciblePath)
    filename = pCtrl.abspath
    code = await pCtrl.read('utf8')
  }
  const ast = await babel.parseAsync(code, { sourceFileName: filename, sourceType: 'script' })
  return new babel['File']({ filename }, { ast, code })
}

export type BuildParams = { code: string; filename?: string }

export async function traverseAST(path: ProduciblePath, opt?: TraverseOptions): Promise<void>
export async function traverseAST(builder: BuildParams, opt?: TraverseOptions): Promise<void>
export async function traverseAST(file: BabelFileResult, opt?: TraverseOptions): Promise<void>
export async function traverseAST(
  v: ProduciblePath | BuildParams | BabelFileResult,
  opt?: TraverseOptions,
): Promise<void> {
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

export function parseJSONFromJSCode(code: string, context?: object) {
  // 防止恶意代码
  const file = new babel['File']({ filename: '.' }, { ast: babel.parseSync(code, { sourceType: 'script' }), code })
  traverse(file.ast, {
    CallExpression(path) {
      throw Error(`This code snippet is not safe: ${error(path.getSource())}`)
    },
    AssignmentExpression(path) {
      throw Error(`This code snippet is not safe: ${error(path.getSource())}`)
    },
  })
  const fn = Function('context', `with(context){return JSON.stringify(${code})}`)
  try {
    return JSON.parse(fn({ JSON, ...context }))
  } catch (e) {
    console.log(fn.toString())
  }
}

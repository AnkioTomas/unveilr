import { expose, isWorkerRuntime } from 'threads/worker'
import { makeTraverseControllerWorker, TraverseControllerResult } from '@core/utils/makeTraverseControllerWorker'
import { TraverseController } from '@core/controller/TraverseController'
import { WorkerController } from '@core/controller/WorkerController'
import { reformat } from '@utils/reformat'

type DataType = {
  scripts: {
    [filename: string]: string
  }
}
type VisitorThis = TraverseController<DataType>
export type TraverseScriptReturnType = TraverseControllerResult<DataType>
const traverseScriptModule = module
export const traverseScript = makeTraverseControllerWorker<DataType>({
  CallExpression(this: VisitorThis, path) {
    const callee = path.node.callee
    if (callee.type === 'Identifier' && callee.name === 'define') {
      const args = path.get('arguments')
      const [filenamePathNode, sourcePathNode] = args
      if (filenamePathNode.node.type !== 'StringLiteral') return
      if (sourcePathNode.node.type !== 'FunctionExpression') return
      const filename = filenamePathNode.node.value
      const body = sourcePathNode.get('body.body')
      const source = (Array.isArray(body) ? body : [body]).map((p) => p.getSource()).join('')
      this.changeItem(
        'scripts',
        (r) => {
          r[filename] = reformat(source, { parser: 'babel' })
          return r
        },
        {},
      )
    }
  },
})
export type TraverseScriptExposed = { traverseScript: typeof traverseScript }
export function traverseScriptWorker(poolSize?: number) {
  if (isWorkerRuntime()) return
  return new WorkerController<TraverseScriptExposed, TraverseScriptReturnType>(traverseScriptModule, poolSize)
}
export default traverseScriptModule
isWorkerRuntime() && expose({ traverseScript })

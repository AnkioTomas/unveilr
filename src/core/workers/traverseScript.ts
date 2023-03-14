import { expose, isWorkerRuntime } from 'threads/worker'
import { makeTraverseControllerWorker, TraverseControllerResult } from '@core/utils/makeTraverseControllerWorker'
import { TraverseController } from '@core/controller/TraverseController'
import { WorkerController } from '@core/controller/WorkerController'

type DataType = Array<{
  path: string
  buffer: string
}>
// TraverseScript traverseScript
export type TraverseScriptReturnType = TraverseControllerResult<DataType>
const traverseScriptModule = module
const traverseScript = makeTraverseControllerWorker<DataType>({
  CallExpression(this: TraverseController<DataType>, path) {
    const callee = path.node.callee
    if (callee.type === 'Identifier' && callee.name === 'define') {
      const args = path.get('arguments')
      const p0 = args[0]
      if (p0.node.type !== 'StringLiteral') return
      console.log(args.splice(1).length)
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

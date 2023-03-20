import { expose } from 'threads/worker'
import { isWorkerRuntime } from '@utils/isWorkerRuntime'
import { makeTraverseControllerWorker, TraverseControllerResult } from '@utils/makeTraverseControllerWorker'
import { TraverseController } from '@core/controller/TraverseController'
import { WorkerController } from '@core/controller/WorkerController'

type DataType = {
  defines: string[]
}
export type TraverseAppServiceReturnType = TraverseControllerResult<DataType>
const traverseAppServiceModule = module
const traverseAppService = makeTraverseControllerWorker<DataType>({
  CallExpression(this: TraverseController<DataType>, path) {
    const callee = path.node.callee
    if (callee.type === 'Identifier' && callee.name === 'define') {
      const args = path.get('arguments')
      if (args.length) {
        this.changeItem(
          'defines',
          (arr) => {
            arr.push(args[0].getSource())
            return arr
          },
          [],
        )
      }
    }
  },
})
export type TraverseAppServiceExposed = { traverseAppService: typeof traverseAppService }
export function traverseAppServiceWorker(poolSize?: number) {
  if (isWorkerRuntime()) return
  return new WorkerController<TraverseAppServiceExposed, TraverseAppServiceReturnType>(
    traverseAppServiceModule,
    poolSize,
  )
}
export default traverseAppServiceModule
isWorkerRuntime() && expose({ traverseAppService })

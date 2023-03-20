import { expose } from 'threads/worker'
import { isWorkerRuntime } from '@core/utils/isWorkerRuntime'
import { makeTraverseControllerWorker, TraverseControllerResult } from '@core/utils/makeTraverseControllerWorker'
import { TraverseController } from '@core/controller/TraverseController'
import { WorkerController } from '@core/controller/WorkerController'
import { parseJSONFromJSCode } from '@/utils'

type DataType = {
  styleFragments: {
    [key: string]: string
  }
  commonStyles: {
    [key: string]: string
  }
}
type VisitorThis = TraverseController<DataType>
export type TraverseWxssReturnType = TraverseControllerResult<DataType>
const traverseWxssModule = module
export const traverseWxss = makeTraverseControllerWorker<DataType>({
  //  读取 setCssToHead 函数
  CallExpression(this: VisitorThis, path) {
    const callee = path.node.callee
    if (callee.type === 'Identifier' && callee.name === 'setCssToHead') {
      const args = path.get('arguments')
      if (!args.length || (args.length === 1 && args[0].getSource() === '[]')) return
      // 第二项是错误信息
      if (args.length === 3) args.splice(1, 1)
      const [sources, _path] = args.map((p) => {
        const data = parseJSONFromJSCode(p.getSource())
        return data.path ? data.path : data
      })
      this.changeItem(
        'styleFragments',
        (v) => {
          v[_path] = sources
          return v
        },
        {},
      )
    }
  },
  // 读取 __COMMON_STYLESHEETS__
  MemberExpression(this: VisitorThis, path) {
    const node = path.node
    if (
      node.object.type === 'Identifier' &&
      node.property.type === 'StringLiteral' &&
      node.object.name === '__COMMON_STYLESHEETS__'
    ) {
      const p = node.property.value
      this.changeItem(
        'commonStyles',
        (v) => {
          v[p] = parseJSONFromJSCode(path.getOpposite().getSource())
          return v
        },
        {},
      )
    }
  },
})
export type TraverseAppServiceExposed = { traverseWxss: typeof traverseWxss }

export function traverseWxssWorker(poolSize?: number) {
  if (isWorkerRuntime()) return
  return new WorkerController<TraverseAppServiceExposed, TraverseWxssReturnType>(traverseWxssModule, poolSize)
}
export default traverseWxssModule
isWorkerRuntime() && expose({ traverseWxss })

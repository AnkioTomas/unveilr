import { TraverseController } from '@core/controller/TraverseController'
import { Visitor } from '@babel/traverse'
import { BabelFileResult } from '@babel/core'
import { BuildParams } from '@/utils'
import { ProduciblePath } from '@core/controller/PathController'

export type TraverseControllerResult<R> = {
  data: R
  args: unknown[]
}
export type TraverseControllerWorkerFn<R> = (
  fileBuilder: ProduciblePath | BuildParams | BabelFileResult,
  ...args: unknown[]
) => Promise<TraverseControllerResult<R>>

export function makeTraverseControllerWorker<R extends object>(visitor: Visitor): TraverseControllerWorkerFn<R> {
  return async function (
    fileBuilder: ProduciblePath | BuildParams | BabelFileResult,
    ...args: unknown[]
  ): Promise<TraverseControllerResult<R>> {
    const tCtrl = new TraverseController<R>(fileBuilder as unknown, visitor)
    await tCtrl.traverse()
    return { data: tCtrl.data, args }
  }
}

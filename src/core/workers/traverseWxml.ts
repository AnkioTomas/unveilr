import { expose, isWorkerRuntime } from 'threads/worker'
import { makeTraverseControllerWorker, TraverseControllerResult } from '@core/utils/makeTraverseControllerWorker'
import { TraverseController } from '@core/controller/TraverseController'
import { WorkerController } from '@core/controller/WorkerController'
import { parseJSONFromJSCode } from '@/utils'

type DataType = {
  wxmlFragments: {
    [key: string]: string
  }
}
type VisitorThis = TraverseController<DataType>
export type TraverseWxmlReturnType = TraverseControllerResult<DataType>
const traverseWxmlModule = module
const vNodeRE = /gz\$gwx_[A-Za-z_0-9]+/
export const traverseWxml = makeTraverseControllerWorker<DataType>({
  // 解析动态计算的变量数组
  FunctionExpression(this: VisitorThis, path) {
    const parent = path.getFunctionParent()
    if (!parent) return
    if (!parent.isFunctionDeclaration()) return
    const fn = parent.get('id')
    if (!fn) return
    const functionName = fn.getSource()
    if (!vNodeRE.test(functionName)) return
    const zMap = {} // var a=11
    const zArr = [] // Z([3,'xx'])...
    const list = path.get('body.body')
    const blocks = Array.isArray(list) ? list : [list]
    blocks.forEach((p) => {
      if (p.isIfStatement() || p.isFunctionDeclaration()) return
      if (p.isVariableDeclaration()) {
        const declarations = p.get('declarations')[0]
        if (!declarations) return
        const { id, init } = declarations.node
        if (id.type === 'Identifier' && init.type === 'NumericLiteral') {
          zMap[id.name] = init.value
        }
      } else if (p.isExpressionStatement()) {
        const expr = p.get('expression')
        if (!expr.isCallExpression()) return
        const zArg = expr.get('arguments')[0]
        if (zArg.isArrayExpression() || zArg.isMemberExpression()) {
          zArr.push(parseJSONFromJSCode(zArg.getSource(), { ...zMap, z: zArr }))
        }
      }
    })
    console.log(JSON.stringify({ [functionName]: zArr }))
  },
})
export type TraverseAppServiceExposed = { traverseWxml: typeof traverseWxml }

export function traverseWxmlWorker(poolSize?: number) {
  if (isWorkerRuntime()) return
  return new WorkerController<TraverseAppServiceExposed, TraverseWxmlReturnType>(traverseWxmlModule, poolSize)
}

export default traverseWxmlModule
isWorkerRuntime() && expose({ traverseWxml })

if (require.main === module) {
  const code = `function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'cu-custom'])
Z([[2,'+'],[[2,'+'],[[2,'+'],[1,'height:'],[[7],[3,'CustomBar']]],[1,'px']],[1,';']])
Z([[4],[[5],[[5],[[5],[1,'cu-bar fixed']],[[2,'?:'],[[2,'!='],[[7],[3,'bgImage']],[1,'']],[1,'none-bg text-white bg-img'],[1,'']]],[[7],[3,'bgColor']]]])
Z([[7],[3,'style']])
Z([[7],[3,'isBack']])
Z([3,'__e'])
Z([3,'action'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'BackPage']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'cuIcon-back'])
Z([3,'backText'])
Z([3,'content'])
Z([[2,'+'],[[2,'+'],[[2,'+'],[1,'top:'],[[7],[3,'StatusBar']]],[1,'px']],[1,';']])
Z([3,'content'])
Z([3,'right'])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}`
  traverseWxml({ code })
}

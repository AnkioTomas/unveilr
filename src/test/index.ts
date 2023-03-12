// import { WxapkgController } from '@controller/WxapkgController'
// const wCtrl = new WxapkgController('files/wxa8da525af05281f3-boos直聘/_module_/module')
// console.log(wCtrl.logtype)
// import * as babel from '@babel/core'
// import { Visitor } from '@babel/traverse'
// import { buildAST } from '@utils/ast'
// import { AppConfigParser } from '@core/decompiler/wxapkg/AppConfigParser'
// import { PathController } from '@/core'

// import { md5 } from '@/utils'
// export function traverse1() {
//   const file = buildAST('files/wx874eee9e6a120dff-租客/__APP__/app-wxss.js')
//   const v: Visitor = {
//     FunctionDeclaration(_path) {
//       if (_path.node.id.name.startsWith('gz$gwx')) {
//         _path.traverse({
//           FunctionExpression(__path) {
//             if (!__path.node.id && __path.node.params.length === 1 && __path.node.params[0]['name'] === 'z') {
//               console.log(typeof __path.getSource())
//             }
//           },
//         })
//       }
//     },
//   }
//   babel.traverse(file.ast, {
//     AssignmentExpression(path) {
//       if (path.node.left['name'] === '$gwx') {
//         path.traverse(v)
//       }
//     },
//   })
// }

// console.log(md5(Buffer.from('123456')))

// new AppConfigParser('files/_468736192_311/app-config.json').parse()
// const p1 = './page/admin/index.wxss' // 主 被导入的
// const p2 = './page/page-controller/index.wxss'

// console.log(PathController.make(p2).relative(p1).unixpath)

// 存入pop出来的名字 [index.wxss]
// p2 往前退 ./page/page-controller/ 判断是不是用一个文件夹
// p1, p2 求

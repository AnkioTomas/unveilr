// import { WxapkgDecryptor } from '@core/decryptor/WxapkgDecryptor'
//
// const wd = new WxapkgDecryptor({
//   path: 'files/wx2ea687f4258401a9.wxapkg',
//   target: 'files/wx2ea687f4258401a9.d.wxapkg',
// })
// wd.decrypt().save()
//
// import { WxapkgController } from '@controller/WxapkgController'
//
//
// const wCtrl = new WxapkgController('files/wxa8da525af05281f3-boos直聘/_module_/module')
// console.log(wCtrl.logtype)
import * as babel from '@babel/core'
import { PathController } from '@controller/PathController'
import { Visitor } from '@babel/traverse'
const source = PathController.make('files/wx874eee9e6a120dff-租客/__APP__/app-wxss.js').read('utf-8') as string

const v: Visitor = {
  FunctionDeclaration(_path) {
    if (_path.node.id.name.startsWith('gz$gwx')) {
      _path.traverse({
        FunctionExpression(__path) {
          if (!__path.node.id && __path.node.params.length === 1 && __path.node.params[0]['name'] === 'z') {
            console.log(typeof __path.getSource())
          }
        },
      })
    }
  },
}
const File = babel['File']
const filename = 's.js'

const ast = babel.parseSync(source, { sourceFileName: filename })
const file = new File({ filename }, { code: source, ast })
babel.traverse(file.ast, {
  AssignmentExpression(path) {
    if (path.node.left['name'] === '$gwx') {
      path.traverse(v)
    }
  },
})

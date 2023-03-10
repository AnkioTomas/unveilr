import { BaseParser, ParserError } from './BaseParser'
import { ProduciblePath } from '@core/controller'
import { WxapkgKeyFile, WxapkgType } from '@/enum'
import { checkWxapkgType } from '@/core'
import { traverseAST } from '@/utils'

export class WxssParser extends BaseParser {
  constructor(path: ProduciblePath, private readonly pkgType?: WxapkgType) {
    super(path)
    if (!this.pathCtrl.isDirectory) throw new ParserError(`Path ${this.pathCtrl.logpath} is not a directory!`)
    this.pkgType = pkgType || checkWxapkgType(this.pathCtrl)
    switch (this.pkgType) {
      case WxapkgType.APP_V1:
        {
          const source = this.pathCtrl.join(WxapkgKeyFile.PAGE_FRAME_HTML).read('utf8') as string
          const matchScripts = (source: string): string => {
            const matchRegex = /<script>(?<source>[\s\S]+?)<\/script>/m
            const matchResult = []
            const _matchAll = (str: string) => {
              const r = str.match(matchRegex)
              if (!r || !r.groups) return
              matchResult.push(r.groups.source.trim())
              _matchAll(str.replace(matchRegex, ''))
            }
            _matchAll(source)
            return matchResult.filter(Boolean).join(';\n')
          }
          const result = matchScripts(source)
          if (!result) throw new ParserError(`Directory ${this.pathCtrl.logpath} not a valid package`)
          this.source = result
        }
        break
      case WxapkgType.APP_V2:
        this.source = this.pathCtrl.join(WxapkgKeyFile.APP_WXSS).read('utf8') as string
        break
      case WxapkgType.APP_V3:
        this.source = [
          this.pathCtrl.join(WxapkgKeyFile.APP_WXSS).read('utf8') as string,
          this.pathCtrl.join(WxapkgKeyFile.WEBVIEW_APP).read('utf8') as string,
        ].join(';\n')
        break
      case WxapkgType.APP_SUBPACKAGE_V1:
        this.source = this.pathCtrl.join(WxapkgKeyFile.PAGE_FRAME).read('utf8') as string
        break
      case WxapkgType.APP_SUBPACKAGE_V2:
        this.source = [
          this.pathCtrl.join(WxapkgKeyFile.PAGE_FRAME).read('utf8') as string,
          this.pathCtrl.join(WxapkgKeyFile.WEBVIEW_APP).read('utf8') as string,
        ].join(';\n')
        break
      default:
        throw new ParserError(`WxssParser not supported for type: ${this.pkgType}`)
    }
  }
  parse(_source?: Buffer): this {
    super.parse(_source)
    traverseAST(
      { filename: 'noop.js', code: this.source },
      {
        CallExpression(path) {
          const callee = path.node.callee
          if (callee.type === 'Identifier' && callee.name === 'setCssToHead') {
            // console.log()
            path.getSource()
          }
        },
        MemberExpression(path) {
          const node = path.node
          if (
            node.object.type === 'Identifier' &&
            node.property.type === 'StringLiteral' &&
            node.object.name === '__COMMON_STYLESHEETS__'
          ) {
            // 对应节点
            console.log(node.property.value)
            // console.log(path.getOpposite().getSource())
          }
        },
      },
    )
    return this
  }
}

if (require.main === module) {
  new WxssParser('files/watermark').parse()
}

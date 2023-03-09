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
          const result = source.match(/<script>(?<source>[\s\S]+)<\/script>/m)
          if (!result) throw new ParserError(`Directory ${this.pathCtrl.logpath} not a valid package`)
          this.source = result.groups.source.trim()
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
            console.log(path.getSource())
          }
        },
      },
    )
    return this
  }
}

new WxssParser('files/watermark').parse()

import { BaseParser, ParserError } from './BaseParser'
import { WxapkgKeyFile, WxapkgType } from '@/enum'
import { checkWxapkgType, TraverseController, ProduciblePath, PathController } from '@/core'
import { parseJSONFromJSCode } from '@/utils'
import { transformStyle } from '@core/utils/transformStyle'
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
  private dumpResult(data: { [key: string]: unknown }): this {
    Object.entries(data).forEach(([k, v]) => {
      if (!Array.isArray(v)) return
      const source = v
        .map((el) => {
          if (!Array.isArray(el)) return el
          // [1] 是个分割符
          if (el.length === 1 && el[0] === 1) return ''
          switch (el[0]) {
            case 0: // 属性值单位 rpx
              return el[1] + 'rpx'
            case 2: // 导入
              return `@import "${PathController.make(k).relative(el[1]).unixpath}";\n`
            default:
              this.logger.warn(`Unprocessed data found: ${JSON.stringify(el)}`)
              return ''
          }
        })
        .join('')
      this.parseResult.push({
        source: transformStyle(source),
        path: this.pathCtrl.join(k),
      })
    })
    return this
  }
  parse(_source?: Buffer): this {
    super.parse(_source)
    const traverse = new TraverseController({ code: this.source })
    traverse
      .addVisitors({
        //  读取 setCssToHead 函数
        CallExpression(this: TraverseController, path) {
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
            this.changeItem<{ [key: string]: unknown }>(
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
        MemberExpression(this: TraverseController, path) {
          const node = path.node
          if (
            node.object.type === 'Identifier' &&
            node.property.type === 'StringLiteral' &&
            node.object.name === '__COMMON_STYLESHEETS__'
          ) {
            const p = node.property.value
            this.changeItem<{ [key: string]: unknown }>(
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
      .traverse()
    this.dumpResult(traverse.getItem('styleFragments'))
    this.dumpResult(traverse.getItem('commonStyles'))
    return this
  }
}

if (require.main === module) {
  new WxssParser('files/wx874eee9e6a120dff-租客/__APP__').parse().save()
}

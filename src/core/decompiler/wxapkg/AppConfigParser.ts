import { BaseParser, ParserError } from '@core/decompiler/wxapkg/BaseParser'
import { PathController, ProduciblePath } from '@controller/PathController'

export class AppConfigParser extends BaseParser {
  constructor(path: ProduciblePath) {
    super(path)
  }
  parse(): this {
    super.parse()
    try {
      const config = {
        ...JSON.parse(this.source),
        pop(key) {
          const result = config[key]
          delete config[key]
          return result
        },
      }
      const entryPagePath = PathController.make(config.pop('entryPagePath'))
      const pages: string[] = config.pop('pages')
      const subPackages: { [key: string]: unknown }[] = config.pop('subPackages')
      const epp = entryPagePath.join('..', entryPagePath.basenameWithout).unixpath
      pages.splice(pages.indexOf(epp), 1)
      pages.unshift(epp)

      if (subPackages) {
        subPackages.forEach((subPack) => {
          const root = subPack.root as string
          const _subPages = (subPack.pages as string[]) || pages.filter((p) => p.startsWith(root))
          subPack.pages = _subPages.map((page) => page.replace(root, ''))
        })
      }

      const extAppid = config.pop('extAppid')
      const ext = config.pop('ext')
      extAppid &&
        ext &&
        this.pathCtrl.join('ext.json').write(
          JSON.stringify({
            extEnable: true,
            extAppid,
            ext,
          }),
          'utf8',
        )
    } catch (e) {
      throw new ParserError('Parse failed! ' + e.message)
    }
    return this
  }
}

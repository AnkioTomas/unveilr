import { BaseParser, ParserError } from '@core/decompiler/wxapkg/BaseParser'
import { PathController, ProduciblePath } from '@controller/PathController'
import { md5, traverseAST } from '@/utils'
import { WxapkgKeyFile } from '@/enum'

export class AppConfigParser extends BaseParser {
  constructor(path: ProduciblePath) {
    super(path)
  }
  parse(): this {
    super.parse()
    try {
      const config = {
        ...JSON.parse(this.source),
        pop<T>(key, _default?: T): T {
          const result = config[key]
          delete config[key]
          return result || _default
        },
      }

      // 处理入口
      const entryPagePath = PathController.make(config.pop('entryPagePath'))
      const pages: string[] = config.pop('pages')
      const global = config.pop('global')
      const epp = entryPagePath.whitout().unixpath
      pages.splice(pages.indexOf(epp), 1)
      pages.unshift(epp)

      // 处理分包路径
      const subPackages: { [key: string]: unknown }[] = config.pop('subPackages')
      if (subPackages) {
        subPackages.forEach((subPack) => {
          const root = subPack.root as string
          const _subPages = (subPack.pages as string[]) || pages.filter((p) => p.startsWith(root))
          subPack.pages = _subPages.map((page) => {
            const _index = pages.indexOf(page)
            _index > 0 && pages.splice(_index, 1)
            return page.replace(root, '')
          })
        })
        this.logger.info(`AppConfigParser detected ${subPackages.length.toString().blue.bold} subpackages`)
      }

      // 处理 ext.json
      const extAppid = config.pop('extAppid')
      const ext = config.pop('ext')
      if (extAppid && ext) {
        const logPath = this.pathCtrl.join('ext.json').writeJSON({ extEnable: true, extAppid, ext }).logpath
        this.logger.info(`Ext save to ${logPath}`)
      }

      // tabBar
      const tabBar = config.pop('tabBar')
      if (tabBar && Array.isArray(tabBar.list)) {
        const hashMap: { [key: string]: string }[] = Object.create(null)
        this.pathCtrl
          .join('..')
          .deepListDir()
          .forEach((p) => {
            const pCtrl = PathController.unix(p)
            hashMap[md5(pCtrl.read() as Buffer)] = pCtrl.path.replace(this.pathCtrl.dirname + '/', '')
          })
        tabBar.list.forEach((item) => {
          item.pagePath = PathController.make(item.pagePath).whitout().unixpath
          if (item.iconData) {
            const path = hashMap[md5(item.iconData, true)]
            if (path) {
              item.iconPath = PathController.make(path).unixpath
              delete item.iconData
            }
          }
          if (item.selectedIconData) {
            const path = hashMap[md5(item.selectedIconData, true)]
            if (path) {
              item.selectedIconPath = PathController.make(path).unixpath
              delete item.selectedIconData
            }
          }
        })
      }

      interface pageInfo {
        [key: string]: {
          window: { usingComponents: { [key: string]: unknown }; [key: string]: unknown }
        }
      }

      // usingComponents
      const page: pageInfo = config.pop('page')
      Object.keys(page).forEach((key) => {
        const usingComponents = page[key].window.usingComponents
        if (!usingComponents || !Object.keys(usingComponents).length) return
        Object.keys(usingComponents).forEach((k) => {
          const p = (usingComponents[k] as string).replace('plugin://', '/__plugin__/')
          const file = p.startsWith('/') ? p.slice(1) : PathController.make(key).join('..', p).unixpath
          page[file] = page[file] || Object.create(null)
          page[file].window = page[file].window || Object.create(null)
          page[file].window.component = true
        })
      })

      // usingComponents -> json
      const service = this.pathCtrl.join('..', WxapkgKeyFile.APP_SERVICE)
      if (!service.exists) return this
      const result = Object.create(null)
      traverseAST(service, {
        AssignmentExpression(path) {
          const left = path.node.left
          if (
            left &&
            left.type === 'MemberExpression' &&
            left.object.type === 'Identifier' &&
            left.object.name === '__wxAppCode__' &&
            left.property.type === 'StringLiteral' &&
            left.property.value.endsWith('.json')
          ) {
            const key = left.property.value
            path.traverse({
              ObjectExpression(p) {
                if (p.parentKey === 'right') {
                  result[key] = JSON.parse(p.getSource())
                }
              },
            })
          }
        },
      })
      Object.keys(result).forEach((key) => {
        page[key] = { window: result[key] }
      })

      this.pathCtrl.join('..', WxapkgKeyFile.APP_JSON).writeJSON(
        Object.assign(config, {
          tabBar,
          subPackages,
          ...global,
        }),
      )
      console.log(page)
      // Object.keys(page).forEach((key) => {
      //   let pCtrl = PathController.make(key)
      //   if (pCtrl.suffix !== '.json') pCtrl = pCtrl.whitout('.json')
      //   console.log(pCtrl.unixpath)
      //   // pCtrl.mkdir().writeJSON(page[key])
      // })
    } catch (e) {
      throw new ParserError('Parse failed! ' + e.message)
    }
    return this
  }
}

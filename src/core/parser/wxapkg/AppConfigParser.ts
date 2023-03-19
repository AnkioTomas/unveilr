import { ParserError, BaseParser } from '../BaseParser'
import { md5 } from '@/utils'
import { WxapkgKeyFile } from '@/enum'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { Visitor } from '@babel/core'
import { AppConfigServiceSubject, S2Observable, TVSubject } from '@core/parser/wxapkg/types'
import { Saver } from '@core/utils/Saver'
import { filter } from 'observable-fns'

interface pageInfo {
  [key: string]: {
    window: { usingComponents: { [key: string]: unknown }; [key: string]: unknown }
  }
}
export class AppConfigParser extends BaseParser {
  private serviceSource: string
  private sources: string
  isGame = false

  constructor(saver: Saver) {
    super(saver)
  }
  async parse(observable: S2Observable<TVSubject>): Promise<void> {
    try {
      if (this.isGame) return this.parseGame()
      const dirCtrl = this.saver.saveDirectory
      const config = {
        ...JSON.parse(this.sources),
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
      const seenPage = new Set()
      const save = (path: ProduciblePath, buffer: string | object) => {
        const filename = PathController.make(path).unixpath
        if (seenPage.has(filename)) return
        seenPage.add(filename)
        this.saver.add({
          path,
          buffer,
        })
      }
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
        const logPath = dirCtrl.join('ext.json').writeJSONSync({ extEnable: true, extAppid, ext }).logpath
        this.logger.info(`Ext save to ${logPath}`)
      }
      // tabBar
      const tabBar = config.pop('tabBar')
      const ignoreSuffixes = 'html,wxss,json'
      if (tabBar && Array.isArray(tabBar.list)) {
        const hashMap: { [key: string]: string }[] = Object.create(null)
        dirCtrl.deepListDir().forEach((p) => {
          const pCtrl = PathController.unix(p)
          if (ignoreSuffixes.includes(pCtrl.suffixWithout)) return
          hashMap[md5(pCtrl.readSync())] = pCtrl.crop(dirCtrl).unixpath
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
      // usingComponents
      const page: pageInfo = config.pop('page')
      config.pop('renderer')
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
      const result = Object.assign(config, {
        tabBar,
        subPackages,
        ...global,
        pages,
      })
      save(WxapkgKeyFile.APP_JSON, result)
      // usingComponents -> json
      if (!this.serviceSource) ParserError.throw(`Service source not found!`)
      observable.pipe<S2Observable<AppConfigServiceSubject>>(filter((v) => v.AppConfigService)).subscribe((value) => {
        Object.entries(value.AppConfigService).forEach((args) => save(...args))
      })
      Object.keys(page).forEach((key) => {
        let pCtrl = PathController.make(key)
        if (pCtrl.suffix !== '.json') pCtrl = pCtrl.whitout('.json')
        save(pCtrl, page[key]['window'])
      })
    } catch (e) {
      throw new ParserError('Parse failed! ' + e.message)
    }
  }
  parseGame() {
    const config = JSON.parse(this.sources)
    const subPackages = config['subPackages']
    subPackages && this.logger.info(`AppConfigParser detected ${subPackages.length.toString().blue.bold} subpackages`)
    this.saver.add({
      path: WxapkgKeyFile.GAME_JSON,
      buffer: this.sources,
    })
  }

  setServiceSource(source: string) {
    this.serviceSource = source
  }
  setSources(sources: string) {
    this.sources = sources
  }
  setIsGame(isGame: boolean) {
    this.isGame = isGame
  }
  static visitor(subject: AppConfigServiceSubject): Visitor {
    return {
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
                subject.next({
                  AppConfigService: {
                    [key]: p.getSource(),
                  },
                })
              }
            },
          })
        }
      },
    }
  }
}

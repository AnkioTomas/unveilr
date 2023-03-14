import { WxapkgKeyFile, WxapkgType } from '@/enum'
import { BaseParser, ParserError } from '../BaseParser'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { checkWxapkgType } from '@core/utils/checkWxapkg'
import { matchScripts } from '@core/utils/matchScripts'
import { traverseWxss } from '@core/workers/traverseWxss'
import { transformStyleWorker } from '@core/workers/transformStyle'

type PromiseInnerType<T extends Promise<unknown>> = T extends Promise<infer P> ? P : never
type ValueOf<T extends object> = T[keyof T]
type DataType = PromiseInnerType<ReturnType<typeof traverseWxss>>['data']
type Tasks = Parameters<ReturnType<typeof transformStyleWorker>['addTask']>

export class WxssParser extends BaseParser {
  private isLoaded: boolean
  private pkgType: WxapkgType
  private source: string
  constructor(path: ProduciblePath, pkgType?: WxapkgType) {
    super(path)
    if (!this.pathCtrl.isDirectory) throw new ParserError(`Path ${this.pathCtrl.logpath} is not a directory!`)
    this.pkgType = pkgType
    this.isLoaded = false
  }

  private async init() {
    if (!this.pkgType) this.pkgType = await checkWxapkgType(this.pathCtrl)
    await this.readSource()
    this.isLoaded = true
  }

  private async readSource() {
    switch (this.pkgType) {
      case WxapkgType.APP_V1:
        {
          const source = await this.pathCtrl.join(WxapkgKeyFile.PAGE_FRAME_HTML).read('utf8')
          const result = matchScripts(source)
          if (!result) throw new ParserError(`Directory ${this.pathCtrl.logpath} not a valid package`)
          this.source = result
        }
        break
      case WxapkgType.APP_V2:
        this.source = await this.pathCtrl.join(WxapkgKeyFile.APP_WXSS).read('utf8')
        break
      case WxapkgType.APP_V3:
        this.source = [
          await this.pathCtrl.join(WxapkgKeyFile.APP_WXSS).read('utf8'),
          await this.pathCtrl.join(WxapkgKeyFile.WEBVIEW_APP).read('utf8'),
        ].join(';\n')
        break
      case WxapkgType.APP_SUBPACKAGE_V1:
        this.source = await this.pathCtrl.join(WxapkgKeyFile.PAGE_FRAME).read('utf8')
        break
      case WxapkgType.APP_SUBPACKAGE_V2:
        this.source = [
          await this.pathCtrl.join(WxapkgKeyFile.PAGE_FRAME).read('utf8'),
          await this.pathCtrl.join(WxapkgKeyFile.WEBVIEW_APP).read('utf8'),
        ].join(';\n')
        break
      default:
        throw new ParserError(`WxssParser not supported for type: ${this.pkgType}`)
    }
    // 解析 html 文件中 setCssToHead 函数附带的样式表
    const htmlSources: string[] = []
    await Promise.all(
      this.pathCtrl
        .deepListDir()
        .map((p) => {
          const ctrl = PathController.make(p)
          if (ctrl.suffixWithout.toUpperCase() !== 'html') return
          return ctrl.read('utf8').then((s) => {
            if (!s) return
            htmlSources.push(matchScripts(s))
          })
        })
        .filter(Boolean),
    )
    this.source = htmlSources.join(';\n') + this.source
  }

  private makeTasks(data: ValueOf<DataType>): Tasks {
    return Object.entries(data).map(([k, v]) => {
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
      return (task) => task.transformStyle(source, k)
    })
  }

  async parse(): Promise<void> {
    if (!this.isLoaded) await this.init()
    // 单个任务不需要使用Worker
    const {
      data: { styleFragments, commonStyles },
    } = await traverseWxss({ code: this.source })
    const tCtrl = transformStyleWorker()
    tCtrl.addTask(...this.makeTasks(styleFragments), ...this.makeTasks(commonStyles))
    await tCtrl.start((r) => this.saver.add(r as Required<typeof r>))
    await tCtrl.terminate()
  }
}

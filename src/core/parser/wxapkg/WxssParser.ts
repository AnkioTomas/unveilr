import { BaseParser } from '../BaseParser'
import { PathController, ProduciblePath } from '@core/controller/PathController'
import { matchScripts } from '@core/utils/matchScripts'
import {
  Dict,
  S2Observable,
  TVSubject,
  WxssParserCommon2Subject,
  WxssParserCommonSubject,
  WxssParserSubject,
} from '@core/parser/wxapkg/types'
import { Visitor } from '@babel/core'
import { getLogger, md5, parseJSONFromJSCode } from '@/utils'
import { Saver } from '@core/utils/Saver'
import { filter } from 'observable-fns'
import { transformStyle } from '@core/workers/transformStyle'
import { unlink } from '@utils/unlink'
import { WxapkgKeyFile } from '@/enum'

function makeCStyleName(index: number): string {
  return `./__unveilr_wxss__/unveilr.${md5(index.toString()).slice(-6)}.wxss`
}
export function styleConversion(k: string, source: string): string {
  const logger = getLogger('StyleConversion')
  const data = parseJSONFromJSCode(source)
  if (!Array.isArray(data)) return

  const handleEl = (el) => {
    if (!Array.isArray(el)) return el
    // [1] 是个分割符
    if (el.length === 1 && el[0] === 1) return ''
    switch (el[0]) {
      // 属性值单位 rpx
      case 0:
        return el[1] + 'rpx'
      // 导入
      case 2: {
        const _el = el[1]
        let path
        if (typeof _el === 'number') {
          path = makeCStyleName(_el)
        } else if (typeof _el === 'string') {
          path = _el
        } else {
          if (Array.isArray(_el)) return handleEl(_el)
          logger.warn(`Unprocessed element found: ${JSON.stringify(_el)}`)
          return ''
        }
        if (!path) return ''
        const target = PathController.make(k).relative(path).unixpath
        return target ? `@import "${path.replace('./', '/')}";\n` : ''
      }
      default:
        logger.warn(`Unprocessed data found: ${JSON.stringify(el)}`)
        return ''
    }
  }
  const newData = data.map((el) => handleEl(el)).join('')
  return transformStyle(newData).buffer
}

export class WxssParser extends BaseParser {
  constructor(saver: Saver) {
    super(saver)
  }

  static getHTMLStyleSource(findDir: ProduciblePath): string {
    const htmlSources: string[] = []
    const findDirCtrl = PathController.make(findDir)
    findDirCtrl
      .deepListDir()
      .map((p) => {
        const ctrl = PathController.make(p)
        if (ctrl.suffixWithout.toLowerCase() !== 'html') return
        if (ctrl.basename === WxapkgKeyFile.PAGE_FRAME_HTML) return
        const s = ctrl.readSync('utf8')
        s && htmlSources.push(matchScripts(s))
        unlink(ctrl)
      })
      .filter(Boolean)
    return htmlSources.join(';\n')
  }

  async parse(observable: S2Observable<TVSubject>): Promise<void> {
    const addSaver = (data: Dict) => {
      Object.entries(data).forEach(([path, buffer]) => this.saver.add({ path, buffer }))
    }
    // 订阅公共样式
    observable
      .pipe<S2Observable<WxssParserCommonSubject>>(filter((v) => v.WxssParserCommon))
      .subscribe((data) => addSaver(data.WxssParserCommon))
    // 订阅公共样式2 _C
    observable
      .pipe<S2Observable<WxssParserCommon2Subject>>(filter((v) => v.WxssParserCommon2))
      .subscribe((data) => addSaver(data.WxssParserCommon2))
    // 订阅非公共样式
    observable
      .pipe<S2Observable<WxssParserSubject>>(filter((v) => v.WxssParser))
      .subscribe((data) => addSaver(data.WxssParser))
  }
  //  读取 `setCssToHead` 函数
  static visitor1(subject: WxssParserSubject): Visitor {
    return {
      CallExpression(path) {
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
          subject.next({
            WxssParser: {
              [_path]: styleConversion(_path, JSON.stringify(sources)),
            },
          })
        }
      },
    }
  }
  // 读取 `__COMMON_STYLESHEETS__`
  static visitor2(subject: WxssParserCommonSubject): Visitor {
    return {
      MemberExpression(path) {
        const node = path.node
        if (
          node.object.type === 'Identifier' &&
          node.property.type === 'StringLiteral' &&
          node.object.name === '__COMMON_STYLESHEETS__'
        ) {
          const p = node.property.value
          subject.next({
            WxssParserCommon: {
              [p]: styleConversion(p, path.getOpposite().getSource()),
            },
          })
        }
      },
    }
  }

  // 读取 `_C` 数组
  static visitor3(subject: WxssParserCommon2Subject): Visitor {
    return {
      VariableDeclarator(path) {
        const id = path.get('id')
        const init = path.get('init')
        if (!(id && init)) return
        if (id.isIdentifier() && id.getSource() === '_C' && init.isArrayExpression()) {
          init.get('elements').forEach((el, index) => {
            const p = makeCStyleName(index)
            subject.next({
              WxssParserCommon2: {
                [p]: styleConversion(p, el.getSource()),
              },
            })
          })
        }
      },
    }
  }
}

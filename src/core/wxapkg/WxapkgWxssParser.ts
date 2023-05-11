import { PathController, ProduciblePath } from '@baseController/PathController'
import { matchScripts } from '@utils/matchScripts'
import {
  Dict,
  S2Observable,
  TVSubject,
  WxssParserCommon2Subject,
  WxssParserCommonSubject,
  WxssParserSubject,
} from './types'
import { Visitor } from '@babel/core'
import { Saver } from '@utils/classes/Saver'
import { filter } from 'observable-fns'
import { transformStyle } from '@utils/transformStyle'
import { WxapkgKeyFile } from './WxapkgEnums'
import { md5 } from '@utils/crypto'
import { getLogger } from '@utils/logger'
import { parseJSONFromJSCode } from '@utils/ast'
import { findBuffer, getSaveController, saveAble2String } from '@baseController/SaveController'
import { BaseParser } from '@base/BaseParser'

function makeCStyleName(index: number): string {
  return `./@unveilr/wxss/unveilr.${md5(index.toString()).slice(-6)}.wxss`
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

export class WxapkgWxssParser extends BaseParser {
  constructor(saver: Saver) {
    super(saver)
  }

  static getHTMLStyleSource(findDir: ProduciblePath): string {
    const htmlSources: string[] = []
    const findDirCtrl = PathController.make(findDir)
    const saveCtrl = getSaveController()
    const suffixes = ['.appservice.js', '.common.js', '.webview.js']
    findBuffer(findDirCtrl).forEach(({ key, buffer }) => {
      const ctrl = PathController.make(key)
      if (ctrl.suffixWithout.toLowerCase() !== 'html') return
      if (ctrl.basename === WxapkgKeyFile.PAGE_FRAME_HTML) return
      const s = saveAble2String(buffer)
      s && htmlSources.push(matchScripts(s))
      if (ctrl.suffixWithout.toLowerCase() === 'html') {
        suffixes.forEach((suffix) => saveCtrl.delete(ctrl.whitout(suffix).abspath))
      }
      saveCtrl.delete(ctrl.abspath)
    })
    return htmlSources.filter(Boolean).join(';\n')
  }

  async parse(observable: S2Observable<TVSubject>): Promise<void> {
    const addSaver = (data: Dict) => {
      Object.entries(data).forEach((args) => this.saver.add(...args))
    }
    let resolve
    const promise = new Promise<void>((_resolve) => (resolve = _resolve))
    // 订阅公共样式
    observable.pipe<S2Observable<WxssParserCommonSubject>>(filter((v) => v.WxssParserCommon)).subscribe({
      next: (data) => addSaver(data.WxssParserCommon),
      complete() {
        resolve && resolve()
      },
    })
    // 订阅公共样式2 _C
    observable.pipe<S2Observable<WxssParserCommon2Subject>>(filter((v) => v.WxssParserCommon2)).subscribe({
      next: (data) => addSaver(data.WxssParserCommon2),
      complete() {
        resolve && resolve()
      },
    })
    // 订阅非公共样式
    observable.pipe<S2Observable<WxssParserSubject>>(filter((v) => v.WxssParser)).subscribe({
      next: (data) => addSaver(data.WxssParser),
      complete() {
        resolve && resolve()
      },
    })
    return promise
  }
  //  读取 `setCssToHead` 函数
  static visitorSetCssToHead(subject: WxssParserSubject): Visitor {
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
  static visitorCommonStyle(subject: WxssParserCommonSubject): Visitor {
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
  static visitorCArray(subject: WxssParserCommon2Subject): Visitor {
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

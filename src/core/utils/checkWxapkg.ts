import { isProduciblePath, PathController, ProduciblePath } from '@core/controller'
import { WxapkgKeyFile, WxapkgType } from '@/enum'

export function checkWxapkg<T extends Error>(path: ProduciblePath, throws?: string | T): boolean
export function checkWxapkg<T extends Error>(buff: Buffer, throws?: string | T): boolean

export function checkWxapkg(v: unknown, throws?: unknown): boolean {
  const buf = (isProduciblePath(v) ? PathController.make(v).read() : v) as Buffer
  const invalid = buf.readUInt8(0) === 0xbe && buf.readUInt8(13) === 0xed
  if (throws && !invalid) throw typeof throws === 'string' ? Error(throws) : throws
  return invalid
}

export function checkWxapkgType(path: ProduciblePath): WxapkgType
export function checkWxapkgType(list: string[], dir: ProduciblePath): WxapkgType
export function checkWxapkgType(v: unknown, dir?: ProduciblePath): WxapkgType {
  let fileList: string[]
  if (isProduciblePath(v)) {
    const pCtrl = PathController.make(v)
    if (!pCtrl.isDirectory) throw Error(`Path ${v} is not a directory`)
    fileList = pCtrl.read() as string[]
    dir = dir || pCtrl.abspath
  } else {
    fileList = v as string[]
  }
  const dirCtrl = PathController.make(dir)
  if (!dirCtrl.isDirectory) throw Error(`Path ${dir} is not a directory`)

  const errorMessage = `Directory ${dir} not a correct package!`
  // 微信小程序主包 V1
  if (fileList.includes(WxapkgKeyFile.PAGE_FRAME_HTML)) return WxapkgType.APP_V1
  // 可能是微信小程序主包也可能是微信小程序分包
  if (fileList.includes(WxapkgKeyFile.PAGE_FRAME)) {
    const pfText = dirCtrl.join(WxapkgKeyFile.PAGE_FRAME).read('utf8') as string
    // 微信小程序主包
    if (pfText.length < 100) {
      if (pfText.includes('__pageFrameJsStartTime__')) return WxapkgType.APP_V2
      if (pfText.includes('This file is left intentionally blank')) return WxapkgType.APP_V3
      throw Error(errorMessage)
    }
    // 微信小程序分包
    if (pfText.includes('__wxAppData')) return WxapkgType.APP_SUBPACKAGE_V2
    if (pfText.includes('__subPageFrameStartTime__')) return WxapkgType.APP_SUBPACKAGE_V1
    throw Error(errorMessage)
  }
  // 微信小游戏
  if (fileList.includes(WxapkgKeyFile.GAME)) {
    if (fileList.includes(WxapkgKeyFile.APP_CONFIG)) return WxapkgType.GAME
    return WxapkgType.GAME_SUBPACKAGE
  }
  // 插件
  if (fileList.includes(WxapkgKeyFile.PLUGIN) && fileList.includes(WxapkgKeyFile.PLUGIN_JSON)) return WxapkgType.PLUGIN

  throw Error(errorMessage)
}

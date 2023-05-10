import { WxapkgKeyFile, WxapkgType } from '../WxapkgEnums'
import { isProduciblePath, PathController, ProduciblePath } from '@baseController/PathController'

export function checkMacEncryption(buf: Buffer): boolean {
  const encryptedForMac = 'WAPkgEncryptedTagForMac'
  return buf.subarray(-encryptedForMac.length).toString() !== encryptedForMac
}
export function checkWxapkg(path: ProduciblePath): boolean
export function checkWxapkg(buff: Buffer): boolean
export function checkWxapkg(v: ProduciblePath | Buffer): boolean {
  const buf = (isProduciblePath(v) ? PathController.make(v).readSync() : v) as Buffer
  return buf.readUInt8(0) === 0xbe && buf.readUInt8(13) === 0xed
}

function _getWxapkgType(fileList: string[]): WxapkgType {
  if (fileList.every((filename) => filename.startsWith('WA'))) return WxapkgType.FRAMEWORK
  // APP_V1/APP_V4
  if (fileList.includes(WxapkgKeyFile.PAGE_FRAME_HTML)) {
    if (fileList.includes(WxapkgKeyFile.COMMON_APP)) return WxapkgType.APP_V4
    return WxapkgType.APP_V1
  }
  // APP_V3/APP_SUBPACKAGE_V2
  if (fileList.includes(WxapkgKeyFile.COMMON_APP))
    return fileList.includes(WxapkgKeyFile.APP_WXSS) ? WxapkgType.APP_V3 : WxapkgType.APP_SUBPACKAGE_V2
  // APP_V2/APP_SUBPACKAGE_V1
  if (fileList.includes(WxapkgKeyFile.PAGE_FRAME))
    return fileList.includes(WxapkgKeyFile.APP_WXSS) ? WxapkgType.APP_V2 : WxapkgType.APP_SUBPACKAGE_V1
  // GAME/GAME_SUBPACKAGE
  if (fileList.includes(WxapkgKeyFile.GAME))
    return fileList.includes(WxapkgKeyFile.APP_CONFIG) ? WxapkgType.GAME : WxapkgType.GAME_SUBPACKAGE
  // APP_PLUGIN_V1/GAME_PLUGIN
  if (fileList.includes(WxapkgKeyFile.PLUGIN_JSON)) {
    if (fileList.includes(WxapkgKeyFile.APPSERVICE)) return WxapkgType.APP_PLUGIN_V1
    if (fileList.includes(WxapkgKeyFile.PLUGIN)) return WxapkgType.GAME_PLUGIN
  }
  // not found
  return null
}
export function checkWxapkgType(path: ProduciblePath): Promise<WxapkgType>
export function checkWxapkgType(list: string[]): WxapkgType
export function checkWxapkgType(v: ProduciblePath | string[]): Promise<WxapkgType> | WxapkgType {
  if (isProduciblePath(v)) {
    const pCtrl = PathController.make(v)
    if (!pCtrl.isDirectory) throw Error(`Path ${v} is not a directory`)
    return pCtrl.readdir().then((fileList) => _getWxapkgType(fileList))
  } else {
    return _getWxapkgType(v)
  }
}

import { SaveController } from '@baseController/SaveController'
import { getConfig } from '@baseController/ConfigController'
import { PathController } from '@baseController/PathController'
import { PackageSuffix } from '@enum/PackageSuffix'
import { WxapkgController } from '@core/wxapkg/WxapkgController'
import { WxapkgKeyFile } from '@core/wxapkg/WxapkgEnums'

export async function invokeWxapkg() {
  SaveController.setIsClean(getConfig('WXClearDecompile'))
  SaveController.setIsReFormat(getConfig('WXReformat'))
  SaveController.addOverrideFiles([WxapkgKeyFile.GAME, WxapkgKeyFile.PLUGIN])
  // SaveController.setIsSafeMode(true)
  const packages = getConfig('WXPackages')
  function filterWxapkg(ctrl: PathController) {
    return ctrl.isFile && ctrl.suffixWithout === PackageSuffix.WXAPKG
  }
  const depth = getConfig('WXDepth')
  const wxapkgList: PathController[] = []
  for (const pack of packages) {
    const ctrl = PathController.make(pack)
    if (ctrl.isDirectory) {
      const list = ctrl
        .deepListDir(depth)
        .map((p) => PathController.make(p))
        .filter((p) => filterWxapkg(p))
      wxapkgList.push(...list)
    } else {
      wxapkgList.push(ctrl)
    }
  }
  return new WxapkgController({
    wxapkgList,
    wxAppId: getConfig('WXAppId'),
    mainSaveDir: getConfig('WXOutput'),
  }).exploit()
}

import { PackageSuffix } from '@/enum/PackageSuffix'
import { clearConsole } from '@utils/clearConsole'
import { registerGlobalException } from '@utils/exceptions'
import { PathController } from '@baseController/PathController'
import { WxapkgController } from '@core/wxapkg/WxapkgController'
import { initializeConfig, getConfig } from '@baseController/ConfigController'
import { getConfigurator } from '@utils/getConfigurator'
import { SaveController } from '@baseController/SaveController'

export async function main() {
  initializeConfig(getConfigurator())
  getConfig('logLevel') === 'debug' && clearConsole()
  registerGlobalException()
  SaveController.setIsClean(getConfig('WXClearDecompile'))
  SaveController.setIsReFormat(getConfig('WXReformat'))
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
main().then()

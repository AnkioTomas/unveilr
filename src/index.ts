import { PackageSuffix } from '@/enum'
import { clearConsole } from '@utils/clearConsole'
import { registerGlobalException } from '@utils/exceptions'
import { PathController } from '@core/controller/PathController'
import { WxapkgController } from '@core/controller/WxapkgController'
import { initializeConfig, getConfig } from '@core/controller/ConfigController'
import { getConfigurator } from '@utils/getConfigurator'
import { SaveController } from '@core/controller/SaveController'
export async function main() {
  initializeConfig(getConfigurator())
  clearConsole()
  registerGlobalException()
  SaveController.setIsClean(getConfig('WXClearDecompile'))
  SaveController.setIsReFormat(getConfig('WXReformat'))
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

import { PackageSuffix } from '@/enum'
import { initializeColors } from '@utils/colors'
import { clearConsole } from '@utils/clearConsole'
import { registerGlobalException } from '@utils/exceptions'
import { PathController } from '@core/controller/PathController'
import { WxapkgController } from '@core/controller/WxapkgController'
import { initializeConfig, getConfig } from '@core/controller/ConfigController'
import { getConfigurator } from '@utils/getConfigurator'

export async function main() {
  initializeColors()
  initializeConfig(getConfigurator())
  clearConsole()
  registerGlobalException()
  const packages = getConfig('WXPackages')
  function filterWxapkg(ctrl: PathController) {
    return ctrl.isFile && ctrl.suffixWithout === PackageSuffix.WXAPKG
  }
  const wxapkgList: PathController[] = []
  for (const pack of packages) {
    const ctrl = PathController.make(pack)
    if (ctrl.isDirectory) {
      const list = (await ctrl.readdir()).filter((p) => filterWxapkg(ctrl.join(p))).map((p) => ctrl.join(p))
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

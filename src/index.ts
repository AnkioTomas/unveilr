import { registerGlobalException } from '@utils/exceptions'
import { setLoggerConfig } from '@utils/logger'
import { setUnlinkConfig } from '@utils/unlink'
import { clearConsole } from '@utils/clearConsole'
import { initializeColors } from '@utils/colors'
import { WxapkgController } from '@core/controller/WxapkgController'
import { PathController } from '@core/controller/PathController'
import { cliConfigurator } from '@/cli'
import { setReformatConfig } from '@utils/reformat'
import { PackageSuffix } from '@/enum'

export async function main() {
  clearConsole()
  registerGlobalException()
  initializeColors()
  setLoggerConfig({ level: cliConfigurator.global.logLevel })
  setUnlinkConfig(cliConfigurator.wx.clean)
  setReformatConfig(cliConfigurator.wx.format)
  const packages = cliConfigurator.wx.packages
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
    wxAppId: cliConfigurator.wx.appid,
    mainSaveDir: cliConfigurator.wx.output,
  }).exploit()
}
main().then()

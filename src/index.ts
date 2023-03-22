import { registerGlobalException } from '@utils/exceptions'
import { setLoggerConfig } from '@utils/logger'
import { setUnlinkConfig } from '@utils/unlink'
import { clearConsole } from '@utils/clearConsole'
import { initializeColors } from '@utils/colors'
import { WxapkgController } from '@core/controller/WxapkgController'
import { PathController } from '@core/controller/PathController'

export async function main() {
  clearConsole()
  initializeColors()
  setLoggerConfig({ level: 'info' })
  setUnlinkConfig(true)
  registerGlobalException()
  const dir = PathController.make('files')
  dir.readdir().then((list) => {
    const ctrl = new WxapkgController(list.filter((p) => p.endsWith('.wxapkg')).map((p) => dir.join(p)))
    return ctrl.exploit()
  })
}
if (require.main === module) {
  main().then()
}

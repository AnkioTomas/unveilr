import { registerGlobalException } from '@utils/exceptions'
import { setLoggerConfig } from '@utils/logger'
import { setUnlinkConfig } from '@utils/unlink'
import { clearConsole } from '@utils/clearConsole'
import { initializeColors } from '@utils/colors'
import { WxapkgController } from '@core/controller/WxapkgController'

export async function main(p: string) {
  clearConsole()
  initializeColors()
  setLoggerConfig({ level: 'debug' })
  setUnlinkConfig(true)
  registerGlobalException()
  await new WxapkgController(p).exploit()
}
main('files/framework.wxapkg')

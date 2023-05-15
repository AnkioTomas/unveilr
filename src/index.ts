import { clearConsole } from '@utils/clearConsole'
import { registerGlobalException } from '@utils/exceptions'
import { initializeConfig, getConfig } from '@baseController/ConfigController'
import { getConfigurator } from '@utils/getConfigurator'
import { invokeWxapkg } from '@core/wxapkg'
;(async () => {
  initializeConfig(getConfigurator())
  getConfig('logLevel') === 'debug' && clearConsole()
  registerGlobalException()
  await invokeWxapkg()
})()

import { registerGlobalException, clearConsole, setLoggerConfig } from '@/utils'
import { WxapkgController } from '@core/controller/WxapkgController'
import { setUnlinkConfig } from '@utils/unlink'

async function main(p: string) {
  clearConsole()
  setLoggerConfig({ level: 'debug' })
  setUnlinkConfig(true)
  registerGlobalException()
  await new WxapkgController(p).exploit()
}
main('files/wx874eee9e6a120dff-租客/__APP__.wxapkg').then(() => {
  return new WxapkgController({
    path: 'files/wx874eee9e6a120dff-租客/_ucenter_.wxapkg',
    saveDir: 'files/wx874eee9e6a120dff-租客/__APP__/ucenter',
  }).exploit()
})

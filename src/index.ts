import { registerGlobalException, clearConsole } from '@/utils'
import { AppConfigParser, PathController, WxapkgExtractor, WxssParser } from '@/core'
import { WxapkgKeyFile } from '@/enum'
clearConsole()
registerGlobalException()

async function main(p: string) {
  const path = PathController.make(p)
  await new WxapkgExtractor(path).extract()
  const packagePath = path.whitout()
  const appConfig = packagePath.join(WxapkgKeyFile.APP_CONFIG)
  const appConfParser = new AppConfigParser(appConfig)
  await appConfParser.parse()
  await appConfParser.save()
  const cssParser = new WxssParser(packagePath)
  await cssParser.parse()
  await cssParser.save()
}
main('files/wxa8da525af05281f3-boos直聘/__APP__.wxapkg').then()

import { registerGlobalException, clearConsole } from '@/utils'
import { WxapkgKeyFile } from '@/enum'
import { PathController } from '@core/controller/PathController'
import { WxapkgExtractor } from '@core/extractor/WxapkgExtractor'
import { AppConfigParser } from '@core/decompiler/wxapkg/AppConfigParser'
import { WxssParser } from '@core/decompiler/wxapkg/WxssParser'
clearConsole()
registerGlobalException()

async function main(p: string) {
  const path = PathController.make(p)
  await new WxapkgExtractor(path).extract()
  const packagePath = path.whitout()
  const appConfig = packagePath.join(WxapkgKeyFile.APP_CONFIG)
  const appConfParser = new AppConfigParser(appConfig)
  appConfParser.parse().then(() => appConfParser.save())
  const cssParser = new WxssParser(packagePath)
  cssParser.parse().then(() => cssParser.save())
}
main('files/wxa8da525af05281f3-boos直聘/__APP__.wxapkg').then()

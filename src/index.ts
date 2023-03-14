import { registerGlobalException, clearConsole, setLoggerOptions } from '@/utils'
import { WxapkgKeyFile } from '@/enum'
import { PathController } from '@core/controller/PathController'
import { WxapkgExtractor } from '@core/extractor/WxapkgExtractor'
import { AppConfigParser } from '@core/parser/wxapkg/AppConfigParser'
import { WxssParser } from '@core/parser/wxapkg/WxssParser'

async function main(p: string) {
  clearConsole()
  setLoggerOptions('info')
  registerGlobalException()
  const path = PathController.make(p)
  await new WxapkgExtractor(path).extract()
  const packagePath = path.whitout()
  const appConfig = packagePath.join(WxapkgKeyFile.APP_CONFIG)
  const appConfParser = new AppConfigParser(appConfig)
  appConfParser.parse().then(() => appConfParser.save())
  const cssParser = new WxssParser(packagePath)
  cssParser.parse().then(() => cssParser.save())
}
main('files/wx874eee9e6a120dff-租客/__APP__.wxapkg').then()

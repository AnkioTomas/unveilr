import { registerGlobalException, clearConsole, setLoggerConfig } from '@/utils'
import { WxapkgKeyFile } from '@/enum'
import { PathController } from '@core/controller/PathController'
import { WxapkgExtractor } from '@core/extractor/WxapkgExtractor'
import { AppConfigParser } from '@core/parser/wxapkg/AppConfigParser'
import { WxssParser } from '@core/parser/wxapkg/WxssParser'
import { ScriptParser } from '@core/parser/wxapkg/ScriptParser'

async function main(p: string) {
  clearConsole()
  setLoggerConfig({ level: 'debug' })
  registerGlobalException()
  const path = PathController.make(p)
  await new WxapkgExtractor(path).extract()
  const packagePath = path.whitout()
  const appConfig = packagePath.join(WxapkgKeyFile.APP_CONFIG)
  const appConfParser = new AppConfigParser(appConfig)
  appConfParser.parse().then(() => appConfParser.save())
  const cssParser = new WxssParser(packagePath)
  cssParser.parse().then(() => cssParser.save())
  const scriptParser = new ScriptParser(packagePath)
  scriptParser.parse().then(() => scriptParser.save())
}
main('files/wxa8da525af05281f3-boos/__APP__.wxapkg').then()

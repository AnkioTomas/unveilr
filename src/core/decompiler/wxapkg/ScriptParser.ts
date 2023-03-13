// import { WxapkgKeyFile, WxapkgType } from '@/enum'
// import { BaseParser, ParserError } from './BaseParser'
// import { PathController, ProduciblePath } from '@core/controller/PathController'
// import { checkWxapkgType } from '@core/utils/checkWxapkg'
//
// export class ScriptParser extends BaseParser {
//   private isLoaded: boolean
//   private pkgType: WxapkgType
//
//   constructor(path: ProduciblePath) {
//     super(path)
//     this.isLoaded = false
//   }
//
//   private async init() {
//     await this.readSource()
//     this.isLoaded = true
//   }
//
//   private async readSource() {
//     const sources: string[] = []
//     switch (this.pkgType) {
//       case WxapkgType.APP_V1:
//       case WxapkgType.APP_V2:
//         sources.push(WxapkgKeyFile.APP_SERVICE)
//         break
//       case WxapkgType.APP_V3:
//         sources.push(WxapkgKeyFile.APP_SERVICE)
//         sources.push(WxapkgKeyFile.APPSERVICE_APP)
//         break
//       case WxapkgType.APP_SUBPACKAGE_V1:
//       case WxapkgType.APP_SUBPACKAGE_V2:
//       case WxapkgType.GAME:
//       case WxapkgType.GAME_SUBPACKAGE:
//         sources.push(WxapkgKeyFile.GAME)
//         // 这个可能没有
//         sources.push(WxapkgKeyFile.SUBCONTEXT)
//         break
//       case WxapkgType.PLUGIN:
//         sources.push(WxapkgKeyFile.PLUGIN)
//         break
//     }
//   }
//
//   async parse(_source?: Buffer): Promise<void> {
//     if (!this.isLoaded) await this.init()
//     super.parse(_source)
//   }
// }

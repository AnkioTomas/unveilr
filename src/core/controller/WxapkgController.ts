import { PathController, ProduciblePath } from '@core/controller'
// import { PackageSuffix, WxapkgType } from '@/enum'
import { Logger } from 'winston'
// import { WxapkgExtractor, WxapkgExtractorOptions } from '@core/extractor'
// import { checkWxapkgType } from '@core/utils/checkWxapkg'
// import { blue, bold } from 'colors/safe'
import { getLogger } from '@utils/logger'

export interface WxapkgControllerOptions {
  path: ProduciblePath
  // extractOptions?: WxapkgExtractorOptions
  logger?: Logger
}

export class WxapkgController {
  readonly pathCtrl: PathController
  readonly logger: Logger
  constructor(path: ProduciblePath, _logger?: Logger) {
    this.pathCtrl = PathController.make(path)
    this.logger = _logger || getLogger('WxapkgController')
    if (!this.pathCtrl.exists) throw Error(`File ${this.pathCtrl.logpath} does not exist`)
    // if (this.pathCtrl.isFile && this.pathCtrl.suffixWithout === PackageSuffix.WXAPKG) {
    //   this.logger.info(`File ${this.pathCtrl.logpath} not yet extracted, Starting extracting`)
    //   this.pathCtrl = PathController.make(new WxapkgExtractor(this.pathCtrl).extract())
    // }
    if (!this.pathCtrl.isDirectory) throw Error(`File ${this.pathCtrl.logpath} is a invalid wxapkg`)
  }

  // get logtype(): string {
  //   return bold(blue(`[${this.type}]`))
  // }
}

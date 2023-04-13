import { CliConfigurator } from '@/cli'

export class ConfigController {
  private readonly config: CliConfigurator
  private constructor(config: CliConfigurator) {
    this.config = config
  }

  get innerConfig(): Readonly<CliConfigurator> {
    return Object.freeze(this.config)
  }

  get logLevel() {
    return this.config.global.logLevel
  }
  get WXReformat() {
    return this.config.wx.format
  }
  get WXClearDecompile() {
    return this.WXParse && this.config.wx.clearDecompile
  }
  get WXClearSave() {
    return this.config.wx.clearSave
  }
  get WXDepth() {
    return this.config.wx.depth
  }
  get WXParse() {
    return this.config.wx.parse
  }
  get WXPackages() {
    return this.config.wx.packages
  }
  get WXAppId() {
    return this.config.wx.appid
  }
  get WXOutput() {
    return this.config.wx.output
  }
  get WxClearOutput() {
    return this.config.wx.clearOutput
  }

  static instance: ConfigController

  static init(config: CliConfigurator): void {
    if (!ConfigController.instance) {
      ConfigController.instance = new ConfigController(config)
    }
  }

  static getInstance(): ConfigController {
    if (!ConfigController.instance) throw ReferenceError('ConfigController is not initialized')
    return ConfigController.instance
  }
}

export function getConfig<T extends keyof ConfigController>(key: T): ConfigController[T] {
  const inst = ConfigController.getInstance()
  if (!key) throw ReferenceError(`Config name is required`)
  return inst[key]
}

export function initializeConfig(config: CliConfigurator) {
  ConfigController.init(config)
}

export function getInnerConfig() {
  const inst = ConfigController.getInstance()
  return inst.innerConfig
}

import { registerGlobalException } from '@utils/exceptions'
import { initializeColors } from '@utils/colors'
import { clearConsole } from '@utils/clearConsole'

export interface AppConfig {
  disableColors: boolean
  [key: string]: unknown
}

export class App {
  readonly config: AppConfig
  constructor(config: AppConfig) {
    registerGlobalException()
    this.config = config
    initializeColors(config.disableColors)
    clearConsole()
  }
  run(): this {
    return this
  }
}

import { isDevelopment } from '@utils/isDev'
import { CliConfigurator, registerCommand } from '@/cli'
import { version, name } from '../../package.json'

export function getConfigurator(dev?: boolean): CliConfigurator {
  const IS_DEV = dev || isDevelopment()
  if (!IS_DEV) return registerCommand(version, name)
  return {
    global: {
      logLevel: 'info',
    },
    wx: {
      // appid: '',
      format: false,
      clearDecompile: true,
      clearSave: true,
      parse: false,
      depth: 1,
      // output: '',
      packages: ['files/wxac43fa84faa1b7fd-APP_V4.wxapkg'],
    },
  }
}

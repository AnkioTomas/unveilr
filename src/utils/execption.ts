import { Logger } from 'winston'
import { getLogger } from '@/utils'

export function registerGlobalException(logger?: Logger) {
  logger = logger || getLogger()
  const ignores = 'exit,cancel,pass'.split(',')
  const handler = (e: Error | string) => (ignores.includes(String(e)) ? '' : logger.error(e))
  process.on('uncaughtException', handler)
  process.on('unhandledRejection', handler)
  logger.debug('Global exception interception is enabled')
}

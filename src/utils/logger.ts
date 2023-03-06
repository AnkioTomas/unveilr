import { bold, grey, yellow } from 'colors/safe'
import { createLogger, format, Logger, transports } from 'winston'
const { combine, timestamp, printf, colorize } = format

export function getLogger(name?: string, level?: string): Logger {
  return createLogger({
    level: level || 'debug',
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    },
    format: combine(
      timestamp({ format: 'HH:mm:ss' }),
      printf((info) => {
        const LEVEL = `[${bold(info.level.toUpperCase())}]`
        const TIME = bold(grey(info.timestamp))
        const SCOPE = yellow(`<${info.scope}>`)
        const MESSAGE = ((m) => {
          if (m instanceof Error) return m.stack
          return m.message
        })(info)
        return [LEVEL, TIME, SCOPE, MESSAGE].join(' ')
      }),
      colorize({ all: true }),
    ),
    defaultMeta: { scope: name || 'Main' },
    transports: [new transports.Console({ stderrLevels: ['error'] })],
  })
}

const logger = getLogger()
export default logger

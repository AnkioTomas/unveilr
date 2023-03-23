import { bold, grey, yellow } from 'colors/safe'
import { createLogger, format, Logger, transports } from 'winston'
const { combine, timestamp, printf, colorize } = format
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
}
export type LoggerLevel = keyof typeof levels
export interface LoggerConfig {
  level: LoggerLevel
  name: string
}

const config: LoggerConfig = {
  level: 'debug',
  name: 'Main',
}
export function setLoggerConfig(_config: Partial<LoggerConfig>) {
  Object.assign(config, _config)
}

export function getLogger(name?: string, level?: string): Logger {
  return createLogger({
    level: level || config.level,
    levels,
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
    defaultMeta: { scope: name || config.name },
    transports: [new transports.Console({ stderrLevels: ['error'] })],
  })
}
export class BaseLogger {
  readonly logger: Logger
  constructor(name?: string) {
    name = name || this.constructor.name
    this.logger = getLogger(name.length < 4 ? 'Core' : name)
  }
}

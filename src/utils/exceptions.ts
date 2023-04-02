import { BaseLogger } from '@utils/logger'

class GlobalExceptionCaught extends BaseLogger {
  constructor() {
    super('Exception')
    const ignores = 'exit,cancel,pass'.split(',')
    const handler = (e: Error | string) => (ignores.includes(String(e)) ? '' : this.logger.error(e))
    process.on('uncaughtException', handler)
    process.on('unhandledRejection', handler)
    this.logger.debug('Global exception interception is enabled')
  }
}

export function registerGlobalException() {
  return new GlobalExceptionCaught()
}

export class BaseError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = this.constructor.name
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)
  }

  static make(msg: string) {
    return new this(msg)
  }

  static throw(msg: string) {
    throw this.make(msg)
  }
}

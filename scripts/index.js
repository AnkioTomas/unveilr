const path = require('path')
const safeColors = require('colors/safe')
const { Logger } = require('../packages/color-logger')
const unPacker = require('../packages/unpacker')
const { buildHelper, parserArgs, registeredArgs, banner, version, name } = require('./config')
const exit = () => logger.timeEnd(name) || process.exit(0)
const print = console.log.bind(console)
const bold = safeColors.bold.bind(safeColors)
const blue = safeColors.blue.bind(safeColors)
const green = safeColors.green.bind(safeColors)
const cyan = safeColors.cyan.bind(safeColors)
const printAndExit = (...args) => print(...args) || exit()
const printBanner = () => print(bold(blue(banner)))
const handlerMap = {
  wxAppid: '',
  cleanOld: true,
  help() {
    printAndExit(buildHelper({ subroutineH: cyan, optionsH: green }).toString())
  },
  version() {
    printAndExit(bold(green('v' + version)))
  },
  path(value) {
    const { wxAppid } = this
    const unpack = filePath => {
      this.cleanOld && logger.info('Clear old package is turned on.')
      unPacker.unpackWxapkg(filePath, {
        cleanOld: this.cleanOld,
        callback: exit,
      })
    }
    if (wxAppid) {
      logger.info(`Enabled decrypt mode. wxAppid: ${wxAppid}`)
      unPacker.decryptWxapkg({
        wxAppid,
        filePath: value,
        callback(result) {
          if (!result || result.length === 0) exit()
          const resultDir = path.dirname(result[0])
          logger.info('Decrypted successful save in', resultDir)
          unpack(resultDir)
        },
      })
    } else {
      unpack(value)
    }
    return true
  },
  subroutine(value) {
    const argv = process.argv
    argv.splice(argv.indexOf(value), 1)
    unPacker[value + 'Cmd'](argv)
    return true
  },
  loggerLevel(value) {
    value = value.toUpperCase()
    if (!'DEBUG|INFO|WARN|ERROR'.split('|').includes(value)) {
      return logger.warn('Logger level set fail! invalid value:', value)
    }
    logger.info('Logger level:', value)
    logger.setLevel(Logger[value])
  },
  formatCode(value) {
    ;(global.formatCode = value) && logger.info('Code formatting is turned on.')
  },
}

function bootstrap() {
  logger.time(name)
  printBanner()
  const { sortedArgs, result } = parserArgs()
  try {
    sortedArgs.forEach(([name, value]) => {
      const current = registeredArgs[name]
      const currentHandler = handlerMap[name]
      if (!current) return
      if (typeof currentHandler === 'function') {
        if (currentHandler.call(handlerMap, current.type(value), result)) throw new Error('break')
      } else if (handlerMap.hasOwnProperty(name)) {
        handlerMap[name] = current.type(value)
      }
    })
  } catch (e) {
    if (e.message === 'break') return
    logger.error(e)
  }
  logger.timeEnd(name)
}

module.exports = {
  bootstrap,
  ...unPacker,
}

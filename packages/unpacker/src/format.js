const { removeInvalidLine, deepListDir, isDirectory, getFilenameExt } = require('./utils')
const path = require('path')

function formatCode(fileList) {
  const fileDeepList = []
  fileList.forEach(file => fileDeepList.push(...(isDirectory(file) ? deepListDir(file) : [file])))
  fileDeepList.filter(file => getFilenameExt(file, true) === 'js').forEach(file => removeInvalidLine(file, file, true))
}

function formatCmd(argv) {
  const list = argv.slice(2)
  if (!list.length) {
    logger.warn(`Usage: node ${path.basename(__filename)} <DIRs|Files>...`)
    process.exit(0)
  }
  formatCode(list)
}

if (require.main === module) {
  formatCmd(process.argv)
}

module.exports = {
  formatCmd,
}

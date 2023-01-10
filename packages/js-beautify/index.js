const prettier = require('prettier')
const parserBabel = require('prettier/parser-babel')
const prettierConfig = require('../../prettier.config')

function beautify(code) {
  if (!global['formatCode']) return code
  return prettier.format(code, {
    parser: 'babel',
    plugins: [parserBabel],
    ...prettierConfig,
  })
}

module.exports = { beautify }

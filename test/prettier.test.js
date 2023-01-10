const prettier = require('prettier')
const parserBabel = require('prettier/parser-babel')
const prettierConfig = require('../prettier.config')

const code = `
let a=123        ;let b                   =213;;;;;;;;;;;;;;;;;
console.log           (a+b);
`

console.log(
  prettier.format(code, {
    parser: 'babel',
    plugins: [parserBabel],
    ...prettierConfig,
  })
)

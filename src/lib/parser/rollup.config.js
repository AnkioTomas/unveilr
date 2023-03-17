const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const { uglify } = require('rollup-plugin-uglify')
const { babel } = require('@rollup/plugin-babel')
const staticFs = require('babel-plugin-static-fs')
const json = require('@rollup/plugin-json')
const obfuscator = require('rollup-plugin-obfuscator')

module.exports = [
  {
    input: 'src/index.js',
    output: {
      file: '../wxml-parser/index.js',
      format: 'cjs',
      exports: 'default',
    },
    plugins: [
      babel({
        babelHelpers: 'inline',
        plugins: [staticFs],
      }),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
      json(),
      obfuscator(),
      uglify(),
    ],
    strictDeprecations: true,
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },
]

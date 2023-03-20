import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'
// import { babel } from '@rollup/plugin-babel'
// import builtins from 'rollup-plugin-node-builtins'
// import staticFs from 'babel-plugin-static-fs'
// import obfuscator from 'rollup-plugin-obfuscator'
export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
  },
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ES2015',
          declaration: false,
        },
        exclude: ['node_modules'],
      },
    }),
    commonjs(),
    nodeResolve(),
    json(),
    uglify(),
  ],
  cache: false,
  strictDeprecations: true,
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
}

import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'
import packages from './package.json'
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    manualChunks(id) {
      if (id.includes('wxml-parser-js')) return 'parser'
    },
  },
  external: Object.keys(packages['dependencies']),
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ES2015',
          declaration: false,
        },
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

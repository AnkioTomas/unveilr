import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import packages from './package.json'
import { terser } from 'rollup-plugin-terser'
import license from 'rollup-plugin-license'
import { join } from 'path'
import clear from 'rollup-plugin-clear'

export const output = {
  dir: 'dist',
  format: 'cjs',
  manualChunks(id) {
    if (id.includes('wxml-parser-js')) return 'parser'
    if (id.includes('traverse.ts')) return 'traverse'
  },
}
const external = Object.keys(packages['dependencies'])
export default {
  input: 'src/index.ts',
  output,
  external,
  plugins: [
    clear({
      targets: [output.dir],
    }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ES2015',
          declaration: false,
        },
      },
    }),
    commonjs(),
    nodeResolve({ preferBuiltins: true }),
    json(),
    terser(),
    license({
      banner: {
        commentStyle: 'ignored',
        content:
          '<%= pkg.name %> v<%= pkg.version %>\n' +
          '(c) 2023 <%= pkg.author %>\n' +
          'Released under the <%= pkg.license %> License.',
      },
      thirdParty: {
        output: join(__dirname, 'dist', 'dependencies.txt'),
      },
    }),
  ],
  cache: false,
  strictDeprecations: true,
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
}

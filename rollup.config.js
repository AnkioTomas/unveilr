import { rmSync } from 'fs'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import packages from './package.json'
import { terser } from 'rollup-plugin-terser'
import license from 'rollup-plugin-license'
import { join } from 'path'

const output = {
  dir: 'dist',
  format: 'cjs',
  manualChunks(id) {
    if (id.includes('wxml-parser-js')) return 'parser'
  },
}
const external = Object.keys(packages['dependencies'])
rmSync(output.dir, { recursive: true, force: true })
export default {
  input: 'src/index.ts',
  output,
  external,
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
        includePrivate: true, // Default is false.
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

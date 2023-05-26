import { join } from 'path'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import clear from 'rollup-plugin-clear'
import babel from '@rollup/plugin-babel'
import staticFs from 'babel-plugin-static-fs'
import obfuscator from 'rollup-plugin-obfuscator'
import { terser } from 'rollup-plugin-terser'
import { dependencies } from './package.json'
import { basename, dirname } from 'path'

const output = {
  dir: 'dist',
  format: 'cjs',
  manualChunks(id) {
    if (id.endsWith('worker.ts')) {
      return ['chunk', basename(dirname(id))].join('-')
    }
  },
}
export default {
  input: 'src/index.ts',
  output,
  external: Object.keys(dependencies).filter((item) => item !== 'vm2'),
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
    babel({
      babelHelpers: 'inline',
      plugins: [staticFs],
    }),
    commonjs(),
    nodeResolve({ preferBuiltins: true }),
    json(),
    obfuscator({
      options: {
        compact: false,
        splitStrings: true,
        debugProtection: true,
        controlFlowFlattening: true,
      },
    }),
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

import { join } from 'path'
import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import license from 'rollup-plugin-license'
import clear from 'rollup-plugin-clear'
import obfuscator from 'rollup-plugin-obfuscator'
import { terser } from 'rollup-plugin-terser'
import { dependencies } from './package.json'
const output = {
  dir: 'dist',
  format: 'cjs',
  manualChunks(id) {
    if (id.includes('wxml-parser')) return 'parser'
    if (id.includes('traverse.ts')) return 'traverse'
  },
}
export default {
  input: 'src/index.ts',
  output,
  external: Object.keys(dependencies),
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
    nodeResolve(),
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

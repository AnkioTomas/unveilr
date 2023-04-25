import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import packages from './package.json'
// import { terser } from 'rollup-plugin-terser'
import conditional from 'rollup-plugin-conditional'
// import alias from '@rollup/plugin-alias'
import license from 'rollup-plugin-license'
import { join } from 'path'
import clear from 'rollup-plugin-clear'
import babel from '@rollup/plugin-babel'
import nodePolyfills from 'rollup-plugin-polyfill-node'
const isBrowser = 1 || process.env.BUILD_MODE === 'browser'
const outputNode = {
  dir: 'dist',
  format: 'cjs',
  manualChunks(id) {
    if (id.includes('wxml-parser-js')) return 'parser'
    if (id.includes('traverse.ts')) return 'traverse'
  },
}
const outputBrowser = {
  dir: 'dist',
  name: 'index',
  format: 'umd',
}
const output = isBrowser ? outputBrowser : outputNode
// const external = Object.keys(packages['dependencies'])
export default {
  input: 'src/index.ts',
  output,
  // external,
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
    nodeResolve({ /* preferBuiltins: !isBrowser,*/ browser: isBrowser }),
    babel({
      babelHelpers: 'bundled',
    }),
    conditional(isBrowser, [
      // nodePolyfills(),
      // alias({
      //   entries: {
      //     path: 'path-browserify',
      //   },
      // }),
    ]),

    json(),
    // terser(),
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

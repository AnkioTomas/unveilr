import { BuiltInParserName, format, Options } from 'prettier'

export type ReformatConfig = Record<BuiltInParserName, boolean>
const config: ReformatConfig = {
  'babel-flow': false,
  'babel-ts': false,
  'json-stringify': false,
  angular: false,
  babel: false,
  css: false,
  espree: false,
  flow: false,
  glimmer: false,
  graphql: false,
  html: false,
  json: false,
  json5: false,
  less: false,
  lwc: false,
  markdown: false,
  mdx: false,
  meriyah: false,
  scss: false,
  typescript: false,
  vue: false,
  yaml: false,
}
export function setReformatConfig(_config: Partial<ReformatConfig>) {
  Object.assign(config, _config)
}

export function reformat(source: string, options: Options): string {
  if (typeof options.parser === 'string' && !config[options.parser]) return source
  return format(source, options)
}

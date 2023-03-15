import { BuiltInParserName, format, Options } from 'prettier'

export type ReformatConfig = Record<BuiltInParserName, boolean>
const config: Partial<ReformatConfig> = {
  babel: false,
  css: false,
  html: false,
  json: false,
  json5: false,
  markdown: false,
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

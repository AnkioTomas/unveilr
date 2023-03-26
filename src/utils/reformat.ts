import { format, Options } from 'prettier'
import { getConfig } from '@core/controller/ConfigController'

export function reformat(source: string, options: Options): string {
  if (!getConfig('WXReformat')) return source
  return format(source, options)
}

import { BuiltInParserName, format } from 'prettier'
import { PathController, ProduciblePath } from '@core/controller/PathController'

export const REFORMAT_MAP: Record<string, BuiltInParserName> = {
  wxss: 'css',
  json: 'json',
  wxs: 'babel',
  js: 'babel',
  /**
   * fix like:
   * ```html
   * <view style="
   *  width: 100%;
   *  height: 100%;
   * "><view/>
   * ```
   * resulting in an error
   * */
  // wxml: 'html',
}
export function reformat(path: ProduciblePath, source: string): string {
  try {
    const suffix = checkSupport(path)
    if (!suffix) return source
    return format(source, { parser: REFORMAT_MAP[suffix] })
  } catch (e) {
    if (e instanceof SyntaxError) return source
    throw e
  }
}

export function checkSupport(path: ProduciblePath): string | false {
  const ctrl = PathController.make(path)
  const suffix = ctrl.suffixWithout
  return Object.keys(REFORMAT_MAP).includes(suffix) ? suffix : false
}

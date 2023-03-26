import { ZArray } from '@core/parser/wxapkg/types'

export interface ParserResult {
  [filename: string]: string
}

export function parseWxml(code: string, dir: string): Promise<ParserResult>
export function parseWxml(code: string, dir: string, json: string, z: ZArray): Promise<ParserResult>


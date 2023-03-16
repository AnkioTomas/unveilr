export interface ParserResult {
  [filename: string]: string
}
export interface parserV2Options {
  compiler?: string
  dir: string
  zArrMap: { [id: string]: Array<unknown> }
}

export function parserWxmlV1(code: string, dir: string): Promise<ParserResult>

export function parserWxmlV2(options: parserV2Options): Promise<ParserResult>

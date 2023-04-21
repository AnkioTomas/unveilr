export function matchScripts(source: string): string {
  const matchRegex = /<script\b[^>]*>(?<source>[\s\S]*?)<\/script>/m
  const matchResult: string[] = []
  const _matchAll = (str: string) => {
    const r = str.match(matchRegex)
    if (!r || !r.groups) return
    matchResult.push(r.groups.source.trim())
    _matchAll(str.replace(matchRegex, ''))
  }
  _matchAll(source)
  return matchResult.filter(Boolean).join(';\n')
}

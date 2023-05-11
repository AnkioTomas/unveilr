export function getWccVersion(source: string): string | null {
  const regex = /\/\*(v\S+?)\*\//
  if (!source) return null
  const result = source.match(regex)
  if (Array.isArray(result) && result[1]) return result[1]
  return null
}

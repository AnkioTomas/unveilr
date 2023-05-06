export function removeInvalidLineCode(code) {
  const invalidRe = /\s*[a-z]\x20?=\x20?VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL\.handleException\([a-z]\);?/g
  return code.replace(invalidRe, '')
}
export function toDir(to, from) {
  //get relative path without posix/win32 problem
  if (from[0] == '.') from = from.slice(1)
  if (to[0] == '.') to = to.slice(1)
  from = from.replace(/\\/g, '/')
  to = to.replace(/\\/g, '/')
  let a = Math.min(to.length, from.length)
  for (let i = 1, m = Math.min(to.length, from.length); i <= m; i++)
    if (!to.startsWith(from.slice(0, i))) {
      a = i - 1
      break
    }
  const pub = from.slice(0, a)
  const len = pub.lastIndexOf('/') + 1
  const k = from.slice(len)
  let ret = ''
  for (let i = 0; i < k.length; i++) if (k[i] == '/') ret += '../'
  return ret + to.slice(len)
}
export function getZArrayKey(functionName) {
  const match = functionName.match(/_\d+$/)
  return match ? match[0] : ''
}

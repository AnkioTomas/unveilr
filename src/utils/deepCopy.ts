import { hasOwnProperty } from '@utils/hasOwnProperty'

type UnknownObject = Record<string, unknown>

export function deepCopy(obj: unknown): unknown {
  // 处理非对象和特殊对象的情况
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理日期对象
  if (obj instanceof Date) {
    const _copy = new Date()
    _copy.setTime(obj.getTime())
    return _copy
  }

  // 处理数组对象
  if (obj instanceof Array) {
    const copy: unknown[] = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i])
    }
    return copy
  }

  // 处理普通对象
  if (obj instanceof Object) {
    const copy: UnknownObject = {}
    const _object = obj as UnknownObject
    for (const key in _object) {
      if (hasOwnProperty(_object, key)) {
        copy[key] = deepCopy(_object[key])
      }
    }
    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}

import { hasOwnProperty } from '@utils/hasOwnProperty'

export function deepCopy(obj: unknown): unknown {
  let copy: unknown

  // 处理非对象和特殊对象的情况
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 处理日期对象
  if (obj instanceof Date) {
    copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  // 处理数组对象
  if (obj instanceof Array) {
    copy = []
    for (let i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepCopy(obj[i])
    }
    return copy
  }

  // 处理普通对象
  if (obj instanceof Object) {
    copy = {}
    for (const key in obj) {
      if (hasOwnProperty<typeof obj>(obj, key)) {
        copy[key] = deepCopy(obj[key])
      }
    }
    return copy
  }

  throw new Error("Unable to copy obj! Its type isn't supported.")
}

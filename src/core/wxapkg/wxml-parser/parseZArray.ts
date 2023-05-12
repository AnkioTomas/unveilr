import { VM } from 'vm2'
import { getZArrayKey } from './utils'

function catchZGroup(code, groupPreStr, cb) {
  const debugPre = '(function(z){var a=11;function Z(ops,debugLine){'
  const zArr = {}
  for (const preStr of groupPreStr) {
    let content = code.slice(code.indexOf(preStr))
    // eslint-disable-next-line prefer-const
    let z = []
    content = content.slice(content.indexOf('(function(z){var a=11;'))
    content = content.slice(0, content.indexOf('})(__WXML_GLOBAL__.ops_cached.$gwx')) + '})(z);'
    const vm = new VM({ sandbox: { z: z, debugInfo: [] } })
    vm.run(content)
    if (content.startsWith(debugPre)) for (let i = 0; i < z.length; i++) z[i] = z[i][1]
    const zArrKey = getZArrayKey(preStr.match(/(\S+)\(\s*\)/)[1])
    zArr[zArrKey] = z
  }
  cb({ mul: zArr })
}

function catchZ(code, cb) {
  const groupTest = code.match(/function gz\$gwx(\d*_\d+)\(\)\{\s*if\( __WXML_GLOBAL__\.ops_cached\.\$gwx\d*_\d+\)/g)
  if (groupTest !== null) return catchZGroup(code, groupTest, cb)
  const z = []
  const vm = new VM({
    sandbox: {
      z: z,
      debugInfo: [],
    },
  })
  let lastPtr = code.lastIndexOf('(z);__WXML_GLOBAL__.ops_set.$gwx=z;')
  if (lastPtr === -1) lastPtr = code.lastIndexOf('(z);__WXML_GLOBAL__.ops_set.$gwx')
  if (lastPtr === -1) lastPtr = code.lastIndexOf('(z);')
  code = code.slice(code.lastIndexOf('(function(z){var a=11;function Z(ops){z.push(ops)}'), lastPtr + 4)
  vm.run(code)
  cb(z)
}

function restoreSingle(ops, withScope = false) {
  if (typeof ops == 'undefined') return ''

  function scope(value) {
    if (value.startsWith('{') && value.endsWith('}')) return withScope ? value : '{' + value + '}'
    return withScope ? value : '{{' + value + '}}'
  }

  function enBrace(value, type = '{') {
    if (
      value.startsWith('{') ||
      value.startsWith('[') ||
      value.startsWith('(') ||
      value.endsWith('}') ||
      value.endsWith(']') ||
      value.endsWith(')')
    )
      value = ' ' + value + ' '
    switch (type) {
      case '{':
        return '{' + value + '}'
      case '[':
        return '[' + value + ']'
      case '(':
        return '(' + value + ')'
      default:
        throw Error('Unknown brace type ' + type)
    }
  }

  function restoreNext(ops, w = withScope) {
    return restoreSingle(ops, w)
  }

  function jsoToWxon(obj) {
    //convert JS Object to WeChat Object Notation(No quotes@key+str)
    let ans = ''
    if (typeof obj === 'undefined') {
      return 'undefined'
    } else if (obj === null) {
      return 'null'
    } else if (obj instanceof RegExp) {
      return obj.toString()
    } else if (obj instanceof Array) {
      for (let i = 0; i < obj.length; i++) ans += ',' + jsoToWxon(obj[i])
      return enBrace(ans.slice(1), '[')
    } else if (typeof obj == 'object') {
      for (const k in obj) ans += ',' + k + ':' + jsoToWxon(obj[k])
      return enBrace(ans.slice(1), '{')
    } else if (typeof obj == 'string') {
      const parts = obj.split('"'),
        ret = []
      for (const part of parts) {
        const atoms = part.split("'"),
          ans = []
        for (const atom of atoms) ans.push(JSON.stringify(atom).slice(1, -1))
        ret.push(ans.join("\\'"))
      }
      return "'" + ret.join('"') + "'"
    } else return JSON.stringify(obj)
  }

  const op = ops[0]
  if (typeof op != 'object') {
    switch (op) {
      case 3: //string
        return ops[1] //may cause problems if wx use it to be string
      case 1: //direct value
        return scope(jsoToWxon(ops[1]))
      case 11: //values list, According to var a = 11;
        // eslint-disable-next-line no-case-declarations
        let ans = ''
        ops.shift()
        for (const perOp of ops) ans += restoreNext(perOp)
        return ans
    }
  } else {
    let ans: any = ''
    switch (
      op[0] //vop
    ) {
      case 2: {
        //arithmetic operator
        const getPrior = (op, len) => {
          const priorList = {
            '?:': 4,
            '&&': 6,
            '||': 5,
            '+': 13,
            '*': 14,
            '/': 14,
            '%': 14,
            '|': 7,
            '^': 8,
            '&': 9,
            '!': 16,
            '~': 16,
            '===': 10,
            '==': 10,
            '!=': 10,
            '!==': 10,
            '>=': 11,
            '<=': 11,
            '>': 11,
            '<': 11,
            '<<': 12,
            '>>': 12,
            '-': len == 3 ? 13 : 16,
          }
          return priorList[op] ? priorList[op] : 0
        }

        const getOp = (i) => {
          let ret = restoreNext(ops[i], true)
          if (ops[i] instanceof Object && typeof ops[i][0] == 'object' && ops[i][0][0] == 2) {
            //Add brackets if we need
            if (getPrior(op[1], ops.length) > getPrior(ops[i][0][1], ops[i].length)) ret = enBrace(ret, '(')
          }
          return ret
        }

        switch (op[1]) {
          case '?:':
            ans = getOp(1) + '?' + getOp(2) + ':' + getOp(3)
            break
          case '!':
          case '~':
            ans = op[1] + getOp(1)
            break
          case '-':
            if (ops.length != 3) {
              ans = op[1] + getOp(1)
              break
            } //shoud not add more in there![fall through]
          default:
            ans = getOp(1) + op[1] + getOp(2)
        }
        break
      }
      case 4: //unknown-arrayStart?
        ans = restoreNext(ops[1], true)
        break
      case 5: {
        //merge-array
        switch (ops.length) {
          case 2:
            ans = enBrace(restoreNext(ops[1], true), '[')
            break
          case 1:
            ans = '[]'
            break
          default: {
            const a = restoreNext(ops[1], true)
            if (a.startsWith('[') && a.endsWith(']')) {
              if (a != '[]') {
                ans = enBrace(a.slice(1, -1).trim() + ',' + restoreNext(ops[2], true), '[')
              } else {
                ans = enBrace(restoreNext(ops[2], true), '[')
              }
            } else {
              ans = enBrace('...' + a + ',' + restoreNext(ops[2], true), '[') //may/must not support in fact
            }
          }
        }
        break
      }
      case 6: {
        //get value of an object
        const sonName = restoreNext(ops[2], true)
        if (sonName._type === 'var') ans = restoreNext(ops[1], true) + enBrace(sonName, '[')
        else {
          let attach = ''
          if (/^[A-Za-z_][A-Za-z\d_]*$/.test(sonName) /*is a qualified id*/) attach = '.' + sonName
          else attach = enBrace(sonName, '[')
          ans = restoreNext(ops[1], true) + attach
        }
        break
      }
      case 7: {
        //get value of str
        switch (ops[1][0]) {
          case 11:
            ans = enBrace('__unTestedGetValue:' + enBrace(jsoToWxon(ops), '['), '{')
            break
          case 3:
            ans = new String(ops[1][1])
            ans._type = 'var'
            break
          default:
            throw Error('Unknown type to get value')
        }
        break
      }
      case 8: //first object
        ans = enBrace(ops[1] + ':' + restoreNext(ops[2], true), '{') //ops[1] have only this way to define
        break
      case 9: {
        //object
        const type = (x) => {
          if (x.startsWith('...')) return 1
          if (x.startsWith('{') && x.endsWith('}')) return 0
          return 2
        }

        let a = restoreNext(ops[1], true)
        let b = restoreNext(ops[2], true)
        const xa = type(a),
          xb = type(b)
        if (xa == 2 || xb == 2) ans = enBrace('__unkownMerge:' + enBrace(a + ',' + b, '['), '{')
        else {
          if (!xa) a = a.slice(1, -1).trim()
          if (!xb) b = b.slice(1, -1).trim()
          ans = enBrace(a + ',' + b, '{')
        }
        break
      }
      case 10: //...object
        ans = '...' + restoreNext(ops[1], true)
        break
      case 12: {
        const arr = restoreNext(ops[2], true)
        if (arr.startsWith('[') && arr.endsWith(']')) {
          ans = restoreNext(ops[1], true) + enBrace(arr.slice(1, -1).trim(), '(')
        } else {
          ans = restoreNext(ops[1], true) + '.apply' + enBrace('null,' + arr, '(')
        }
        break
      }
      default:
        ans = enBrace('__unkownSpecific:' + jsoToWxon(ops), '{')
    }
    return scope(ans)
  }
}

export function restoreGroup(z) {
  const ans = {}
  for (const g in z.mul) {
    const singleAns = []
    for (const e of z.mul[g]) singleAns.push(restoreSingle(e, false))
    ans[g] = singleAns
  }
  const ret: any = {} //Keep a null array for remaining global Z array.
  ret.mul = ans
  return ret
}

function restoreAll(z) {
  if (z.mul) return restoreGroup(z)
  const ans = []
  for (const e of z) ans.push(restoreSingle(e, false))
  return ans
}

export async function parserZArray(code) {
  return new Promise((resolve, reject) => {
    try {
      catchZ(code, (z) => resolve(restoreAll(z)))
    } catch (e) {
      reject(Error('GetZArray fail: ' + e.message))
    }
  })
}

export function parseZArrayFromCode(code: string): unknown[] {
  const z = []
  new VM({ sandbox: { z } }).run(code)
  return z
}

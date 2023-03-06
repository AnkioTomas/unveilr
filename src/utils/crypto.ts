import * as CryptoJS from 'crypto-js'

export function BufferToWordArray(buffer: Buffer): CryptoJS.lib.WordArray {
  return CryptoJS.lib.WordArray.create(buffer as unknown as number[], buffer.length)
}

export function WordArrayToBuffer(wordArray: CryptoJS.lib.WordArray): Buffer {
  return Buffer.from(wordArray.toString(CryptoJS.enc.Hex), 'hex')
}

export function encryptBuffer(buffer: Buffer, password: string, salt: string, iv: string): Buffer {
  if (buffer.length % 32 !== 0) throw Error('Invalid buffer Length: ' + buffer.length)
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA1,
  })
  const cipher = CryptoJS.AES.encrypt(BufferToWordArray(buffer), key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  })
  return WordArrayToBuffer(cipher.ciphertext)
}

export function decryptBuffer(buffer: Buffer, password: string, salt: string, iv: string): Buffer {
  if (buffer.length % 32 !== 0) throw Error('Invalid buffer Length: ' + buffer.length)
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: 256 / 32,
    iterations: 1000,
    hasher: CryptoJS.algo.SHA1,
  })
  const cipher = CryptoJS.AES.decrypt(BufferToWordArray(buffer).toString(CryptoJS.enc.Base64), key, {
    iv: CryptoJS.enc.Utf8.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  })
  return WordArrayToBuffer(cipher)
}

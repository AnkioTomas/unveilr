require('colors')
const { rmSync, readdirSync } = require('fs')
const { join } = require('path')
const { execSync } = require('child_process')
const { exec } = require('pkg')
const { name, version } = require('../package.json')
const { tgz } = require('compressing')

const distIndex = 'dist/index.js'
const release = 'release'

function log(message) {
  console.log(`[PKG] ${message}`.blue)
}

/**
 * - nodeRange (node8), node10, node12, node14, node16 or latest
 * - platform alpine, linux, linuxstatic, win, macos, (freebsd)
 * - arch x64, arm64, (armv6, armv7)
 * */
async function pkg() {
  log('Clean up old binaries...')
  rmSync(release, { force: true, recursive: true })
  const targets = ['node14-win', 'node14-macos', 'node14-linux']
  const pkgCmd = `-C GZip -t ${targets.toString()} -o ${release}/${name}@${version} ${distIndex}`
    .split(' ')
    .filter(Boolean)
  log('Generating binaries...')
  await exec(pkgCmd)
}

async function _tgz() {
  const files = readdirSync(release)
  for (const p of files) {
    const source = join(release, p)
    const dest = source + '.tar.gz'
    log(`Generating ${dest.gray.blue}`)
    await tgz.compressFile(source, dest)
    rmSync(source)
  }
}
async function main() {
  log('Building distribution...')
  execSync('yarn build')
  await pkg()
  await _tgz()
}

main().then()

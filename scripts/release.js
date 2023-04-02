const { readFileSync, writeFileSync, rmSync, existsSync } = require('fs')
const { resolve } = require('path')
const { execSync, exec } = require('child_process')
const { version } = require('../package.json')

function log(message) {
  console.log(`[RELEASE] ${message}`)
}

function getDate() {
  const d = new Date()
  const to2 = (s) => ('00' + s).slice(-2)
  return `${d.getFullYear()}-${to2(d.getMonth() + 1)}-${to2(d.getDate())}`
}

function isAlreadyRelease(log, version) {
  const versionRE = `${version}`.replace(/[.-]/g, (r) => '\\' + r)
  const d = new RegExp(`### \\[:bookmark:(v${versionRE})\\s*:loud_sound:`)
  return d.exec(log) !== null
}

async function main() {
  const releaseLock = resolve(__dirname, '../.release.lock')

  // new version
  const newVersion = () => {
    const version = execSync('npm version prerelease --preid=alpha --no-git-tag-version').toString().trim()
    const logPath = resolve(__dirname, '../CHANGELOG.md')
    const changLog = readFileSync(logPath, 'utf8')
    if (!isAlreadyRelease(changLog, version)) {
      const newVersion = `# 更改日志

### [:bookmark:v${version} :loud_sound:${getDate()}](https://github.com/r3x5ur/unveilr/tree/v${version})
- 🐛解决部分已知问题
---
`
      const newLog = newVersion + changLog.replace('# 更改日志\n', '')
      writeFileSync(logPath, newLog)
    }
    execSync(`git add . && git commit -m ":bookmark:v${version}" && git tag v${version} -m "v${version}"`)
  }
  const submit = () => {
    return new Promise((resolve, reject) => {
      const release = exec(`git push && git push --tag`)
      release.stdout.on('data', log)
      release.stderr.on('data', log)
      release.on('close', (code) => {
        if (code !== 0) return reject(code)
        log(`v${version} released!`)
        resolve()
      })
    })
  }
  const release = async () => {
    const maxRetry = 3
    let retry = 0
    while (retry <= maxRetry) {
      try {
        await submit()
        break
      } catch (e) {
        retry++
        retry !== maxRetry - 1 && log('retry...')
      }
      if (retry > maxRetry) {
        writeFileSync(releaseLock, Buffer.from(''))
        await Promise.reject('release failed!')
      } else {
        rmSync(releaseLock, { force: true })
        execSync(`npm publish`)
      }
    }
  }
  if (existsSync(releaseLock)) {
    log('release lock file exists!')
  } else {
    newVersion()
  }
  await release()
}

main().catch(log)

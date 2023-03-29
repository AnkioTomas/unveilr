const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const { execSync } = require('child_process')
require('colors')

function log(message) {
  console.log(`[LOG] ${message}`.blue)
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

function main() {
  // new version
  execSync('npm version prerelease --preid=alpha --no-git-tag-version')
  const { version } = require('../package.json')
  const logPath = resolve(__dirname, '../CHANGELOG.md')
  const changLog = readFileSync(logPath, 'utf8')
  if (isAlreadyRelease(changLog, version)) return log(`v${version.bold} already released!`.red)
  const newVersion = `# 更改日志

### [:bookmark:v${version} :loud_sound:${getDate()}](https://github.com/r3x5ur/unveilr/tree/v${version})
- 🐛解决部分已知问题
---
`
  const newLog = newVersion + changLog.replace('# 更改日志\n', '')
  writeFileSync(logPath, newLog)
  const add = execSync('git add .').toString()
  const commit = execSync(`git commit -m ":bookmark:v${version}"`).toString()
  const tag = execSync(`git tag v${version}`).toString()
  const push = execSync(`git push`).toString()
  const pushTag = execSync(`git push --tag`).toString()
  log(add + commit + tag + push + pushTag)
  log(`v${version.bold} released!`.green)
  execSync(`npm publish`)
}

main()

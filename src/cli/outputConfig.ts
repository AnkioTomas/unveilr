import { OutputConfiguration } from 'commander'

export const outputConfig: OutputConfiguration = {
  writeOut(str: string) {
    process.stdout.write(str.green)
  },
  writeErr(str: string) {
    process.stdout.write(str.yellow)
  },
  outputError(str: string, write) {
    write(str.red)
  },
}

import { OutputConfiguration } from 'commander'
import { green, red, yellow } from '@utils/colors'

export const outputConfig: OutputConfiguration = {
  writeOut(str: string) {
    process.stdout.write(green(str))
  },
  writeErr(str: string) {
    process.stdout.write(yellow(str))
  },
  outputError(str: string, write) {
    write(red(str))
  },
}

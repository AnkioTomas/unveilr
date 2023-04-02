import { Command, Argument, Option, CommanderError } from 'commander'
import { outputConfig } from '@/cli/outputConfig'

const wxCommand = new Command('wx')
// read-depth
const noParseOption = new Option('-p, --no-parse', 'Only extract files, do not parse').implies({
  clearDecompile: false,
})
const depthOptions = new Option('-d, --depth <depth>', 'Set read-depth')
  .argParser((v) => {
    const depth = parseInt(v)
    if (isNaN(depth)) throw new CommanderError(1, 'depth.error', 'Invalid depth')
    return depth
  })
  .default(1)
wxCommand
  .option('-i, --appid <appid>', 'Set wxAppId, not provided will try to fetch from path')
  .option('-f, --format', 'Enable format code')
  .option('--no-clear-decompile', 'Retain decompiling residual files')
  .option('--no-clear-save', 'The path to be saved will not be cleared')
  .addOption(noParseOption)
  .addOption(depthOptions)
  .option('-o, --output <path>', 'Set output path, default: main package whit out')
  .description('Decompile the WeChat applet')
  .addArgument(new Argument('<packages...>', 'Set package path, could be a file, directory or multiple files'))
  .showHelpAfterError()
  .configureOutput(outputConfig)
export default wxCommand

export interface WxConfigurator {
  appid?: string
  format?: boolean
  clearDecompile: boolean
  clearSave: boolean
  parse: boolean
  depth: number
  output?: string
  packages: string[]
}

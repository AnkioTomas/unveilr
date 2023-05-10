import { Command, Argument, Option, CommanderError } from 'commander'
import { outputConfig } from '@/cli/config/outputConfig'

const wxCommand = new Command('wx')
// read-depth
const noParseOption = new Option('-p, --no-parse', 'Only extract files, do not parse').implies({
  clearDecompile: false,
})
const depthOptions = new Option(
  '-d, --depth <depth>',
  'Set the search depth from the directory, no limit depth when set to 0',
)
  .argParser((v) => {
    const depth = parseInt(v)
    if (isNaN(depth)) throw new CommanderError(1, 'depth.error', 'Invalid depth')
    return depth
  })
  .default(1)
wxCommand
  .option('-i, --appid <appid>', 'Provide `appid` manually (only works when evaluating packages on `windows`)')
  .option('-f, --format', 'Reformatted output')
  .option('--no-clear-parsed', 'Residual files after parsing will not be cleared')
  .option('--no-clear-save', 'Paths to save will not be cleared')
  .addOption(noParseOption)
  .addOption(depthOptions)
  .option('-o, --output <path>', 'Set output path, default: main package whit out')
  .option('--clear-output', 'Empty the specified output folder')
  .description('Security assessment for wx applet')
  .addArgument(new Argument('<packages...>', 'The path of the package can be multiple or a directory'))
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
  clearOutput?: boolean
  packages: string[]
}

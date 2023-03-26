import { Command, Argument } from 'commander'
import { outputConfig } from '@/cli/outputConfig'

const wxCommand = new Command('wx')
wxCommand
  .option('-i, --appid <appid>', 'Set wxAppId, not provided will try to fetch from path')
  .option('-f, --format', 'Enable format code')
  .option('--no-clean', 'Retain unpacked residual files')
  .option('--no-parse', 'Only extract files, do not parse')
  .option('-o, --output <path>', 'Set output path, default: main package whit out')
  .description('Decompile the WeChat applet')
  .addArgument(new Argument('<packages...>', 'Set package path, could be a file, directory or multiple files'))
  .showHelpAfterError()
  .configureOutput(outputConfig)
export default wxCommand

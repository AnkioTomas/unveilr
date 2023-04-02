import { Command, Option } from 'commander'
import wxCommand, { WxConfigurator } from '@/cli/commands/wxapkg'
import { LoggerLevel } from '@utils/logger'
import { outputConfig } from '@/cli/outputConfig'

export interface CliConfigurator {
  global: {
    logLevel: LoggerLevel
  }
  wx: WxConfigurator
}

export function registerCommand(version: string, name: string, _argv?: string[]): CliConfigurator {
  const argv = _argv || process.argv
  const logLevel = new Option('-l, --log-level <level>', 'Set log level')
    .choices(['debug', 'info', 'warn', 'error'])
    .default('info')
  const cmd = new Command(name)
  cmd
    .usage('[wx] [options]')
    .version(version, '-v, --version')
    .addOption(logLevel)
    .addCommand(wxCommand, { isDefault: true })
    .addHelpText(
      'after',
      `
Example:
  $ ${name} /path/to/wxapkg/dir/
  $ ${name} 1.wxapkg 2.wxapkg 3.wxapkg ...
  $ ${name} wx /path/to/wxapkg/dir/           Specify wx subcommand
  $ ${name} wx 1.wxapkg 2.wxapkg 3.wxapkg ... Specify wx subcommand
  $ ${name} wx -h                             Show wx help info
`,
    )
    .showHelpAfterError()
    .configureOutput(outputConfig)
    .parse(argv)
  if (!argv.length) return cmd.help({ error: true })
  return {
    global: cmd.opts(),
    wx: {
      ...wxCommand.opts(),
      packages: wxCommand.args,
    },
  }
}

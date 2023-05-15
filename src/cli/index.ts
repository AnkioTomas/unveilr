import { Command, Option } from 'commander'
import wxCommand, { WxConfigurator } from '@/cli/commands/wxapkg'
import { LoggerLevel } from '@utils/logger'
import { outputConfig } from '@/cli/config/outputConfig'
// import ttCommand from '@/cli/commands/ttapkg'

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
    // .addCommand(ttCommand)
    .addHelpText(
      'after',
      `
Example:
  $ ${name} /path/to/dir/                     Default wx subcommand
  $ ${name} -f /path/to/dir/                  Reformat output
  $ ${name} -f -o /target/dir/ /path/to/dir/  Reformat output & set output path
  ...
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
  } as CliConfigurator
}

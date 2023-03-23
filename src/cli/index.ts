import { Option, Command } from 'commander'
import wxCommand from '@/cli/commands/wxapkg'
import { LoggerLevel } from '@utils/logger'
import { outputConfig } from '@/cli/outputConfig'
import 'colors'
import { version, name } from '../../package.json'

export interface CliConfigurator {
  global: {
    logLevel: LoggerLevel
  }
  wx: {
    appid?: string
    format?: boolean
    clean: boolean
    output?: string
    packages: string[]
  }
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
  const config: CliConfigurator = {
    global: cmd.opts(),
    wx: {
      ...wxCommand.opts(),
      packages: wxCommand.args,
    },
  }
  return config
}

export const cliConfigurator = registerCommand(version, name)

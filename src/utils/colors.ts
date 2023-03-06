import * as colors from 'colors'
export function initializeColors(isDisabled: boolean) {
  colors.setTheme({
    silly: 'rainbow',
    input: 'blue',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red',
  })
  isDisabled && colors.disable()
}

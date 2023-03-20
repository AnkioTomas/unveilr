import * as colors from 'colors'
export function initializeColors(isDisabled?: boolean) {
  isDisabled && colors.disable()
}

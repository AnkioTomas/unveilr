import { PathController } from '@core/controller/PathController'
export function isDevelopment() {
  return PathController.make(process.argv[1]).suffixWithout === 'ts'
}

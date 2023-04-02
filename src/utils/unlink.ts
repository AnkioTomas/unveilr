import { PathController, ProduciblePath } from '@core/controller/PathController'

export function unlinkSync(path: ProduciblePath) {
  return _unlink(path, true)
}

function _unlink(path: ProduciblePath, sync?: boolean) {
  const ctrl = PathController.make(path)

  if (!ctrl.isFile) return
  if (ctrl.suffixWithout.toLowerCase() === 'html') {
    const suffixes = ['.appservice.js', '.common.js', '.webview.js']
    suffixes.forEach((suffix) => _unlink(ctrl.whitout(suffix)))
  }
  return sync ? ctrl.unlinkSync() : ctrl.unlink()
}

export function unlink(path: ProduciblePath, wait: true): Promise<void>
export function unlink(path: ProduciblePath, wait?: false): void
export function unlink(path: ProduciblePath, wait?: boolean): void | Promise<void> {
  const ret = _unlink(path)
  return wait ? ret : void 0
}

import { PathController, ProduciblePath } from '@baseController/PathController'
import { getSaveController, SaveAble, SaveController } from '@baseController/SaveController'
import { BaseLogger } from '@utils/logger'
import { BaseError } from '@utils/exceptions'
import { isWorkerRuntime } from '@utils/isWorkerRuntime'

export class SavingError extends BaseError {}
interface SaverItem {
  path: ProduciblePath
  buffer: SaveAble
}
export class Saver extends BaseLogger {
  private baseDir: PathController
  private saveList: SaverItem[]
  private readonly saveCtrl: SaveController
  constructor(baseDir?: ProduciblePath) {
    if (isWorkerRuntime()) throw Error(`Saver cannot run on Worker!`)
    super()
    this.saveList = []
    this.saveDirectory = baseDir
    this.saveCtrl = getSaveController()
  }
  set saveDirectory(dir: ProduciblePath) {
    this.baseDir = PathController.make(dir)
  }
  get saveDirectory(): PathController {
    return this.baseDir
  }

  add(path: ProduciblePath, buffer: SaveAble, force?: boolean): this {
    const ctrl = PathController.make(path)
    if (ctrl.isAbs) {
      this.saveCtrl.set(ctrl.path, buffer)
    } else if (force) {
      this.saveCtrl.set(ctrl.abspath, buffer)
    } else {
      this.saveList.push({ path, buffer })
    }
    return this
  }
  /**
   * @desc 合并到全局桶内
   * @description 为什么不直接放到桶内？
   * 因为 baseDir 会变化,
   * 需要重新计算最终路径
   * */
  merge(): this {
    this.saveList.forEach((item) => {
      const { path, buffer } = item
      const pCtrl = PathController.make(path)
      let target = pCtrl
      if (!pCtrl.isAbs) {
        if (!this.baseDir) SavingError.throw(`BaseDir is not a directory!`)
        target = this.baseDir.join(pCtrl.path)
      }
      this.saveCtrl.set(target.abspath, buffer)
    })
    return this
  }
}

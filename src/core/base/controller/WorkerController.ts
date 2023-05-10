import { ModuleThread, Pool, spawn, Thread, Worker } from 'threads'
import { QueuedTask, TaskRunFunction } from 'threads/dist/master/pool-types'
import { cpus } from 'os'
import { ModuleMethods } from 'threads/dist/types/master'
import { PathController } from './/PathController'
import { BaseError } from '@utils/exceptions'

export type EachCallback<T extends ModuleMethods, R> = (
  result?: R,
  index?: number,
  results?: Array<QueuedTask<ModuleThread<T>, R>>,
) => void
export class WorkerError extends BaseError {}
export class WorkerController<T extends ModuleMethods, R> {
  results: Array<QueuedTask<ModuleThread<T>, R>>
  private tasks: Array<TaskRunFunction<ModuleThread<T>, R>>
  private readonly workerPath: string
  private readonly poolSize: number
  private pool: Pool<Thread>
  constructor(workerPath: string | NodeModule, poolSize?: number) {
    this.tasks = []
    this.results = []
    const _relative = (p: string) => PathController.make(__dirname).relative(p).unixpath
    this.workerPath = typeof workerPath === 'string' ? workerPath : _relative(workerPath.id)
    this.poolSize = poolSize || cpus().length
  }

  async start(callback: EachCallback<T, R>, terminate?: boolean): Promise<void>
  async start(terminate?: boolean): Promise<void>
  async start(v?: EachCallback<T, R> | boolean, _terminate?: boolean): Promise<void> {
    let callback,
      terminate = _terminate
    if (typeof v === 'function') {
      callback = v
    } else terminate = Boolean(v)
    if (!this.tasks.length) return
    this.pool = Pool(() => spawn(new Worker(this.workerPath)), this.poolSize)
    this.results = this.tasks.map((task) => this.pool.queue(task))
    await this.pool.completed()
    this.tasks = []
    callback && (await this.forEach(callback))
    terminate && (await this.terminate())
  }
  addTask(...runners: TaskRunFunction<ModuleThread<T>, R>[]) {
    runners.forEach((runner) => this.tasks.push(runner))
  }

  async terminate() {
    if (!this.pool) WorkerError.throw('The worker pool has not started yet, please start it first')
    await this.pool.terminate()
    delete this.pool
  }

  async forEach(callback: EachCallback<T, R>): Promise<void> {
    await Promise.all(
      this.results.map((task, index) => {
        return task.then((result) => callback(result, index, this.results))
      }),
    )
    this.results = []
  }
}

import { Pool, spawn, Thread, Worker } from 'threads'
import { QueuedTask, TaskRunFunction } from 'threads/dist/master/pool-types'
import { cpus } from 'os'

export type EachCallback<R> = (result?: R, index?: number, results?: Array<QueuedTask<Thread, R>>) => void
export class WorkerController<ReturnType> {
  results: Array<QueuedTask<Thread, ReturnType>>
  private tasks: Array<TaskRunFunction<Thread, ReturnType>>
  readonly workerPath: string
  readonly poolSize: number
  private pool: Pool<Thread>
  constructor(workerPath: string, poolSize?: number) {
    this.tasks = []
    this.results = []
    this.workerPath = workerPath
    this.poolSize = poolSize || cpus().length
  }

  async start(callback: EachCallback<ReturnType>, terminate?: boolean): Promise<void>
  async start(terminate?: boolean): Promise<void>
  async start(v?: EachCallback<ReturnType> | boolean, _terminate?: boolean): Promise<void> {
    let callback,
      terminate = _terminate
    if (typeof v === 'function') {
      callback = v
    } else terminate = Boolean(v)
    this.pool = Pool(() => spawn(new Worker(this.workerPath)), this.poolSize)
    this.results = this.tasks.map((task) => this.pool.queue(task))
    await this.pool.completed()
    this.tasks = []
    callback && (await this.forEach(callback))
    terminate && (await this.terminate())
  }
  addTask(...runners: TaskRunFunction<Thread, ReturnType>[]) {
    runners.forEach((runner) => this.tasks.push(runner))
  }

  async terminate() {
    await this.pool.terminate()
    delete this.pool
  }

  async forEach(callback: EachCallback<ReturnType>): Promise<void> {
    for (let i = 0; i < this.results.length; i++) {
      const task = this.results[i]
      callback(await task, i, this.results)
    }
    this.results = []
  }
}

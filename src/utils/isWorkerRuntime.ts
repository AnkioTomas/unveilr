import { isMainThread } from 'worker_threads'

export function isWorkerRuntime(): boolean {
  return !isMainThread
}

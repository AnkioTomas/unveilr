import { expose } from 'threads/worker'
import { isWorkerRuntime } from '@utils/isWorkerRuntime'
import { Observable, Subject } from 'threads/observable'
import { Visitor } from '@babel/core'
import { TraverseController } from '@baseController/TraverseController'
import { initializeConfig } from '@baseController/ConfigController'
import { TraverseVisitorKeys, TraverseVisitorMap, TVSubjectType } from './types'
import { WxapkgAppConfigParser } from './WxapkgAppConfigParser'
import { WxapkgWxssParser } from './WxapkgWxssParser'
import { WxapkgScriptParser } from './WxapkgScriptParser'
import { WxapkgWxmlParser } from './WxapkgWxmlParser'

export function createExposed() {
  const subject = new Subject<TVSubjectType>()
  const visitors: Partial<TraverseVisitorMap> = {}
  const visitorsFn: Record<TraverseVisitorKeys, (subject1: typeof subject) => Visitor> = {
    AppConfigService: WxapkgAppConfigParser.visitor,
    WxssParser: WxapkgWxssParser.visitorSetCssToHead,
    WxssParserCommon: WxapkgWxssParser.visitorCommonStyle,
    WxssParserCommon2: WxapkgWxssParser.visitorCArray,
    ScriptParser: WxapkgScriptParser.visitor,
    WxmlParserV3: WxapkgWxmlParser.visitorV3,
  }
  return {
    // worker 运行时需要复制一份配置
    initWorker(config: Parameters<typeof initializeConfig>[0]) {
      initializeConfig(config)
    },
    async startTraverse(code: string) {
      const tCtrl = new TraverseController({ code })
      tCtrl.addVisitors(...Object.values(visitors))
      await tCtrl.traverse()
      subject.complete()
    },
    setVisitor(...keys: Array<keyof TraverseVisitorMap>) {
      keys.forEach((key) => (visitors[key] = visitorsFn[key](subject)))
    },
    observable() {
      return Observable.from(subject)
    },
  }
}

if (isWorkerRuntime()) {
  expose(createExposed())
}

export const traverseModule = module

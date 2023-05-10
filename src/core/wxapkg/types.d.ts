import { Visitor } from '@babel/core'
import { Observable, Subject } from 'threads/observable'

export interface TraverseVisitorMap {
  AppConfigService: Visitor
  WxssParser: Visitor
  WxssParserCommon: Visitor
  WxssParserCommon2: Visitor
  ScriptParser: Visitor
  WxmlParserV3: Visitor
}
export type TraverseVisitorKeys = keyof TraverseVisitorMap
export type Dict<T = string> = { [key: string]: T }
export type SubjectType<K extends TraverseVisitorKeys, V = Dict> = { [name in K]: V }
export type TVSubjectType = SubjectType<keyof TraverseVisitorMap, never>
export type TVSubject = Subject<TVSubjectType>
export type AppConfigServiceSubject<V = Dict> = Subject<SubjectType<'AppConfigService', V>>
export type WxssParserSubject = Subject<SubjectType<'WxssParser'>>
export type WxssParserCommonSubject = Subject<SubjectType<'WxssParserCommon'>>
export type WxssParserCommon2Subject = Subject<SubjectType<'WxssParserCommon2'>>
export type ScriptParserSubject<V = Dict> = Subject<SubjectType<'ScriptParser', V>>
export type WxmlParserV3Subject = Subject<SubjectType<'WxmlParserV3', TraverseResult>>
export type S2Observable<T extends Subject<unknown>> = T extends Subject<infer O> ? Observable<O> : never
export type ParserLike<Args = unknown, Ret = unknown> = {
  parse(...args: Args[]): Ret
}
export type ZArray = { mul: Record<string, unknown[]> }
export interface TraverseResult {
  z: ZArray
  json: string
  code: string
  scope: string
}

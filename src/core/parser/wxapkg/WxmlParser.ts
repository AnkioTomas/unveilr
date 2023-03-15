import { BaseParser } from '../BaseParser'
import { ProduciblePath } from '@core/controller/PathController'

/**
 * ## 1. 解析动态计算的变量数组
 * ### 1.1 匹配 `FunctionDeclaration` 节点 & 函数名匹配 `/gz\$gwx_[A-Za-z_0-9]+/`
 * ### 1.2 匹配 `CallExpression` 子节点 & `callee.type = FunctionExpression` 取 `callee` 列出 `body.body`
 *  ### 1.2.1 过滤 `FunctionDeclaration` 子节点
 *  ### 1.2.2 匹配 `VariableDeclaration` 子节点 列出 `declarations.id.name` &` declarations.init.value`
 *  ### 存 `map={[name]:value}`
 *  ### 1.2.3 匹配 `CallExpression` 子节点 & `callee.name = Z` 列出 `arguments` 并保存
 *  ### 1.2.4 遍历所有 `arguments`
 * ### 1.2.4.1 遇到 `MemberExpression` 取 `arguments[property.value]` 进行替换
 * ### 1.2.4.2 遇到 `Identifier 取 map[name]` 进行替换
 * */
export class WxmlParser extends BaseParser {
  constructor(path: ProduciblePath) {
    super(path)
  }

  async parse(): Promise<void> {
    return void 0
  }
}

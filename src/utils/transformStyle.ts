import { parse, generate, walk, CssNode, Raw, TypeSelector, List, ListItem, Declaration, Value } from 'css-tree'
export type TransformStyleResult = {
  buffer: string
  path?: string
}
export function transformStyle(style: string, path?: string): TransformStyleResult {
  const ast = parse(style)
  walk(ast, function (node) {
    switch (node.type) {
      case 'Comment':
        {
          const _node = node as unknown as Raw
          _node.type = 'Raw'
          _node.value = '\n/*' + node.value + '*/\n'
        }
        break
      case 'TypeSelector':
        {
          const name = node.name
          const _node = node as TypeSelector
          if (name.startsWith('wx')) {
            _node.name = name.slice(3)
          } else if (name === 'body') {
            _node.name = 'page'
          }
        }
        break
    }
    if ('children' in node && node.children) {
      const removeType = ['webkit', 'moz', 'ms', 'o']
      const temp: { [key: string]: ListItem<CssNode> } = {}
      const retNodeChildren = node.children as List<CssNode>
      retNodeChildren.forEach((item, nodeItem) => {
        if (item.type === 'Declaration') {
          if (temp[item.property]) {
            const tempNode = temp[item.property]
            const tempNodeData = tempNode.data
            let result: ListItem<CssNode>
            const itemValue = item.value
            const tempNodeValue = (tempNodeData as Declaration).value
            if (itemValue.type == 'Raw' && itemValue.value.startsWith('progid:DXImageTransform')) {
              retNodeChildren.remove(nodeItem)
              result = tempNode
            } else if (tempNodeValue.type == 'Raw' && tempNodeValue.value.startsWith('progid:DXImageTransform')) {
              retNodeChildren.remove(tempNode)
              result = nodeItem
            } else {
              const _itemValue = itemValue as Value
              const _tempNodeData = tempNodeData as Value
              let xValue =
                _itemValue.children &&
                _itemValue.children.first &&
                'name' in _itemValue.children.first &&
                (_itemValue.children.first['name'] as string | undefined)
              let yValue =
                _tempNodeData.children &&
                _tempNodeData.children.first &&
                'name' in _tempNodeData.children.first &&
                (_tempNodeData.children.first['name'] as string | undefined)

              if (xValue && yValue) {
                for (const type of removeType) {
                  if (xValue === `-${type}-${yValue}`) {
                    retNodeChildren.remove(nodeItem)
                    result = tempNode
                    break
                  } else if (yValue === `-${type}-${xValue}`) {
                    retNodeChildren.remove(tempNode)
                    result = nodeItem
                    break
                  } else {
                    const prefix = `-${type}-`
                    if (xValue.startsWith(prefix)) {
                      xValue = xValue.slice(prefix.length)
                    }
                    if (yValue.startsWith(prefix)) {
                      yValue = yValue.slice(prefix.length)
                    }
                  }
                }
              }
            }
            temp[item.property] = result || tempNode
          } else {
            temp[item.property] = nodeItem
          }
        }
      })
      for (const name in temp) {
        if (!name.startsWith('-')) {
          for (const type of removeType) {
            const fullName = `-${type}-${name}`
            if (temp[fullName]) {
              retNodeChildren.remove(temp[fullName])
              delete temp[fullName]
            }
          }
        }
      }
    }
  })
  return {
    buffer: generate(ast),
    path,
  }
}

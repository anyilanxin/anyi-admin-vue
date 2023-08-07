/*
 * Copyright (c) 2023-present ZHOUXUANHONG(安一老厨)<anyilanxin@aliyun.com>
 *
 * AnYi Admin Vue Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * ------------------------------------------------------------------------
 * 安一兰心(AN YI LAN XIN)。安一出品，必出精品。
 *
 *   Official  Website ::  https://anyilanxin.com
 * ------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------
 * ANYI ADMIN VUE ADDITIONAL:
 *
 * AnYi Admin Vue 采用APACHE LICENSE 2.0开源协议，您在使用过程中，需要注意以下几点：
 *   1.请不要删除和修改根目录下的LICENSE.txt文件；
 *   2.请不要删除和修改 AnYi Admin Vue 源码头部的版权声明；
 *   3.请保留源码和相关描述文件的项目出处，作者声明等；
 *   4.分发源码时候，请注明软件出处 https://github.com/anyilanxin/anyi-admin-vue；
 *   5.在修改包名，模块名称，项目代码等时，请注明软件出处 https://github.com/anyilanxin/anyi-admin-vue；
 *   6.本软件不允许在国家法律规定范围外使用，如出现违法行为原作者本人不承担任何法律风险；
 *   7.进行商用时，不得基于AnYi Admin Vue的基础，修改包装而成一个与AnYi Cloud EE、AnYi Zeebe EE、AnYi Standalone EE功能类似的程序，进行销售或发布，参与同类软件产品市场的竞争；
 *   8.本软件使用的第三方依赖皆为开源软件，如需要修改第三方源码请遵循第三方源码附带开源协议；
 *   9.本软件中使用了bpmn js,使用请遵循bpmn.io开源协议：
 *     https://github.com/bpmn-io/bpmn-js/blob/develop/LICENSE
 *   10.若您的项目无法满足以上几点，可申请商业授权。
 * ------------------------------------------------------------------------
 */
interface TreeActionConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeActionConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

function getConfig(config = {}) {
  return Object.assign({}, DEFAULT_CONFIG, config)
}

// tree from list

export function findTreeNode<T = any>(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
): T | null {
  config = getConfig(config)
  const { children } = config
  const list = [...tree]
  for (const node of list) {
    if (func(node)) return node
    node[children!] && list.push(...node[children!])
  }
  return null
}

export function findAllTreeNode<T = any>(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
): T[] {
  config = getConfig(config)
  const { children } = config
  const list = [...tree]
  const result: T[] = []
  for (const node of list) {
    func(node) && result.push(node)
    node[children!] && list.push(...node[children!])
  }
  return result
}

export function findParentPath<T = any>(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
): T | T[] | null {
  config = getConfig(config)
  const paths: T[] = []
  const list = [...tree]
  const visitedSet = new Set()
  const { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      paths.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      paths.push(node)
      if (func(node)) {
        return paths
      }
    }
  }
  return null
}

export function findAllParentPath(
  tree: any,
  func: AnyFunction<any>,
  config?: TreeActionConfig,
) {
  config = getConfig(config)
  const paths: any[] = []
  const list = [...tree]
  const result: any[] = []
  const visitedSet = new Set(),
    { children } = config
  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      paths.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node[children!] && list.unshift(...node[children!])
      paths.push(node)
      func(node) && result.push([...paths])
    }
  }
  return result
}

export function findAllParentField(tree: any, path: string, field: string) {
  const list = findAllParentPath(tree, (n) => n[field] === path)
  return (list || []).map((item) => item[field])
}

export function filterTree<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config?: TreeActionConfig,
): T[] {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

export function forEachTree<T = any>(
  tree: T[],
  func: (n: T) => any,
  config?: TreeActionConfig,
) {
  config = getConfig(config)
  const list: any[] = [...tree]
  const { children } = config
  for (let i = 0; i < list.length; i++) {
    //func Returning true will terminate the traversal, avoiding meaningless loops in a large number of node scenarios, causing the browser to freeze
    if (func(list[i])) {
      return
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children])
  }
}

/**
 * @description: Extract tree specified structure
 */
export function mapTree<T = any>(
  treeData: T[],
  opt: { children?: string; conversion: AnyFunction<any> },
): T[] {
  return treeData.map((item) => doMapTree(item, opt))
}

/**
 * Recursively traverse the tree structure
 */
export function traverseTree(
  data: any[],
  callBack: AnyFunction<any>,
  parentNode = {},
) {
  data.forEach((element) => {
    const newNode = callBack(element, parentNode) || element
    if (element.children) {
      traverseTree(element.children, callBack, newNode)
    }
  })
}

/**
 * @description: Extract tree specified structure
 */
function doMapTree(
  data: any,
  {
    children = 'children',
    conversion,
  }: { children?: string; conversion: AnyFunction<any> },
) {
  const haveChildren =
    Array.isArray(data[children]) && data[children].length > 0
  const conversionData = conversion(data) || {}
  if (haveChildren) {
    return {
      ...conversionData,
      [children]: data[children].map((i: number) =>
        doMapTree(i, {
          children,
          conversion,
        }),
      ),
    }
  } else {
    return { ...conversionData }
  }
}

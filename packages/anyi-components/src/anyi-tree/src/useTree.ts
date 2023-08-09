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
 * =======================================================================
 * 安一兰心(AN YI LAN XIN)，安一出品，必出精品。
 *
 *   Official  Website ::  https://anyilanxin.com
 * =======================================================================
 *
 * =======================================================================
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
 * =======================================================================
 */
import type { InsertNodeParams, KeyType, FieldNames, TreeItem } from './tree'
import type { Ref, ComputedRef } from 'vue'
import type { TreeDataItem } from 'ant-design-vue/es/tree/Tree'

import { cloneDeep } from 'lodash-es'
import { unref } from 'vue'
import { forEach } from '/@/utils/helper/treeHelper'

export function useTree(treeDataRef: Ref<TreeDataItem[]>, getFieldNames: ComputedRef<FieldNames>) {
  function getAllKeys(list?: TreeDataItem[]) {
    const keys: string[] = []
    const treeData = list || unref(treeDataRef)
    const { key: keyField, children: childrenField } = unref(getFieldNames)
    if (!childrenField || !keyField) return keys

    for (let index = 0; index < treeData.length; index++) {
      const node = treeData[index]
      keys.push(node[keyField]!)
      const children = node[childrenField]
      if (children && children.length) {
        keys.push(...(getAllKeys(children) as string[]))
      }
    }
    return keys as KeyType[]
  }

  // get keys that can be checked and selected
  function getEnabledKeys(list?: TreeDataItem[]) {
    const keys: string[] = []
    const treeData = list || unref(treeDataRef)
    const { key: keyField, children: childrenField } = unref(getFieldNames)
    if (!childrenField || !keyField) return keys

    for (let index = 0; index < treeData.length; index++) {
      const node = treeData[index]
      node.disabled !== true && node.selectable !== false && keys.push(node[keyField]!)
      const children = node[childrenField]
      if (children && children.length) {
        keys.push(...(getEnabledKeys(children) as string[]))
      }
    }
    return keys as KeyType[]
  }

  function getChildrenKeys(nodeKey: string | number, list?: TreeDataItem[]) {
    const keys: KeyType[] = []
    const treeData = list || unref(treeDataRef)
    const { key: keyField, children: childrenField } = unref(getFieldNames)
    if (!childrenField || !keyField) return keys
    for (let index = 0; index < treeData.length; index++) {
      const node = treeData[index]
      const children = node[childrenField]
      if (nodeKey === node[keyField]) {
        keys.push(node[keyField]!)
        if (children && children.length) {
          keys.push(...(getAllKeys(children) as string[]))
        }
      } else {
        if (children && children.length) {
          keys.push(...getChildrenKeys(nodeKey, children))
        }
      }
    }
    return keys as KeyType[]
  }

  // Update node
  function updateNodeByKey(key: string, node: TreeDataItem, list?: TreeDataItem[]) {
    if (!key) return
    const treeData = list || unref(treeDataRef)
    const { key: keyField, children: childrenField } = unref(getFieldNames)

    if (!childrenField || !keyField) return

    for (let index = 0; index < treeData.length; index++) {
      const element: any = treeData[index]
      const children = element[childrenField]

      if (element[keyField] === key) {
        treeData[index] = { ...treeData[index], ...node }
        break
      } else if (children && children.length) {
        updateNodeByKey(key, node, element[childrenField])
      }
    }
  }

  // Expand the specified level
  function filterByLevel(level = 1, list?: TreeDataItem[], currentLevel = 1) {
    if (!level) {
      return []
    }
    const res: (string | number)[] = []
    const data = list || unref(treeDataRef) || []
    for (let index = 0; index < data.length; index++) {
      const item = data[index]

      const { key: keyField, children: childrenField } = unref(getFieldNames)
      const key = keyField ? item[keyField] : ''
      const children = childrenField ? item[childrenField] : []
      res.push(key)
      if (children && children.length && currentLevel < level) {
        currentLevel += 1
        res.push(...filterByLevel(level, children, currentLevel))
      }
    }
    return res as string[] | number[]
  }

  /**
   * 添加节点
   */
  function insertNodeByKey({ parentKey = null, node, push = 'push' }: InsertNodeParams) {
    const treeData: any = cloneDeep(unref(treeDataRef))
    if (!parentKey) {
      treeData[push](node)
      treeDataRef.value = treeData
      return
    }
    const { key: keyField, children: childrenField } = unref(getFieldNames)
    if (!childrenField || !keyField) return

    forEach(treeData, (treeItem) => {
      if (treeItem[keyField] === parentKey) {
        treeItem[childrenField] = treeItem[childrenField] || []
        treeItem[childrenField][push](node)
        return true
      }
    })
    treeDataRef.value = treeData
  }
  /**
   * 批量添加节点
   */
  function insertNodesByKey({ parentKey = null, list, push = 'push' }: InsertNodeParams) {
    const treeData: any = cloneDeep(unref(treeDataRef))
    if (!list || list.length < 1) {
      return
    }
    if (!parentKey) {
      for (let i = 0; i < list.length; i++) {
        treeData[push](list[i])
      }
    } else {
      const { key: keyField, children: childrenField } = unref(getFieldNames)
      if (!childrenField || !keyField) return

      forEach(treeData, (treeItem) => {
        if (treeItem[keyField] === parentKey) {
          treeItem[childrenField] = treeItem[childrenField] || []
          for (let i = 0; i < list.length; i++) {
            treeItem[childrenField][push](list[i])
          }
          treeDataRef.value = treeData
          return true
        }
      })
    }
  }
  // Delete node
  function deleteNodeByKey(key: string, list?: TreeDataItem[]) {
    if (!key) return
    const treeData = list || unref(treeDataRef)
    const { key: keyField, children: childrenField } = unref(getFieldNames)
    if (!childrenField || !keyField) return

    for (let index = 0; index < treeData.length; index++) {
      const element: any = treeData[index]
      const children = element[childrenField]

      if (element[keyField] === key) {
        treeData.splice(index, 1)
        break
      } else if (children && children.length) {
        deleteNodeByKey(key, element[childrenField])
      }
    }
  }

  // Get selected node
  function getSelectedNode(key: KeyType, list?: TreeItem[], selectedNode?: TreeItem | null) {
    if (!key && key !== 0) return null
    const treeData = list || unref(treeDataRef)
    treeData.forEach((item) => {
      if (selectedNode?.key || selectedNode?.key === 0) return selectedNode
      if (item.key === key) {
        selectedNode = item
        return
      }
      if (item.children && item.children.length) {
        selectedNode = getSelectedNode(key, item.children, selectedNode)
      }
    })
    return selectedNode || null
  }
  return {
    deleteNodeByKey,
    insertNodeByKey,
    insertNodesByKey,
    filterByLevel,
    updateNodeByKey,
    getAllKeys,
    getChildrenKeys,
    getEnabledKeys,
    getSelectedNode,
  }
}

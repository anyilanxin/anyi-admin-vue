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
 */
import { find, isEmpty } from 'lodash-es';

// 多叉树的类型定义
export class TreeNode<T> {
  // 节点值
  val?: T;
  // 节点路径
  path: string;
  // 树路径
  treePath: string[];
  // 子节点
  children: TreeNode<T>[];
  constructor(path?: string, val?: T, parentNode?:TreeNode<T>) {
    this.val = val;
    this.path = path || '';
    this.children = [];
    if (parentNode) {
      if (parentNode.isRoot()) {
        this.treePath = [];  
      } else {
        this.treePath = [...parentNode.treePath, parentNode.path];  
      }
    } else {
      this.treePath = []
    }
  }

  // 是否是根节点
  isRoot(): boolean {
    return this.treePath.length === 0 && this.path === '';
  }

  // 添加子节点
  addChild(child: TreeNode<T>) {
    this.children.push(child);
  }
  //  删除子节点
  removeChild(child: TreeNode<T>) {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }
  // 是否是目标节点
  isNodeValEqual(val: T): boolean {
    return this.val === val;
  }

  // 深度优先查找
  dfs(val: T): TreeNode<T> | null {
    if (this.isNodeValEqual(val)) {
      return this;
    }
    for (let i = 0; i < this.children.length; i++) {
      const node = this.children[i].dfs(val);
      if (node) {
        return node;
      }
    }
    return null;
  }

  /**
   * 按路径查询
   * @param paths 路径数组
   * @param createWhenNotFound 路径数组
   * @returns
   */
  findByPath(paths: string[], createWhenNotFound = false, _parentNode?:TreeNode<T>): TreeNode<T> | null {
    for (let i = 0; i < paths.length; i++) {
      const [currentPath, ...nextPaths] = paths;
      const child = find(this.children, (node) => node.path === currentPath);
      if (child) {
        if (isEmpty(nextPaths)) {
          return child;            
        } else {
          return child.findByPath(nextPaths, createWhenNotFound);
        }
      } else if (createWhenNotFound) {
        const childNode = new TreeNode<T>(currentPath, undefined, this);
        this.addChild(childNode);
        if (isEmpty(nextPaths)) {
          return childNode;            
        } else {
          return childNode.findByPath(nextPaths, createWhenNotFound);
        }
      } else {
        return null;
      }
    }
    return null;
  }
}

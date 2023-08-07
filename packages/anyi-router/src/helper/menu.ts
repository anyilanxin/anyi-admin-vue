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
import { isUrl, cloneDeep, findParentPath, mapTree } from '@anyi/coreutils'
import { RouteParams } from 'vue-router'
import { toRaw } from 'vue'
import { Menu, MenuModule } from '@anyi/coretypes'

export function getAllParentPath<T = Recordable<any>>(treeData: T[], path: string) {
  const menuList = findParentPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((item) => item.path)
}

function joinParentPath(menus: AppRouteRecordRaw[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
    }
  }
}

// Parsing the menu module
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule

  const menuList = [menu]

  joinParentPath(menuList as AppRouteRecordRaw[])
  return menuList[0]
}

export function transformRouteToMenu(routeModList: AppRouteRecordRaw[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []

  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta?.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })
  // 筛选隐藏子菜单
  routeList.forEach((v) => {
    if (v.meta.hideChildrenInMenu) {
      delete v.children
    }
  })
  const list = mapTree(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { hideMenu = false } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: node.name,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      }
    },
  })
  joinParentPath(list)
  return cloneDeep(list)
}

/**
 * config menu with given params
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g
export function configureDynamicParamsMenu(menu: Menu, params: RouteParams) {
  const { path, paramPath } = toRaw(menu)
  let realPath = paramPath ? paramPath : path
  const matchArr = realPath.match(menuParamRegex)

  matchArr?.forEach((it) => {
    const realIt = it.substr(1)
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string)
    }
  })
  // save original param path.
  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path
  }
  menu.path = realPath
  // children
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params))
}

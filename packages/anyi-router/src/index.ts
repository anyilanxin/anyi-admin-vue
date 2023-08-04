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
import { DefineAppConfigOptions } from '@anyi/coretypes'
import { PermissionModeEnum } from '@anyi/coreconstants'
import { useAppConfig } from '@anyi/stores'
import { _assign } from '@anyi/coreutils'
import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { BasicRoutes } from './routes'
export * from './routes'
export * from './helper'
export * from './guard'
export * from './menus'
export * from './mitt/routeChange'

export interface Stores {
  userStore?: any
  lockStore?: any
  authStore?: any
  appConfig?: DefineAppConfigOptions
}

const WHITE_NAME_LIST: string[] = []
;(() => {
  const getRouteNames = (routeRecords: RouteRecordItem[]) =>
    routeRecords.forEach((item) => {
      WHITE_NAME_LIST.push(item.name)
      if (item?.children?.length) {
        getRouteNames(item.children)
      }
    })

  getRouteNames(BasicRoutes)
})()
export let stores: Stores = {}
export let router: Router
export function InitRouter(path: string): Router {
  router = createRouter({
    history: createWebHashHistory(path),
    routes: BasicRoutes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  })
  return router
}

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function initGuard(s: Stores) {
  _assign(stores, s)
  stores.appConfig = useAppConfig()
}

export const getPermissionMode = () => {
  return stores.appConfig?.permissionMode
}

export const isBackMode = () => {
  return getPermissionMode() === PermissionModeEnum.BACK
}
export const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
export const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE
}

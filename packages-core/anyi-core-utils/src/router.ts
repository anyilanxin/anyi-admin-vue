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
import type { RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

/**
 * 从模块对象中加载路由配置并加入到路由集合中
 * Load route configurations from modules and add them to a route collection
 *
 * @param modules 包含模块的对象 Object containing modules
 * @returns 加载后的路由配置数组 Loaded route configuration array
 */
export function loadRoutesFromModules(
  modules: Record<string, { default: any }>,
): AppRouteRecordRaw[] {
  // 创建一个空数组用于存储路由配置 Create an empty array to store route configurations
  const routeModuleList: AppRouteRecordRaw[] = []
  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {}
    // 如果当前模块的默认导出是一个数组，则将其展开并添加到路由配置数组中，否则直接将其添加到数组中
    // If the default export of the current module is an array, expand it and add it to the route configuration array; otherwise, add it directly to the array
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    routeModuleList.push(...modList)
  })

  // 返回路由配置数组 Return the route configuration array
  return routeModuleList
}

export function findMenuOpenKeys(menuOptions: any[], route?: any) {
  const result: string[] = []
  let isFind = false
  const backtrack = (item: any, keys: string[]) => {
    if (item.name === route?.name) {
      isFind = true
      result.push(...keys)
      return
    }
    if (item.children?.length) {
      item.children.forEach((el) => {
        backtrack(el, [...keys, el.name as string])
      })
    }
  }
  menuOptions.forEach((el: any) => {
    if (isFind) return // Performance optimization
    backtrack(el, [el.name as string])
  })
  return result
}

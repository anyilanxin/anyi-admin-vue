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
import { defineStore } from '@anyi/stores'
import { useGlobSetting } from '@/hooks/setting/useGlobSetting'
import { layoutRoutes, PAGE_NOT_FOUND_ROUTE } from '@anyi/router'
import { filterTree } from '@anyi/coreutils'
import { Menu } from '@anyi/coretypes'
import { useConfigStoreWithOut } from './config'
import { useUserStore } from './user'
import { getPermCode } from '@/apis/auth'
import { toRaw, unref } from 'vue'
import { projectSetting } from '@/setting'
import { PermissionModeEnum, PageEnum } from '@anyi/coreconstants'
import { flatMultiLevelRoutes, transformObjToRoute, transformRouteToMenu } from '@anyi/router'
import { getMenuList } from '@/apis/sys'
import { useAppConfig } from '@anyi/hooks'
import { asyncRoutes } from '@/router/routes'
import { getRouterInfoTree } from '@anyi/baseapis'

interface AuthState {
  // Permission code list
  permCodeList: string[] | number[]
  // Whether the route has been dynamically added
  isDynamicAddedRoute: boolean
  // To trigger a menu update
  lastBuildMenuTime: number
  // Backstage menu list
  backMenuList: Menu[]
  frontMenuList: Menu[]
}

export const useAuthStore = defineStore('app-auth-store', {
  state: (): AuthState => ({
    permCodeList: [],
    // Whether the route has been dynamically added
    isDynamicAddedRoute: false,
    // To trigger a menu update
    lastBuildMenuTime: 0,
    // Backstage menu list
    backMenuList: [],
    // menu List
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permCodeList
    },
    getBackMenuList(): Menu[] {
      return this.backMenuList
    },
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list
      list?.length > 0 && this.setLastBuildMenuTime()
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime()
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.permCodeList = []
      this.backMenuList = []
      this.lastBuildMenuTime = 0
    },
    async changePermissionCode() {
      const codeList = await getPermCode()
      this.setPermCodeList(codeList)
    },
    async buildRoutesAction(orgId?: string): Promise<AppRouteRecordRaw[]> {
      // const { t } = useI18n()
      const appConfig = useAppConfig()
      const userStore = useUserStore()

      let routes: AppRouteRecordRaw[] = []
      const roleList = toRaw(userStore.getRoles) || []
      const permissionMode = unref(appConfig.permissionMode)
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => roles.includes(role))
      }

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }

      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = userStore.getUserInfo?.homePath || PageEnum.BASE_HOME
        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }
      // 组合框架路由 与 本地路由
      const r = layoutRoutes.concat(asyncRoutes)
      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filterTree(r, routeFilter)
          routes = routes.filter(routeFilter)
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes)
          break
        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filterTree(r, routeFilter)
          routes = routes.filter(routeFilter)
          const menuList = transformRouteToMenu(routes, true)
          routes = filterTree(routes, routeRemoveIgnoreFilter)
          routes = routes.filter(routeRemoveIgnoreFilter)
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })

          this.setFrontMenuList(menuList as Menu[])

          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes)
          break

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        case PermissionModeEnum.BACK:
          // const { createMessage } = useMessage()

          // createMessage.loading(t('sys.app.menuLoading'))

          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = []
          try {
            // this.changePermissionCode()
            // 加载路由前获取用户信息
            const globSetting = useGlobSetting()
            await userStore.getUserInfoAction(orgId)
            routeList = (await getRouterInfoTree(
              globSetting.systemCode || '',
            )) as AppRouteRecordRaw[]
            if (routeList && routeList.length > 0) {
              userStore.setUserHomePath(routeList[0].path)
            }
          } catch (error) {
            console.error(error)
          }
          // Dynamically introduce components
          routeList = transformObjToRoute(routeList)

          //  Background routing to menu structure
          const backMenuList = transformRouteToMenu(routeList)
          this.setBackMenuList(backMenuList as Menu[])

          // remove meta.ignoreRoute item
          routeList = filterTree(routeList, routeRemoveIgnoreFilter)
          routeList = routeList.filter(routeRemoveIgnoreFilter)

          routeList = flatMultiLevelRoutes(routeList)
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList]
          break
      }

      patchHomeAffix(routes)
      return routes
    },
  },
})

// Need to be used outside the setup
export function useAuthStoreWithout() {
  return useAuthStore()
}

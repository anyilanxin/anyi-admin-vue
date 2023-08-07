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
import nProgress from 'nprogress'

import { stores, getPermissionMode, isBackMode, isRouteMappingMode, router } from './index'

import type { Menu } from '@anyi/coretypes'
import {
  BASIC_LOCK_PATH,
  BASIC_LOGIN_PATH,
  PageEnum,
  PermissionModeEnum,
} from '@anyi/coreconstants'
import { PAGE_NOT_FOUND_ROUTE, ROOT_ROUTE } from './routes'
import { configureDynamicParamsMenu } from './helper'

const LOADED_PAGE_POOL = new Map<string, boolean>()
const LOCK_PATH = BASIC_LOCK_PATH
const LOGIN_PATH = BASIC_LOGIN_PATH
const whitePathList: string[] = [LOGIN_PATH, LOCK_PATH]
const ROOT_PATH = ROOT_ROUTE.path

export function createBasicGuard() {
  const openNProgress = stores.appConfig?.transition?.openNProgress
  router.beforeEach((to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    to.meta.loaded = !!LOADED_PAGE_POOL.get(to.path)
    // Display a progress bar at the top when switching pages
    // Only works when the page is loaded for the first time
    if (openNProgress && !to.meta.loaded) {
      nProgress.start()
    }
    return true
  })
  router.afterEach((to) => {
    // Indicates that the page has been loaded
    // When opening again, you can turn off some progress display interactions
    LOADED_PAGE_POOL.set(to.path, true)
    // console.log(to)
    // Close the page loading progress bar
    if (openNProgress && !to.meta.loaded) {
      nProgress.done()
    }
  })
}

export function createAuthGuard() {
  const { userStore, authStore, lockStore } = stores
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo?.homePath &&
      userStore.getUserInfo?.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo?.homePath)
      return
    }

    const token = userStore.getAccessToken

    // TODO Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        const isSessionTimeout = userStore.getSessionTimeout
        try {
          await userStore.afterLoginAction()
          if (!isSessionTimeout) {
            next((to.query?.redirect as string) || '/')
            return
          }
        } catch {}
      }
      if (to.path === LOCK_PATH && !lockStore.getLockInfo?.isLock) {
        next({ path: from.path })
        return
      }
      next()
      return
    }
    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
        path: LOGIN_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }

      next(redirectData)
      return
    }

    if (lockStore.getLockInfo?.isLock) {
      // redirect lock page
      const redirectData: {
        path: string
        replace: boolean
        query?: Recordable<string>
      } = {
        path: LOCK_PATH,
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo?.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo?.homePath || PageEnum.BASE_HOME)
      return
    }
    const permissionMode = getPermissionMode()
    // TODO get userinfo while last fetch time is empty
    if (userStore.getLastUpdateTime === 0 && permissionMode == PermissionModeEnum.BACK) {
      try {
        await userStore.getUserInfoAction()
      } catch (err) {
        next()
        return
      }
    }
    if (authStore.getIsDynamicAddedRoute) {
      next()
      return
    }

    // console.log(to.params)
    const routes = await authStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    authStore.setDynamicAddedRoute(true)

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}

// 路由守卫：进入路由，增加Tabs
export function createTabsGuard(func: Function) {
  router.beforeEach(async (to) => {
    if (whitePathList.includes(to.path)) return
    // Notify routing changes
    func(to)
  })
}

export function createParamMenuGuard() {
  const { authStore } = stores
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!authStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    let menus: Menu[] = []
    if (isBackMode()) {
      menus = authStore.getBackMenuList
    } else if (isRouteMappingMode()) {
      menus = authStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
    next()
  })
}

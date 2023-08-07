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
import type { LoginParams } from '@/apis/auth'
import { defineStore } from '@anyi/corestores'
import { useGlobSetting } from '@/hooks/setting/useGlobSetting'
import { AnYiEventType, bus } from '@anyi/coreutils'
import { BASIC_HOME_PATH, BASIC_LOGIN_PATH, PageEnum } from '@anyi/coreconstants'
import { router } from '@/router'
import { doLogoutApi, getUserInfoApi, doLoginApi } from '@/apis/auth'
import { getUserInfo, loginOut, loginPicture } from '@anyi/baseapis'
import type { LoginPicture } from '@anyi/baseapis'
import { PAGE_NOT_FOUND_ROUTE } from '@anyi/router'
import { useAuthStoreWithout } from './auth'
import { Message } from '@arco-design/web-vue'
import { UserInfo, RoleInfo, TokenInfo, UserState } from '@anyi/coretypes'
import { ErrorMessageMode } from '@anyi/coretypes'
import { nextTick } from 'vue'
import { isArray } from '@anyi/coreutils'
import { userConnectWebSocket } from '@anyi/hooks'
import { RouteRecordRaw } from 'vue-router'

export const useUserStore = defineStore('app-user-store', {
  persist: {
    paths: ['userInfo', 'accessToken', 'roles'],
  },
  state: (): UserState => ({
    userInfo: null,
    accessToken: null,
    roles: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo | null {
      return this.userInfo
    },
    getAccessToken(): TokenInfo | null {
      return this.accessToken
    },
    getRoles(): RoleInfo[] {
      return this.roles.length > 0 ? this.roles : []
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
  },
  actions: {
    setAccessToken(info: TokenInfo | null) {
      this.accessToken = info
    },
    setRoles(roles: RoleInfo[]) {
      this.roles = roles
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
    },
    setUserHomePath(homePath: string) {
      if (homePath && this.userInfo) {
        this.userInfo.homePath = homePath
      }
      // 不缓存storage,每次刷新都重新获取
      // setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    resetState() {
      this.userInfo = null
      this.accessToken = null
      this.roles = []
      this.sessionTimeout = false
    },

    async login(
      params: LoginPicture & {
        goHome?: boolean
        mode?: ErrorMessageMode
      },
    ): Promise<UserInfo | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params
        const tokenInfo = await loginPicture(loginParams, mode)
        // save token
        this.setAccessToken(tokenInfo)
        // get user info
        const userInfo = await this.getUserInfoAction()
        const sessionTimeout = this.sessionTimeout
        if (sessionTimeout) {
          this.setSessionTimeout(false)
        } else if (goHome) {
          const permissionStore = useAuthStoreWithout()
          if (!permissionStore.isDynamicAddedRoute) {
            const routes = await permissionStore.buildRoutesAction()
            routes.forEach((route) => {
              router.addRoute(route as unknown as RouteRecordRaw)
            })
            router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
            permissionStore.setDynamicAddedRoute(true)
          }
          const redirect = (router.currentRoute.value.query.redirect || '') as string
          if (redirect) {
            await router.replace(redirect)
          } else {
            await router.replace(userInfo?.homePath || PageEnum.BASE_HOME)
          }
        }
        nextTick(() => {
          bus.emit(AnYiEventType.LoginSuccess)
        })
        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<UserInfo | null> {
      if (!this.getAccessToken) {
        return null
      }
      // get user info
      const userInfo = await this.getUserInfoAction()
      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        const permissionStore = useAuthStoreWithout()
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction()
          routes.forEach((route) => {
            router.addRoute(route)
          })
          router.addRoute(PAGE_NOT_FOUND_ROUTE)
          permissionStore.setDynamicAddedRoute(true)
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      }
      return userInfo
    },

    async getUserInfoAction(orgId?: string): Promise<UserInfo | null> {
      if (!this.getAccessToken) {
        return null
      }
      // 获取用户信息
      const userInfo = await getUserInfo(orgId)
      this.setUserInfo(userInfo)
      this.setRoles(userInfo?.roleCodes || [])
      // 获取权限信息
      nextTick(() => {
        const globSetting = useGlobSetting()
        const openSocket = globSetting.openSocket
        if (openSocket) {
          const { userConnect } = userConnectWebSocket()
          userConnect()
        }
      })
      return userInfo
    },

    async logout(goLogin = false) {
      if (this.getAccessToken) {
        try {
          await doLogoutApi()
        } catch (error: any) {
          console.log('logout error:' + error.toString())
        }
      }
      this.setAccessToken(null)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      const fullPath = router.currentRoute.value.fullPath
      if (fullPath !== BASIC_LOGIN_PATH) {
        goLogin &&
          router.push({
            path: BASIC_LOGIN_PATH,
            query: {
              redirect: fullPath,
            },
          })
      }
    },
    /**
     * @description: 切换机构
     */
    async switchOrg(orgId: string) {
      try {
        const permissionStore = useAuthStoreWithout()
        const routes = await permissionStore.buildRoutesAction(orgId)
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw)
        })
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
      } catch (error) {
        // createMessage.error(error?.message || '切换机构失败');
        return Promise.reject(error)
      }
      Message.success('切换机构成功')
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithout() {
  return useUserStore()
}

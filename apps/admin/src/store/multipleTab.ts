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
 * 安一兰心(AN YI LAN XIN)。安一出品，必出精品。
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
import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router'
import { toRaw, unref } from 'vue'

import { useGo, useRedo } from '@anyi/corehooks'
// import { Persistent } from '/@/utils/cache/persistent';
import { defineStore } from '@anyi/corestores'
import { PageEnum } from '@anyi/coreconstants'
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '@anyi/router'
import { getRawRoute, RemovableRef } from '@anyi/coreutils'
import { useUserStore } from '@/store/user'
// import { useRouter, useRoute } from 'vue-router'
// import { router } from '@/router'
// import {debug} from "util";
//
// import projectSetting from '/@/settings/projectSetting';
// import { useUserStore } from '/@/store/user';
// useUserStore
export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[] | RemovableRef<RouteLocationNormalized[]>
  lastDragEndIndex: number
}

function handleGotoPage(router: Router) {
  const go = useGo(router)
  go(unref(router.currentRoute).path, true)
}

const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {},
  }
}
// const TabsStorage = useLocalStorage('MULTIPLE_TABS_KEY', [])
// const cacheTab = true
// const cacheTab = projectSetting.multiTabsSetting.cache

export const useMultipleTabStore = defineStore({
  id: 'app-multiple-tab',
  persist: {
    paths: ['tabList'],
  },
  state: (): MultipleTabState => ({
    // Tabs that need to be cached
    cacheTabList: new Set(),
    // multiple tab list
    tabList: [],
    // Index of the last moved tab
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList)
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex
    },
  },
  actions: {
    /**
     * Update the cache according to the currently opened tabs
     */
    async updateCacheTab() {
      const cacheMap: Set<string> = new Set()

      for (const tab of this.tabList) {
        const item = getRawRoute(tab)
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive
        if (!needCache) {
          continue
        }
        const name = item.name as string
        cacheMap.add(name)
      }
      this.cacheTabList = cacheMap
    },

    /**
     * Refresh tabs
     */
    async refreshPage(router: Router) {
      const { currentRoute } = router
      const route = unref(currentRoute)
      const name = route.name

      const findTab = this.getCachedTabList.find((item) => item === name)
      if (findTab) {
        this.cacheTabList.delete(findTab)
      }
      const redo = useRedo(router)
      await redo()
    },
    clearCacheTabs(): void {
      this.cacheTabList = new Set()
    },
    resetState(): void {
      this.tabList = []
      this.clearCacheTabs()
    },
    goToPage(router: Router) {
      const go = useGo(router)
      const len = this.tabList.length
      const { path } = unref(router.currentRoute)

      let toPath: PageEnum | string = PageEnum.BASE_HOME

      if (len > 0) {
        const page = this.tabList[len - 1]
        const p = page.fullPath || page.path
        if (p) {
          toPath = p
        }
      }
      // Jump to the current page and report an error
      path !== toPath && go(toPath as PageEnum, true)
    },
    async checkTab(route: RouteLocationNormalized) {
      // await router.isReady()

      const { path, name, meta } = getRawRoute(route)
      // 404  The page does not need to add a tab
      if (
        [PageEnum.ERROR_PAGE, PageEnum.BASE_LOGIN, PageEnum.BASE_LOCK].includes(path as PageEnum) ||
        meta?.hideTab ||
        !name ||
        [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
      ) {
        return
      }
      await this.addTab(route)
    },
    async addTab(route: RouteLocationNormalized) {
      const { path, fullPath, params, query, meta } = getRawRoute(route)

      let updateIndex = -1
      // Existing pages, do not add tabs repeatedly
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })
      // If the tab already exists, perform the update operation
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        if (!curTab) {
          return
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        // Add tab
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel = meta?.dynamicLevel ?? -1
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // 首先获取到真实的路由，使用配置方式减少计算开销.
          // const realName: string = path.match(/(\S*)\//)![1];
          const realPath = meta?.realPath ?? ''
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.tabList.filter((e) => e.meta?.realPath ?? '' === realPath).length >= dynamicLevel
          ) {
            // 关闭第一个
            const index = this.tabList.findIndex((item) => item.meta.realPath === realPath)
            index !== -1 && this.tabList.splice(index, 1)
          }
        }
        this.tabList.push(route)
      }
      await this.updateCacheTab()
      // cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList)
    },

    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { affix } = {} } = route
        if (affix) {
          return
        }
        const index = this.tabList.findIndex((item) => item.fullPath === fullPath)
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router

      const { path } = unref(currentRoute)
      if (path !== tab.path) {
        // Closed is not the activation tab
        close(tab)
        return
      }

      // Closed is activated atb
      let toTarget: RouteLocationRaw = {}

      const index = this.tabList.findIndex((item) => item.path === path)

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.tabList.length === 1) {
          const userStore = useUserStore()
          toTarget = userStore.getUserInfo?.homePath || PageEnum.BASE_HOME
        } else {
          //  Jump to the right tab
          const page = this.tabList[index + 1]
          toTarget = getToTarget(page)
        }
      } else {
        // Close the current tab
        const page = this.tabList[index - 1]
        toTarget = getToTarget(page)
      }
      close(currentRoute.value)
      await replace(toTarget)
    },

    // Close according to key
    async closeTabByKey(key: string, router: Router) {
      const index = this.tabList.findIndex((item) => (item.fullPath || item.path) === key)
      if (index !== -1) {
        await this.closeTab(this.tabList[index], router)
        const { currentRoute, replace } = router
        // 检查当前路由是否存在于tabList中
        const isActivated = this.tabList.findIndex((item) => {
          return item.fullPath === currentRoute.value.fullPath
        })
        // 如果当前路由不存在于TabList中，尝试切换到其它路由
        if (isActivated === -1) {
          let pageIndex
          if (index > 0) {
            pageIndex = index - 1
          } else if (index < this.tabList.length - 1) {
            pageIndex = index + 1
          } else {
            pageIndex = -1
          }
          if (pageIndex >= 0) {
            const page = this.tabList[index - 1]
            const toTarget = getToTarget(page)
            await replace(toTarget)
          }
        }
      }
    },

    // Sort the tabs
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex]
      this.tabList.splice(oldIndex, 1)
      this.tabList.splice(newIndex, 0, currentTab)
      this.lastDragEndIndex = this.lastDragEndIndex + 1
    },

    // Close the tab on the right and jump
    async closeLeftTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex((item) => item.path === route.path)

      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index)
        const pathList: string[] = []
        for (const item of leftTabs) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkCloseTabs(pathList)
      }
      this.updateCacheTab()
      handleGotoPage(router)
    },

    // Close the tab on the left and jump
    async closeRightTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex((item) => item.fullPath === route.fullPath)

      if (index >= 0 && index < this.tabList.length - 1) {
        const rightTabs = this.tabList.slice(index + 1, this.tabList.length)

        const pathList: string[] = []
        for (const item of rightTabs) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkCloseTabs(pathList)
      }
      this.updateCacheTab()
      handleGotoPage(router)
    },

    async closeAllTab(router: Router) {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false)
      this.clearCacheTabs()
      this.goToPage(router)
    },

    /**
     * Close other tabs
     */
    async closeOtherTabs(route: RouteLocationNormalized, router: Router) {
      const closePathList = this.tabList.map((item) => item.fullPath)

      const pathList: string[] = []

      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find((item) => item.path === path)
          if (!closeItem) {
            continue
          }
          const affix = closeItem?.meta?.affix ?? false
          if (!affix) {
            pathList.push(closeItem.fullPath)
          }
        }
      }
      this.bulkCloseTabs(pathList)
      this.updateCacheTab()
      handleGotoPage(router)
    },

    /**
     * Close tabs in bulk
     */
    async bulkCloseTabs(pathList: string[]) {
      this.tabList = this.tabList.filter((item) => !pathList.includes(item.fullPath))
    },

    /**
     * Set tab's title
     */
    async setTabTitle(title: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.meta.title = title
        await this.updateCacheTab()
      }
    },
    /**
     * replace tab's path
     * **/
    async updateTabPath(fullPath: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.fullPath = fullPath
        findTab.path = fullPath
        await this.updateCacheTab()
      }
    },
  },
})

// Need to be used outside the setup
export function useMultipleTabWithOut() {
  return useMultipleTabStore()
}

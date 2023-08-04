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
import { initRequest } from '@anyi/request'
import { useUserStoreWithout, useUserStore } from '@/store/user'
import { useAuthStore } from '@/store/auth'
import { useI18n, useLocale } from '@anyi/corelocale'
import { deepMerge } from '@anyi/coreutils'
import { initLayout } from '@anyi/layouts'
import { useConfigStoreWithOut, useConfigStore } from '@/store/config'
import { projectSetting } from './setting'
import { Modal, Message } from '@arco-design/web-vue'
import { initComp } from '@anyi/vbencomponents'
// import { initLayout } from '@anyi/layouts'
import { initHooks } from '@anyi/hooks'
import { initBaseApis, socketApi } from '@anyi/baseapis'
import { localeList } from '@anyi/corelocale/src/config'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useLockPage } from './layout/components/useLockPage'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useFullContent } from '@/hooks/web/useFullContent'
import {
  getAllParentPath,
  getChildrenMenus,
  getCurrentParentPath,
  getMenus,
  getShallowMenus,
} from '@anyi/router'
import { useDesign } from '@/hooks/web/useDesign'
import { useAppInject } from '@/hooks/web/use-app-inject'
import { useTabs } from '@/hooks/useTabs'
import { usePromise } from '@anyi/corehooks'
import { useMultipleTabStore } from '@/store/multipleTab'
import { useGlobSetting } from '@/hooks/setting/useGlobSetting'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { useAppStore } from '@/store/modules/app'
import Logo from '@/layout/components/logo.vue'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useLockStore } from '@/store/lock'
import { unref } from 'vue'
import { useLockScreen } from '@/hooks/web/useLockScreen'
import { siteSetting } from '@/config'
import { useMultipleTabSetting } from '@/hooks/setting/useMultipleTabSetting'
// To decouple the modules below `packages/*`, they no longer depend on each other
// If the modules are heavily dependent on each other, you need to provide a decoupling method, and the caller will pass the parameters
// Each module needs to provide `bridge` file as a decoupling method

// 为了解耦 `packages/*` 下面各模块，不再相互依赖
// 如果模块相互依赖严重，则需要对外提供解耦方式，由调用方去进行参数传递
// 各个模块需要提供 `bridge` 文件作为解耦方式
async function initPackages() {
  const _initRequest = async () => {
    const { apiUrl } = useGlobSetting()
    const { t } = useI18n()
    await initRequest(() => {
      return {
        apiUrl,
        useGlobSetting,
        useUserStore: () => useUserStoreWithout(),
        getTokenFunction: () => {
          const userStore = useUserStoreWithout()
          return userStore.getAccessToken
        },
        errorFunction: null,
        noticeFunction: null,
        errorModalFunction: null,
        timeoutFunction: () => {
          const userStore = useUserStoreWithout()
          userStore.setAccessToken(null)
          userStore.logout(true)
        },
        unauthorizedFunction: (msg?: string) => {
          const userStore = useUserStoreWithout()
          userStore.setAccessToken(null)
          userStore.logout(true)
          return msg || t('sys.api.errMsg401')
        },
        handleErrorFunction: (msg, mode) => {
          if (mode === 'modal') {
            Modal.error({ title: t('sys.api.errorTip'), content: msg })
          } else if (mode === 'message') {
            Message.error(msg)
          }
        },
      }
    })
  }

  const _initComp = async () => {
    await initComp(() => {
      return {
        useLocale,
        localeList,
        useAppStore,
        useConfigStore,
      }
    })
  }
  const _initLayout = async () => {
    await initLayout(() => {
      return {
        useRootSetting,
        getMenus,
        getCurrentParentPath,
        getShallowMenus,
        getChildrenMenus,
        getAllParentPath,
        useHeaderSetting,
        useDesign,
        useAppInject,
        useTabs,
        usePromise,
        useMultipleTabStore,
        listenerRouteChange,
        useUserStore,
        useAppStore,
        useConfigStore,
        Logo,
        useMenuSetting,
        useMultipleTabSetting,
        useTransitionSetting,
        useLockStore,
        useLockScreen,
        siteSetting,
      }
    })
  }
  // const _initLayout = async () => {
  //   await initLayout(() => {
  //     return {
  //       useRootSetting,
  //       getMenus,
  //       getCurrentParentPath,
  //       getShallowMenus,
  //       getChildrenMenus,
  //       getAllParentPath,
  //       useHeaderSetting,
  //       useFullContent,
  //       useDesign,
  //       useAppInject,
  //       useTabs,
  //       usePromise,
  //       useMultipleTabStore,
  //       listenerRouteChange,
  //       useAuthStore,
  //       useUserStore,
  //       useAppStore,
  //       useConfigStore,
  //       Logo,
  //       useMenuSetting,
  //       useMultipleTabSetting,
  //       useTransitionSetting,
  //       useLockPage,
  //       useLockStore,
  //       useLockScreen,
  //       siteSetting,
  //     }
  //   })
  // }
  const _initBaseApis = async () => {
    await initBaseApis(() => {
      return {
        useGlobSetting,
        useUserStore,
      }
    })
  }
  const _initHooks = async () => {
    await initHooks(() => {
      return {
        socketApi,
        getTokenFunction: () => {
          const userStore = useUserStoreWithout()
          return userStore.getAccessToken
        },
        useUserStore,
      }
    })
  }
  await Promise.all([_initRequest(), _initComp(), _initLayout(), _initBaseApis(), _initHooks()])
}

// Initial project configuration
function initAppConfigStore() {
  const configStore = useConfigStoreWithOut()
  const projectConfig = unref(configStore.getProjectConfig)
  const projCfg = deepMerge(projectSetting, projectConfig || {})
  configStore.setProjectConfig(projCfg)
}

export async function initApplication() {
  // ! Need to pay attention to the timing of execution
  // ! 需要注意调用时机
  await initPackages()

  // Initialize internal system configuration
  initAppConfigStore()
}

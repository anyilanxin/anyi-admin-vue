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
import { StoreGeneric, storeToRefs, useAppConfig as appConfigStore } from '@anyi/corestores'
import { DefineAppConfigOptions } from '@anyi/coretypes'
import { HandlerSettingEnum, ThemeEnum, MenuModeEnum } from '@anyi/coreconstants'
import { _merge } from '@anyi/coreutils'
import { computed, reactive, unref } from 'vue'
import { useClipboard, _omit, getTheme } from '@anyi/coreutils'

type DefineAppConfigStoreGetters = {
  isSidebar: boolean
  isTopMenu: boolean
  isMixSidebar: boolean
  isMix: boolean
  isMixMode: boolean
  isHorizontal: boolean
}
export const useAppConfig = () => {
  const useAppConfigStore = appConfigStore()
  const appConfigOptions = storeToRefs(
    useAppConfigStore as StoreGeneric,
  ) as unknown as DefineAppConfigOptions & DefineAppConfigStoreGetters
  const { openSettingDrawer, sidebar, menu, isMixSidebar } = appConfigOptions
  const setAppConfig = (configs: DeepPartial<DefineAppConfigOptions>) => {
    useAppConfigStore.$patch((state) => {
      _merge(state, configs)
    })
  }

  function toggleOpenSettingDrawer() {
    useAppConfigStore.setOpenSettingDrawer(!unref(openSettingDrawer))
  }

  function toggleCollapse() {
    useAppConfigStore.setSidebar({ collapsed: !unref(sidebar).collapsed })
  }

  function toggleMenuFixed() {
    useAppConfigStore.setMenu({ mixSideFixed: !unref(menu).mixSideFixed })
  }

  function baseHandler(event: HandlerSettingEnum, value: any) {
    setAppConfig(handlerResults(event, value, appConfigOptions))
  }

  async function copyConfigs() {
    try {
      const { copy, isSupported } = useClipboard()
      if (!isSupported) return console.error('Your browser does not support Clipboard API')
      const source = reactive(_omit(appConfigOptions, ['openSettingDrawer']))
      await copy(JSON.stringify(source))
    } catch (e) {
      console.error(e)
    }
  }

  function clearAndRedo() {
    localStorage.clear()
    sessionStorage.clear()
    location.reload()
  }

  function resetAllConfig() {
    useAppConfigStore.$reset()
  }
  function getMenuStyles(mode: MenuModeEnum = MenuModeEnum.VERTICAL) {
    const { header, sidebar, theme } = appConfigOptions
    const styles = {}
    if (unref(theme) !== ThemeEnum.DARK) {
      if (mode == MenuModeEnum.HORIZONTAL) {
        if (getTheme(unref(header).bgColor) == 'light') {
          styles['--color-menu-light-bg'] = unref(header).bgColor
        } else {
          styles['--color-menu-dark-bg'] = unref(header).bgColor
        }
        styles['--color-menu-bg'] = unref(header).bgColor
      } else {
        if (getTheme(unref(sidebar).bgColor) == 'light') {
          styles['--color-menu-light-bg'] = unref(sidebar).bgColor
        } else {
          styles['--color-menu-dark-bg'] = unref(sidebar).bgColor
        }
        styles['--color-menu-bg'] = unref(sidebar).bgColor
      }
    }
    return styles
  }
  const getCollapsedShowTitle = computed<boolean>(() => {
    if (unref(isMixSidebar)) {
      return !unref(sidebar).collapsed
    }
    return unref(menu).collapsedShowTitle && unref(sidebar).collapsed
  })
  return {
    ...appConfigOptions,
    setAppConfig,
    toggleOpenSettingDrawer,
    baseHandler,
    copyConfigs,
    clearAndRedo,
    getMenuStyles,
    resetAllConfig,
    toggleCollapse,
    toggleMenuFixed,
    getCollapsedShowTitle,
  }
}

function handlerResults(
  event: HandlerSettingEnum,
  value: any,
  configOptions: DefineAppConfigOptions,
): DeepPartial<DefineAppConfigOptions> {
  const { themeColor, theme, sidebar, header } = configOptions
  switch (event) {
    case HandlerSettingEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value
      const splitOpt = split === undefined ? { split } : {}
      return {
        navBarMode: type,
        menu: {
          ...splitOpt,
          mode,
        },
      }

    case HandlerSettingEnum.CHANGE_THEME_COLOR:
      if (unref(themeColor) === value) {
        return {}
      }
      // changeTheme(value);
      return { themeColor: value }

    case HandlerSettingEnum.CHANGE_THEME:
      if (unref(theme) === value) {
        return {}
      }
      // updateDarkTheme(value);
      return { theme: value ? ThemeEnum.DARK : ThemeEnum.LIGHT }

    case HandlerSettingEnum.MENU_HAS_DRAG:
      return { menu: { canDrag: value } }

    case HandlerSettingEnum.MENU_ACCORDION:
      return { menu: { accordion: value } }

    case HandlerSettingEnum.MENU_TRIGGER:
      return { sidebar: { trigger: value } }

    case HandlerSettingEnum.MENU_TOP_ALIGN:
      return { menu: { topMenuAlign: value } }

    case HandlerSettingEnum.MENU_COLLAPSED:
      return { sidebar: { collapsed: value } }

    case HandlerSettingEnum.MENU_WIDTH:
      return { sidebar: { width: value } }

    case HandlerSettingEnum.MENU_SHOW_SIDEBAR:
      return { sidebar: { show: value, visible: value } }

    case HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE:
      return { menu: { collapsedShowTitle: value } }

    case HandlerSettingEnum.MENU_THEME:
      // updateSidebarBgColor(value);
      if (unref(sidebar).bgColor === value) return {}
      return { sidebar: { bgColor: value } }

    case HandlerSettingEnum.MENU_SPLIT:
      return { menu: { split: value } }

    case HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:
      return { closeMixSidebarOnChange: value }

    case HandlerSettingEnum.MENU_FIXED:
      return { sidebar: { fixed: value } }

    case HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR:
      return { menu: { mixSideTrigger: value } }

    case HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR:
      return { menu: { mixSideFixed: value } }

    // ============transition==================
    case HandlerSettingEnum.OPEN_PAGE_LOADING:
      return { transition: { openPageLoading: value } }

    case HandlerSettingEnum.ROUTER_TRANSITION:
      return { transition: { basicTransition: value } }

    case HandlerSettingEnum.OPEN_ROUTE_TRANSITION:
      return { transition: { enable: value } }

    case HandlerSettingEnum.OPEN_PROGRESS:
      return { transition: { openNProgress: value } }
    // ============root==================

    case HandlerSettingEnum.LOCK_TIME:
      return { lockTime: value }

    case HandlerSettingEnum.FULL_CONTENT:
      return {
        content: { fullScreen: value },
        sidebar: { visible: !value, show: !value },
        header: { visible: !value, show: !value },
        tabTar: { visible: !value, show: !value },
      }

    case HandlerSettingEnum.CONTENT_MODE:
      return { content: { mode: value } }

    case HandlerSettingEnum.SHOW_BREADCRUMB:
      return { header: { showBreadCrumb: value } }

    case HandlerSettingEnum.SHOW_BREADCRUMB_ICON:
      return { header: { showBreadCrumbIcon: value } }

    case HandlerSettingEnum.GRAY_MODE:
      return { grayMode: value }

    case HandlerSettingEnum.SHOW_FOOTER:
      return { footer: { show: value, visible: value } }

    case HandlerSettingEnum.COLOR_WEAK:
      return { colorWeak: value }

    case HandlerSettingEnum.SHOW_LOGO:
      return { logo: { show: value, visible: value } }

    // ============tabs==================
    case HandlerSettingEnum.TABS_SHOW_QUICK:
      return { tabTar: { showQuick: value } }

    case HandlerSettingEnum.TABS_SHOW:
      return { tabTar: { show: value, visible: value } }
    case HandlerSettingEnum.TABS_TYPE:
      return { tabTar: { tabType: value } }
    case HandlerSettingEnum.TABS_SHOW_REDO:
      return { tabTar: { showRedo: value } }
    case HandlerSettingEnum.TABS_SHOW_FOLD:
      return { tabTar: { showFold: value } }

    // ============header==================
    case HandlerSettingEnum.HEADER_THEME:
      // updateHeaderBgColor(value);
      if (unref(header).bgColor === value) return {}
      return { header: { bgColor: value } }

    case HandlerSettingEnum.HEADER_SEARCH:
      return { header: { showSearch: value } }

    case HandlerSettingEnum.HEADER_FIXED:
      return { header: { fixed: value } }

    case HandlerSettingEnum.HEADER_SHOW:
      return { header: { show: value, visible: value } }
    default:
      return {}
  }
}

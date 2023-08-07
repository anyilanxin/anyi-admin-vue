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
import type { MenuSetting } from '@anyi/coretypes'

import { computed, unref, ref } from 'vue'

import { useConfigStoreWithOut } from '@/store/config'

import {
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  MenuModeEnum,
  MenuTypeEnum,
  TriggerEnum,
} from '@anyi/coreconstants'
import { useFullContent } from '@/hooks/web/useFullContent'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

const mixSideHasChildren = ref(false)

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent()
  const configStore = useConfigStoreWithOut()
  const { getShowLogo } = useRootSetting()
  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
    )
  })

  const getCollapsed = computed(() => configStore.getMenuSetting.collapsed)

  const getMenuType = computed(() => configStore.getMenuSetting.type)

  const getMenuMode = computed(() => configStore.getMenuSetting.mode)

  const getMenuFixed = computed(() => configStore.getMenuSetting.fixed)

  const getShowMenu = computed(() => configStore.getMenuSetting.show)

  const getMenuHidden = computed(() => configStore.getMenuSetting.hidden)

  const getMenuWidth = computed(() => configStore.getMenuSetting.menuWidth)

  const getTrigger = computed(() => configStore.getMenuSetting.trigger)

  const getMenuTheme = computed(() => configStore.getMenuSetting.theme)

  const getSplit = computed(() => configStore.getMenuSetting.split)

  const getMenuBgColor = computed(() => configStore.getMenuSetting.bgColor)

  const getMixSideTrigger = computed(() => configStore.getMenuSetting.mixSideTrigger)

  const getCanDrag = computed(() => configStore.getMenuSetting.canDrag)

  const getAccordion = computed(() => configStore.getMenuSetting.accordion)

  const getMixSideFixed = computed(() => configStore.getMenuSetting.mixSideFixed)

  const getTopMenuAlign = computed(() => configStore.getMenuSetting.topMenuAlign)

  const getCloseMixSidebarOnChange = computed(
    () => configStore.getMenuSetting.closeMixSidebarOnChange,
  )

  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR)

  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU)

  const getMenuShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType))

  const getCollapsedShowTitle = computed(() => configStore.getMenuSetting.collapsedShowTitle)

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit)
  })

  const getShowHeaderTrigger = computed(() => {
    if (
      unref(getMenuType) === MenuTypeEnum.TOP_MENU ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false
    }

    return unref(getTrigger) === TriggerEnum.HEADER
  })

  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL
  })

  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR
  })

  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX
  })

  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(menu).mixSideFixed
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth)
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = configStore.getMenuSetting
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
  })

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
        ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (unref(menu).mixSideFixed && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
        : unref(getRealWidth)

    return `calc(100% - ${unref(width)}px)`
  })

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    configStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getMenuFixed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getMenuTheme,
    getCanDrag,
    getCollapsedShowTitle,
    getIsHorizontal,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getShowHeaderTrigger,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getMenuBgColor,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    getCloseMixSidebarOnChange,
    getMixSideTrigger,
    getMixSideFixed,
    mixSideHasChildren,
    getMenuShowLogo,
  }
}

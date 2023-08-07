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
import { useAppConfig } from '../config'
import { unref, watchEffect } from 'vue'
import { useLayoutHeader, useLayoutSidebar } from '@anyi/corestores'
import {
  useCssVar,
  MaybeElementRef,
  lighten,
  pickTextColorBasedOnBgColor,
  darken,
  toggleClass,
} from '@anyi/coreutils'
import { ThemeEnum } from '@anyi/coreconstants'

const HEADER_HEIGHT = '--header-height'
const HEADER_BG_COLOR_VAR = '--header-background-color'
const HEADER_TEXT_COLOR_VAR = '--header-text-color'
const HEADER_ACTION_HOVER_BG_COLOR_VAR = '--header-action-hover-bg-color'

const ASIDE_WIDTH = '--aside-width'
const ASIDE_DARK_BG_COLOR = '--aside-background-color'
const ASIDE_TEXT_COLOR_VAR = '--aside-text-color'

const TRIGGER_BG_COLOR_VAR = '--trigger-background-color'

const TAB_BAR_HEIGHT = '--tab-bar-height'

const FOOTER_HEIGHT = '--footer-height'

const LIGHT_TEXT_COLOR = 'rgba(0,0,0,.85)'
const DARK_TEXT_COLOR = '#fff'

export function createThemeColorListen(el?: MaybeElementRef | null) {
  const { sidebar, header, grayMode, colorWeak, theme, setAppConfig } = useAppConfig()

  const { sidebarRef } = useLayoutSidebar()
  const { headerRef } = useLayoutHeader()

  const headerBgColor = useCssVar(HEADER_BG_COLOR_VAR, headerRef as MaybeElementRef, {
    initialValue: `${unref(header).bgColor}px`,
  })

  const headerTextColor = useCssVar(HEADER_TEXT_COLOR_VAR, headerRef as MaybeElementRef, {
    initialValue: LIGHT_TEXT_COLOR,
  })
  const headerActionHoverBgColor = useCssVar(
    HEADER_ACTION_HOVER_BG_COLOR_VAR,
    headerRef as MaybeElementRef,
  )

  const sidebarBgColor = useCssVar(ASIDE_DARK_BG_COLOR, sidebarRef as MaybeElementRef, {
    initialValue: `${unref(sidebar).bgColor}px`,
  })

  const asideTextColor = useCssVar(ASIDE_TEXT_COLOR_VAR, sidebarRef as MaybeElementRef, {
    initialValue: LIGHT_TEXT_COLOR,
  })
  const triggerBackgroundColor = useCssVar(TRIGGER_BG_COLOR_VAR, sidebarRef as MaybeElementRef)

  watchEffect(() => {
    headerBgColor.value = unref(header).bgColor
    headerTextColor.value = pickTextColorBasedOnBgColor(
      unref(header).bgColor,
      LIGHT_TEXT_COLOR,
      DARK_TEXT_COLOR,
    )
    if (['#fff', '#ffffff'].includes(unref(header).bgColor.toLowerCase())) {
      headerActionHoverBgColor.value = darken(unref(header).bgColor, 6)
      setAppConfig({ header: { theme: ThemeEnum.LIGHT } })
    } else {
      headerActionHoverBgColor.value = lighten(unref(header).bgColor, 6)
      setAppConfig({ header: { theme: ThemeEnum.DARK } })
    }

    sidebarBgColor.value = unref(sidebar).bgColor
    asideTextColor.value = pickTextColorBasedOnBgColor(
      unref(sidebar).bgColor,
      LIGHT_TEXT_COLOR,
      DARK_TEXT_COLOR,
    )
    if (['#fff', '#ffffff'].includes(unref(sidebar).bgColor.toLowerCase())) {
      setAppConfig({ sidebar: { theme: ThemeEnum.LIGHT } })
      triggerBackgroundColor.value = darken(unref(sidebar).bgColor, 6)
    } else {
      triggerBackgroundColor.value = lighten(unref(sidebar).bgColor, 6)
      setAppConfig({ sidebar: { theme: ThemeEnum.DARK } })
    }
    toggleGrayMode(unref(grayMode))
    toggleColorWeak(unref(colorWeak))
    const { body } = document
    if (ThemeEnum.DARK === unref(theme)) {
      body.setAttribute('arco-theme', 'dark')
    } else {
      body.removeAttribute('arco-theme')
    }
    // toggleClass(ThemeEnum.DARK === unref(theme), 'arco-theme', body)
  })
}

export function createGridLayoutListen(el: MaybeElementRef | null) {
  const { isTopMenu, sidebar, header, footer, tabTar, getCollapsedShowTitle, menu, isMixSidebar } =
    useAppConfig()
  const asideWidth = useCssVar(ASIDE_WIDTH, el, {
    initialValue: `${unref(sidebar).width}px`,
  })
  const headerHeight = useCssVar(HEADER_HEIGHT, el, {
    initialValue: `${unref(header).height}px`,
  })
  const tabBarHeight = useCssVar(TAB_BAR_HEIGHT, el, {
    initialValue: `${unref(tabTar).height}px`,
  })
  const footerHeight = useCssVar(FOOTER_HEIGHT, el, {
    initialValue: `${unref(footer).height}px`,
  })

  watchEffect(() => {
    const getAsideWidth = () => {
      if (unref(isTopMenu) || !unref(sidebar).visible) return 0
      if (unref(getCollapsedShowTitle)) {
        return unref(menu).mixSideFixed && unref(isMixSidebar)
          ? unref(sidebar).mixSidebarWidth + unref(menu).subMenuWidth
          : unref(sidebar).mixSidebarWidth
      }
      if (unref(sidebar).collapsed) {
        return unref(menu).mixSideFixed && unref(isMixSidebar)
          ? unref(sidebar).collapsedWidth + unref(menu).subMenuWidth
          : unref(sidebar).collapsedWidth
      }
      return unref(sidebar).width
    }

    const getHeaderHeight = () => {
      if (!unref(header).visible) return 0
      return unref(header).height
    }

    const getTabBarHeight = () => {
      if (!unref(tabTar).visible) return 0
      return unref(tabTar).height
    }

    const getFooterHeight = () => {
      if (!unref(footer).visible) return 0
      return unref(footer).height
    }
    asideWidth.value = `${getAsideWidth()}px`
    headerHeight.value = `${getHeaderHeight()}px`
    tabBarHeight.value = `${getTabBarHeight()}px`
    footerHeight.value = `${getFooterHeight()}px`
  })
}

function toggleGrayMode(isGrayMode: boolean) {
  toggleClass(isGrayMode, 'gray-mode', document.body)
}

function toggleColorWeak(isColorWeak: boolean) {
  toggleClass(isColorWeak, 'color-weak', document.body)
}

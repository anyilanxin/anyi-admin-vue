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
import { HandlerSettingEnum } from '@anyi/coreconstants'
import { ProjectConfig } from '@anyi/coretypes'
// import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
// import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
// import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
//
// import { useAppStore } from '/@/store/modules/app';
// import { changeTheme } from '/@/logics/theme';
// import { updateDarkTheme } from '/@/logics/theme/dark';
// import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { context } from '../../../bridge'
import { updateColorWeak } from '../../logics/updateColorWeak'
import { updateGrayMode } from '../../logics/updateGrayMode'

export function baseHandler(event: HandlerSettingEnum, value: any) {
  const { useConfigStore } = context

  const configStore = useConfigStore()
  const config = handler(event, value)
  // @ts-ignore
  configStore.setProjectConfig(config)
  // if (event === HandlerSettingEnum.CHANGE_THEME) {
  //   updateHeaderBgColor();
  //   updateSidebarBgColor();
  // }
}

export function handler(event: HandlerSettingEnum, value: any): DeepPartial<ProjectConfig> {
  const { useAppStore, useRootSetting } = context
  const appStore = useAppStore()
  // @ts-ignore
  const { getThemeColor, getDarkMode } = useRootSetting()
  switch (event) {
    case HandlerSettingEnum.CHANGE_LAYOUT:
      const { mode, type, split } = value
      const splitOpt = split === undefined ? { split } : {}

      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
          ...splitOpt,
        },
      }

    case HandlerSettingEnum.CHANGE_THEME_COLOR:
      if (getThemeColor.value === value) {
        return {}
      }
      // changeTheme(value);

      return { themeColor: value }

    case HandlerSettingEnum.CHANGE_THEME:
      if (getDarkMode.value === value) {
        return {}
      }
      // updateDarkTheme(value);

      return {}

    case HandlerSettingEnum.MENU_HAS_DRAG:
      return { menuSetting: { canDrag: value } }

    case HandlerSettingEnum.MENU_ACCORDION:
      return { menuSetting: { accordion: value } }

    case HandlerSettingEnum.MENU_TRIGGER:
      return { menuSetting: { trigger: value } }

    case HandlerSettingEnum.MENU_TOP_ALIGN:
      return { menuSetting: { topMenuAlign: value } }

    case HandlerSettingEnum.MENU_COLLAPSED:
      return { menuSetting: { collapsed: value } }

    case HandlerSettingEnum.MENU_WIDTH:
      return { menuSetting: { menuWidth: value } }

    case HandlerSettingEnum.MENU_SHOW_SIDEBAR:
      return { menuSetting: { show: value } }

    case HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE:
      return { menuSetting: { collapsedShowTitle: value } }

    case HandlerSettingEnum.MENU_THEME:
      // updateSidebarBgColor(value);
      return { menuSetting: { bgColor: value } }

    case HandlerSettingEnum.MENU_SPLIT:
      return { menuSetting: { split: value } }

    case HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE:
      return { menuSetting: { closeMixSidebarOnChange: value } }

    case HandlerSettingEnum.MENU_FIXED:
      return { menuSetting: { fixed: value } }

    case HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR:
      return { menuSetting: { mixSideTrigger: value } }

    case HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR:
      return { menuSetting: { mixSideFixed: value } }

    // ============transition==================
    case HandlerSettingEnum.OPEN_PAGE_LOADING:
      // @ts-ignore
      appStore.setPageLoading(false)
      return { transitionSetting: { openPageLoading: value } }

    case HandlerSettingEnum.ROUTER_TRANSITION:
      return { transitionSetting: { basicTransition: value } }

    case HandlerSettingEnum.OPEN_ROUTE_TRANSITION:
      return { transitionSetting: { enable: value } }

    case HandlerSettingEnum.OPEN_PROGRESS:
      return { transitionSetting: { openNProgress: value } }
    // ============root==================

    case HandlerSettingEnum.LOCK_TIME:
      return { lockTime: value }

    case HandlerSettingEnum.FULL_CONTENT:
      return { fullContent: value }

    case HandlerSettingEnum.CONTENT_MODE:
      return { contentMode: value }

    case HandlerSettingEnum.SHOW_BREADCRUMB:
      return { showBreadCrumb: value }

    case HandlerSettingEnum.SHOW_BREADCRUMB_ICON:
      return { showBreadCrumbIcon: value }

    case HandlerSettingEnum.GRAY_MODE:
      updateGrayMode(value)
      return { grayMode: value }

    case HandlerSettingEnum.SHOW_FOOTER:
      return { showFooter: value }

    case HandlerSettingEnum.COLOR_WEAK:
      updateColorWeak(value)
      return { colorWeak: value }

    case HandlerSettingEnum.SHOW_LOGO:
      return { showLogo: value }

    // ============tabs==================
    case HandlerSettingEnum.TABS_SHOW_QUICK:
      return { multiTabsSetting: { showQuick: value } }

    case HandlerSettingEnum.TABS_SHOW:
      return { multiTabsSetting: { show: value } }

    case HandlerSettingEnum.TABS_SHOW_REDO:
      return { multiTabsSetting: { showRedo: value } }

    case HandlerSettingEnum.TABS_SHOW_FOLD:
      return { multiTabsSetting: { showFold: value } }

    // ============header==================
    case HandlerSettingEnum.HEADER_THEME:
      // updateHeaderBgColor(value);
      return { headerSetting: { bgColor: value } }

    case HandlerSettingEnum.HEADER_SEARCH:
      return { headerSetting: { showSearch: value } }

    case HandlerSettingEnum.HEADER_FIXED:
      return { headerSetting: { fixed: value } }

    case HandlerSettingEnum.HEADER_SHOW:
      return { headerSetting: { show: value } }
    default:
      return {}
  }
}

<!--
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
 -->
<script lang="ts" setup>
import SwitchItem from './SwitchItem.vue'
import { HandlerSettingEnum } from '@anyi/coreconstants'
import { useI18n } from '@anyi/corelocale'
import SelectItem from './SelectItem.vue'

import { useAppConfig } from '@anyi/corehooks'

const { t } = useI18n()
const {
  header,
  sidebar,
  isHorizontal,
  isMixSidebar,
  tabTar,
  footer,
  content,
  grayMode,
  colorWeak,
  logo,
} = useAppConfig()
import { tabTypeOptions } from '../constant'
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.breadcrumb')"
      :def="header.showBreadCrumb"
      :event="HandlerSettingEnum.SHOW_BREADCRUMB"
      :disabled="!header.visible"
    />
    <SwitchItem
      :title="t('layout.setting.breadcrumbIcon')"
      :def="header.showBreadCrumbIcon"
      :event="HandlerSettingEnum.SHOW_BREADCRUMB_ICON"
      :disabled="!header.showBreadCrumb || !header.visible"
    />
    <SwitchItem
      :title="t('layout.setting.sidebar')"
      :def="sidebar.visible"
      :event="HandlerSettingEnum.MENU_SHOW_SIDEBAR"
      :disabled="isHorizontal"
    />
    <SwitchItem
      :title="t('layout.setting.header')"
      :def="header.visible"
      :event="HandlerSettingEnum.HEADER_SHOW"
    />
    <SwitchItem
      :title="t('Logo')"
      :def="logo.visible"
      :event="HandlerSettingEnum.SHOW_LOGO"
      :disabled="isMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.footer')"
      :def="footer.visible"
      :event="HandlerSettingEnum.SHOW_FOOTER"
    />
    <SwitchItem
      :title="t('layout.setting.fullContent')"
      :def="content.fullScreen"
      :event="HandlerSettingEnum.FULL_CONTENT"
    />
    <SwitchItem
      :title="t('layout.setting.grayMode')"
      :def="grayMode"
      :event="HandlerSettingEnum.GRAY_MODE"
    />
    <SwitchItem
      :title="t('layout.setting.colorWeak')"
      :def="colorWeak"
      :event="HandlerSettingEnum.COLOR_WEAK"
    />
    <SwitchItem
      :title="t('layout.setting.tabs')"
      :def="tabTar.visible"
      :event="HandlerSettingEnum.TABS_SHOW"
    />
    <SwitchItem
      :title="t('layout.setting.tabsRedoBtn')"
      :def="tabTar.showRedo"
      :event="HandlerSettingEnum.TABS_SHOW_REDO"
      :disabled="!tabTar.visible"
    />
    <SwitchItem
      :title="t('layout.setting.tabsQuickBtn')"
      :def="tabTar.showQuick"
      :event="HandlerSettingEnum.TABS_SHOW_QUICK"
      :disabled="!tabTar.visible"
    />
    <SwitchItem
      :title="t('layout.setting.tabsFoldBtn')"
      :def="tabTar.showFold"
      :event="HandlerSettingEnum.TABS_SHOW_FOLD"
      :disabled="!tabTar.visible"
    />
    <SelectItem
      :title="t('layout.setting.tabsType')"
      :options="tabTypeOptions"
      :def="tabTar.tabType"
      :event="HandlerSettingEnum.TABS_TYPE"
      :disabled="!tabTar.visible"
    />
  </VbenSpace>
</template>

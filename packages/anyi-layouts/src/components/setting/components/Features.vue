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
 -->
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
 * AnYi Admin Vue 采用APACHE LICENSE 2.0开源协议，您在使用过程中，需要注意以下几点：
 *   1.请不要删除和修改根目录下的LICENSE.txt文件；
 *   2.请不要删除和修改 AnYi Admin Vue 源码头部的版权声明；
 *   3.请保留源码和相关描述文件的项目出处，作者声明等；
 *   4.分发源码时候，请注明软件出处 https://github.com/anyilanxin/anyi-cloud-vue；
 *   5.在修改包名，模块名称，项目代码等时，请注明软件出处 https://github.com/anyilanxin/anyi-cloud-vue；
 *   6.本软件不允许在国家法律规定范围外使用，如出现违法行为原作者本人不承担任何法律风险；
 *   7.进行商用时，不得基于AnYi Admin Vue的基础，修改包装而成一个与AnYi Cloud EE、AnYi Zeebe EE、AnYi Standalone EE功能类似的程序，进行销售或发布，参与同类软件产品市场的竞争；
 *   8.本软件使用的第三方依赖皆为开源软件，如需要修改第三方源码请遵循第三方源码附带开源协议；
 *   9.本软件中使用了bpmn js,使用请遵循bpmn.io开源协议：
 *     https://github.com/bpmn-io/bpmn-js/blob/develop/LICENSE
 *   10.若您的项目无法满足以上几点，可申请商业授权。
 -->
<script lang="ts" setup>
import { computed, unref } from 'vue'
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import InputNumberItem from './InputNumberItem.vue'
import { MenuTypeEnum, TriggerEnum, HandlerSettingEnum } from '@anyi/coreconstants'
import { context } from '../../../../bridge'
import {
  mixSidebarTriggerOptions,
  topMenuAlignOptions,
  getMenuTriggerOptions,
  contentModeOptions,
} from '../constant'
import { useI18n } from '@anyi/corelocale'

const { t } = useI18n()

const { useMenuSetting, useHeaderSetting, useRootSetting } = context

const { getContentMode, getLockTime } = useRootSetting()

const {
  getIsHorizontal,
  getShowMenu,
  getMenuType,
  getTrigger,
  getCollapsedShowTitle,
  getMenuFixed,
  getCollapsed,
  getCanDrag,
  getTopMenuAlign,
  getAccordion,
  getMenuWidth,
  getIsTopMenu,
  getSplit,
  getIsMixSidebar,
  getCloseMixSidebarOnChange,
  getMixSideTrigger,
  getMixSideFixed,
} = useMenuSetting()

const { getShowHeader, getFixed: getHeaderFixed, getShowSearch } = useHeaderSetting()

const getShowMenuRef = computed(() => {
  return unref(getShowMenu) && !unref(getIsHorizontal)
})

let triggerDef = getTrigger
const triggerOptions = getMenuTriggerOptions(unref(getSplit))
const some = triggerOptions.some((item) => item.value === unref(triggerDef))
if (!some) {
  triggerDef.value = TriggerEnum.FOOTER
}
</script>
<template>
  <VbenSpace vertical>
    <SwitchItem
      :title="t('layout.setting.splitMenu')"
      :def="getSplit"
      :event="HandlerSettingEnum.MENU_SPLIT"
      :disabled="!getShowMenuRef || getMenuType !== MenuTypeEnum.MIX"
    />
    <SwitchItem
      :title="t('layout.setting.mixSidebarFixed')"
      :def="getMixSideFixed"
      :event="HandlerSettingEnum.MENU_FIXED_MIX_SIDEBAR"
      :disabled="getIsMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.closeMixSidebarOnChange')"
      :def="getCloseMixSidebarOnChange"
      :event="HandlerSettingEnum.MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE"
      :disabled="!getIsMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.menuCollapse')"
      :def="getCollapsed"
      :event="HandlerSettingEnum.MENU_COLLAPSED"
      :disabled="!getShowMenuRef"
    />
    <SwitchItem
      :title="t('layout.setting.menuDrag')"
      :def="getCanDrag"
      :event="HandlerSettingEnum.MENU_HAS_DRAG"
      :disabled="!getShowMenuRef"
    />
    <SwitchItem
      :title="t('layout.setting.menuSearch')"
      :def="getShowSearch"
      :event="HandlerSettingEnum.HEADER_SEARCH"
      :disabled="!getShowHeader"
    />
    <SwitchItem
      :title="t('layout.setting.menuAccordion')"
      :def="getAccordion"
      :event="HandlerSettingEnum.MENU_ACCORDION"
      :disabled="!getShowMenuRef"
    />
    <SwitchItem
      :title="t('layout.setting.collapseMenuDisplayName')"
      :def="getCollapsedShowTitle"
      :event="HandlerSettingEnum.MENU_COLLAPSED_SHOW_TITLE"
      :disabled="!getShowMenuRef || !getCollapsed || getIsMixSidebar"
    />
    <SwitchItem
      :title="t('layout.setting.fixedHeader')"
      :def="getHeaderFixed"
      :event="HandlerSettingEnum.HEADER_FIXED"
      :disabled="!getShowHeader"
    />
    <SwitchItem
      :title="t('layout.setting.fixedSideBar')"
      :def="getMenuFixed"
      :event="HandlerSettingEnum.MENU_FIXED"
      :disabled="!getShowMenuRef || getIsMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.mixSidebarTrigger')"
      :options="mixSidebarTriggerOptions"
      :def="getMixSideTrigger"
      :event="HandlerSettingEnum.MENU_TRIGGER_MIX_SIDEBAR"
      :disabled="!getIsMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.topMenuLayout')"
      :options="topMenuAlignOptions"
      :def="getTopMenuAlign"
      :event="HandlerSettingEnum.MENU_TOP_ALIGN"
      :disabled="!getShowHeader || getSplit || (!getIsTopMenu && !getSplit) || getIsMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.menuCollapseButton')"
      :options="triggerOptions"
      :def="triggerDef"
      :event="HandlerSettingEnum.MENU_TRIGGER"
      :disabled="!getShowMenuRef || getIsMixSidebar"
    />
    <SelectItem
      :title="t('layout.setting.contentMode')"
      :options="contentModeOptions"
      :def="getContentMode"
      :event="HandlerSettingEnum.CONTENT_MODE"
    />
    <InputNumberItem
      :title="t('layout.setting.autoScreenLock')"
      :min="0"
      :def="getLockTime"
      :event="HandlerSettingEnum.LOCK_TIME"
      :suffix="
        getLockTime === 0 ? t('layout.setting.notAutoScreenLock') : t('layout.setting.minute')
      "
    />
    <InputNumberItem
      :title="t('layout.setting.expandedMenuWidth')"
      :min="100"
      :max="600"
      :step="10"
      :def="getMenuWidth"
      suffix="px"
      :event="HandlerSettingEnum.MENU_WIDTH"
      :disabled="getShowMenuRef"
    />
  </VbenSpace>
</template>

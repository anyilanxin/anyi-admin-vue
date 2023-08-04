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
import LayoutBreadcrumb from '../components/breadcrumb/index.vue'
import LayoutTabs from '../components/tabs/index.vue'
import AppSearch from '../components/search/AppSearch.vue'
import AppNotify from '../components/notify/index.vue'
import AppFullScreen from '../components/FullScreen.vue'
import { SettingButton } from '../components/setting'
import LocalePicker from './LocalePicker.vue'
import DarkModeToggleSimple from './DarkModeToggleSimple.vue'
import UserDropdown from '../components/user-dropdown/index.vue'
import { context } from '../../bridge'
import { computed, unref } from 'vue'
import { SettingButtonPositionEnum, ThemeEnum, MenuTypeEnum } from '@anyi/coreconstants'
import { useAppConfig } from '@anyi/hooks'
const { isMixSidebar, isTopMenu, isMix, sidebar, menu, header } = useAppConfig()

const {
  useHeaderSetting,
  useRootSetting,
  useMenuSetting,
  useConfigStore,
  Logo,
  useAppInject,
  useMultipleTabSetting,
} = context
const {
  getShowBread,
  getShowFullScreen,
  getShowLocalePicker,
  getShowSearch,
  getShowHeader,
  getShowNotice,
  getShowFullHeaderRef,
  getShowHeaderLogo,
} = useHeaderSetting()
const { getDarkMode } = useConfigStore()
const { getSettingButtonPosition, getShowSettingButton } = useRootSetting()
const { getMenuType, getMenuWidth, getIsTopMenu } = useMenuSetting()
const { getIsMobile } = useAppInject()
const { getShowMultipleTab } = useMultipleTabSetting()
const isDark = computed(() => getDarkMode == ThemeEnum.DARK)
const getShowSetting = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false
  }
  const settingButtonPosition = unref(getSettingButtonPosition)

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return unref(getShowHeader)
  }
  return settingButtonPosition === SettingButtonPositionEnum.HEADER
})

const getShowHeaderMultipleTab = computed(() => {
  return (
    unref(getShowMultipleTab) && (unref(getMenuType) !== MenuTypeEnum.MIX || unref(getIsMobile))
  )
})

const showHeaderLogo = computed(() => {
  return unref(isTopMenu) || unref(isMix)
})
const showBreadcrumb = computed(() => {
  console.log('----unref(isTopMenu)------', unref(isTopMenu))
  return unref(isTopMenu) || unref(isMix)
})
</script>
<template>
  <div style="width: 100%" class="anyi-layout-header">
    <div
      v-if="getShowFullHeaderRef"
      :class="['h-48px', 'shadow', { 'mb-8px': !getShowHeaderMultipleTab }]"
      :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
      style="justify-content: space-between; display: flex; align-items: center"
    >
      <div>
        <slot name="logo">
          <div style="display: flex; align-items: center">
            <Logo
              v-if="showHeaderLogo"
              :style="{
                width: getMenuWidth + 'px',
                maxWidth: getMenuWidth + 'px',
              }"
            />
            <slot name="breadcrumb">
              <LayoutBreadcrumb v-if="showBreadcrumb" />
            </slot>
          </div>
        </slot>
      </div>
      <div style="align-self: flex-start">
        <slot name="menu"></slot>
      </div>
      <div class="pl-8px pr-8px">
        <slot name="buttons">
          <div class="p-1" style="display: flex; justify-content: space-around">
            <AppSearch v-if="getShowSearch" />
            <AppNotify :is-dark="isDark" v-if="getShowNotice" />
            <AppFullScreen v-if="getShowFullScreen" />
            <LocalePicker v-if="getShowLocalePicker" :reload="true" :showText="false" />
            <DarkModeToggleSimple />
            <UserDropdown />
            <SettingButton v-if="getShowSetting" />
          </div>
        </slot>
      </div>
    </div>
    <template v-if="getShowHeaderMultipleTab">
      <slot name="tabs">
        <LayoutTabs />
      </slot>
    </template>
  </div>
</template>

<style lang="less">
.anyi-layout-header {
  background-color: #fff;
}
</style>

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
import LayoutBreadcrumb from '../components/breadcrumb/index.vue'
import LayoutTabs from '../components/tabs/index.vue'
import AppSearch from '../components/search/AppSearch.vue'
import Logo from './logo/index.vue'
import AppNotify from '../components/notify/index.vue'
import AppFullScreen from '../components/FullScreen.vue'
import { SettingButton } from '../components/setting'
import LocalePicker from './LocalePicker.vue'
import HeaderTrigger from './HeaderTrigger.vue'
import DarkModeToggleSimple from './DarkModeToggleSimple.vue'
import UserDropdown from '../components/user-dropdown/index.vue'
import { computed, unref } from 'vue'
import { SettingButtonPositionEnum, NavBarModeEnum, TriggerEnum } from '@anyi/coreconstants'
import { useAppConfig, useAppTheme } from '@anyi/corehooks'
const { isDark } = useAppTheme()
const {
  navBarMode,
  isTopMenu,
  menu,
  isMix,
  header,
  sidebar,
  tabTar,
  settingButtonPosition,
  content,
  logo,
} = useAppConfig()
const showHeaderLogo = computed(() => {
  return (unref(isTopMenu) || unref(isMix)) && unref(logo).show
})

const getShowFullHeaderRef = computed(() => {
  return !unref(content).fullScreen && unref(header).show
})
const getShowSetting = computed(() => {
  if (!unref(header).showSetting) {
    return false
  }
  const buttonPosition = unref(settingButtonPosition)
  if (buttonPosition === SettingButtonPositionEnum.AUTO) {
    return unref(header).showSetting
  }
  return buttonPosition === SettingButtonPositionEnum.HEADER
})

const getShowHeaderMultipleTab = computed(() => {
  return unref(tabTar).visible && !unref(isMix)
})
const showBreadcrumb = computed(() => {
  return unref(header).showBreadCrumb && unref(navBarMode) === NavBarModeEnum.SIDEBAR
})
const showHeaderTrigger = computed(() => {
  return unref(sidebar).trigger === TriggerEnum.HEADER
})
const getHeaderColor = computed(() => {
  return unref(header).bgColor
})
</script>
<template>
  <div style="width: 100%" :class="!isDark ? 'anyi-layout-header' : 'anyi-layout-header-dark'">
    <div
      v-if="getShowFullHeaderRef"
      :class="['h-48px', 'shadow']"
      :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
      style="justify-content: space-between; display: flex; align-items: center"
    >
      <div>
        <slot name="logo">
          <div style="display: flex; align-items: center">
            <Logo
              v-if="showHeaderLogo"
              :backCg="header.bgColor"
              :style="{
                width: sidebar.width + 'px',
                maxWidth: sidebar.width + 'px',
              }"
            />
            <HeaderTrigger v-if="showHeaderTrigger" />
            <slot name="breadcrumb">
              <LayoutBreadcrumb v-if="showBreadcrumb" />
            </slot>
          </div>
        </slot>
      </div>
      <div
        style="align-self: flex-start; flex: 1; display: flex"
        :style="{
          justifyContent: menu.topMenuAlign,
        }"
      >
        <div>
          <slot name="menu"></slot>
        </div>
      </div>
      <div class="pl-8px pr-8px">
        <slot name="buttons">
          <div class="p-1" style="display: flex; justify-content: space-around">
            <AppSearch v-if="header.showSearch" />
            <AppNotify :is-dark="isDark" v-if="header.showNotice" />
            <AppFullScreen v-if="header.showFullScreen" />
            <LocalePicker v-if="header.showLocalePicker" :reload="false" :showText="false" />
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
  background-color: v-bind(getHeaderColor);
}
.anyi-layout-header-dark {
  background-color: var(--color-menu-dark-bg);
}
</style>

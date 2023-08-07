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
 -->


<script lang="ts" setup>
import { useComosables } from './useComosables'
import { MixSideBarMenu } from './components/menu'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { useAppConfig } from '@anyi/corehooks'
import AnYiPageWrapper from './components/AnYiPageWrapper.vue'
import { computed, unref } from 'vue'
import { HEADER_MARGIN_BUTTOM } from '@anyi/coreconstants'

const { sidebar, menu, footer } = useAppConfig()
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@anyi/coreconstants'
const { headerRef, contentStyle, mainStyle, footerRef } = useComosables()

const getMixSidebarWidth = computed(() => {
  return unref(sidebar).collapsed ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
})
const getContainerStyle = computed(() => {
  return { paddingLeft: (unref(menu).mixSideFixed ? unref(sidebar).width : 0) + 'px' }
})
</script>
<template>
  <a-layout has-sider class="h-full">
    <a-layout-sider
      v-if="sidebar.show"
      bordered
      :collapsed-width="SIDE_BAR_SHOW_TIT_MINI_WIDTH"
      collapse-mode="width"
      :width="SIDE_BAR_MINI_WIDTH"
      :collapsed="sidebar.collapsed"
    >
      <slot name="sider">
        <MixSideBarMenu :mix-sidebar-width="getMixSidebarWidth" />
      </slot>
    </a-layout-sider>
    <a-layout :style="getContainerStyle" class="transition-all">
      <a-layout-header ref="headerRef">
        <slot name="header"><LayoutHeader :style="{ marginBottom: HEADER_MARGIN_BUTTOM }" /></slot>
      </a-layout-header>
      <a-layout :style="contentStyle">
        <a-layout-content :style="mainStyle">
          <LayoutMain>
            <AnYiPageWrapper>
              <slot name="main"></slot>
            </AnYiPageWrapper>
          </LayoutMain>
        </a-layout-content>
        <a-layout-footer v-if="footer.visible" ref="footerRef">
          <slot name="footer">
            <LayoutFooter />
          </slot>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
:deep(.arco-menu-selected-label) {
  bottom: -9px;
}

:deep(.arco-menu-dark .arco-menu-item.arco-menu-selected) {
  color: rgb(var(--primary-6));
}

:deep(.arco-menu-light .arco-menu-item.arco-menu-selected) {
  color: rgb(var(--primary-6));
}

:deep(.arco-menu-selected-label) {
  bottom: -9px;
}
:deep(.arco-menu-horizontal .arco-menu-pop::after) {
  bottom: -9px;
  transition: all 0.3s ease-in-out;
}
:deep(.arco-menu-horizontal .arco-menu-inner) {
  padding: 9px 20px;
}
:deep(.arco-menu-selected-label) {
  transition: all 0.3s ease-in-out;
}
:deep(.arco-menu-collapsed > .arco-menu-inner > .arco-menu-selected::before) {
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  content: '';
  background-color: rgb(var(--primary-6));
}
:deep(.arco-menu-collapsed > .arco-menu-inner > .arco-menu-selected > .arco-menu-icon) {
  color: rgb(var(--primary-6));
}
:deep(.arco-menu-collapsed .arco-menu-inner) {
  padding: 4px 0px !important;
}
</style>

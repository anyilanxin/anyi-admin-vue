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
  return unref(sidebar).collapsed ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH
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
      :collapsed-width="SIDE_BAR_MINI_WIDTH"
      collapse-mode="width"
      :width="SIDE_BAR_SHOW_TIT_MINI_WIDTH"
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

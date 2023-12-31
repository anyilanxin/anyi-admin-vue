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
import { BasicMenu } from './components/menu'
import LayoutHeader from './components/header.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import Logo from './components/logo/index.vue'
import { useAppConfig, useAppTheme } from '@anyi/corehooks'
import HeaderTrigger from './components/HeaderTrigger.vue'
import { useComosables } from './useComosables'
import { getMenus } from '@anyi/router'
import AnYiPageWrapper from './components/AnYiPageWrapper.vue'
import { onMounted, ref, unref, computed } from 'vue'
import { HEADER_MARGIN_BUTTOM } from '@anyi/coreconstants'
import { useElementSize, MaybeComputedElementRef, getTheme } from '@anyi/coreutils'
const { sidebar, footer, isMixSidebar, logo, isSidebar, header } = useAppConfig()
const logoRef = ref()
const { height: lagoHeight } = useElementSize(logoRef as MaybeComputedElementRef)
const { isDark } = useAppTheme()
const height = computed(() => {
  return unref(lagoHeight) + 'px'
})

const menuOptions = ref<any[]>([])
onMounted(async () => {
  const menus = await getMenus()
  menuOptions.value = menus
})

const { headerRef, footerRef, contentStyle, mainStyle } = useComosables()

const active = ref(false)
onMounted(() => {
  active.value = true
})
const activeTrigger = () => {
  active.value = !unref(active)
}
const getFillSvgColor = computed(() => {
  if (getTheme(unref(header).bgColor) == 'light') {
    return 'rgb(78 89 106)'
  }
  return 'rgb(255 254 254 / 70%)'
})

const getHoverColor = computed(() => {
  if (getTheme(unref(header).bgColor) == 'light') {
    return 'rgb(241 241 241)'
  }
  return 'rgb(52 50 50 / 70%)'
})

const showSidebarLogo = computed(() => {
  return (unref(isSidebar) || unref(isMixSidebar)) && unref(logo).show
})
</script>
<template>
  <a-layout class="h-full min-w-375px">
    <a-drawer
      :render-to-body="false"
      v-model:visible="active"
      placement="left"
      :width="sidebar.width"
      :closable="false"
      :header="false"
      :footer="false"
    >
      <div class="anyi-layout-mobile">
        <Logo ref="logoRef" v-if="showSidebarLogo" :showTitle="true" :backCg="sidebar.bgColor" />
        <BasicMenu :menuOptions="menuOptions" :enableCollapsed="false" />
      </div>
    </a-drawer>
    <a-layout-header ref="headerRef">
      <slot name="header">
        <LayoutHeader :style="{ marginBottom: HEADER_MARGIN_BUTTOM }">
          <template #logo>
            <a-space fill align="center" :wrap-item="false">
              <Logo :show-title="false" :backCg="header.bgColor" />
              <AnYiIconify
                @click="activeTrigger"
                :class="isDark ? 'anyi-layout-mobile-dark' : 'anyi-layout-mobile-custom'"
                :icon="active ? 'menu-fold-outlined' : 'ant-design:menu-unfold-outlined'"
                size="24"
                hoverPointer
              />
            </a-space>
          </template>
        </LayoutHeader>
      </slot>
    </a-layout-header>
    <a-layout :style="contentStyle">
      <a-layout-content :style="mainStyle">
        <LayoutMain>
          <AnYiPageWrapper>
            <slot name="main"></slot>
          </AnYiPageWrapper>
        </LayoutMain>
      </a-layout-content>
      <a-layout-footer v-if="footer.show" ref="footerRef">
        <slot name="footer">
          <LayoutFooter />
        </slot>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
.anyi-layout-mobile {
  height: 100%;
  overflow: hidden;
  .arco-menu-vertical {
    height: 100%;
    :deep(.arco-menu-inner) {
      height: calc(100% - v-bind(height)) !important;
    }
  }
}

:deep(.arco-drawer-body) {
  padding: 0px;
}

:deep(.arco-menu-dark .arco-menu-item.arco-menu-selected) {
  color: rgb(var(--primary-6));
}

:deep(.arco-menu-light .arco-menu-item.arco-menu-selected) {
  color: rgb(var(--primary-6));
}
.anyi-layout-mobile-dark {
  color: var(--color-neutral-8) !important;
  &:hover {
    background-color: var(--color-neutral-2);
  }
}
.anyi-layout-mobile-custom {
  color: v-bind(getFillSvgColor) !important;
  &:hover {
    background-color: v-bind(getHoverColor);
  }
}
</style>

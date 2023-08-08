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
import LayoutTabs from './components/tabs/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import BannerNotice from './components/banner-notice'
import SiderCenterDrag from './components/SiderCenterDrag.vue'
import {
  mapTree,
  useElementSize,
  MaybeComputedElementRef,
  cloneDeep,
  getTheme,
} from '@anyi/coreutils'
import { useAppConfig, useSiteGeneral } from '@anyi/corehooks'
import { useGo } from '@anyi/corehooks'
import { useAppTheme } from '@anyi/corehooks'
import { useThrottleFn } from '@anyi/coreutils'
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '@anyi/coreconstants'
import { TriggerEnum, HEADER_MARGIN_BUTTOM } from '@anyi/coreconstants'
import { MixSidebarTriggerEnum } from '@anyi/coreconstants'
import SiderFooterTrigger from './components/SiderFooterTrigger.vue'
import SiderCenterTrigger from './components/SiderCenterTrigger.vue'
import AnYiPageWrapper from './components/AnYiPageWrapper.vue'
import {
  getChildrenMenus,
  getCurrentParentPath,
  getShallowMenus,
  getMenus,
  listenerRouteChange,
  RouteLocationNormalized,
} from '@anyi/router'

import { useComosables } from './useComosables'
import { computed, unref, ref, onMounted, watchEffect, watch } from 'vue'

const {
  toggleCollapse,
  menu,
  header,
  sidebar,
  setAppConfig,
  footer,
  tabTar,
  isMixSidebar,
  isTopMenu,
} = useAppConfig()

const { headerRef, tabRef, footerRef, headerHeight, contentStyle, mainStyle } = useComosables()

const menuHeight = computed(() => `calc(100vh - ${unref(headerHeight)}px)`)

const activeParentPath = ref('')
const parentMenuOptions = ref<any[]>([])
const menuModules = ref<any[]>([])

const activeChildrenKey = ref('')
const childrenMenuOptions = ref<any[]>([])
const logoRef = ref<Element>()
const openMenu = ref(false)
const { height: lagoHeight } = useElementSize(logoRef as MaybeComputedElementRef)

const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)

watchEffect(async () =>
  setAppConfig({
    menu: { subMenuWidth: unref(openMenu) ? unref(sidebar).width : 0 },
  }),
)

onMounted(async () => {
  setMenuInfo()
})

async function setMenuInfo() {
  childrenMenuOptions.value = []
  parentMenuOptions.value = []
  menuModules.value = []
  if (!unref(menu).split) {
    childrenMenuOptions.value = await getMenus()
  } else {
    const menus = await getShallowMenus()
    menuModules.value = cloneDeep(menus)
    parentMenuOptions.value = menus
    const currPath = unref(currentRoute)?.path
    if (currPath) {
      activeChildrenKey.value = currPath
      let parentPath = await getCurrentParentPath(currPath)
      if (parentPath) {
        activeParentPath.value = parentPath
      }
    }
  }
}
const showFooterTrigger = computed(() => {
  if (unref(isMixSidebar)) {
    return true
  }
  return unref(sidebar).trigger === TriggerEnum.FOOTER
})

const showCenterTrigger = computed(() => {
  if (unref(isMixSidebar) || unref(isTopMenu)) {
    return false
  }
  return unref(sidebar).trigger === TriggerEnum.CENTER
})
watch(
  () => unref(menu).split,
  () => {
    setMenuInfo()
    setActive(unref(menu).split)
  },
  {
    immediate: true,
  },
)
listenerRouteChange((route) => {
  currentRoute.value = route
  setActive(unref(menu).split)
})
const getCollapsedWidth = computed(() => {
  return unref(sidebar).collapsed && unref(menu).collapsedShowTitle
    ? SIDE_BAR_SHOW_TIT_MINI_WIDTH
    : unref(sidebar).collapsedWidth
})
async function setActive(setChildren = false) {
  if (!setChildren) {
    return
  }
  const path = currentRoute.value?.path
  if (!path) return
  activeParentPath.value = await getCurrentParentPath(path)
  const activeMenu = unref(menuModules).find((item) => item.path === unref(activeParentPath))
  const p = activeMenu?.path
  if (p) {
    const children = await getChildrenMenus(p)
    if (setChildren) {
      childrenMenuOptions.value = children
    }
    if (children.length === 0) {
      childrenMenuOptions.value = []
      openMenu.value = false
    }
  }
}
function closeMenu() {
  if (unref(menu).mixSideFixed) return
  openMenu.value = false
}
</script>
<template>
  <a-layout class="h-full">
    <a-layout-header ref="headerRef">
      <slot name="header">
        <LayoutHeader>
          <template #menu>
            <BasicMenu
              mode="horizontal"
              :menuOptions="parentMenuOptions"
              style="flex: 1"
              :parent="true"
            />
          </template>
        </LayoutHeader>
      </slot>
    </a-layout-header>
    <a-layout has-sider :style="{ height: menuHeight }">
      <a-layout-sider
        v-if="sidebar.show"
        show-trigger
        bordered
        :collapsed-width="getCollapsedWidth"
        :width="sidebar.width"
        collapse-mode="width"
        :collapsed="sidebar.collapsed"
        @update:collapsed="toggleCollapse"
      >
        <slot name="sider">
          <div
            :class="menu.collapsedShowTitle ? 'anyi-layout-top-mix-menu-show-title' : ''"
            class="anyi-layout-top-menu-mix"
          >
            <BasicMenu :menuOptions="childrenMenuOptions">
              <template v-slot:menucenter>
                <SiderCenterDrag v-if="menu.canDrag" />
              </template>
            </BasicMenu>
            <SiderFooterTrigger ref="garget" v-if="showFooterTrigger" />
            <SiderCenterTrigger ref="garget" v-if="showCenterTrigger" />
          </div>
        </slot>
      </a-layout-sider>

      <a-layout>
        <a-layout-header :style="{ marginBottom: HEADER_MARGIN_BUTTOM }">
          <slot name="tabs"><LayoutTabs ref="tabRef" v-if="tabTar.visible" /></slot>
          <slot name="bannerNotice" v-if="header.showBannerNotice"> <BannerNotice /> </slot>
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
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
:deep(.arco-menu-horizontal .arco-menu-inner) {
  padding: 9px 20px;
}
:deep(.arco-menu-selected-label) {
  bottom: -9px;
}
:deep(.arco-menu-horizontal .arco-menu-pop::after) {
  bottom: -9px;
  transition: all 0.3s ease-in-out;
}

.anyi-layout-top-menu-mix {
  height: 100%;
  overflow: hidden;
  .arco-menu-vertical {
    height: 100%;
    :deep(.arco-menu-inner) {
      height: calc(100% - v-bind(headerHeight) px) !important;
    }
  }
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

:deep(.arco-menu-vertical .arco-menu-pop-header) {
  padding: 0px 5px 0px 0px;
}
:deep(.arco-menu-vertical .arco-menu-item) {
  padding: 0px 5px 0px 0px;
}
:deep(.arco-menu-vertical .arco-menu-inline-header) {
  padding: 0px 5px 0px 0px;
}
</style>

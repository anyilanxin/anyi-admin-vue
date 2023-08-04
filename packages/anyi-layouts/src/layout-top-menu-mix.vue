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
import { BasicMenu } from './components/menu'
import LayoutHeader from './components/header.vue'
import LayoutTabs from './components/tabs/index.vue'
import LayoutMain from './components/main.vue'
import LayoutFooter from './components/footer.vue'
import { context } from '../bridge'
import {
  mapTree,
  useElementSize,
  MaybeComputedElementRef,
  cloneDeep,
  getTheme,
} from '@anyi/coreutils'
import { useAppConfig, useSiteGeneral } from '@anyi/hooks'
import { useGo } from '@anyi/corehooks'
import { useAppTheme } from '@anyi/hooks'
import { useThrottleFn } from '@anyi/coreutils'
import { MixSidebarTriggerEnum } from '@anyi/coreconstants'
import SiderFooterTrigger from './components/SiderFooterTrigger.vue'
import SiderCenterTrigger from './components/SiderCenterTrigger.vue'
import AnYiPageWrapper from './components/AnYiPageWrapper.vue'
import {
  getChildrenMenus,
  getCurrentParentPath,
  getShallowMenus,
  listenerRouteChange,
} from '@anyi/router'
import { useComosables } from './useComosables'
import { computed, unref, ref, onMounted, watchEffect } from 'vue'
const { menu, sidebar, getMenuStyles, closeMixSidebarOnChange, setAppConfig, isMixSidebar } =
  useAppConfig()
const { useMenuSetting, useRootSetting, useMultipleTabSetting } = context
const { toggleCollapsed, getCollapsed, getMenuWidth, getShowSidebar } = useMenuSetting()
const { getShowFooter } = useRootSetting()
const { getShowMultipleTab } = useMultipleTabSetting()

const { headerRef, tabRef, footerRef, headerHeight, contentStyle, mainStyle } = useComosables()

const menuHeight = computed(() => `calc(100vh - ${unref(headerHeight)}px)`)

const openKeys = ref<string[]>([])
const selectedKey = ref<string[]>([])

const openChildKeys = ref<string[]>([])
const selectedChildKey = ref<string[]>([])
const activeParentPath = ref('')
const parentMenuOptions = ref<any[]>([])
const menuModules = ref<any[]>([])

const activeChildrenKey = ref('')
const childrenMenuOptions = ref([])
const childrenMenuRef = ref(null)
const logoRef = ref<Element>(null)
const openMenu = ref(false)
const { height: lagoHeight } = useElementSize(logoRef as MaybeComputedElementRef)

const getMenuCollapsed = computed(() => {
  return unref(sidebar).collapsed
})
const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)
const go = useGo()

watchEffect(async () =>
  setAppConfig({
    menu: { subMenuWidth: unref(openMenu) ? unref(sidebar).width : 0 },
  }),
)

onMounted(async () => {
  const menus = await getShallowMenus()
  menuModules.value = cloneDeep(menus)
  // parentMenuOptions.value = mapTree(menus, {
  //   conversion: (menu) => renderMenuLabel(menu, unref(getItemEvents)),
  // })
  parentMenuOptions.value = menus

  const currPath = unref(currentRoute).path
  if (currPath) {
    activeChildrenKey.value = currPath
    let parentPath = await getCurrentParentPath(currPath)
    if (parentPath) {
      activeParentPath.value = parentPath
    }
    // showOption()
  }
})

// Process module menu click
async function handleModuleClick(path: string, hover = false) {
  console.log('---handleModuleClickhandleModuleClickhandleModuleClick-------')
  openMenu.value = true
  const children = await getChildrenMenus(path)
  if (unref(activeParentPath) === path) {
    if (!hover) {
      if (!unref(openMenu)) {
        openMenu.value = true
      } else {
        closeMenu()
      }
    } else {
      if (!unref(openMenu)) {
        openMenu.value = true
      }
    }
    if (!unref(openMenu)) {
      await setActive()
    }
  } else {
    openMenu.value = true
    activeParentPath.value = path
  }

  if (!children || children.length === 0) {
    if (!hover) go(path)
    childrenMenuOptions.value = []
    openMenu.value = false
    return
  }
  // childrenMenuOptions.value = mapTree(children, {
  //   conversion: (menu) => renderMenuLabelToRouterLink(menu),
  // })
  childrenMenuOptions.value = children
  // showOption()
}

listenerRouteChange((route) => {
  currentRoute.value = route
  setActive(true)
})

async function setActive(setChildren = false) {
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
  // showOption()
}
function closeMenu() {
  if (unref(menu).mixSideFixed) return
  openMenu.value = false
}

const getMenuEvents = computed(() => {
  return !unref(menu).mixSideFixed
    ? {
        onMouseleave: () => {
          setActive(true)
          closeMenu()
        },
      }
    : {}
})
const getMenuItemStyles = computed(() => {
  const styles = { ...getMenuStyles() }
  if (!unref(sidebar).collapsed) {
    styles['--n-item-height'] = `54px`
  }
  return styles
})
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
        v-if="getShowSidebar"
        show-trigger
        bordered
        :collapsed-width="sidebar.collapsedWidth"
        :width="sidebar.width"
        collapse-mode="width"
        :collapsed="sidebar.collapsed"
        @update:collapsed="toggleCollapsed"
      >
        <slot name="sider">
          <BasicMenu class="anyi-layout-top-menu-mix" :menuOptions="childrenMenuOptions" />
          <!-- <SiderFooterTrigger ref="garget" /> -->
          <SiderCenterTrigger ref="garget" />
        </slot>
      </a-layout-sider>

      <a-layout>
        <a-layout-header v-if="getShowMultipleTab">
          <slot name="tabs"><LayoutTabs ref="tabRef" /></slot>
        </a-layout-header>
        <a-layout :style="contentStyle">
          <a-layout-content :style="mainStyle">
            <LayoutMain>
              <AnYiPageWrapper>
                <slot name="main"></slot>
              </AnYiPageWrapper>
            </LayoutMain>
          </a-layout-content>
          <a-layout-footer v-if="getShowFooter" ref="footerRef">
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
</style>

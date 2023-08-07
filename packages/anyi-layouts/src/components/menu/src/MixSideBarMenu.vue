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



<template>
  <div
    :class="bem()"
    v-bind="getMenuEvents"
    style="display: flex; flex-direction: column; height: 100%"
  >
    <logo
      :class="[bem('logo'), 'shadow']"
      :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
      v-if="showHeaderLogo"
      :showTitle="false"
    />
    <div style="flex: 1; overflow: hidden; position: relative">
      <div
        :class="bem('scrollbar')"
        class="mix-side-bar-scrollbar"
        style="position: absolute; top: 0; bottom: 0; left: 0; right: 0; overflow-y: auto"
      >
        <ul :class="bem('module')">
          <li
            :class="[
              bem('module__item'),
              {
                [bem('module__item--active')]: item.path === activePath,
              },
            ]"
            v-bind="getItemEvents(item)"
            v-for="item in menuModules"
            :key="item.path"
          >
            <VbenIconify
              :class="bem('module__icon')"
              :size="!sidebar.collapsed ? 16 : 20"
              :icon="item.icon || (item.meta && item.meta.icon)"
            />
            <p v-show="sidebar.collapsed" :class="bem('module__name')">
              {{ $t(item.title || '') }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <SiderFooterTrigger ref="garget" />
    <div
      :class="['shadow', bem('menu-list')]"
      class="anyi-mix-sidebar-munu"
      :style="getMenuStyle"
      ref="sideRef"
    >
      <div
        v-show="openMenu"
        :class="[
          bem('menu-list__title'),
          'shadow',
          {
            show: openMenu,
          },
        ]"
      >
        <span class="text"> {{ title }}</span>
        <VbenIconify
          :size="16"
          :icon="menu.mixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
          class="pushpin"
          @click.stop="toggleMenuFixed"
          hoverPointer
        />
      </div>
      <div v-if="openMenu" :class="bem('menu-list__children-title')">
        {{ childrenTitle }}
      </div>
      <a-layout-sider
        v-show="openMenu"
        :width="sidebar.width"
        :collapsible="sidebar.collapsed"
        style="width: 100%; height: 100%; overflow: auto"
      >
        <MixMenu
          :menuOptions="childrenMenus"
          :enableCollapsed="false"
          class="anyi-layout-mix-sider-bar-menu"
        />
      </a-layout-sider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, unref, computed, CSSProperties } from 'vue'
import { createNamespace, getGlobalConfig } from '@anyi/coreutils'
import { VbenIconify } from '@anyi/vbencomponents'
import Logo from '../../logo/index.vue'
import SiderFooterTrigger from '../../SiderFooterTrigger.vue'
import { NavBarModeEnum, MixSidebarTriggerEnum } from '@anyi/coreconstants'
import { useI18n } from '@anyi/corelocale'
import MixMenu from './BasicMenu.vue'
import { RouteLocationNormalized } from 'vue-router'
import { useGo } from '@anyi/corehooks'
import {
  listenerRouteChange,
  getCurrentParentPath,
  getChildrenMenus,
  getShallowMenus,
} from '@anyi/router'
import { useAppConfig } from '@anyi/corehooks'
const { navBarMode, menu, sidebar, isMixSidebar, logo, toggleMenuFixed, closeMixSidebarOnChange } =
  useAppConfig()
const { title } = getGlobalConfig(import.meta.env)

const { bem } = createNamespace('layout-mix-menu')
const { t } = useI18n()
const go = useGo()
const currentRoute = ref<Nullable<RouteLocationNormalized>>(null)
const props = defineProps({
  mixSidebarWidth: {
    type: Number,
    default: 50,
  },
})

let menuModules = ref<any[]>([])
const activePath = ref('')
const childrenMenus = ref<any[]>([])
const openMenu = ref(false)
const sideRef = ref<ElRef>(null)
const childrenTitle = ref('')

onMounted(async () => {
  menuModules.value = await getShallowMenus()
  openMenu.value = unref(menu).mixSideFixed
})
const showHeaderLogo = computed(() => {
  return unref(navBarMode) == NavBarModeEnum.MIX_SIDEBAR && logo.show
})
listenerRouteChange((route) => {
  currentRoute.value = route
  setActive(true)
  if (unref(closeMixSidebarOnChange)) {
    closeMenu()
  }
})

const getIsFixed = computed(() => {
  const isFixed = unref(menu).mixSideFixed && unref(childrenMenus).length > 0
  if (isFixed) {
    openMenu.value = true
  }
  return isFixed
})

// Process module menu click
const handleModuleClick = async (path: string, hover = false, title = '') => {
  const children = await getChildrenMenus(path)
  childrenTitle.value = t(title)
  if (unref(activePath) === path) {
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
      setActive()
    }
  } else {
    openMenu.value = true
    activePath.value = path
  }

  if (!children || children.length === 0) {
    if (!hover) go(path)
    childrenMenus.value = []
    closeMenu()
    return
  }
  childrenMenus.value = children
}

const getMenuStyle = computed((): CSSProperties => {
  return {
    width: unref(openMenu) ? `${unref(sidebar).width}px` : 0,
    left: `${props.mixSidebarWidth}px`,
  }
})

const getItemEvents = (item) => {
  if (unref(menu).mixSideTrigger === MixSidebarTriggerEnum.HOVER) {
    return {
      onMouseenter: () => handleModuleClick(item.path, true, item.meta.title),
      onClick: async () => {
        const children = await getChildrenMenus(item.path)
        if (item.path && (!children || children.length === 0)) go(item.path)
      },
    }
  }
  return {
    onClick: () => handleModuleClick(item.path, false, item.meta.title),
  }
}

// Close menu
function closeMenu() {
  if (!unref(getIsFixed)) {
    openMenu.value = false
  }
}
// Set the currently active menu and submenu
async function setActive(setChildren = false) {
  const path = currentRoute.value?.path
  if (!path) return
  activePath.value = await getCurrentParentPath(path)
  if (unref(isMixSidebar)) {
    const activeMenu = unref(menuModules).find((item) => item.path === unref(activePath))
    const p = activeMenu?.path
    if (p) {
      const children = await getChildrenMenus(p)
      if (setChildren) {
        childrenMenus.value = children

        if (unref(menu).mixSideFixed) {
          openMenu.value = children.length > 0
        }
      }
      if (children.length === 0) {
        childrenMenus.value = []
      }
    }
  }
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
</script>

<style lang="less" scoped>
.layout-mix-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__logo {
    flex-shrink: 0;
    justify-content: center;
  }

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
  &__module {
    position: relative;
    padding: 1px 0 40px 0;
    margin: 0;
    &__item {
      position: relative;
      padding: 12px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover,
      &--active {
        font-weight: 700;
        background-color: var(--color-menu-dark-hover);
        color: rgb(var(--primary-6));
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: rgb(var(--primary-6));
          content: '';
        }
      }
    }
    &__icon {
      transition: all 0.3s;
    }

    &__name {
      margin-bottom: 0;
      margin-top: 5px;
      font-size: 12px;
      transition: all 0.3s;
    }
  }
  &__menu-list {
    position: fixed;
    top: 0;
    width: 0px;
    height: calc(100%);
    background-color: var(--color-bg-3);
    transition: all 0.3s;
    &__title {
      display: flex;
      height: 48px;
      font-size: 18px;
      opacity: 0%;
      transition: unset;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding-left: 20px;

      &.show {
        min-width: 130px;
        opacity: 100%;
        transition: all 0.5s ease;
      }
      .pushpin {
        margin-right: 8px;
      }
    }
    &__children-title {
      padding: 6px 20px;
      margin: 0;
    }
  }
}

.anyi-mix-sidebar-munu {
  z-index: 99999;
}

.mix-side-bar-scrollbar {
  height: calc(100% - 40px);
}

.anyi-layout-mix-sider-bar-menu {
  height: 100%;
  overflow: hidden;
  :deep(.arco-menu-inner) {
    height: calc(100% - 60px) !important;
  }
}
</style>

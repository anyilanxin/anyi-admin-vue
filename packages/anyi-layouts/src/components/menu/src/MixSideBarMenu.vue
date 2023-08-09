<template>
  <div
    :class="[bem(), isDark ? 'anyi-mix-sidebar-munu-parent-dark' : 'anyi-mix-sidebar-munu-parent']"
    v-bind="getMenuEvents"
    style="display: flex; flex-direction: column; height: 100%"
    :style="getMenuItemStyles.styles"
  >
    <Logo
      :class="[bem('logo'), 'shadow']"
      ref="logoRef"
      v-if="showHeaderLogo"
      :showTitle="false"
      :backCg="sidebar.bgColor"
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
              !isDark && bem('module__item_custom'),
              {
                [bem('module__item--active')]: item.path === activePath,
              },
            ]"
            v-bind="getItemEvents(item)"
            v-for="item in menuModules"
            :key="item.path"
          >
            <AnYiIconify
              :class="bem('module__icon')"
              :size="sidebar.collapsed ? 16 : 20"
              :icon="item.icon || (item.meta && item.meta.icon)"
            />
            <p v-show="!sidebar.collapsed" :class="bem('module__name')">
              {{ $t(item.title || '') }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <SiderFooterTrigger ref="garget" />
    <div
      :class="[
        'shadow',
        bem('menu-list'),

        isDark ? 'anyi-mix-sidebar-munu-dark' : 'anyi-mix-sidebar-munu',
      ]"
      class="anyi-mix-sidebar-munu-common"
      :style="getMenuStyle"
      ref="sideRef"
    >
      <div
        v-show="openMenu"
        :class="[
          bem('menu-list__title'),
          isDark ? 'anyi-mix-sidebar-munu-title-dark' : 'anyi-mix-sidebar-munu-title',
          !isDark && bem('menu-list__title_custom'),
          'shadow',
          {
            show: openMenu,
          },
        ]"
      >
        <span class="text"> {{ title }}</span>
        <AnYiIconify
          :size="16"
          :icon="menu.mixSideFixed ? 'ri:pushpin-2-fill' : 'ri:pushpin-2-line'"
          class="pushpin"
          @click.stop="toggleMenuFixed"
          hoverPointer
        />
      </div>
      <div
        v-if="openMenu"
        :class="[
          bem('menu-list__children-title'),
          !isDark && bem('menu-list__children-title_custom'),
        ]"
      >
        {{ childrenTitle }}
      </div>
      <a-layout-sider
        v-show="openMenu"
        :width="sidebar.width"
        :collapsible="false"
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
import { createNamespace, getGlobalConfig, getTheme } from '@anyi/coreutils'
import { MenuModeEnum } from '@anyi/coreconstants'
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
import { useAppConfig, useAppTheme } from '@anyi/corehooks'
const { isDark } = useAppTheme()
const {
  navBarMode,
  menu,
  sidebar,
  isMixSidebar,
  getMenuStyles,
  logo,
  toggleMenuFixed,
  closeMixSidebarOnChange,
} = useAppConfig()
const { title } = getGlobalConfig(import.meta.env)

const borderColor = computed(() => {
  if (getTheme(unref(sidebar).bgColor) == 'light') {
    return 'rgb(229,230,235)'
  } else {
    return '#333335'
  }
})
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
const fontColor = computed(() => {
  if (getTheme(unref(sidebar).bgColor) == 'light') {
    return 'rgb(78,89,105)'
  } else {
    return 'rgb(201,205,212)'
  }
})
const getMenuItemStyles = computed(() => {
  const styles = { ...getMenuStyles(MenuModeEnum.VERTICAL) }
  return {
    styles,
  }
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
  return unref(navBarMode) == NavBarModeEnum.MIX_SIDEBAR && unref(logo).show
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
  background-color: var(--color-menu-bg);
  height: 100%;

  .anyi-mix-sidebar-munu-title {
    border-bottom: 1px solid v-bind(borderColor);
  }
  .anyi-mix-sidebar-munu-title-dark {
    border-bottom: 1px solid var(--color-border);
  }
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
    &__item_custom:not(.layout-mix-menu__module__item--active) {
      color: v-bind(fontColor) !important;
    }
    &__item {
      position: relative;
      padding: 12px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      color: var(--color-text-2);
      transition: all 0.3s ease;

      &:hover,
      &--active {
        font-weight: 700;
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
    transition: all 0.3s;
    &__title_custom {
      color: v-bind(fontColor) !important;
    }
    &__title {
      display: flex;
      height: 48px;
      font-size: 18px;
      color: var(--color-text-2);
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
      color: var(--color-text-1);
      margin: 0;
    }
    &__children-title_custom {
      color: v-bind(fontColor) !important;
    }
  }
}

.anyi-mix-sidebar-munu-common {
  z-index: 99999;
}
.anyi-mix-sidebar-munu-dark {
  background-color: var(--color-menu-dark-bg);
}

.anyi-mix-sidebar-munu {
  background-color: var(--color-menu-bg);
}
.mix-side-bar-scrollbar {
  height: calc(100% - 40px);
}

.anyi-mix-sidebar-munu-parent-dark {
  border-right: 1px solid var(--color-border);
}

.anyi-mix-sidebar-munu-parent {
  border-right: 1px solid v-bind(borderColor);
}
.anyi-layout-mix-sider-bar-menu {
  height: 100%;
  overflow: hidden;
  :deep(.arco-menu-inner) {
    height: calc(100% - 60px) !important;
  }
}
</style>

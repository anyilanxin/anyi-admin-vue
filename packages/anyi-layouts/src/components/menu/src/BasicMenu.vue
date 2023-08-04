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
<!--
 * Copyright (c) 2021-present ZHOUXUANHONG(安一老厨)<anyilanxin@aliyun.com>
 *
 * 本软件 AnYi Cloud Vue EE为商业授权软件。未经过商业授权禁止使用，违者必究。
 *
 * AnYi Cloud Vue EE为商业授权软件，您在使用过程中，需要注意以下几点：
 *   1.不允许在国家法律法规规定的范围外使用，如出现违法行为作者本人不承担任何责任；
 *   2.软件使用的第三方依赖皆为开源软件，如需要修改第三方依赖请遵循第三方依赖附带的开源协议，因擅自修改第三方依赖所引起的争议，作者不承担任何责任；
 *   3.不得基于AnYi Cloud EE Vue的基础，修改包装而成一个与AnYi Cloud EE、AnYi Zeebe EE、AnYi Standalone EE功能类似的程序，进行销售或发布，参与同类软件产品市场的竞争；
 *   4.不得将软件源码以任何开源方式公布出去；
 *   5.不得对授权进行出租、出售、抵押或发放子许可证；
 *   6.您可以直接使用在自己的网站或软件产品中，也可以集成到您自己的商业网站或软件产品中进行出租或销售；
 *   7.您可以对上述授权软件进行必要的修改和美化，无需公开修改或美化后的源代码；
 *   8.本软件中使用了bpmn js,使用请遵循bpmn.io开源协议：
 *     https://github.com/bpmn-io/bpmn-js/blob/develop/LICENSE
 *   9.除满足上面条款外，在其他商业领域使用不受影响。同时作者为商业授权使用者在使用过程中出现的纠纷提供协助。
 -->
<template>
  <a-menu
    class="anyi-basic-menu"
    :accordion="menu.accordion"
    :collapsed="getMenuCollapsed && mode != MenuModeEnum.HORIZONTAL && enableCollapsed"
    :collapsed-width="sidebar.collapsedWidth"
    auto-open-selected
    auto-scroll-into-view
    :dropdown-placement="menu.dropdownPlacement"
    :mode="mode"
    v-model:open-keys="openKeys"
    v-model:selected-keys="selectedKey"
    :theme="theme"
    style="height: 100%"
    :level-indent="12"
    :style="getMenuItemStyles.styles"
  >
    <SubMenu
      v-for="subItem in menus"
      :key="subItem.name"
      :mode="mode"
      :enableCollapsed="enableCollapsed"
      :first-menu-item="true"
      :menu-item="subItem"
    />
  </a-menu>
</template>

<script lang="ts" setup>
import SubMenu from './SubMenu.vue'
import { ref, computed, unref, onMounted, watch, toRaw } from 'vue'
import { useAppConfig } from '@anyi/hooks'
import { useAppTheme } from '@anyi/hooks'
import { MenuModeEnum, REDIRECT_NAME } from '@anyi/coreconstants'
import { findMenuOpenKeys, forEach } from '@anyi/coreutils'
import { listenerRouteChange } from '@anyi/router'
import { context } from '../../../../bridge'
import { mapTree, getTheme } from '@anyi/coreutils'
const { menu, sidebar, getMenuStyles, header, isMixSidebar, getCollapsedShowTitle } = useAppConfig()

const { getCurrentParentPath } = context

const { isDark } = useAppTheme()
const props = defineProps({
  mode: {
    type: String,
    default: () => MenuModeEnum.VERTICAL,
  },
  enableCollapsed: {
    type: Boolean,
    default: true,
  },
  parent: {
    type: Boolean,
    default: false,
  },
  menuOptions: {
    type: Array,
    default: () => [] as any[],
  },
})
const menus = ref<any[]>([])
const openKeys = ref<string[]>([])
const selectedKey = ref<string[]>([])
const activeKey = ref(null)
const currentRouter = ref()

watch(
  () => props.menuOptions,
  (newValue, old) => {
    if (newValue != old) {
      menus.value = props.menuOptions
      handleMenuChange()
    }
  },
  {
    immediate: true,
  },
)
const theme = computed(() => {
  if (unref(isDark)) {
    return 'dark'
  }
  let color = unref(sidebar).bgColor
  if (props.mode == MenuModeEnum.HORIZONTAL) {
    color = unref(header).bgColor
  }
  return getTheme(color)
})
listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return
  currentRouter.value = route
  handleMenuChange()
})

async function handleMenuChange() {
  if (!unref(menus) || unref(menus).length <= 0) {
    return
  }
  if (unref(currentRouter)) {
    if (unref(props.parent)) {
      const path = unref(currentRouter).path
      const parthInfo = await getCurrentParentPath(path)
      const parentInfos = unref(menus).find((item) => item.path === parthInfo)
      selectedKey.value = [parentInfos.name]
      openKeys.value = [selectedKey.value]
    } else {
      selectedKey.value = [unref(currentRouter).name]
      const menuOpenKeys = findMenuOpenKeys(menus.value, unref(currentRouter))
      const keySet = new Set([...menuOpenKeys, ...openKeys.value])
      openKeys.value = [...keySet]
    }
  }
}

const getMenuCollapsed = computed(() => {
  if (unref(isMixSidebar)) return true
  return unref(sidebar).collapsed
})

const getMenuItemStyles = computed(() => {
  const styles = { ...getMenuStyles(props.mode as MenuModeEnum) }
  let iconSize = 20
  if (unref(getCollapsedShowTitle)) {
    iconSize = 54
    styles['--n-item-height'] = `${iconSize}px`
  }
  return {
    styles,
    iconSize,
  }
})
</script>

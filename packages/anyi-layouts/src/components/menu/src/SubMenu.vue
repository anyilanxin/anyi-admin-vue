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



<template>
  <template v-if="menuItem?.children && menuItem?.children.length !== 0">
    <a-sub-menu :key="menuItem.name" class="anyi-menu-sub-item">
      <template #icon>
        <div
          class="anyi-menu-sub-item"
          v-if="
            sidebar.collapsed &&
            menu.collapsedShowTitle &&
            firstMenuItem &&
            mode == MenuModeEnum.VERTICAL &&
            navBarMode != NavBarModeEnum.MIX_SIDEBAR
          "
          style="
            display: inline-flex;
            text-align: center;
            flex-direction: column;
            align-items: center;
            padding: 12px 0;
            width: 100%;
          "
        >
          <img class="arco-icon" :src="menuItem?.meta?.icon" />
          <span style="margin-top: 5px; width: 100%; text-align: center" class="collapse-title">
            {{ $t(menuItem?.title || '') }}
          </span>
        </div>
        <div v-else class="collapse-title anyi-menu-sub-item" style="text-align: center">
          <span v-if="getMenuCollapsed && enableCollapsed && firstMenuItem">
            {{ $t(menuItem?.title || '') }}
          </span>
          <!-- <img class="arco-icon" :src="menuItem?.meta?.icon" /> -->
          <!-- <component :is="com(menuItem?.meta?.icon)" v-else-if="menuItem?.meta?.icon" /> -->
        </div>
      </template>
      <template #title>
        <span>{{ $t(menuItem?.title || '') }}</span>
      </template>
      <SubMenu
        v-for="child in menuItem?.children"
        :key="child.path"
        :menu-item="child"
        :mode="mode"
      />
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="menuItem.name" @click="() => goto(menuItem)" class="anyi-menu-sub-item">
      <template #icon>
        <div
          class="anyi-menu-sub-item"
          v-if="
            sidebar.collapsed &&
            menu.collapsedShowTitle &&
            firstMenuItem &&
            mode == MenuModeEnum.VERTICAL &&
            navBarMode != NavBarModeEnum.MIX_SIDEBAR
          "
          style="
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 12px 0;
            width: 100%;
          "
        >
          <img class="arco-icon" :src="menuItem?.meta?.icon" />
          <span style="margin-top: 5px; width: 100%; text-align: center" class="collapse-title">
            {{ $t(menuItem?.title || '') }}
          </span>
        </div>
        <div v-else class="collapse-title anyi-menu-sub-item">
          <span
            v-if="
              getMenuCollapsed && firstMenuItem && enableCollapsed && mode == MenuModeEnum.VERTICAL
            "
          >
            {{ $t(menuItem?.title || '') }}
          </span>
          <!-- <img class="arco-icon" :src="menuItem?.meta?.icon" /> -->
          <!-- <component :is="com(menuItem?.meta?.icon)" v-else-if="menuItem?.meta?.icon" /> -->
        </div>
      </template>
      <span class="anyi-menu-sub-item"> {{ $t(menuItem?.title || '') }}{{ menuItem.name }}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts" setup name="SubMenu">
import { useAppConfig } from '@anyi/corehooks'
import { useRoute, useRouter } from '@anyi/router'
import { regexUrl, openWindow } from '@anyi/coreutils'
import { ref } from 'vue'
import { NavBarModeEnum } from '@anyi/coreconstants'

import { computed, unref } from 'vue'
import { MenuModeEnum } from '@anyi/coreconstants'
import { h, compile } from 'vue'

const { sidebar, isMixSidebar, menu, navBarMode } = useAppConfig()
const selectedKey = ref<string[]>([])
const router = useRouter()
const route = useRoute()
const getMenuCollapsed = computed(() => {
  if (unref(isMixSidebar)) {
    return true
  }
  return unref(sidebar).collapsed
})

defineProps({
  menuItem: {
    type: Object,
    default: {},
  },
  mode: {
    type: String,
    default: () => MenuModeEnum.VERTICAL,
  },
  selectedKey: {
    type: Array,
    default: () => [],
  },
  firstMenuItem: {
    type: Boolean,
    default: false,
  },
  enableCollapsed: {
    type: Boolean,
    default: true,
  },
})

const com = (icon?: string) => {
  return icon ? h(compile(`<${icon}/>`)) : null
}

const goto = (item: any) => {
  // Open external link
  if (regexUrl.test(item.path)) {
    openWindow(item.path)
    selectedKey.value = [item.name as string]
    return
  }
  // Eliminate external link side effects
  const { hideInMenu, activeMenu } = item.meta as any
  if (route.name === item.name && !hideInMenu && !activeMenu) {
    selectedKey.value = [item.name as string]
    return
  }
  // Trigger router change
  router.push({
    name: item.name,
  })
}
</script>

<style lang="less">
:deep(.arco-menu-icon) {
  width: 100%;
}
.collapse-title {
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 8px;
  padding-right: 8px;
  text-align: center;
  font-size: 12px;
  text-overflow: clip;
  white-space: nowrap;
}
</style>

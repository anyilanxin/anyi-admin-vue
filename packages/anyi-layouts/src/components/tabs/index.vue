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
 * ------------------------------------------------------------------------
 * 安一兰心(AN YI LAN XIN)。安一出品，必出精品。
 *
 *   Official  Website ::  https://anyilanxin.com
 * ------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------
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
 * ------------------------------------------------------------------------
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
  <div :class="'anyi-tab-bar-container-' + tabType">
    <a-tabs
      :active-key="activeTabName"
      :type="tabType"
      :size="tabType == 'rounded' ? 'mini' : 'medium'"
      id="drag"
      :tabs-padding="8"
      :editable="true"
      auto-switch
      animation
      @tab-click="handleChange"
      @delete="handleClose"
    >
      <template #extra>
        <div class="anyi-tabs-extra">
          <TabRedo v-if="getShowRedo" />
          <TabQuick :tabItem="$route" v-if="getShowQuick" />
          <FoldButton v-if="getShowFold" />
        </div>
      </template>
      <a-tab-pane
        v-for="(item, index) in tabList"
        :key="item.query ? item.fullPath : item.path"
        :name="item.fullPath"
        :closable="false"
        style="--n-tab-padding: 0"
      >
        <template #title>
          <div
            class="group pl-12px hover:text-[var(--n-tab-text-color-active)]"
            :class="[tabList.length == 1 ? 'pr-12px' : 'pr-26px']"
            @contextmenu="handleContextMenu($event, item)"
          >
            <span>{{ $t(item.meta.title) }}</span>
            <svg
              viewBox="0 0 48 48"
              v-show="tabList.length > 1"
              fill="none"
              class="absolute !transition-all top-1/2 ml-9px mt--10px anyi-tabs-close arco-icon arco-icon-close"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              @click="handleClose($event, item)"
              stroke-width="4"
              stroke-linecap="butt"
              stroke-linejoin="miter"
            >
              <path
                d="M9.857 9.858 24 24m0 0 14.142 14.142M24 24 38.142 9.858M24 24 9.857 38.142"
              ></path>
            </svg>
          </div>
        </template>
      </a-tab-pane>
    </a-tabs>
    <TabDropdown ref="tabDropdownRef" />
  </div>
</template>

<script lang="ts" setup>
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import { Sortable } from '@anyi/coreutils'
import { useRouter } from 'vue-router'
import { computed, nextTick, ref, unref } from 'vue'
import { REDIRECT_NAME } from '@anyi/coreconstants'
import { useTabs } from '@anyi/corehooks'
import { useGo } from '@anyi/corehooks'
import TabRedo from './components/TabRedo.vue'
import TabDropdown from './components/TabDropdown.vue'
import { context } from '../../../bridge'
import TabQuick from './components/TabQuick.vue'
import FoldButton from './components/FoldButton.vue'
import { useMultipleTab, storeToRefs } from '@anyi/corestores'
import { listenerRouteChange } from '@anyi/router'
const { useUserStore, useMultipleTabSetting } = context
const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting() as any
const { close } = useTabs()
const multipleTabStore = useMultipleTab()
const { getTabList } = storeToRefs(multipleTabStore)
const router = useRouter()
const userStore = useUserStore() as any
const go = useGo()
const tabDropdownRef = ref<HTMLElement | null>(null)
const tabType = ref('rounded')
const activeTabName = ref<string>('')

const tabList = computed(() => {
  return unref(getTabList).filter((item: any) => !item.meta?.hideTab && router.hasRoute(item.name))
})

listenerRouteChange((route) => {
  const { name } = route
  if (name === REDIRECT_NAME || !route || !userStore.getAccessToken) {
    return
  }

  const { path, fullPath, meta = {} } = route
  const { currentActiveMenu, hideTab } = meta as RouteMeta
  const isHide = !hideTab ? null : currentActiveMenu
  const p = isHide || fullPath || path
  if (activeTabName.value !== p) {
    activeTabName.value = p as string
  }

  if (isHide) {
    const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu)

    findParentRoute &&
      multipleTabStore.checkTab(findParentRoute as unknown as RouteLocationNormalized)
  } else {
    multipleTabStore.checkTab(unref(route))
  }
})
const handleChange = (key: string | number) => {
  go(key + '', false)
}

// 获取tabs内dom 设置拖拽
nextTick(() => {
  const selection = document.querySelector('#drag > div > div > div > div > div.n-tabs-wrapper')
  Sortable.create(selection)
})

const handleContextMenu = (e: PointerEvent, tabItem: RouteLocationNormalized) => {
  e.preventDefault()
  if (!tabItem) return
  // @ts-ignore
  unref(tabDropdownRef)?.openDropdown(e, tabItem)
}
const handleClose = (key: string | number) => {
  const index = tabList.value.findIndex((item) =>
    item.query ? item.fullPath == key : item.path == key,
  )
  const tag = tabList.value[index]
  close(tag)
}
</script>

<style lang="less" scoped>
@prefix-cls: ~'anyi-tab-bar-container';

.anyi-tabs-close {
  font-size: 19px;
  padding: 2px;
  color: inherit;
  font-style: normal;
  vertical-align: -2px;
  outline: none;
  stroke: currentColor;
}

.anyi-tabs-close:hover {
  background-color: var(--color-fill-4);
  border-radius: var(--border-radius-circle);
  transition: background-color 0.1s cubic-bezier(0, 0, 1, 1);
}
// rounded start
.@{prefix-cls}-rounded {
  padding: 4px 3px 2px 3px;
  background-color: var(--color-fill-3);

  :deep(.arco-tabs-nav-type-rounded .arco-tabs-tab) {
    border-radius: 2px !important;
    padding: 4px 6px;
    font-size: 13px;
    background-color: var(--color-bg-2);
  }
  :deep(.arco-tabs-nav-type-rounded .arco-tabs-tab:hover) {
    color: rgb(var(--primary-6)) !important;
  }
  :deep(.arco-tabs-nav-type-rounded .arco-tabs-tab-active:hover) {
    color: rgb(var(--primary-6)) !important;
  }
  :deep(.arco-tabs-content) {
    padding-top: 0px !important;
  }
}
// rounded end

// card start
.@{prefix-cls}-card {
  padding: 4px 3px 2px 3px;
  :deep(.arco-tabs-type-card > .arco-tabs-content) {
    border: none !important;
  }
  :deep(.arco-tabs-nav-type-card .arco-tabs-tab) {
    padding: 4px 6px;
    font-size: 14px;
  }
  :deep(.arco-tabs-content) {
    padding-top: 0px !important;
  }
}
// card end

// card-gutter start
.@{prefix-cls}-card-gutter {
  padding: 4px 3px 2px 3px;
  :deep(.arco-tabs-type-card-gutter > .arco-tabs-content) {
    border: none !important;
  }
  :deep(.arco-tabs-nav-type-gutter .arco-tabs-tab) {
    padding: 4px 8px;
    font-size: 14px;
  }
  :deep(.arco-tabs-content) {
    padding-top: 0px !important;
  }
}
// card-gutter end

// text start
.@{prefix-cls}-text {
  padding: 4px 3px 2px 3px;
  :deep(.arco-tabs-type-text > .arco-tabs-content) {
    border: none !important;
  }
  :deep(.arco-tabs-nav-type-text .arco-tabs-tab) {
    padding: 4px 6px;
    font-size: 14px;
  }
  :deep(.arco-tabs-content) {
    padding-top: 0px !important;
  }
}
// text end

// capsule start
.@{prefix-cls}-capsule {
  padding: 4px 3px 2px 3px;
  :deep(.arco-tabs-type-capsule > .arco-tabs-content) {
    border: none !important;
  }
  :deep(.arco-tabs-nav-type-capsule .arco-tabs-tab) {
    padding: 4px 6px;
    font-size: 14px;
    line-height: 18px;
  }
  :deep(.arco-tabs-content) {
    padding-top: 0px !important;
  }
}
// capsule end

// line start
.@{prefix-cls}-line {
  padding: 4px 3px 2px 3px;
  :deep(.arco-tabs-type-line > .arco-tabs-content) {
    border: none !important;
  }
  :deep(.arco-tabs-nav-type-line .arco-tabs-tab) {
    padding: 4px 6px;
    font-size: 14px;
  }
  :deep(.arco-tabs-content) {
    padding-top: 0px !important;
  }
}
// line end

.anyi-tabs-extra {
  background: var(--color-bg-2);
  display: flex;
  margin-right: 5px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  color: var(--color-neutral-10);
}
.arco-dropdown-open .arco-icon-down {
  transform: rotate(180deg);
}
</style>

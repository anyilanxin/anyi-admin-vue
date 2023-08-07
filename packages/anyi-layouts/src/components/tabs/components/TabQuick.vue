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
import { computed, unref } from 'vue'
import { context } from '../../../../bridge'
import { useI18n } from '@anyi/corelocale'
import { VbenIconify } from '@anyi/vbencomponents'
import { TabActionEnum } from '@anyi/coreconstants'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { renderIcon } from '../../index'

const { useTabs, useMultipleTabStore } = context
const { refreshPage, close, closeAll, closeLeft, closeRight, closeOther } = useTabs()
const { t } = useI18n()

const tabStore = useMultipleTabStore()
const { currentRoute } = useRouter()

const props = defineProps({
  tabItem: {
    type: Object as PropType<RouteLocationNormalized>,
    default: null,
  },
})

const options = computed(() => {
  if (!props.tabItem) {
    return
  }
  const { meta } = props.tabItem
  const { path } = unref(currentRoute)

  const isCurItem = props.tabItem ? props.tabItem.path === path : false

  // Refresh button
  const index = tabStore.getTabList.findIndex((tab) => tab.path === props.tabItem.path)
  const refreshDisabled = !isCurItem
  // Close left
  const closeLeftDisabled = index === 0 || !isCurItem

  const disabled = tabStore.getTabList.length === 1

  // Close right
  const closeRightDisabled =
    !isCurItem || (index === tabStore.getTabList.length - 1 && tabStore.getLastDragEndIndex >= 0)
  return [
    {
      label: t('layout.multipleTab.reload'),
      key: TabActionEnum.REFRESH_PAGE,
      icon: renderIcon('ion:reload-sharp'),
      disabled: refreshDisabled,
    },
    {
      label: t('layout.multipleTab.close'),
      key: TabActionEnum.CLOSE_CURRENT,
      icon: renderIcon('clarity:close-line'),
      disabled: !!meta?.affix || disabled,
    },
    {
      type: 'divider',
      key: 'divider1',
    },
    {
      icon: renderIcon('line-md:arrow-close-left'),
      key: TabActionEnum.CLOSE_LEFT,
      label: t('layout.multipleTab.closeLeft'),
      disabled: closeLeftDisabled,
    },
    {
      icon: renderIcon('line-md:arrow-close-right'),
      key: TabActionEnum.CLOSE_RIGHT,
      label: t('layout.multipleTab.closeRight'),
      disabled: closeRightDisabled,
    },
    {
      type: 'divider',
      key: 'divider2',
    },
    {
      icon: renderIcon('dashicons:align-center'),
      key: TabActionEnum.CLOSE_OTHER,
      label: t('layout.multipleTab.closeOther'),
      disabled: disabled || !isCurItem,
    },
    {
      label: t('layout.multipleTab.closeAll'),
      key: TabActionEnum.CLOSE_ALL,
      icon: renderIcon('clarity:minus-line'),
      disabled: disabled,
    },
  ]
})
const handleSelect = async (key) => {
  switch (key) {
    case TabActionEnum.REFRESH_PAGE:
      await refreshPage()
      break
    case TabActionEnum.CLOSE_CURRENT:
      await close(props.tabItem)
      break
    case TabActionEnum.CLOSE_ALL:
      await closeAll()
      break
    case TabActionEnum.CLOSE_LEFT:
      await closeLeft()
      break
    case TabActionEnum.CLOSE_RIGHT:
      await closeRight()
      break
    case TabActionEnum.CLOSE_OTHER:
      await closeOther()
      break
  }
}
</script>
<template>
  <VbenDropdown
    placement="bottom-start"
    trigger="click"
    :options="options"
    :show-arrow="true"
    @select="handleSelect"
  >
    <div class="h-full w-32px border-l flex-center border-[var(--n-border-color)] cursor-pointer">
      <VbenIconify icon="material-symbols:double-arrow-rounded" class="rotate-90" rotate="90deg" />
    </div>
  </VbenDropdown>
</template>

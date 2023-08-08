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
<script lang="ts" setup name="LocalPicker">
import TopButtonWrapper from './TopButtonWrapper.vue'
import { ref, unref, computed } from 'vue'
import { useLocale, localeList } from '@anyi/corelocale'
import { LocaleType } from '@anyi/coretypes'
import { useAppInject } from '@anyi/corehooks'

const props = defineProps({
  /**
   * Whether to display text
   */
  showText: { type: Boolean, default: true },
  /**
   * Whether to refresh the interface when changing
   */
  reload: { type: Boolean, default: true },
})

const { changeLocale, getLocale } = useLocale()

const { isMobile } = useAppInject()
const selectedKey = ref<string>(unref(getLocale))

const getLocaleText = computed(() => {
  const key = selectedKey.value
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text || ''
})
async function toggleLocale(lang: LocaleType) {
  await changeLocale(lang)
  props.reload && location.reload()
}

function handleMenuEvent(menu: LocaleType) {
  console.log('menu', menu)
  selectedKey.value = menu
  if (unref(getLocale) === menu) {
    return
  }
  toggleLocale(menu)
}
</script>
<template>
  <a-dropdown
    trigger="click"
    show-arrow
    :options="localeList"
    key-field="event"
    label-field="text"
    @select="handleMenuEvent"
  >
    <TopButtonWrapper :content="'切换语言'">
      <div class="flex items-center">
        <icon-language />
      </div>
    </TopButtonWrapper>
    <template #content>
      <a-doption
        v-for="item in localeList"
        :key="item.key"
        :value="item.event"
        :class="selectedKey == item.event ? 'anyi-lang-selected' : ''"
        >{{ item.text }}</a-doption
      >
    </template>
  </a-dropdown>
</template>

<style lang="less">
.anyi-lang-selected {
  color: var(--color-text-1);
  background-color: var(--color-fill-2);
  transition: all 0.1s cubic-bezier(0, 0, 1, 1);
}
</style>

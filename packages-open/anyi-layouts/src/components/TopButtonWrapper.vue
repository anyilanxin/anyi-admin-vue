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
  <a-tooltip v-bind="$attrs" mini>
    <a-button
      class="nav-btn anyi-top-button-wrapper-common"
      :class="isDark ? 'anyi-top-button-wrapper-dark' : 'anyi-top-button-wrapper'"
      type="outline"
      :shape="'circle'"
    >
      <template #icon>
        <slot></slot>
      </template>
    </a-button>
  </a-tooltip>
</template>
<script lang="ts" setup>
import { useAppConfig, useAppTheme } from '@anyi/corehooks'
import { getTheme } from '@anyi/coreutils'
import { unref, computed } from 'vue'
const { isDark } = useAppTheme()
const { header } = useAppConfig()

const getFillSvgColor = computed(() => {
  if (getTheme(unref(header).bgColor) == 'light') {
    return 'rgb(78 89 106)'
  }
  return 'rgb(255 254 254 / 70%)'
})

const getFillSvgColorBorder = computed(() => {
  if (getTheme(unref(header).bgColor) == 'light') {
    return 'rgb(180 181 182)'
  }
  return 'rgb(192 185 185 / 70%)'
})
</script>

<style lang="less">
.anyi-top-button-wrapper-common {
  margin-left: 4px;
  margin-right: 4px;
}
.anyi-top-button-wrapper {
  border-color: v-bind(getFillSvgColorBorder) !important;
  color: v-bind(getFillSvgColor) !important;
  & > svg {
    color: v-bind(getFillSvgColor) !important;
  }
  & > .arco-btn-icon {
    color: v-bind(getFillSvgColor) !important;
  }
}
.anyi-top-button-wrapper-dark {
  border-color: var(--color-neutral-6) !important;
  color: var(--color-neutral-8) !important;
  & > svg {
    color: var(--color-neutral-8) !important;
  }
  & > .arco-btn-icon {
    color: var(--color-neutral-8) !important;
  }
}

.anyi-tooltip {
  background-color: var(--color-bg-popup);
  box-shadow: 0 4px 10px #0000001a;
  color: var(--color-text-2);
  transform-origin: 50% 100%;
  border: 1px solid var(--color-neutral-3);
}
</style>

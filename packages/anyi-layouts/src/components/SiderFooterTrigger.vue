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
import { useAppConfig } from '@anyi/corehooks'
import { darken } from '@anyi/coreutils'
import { computed, unref, ref } from 'vue'
import { useAppTheme } from '@anyi/corehooks'
import { getTheme } from '@anyi/coreutils'
const { isDark } = useAppTheme()

const { sidebar, toggleCollapse, themeColor } = useAppConfig()
const borderColor = computed(() => {
  if (getTheme(unref(sidebar).bgColor) == 'light') {
    return 'rgb(229,230,235)'
  } else {
    return '#333335'
  }
})

const hoverColor = computed(() => {
  const currentColor = unref(themeColor)
  return darken(currentColor, 20)
})
</script>
<template>
  <div
    class="h-36px w-full absolute bottom-0 cursor-pointer grid-center anyi-sider-footer-common"
    :class="isDark ? 'anyi-sider-footer-trigger-dark' : 'anyi-sider-footer-trigger-trigger'"
    @click.stop="toggleCollapse"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      :class="[sidebar.collapsed ? '-rotate-180' : 'rotate-0']"
      class="anyi-sider-footer-trigger-svg"
      role="img"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2">
        <path stroke-dasharray="10" stroke-dashoffset="10" d="M7 9L4 12L7 15">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="10;0"
          ></animate>
        </path>
        <path stroke-dasharray="16" stroke-dashoffset="16" d="M19 5H5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
        <path stroke-dasharray="12" stroke-dashoffset="12" d="M19 12H10">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.2s"
            values="12;0"
          ></animate>
        </path>
        <path stroke-dasharray="16" stroke-dashoffset="16" d="M19 19H5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
      </g>
    </svg>
  </div>
</template>

<style lang="less">
.anyi-sider-footer-common {
  display: inline-flex;
  justify-content: space-between;
  background-color: var(--trigger-background-color);
  align-items: center;
  padding: 0px 12px;
  .anyi-sider-footer-trigger-svg {
    font-size: 18px;
    color: rgb(var(--primary-6));
    cursor: pointer;
    align-self: center !important;
  }
}

.anyi-sider-footer-trigger-dark {
  border-top: 1px solid var(--color-border);
  .anyi-sider-footer-trigger-svg {
    &:hover {
      color: rgb(var(--arcoblue-5));
    }
  }
}

.anyi-sider-footer-trigger-trigger {
  border-top: 1px solid v-bind(borderColor);
  .anyi-sider-footer-trigger-svg {
    &:hover {
      color: v-bind(hoverColor);
    }
  }
}
</style>

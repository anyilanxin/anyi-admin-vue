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
  <div class="app-logo" :class="classInfo" @click="goHome">
    <img :src="logoUrl" alt="logo" />
    <div class="ml-2 truncate md:opacity-100" :class="bem('title')" v-show="showTitle">
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { BASIC_HOME_PATH } from '@anyi/coreconstants'
import { createNamespace } from '@anyi/coreutils'
import { useSiteGeneral } from '@anyi/corehooks'
import { watch, ref, unref, computed } from 'vue'
import { useAppTheme, useAppConfig, useAppInject } from '@anyi/corehooks'
import { NavBarModeEnum } from '@anyi/coreconstants'
import { getTheme } from '@anyi/coreutils'
const { isDark } = useAppTheme()
const { navBarMode } = useAppConfig()
const { title, logo: logoUrl } = useSiteGeneral()
const { isMobile } = useAppInject()
const { bem } = createNamespace('app-logo')
const color = ref('#fff')
const borderColor = ref('rgb(229,230,235)')

const props = defineProps({
  /**
   * Whether to show title
   */
  showTitle: { type: Boolean, default: true },

  /**
   * Click to jump to which path
   */
  homePath: { type: String, default: BASIC_HOME_PATH },
  backCg: { type: String, default: '#fff' },
})
const classInfo = computed(() => {
  let classIn = ''
  const showBorder =
    unref(navBarMode) == NavBarModeEnum.SIDEBAR || unref(navBarMode) == NavBarModeEnum.MIX_SIDEBAR
  if (unref(isDark)) {
    classIn += 'anyi-layout-logo-dark '
    if (showBorder) {
      classIn += 'anyi-layout-logo-dark-border '
    }
  } else if (!unref(isMobile) || (unref(isMobile) && props.showTitle)) {
    classIn += 'anyi-layout-logo '
    if (showBorder) {
      classIn += 'anyi-layout-logo-border '
    }
  }
  if (!props.showTitle) {
    classIn += 'anyi-layout-logo-center '
  }
  return classIn
})
watch(
  () => props.backCg,
  () => {
    if (props.backCg) {
      if (getTheme(props.backCg) == 'light') {
        color.value = '#000'
        borderColor.value = 'rgb(229,230,235)'
      } else {
        color.value = '#fff'
        borderColor.value = '#333335'
      }
    }
  },
  {
    immediate: true,
  },
)

const { push } = useRouter()

const getShowHeaderBorder = computed(() => {
  return (
    unref(navBarMode) == NavBarModeEnum.SIDEBAR || unref(navBarMode) == NavBarModeEnum.MIX_SIDEBAR
  )
})

function goHome() {
  push(props.homePath)
}
</script>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 48px;
  background: transparent;
  box-sizing: border-box;

  &__title {
    font-size: 16px;
    font-weight: 500;
    transition: all 0.5s;
    line-height: normal;
  }

  img {
    width: 32px;
  }
}
.anyi-layout-logo {
  background-color: v-bind(backCg);
  color: v-bind(color);
}
.anyi-layout-logo-dark {
  color: var(--color-neutral-10);
}

.anyi-layout-logo-border {
  border-bottom: 1px solid v-bind(borderColor);
}
.anyi-layout-logo-dark-border {
  border-bottom: 1px solid var(--color-border);
}

.anyi-layout-logo-center {
  justify-content: center;
  padding-left: 0px;
}
</style>

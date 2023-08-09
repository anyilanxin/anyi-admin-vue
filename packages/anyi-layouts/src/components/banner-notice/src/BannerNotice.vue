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
  <div
    :class="navBarMode != NavBarModeEnum.TOP_MENU && 'anyi-banner-notice-parent'"
    v-if="bannerNoticeList && bannerNoticeList.length > 0"
    style="margin-top: 2px"
  >
    <div class="anyi-banner-notice">
      <a-alert banner closable @close="handleClose">
        <template #title>
          <div
            ref="contentParentDomRef"
            class="content-banner-notice-parent"
            @mouseenter="handleAnimate(0)"
            @mouseleave="handleAnimate(1)"
          >
            <div ref="contentDomRef" class="content-banner-notice">
              {{ noticeInfo }}
            </div>
          </div>
        </template>
      </a-alert>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useAppInject, useAppConfig } from '@anyi/corehooks'
import { NavBarModeEnum } from '@anyi/coreconstants'
const { navBarMode } = useAppConfig()
const contentParentDomRef = ref()
const contentDomRef = ref()
const noticeInfo = ref('')
const animate = ref()
const isAnimating = ref(false)
const bannerNoticeList = ref<string[]>([])

// function handleSubscribe() {
//   // subscribe(loginFirstSubscribe, handleBannerNotice);
// }

async function startAnimate() {
  while (bannerNoticeList.value && bannerNoticeList.value.length > 0) {
    noticeInfo.value = bannerNoticeList.value[0] as string
    const ballEl = contentParentDomRef.value
    if (ballEl) {
      const { offsetWidth } = ballEl
      animate.value = contentDomRef.value.animate(
        {
          transform: [`translateX(${offsetWidth}px)`, `translateX(0px)`],
        },
        {
          duration: 3000,
          fill: 'forwards',
          easing: 'ease-out',
        },
      )
      // eslint-disable-next-line no-await-in-loop
      await animate.value.finished
      // 暂停部分
      const contentEl = contentDomRef.value
      const itemWidth = contentEl.getBoundingClientRect().width
      const gapWidth = Math.max(0, itemWidth - offsetWidth + 50)
      const duration = Math.max(0, Math.floor(gapWidth / 200) * 1000)
      animate.value = contentEl.animate(
        {
          transform: [`translateX(0px)`, `translateX(-${gapWidth}px)`],
        },
        {
          duration,
          delay: 3000,
          fill: 'forwards',
          easing: 'linear',
        },
      )
      // eslint-disable-next-line no-await-in-loop
      await animate.value.finished
      // 滑出部分
      animate.value = contentEl.animate(
        {
          transform: [`translateX(-${gapWidth}px)`, `translateX(-${itemWidth}px)`],
        },
        {
          duration: 1000,
          fill: 'forwards',
          easing: 'ease-in',
        },
      )
      // eslint-disable-next-line no-await-in-loop
      await animate.value.finished
    }
    bannerNoticeList.value.splice(0, 1)
  }
  isAnimating.value = false
}

function handleBannerNotice(data: any) {
  const message = JSON.parse(data.body)

  if (message && message.length > 0) {
    bannerNoticeList.value.push(...message)
    if (!isAnimating.value) {
      isAnimating.value = true
      setTimeout(startAnimate, 2000)
    }
  }
}

function handleAnimate(type: number) {
  if (animate.value?.playState !== 'finished') {
    if (type === 0) {
      animate.value?.pause()
    } else {
      animate.value?.play()
    }
  }
}
function handleClose() {
  bannerNoticeList.value = []
}

onMounted(() => {
  nextTick(() => {
    const data = {
      body: '["sdfsdf","sdfsdf","sdfsdfsdfsdfsdf"]',
    }
    handleBannerNotice(data)
  })
})
</script>

<style lang="less" scoped>
.anyi-banner-notice-parent {
  margin-left: 9px;
  margin-right: 9px;
}
.anyi-banner-notice-rounded {
  // padding-left: 12px;
  // padding-right: 12px;
  background-color: var(--color-fill-3);
  padding-top: 5px;
}
.anyi-banner-notice {
  .arco-alert-with-title {
    padding: 0px 5px !important;
    align-items: center !important;
  }

  .content-banner-notice-parent {
    margin: 0px 5px;
    height: 30px;
    line-height: 30px;
    white-space: nowrap;
    text-align: center;
    position: relative;
    align-items: center;
    overflow: hidden;

    .content-banner-notice {
      position: absolute;
      height: 100%;
      white-space: nowrap;
      transition-timing-function: linear;
    }
  }
}
</style>

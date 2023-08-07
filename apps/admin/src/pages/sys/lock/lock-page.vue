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
<script lang="ts" setup>
import { ref, computed, unref } from 'vue'
import { useUserStore } from '@/store/user'
import { useLockStore } from '@/store/lock'
import { useI18n } from '@anyi/corelocale'
import { useNow } from './use-now'
import { createNamespace } from '@anyi/coreutils'
import headerImg from '@/assets/images/header.jpg'
import { router } from '@/router'

const password = ref('')
const loading = ref(false)
const errMsg = ref(false)
const showDate = ref(true)

const { bem } = createNamespace('lock-page')

const lockStore = useLockStore()
const userStore = useUserStore()

const { hour, month, minute, meridiem, year, day, week } = useNow(true)

const { t } = useI18n()

const userInfo = computed(() => userStore.getUserInfo || {})

/**
 * @description: unLock
 */
async function unLock() {
  if (!password.value) {
    return
  }
  try {
    loading.value = true
    const res = await lockStore.unLock(password.value)
    errMsg.value = !res
    if (res) {
      const redirect = (unref(router.currentRoute).query?.redirect as string) || '/'
      await router.replace({ path: redirect })
    }
  } finally {
    loading.value = false
  }
}

function goLogin() {
  userStore.logout(true)
  lockStore.resetLockInfo()
}

function handleShowForm(show = false) {
  showDate.value = show
}
</script>

<template>
  <div
    :class="bem()"
    class="fixed inset-0 flex items-center justify-center w-screen h-screen bg-black"
  >
    <div
      :class="bem('unlock')"
      class="absolute top-0 flex flex-col items-center justify-center h-16 pt-5 text-white transform translate-x-1/2 cursor-pointer left-1/2 sm:text-md xl:text-xl"
      @click="handleShowForm(false)"
      v-show="showDate"
    >
      <VbenIconify icon="ant-design:lock-outlined" />
      <span>{{ t('sys.lock.unlock') }}</span>
    </div>

    <div class="flex items-center justify-center w-screen h-screen">
      <div :class="bem('hour')" class="relative w-2/5 mr-5 md:mr-20 h-2/5 md:h-4/5">
        <span
          class="text-44px sm:text-90px md:text-160px lg:text-220px xl:text-260px 2xl:text-320px"
          >{{ hour }}</span
        >
        <span class="absolute left-5 top-5 text-md" v-show="showDate">
          {{ meridiem }}
        </span>
      </div>
      <div :class="`${bem('minute')} w-2/5 h-2/5 md:h-4/5 `">
        <span
          class="text-44px sm:text-90px md:text-160px lg:text-220px xl:text-260px 2xl:text-320px"
        >
          {{ minute }}</span
        >
      </div>
    </div>
    <transition name="fade-slide">
      <div :class="bem('entry')" v-show="!showDate">
        <div :class="bem('entry-content')">
          <div :class="`${bem('entry-header')} enter-x`">
            <img :src="userInfo.avatar || headerImg" :class="`${bem('entry-header-img')}`" />
            <p :class="`${bem('entry-header-name')}`">
              {{ userInfo.realName }}
            </p>
          </div>
          <VbenInput
            type="password"
            show-password-on="mousedown"
            :placeholder="t('sys.lock.placeholder')"
            class="enter-x"
            v-model:value="password"
          />
          <span :class="`${bem('err-msg')} enter-x`" v-if="errMsg">
            {{ t('sys.lock.alert') }}
          </span>
          <div :class="`${bem('footer')} enter-x`">
            <VbenButton
              quaternary
              type="info"
              size="small"
              class="mt-2 mr-2 enter-x text-gray-300"
              :disabled="loading"
              @click="handleShowForm(true)"
            >
              {{ t('common.back') }}
            </VbenButton>
            <VbenButton
              quaternary
              type="info"
              size="small"
              class="mt-2 mr-2 enter-x text-gray-300"
              :disabled="loading"
              @click="goLogin"
            >
              {{ t('sys.lock.backToLogin') }}
            </VbenButton>
            <VbenButton
              class="mt-2 text-gray-300"
              quaternary
              type="info"
              size="small"
              @click="unLock()"
              :loading="loading"
            >
              {{ t('sys.lock.entry') }}
            </VbenButton>
          </div>
        </div>
      </div>
    </transition>

    <div class="absolute w-full text-center text-gray-300 bottom-5 xl:text-xl 2xl:text-3xl enter-y">
      <div class="mb-4 text-5xl enter-x" v-show="!showDate">
        {{ hour }}:{{ minute }} <span class="text-3xl">{{ meridiem }}</span>
      </div>
      <div class="text-2xl">{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.lock-page {
  z-index: 9999;

  &__unlock {
    transform: translate(-50%, 0);
  }

  &__hour,
  &__minute {
    display: flex;
    font-weight: 700;
    color: #bababa;
    background-color: #141313;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
  }

  &__entry {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    backdrop-filter: blur(8px);
    justify-content: center;
    align-items: center;

    &-content {
      width: 260px;
    }

    &-header {
      text-align: center;

      &-img {
        width: 70px;
        margin: 0 auto;
        border-radius: 50%;
      }

      &-name {
        margin-top: 5px;
        font-weight: 500;
        color: #bababa;
      }
    }
  }

  &__err-msg {
    display: inline-block;
    margin-top: 10px;
    color: var(--error-color);
  }

  &__footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>

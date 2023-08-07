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
import { useI18n } from '@anyi/corelocale'
import { useSiteGeneral } from '@anyi/corehooks'
import { useAppInject } from '@anyi/corehooks'
import TopButtonWrapper from '../TopButtonWrapper.vue'
const { isMobile } = useAppInject()
const { avatar, username } = useSiteGeneral()
const { t } = useI18n()
const handleSelect = (key) => {
  switch (key) {
    case 'doc':
      openDoc()
      break
    case 'logout':
      handleLoginOut()
      break
    case 'lock':
      handleLock()
      break
  }
}

const openDoc = () => {
  // openWindow(DOC_URL)
}

const handleLoginOut = () => {
  // userStore.logout(true)
}

const handleLock = () => {
  // showLockModal.value = !unref(showLockModal)
}
</script>
<template>
  <TopButtonWrapper :content="username">
    <a-dropdown trigger="click">
      <a-avatar :size="32" :style="{ marginRight: '4px', marginLeft: '4px', cursor: 'pointer' }">
        <img alt="avatar" :src="avatar" />
      </a-avatar>
      <template #content>
        <a-doption>
          <a-space>
            <icon-tag />
            <span>
              {{ $t('锁定屏幕') }}
            </span>
          </a-space>
        </a-doption>
        <a-doption>
          <a-space>
            <icon-tag />
            <span>
              {{ $t('切换角色') }}
            </span>
          </a-space>
        </a-doption>
        <a-doption>
          <a-space>
            <icon-user />
            <span>
              {{ $t('用户中心') }}
            </span>
          </a-space>
        </a-doption>
        <a-doption>
          <a-space>
            <icon-settings />
            <span>
              {{ $t('用户设置') }}
            </span>
          </a-space>
        </a-doption>
        <a-doption>
          <a-space>
            <icon-export />
            <span>
              {{ $t('退出登录') }}
            </span>
          </a-space>
        </a-doption>
      </template>
    </a-dropdown>
  </TopButtonWrapper>
</template>
<style lang="less" scoped></style>

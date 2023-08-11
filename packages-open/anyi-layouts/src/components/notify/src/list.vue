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
  <a-list :bordered="false">
    <a-list-item
      v-for="item in renderList"
      :key="item.id"
      action-layout="vertical"
      :style="{
        opacity: item.status ? 0.5 : 1,
      }"
    >
      <template #extra>
        <a-tag v-if="item.messageType === 0" color="gray">未开始</a-tag>
        <a-tag v-else-if="item.messageType === 1" color="green">已开通</a-tag>
        <a-tag v-else-if="item.messageType === 2" color="blue">进行中</a-tag>
        <a-tag v-else-if="item.messageType === 3" color="red">即将到期</a-tag>
      </template>
      <div class="item-wrap" @click="onItemClick(item)">
        <a-list-item-meta>
          <template v-if="item.avatar" #avatar>
            <a-avatar shape="circle">
              <img v-if="item.avatar" :src="item.avatar" />
              <icon-desktop v-else />
            </a-avatar>
          </template>
          <template #title>
            <a-space :size="4">
              <span>{{ item.title }}</span>
              <a-typography-text type="secondary">
                {{ item.subTitle }}
              </a-typography-text>
            </a-space>
          </template>
          <template #description>
            <div>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                }"
                >{{ item.content }}</a-typography-paragraph
              >
              <a-typography-text v-if="item.type === 'message'" class="time-text">
                {{ item.time }}
              </a-typography-text>
            </div>
          </template>
        </a-list-item-meta>
      </div>
    </a-list-item>
    <template #footer>
      <a-space fill :size="0" :class="{ 'add-border-top': renderList.length < showMax }">
        <div class="footer-wrap">
          <a-link @click="allRead">{{ $t('layout.messageBox.allRead') }}</a-link>
        </div>
        <div class="footer-wrap">
          <a-link>{{ $t('layout.messageBox.viewMore') }}</a-link>
        </div>
      </a-space>
    </template>
    <div
      v-if="renderList.length && renderList.length < 3"
      :style="{ height: (showMax - renderList.length) * 86 + 'px' }"
    ></div>
  </a-list>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  renderList: {
    type: Array as PropType<MessageListType>,
    required: true,
  },
  unreadCount: {
    type: Number,
    default: 0,
  },
})
const emit = defineEmits(['itemClick'])
const allRead = () => {
  emit('itemClick', [...props.renderList])
}

const onItemClick = (item: MessageRecord) => {
  if (!item.status) {
    emit('itemClick', [item])
  }
}
const showMax = 3
</script>

<style scoped lang="less">
:deep(.arco-list) {
  .arco-list-item {
    min-height: 86px;
    border-bottom: 1px solid rgb(var(--gray-3));
  }
  .arco-list-item-extra {
    position: absolute;
    right: 20px;
  }
  .arco-list-item-meta-content {
    flex: 1;
  }
  .item-wrap {
    cursor: pointer;
  }
  .time-text {
    font-size: 12px;
    color: rgb(var(--gray-6));
  }
  .arco-empty {
    display: none;
  }
  .arco-list-footer {
    padding: 0;
    height: 50px;
    line-height: 50px;
    border-top: none;
    .arco-space-item {
      width: 100%;
      border-right: 1px solid rgb(var(--gray-3));
      &:last-child {
        border-right: none;
      }
    }
    .add-border-top {
      border-top: 1px solid rgb(var(--gray-3));
    }
  }
  .footer-wrap {
    text-align: center;
  }
  .arco-typography {
    margin-bottom: 0;
  }
  .add-border {
    border-top: 1px solid rgb(var(--gray-3));
  }
}
</style>

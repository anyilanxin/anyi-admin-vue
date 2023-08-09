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
  <a-spin style="display: block" :loading="loading">
    <a-tabs v-model:activeKey="messageType" type="rounded" destroy-on-hide>
      <a-tab-pane v-for="item in tabList" :key="item.key">
        <template #title>
          <span> {{ item.title }}{{ formatUnreadLength(item.key) }} </span>
        </template>
        <a-result v-if="!renderList.length" status="404">
          <template #subtitle> {{ $t('layout.messageBox.noContent') }} </template>
        </a-result>
        <List :render-list="renderList" :unread-count="unreadCount" @item-click="handleItemClick" />
      </a-tab-pane>
      <template #extra>
        <a-button type="text" @click="emptyList">
          {{ $t('layout.messageBox.tab.button') }}
        </a-button>
      </template>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, computed } from 'vue'
import { useLoading } from '@anyi/corehooks'
import { useI18n } from '@anyi/corelocale'
import List from './list.vue'

interface TabItem {
  key: string
  title: string
  avatar?: string
}
const { loading, setLoading } = useLoading(true)
setTimeout(() => {
  setLoading(false)
}, 3000)
const messageType = ref('message')
const { t } = useI18n()
const messageData = reactive<{
  renderList: MessageRecord[]
  messageList: MessageRecord[]
}>({
  renderList: [],
  messageList: [],
})
toRefs(messageData)
const tabList: TabItem[] = [
  {
    key: 'message',
    title: t('layout.messageBox.tab.title.message'),
  },
  {
    key: 'notice',
    title: t('layout.messageBox.tab.title.notice'),
  },
  {
    key: 'todo',
    title: t('layout.messageBox.tab.title.todo'),
  },
]

const renderList = computed(() => {
  return messageData.messageList.filter((item) => messageType.value === item.type)
})
const unreadCount = computed(() => {
  return renderList.value.filter((item) => !item.status).length
})
const getUnreadList = (type: string) => {
  const list = messageData.messageList.filter((item) => item.type === type && !item.status)
  return list
}
const formatUnreadLength = (type: string) => {
  const list = getUnreadList(type)
  return list.length ? `(${list.length})` : ``
}
const handleItemClick = (items: MessageListType) => {}
const emptyList = () => {
  messageData.messageList = []
}
</script>

<style scoped lang="less">
:deep(.arco-popover-popup-content) {
  padding: 0;
}

:deep(.arco-list-item-meta) {
  align-items: flex-start;
}
:deep(.arco-tabs-nav) {
  padding: 14px 0 12px 16px;
  border-bottom: 1px solid var(--color-neutral-3);
}
:deep(.arco-tabs-content) {
  padding-top: 0;
  .arco-result-subtitle {
    color: rgb(var(--gray-6));
  }
}
</style>

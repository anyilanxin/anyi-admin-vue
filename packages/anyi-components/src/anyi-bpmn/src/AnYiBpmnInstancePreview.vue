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
  <div class="anyi-blank-wrapper">
    <AnYiBpmnPreviewInstance
      :theme="isDark ? 'dark' : 'light'"
      @click="handleClick"
      :showMinimap="false"
      :showButton="true"
      :onlyUserTask="false"
      :high-margin="120"
      :showModal="true"
      showNodeTreeInfo
      ref="diagramInstanceDomRef"
      :currentActivityId="currentActivityId"
    />
  </div>
</template>

<script lang="ts" name="AnYiBpmnInstancePreview" setup>
import { ref, PropType, watch } from 'vue'
import type { AnYiBpmnProcessInstanceModel } from 'anyi-process-preview-vue-ee'
import { AnYiBpmnPreviewInstance } from 'anyi-process-preview-vue-ee'
import { useAppTheme } from '@anyi/corehooks'
const props = defineProps({
  currentActivityId: {
    type: String,
  },
  data: {
    type: Object as PropType<AnYiBpmnProcessInstanceModel>,
    default: null,
  },
})

watch(
  () => props.data,
  (val, old) => {
    if (val != old) {
      loadLocalData(props.data)
    }
  },
)

watch(
  () => props.currentActivityId,
  (val, old) => {
    if (val != old) {
      setElementClick(props.currentActivityId)
    }
  },
)
const diagramInstanceDomRef = ref()
const { isDark } = useAppTheme()

function handleClick(element: any, instanceAttr: any, callback: Function) {
  console.log('-----element-------', element)
  console.log('-----instanceAttrs-------', instanceAttr)
  callback(`<scan>${instanceAttr.id}</scan>`)
}

function loadLocalData(data: AnYiBpmnProcessInstanceModel) {
  if (data) {
    diagramInstanceDomRef.value.viewInstance(data)
  }
}
function setElementClick(id?: String) {
  if (id) {
    diagramInstanceDomRef.value.handleElementClick(id)
  }
}
</script>

<style lang="less">
@import 'anyi-process-preview-vue-ee/dist/style.css';

@import 'bpmn-js/dist/assets/diagram-js.css';
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
@import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
@import 'bpmn-js/dist/assets/bpmn-js.css';
@import 'diagram-js-minimap/assets/diagram-js-minimap.css';

.anyi-blank-wrapper {
  padding: 1px 16px 16px 16px;
}
</style>

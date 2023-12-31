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
  <div style="width: 100%">
    <div v-if="$slots.headerTop" style="margin: 5px">
      <slot name="headerTop"></slot>
    </div>
    <div class="flex items-center">
      <slot name="tableTitle" v-if="$slots.tableTitle"></slot>
      <TableTitle
        :helpMessage="titleHelpMessage"
        :title="title"
        v-if="!$slots.tableTitle && title"
      />
      <div :class="`${prefixCls}__toolbar`">
        <slot name="toolbar"></slot>
        <Divider type="vertical" v-if="$slots.toolbar && showTableSetting" />
        <TableSetting
          :setting="tableSetting"
          v-if="showTableSetting"
          @columns-change="handleColumnChange"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { TableSetting, ColumnChangeParam } from '../types/table'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { Divider } from '@arco-design/web-vue'
import TableSettingComponent from './settings/index.vue'
import TableTitle from './TableTitle.vue'
import { useDesign } from '@anyi/corehooks'

export default defineComponent({
  name: 'BasicTableHeader',
  components: {
    Divider,
    TableTitle,
    TableSetting: TableSettingComponent,
  },
  props: {
    title: {
      type: [Function, String] as PropType<string | ((data: Recordable) => string)>,
    },
    tableSetting: {
      type: Object as PropType<TableSetting>,
    },
    showTableSetting: {
      type: Boolean,
    },
    titleHelpMessage: {
      type: [String, Array] as PropType<string | string[]>,
      default: '',
    },
  },
  emits: ['columns-change'],
  setup(_, { emit }) {
    const { prefixCls } = useDesign('basic-table-header')
    function handleColumnChange(data: ColumnChangeParam[]) {
      emit('columns-change', data)
    }
    return { prefixCls, handleColumnChange }
  },
})
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-basic-table-header';

.@{prefix-cls} {
  &__toolbar {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > * {
      margin-right: 8px;
    }
  }
}
</style>

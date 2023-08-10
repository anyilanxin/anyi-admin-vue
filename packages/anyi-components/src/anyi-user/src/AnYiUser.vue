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
  <Drawer
    :visible="visible"
    @ok="handleOk"
    :body-style="{ padding: '10px' }"
    :footer-style="{ textAlign: 'right' }"
    width="55%"
    :placement="'right'"
    @close="handleCancel"
    destroyOnClose
    maskClosable
    :closable="false"
  >
    <template #footer>
      <Button style="margin-right: 8px" @click="resetData" type="primary" danger> 清空数据 </Button>
      <Button style="margin-right: 8px" @click="handleCancel">取消</Button>
      <Button type="primary" @click="handleOk">确定</Button>
    </template>
    <PageWrapper dense contentFullHeight contentClass="flex">
      <AnYiOrgTree class="w-2/6 xl:w-2/6" @select="handleSelect" />
      <div class="w-4/6 xl:w-4/6">
        <BasicTable @register="registerTable" :searchInfo="searchInfo">
          <template #userStatus="{ record }">
            <a-badge status="default" v-if="record.userStatus == 0" text="未激活" />
            <a-badge status="processing" v-else-if="record.userStatus == 1" text="启用" />
            <a-badge status="warning" v-else-if="record.userStatus == 2" text="冻结" />
          </template>
        </BasicTable>
      </div>
    </PageWrapper>
  </Drawer>
</template>

<script lang="ts" setup>
import { PageWrapper } from '/@/components/Page'
import { reactive, ref } from 'vue'
import { AnYiOrgTree } from '/@/components/AnYiOrgTree'
import { BasicTable, useTable } from '/@/components/Table'
import { Drawer, Button } from '@arco-design/web-vue'
import { selectPage } from '/@/api/modules/system/rbac/rbacUser'
import { columns, searchFormSchema } from './user.d'
const props = defineProps({
  selectType: {
    // 1-单选，2-多选
    type: Number,
    default: 1,
  },
})
const searchInfo = reactive<Recordable>({})
const visible = ref(false)
const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
  title: '用户列表',
  api: selectPage,
  rowKey: 'userId',
  columns,
  formConfig: {
    labelWidth: 68,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true,
    alwaysShowLines: 1,
    autoAdvancedLine: 1,
  },
  useSearchForm: true,
  indexColumnProps: {
    width: 70,
  },
  rowSelection: {
    type: props.selectType == 1 ? 'radio' : 'checkbox',
  },
  showTableSetting: false,
  canResize: true,
  tableSetting: { fullScreen: false },
  bordered: true,
})
const emit = defineEmits(['success'])

function handleOk() {
  const selectData = getSelectRows() as any[]
  const selectUsers: any[] = []
  if (selectData && selectData.length > 0) {
    selectData.forEach((item) => {
      selectUsers.push({
        userId: item.userId,
        realName: item.realName,
      })
    })
  }
  let data = props.selectType == 1 ? [] : {}
  if (selectUsers.length > 0) {
    data = props.selectType == 1 ? selectUsers[0] : selectUsers
  }
  emit('success', data)
  visible.value = false
}
function handleCancel() {
  resetData()
  visible.value = false
}
function handleOpen(data?: any) {
  console.log('-----data---', data)
  visible.value = true
}
function handleSelect(orgId: string) {
  console.log('-----orgId-------', orgId)
  searchInfo.orgId = orgId
  reload()
}
function resetData() {
  clearSelectedRowKeys()
}
defineExpose({
  handleOpen,
})
</script>

<style lang="less"></style>

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
 * 安一兰心(AN YI LAN XIN)。安一出品，必出精品。
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


<!--
 * Copyright (c) 2021-2022 ZHOUXUANHONG(安一老厨)<anyilanxin@aliyun.com>
 *
 * 本软件 AnYi Cloud EE Ant Vue 为 AnYi Cloud 的商业授权版本。未经过商业授权禁止使用，违者必究。
 *
 * AnYi Cloud EE Ant Vue 为商业授权组件，您在使用过程中，需要注意以下几点：
 *   1.不允许在国家法律法规规定的范围外使用，如出现违法行为作者本人不承担任何责任；
 *   2.软件使用的第三方依赖皆为开源软件，如需要修改第三方依赖请遵循第三方依赖附带的开源协议，因擅自修改第三方依赖所引起的争议，作者不承担任何责任；
 *   3.不得基于AnYi Cloud EE Ant Vue的基础，修改包装而成一个与AnYi Cloud、AnYi Zeebe功能类似的程序，进行销售或发布，参与同类软件产品市场的竞争；
 *   4.不得将软件源码以任何开源方式公布出去；
 *   5.不得对授权进行出租、出售、抵押或发放子许可证；
 *   6.您可以直接使用在自己的网站或软件产品中，也可以集成到您自己的商业网站或软件产品中进行出租或销售；
 *   7.您可以对上述授权软件进行必要的修改和美化，无需公开修改或美化后的源代码；
 *   8.本软件中使用了bpmn js,使用请遵循bpmn.io开源协议：
 *     https://github.com/bpmn-io/bpmn-js/blob/develop/LICENSE
 *   9.除满足上面条款外，在其他商业领域使用不受影响。同时作者为商业授权使用者在使用过程中出现的纠纷提供协助。
 -->

<template>
  <Drawer
    :visible="visible"
    @ok="handleOk"
    :body-style="{ padding: '2px 18px' }"
    :footer-style="{ textAlign: 'right' }"
    width="66%"
    :get-container="false"
    :style="{ position: 'absolute' }"
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
    <Form layout="inline" style="margin-bottom: 10px" autocomplete="off" :model="roleSearch">
      <FormItem>
        <Input
          placeholder="角色编码或角色名称"
          style="min-width: 200px"
          v-model:value="roleSearch.keyword"
        />
      </FormItem>
      <Button style="margin-left: 10px" @click="handleRoleReset"> 重置 </Button>
      <Button
        type="primary"
        :loading="searchLoading"
        style="margin-left: 10px"
        @click="handleInitRoleData"
      >
        查询
      </Button>
    </Form>
    <Table
      :columns="roleColumns"
      :row-selection="{
        onChange: handleRoleTableSelectChange,
        selectedRowKeys: selectedRoleRowKeys,
        getCheckboxProps: handleRoleSetDisabled,
        type: selectType == 1 ? 'radio' : 'checkbox',
      }"
      :data-source="roleData"
      :pagination="rolePagination"
      @change="handleRoleTableChange"
      :loading="tableLoading"
      rowKey="roleId"
      bordered
      size="small"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'roleStatus'">
          <Badge status="default" v-if="record.roleStatus == 0" text="禁用" />
          <Badge status="processing" v-else-if="record.roleStatus == 1" text="启用" />
        </template>
      </template>
    </Table>
  </Drawer>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Drawer, Badge, Table, Form, FormItem, Input, Button } from 'ant-design-vue';
  import { selectPage } from '/@/api/modules/system/rbac/rbacRole';
  import type { PropType } from 'vue';
  import type {
    DataMethod,
    Expression,
    Role,
  } from '/@/SkillFullBpmnDesigner/src/types/modelerModel';
  import { roleColumns } from './role';
  // 基础公共
  const activeKey = ref(1);
  const emit = defineEmits(['success']);
  const visible = ref(false);
  const searchLoading = ref(false);
  const tableLoading = ref(false);
  const successData = ref<any>({
    value: '',
    name: '',
    extendId: '',
    type: activeKey.value,
  });
  // 角色相关数据
  const roleData = ref<Role[]>([]);
  const selectedRoleRowKeys = ref<any[]>([]);
  const roleSearch = ref({
    keyword: '',
  });
  const rolePagination = ref({
    total: 0,
    current: 1,
    pageSize: 5,
  });
  // 表达式相关数据
  const expressionData = ref<Expression[]>([]);
  const selectedExpressionRowKeys = ref<any[]>([]);
  const expressionSearch = ref({
    keyword: '',
  });
  const expressionPagination = ref({
    total: 0,
    current: 1,
    pageSize: 5,
  });
  // 自定义表达式相关数据
  const customExpressionFormModel = ref({
    expressionName: '',
    expressionValue: '',
  });
  const props = defineProps({
    dataMethod: {
      type: Object as PropType<DataMethod>,
      default: null,
    },
    selectType: {
      // 1-单选，2-多选
      type: Number,
      default: 1,
    },
  });
  function handleRoleReset() {
    roleSearch.value.keyword = '';
    handleInitRoleData();
  }
  function handleInitRoleData() {
    if (props.dataMethod) {
      let params = {};
      if (props.dataMethod?.groupPageParams) {
        params = { ...props.dataMethod?.groupPageParams };
      }
      params['keyword'] = roleSearch.value.keyword;
      params['current'] = rolePagination.value.current;
      params['size'] = rolePagination.value.pageSize;
      const groupPageMeghod = props.dataMethod?.groupPageMeghod as Function;
      try {
        tableLoading.value = true;
        searchLoading.value = true;
        groupPageMeghod(params).then((res: any) => {
          roleData.value = res.records;
          rolePagination.value.total = res.total;
          console.log('---------res---------', res);
        });
      } catch (error) {
        console.log('-----获取类型错误----', error);
      } finally {
        tableLoading.value = false;
        searchLoading.value = false;
      }
    }
  }
  function handleRoleTableChange(pag: any, __sorter: any) {
    rolePagination.value.current = pag.current;
    rolePagination.value.pageSize = pag.pageSize;
    handleInitRoleData();
  }

  function handleRoleTableSelectChange(__selectedRowKeys: string[], selectedRows: Role[]) {
    const roleIds: string[] = [];
    const roleName: string[] = [];
    const roleValue: string[] = [];
    selectedRoleRowKeys.value = __selectedRowKeys;
    if (selectedRows && selectedRows.length > 0) {
      selectedRows.forEach((item: Role) => {
        roleIds.push(item.roleCode);
        roleName.push(item.roleName);
        roleValue.push(item.roleId);
      });
      successData.value = {
        value: roleValue.toString(),
        name: roleName.toString(),
        extendId: roleIds.toString(),
        type: activeKey.value,
      };
    } else {
      successData.value = {
        value: null,
        name: null,
        extendId: null,
        type: null,
      };
    }
  }
  function handleRoleSetDisabled(record: Role) {
    return {
      disabled: record.roleStatus != 1,
      roleId: record.roleId,
    };
  }

  function handleInitExpressionData() {
    if (props.dataMethod) {
      let params = {};
      params['handleType'] = 1;
      if (props.dataMethod?.expressionPageParams) {
        params = { ...props.dataMethod?.expressionPageParams };
      }
      params['keyword'] = expressionSearch.value.keyword;
      params['current'] = expressionPagination.value.current;
      params['size'] = expressionPagination.value.pageSize;
      const expressionPageMeghod = props.dataMethod?.expressionPageMeghod as Function;
      try {
        tableLoading.value = true;
        searchLoading.value = true;
        expressionPageMeghod(params).then((res: any) => {
          expressionData.value = res.records;
          expressionPagination.value.total = res.total;
        });
      } catch (error) {
        console.log('-----获取类型错误----', error);
      } finally {
        tableLoading.value = false;
        searchLoading.value = false;
      }
    }
  }
  function resetData() {
    successData.value = {
      type: activeKey.value,
      value: '',
      name: '',
      extendId: '',
    };
    selectedRoleRowKeys.value = [];
    selectedExpressionRowKeys.value = [];
    customExpressionFormModel.value = {
      expressionName: '',
      expressionValue: '',
    };
  }
  function handleOk() {
    emit('success', successData.value);
    resetData();
    visible.value = false;
  }
  function handleCancel() {
    resetData();
    visible.value = false;
  }
  function handleOpen(data?: any) {
    visible.value = true;
    successData.value = {
      type: data?.type || props.enableTypes[0],
      name: data?.name || '',
      value: data?.value || '',
      extendId: data.extendId || '',
    };
    if (successData.value.type == 1) {
      handleInitRoleData();
      selectedRoleRowKeys.value = successData.value.extendId.split(',');
    } else if (successData.value.type == 2) {
      handleInitExpressionData();
      selectedExpressionRowKeys.value = successData.value.extendId.split(',');
    } else if (successData.value.type == 3) {
      customExpressionFormModel.value = {
        expressionName: data?.name || '',
        expressionValue: data?.value,
      };
    }
    activeKey.value = successData.value.type;
  }
  defineExpose({
    handleOpen,
  });
</script>

<style lang="less"></style>

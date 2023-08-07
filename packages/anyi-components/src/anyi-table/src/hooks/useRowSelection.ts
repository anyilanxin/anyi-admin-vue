/*
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
 */
import { isFunction } from '/@/utils/is';
import type { BasicTableProps, TableRowSelection } from '../types/table';
import { computed, ComputedRef, nextTick, Ref, ref, toRaw, unref, watch } from 'vue';
import { ROW_KEY } from '../const';
import { omit } from 'lodash-es';
import { findNodeAll } from '/@/utils/helper/treeHelper';
import { Item } from 'ant-design-vue/lib/menu';

export function useRowSelection(
  propsRef: ComputedRef<BasicTableProps>,
  tableData: Ref<Recordable[]>,
  emit: EmitType,
) {
  const selectedRowKeysRef = ref<string[]>([]);
  const selectedRowRef = ref<Recordable[]>([]);

  const getRowSelectionRef = computed((): TableRowSelection | null => {
    const { rowSelection } = unref(propsRef);
    if (!rowSelection) {
      return null;
    }

    const result = {
      selectedRowKeys: unref(selectedRowKeysRef),
      onChange: (selectedRowKeys: string[], selectedRows: any[]) => {
        handleOnChange(selectedRowKeys, selectedRows);
      },
      ...omit(rowSelection, ['onChange']),
      onSelectAll: onSelectAll,
      onSelect: onSelect,
    };
    return result;
  });

  watch(
    () => unref(propsRef).rowSelection?.selectedRowKeys,
    (v: string[]) => {
      setSelectedRowKeys(v);
    },
  );

  watch(
    () => unref(selectedRowKeysRef),
    () => {
      nextTick(() => {
        const { rowSelection } = unref(propsRef);
        if (rowSelection) {
          const { onChange } = rowSelection;
          if (onChange && isFunction(onChange)) {
            onChange(getSelectRowKeys(), getSelectRows());
          }
        }
        emit('selection-change', {
          keys: getSelectRowKeys(),
          rows: getSelectRows(),
        });
      });
    },
    { deep: true },
  );

  const getAutoCreateKey = computed(() => {
    return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
  });

  const getRowKey = computed(() => {
    const { rowKey } = unref(propsRef);
    return unref(getAutoCreateKey) ? ROW_KEY : rowKey;
  });
  function onSelectAll(selected, selectedRows, changeRows) {
    if (!selectedRowRef.value) {
      selectedRowRef.value = [];
      selectedRowKeysRef.value = [];
    }
    if (selected) {
      selectedRowRef.value = selectedRowRef.value.concat(selectedRows);
      const nowKey: string[] = [];
      selectedRows.forEach((item: any) => {
        nowKey.push(item[getRowKey.value + '']);
      });
      selectedRowKeysRef.value = selectedRowKeysRef.value.concat(nowKey);
    } else {
      const changeRowKey = {} as any;
      if (changeRows && changeRows.length > 0) {
        changeRows.forEach((item: any) => {
          changeRowKey[item[getRowKey.value + '']] = item[getRowKey.value + ''];
        });
        const nowRows = selectedRowRef.value.filter((item) => {
          return changeRowKey[item[getRowKey.value + '']] == undefined;
        });
        const nowKey = selectedRowKeysRef.value.filter((key) => {
          return changeRowKey[key] == undefined;
        });
        selectedRowRef.value = nowRows;
        selectedRowKeysRef.value = nowKey;
      }
    }
  }
  function onSelect(record, selected, selectedRows, _nativeEvent) {
    if (getRowSelectionRef.value?.type == 'radio') {
      selectedRowRef.value = selectedRows;
      selectedRowKeysRef.value = [selectedRows[0][getRowKey.value + '']];
    } else {
      if (!selectedRowRef.value) {
        selectedRowRef.value = [];
        selectedRowKeysRef.value = [];
      }
      const changeKey = record[getRowKey.value + ''];
      if (selected) {
        selectedRowRef.value.push(record);
        selectedRowKeysRef.value.push(changeKey);
      } else {
        const nowRows = selectedRowRef.value.filter((item) => {
          return item[getRowKey.value + ''] != changeKey;
        });
        const nowKeys = selectedRowKeysRef.value.filter((nowKey) => {
          return nowKey != changeKey;
        });
        selectedRowRef.value = nowRows;
        selectedRowKeysRef.value = nowKeys;
      }
    }
  }
  function handleOnChange(_selectedRowKeys, _selectedRows) {}
  function setSelectedRowKeys(rowKeys: string[]) {
    selectedRowKeysRef.value = rowKeys;
  }
  function selectCustomChange(record, key, type) {
    if (!selectedRowKeysRef.value) {
      selectedRowKeysRef.value = [];
      selectedRowRef.value = [];
    }
    if (type == 'radio') {
      if (selectedRowKeysRef.value.length == 0 || !selectedRowKeysRef.value.includes(key)) {
        selectedRowRef.value = [record];
        selectedRowKeysRef.value = [key];
      } else {
        selectedRowRef.value = [];
        selectedRowKeysRef.value = [];
      }
    } else {
      if (selectedRowKeysRef.value.length == 0 || !selectedRowKeysRef.value.includes(key)) {
        selectedRowRef.value = selectedRowRef.value.concat([record]);
        selectedRowKeysRef.value = selectedRowKeysRef.value.concat([key]);
      } else {
        const nowRows = selectedRowRef.value.filter((item) => {
          return item[getRowKey.value + ''] != key;
        });
        const nowKeys = selectedRowKeysRef.value.filter((nowKey) => {
          return nowKey != key;
        });
        selectedRowRef.value = nowRows;
        selectedRowKeysRef.value = nowKeys;
      }
    }
  }
  function setSelectedRows(rows: Recordable[]) {
    if (!selectedRowRef.value) {
      selectedRowRef.value = [];
    }
    selectedRowRef.value = rows;
  }

  function clearSelectedRowKeys() {
    selectedRowRef.value = [];
    selectedRowKeysRef.value = [];
  }

  function deleteSelectRowByKey(key: string) {
    const selectedRowKeys = unref(selectedRowKeysRef);
    const index = selectedRowKeys.findIndex((item) => item === key);
    if (index !== -1) {
      unref(selectedRowKeysRef).splice(index, 1);
    }
  }

  function getSelectRowKeys() {
    return unref(selectedRowKeysRef);
  }

  function getSelectRows<T = Recordable>() {
    // const ret = toRaw(unref(selectedRowRef)).map((item) => toRaw(item));
    return unref(selectedRowRef) as T[];
  }

  function getRowSelection() {
    return unref(getRowSelectionRef)!;
  }

  return {
    getRowSelection,
    selectCustomChange,
    getRowSelectionRef,
    getSelectRows,
    getSelectRowKeys,
    setSelectedRowKeys,
    clearSelectedRowKeys,
    deleteSelectRowByKey,
    setSelectedRows,
  };
}

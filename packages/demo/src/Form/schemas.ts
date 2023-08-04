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
 */
import {
  getCascaderData,
  getRadioData,
  getSelectData,
  getTreeSelectData,
} from '../apis/form'
import { VbenFormSchema } from '@anyi/vbencomponents/src/form'
import { ref } from 'vue'
export const selectParams = ref({ id: 1 })
export const BasicProps: VbenFormSchema[] = [
  {
    field: 'name',
    label: 'Input',
    component: 'Input',
    defaultValue: '111',
    required: true,
    componentProps: {
      placeholder: '基本的 Input',
    },
  },
  {
    field: 'name',
    label: 'Span演示',
    gridItemProps: {
      span: 20,
    },
    component: 'Input',
    defaultValue: '111',
    required: true,
    componentProps: {
      placeholder: '基本的 Input',
    },
  },
  {
    field: 'name',
    label: 'label 位置演示',
    gridItemProps: {
      span: 20,
    },
    labelProps: {
      labelPlacement: 'left',
    },
    component: 'Input',
    defaultValue: '111',
    required: true,
    componentProps: {
      placeholder: '基本的 Input',
    },
  },
  {
    gridItemProps: {
      span: 20,
    },
    field: 'user.name',
    label: '属性嵌套',
    component: 'Input',
    componentProps: {
      placeholder: '嵌套的 Input',
    },
  },
  {
    field: 'number',
    label: 'InputNumber',
    component: 'InputNumber',
    componentProps: {
      placeholder: '基本的 InputNumber',
    },
  },
  {
    field: 'password',
    label: 'InputPassword',
    component: 'InputPassword',
    componentProps: {
      placeholder: '基本的 InputPassword',
    },
    rule: {
      required: true,
      trigger: ['input', 'blur'],
    },
  },
  {
    field: 'textArea',
    label: 'InputTextArea',
    component: 'InputTextArea',
    componentProps: {
      placeholder: '基本的 InputTextArea',
    },
  },
  {
    field: 'sex.aa.bb',
    label: 'Select',
    component: 'Select',
    componentProps: {
      placeholder: '基本的 Select',
      api: getSelectData,
      params: selectParams,
    },
  },
  {
    field: 'treeSelect',
    label: 'TreeSelect',
    component: 'TreeSelect',

    componentProps: {
      placeholder: '基本的 TreeSelect',
      api: getTreeSelectData,
      params: selectParams,
    },
  },
  {
    field: 'radioGroup',
    label: 'RadioGroup',
    component: 'RadioGroup',
    componentProps: {
      type: 'button',
      api: getRadioData,
      params: selectParams,
    },
  },
  {
    field: 'checkboxGroup',
    label: 'CheckboxGroup',
    component: 'CheckboxGroup',
    componentProps: {
      type: 'button',
      // options: [
      //   { label: '选项1', checked: true, value: 1 },
      //   { label: '选项2', checked: false, value: 2 },
      // ],
      api: getRadioData,
      params: selectParams,
    },
  },
  {
    field: 'autoComplete',
    label: 'AutoComplete',
    component: 'AutoComplete',
    componentProps: {
      options: ['@qq.com', '@gmail.com', '@163.com'],
      split: '@',
      // api: getRadioData,
      // params: selectParams,
    },
  },
  {
    field: 'cascader',
    label: 'Cascader',
    component: 'Cascader',
    componentProps: {
      api: getCascaderData,
      params: selectParams,
      // options: ['11'],
    },
  },
  {
    field: 'datePicker',
    label: 'DatePicker',
    component: 'DatePicker',
    componentProps: {},
  },
  {
    field: 'timePicker',
    label: 'TimePicker',
    component: 'TimePicker',
    componentProps: {},
  },
  {
    field: 'divider',
    label: 'Divider',
    component: 'Divider',
    componentProps: {},
  },
  {
    field: 'switch',
    label: 'Switch',
    component: 'Switch',
    componentProps: {},
  },
  {
    field: 'rate',
    label: 'Rate',
    component: 'Rate',
    componentProps: {},
  },
  {
    field: 'slider',
    label: 'Slider',
    component: 'Slider',
    componentProps: {},
  },
  {
    field: 'colorPicker',
    label: 'ColorPicker',
    component: 'ColorPicker',
    componentProps: {},
  },
  {
    field: 'dynamicTags',
    label: 'DynamicTags',
    component: 'DynamicTags',
    componentProps: {},
  },
  {
    field: 'transfer',
    label: 'Transfer',
    component: 'Transfer',
    componentProps: {},
  },
  //TODO Upload有警告，之后处理
  // {
  //   field: 'upload',
  //   label: 'Upload',
  //   component: 'Upload',
  //   componentProps: {},
  // },
  {
    field: 'mention',
    label: 'Mention',
    component: 'Mention',
    componentProps: {},
  },
]

export const FormilyProps = {
  u2g5b1my8ql: {
    type: 'string',
    title: 'Input',
    'x-decorator': 'FormItem',
    'x-component': 'Input',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'u2g5b1my8ql',
    'x-index': 0,
  },
  n8yqg4uir5d: {
    type: 'string',
    title: 'TextArea',
    'x-decorator': 'FormItem',
    'x-component': 'Input.TextArea',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'n8yqg4uir5d',
    'x-index': 1,
  },
  '5ztjug2ckdn': {
    title: 'Password',
    'x-decorator': 'FormItem',
    'x-component': 'Password',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': '5ztjug2ckdn',
    'x-index': 2,
  },
  v6dki7fcfaa: {
    type: 'number',
    title: 'fff',
    'x-decorator': 'FormItem',
    'x-component': 'NumberPicker',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'v6dki7fcfaa',
    'x-index': 3,
  },
  o26l5e8cy0d: {
    type: 'number',
    title: 'Slider',
    'x-decorator': 'FormItem',
    'x-component': 'Slider',
    'x-validator': [],
    'x-component-props': {},
    'x-decorator-props': {},
    'x-designable-id': 'o26l5e8cy0d',
    'x-index': 4,
  },
}

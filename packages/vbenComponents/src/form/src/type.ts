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
import type { CSSProperties, VNode } from 'vue'
import { formMethod } from '#/form/src/hooks/useForm'
export interface VbenFormProps {
  title?: string
  schemas: VbenFormSchema[]
  //栅格参数
  gridProps?: GridProps
  // label布局参数
  labelProps?: Omit<LabelProps, 'labelStyle'>
  // 表单规则
  rules?: object
  // 是否显示按钮组
  actions?: boolean
  // 按钮组参数
  actionsProps?: ActionProps
  // 提交函数
  submitFunc?: (FormRef?: formMethod) => void
}

export interface ActionProps extends GridProps {
  submitText?: String
  cancelText?: String
}

// 标签参数
export interface LabelProps {
  labelPlacement?: 'left' | 'top'
  labelAlign?: 'left' | 'right'
  labelStyle?: CSSProperties | String
  labelWidth?: number | string | 'auto'
}
export interface GridProps {
  // 单行栅格数量
  cols?: number
  // 表单项 占用栅格数
  span?: number
  // 横向间距
  xGap?: number
  // 纵向间距
  yGap?: number
}
export interface GridItemProps {
  span?: number
  offset?: number
  suffix?: boolean
}

export interface VbenFormSchema {
  // Field name
  field: string
  // Event name triggered by internal value change, default change
  changeEvent?: string
  // Variable name bound to v-model Default value
  valueField?: string
  // Label name
  label: string | VNode
  // 标签参数
  labelProps?: LabelProps
  // Auxiliary text
  subLabel?: string
  // 栅格属性
  gridItemProps?: GridItemProps

  // 表单项规则
  rule?: object
  // Help text on the right side of the text
  // helpMessage?:
  //   | string
  //   | string[]
  //   | ((renderCallbackParams: RenderCallbackParams) => string | string[])
  // // BaseHelp component props
  // helpComponentProps?: Partial<HelpComponentProps>
  // // Label width, if it is passed, the labelCol and WrapperCol configured by itemProps will be invalid
  // labelWidth?: string | number
  // // Disable the adjustment of labelWidth with global settings of formModel, and manually set labelCol and wrapperCol by yourself
  // disabledLabelWidth?: boolean
  // 表单组件
  component: ComponentType
  // 组件参数
  componentProps?: object
  // | ((opt: {
  //     schema: FormSchema
  //     tableAction: TableActionType
  //     formActionType: FormActionType
  //     formModel: Recordable
  //   }) => Recordable)
  // | object
  // Required

  required?: boolean
  // required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // suffix?: string | number | ((values: RenderCallbackParams) => string | number)
  //
  // // Validation rules
  // rules?: Rule[]
  // // Check whether the information is added to the label
  // rulesMessageJoinLabel?: boolean
  //
  // // Reference formModelItem
  // itemProps?: Partial<FormItem>
  //
  // // col configuration outside formModelItem
  // colProps?: Partial<ColEx>
  //
  // 默认值
  defaultValue?: any
  // isAdvanced?: boolean
  //
  // // Matching details components
  // span?: number
  //
  // ifShow?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // show?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // // Render the content in the form-item tag
  // render?: (
  //   renderCallbackParams: RenderCallbackParams,
  // ) => VNode | VNode[] | string
  //
  // // Rendering col content requires outer wrapper form-item
  // renderColContent?: (
  //   renderCallbackParams: RenderCallbackParams,
  // ) => VNode | VNode[] | string
  //
  // renderComponentContent?:
  //   | ((renderCallbackParams: RenderCallbackParams) => any)
  //   | VNode
  //   | VNode[]
  //   | string
  //
  // // Custom slot, in from-item
  slot?: string
  //
  // // Custom slot, similar to renderColContent
  // colSlot?: string
  //
  // dynamicDisabled?:
  //   | boolean
  //   | ((renderCallbackParams: RenderCallbackParams) => boolean)
  //
  // dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule[]
}
export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  // | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTree'
  // | 'ApiTreeSelect'
  // | 'ApiRadioGroup'
  // | 'RadioButtonGroup'
  | 'RadioGroup'
  // | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  // | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  // | 'MonthPicker'
  // | 'RangePicker'
  // | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider'
  | 'ColorPicker'
  | 'DynamicTags'
  | 'Transfer'
  | 'Mention'
  | 'DynamicInput'

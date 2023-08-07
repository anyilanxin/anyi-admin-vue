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



<script lang="ts" setup name="VbenForm">
import { maps } from '#/index'
import { computed, onMounted, ref, unref, useAttrs, watch } from 'vue'
import { GridItemProps, VbenFormProps } from './type'
import { set } from '@anyi/coreutils'
const emit = defineEmits(['register', 'update:model'])
const innerProps = ref<Partial<VbenFormProps>>()
const Form = maps.get('Form')
const formRef = ref(null)
const props = defineProps({
  schemas: [],
  rules: {
    type: Object || Array,
    default: {},
  },
})
const attrs = useAttrs()
const getRules = computed(() => innerProps.value?.rules || props.rules)
const setProps = (prop: Partial<VbenFormProps>) => {
  prop.schemas?.forEach((v) => {
    if (v.defaultValue) {
      fieldValue.value[v.field] = v.defaultValue
    }
    if (v.required || !v.rule) {
      v.rule = {
        required: true,
      }
    }
  })

  innerProps.value = {
    actions: false,
    ...prop,
    ...unref(innerProps),
  }
}
const fieldValue = ref({})
watch(
  () => attrs.model,
  () => {
    const m = JSON.parse(JSON.stringify(attrs.model))
    sObject(m)
  },
  { deep: true, immediate: true },
)
watch(
  () => fieldValue,
  () => {
    emit('update:model', getFieldValue())
  },
  { deep: true },
)
function sObject(m, key?) {
  Object.keys(m).forEach((k) => {
    const tempKey = key ? key + '.' + k : k
    if (typeof m[k] == 'object') {
      sObject(m[k], tempKey)
      return
    }
    fieldValue.value[tempKey] = m[k]
  })
}
function getFieldValue() {
  const m = JSON.parse(JSON.stringify(fieldValue.value))
  Object.keys(m).forEach((k) => {
    if (k.indexOf('.') != -1) {
      const v = m[k]
      delete m[k]
      set(m, k, v)
    }
  })
  return m
}
// 默认gridItem参数
const getGridItemProps = (p) => {
  return { span: getGridProps.value.span, ...p }
}

const getFormItemProps = (p) => {
  const { labelProps } = p

  return { ...labelProps }
}

// 默认grid参数
const getGridProps = computed(() => {
  return {
    cols: 24,
    span: 8,
    xGap: 12,
    yGap: 0,
    ...innerProps.value?.gridProps,
  }
})

const FormMethod = ref({})

onMounted(() => {
  FormMethod.value = {
    setProps,
    getFieldValue,
    validate: formRef.value?.validate,
    restoreValidation: formRef.value?.restoreValidation,
    updateSchemas: (schemas) => {
      innerProps.value.schemas = schemas
    },
  }
  emit('register', unref(FormMethod))
})
</script>
<template>
  <div>
    <!--    {{ $attrs }}-->
    <Form ref="formRef" v-bind="$attrs" :rules="getRules">
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
      <VbenGrid v-bind="getGridProps">
        <VbenGridItem
          v-bind="getGridItemProps(schema.gridItemProps)"
          v-for="(schema, key) in innerProps?.schemas"
          :key="key"
          :path="schema.field"
        >
          <VbenFormItem
            :label="schema.label"
            :path="schema.field"
            :showRequireMark="schema.required"
            :rule="schema.rule"
            v-bind="getFormItemProps(schema)"
          >
            <slot
              :name="schema.slot"
              v-if="schema.slot"
              v-bind="{ m: fieldValue, field: schema.field }"
            ></slot>
            <component
              v-if="
                (schema.component !== 'InputPassword' || schema.component !== 'InputTextArea') &&
                !schema.slot
              "
              :is="`Vben${schema.component}`"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <VbenInput
              type="password"
              v-if="schema.component === 'InputPassword'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
            <VbenInput
              type="textarea"
              v-if="schema.component === 'InputTextArea'"
              v-bind="schema.componentProps"
              v-model:value="fieldValue[schema.field]"
            />
          </VbenFormItem>
        </VbenGridItem>
        <VbenGridItem
          v-if="innerProps?.schemas.length > 0 && innerProps.actions"
          v-bind="innerProps.actionsProps"
        >
          <slot name="actions-prefix" v-bind="FormMethod || {}"></slot>
          <slot name="actions" v-bind="FormMethod || {}">
            <VbenButtonGroup
              ><VbenButton type="error" @click="formRef.restoreValidation">{{
                innerProps.actionsProps.cancelText || '重置'
              }}</VbenButton>
              <VbenButton type="primary" @click="innerProps.submitFunc(FormMethod)">{{
                innerProps.actionsProps.submitText || '提交'
              }}</VbenButton></VbenButtonGroup
            >
          </slot>
          <slot name="actions-suffix" v-bind="FormMethod || {}"></slot>
        </VbenGridItem>
      </VbenGrid>
    </Form>
  </div>
</template>

<style scoped></style>

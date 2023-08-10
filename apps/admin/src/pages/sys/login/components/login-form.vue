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
  <div class="login-form-wrapper">
    <div class="login-form-title">{{ $t('登录 AnYi Cloud EE') }}</div>
    <div class="login-form-sub-title">{{ $t('登录 AnYi Cloud EE') }}</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="formRef"
      :model="formData"
      class="login-form"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="userName"
        :rules="[{ required: true, message: $t('用户名不能为空') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="formData.userName" :placeholder="$t('请输入用户名')">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: $t('密码不能为空') }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password v-model="formData.password" :placeholder="$t('请输入密码')" allow-clear>
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="code"
        :validate-trigger="['change', 'blur']"
        :rules="[{ required: true, message: $t('验证不能为空') }]"
        hide-label
      >
        <a-input :placeholder="$t('请输入验证码')" v-model="formData.code">
          <template #prefix>
            <icon-safe />
          </template>
          <template #append>
            <a-image
              :width="'100px'"
              :height="'32px'"
              :preview="false"
              :src="imgSrc"
              @click="getPicture"
            />
          </template>
        </a-input>
      </a-form-item>
      <div class="demo-info">
        <span>演示账号、密码： {{ demoAccount.userName }}/{{ demoAccount.password }}</span>
      </div>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox checked="rememberPassword" v-model="formData.rememberMe">
            {{ $t('记住密码') }}
          </a-checkbox>
          <a-link>{{ $t('忘记密码') }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('登录') }}
        </a-button>
        <a-button type="text" long class="login-form-register-btn">
          {{ $t('注册账号') }}
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { AxiosError } from 'axios'
import { getPictureCode } from '@anyi/baseapis'
import { Notification } from '@arco-design/web-vue'
import { useI18n } from '@anyi/corelocale'
import { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { useUserStore } from '@/store/user'
import { useLoading } from '@anyi/corehooks'

const errorMessage = ref('')
const imgSrc = ref('')
const formRef = ref()
const { t } = useI18n()
const userStore = useUserStore()
const { loading, setLoading } = useLoading()
const demoAccount = reactive({
  userName: 'anyilanxin',
  password: 'anyilanxin',
})

const formData = reactive({
  userName: demoAccount.userName,
  password: demoAccount.password,
  code: '',
  codeId: '',
  rememberMe: false,
})
async function getPicture() {
  const pictureData = await getPictureCode()
  imgSrc.value = pictureData.codeValue
  formData.codeId = pictureData.codeId
}
onMounted(() => {
  getPicture()
})
const handleSubmit = async ({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: Record<string, any>
}) => {
  if (loading.value) return
  if (!errors) {
    setLoading(true)
    try {
      const userInfo: any = await userStore.login({
        ...formData,
        mode: 'none',
      })
      if (userInfo) {
        Notification.success({
          content: t('sys.login.loginSuccessTitle'),
          title: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realname}`,
          duration: 3000,
        })
      }
    } catch (err) {
      const error = err as AxiosError
      const data = error.response?.data as any
      if (data) {
        errorMessage.value = data.message
      } else {
        errorMessage.value = (err as Error).message
      }
      Notification.error(errorMessage.value)
    } finally {
      setLoading(false)
    }
  }
}
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    margin-left: 40%;
    background-color: #fff;
    box-shadow: 1px 1px 10px 2px #ccc;
    padding: 25px 25px 10px 25px;
    width: 400px;
    border-radius: 6px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}

body[arco-theme='dark'] .login-form-wrapper {
  background-color: #222121 !important;
  box-shadow: 1px 1px 10px 2px #171616 !important;
}
:deep(.arco-input-append) {
  background-color: transparent !important;
  padding: 0px !important;
}
.login-picture-error {
  text-align: center;
  & > span {
    font-weight: 800;
    padding-left: 20px;
    font-size: 1.8em;
    letter-spacing: 7px;
    background-image: linear-gradient(60deg, #119de2, #ff3a3a);
    -webkit-background-clip: text;
    color: transparent;
  }
}
.login-picture {
  margin-left: 1px;
}
.demo-info {
  position: relative;
  top: -12px;
  color: #bebcbc;
}
</style>

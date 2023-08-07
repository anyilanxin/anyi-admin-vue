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
  <div class="container">
    <div class="logo">
      <img alt="logo" src="/logo.svg" />
      <div class="logo-text">{{ title }}</div>
    </div>
    <LoginBanner />
    <div class="content">
      <div class="content-inner">
        <div class="login-i18n-theme">
          <DarkModeToggle />
          <LocalePicker :reload="false" :showText="false" />
        </div>
        <LoginForm />
      </div>
      <div class="footer">
        <AnYiFooter />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginBanner from './components/banner.vue'
import LoginForm from './components/login-form.vue'
import { AnYiFooter } from '@anyi/components'
import { DarkModeToggle, LocalePicker } from '@anyi/layouts'
import { getGlobalConfig } from '@anyi/coreutils'
const { title } = getGlobalConfig(import.meta.env)
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;

  .logo-text {
    color: #fff;
  }
  .logo > img {
    width: 50px;
    height: 50px;
  }

  .banner {
    width: 550px;
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }

  .content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;

    .login-i18n-theme {
      position: absolute;
      top: 0px;
      right: 0px;
      margin: 10px;
    }
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &-text {
    margin-right: 4px;
    margin-left: 4px;
    color: #fff;
    font-size: 20px;
  }
}
</style>

<style lang="less" scoped>
// responsive
@media (max-width: @screen-lg) {
  .container {
    .banner {
      width: 25%;
    }
  }
}
.content {
  background-image: url('@/assets/images/background2.svg');
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-color: var(--color-bg-2);
}
</style>

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
 * ------------------------------------------------------------------------
 * 安一兰心(AN YI LAN XIN)。安一出品，必出精品。
 *
 *   Official  Website ::  https://anyilanxin.com
 * ------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------
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
 * ------------------------------------------------------------------------
 */
import type { GlobEnvConfig, GlobConfig } from '@anyi/coretypes'
import { version } from '../package.json'

/**
 * Get the configuration file variable name
 * @param env
 */
export function getAppConfigFileName(env: Record<string, any>) {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '')
}

export function getGlobalConfig(env: Record<string, any>): Readonly<GlobConfig> {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_NAME,
    VITE_GLOB_REQUEST_TIMEOUT,
    // 是否开启数据传输加密
    VITE_GLOB_DATA_ENCRYPTION,
    // 获取密钥api
    VITE_GLOB_DATA_ENCRYPTION_URL,
    // 是否开启数据传输加密密钥刷新
    VITE_GLOB_DATA_ENCRYPTION_REFRESH,
    // 数据传输加密密钥刷新时间(单位s)
    VITE_GLOB_DATA_ENCRYPTION_REFRESH_TIME,
    // 灰度开关
    VITE_GLOB_ENABLE_GRAY,
    // 灰度信息地址读取开关(灰度开关打开时有效)
    VITE_GLOB_ADDRESS_GRAY,
    // 打开websocket
    VITE_GLOB_OPEN_SOCKET,
    // socket地址
    VITE_GLOB_SOCKET_URL,
    // 系统编码
    VITE_GLOB_SYSTEM_CODE,
  } = getAppConfig(env)

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
    timeout: VITE_GLOB_REQUEST_TIMEOUT,
    // 是否开启加密
    openDataEncryption: (VITE_GLOB_DATA_ENCRYPTION as unknown as string) == 'true' ? true : false,
    // 获取密钥地址
    securityApi: VITE_GLOB_DATA_ENCRYPTION_URL,
    // 是否刷新密钥
    refresh: (VITE_GLOB_DATA_ENCRYPTION_REFRESH as unknown as string) == 'true' ? true : false,
    // 密钥刷新时间
    refreshTime: VITE_GLOB_DATA_ENCRYPTION_REFRESH_TIME || 30,
    // 灰度开关
    enableGray: (VITE_GLOB_ENABLE_GRAY as unknown as string) == 'true' ? true : false,
    // 灰度信息地址读取开关(灰度开关打开时有效)
    addressGray: (VITE_GLOB_ADDRESS_GRAY as unknown as string) == 'true' ? true : false,
    // 打开websocket
    openSocket: (VITE_GLOB_OPEN_SOCKET as unknown as string) == 'true' ? true : false,
    // socket地址
    socketApi: VITE_GLOB_SOCKET_URL,
    // 系统编码
    systemCode: VITE_GLOB_SYSTEM_CODE,
  }
  return glob as Readonly<GlobConfig>
}

function createStorageKeyPrefix(env: Record<string, any>) {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppConfig(env)
  return `${VITE_GLOB_APP_SHORT_NAME}_${env.MODE}`.toUpperCase()
}

// Generate cache key according to version
export function createStorageName(env: Record<string, any>) {
  return `${createStorageKeyPrefix(env)}${`_${version}`}_`.toUpperCase()
}

function getAppConfig(env: Record<string, any>) {
  const ENV_NAME = getAppConfigFileName(env)

  const ENV = (
    env.DEV
      ? // Get the global configuration (the configuration will be extracted independently when packaging)
        env
      : window[ENV_NAME]
  ) as GlobEnvConfig

  const { VITE_GLOB_APP_SHORT_NAME } = ENV

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    )
  }
  return ENV
}

/**
 * @description: Development mode
 */
export const devMode = 'development'

/**
 * @description: Production mode
 */
export const prodMode = 'production'

/**
 * @description: Get environment variables
 * @returns:
 * @example:
 */
export function getEnv(env: Record<string, any>): string {
  return env.MODE
}

/**
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(env: Record<string, any>): boolean {
  return env.DEV
}

/**
 * @description: Is it a production mode
 * @returns:
 * @example:
 */
export function isProdMode(env: Record<string, any>): boolean {
  return env.PROD
}

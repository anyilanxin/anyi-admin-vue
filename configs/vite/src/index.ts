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
import dayjs from 'dayjs'
import { resolve } from 'path'
import { red } from 'picocolors'
import { readPackageJSON } from 'pkg-types'
import type { UserConfig } from 'vite'
import { loadEnv, mergeConfig } from 'vite'
import { OUTPUT_DIR } from './constants'
import { configVitePlugins } from './plugins'
import type { PresetType } from './presets'
import { createPreset } from './presets'
import { resolveProxy, wrapperEnv } from './utils'
const timestamp = new Date().getTime()
export * from './constants'

export async function createViteConfig(
  command: 'build' | 'serve',
  mode: string,
  cwd: string,
  { preset }: { preset: PresetType },
): Promise<UserConfig> {
  console.log()
  console.log(red('安一兰心'))
  console.log()
  const root = cwd
  const env = loadEnv(mode, root)
  const { dependencies, devDependencies, name, version } = await readPackageJSON(cwd)

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env)
  const { VITE_PUBLIC_PATH, VITE_PROXY, VITE_USE_MOCK, VITE_DROP_CONSOLE, VITE_USE_HTTPS } = viteEnv
  const commonConfig: UserConfig = {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': `${resolve(root, 'src')}`,
        // layouts: `${resolve(root, '../../packages/layouts/src')}`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    define: {
      __VITE_USE_MOCK__: VITE_USE_MOCK,
      // Suppress vue-i18-next warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify({
        pkg: { dependencies, devDependencies, name, version },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    },
    server: {
      https: VITE_USE_HTTPS,
      port: 3000,
      host: true,
      proxy: !VITE_USE_HTTPS ? resolveProxy(VITE_PROXY) : undefined,
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048,
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       vue: ['vue', 'pinia', 'vue-router'],
      //       mockjs: ['mockjs'],
      //     },
      //   },
      // },
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            naive: ['naive-ui'],
            monacoEditor: ['monaco-editor'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            mockjs: ['mockjs'],
          },
          // manualChunks: (id) => {
          //   if (
          //     id.includes('node_modules') &&
          //     !id.includes('@bpmn-io') &&
          //     !id.includes('bpmn-js') &&
          //     !id.includes('feelers')
          //   ) {
          //     return id.toString().split('node_modules/')[1].split('/')[0].toString();
          //   }
          // },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: `assets/[name].[hash].${timestamp}.js`, // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: `assets/[name].[hash].${timestamp}.js`, // 拆分js到模块文件夹
          assetFileNames: `assets/[name].[hash].${timestamp}.[ext]`, // 用于输出静态资源的命名
        },
      },
    },
    optimizeDeps: {
      include: ['dayjs/locale/en', 'dayjs/locale/zh-cn', '@iconify/iconify'],
      // exclude: ['vue-demi'],
    },
    plugins: await configVitePlugins(root, viteEnv, command === 'build'),
  }

  return mergeConfig(commonConfig, await createPreset(preset)())
}

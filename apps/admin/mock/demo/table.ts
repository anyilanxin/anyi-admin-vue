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
 */
import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess } from '@anyi/coreutils/mock-util'

export function createFakeTableData() {
  return {
    items: [
      {
        userId: '1',
        username: 'vben',
        realname: 'Vben Admin',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
        desc: 'manager',
        password: '123456',
        accessToken: 'fakeToken1',
        address: '呼伦贝尔市',
        startTime: '1997-01-26 10:45:00',
        endTime: '2022-08-08 17:02:15',
        roles: [
          {
            name: 'Super Admin',
            value: 'super',
          },
        ],
      },
      {
        userId: '2',
        username: 'test',
        password: '123456',
        realname: 'test user',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
        desc: 'tester',
        accessToken: 'fakeToken2',
        address: '鹤壁市',
        startTime: '2010-07-29 09:23:46	',
        endTime: '1998-02-27 02:14:58',
        roles: [
          {
            name: 'Tester',
            value: 'test',
          },
        ],
      },
    ],
    total: 2,
  }
}

export default [
  // mock user login
  {
    url: '/basic-api/demo/table',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess(createFakeTableData())
    },
  },
] as MockMethod[]

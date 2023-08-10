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

export function createSelectData() {
  return {
    options: [
      {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true,
      },
      {
        label: 'Drive My Car',
        value: 'song1',
      },
      {
        label: 'Norwegian Wood',
        value: 'song2',
      },
      {
        label: "You Won't See",
        value: 'song3',
        disabled: true,
      },
      {
        label: 'Nowhere Man',
        value: 'song4',
      },
      {
        label: 'Think For Yourself',
        value: 'song5',
      },
      {
        label: 'The Word',
        value: 'song6',
      },
      {
        label: 'Michelle',
        value: 'song7',
        disabled: true,
      },
      {
        label: 'What goes on',
        value: 'song8',
      },
      {
        label: 'Girl',
        value: 'song9',
      },
      {
        label: "I'm looking through you",
        value: 'song10',
      },
      {
        label: 'In My Life',
        value: 'song11',
      },
      {
        label: 'Wait',
        value: 'song12',
      },
    ],
  }
}

export function createTreeSelectData() {
  return {
    options: [
      {
        label: 'Rubber Soul',
        key: 'Rubber Soul',
        children: [
          {
            label: "Everybody's Got Something to Hide Except Me and My Monkey",
            key: "Everybody's Got Something to Hide Except Me and My Monkey",
          },
          {
            label: 'Drive My Car',
            key: 'Drive My Car',
            disabled: true,
          },
          {
            label: 'Norwegian Wood',
            key: 'Norwegian Wood',
          },
          {
            label: "You Won't See",
            key: "You Won't See",
            disabled: true,
          },
          {
            label: 'Nowhere Man',
            key: 'Nowhere Man',
          },
          {
            label: 'Think For Yourself',
            key: 'Think For Yourself',
          },
          {
            label: 'The Word',
            key: 'The Word',
          },
          {
            label: 'Michelle',
            key: 'Michelle',
            disabled: true,
          },
          {
            label: 'What goes on',
            key: 'What goes on',
          },
          {
            label: 'Girl',
            key: 'Girl',
          },
          {
            label: "I'm looking through you",
            key: "I'm looking through you",
          },
          {
            label: 'In My Life',
            key: 'In My Life',
          },
          {
            label: 'Wait',
            key: 'Wait',
          },
        ],
      },
      {
        label: 'Let It Be',
        key: 'Let It Be Album',
        children: [
          {
            label: 'Two Of Us',
            key: 'Two Of Us',
          },
          {
            label: 'Dig A Pony',
            key: 'Dig A Pony',
          },
          {
            label: 'Across The Universe',
            key: 'Across The Universe',
          },
          {
            label: 'I Me Mine',
            key: 'I Me Mine',
          },
          {
            label: 'Dig It',
            key: 'Dig It',
          },
          {
            label: 'Let It Be',
            key: 'Let It Be',
          },
          {
            label: 'Maggie Mae',
            key: 'Maggie Mae',
          },
          {
            label: "I've Got A Feeling",
            key: "I've Got A Feeling",
          },
          {
            label: 'One After 909',
            key: 'One After 909',
          },
          {
            label: 'The Long And Winding Road',
            key: 'The Long And Winding Road',
          },
          {
            label: 'For You Blue',
            key: 'For You Blue',
          },
          {
            label: 'Get Back',
            key: 'Get Back',
          },
        ],
      },
    ],
  }
}

export function createRadioData() {
  return {
    options: [
      {
        label: '选项1',
        value: '1',
      },
      {
        label: '选项2',
        value: '2',
      },
      {
        label: '选项3',
        value: '3',
        disabled: true,
      },
    ],
  }
}

export function createCascaderOptions(depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options: any[] = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: createCascaderOptions(depth, iterator + 1, '' + String(i)),
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: createCascaderOptions(depth, iterator + 1, `${prefix}-${i}`),
      })
    }
  }
  return options
}

export default [
  // mock user login
  {
    url: '/basic-api/demo/form/select',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess(createSelectData())
    },
  },
  {
    url: '/basic-api/demo/form/treeSelect',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess(createTreeSelectData())
    },
  },
  {
    url: '/basic-api/demo/form/radio',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess(createRadioData())
    },
  },
  {
    url: '/basic-api/demo/form/cascader',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return resultSuccess({ options: createCascaderOptions() })
    },
  },
] as MockMethod[]

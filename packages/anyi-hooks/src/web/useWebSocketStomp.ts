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
// noinspection JSUnusedGlobalSymbols

import { ref } from 'vue'

import type { StompJsWebSocket } from '@anyi/coretypes'
import dayjs from 'dayjs'
import { context } from '../../bridge'
import Stomp from 'stompjs'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
const clientInfo = ref<StompJsWebSocket>({
  client: null,
  connecteState: 0, // 0-待链接，1-连接中，2-链接成功。3-触发重连
  success: false,
  startReconnect: false,
  init: false,
  enableConnect: true,
  connectedTime: null,
})
const subscriptions = ref<Map<String, Function[]>>({} as Map<String, Function[]>)
const subscriptionsOrigin = ref<Map<String, any[]>>({} as Map<String, any[]>)
const handleConnected = ref<Function>()
const handleError = ref<Function>()
/**
 * 开启 WebSocket 链接，全局只需执行一次
 */
export function userConnectWebSocket() {
  function userConnect(connectCallback?: Function, errorCallback?: Function) {
    clientInfo.value.init = true
    if (typeof connectCallback !== 'function') {
      handleConnected.value = connectCallback
    }
    if (typeof errorCallback !== 'function') {
      handleError.value = errorCallback
    }
    if (clientInfo.value.client && clientInfo.value.success) {
      return clientInfo
    }
    if (clientInfo.value.connecteState == 1) {
      return getClient()
    }
    clientInfo.value.connecteState = 1
    connect()
    return clientInfo
  }

  function getClient() {
    const clientValue = clientInfo
    if (!clientInfo.value.init) {
      return
    }
    if (!clientValue.value.enableConnect) {
      throw '当前不允许链接'
    }
    if (!clientValue.value.success) {
      setTimeout(() => getClient(), 1000)
    }
    return clientInfo
  }
  function subscribe(topic: string, callback: Function) {
    if (!clientInfo.value.client) {
      return
    }
    if (!clientInfo.value.enableConnect) {
      throw '当前不允许链接'
    }
    const subscriptionsOrigins: any[] = subscriptionsOrigin[topic] || []
    subscriptionsOrigins.push(callback)
    subscriptionsOrigin.value[topic] = subscriptionsOrigins
    if (clientInfo.value.client && clientInfo.value.client.connected) {
      const subscribe = clientInfo.value.client.subscribe(topic, callback)
      const subscriptionsInfo = subscriptions.value[topic] || []
      subscriptionsInfo.push(subscribe)
      subscriptions.value[topic] = subscriptionsInfo
    }
  }
  function unsubscribe(topic: string) {
    const subscribes = getSubscribe(topic)
    if (subscribe && subscribe.length > 0) {
      const length = subscribe.length
      for (let index; index < length; index++) {
        const subscribe = subscribes[index]
        subscribe.unsubscribe()
      }
    }
  }
  function getSubscribe(topic: string): any[] {
    return subscriptions.value[topic] || []
  }
  function send(topic: string, message: any, headers?: any) {
    clientInfo.value.client.send(topic, headers || {}, message)
  }
  function disconnect() {
    const client = clientInfo.value.client
    if (client) {
      if (clientInfo.value.success) {
        client.disconnect(defaultDisconnect)
      }
    }
  }
  return {
    userConnect,
    getClient,
    subscribe,
    unsubscribe,
    send,
    disconnect,
  }
}

/**
 * 链接
 * @param msg
 */
function connect() {
  if (clientInfo.value.success) {
    return
  }
  const { socketApi, useUserStore } = context
  // const header = getAuthHeader();
  // if (!header || Object.keys(header).length <= 0) {
  //   throw '没有token鉴权信息不能进行链接';
  // }
  // const token = getTokenInfo();
  // const socket = new SockJS(socketApi + '?' + token['token_query_name'] + '=' + token.access_token);
  // clientInfo.value.client = Stomp.over(socket);
  // console.log('-----header-------', header);
  // clientInfo.value.client.connect(header, defaultConnectCallback, defaultErrorCallback);

  const { getTokenFunction } = context

  // 请求之前处理config
  const token = (getTokenFunction?.() || {}) as any

  if (!token || Object.keys(token).length <= 0) {
    throw '没有token鉴权信息不能进行链接'
  }
  const socket = new SockJS(socketApi + '?' + token['token_query_name'] + '=' + token.access_token)
  clientInfo.value.client = Stomp.over(socket)
  clientInfo.value.client.connect({}, defaultConnectCallback, defaultErrorCallback)
}

/**
 * 手动端口链接
 * @param msg
 */
function defaultDisconnect(_msg: any) {
  clientInfo.value.success = false
  clientInfo.value.connecteState = 0
  clientInfo.value.connectedTime = null
  clientInfo.value.enableConnect = false
  clientInfo.value.startReconnect = false
}

/**
 * 链接错误回调
 * @param msg
 */
function defaultErrorCallback(msg: any) {
  clientInfo.value.startReconnect = false
  clientInfo.value.success = false
  if (handleError.value) {
    handleError.value(msg)
  }
  // 如果允许链接并且没有触发重试
  if (clientInfo.value.enableConnect && clientInfo.value.connecteState != 3) {
    clientInfo.value.connecteState = 3
    reconnect()
  }
}

function reconnect() {
  if (clientInfo.value.success) {
    return
  }
  if (!clientInfo.value.startReconnect) {
    clientInfo.value.startReconnect = true
    connect()
  }
  setTimeout(() => reconnect(), 2000)
}
/**
 * 链接成功回调
 * @param msg
 */
function defaultConnectCallback(msg: any) {
  clientInfo.value.startReconnect = false
  clientInfo.value.success = true
  clientInfo.value.connecteState = 2
  clientInfo.value.enableConnect = true
  clientInfo.value.client.heartbeat.outgoing = 20000
  clientInfo.value.client.heartbeat.incoming = 0
  clientInfo.value.connectedTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  if (handleConnected.value) {
    handleConnected.value(msg)
  }
  subscriptions.value = {} as Map<String, any[]>
  for (const item in subscriptionsOrigin.value) {
    const functions: Function[] = subscriptionsOrigin.value[item] || []
    const length = functions.length
    for (let index = 0; index < length; index++) {
      const subscribe = clientInfo.value.client.subscribe(item, functions[index])
      const subscriptionsInfo = subscriptions.value[item] || []
      subscriptionsInfo.push(subscribe)
    }
  }
}

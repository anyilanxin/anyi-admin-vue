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
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import type { RequestOptions, Result, UploadFileParams, Security } from '@anyi/coretypes'
import type { CreateAxiosOptions } from './axiosTransform'
import axios from 'axios'
import qs from 'qs'
import { AxiosCanceler } from './axiosCancel'
import { isFunction } from '@anyi/coreutils'
import { cloneDeep } from 'lodash-es'
import { ContentTypeEnum } from '@anyi/coretypes'
import { RequestEnum } from '@anyi/coretypes'
// import { setSecurityInfo, getSecurityInfo } from '/@/utils/auth'
import type { WebSecurityModel } from '@anyi/coretypes'
export * from './axiosTransform'
import { getKey } from '@anyi/coreutils'
// import { context } from '../bridge'
// const { useGlobSetting } = context
// const globSetting = useGlobSetting()
export interface RequestSecurityModel extends WebSecurityModel {
  secret: string
  userSecurity: boolean
}
/**
 * @description:  axios module
 */
export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxios(config)
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @description: Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform

    const axiosCanceler = new AxiosCanceler()

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: any) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      const {
        headers: { ignoreCancelToken },
      } = config as any

      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken

      !ignoreCancel && axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(
    config: AxiosRequestConfig,
    params: UploadFileParams,
    options?: RequestOptions,
  ): Promise<any> {
    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)
    const transform = this.getTransform()
    const { beforeRequestHook } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      config = beforeRequestHook(config, opt)
    }
    const formData = new window.FormData()
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return
        const value = params.data[key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data[key])
      })
    }
    formData.append(params.name || 'file', params.file, params.filename)
    // const customParams = omit(params, 'file', 'filename', 'file');

    // Object.keys(customParams).forEach((key) => {
    //   formData.append(key, customParams[key]);
    // });
    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
    })
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()
    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const {
      beforeRequestHook,
      requestCatchHook,
      transformRequestHook,
      requestEncryptHook,
      responseDecryptHook,
    } = transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt
    conf = this.supportFormData(conf)
    // 如果开启加密，则需要先获取加密配置信息
    // const security: Security = {
    //   openDataEncryption: globSetting.openDataEncryption,
    //   // 是否刷新密钥
    //   refresh: globSetting.refresh,
    //   // 密钥刷新时间(s)
    //   refreshTime: globSetting.refreshTime,
    //   getSecurityInfoApi: globSetting.securityApi,
    // }
    // let requestSecurityInfo: RequestSecurityModel = {
    //   validityInSeconds: 0,
    //   expiresAt: '',
    //   serialNumber: '',
    //   serialNumberKey: '',
    //   refreshHeaderKey: '',
    //   publicKey: '',
    //   ciphertextKey: '',
    //   secretKey: '',
    //   secret: getKey(),
    //   userSecurity: security.openDataEncryption,
    // }
    // if (security.openDataEncryption) {
    //   const securityData = getSecurityInfo()
    //   if (!securityData || Object.keys(securityData).length < 0) {
    //     let securityAxiosConfig: CreateAxiosOptions = cloneDeep(config)
    //     securityAxiosConfig.requestOptions = conf.requestOptions
    //     securityAxiosConfig.url = security.getSecurityInfoApi
    //     securityAxiosConfig.method = 'GET'
    //     if (beforeRequestHook && isFunction(beforeRequestHook)) {
    //       securityAxiosConfig = beforeRequestHook(securityAxiosConfig, opt)
    //     }
    //     return new Promise((resolve, reject) => {
    //       this.axiosInstance
    //         .request<any, AxiosResponse<Result>>(securityAxiosConfig)
    //         .then((res: AxiosResponse<Result>) => {
    //           const securityData = res.data as unknown as Result<WebSecurityModel>
    //           if (securityData.success && securityData.data) {
    //             setSecurityInfo(securityData.data)
    //             requestSecurityInfo = Object.assign(requestSecurityInfo, securityData.data)
    //             return new Promise((_resolve, _reject) => {
    //               // 请求数据加密
    //               if (requestEncryptHook && isFunction(requestEncryptHook)) {
    //                 conf = requestEncryptHook(conf, requestSecurityInfo)
    //               }
    //               this.axiosInstance
    //                 .request<any, AxiosResponse<Result>>(conf)
    //                 .then((res: AxiosResponse<Result>) => {
    //                   if (responseDecryptHook && isFunction(responseDecryptHook)) {
    //                     res = responseDecryptHook(res, requestSecurityInfo)
    //                   }
    //                   if (transformRequestHook && isFunction(transformRequestHook)) {
    //                     try {
    //                       const ret = transformRequestHook(res, opt)
    //                       resolve(ret)
    //                     } catch (err) {
    //                       reject(err || new Error('request error!'))
    //                     }
    //                     return
    //                   }
    //                   resolve(res as unknown as Promise<T>)
    //                 })
    //                 .catch((e: Error) => {
    //                   if (requestCatchHook && isFunction(requestCatchHook)) {
    //                     reject(requestCatchHook(e, opt))
    //                     return
    //                   }
    //                   reject(e)
    //                 })
    //             })
    //           } else {
    //             reject(new Error('request error!'))
    //           }
    //         })
    //         .catch((e: Error) => {
    //           reject(e)
    //         })
    //     })
    //   } else {
    //     requestSecurityInfo = Object.assign(requestSecurityInfo, securityData)
    //   }
    // }
    return new Promise((resolve, reject) => {
      // 请求数据加密
      // if (requestEncryptHook && isFunction(requestEncryptHook)) {
      //   conf = requestEncryptHook(conf, requestSecurityInfo)
      // }
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // if (responseDecryptHook && isFunction(responseDecryptHook)) {
          //   res = responseDecryptHook(res, requestSecurityInfo)
          // }
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          reject(e)
        })
    })
  }
}

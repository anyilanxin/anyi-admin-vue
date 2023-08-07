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
 -->
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
 -->
<!--
 * Copyright (c) 2021-present ZHOUXUANHONG(安一老厨)<anyilanxin@aliyun.com>
 *
 * 本软件 AnYi Cloud Vue EE为商业授权软件。未经过商业授权禁止使用，违者必究。
 *
 * AnYi Cloud Vue EE为商业授权软件，您在使用过程中，需要注意以下几点：
 *   1.不允许在国家法律法规规定的范围外使用，如出现违法行为作者本人不承担任何责任；
 *   2.软件使用的第三方依赖皆为开源软件，如需要修改第三方依赖请遵循第三方依赖附带的开源协议，因擅自修改第三方依赖所引起的争议，作者不承担任何责任；
 *   3.不得基于AnYi Cloud EE Vue的基础，修改包装而成一个与AnYi Cloud EE、AnYi Zeebe EE、AnYi Standalone EE功能类似的程序，进行销售或发布，参与同类软件产品市场的竞争；
 *   4.不得将软件源码以任何开源方式公布出去；
 *   5.不得对授权进行出租、出售、抵押或发放子许可证；
 *   6.您可以直接使用在自己的网站或软件产品中，也可以集成到您自己的商业网站或软件产品中进行出租或销售；
 *   7.您可以对上述授权软件进行必要的修改和美化，无需公开修改或美化后的源代码；
 *   8.本软件中使用了bpmn js,使用请遵循bpmn.io开源协议：
 *     https://github.com/bpmn-io/bpmn-js/blob/develop/LICENSE
 *   9.除满足上面条款外，在其他商业领域使用不受影响。同时作者为商业授权使用者在使用过程中出现的纠纷提供协助。
 -->
<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent, ref, computed, unref } from 'vue'
import { BASIC_LOGIN_PATH } from '@anyi/coreconstants'
import { useRoute } from 'vue-router'
import { useI18n } from '@anyi/corelocale'
import { createNamespace } from '@anyi/coreutils/src/bem'
import notDataSvg from '@/assets/svg/no-data.svg'
import netWorkSvg from '@/assets/svg/net-error.svg'

/**
 * Exception related enumeration
 */
enum ExceptionEnum {
  // page not access
  PAGE_NOT_ACCESS = 403,

  // page not found
  PAGE_NOT_FOUND = 404,

  // error
  ERROR = 500,

  // net work error
  NET_WORK_ERROR = 10000,

  // No data on the page. In fact, it is not an exception page
  PAGE_NOT_DATA = 10100,
}

interface MapValue {
  title: string
  subTitle: string
  btnText?: string
  icon?: string
  handler?: AnyFunction<any>
  status?: string
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },

    title: {
      type: String as PropType<string>,
      default: '',
    },

    subTitle: {
      type: String as PropType<string>,
      default: '',
    },

    full: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>())

    const { query } = useRoute()
    const go = function (_arg?: any) {}
    const redo = function (_arg?: any) {}
    const { t } = useI18n()
    const { bem } = createNamespace('app-exception-page')

    const getStatus = computed(() => {
      const { status: routeStatus } = query
      const { status } = props
      return Number(routeStatus) || status
    })

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue
    })

    const backLoginI18n = t('sys.exception.backLogin')
    const backHomeI18n = t('sys.exception.backHome')

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: '403',
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: t('sys.exception.subTitle403'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(BASIC_LOGIN_PATH) : go()),
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: '404',
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: t('sys.exception.subTitle404'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(BASIC_LOGIN_PATH) : go()),
    })

    unref(statusMapRef).set(ExceptionEnum.ERROR, {
      title: '500',
      status: `${ExceptionEnum.ERROR}`,
      subTitle: t('sys.exception.subTitle500'),
      btnText: backHomeI18n,
      handler: () => go(),
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
      title: t('sys.exception.noDataTitle'),
      subTitle: '',
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: notDataSvg,
    })

    unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
      title: t('sys.exception.networkErrorTitle'),
      subTitle: t('sys.exception.networkErrorSubTitle'),
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: netWorkSvg,
    })

    return () => {
      const { title, subTitle, btnText, icon, handler, status } = unref(getMapValue) || {}

      // const img = () => (icon ? <img src={icon} /> : null)

      return (
        <VbenResult
          class={bem() + ' m-4'}
          status={status as any}
          title={props.title || title}
          description={props.subTitle || subTitle}
        >
          {{
            footer: () =>
              btnText && (
                <VbenButton type="primary" onClick={handler}>
                  {() => btnText}
                </VbenButton>
              ),
            icon: () => (icon ? <img src={icon} /> : null),
          }}
        </VbenResult>
      )
    }
  },
})
</script>
<style lang="less">
.app-exception-page {
  display: flex;
  align-items: center;
  flex-direction: column;

  .ant-result-icon {
    img {
      max-width: 400px;
      max-height: 300px;
    }
  }
}
</style>

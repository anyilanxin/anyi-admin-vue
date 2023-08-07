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



<script lang="ts" setup>
import { RouteLocationMatched, useRouter } from '@anyi/router'
import { useAppConfig } from '@anyi/corehooks'
import { getTheme } from '@anyi/coreutils'
import { ref, unref, watchEffect, computed } from 'vue'
import { useI18n } from '@anyi/corelocale'
import { useGo } from '@anyi/corehooks'
import { useAppTheme } from '@anyi/corehooks'
import { filterTree, isString } from '@anyi/coreutils'
import { REDIRECT_NAME } from '@anyi/coreconstants'
import { VbenIconify } from '@anyi/vbencomponents'
import AnYiDropdown from './AnYiDropdown.vue'
import { Menu } from '@anyi/coretypes'
import { getAllParentPath, getMenus } from '@anyi/router'
const { currentRoute } = useRouter()
const { isDark } = useAppTheme()
const { header } = useAppConfig()

const { t } = useI18n()
const go = useGo()

const routes = ref<any[]>([])

const getStyles = computed(() => {
  const styles = {}
  if (!unref(isDark)) {
    if (getTheme(unref(header).bgColor) == 'dark') {
      styles['--color-text-2'] = 'rgb(255 254 254 / 70%)'
      styles['--color-text-1'] = '#fff'
    } else {
      styles['--color-text-2'] = 'rgb(78 89 106)'
      styles['--color-text-1'] = 'rgba(0,0,0,.85)'
    }
  }
  return styles
})

watchEffect(async () => {
  if (currentRoute.value.name === REDIRECT_NAME) return
  const menus = await getMenus()

  const routeMatched = currentRoute.value.matched
  const cur = routeMatched?.[routeMatched.length - 1]
  let path = currentRoute.value.path

  if (cur && cur?.meta?.currentActiveMenu) {
    path = cur.meta.currentActiveMenu as string
  }

  const parent = getAllParentPath(menus, path)
  const filterMenus = menus.filter((item) => item.path === parent[0])
  const matched = getMatched(filterMenus, parent) as any
  if (!matched || matched.length === 0) return

  const breadcrumbList = filterItem(matched)

  if (currentRoute.value.meta?.currentActiveMenu) {
    breadcrumbList.push({
      ...currentRoute.value,
      label: currentRoute.value.name,
    } as unknown as RouteLocationMatched)
  }
  routes.value = breadcrumbList
})

function getMatched(menus: Menu[], parent: string[]) {
  const matched: Menu[] = []

  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      matched.push(item)
    }

    if (item.children?.length) {
      matched.push(...getMatched(item.children, parent))
    }
  })
  return matched
}

function filterItem(list: RouteLocationMatched[]) {
  return filterTree(list, (item: any) => {
    const { meta, name } = item
    item['label'] = t(meta.title)
    if (!meta) {
      return !!name
    }
    const { title, hideBreadcrumb, hideMenu } = meta
    if (!title || hideBreadcrumb || hideMenu) {
      return false
    }
    return true
  }).filter((item) => !item.meta?.hideBreadcrumb)
}

const handleClick = (path: string, route: any) => {
  const { children, redirect, meta } = route

  if (children?.length && !redirect) {
    return
  }
  if (meta?.carryParam) {
    return
  }

  if (redirect && isString(redirect)) {
    go(redirect)
  } else {
    path = /^\//.test(path) ? path : `/${path}`
    go(path)
  }
}
</script>
<template>
  <a-breadcrumb
    v-if="header.showBreadCrumb"
    class="anyi-layout-breadcrumb"
    :max-count="2"
    :style="getStyles"
    @select="handleClick"
  >
    <a-breadcrumb-item key-field="path" size="small" v-for="(route, index) in routes" :key="index">
      <VbenIconify
        class="v-middle"
        :icon="route.icon"
        v-if="route.icon && header.showBreadCrumbIcon"
      />
      <span class="mr-1.2 ml-1.2">{{ t(route.meta.title) }}</span>
      <template #droplist v-if="route.children && route.children.length > 0">
        <AnYiDropdown v-for="item in route.children" :item="item" :click="handleClick" />
      </template>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<style lang="less">
.anyi-layout-breadcrumb {
  margin-left: 5px;
}
</style>

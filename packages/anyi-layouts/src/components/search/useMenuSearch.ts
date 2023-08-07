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
 */
import { ref, unref, Ref, nextTick, onMounted } from 'vue'
import { cloneDeep, filterTree, forEachTree, useDebounceFn, onKeyStroke } from '@anyi/coreutils'
import { useI18n } from '@anyi/corelocale'
import { useGo, useScrollTo } from '@anyi/corehooks'
import { context } from '../../../bridge'

export interface SearchResult {
  name: string
  path: string
  icon?: string
}

// interface ChangeEvent extends Event {
//   target: HTMLInputElement
// }

// Translate special characters
function transform(c: string) {
  const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|']
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key: string) {
  const keys = [...key].map((item) => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export function useMenuSearch(refs: Ref<HTMLElement[]>, scrollWrap: Ref<ElRef>, emit: any) {
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  let menuList: Array<any> = []

  const { t } = useI18n()
  const go = useGo()
  const handleSearch = useDebounceFn(search, 200)

  onMounted(async () => {
    const list = await context.getMenus()

    menuList = cloneDeep(list)
    forEachTree(menuList, (item) => {
      item.name = t(item.name)
    })
  })

  function search(e: string) {
    const key = e
    keyword.value = key.trim()
    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filterTree(menuList, (item) => {
      return reg.test(t(item.title)) && !item.hideMenu
    })
    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  function handlerSearchResult(filterMenu: any[], reg: RegExp, parent?: any) {
    const ret: SearchResult[] = []
    filterMenu.forEach((item) => {
      const { name, path, icon, children, hideMenu, meta } = item
      if (!hideMenu && reg.test(name) && (!children?.length || meta?.hideChildrenInMenu)) {
        ret.push({
          name: parent?.name ? `${parent.name} > ${name}` : name,
          path,
          icon,
        })
      }
      if (!meta?.hideChildrenInMenu && Array.isArray(children) && children.length) {
        ret.push(...handlerSearchResult(children, reg, item))
      }
    })
    return ret
  }

  // Activate when the mouse moves to a certain line
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // Arrow key up
  function handleUp() {
    if (!searchResult.value.length) return
    activeIndex.value--
    if (activeIndex.value < 0) {
      activeIndex.value = searchResult.value.length - 1
    }
    handleScroll()
  }

  // Arrow key down
  function handleDown() {
    if (!searchResult.value.length) return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1) {
      activeIndex.value = 0
    }
    handleScroll()
  }

  // When the keyboard up and down keys move to an invisible place
  // the scroll bar needs to scroll automatically
  function handleScroll() {
    const refList = unref(refs)
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap)) {
      return
    }

    const index = unref(activeIndex)
    const currentRef = refList[index]
    if (!currentRef) {
      return
    }
    const wrapEl = unref(scrollWrap)
    if (!wrapEl) {
      return
    }
    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.offsetHeight
    const { start } = useScrollTo({
      el: wrapEl,
      duration: 100,
      to: scrollHeight - wrapHeight,
    })
    start()
  }

  // enter keyboard event
  async function handleEnter() {
    if (!searchResult.value.length) {
      return
    }
    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0) {
      return
    }
    const to = result[index]
    handleClose()
    await nextTick()
    go(to.path)
  }

  // close search modal
  function handleClose() {
    searchResult.value = []
    emit('close')
  }

  // enter search
  onKeyStroke('Enter', handleEnter)
  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)
  // esc close
  onKeyStroke('Escape', handleClose)

  return {
    handleSearch,
    searchResult,
    keyword,
    activeIndex,
    handleMouseenter,
    handleEnter,
  }
}

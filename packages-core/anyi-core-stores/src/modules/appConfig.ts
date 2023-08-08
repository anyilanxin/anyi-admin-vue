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
import { defineStore } from 'pinia'
import {
  ContentConfigOptions,
  DefineAppConfigOptions,
  FooterConfigOptions,
  HeaderConfigOptions,
  LogoConfigOptions,
  MenuConfigOptions,
  SidebarConfigOptions,
  TabTbrConfigOptions,
  TransitionConfigOptions,
} from '@anyi/coretypes'
import { _assign } from '@anyi/coreutils'
import {
  CacheTypeEnum,
  ContentLayoutEnum,
  HEADER_PRESET_BG_COLOR_LIST,
  MenuModeEnum,
  MixSidebarTriggerEnum,
  NavBarModeEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  SIDE_BAR_BG_COLOR_LIST,
  ThemeEnum,
  TriggerEnum,
} from '@anyi/coreconstants'

export const useAppConfig = defineStore({
  id: 'APP_CONFIG',
  state: (): DefineAppConfigOptions => ({
    theme: ThemeEnum.LIGHT,
    navBarMode: NavBarModeEnum.SIDEBAR,
    themeColor: '#165DFF',
    showThemeModeToggle: true,
    openKeepAlive: true,
    useOpenBackTop: true,
    closeMessageOnSwitch: false,
    removeAllHttpPending: true,
    permissionCacheType: CacheTypeEnum.LOCAL,
    settingButtonPosition: SettingButtonPositionEnum.AUTO,
    openSettingDrawer: false,
    permissionMode: PermissionModeEnum.ROUTE_MAPPING, // 更改模式
    sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
    grayMode: false,
    colorWeak: false,
    lockTime: 0,
    useLockPage: false,
    canEmbedIFramePage: true,
    closeMixSidebarOnChange: false,
    sidebar: {
      theme: ThemeEnum.LIGHT,
      show: true,
      visible: true,
      bgColor: SIDE_BAR_BG_COLOR_LIST[0],
      fixed: false,
      width: 210,
      mixSidebarWidth: 80,
      collapsedWidth: 50,
      collapsed: false,
      trigger: TriggerEnum.CENTER,
    },
    menu: {
      canDrag: false,
      split: false,
      mode: MenuModeEnum.VERTICAL,
      accordion: false,
      collapsedShowTitle: false,
      mixSideTrigger: MixSidebarTriggerEnum.CLICK,
      mixSideFixed: false,
      topMenuAlign: 'start',
      dropdownPlacement: 'top-start',
      subMenuWidth: 0,
    },
    header: {
      theme: ThemeEnum.DARK,
      show: true,
      visible: true,
      bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
      fixed: false,
      height: 48,
      showDoc: true,
      showBreadCrumb: true,
      showBreadCrumbIcon: true,
      showFullScreen: true,
      showNotice: true,
      showBannerNotice: true,
      showSearch: true,
      showLocalePicker: true,
      showSetting: true,
    },
    logo: {
      show: true,
      visible: true,
      showTitle: true,
    },
    tabTar: {
      show: true,
      tabType: 'rounded',
      visible: true,
      height: 36,
      cache: true,
      canDrag: false,
      showFold: true,
      showQuick: true,
      showRedo: true,
    },
    content: {
      fullScreen: false,
      mode: ContentLayoutEnum.FULL,
    },
    footer: {
      height: 60,
      show: false,
      visible: false,
    },
    transition: {
      enable: true,
      basicTransition: RouterTransitionEnum.FADE_SIDE,
      openPageLoading: true,
      openNProgress: false,
    },
  }),
  getters: {
    isSidebar: (state) => state.navBarMode === NavBarModeEnum.SIDEBAR,
    isTopMenu: (state) => state.navBarMode === NavBarModeEnum.TOP_MENU,
    isMixSidebar: (state) => state.navBarMode === NavBarModeEnum.MIX_SIDEBAR,
    isMix: (state) => state.navBarMode === NavBarModeEnum.MIX,
    isHorizontal: (state) => state.menu.mode === MenuModeEnum.HORIZONTAL,
    getTabTarCache: (state) => state.tabTar.cache,
  },
  actions: {
    setTheme(value: ThemeEnum) {
      this.theme = value
    },
    setNavBarMode(value: NavBarModeEnum) {
      this.navBarMode = value
    },
    setThemeColor(value: string) {
      this.themeColor = value
    },
    setShowThemeModeToggle(value: boolean) {
      this.showThemeModeToggle = value
    },
    setOpenKeepAlive(value: boolean) {
      this.openKeepAlive = value
    },
    setUseOpenBackTop(value: boolean) {
      this.useOpenBackTop = value
    },
    setCloseMessageOnSwitch(value: boolean) {
      this.closeMessageOnSwitch = value
    },
    setRemoveAllHttpPending(value: boolean) {
      this.removeAllHttpPending = value
    },
    setPermissionCacheType(value: CacheTypeEnum) {
      this.permissionCacheType = value
    },
    setSettingButtonPosition(value: SettingButtonPositionEnum) {
      this.settingButtonPosition = value
    },
    setOpenSettingDrawer(value: boolean) {
      this.openSettingDrawer = value
    },
    setPermissionMode(value: PermissionModeEnum) {
      this.permissionMode = value
    },
    setSessionTimeoutProcessing(value: SessionTimeoutProcessingEnum) {
      this.sessionTimeoutProcessing = value
    },
    setGrayMode(value: boolean) {
      this.grayMode = value
    },
    setColorWeak(value: boolean) {
      this.colorWeak = value
    },
    setLockTime(value: number) {
      this.lockTime = value
    },
    setUseLockPage(value: boolean) {
      this.useLockPage = value
    },
    setCanEmbedIFramePage(value: boolean) {
      this.canEmbedIFramePage = value
    },
    setSidebar(value: Partial<Omit<SidebarConfigOptions, 'mixSidebarWidth' | 'collapsedWidth'>>) {
      _assign(this.sidebar, value)
    },
    setMenu(value: Partial<MenuConfigOptions>) {
      _assign(this.menu, value)
    },
    setHeader(value: Partial<Omit<HeaderConfigOptions, 'height'>>) {
      _assign(this.header, value)
    },
    setLogo(value: Partial<LogoConfigOptions>) {
      _assign(this.logo, value)
    },
    setTabTar(value: Partial<TabTbrConfigOptions>) {
      _assign(this.tabTar, value)
    },
    setContent(value: Partial<ContentConfigOptions>) {
      _assign(this.content, value)
    },
    setFooter(value: Partial<Omit<FooterConfigOptions, 'height'>>) {
      _assign(this.footer, value)
    },
    setTransition(value: Partial<TransitionConfigOptions>) {
      _assign(this.transition, value)
    },
  },
  persist: {
    // excludedPaths: ['openSettingDrawer'], // Temporarily invalid
    paths: [
      'theme',
      'navBarMode',
      'themeColor',
      'showThemeModeToggle',
      'openKeepAlive',
      'useOpenBackTop',
      'closeMessageOnSwitch',
      'removeAllHttpPending',
      'permissionCacheType',
      'settingButtonPosition',
      'permissionMode',
      'sessionTimeoutProcessing',
      'grayMode',
      'colorWeak',
      'lockTime',
      'useLockPage',
      'canEmbedIFramePage',
      'sidebar',
      'menu',
      'header',
      'logo',
      'tabTar',
      'content',
      'footer',
      'transition',
    ],
  },
})

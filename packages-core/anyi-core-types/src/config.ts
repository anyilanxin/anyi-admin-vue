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
import {
  CacheTypeEnum,
  ContentLayoutEnum,
  MenuModeEnum,
  NavBarModeEnum,
  MixSidebarTriggerEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
  TriggerEnum,
  RouterTransitionEnum,
} from '@anyi/coreconstants'

export type LocaleType = 'zh_CN' | 'en'

export interface LocaleConfig {
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}

export interface StaticConfig {
  /**
   * Permission Type:
   * frontend: indicates that permissions are controlled by the front end
   * backend: indicates that the permissions are controlled by the backend
   */
  authType: 'frontend' | 'backend'

  // Display a progress bar at the top when switching pages
  enableProgress: boolean
}

export interface DynamicConfig {
  __: string
}

export interface GlobConfig {
  // Site title
  title: string
  // Service interface url
  apiUrl: string
  // Project abbreviation
  shortName: string
  // request timeout
  timeout?: number
  // 是否开启数据传输加密
  openDataEncryption: boolean
  // 获取密钥地址
  securityApi: string
  // 是否刷新密钥
  refresh: boolean
  // 密钥刷新时间(s)
  refreshTime: number
  // 灰度开关
  enableGray: boolean
  // 灰度信息地址读取开关(灰度开关打开时有效)
  addressGray: boolean
  // 关闭websocket
  openSocket: boolean
  // socket 地址
  socketApi: string
  // 系统编码
  systemCode: string
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // request timeout
  VITE_GLOB_REQUEST_TIMEOUT?: number
  // 是否开启数据传输加密
  VITE_GLOB_DATA_ENCRYPTION: boolean
  // 获取密钥api
  VITE_GLOB_DATA_ENCRYPTION_URL: string
  // 是否开启数据传输加密密钥刷新
  VITE_GLOB_DATA_ENCRYPTION_REFRESH: boolean
  // 数据传输加密密钥刷新时间(单位s)
  VITE_GLOB_DATA_ENCRYPTION_REFRESH_TIME: number
  // 灰度开关
  VITE_GLOB_ENABLE_GRAY: boolean
  // 灰度信息地址读取开关(灰度开关打开时有效)
  VITE_GLOB_ADDRESS_GRAY: boolean
  // open websocket
  VITE_GLOB_OPEN_SOCKET: boolean
  // socket地址
  VITE_GLOB_SOCKET_URL: string
  // 系统编码
  VITE_GLOB_SYSTEM_CODE: string
}

export interface DefineAppConfigOptions {
  // Navigation bar mode
  navBarMode: NavBarModeEnum
  // Theme
  theme: ThemeEnum
  // Theme color
  themeColor: string
  // Whether to show the theme switch button
  showThemeModeToggle: boolean
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean
  // Whether to open back to top
  useOpenBackTop: boolean
  // Is it possible to embed iframe pages
  canEmbedIFramePage: boolean
  // Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean
  closeMixSidebarOnChange: boolean
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum
  // Configuration setting drawer open
  openSettingDrawer: boolean
  // Permission mode
  permissionMode: PermissionModeEnum
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // Website gray mode, open for possible mourning dates
  grayMode: boolean
  // Whether to turn on the color weak mode
  colorWeak: boolean
  // Lock screen time
  lockTime: number
  // Whether to show the lock screen
  useLockPage: boolean
  sidebar: SidebarConfigOptions
  menu: MenuConfigOptions
  header: HeaderConfigOptions
  logo: LogoConfigOptions
  tabTar: TabTbrConfigOptions
  content: ContentConfigOptions
  footer: FooterConfigOptions
  transition: TransitionConfigOptions
}

export interface SidebarConfigOptions {
  theme: ThemeEnum
  show: boolean
  visible: boolean
  fixed: boolean
  bgColor: string
  collapsed: boolean
  width: number
  trigger: TriggerEnum
  readonly mixSidebarWidth: number
  readonly collapsedWidth: number
}
export interface MenuConfigOptions {
  canDrag: boolean
  split: boolean
  mode: MenuModeEnum
  accordion: boolean
  collapsedShowTitle: boolean
  mixSideTrigger: MixSidebarTriggerEnum
  mixSideFixed: boolean
  topMenuAlign: 'start' | 'center' | 'end'

  subMenuWidth: number
  dropdownPlacement:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
}

export interface HeaderConfigOptions {
  theme: ThemeEnum
  show: boolean
  visible: boolean
  bgColor: string
  fixed: boolean
  showFullScreen: boolean
  showDoc: boolean
  showNotice: boolean
  showSearch: boolean
  showLocalePicker: boolean
  showSetting: boolean
  readonly height: number
  // Show breadcrumbs
  showBreadCrumb: boolean
  // Show breadcrumb icon
  showBreadCrumbIcon: boolean
}

export interface LogoConfigOptions {
  show: boolean
  visible: boolean
  showTitle: boolean
}

export interface TabTbrConfigOptions {
  show: boolean
  visible: boolean
  cache: boolean
  canDrag: boolean
  showQuick: boolean
  showRedo: boolean
  showFold: boolean
  readonly height: number
}

export interface ContentConfigOptions {
  fullScreen: boolean
  mode: ContentLayoutEnum
}

export interface FooterConfigOptions {
  show: boolean
  visible: boolean
  readonly height: number
}

export interface TransitionConfigOptions {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface FooterLinkOptions {
  label?: string
  icon?: string
  target?: '_self' | '_blank'
  url: string
}
export interface DefineSiteGeneralOptions {
  // Logo url
  logo: string
  // Site title
  title: string
  // Copyright Information
  copyright: string
  // Footer link
  links: FooterLinkOptions[]
  // Avatar url
  avatar: string
  // username
  username: string
}

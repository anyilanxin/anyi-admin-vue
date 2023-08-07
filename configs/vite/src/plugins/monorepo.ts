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
import type { Alias, ConfigEnv, Plugin, UserConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import glob from 'fast-glob'
import { TreeNode } from '@anyi/coreutils'
import { find, split, join, isEmpty } from 'lodash-es'
import { bold, cyan, gray, green } from 'picocolors'

export type Options = Omit<Alias, 'customResolver'>
/** Cache for package.json resolution and package.json contents */
export type PackageCache = Map<string, PackageData>
export interface PackageData {
  dir: string
  componentCache: TreeNode<string>
  data: {
    [field: string]: any
    name: string
    type: string
    version: string
    main: string
    module: string
    browser: string | Record<string, string | false>
    exports: string | Record<string, any> | string[]
    imports: Record<string, any>
    dependencies: Record<string, string>
  }
}

export function loadPackageData(pkgPath: string): PackageData {
  const data = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  const pkgDir = path.dirname(pkgPath)
  const pkg: PackageData = {
    dir: pkgDir,
    componentCache: new TreeNode<string>(),
    data,
  }
  return pkg
}

export function findNearestPackageData(
  basedir: string,
  packageCache?: PackageCache,
): PackageData | null {
  const originalBasedir = basedir
  while (basedir) {
    if (packageCache) {
      const cached = getFnpdCache(packageCache, basedir, originalBasedir)
      if (cached) return cached
    }

    const pkgPath = path.join(basedir, 'package.json')
    try {
      if (fs.statSync(pkgPath, { throwIfNoEntry: false })?.isFile()) {
        const pkgData = loadPackageData(pkgPath)

        if (packageCache) {
          setFnpdCache(packageCache, pkgData, basedir, originalBasedir)
        }

        return pkgData
      }
    } catch {}

    const nextBasedir = path.dirname(basedir)
    if (nextBasedir === basedir) break
    basedir = nextBasedir
  }

  return null
}

/**
 * Get cached `findNearestPackageData` value based on `basedir`. When one is found,
 * and we've already traversed some directories between `basedir` and `originalBasedir`,
 * we cache the value for those in-between directories as well.
 *
 * This makes it so the fs is only read once for a shared `basedir`.
 */
function getFnpdCache(packageCache: PackageCache, basedir: string, originalBasedir: string) {
  const cacheKey = getFnpdCacheKey(basedir)
  const pkgData = packageCache.get(cacheKey)
  if (pkgData) {
    traverseBetweenDirs(originalBasedir, basedir, (dir) => {
      packageCache.set(getFnpdCacheKey(dir), pkgData)
    })
    return pkgData
  }
}

function setFnpdCache(
  packageCache: PackageCache,
  pkgData: PackageData,
  basedir: string,
  originalBasedir: string,
) {
  packageCache.set(getFnpdCacheKey(basedir), pkgData)
  traverseBetweenDirs(originalBasedir, basedir, (dir) => {
    packageCache.set(getFnpdCacheKey(dir), pkgData)
  })
}

// package cache key for `findNearestPackageData`
function getFnpdCacheKey(basedir: string) {
  return `fnpd_${basedir}`
}

/**
 * Traverse between `longerDir` (inclusive) and `shorterDir` (exclusive) and call `cb` for each dir.
 * @param longerDir Longer dir path, e.g. `/User/foo/bar/baz`
 * @param shorterDir Shorter dir path, e.g. `/User/foo`
 */
function traverseBetweenDirs(longerDir: string, shorterDir: string, cb: (dir: string) => void) {
  while (longerDir !== shorterDir) {
    cb(longerDir)
    longerDir = path.dirname(longerDir)
  }
}

/**
 * 创建别名解析规则
 *
 * @param config
 * @param env
 * @param options
 * @returns
 */
export const createAlias = (config: UserConfig, env: ConfigEnv, options: Options): Alias => {
  return {
    ...options,
    customResolver(updatedId, importerId, _resolveOptions) {
      const pkgData = findNearestPackageData(importerId || '')
      if (!pkgData) {
        throw new Error(`MonoRepoResolverPlugin can not resolve Module from: ${importerId}`)
      }
      // 组件包路径
      let pkgPath = pkgData.dir
      const dirPath = path.parse(pkgPath)
      let baseRoot = dirPath.root
      if (baseRoot) {
        // 处理Root路径
        if (process.platform === 'win32') {
          // E://aaa/bbb/
          // baseRoot = E:
          baseRoot = baseRoot.replace(path.sep, '')
          // //aaa//bbb
          pkgPath = pkgPath.replace(baseRoot, '')
          // baseRoot = E:/
          baseRoot = baseRoot + '/'
        }
      }
      // Pkg的根路径分割结果
      const paths = split(pkgPath, path.sep).filter((p) => p !== '')
      // 分割别名对应的相对路径路径。代码实际导入的时候都会使用'/'，不需要使用Path.seg
      const componentPaths = split(updatedId, '/').filter((p) => p !== '')
      const componentNode = pkgData.componentCache.findByPath(componentPaths, true)
      if (componentNode) {
        if (isEmpty(componentNode.val)) {
          let realPath
          const componentPath = baseRoot + join([...paths, ...componentPaths], '/')
          if (fs.existsSync(componentPath)) {
            // import路径存在，确定是文件还是文件夹，分别处理
            if (fs.statSync(componentPath).isDirectory()) {
              // 如果导入的是文件夹，文件加载应该有index.xxx的入口文件
              const components = glob.sync(`${componentPath}/index.*`, {
                onlyFiles: true,
                deep: 1,
                caseSensitiveMatch: false,
              })
              if (components.length === 1) {
                realPath = components[0]
              } else {
                // vue和(js|ts)同时存在优先(js|ts)
                const fileTsOrJs = find(components, (c) => c.endsWith('.ts') || c.endsWith('.js'))
                if (fileTsOrJs) {
                  realPath = fileTsOrJs
                } else {
                  throw new Error(
                    `MonoRepoResolverPlugin can not resolve Module <${updatedId}> at: ${importerId}, find ${
                      components.length === 0 ? 'none' : 'multiple'
                    } files at: ${componentPath}/index.(ts|js), please check it. components: ${components}`,
                  )
                }
              }
            } else {
              // 如果导入的是文件，直接使用
              realPath = componentPath
            }
          } else {
            // import文件不存在，需要进一步处理，尝试直接搜索相关文件
            const components = glob.sync(`${componentPath}.*`, {
              onlyFiles: true,
              deep: 1,
              caseSensitiveMatch: false,
              cwd: path.resolve(componentPath, '../'),
            })
            if (components.length === 1) {
              realPath = components[0]
            } else {
              throw new Error(
                `MonoRepoResolverPlugin can not resolve Module <${updatedId}> at: ${importerId}, find ${
                  components.length === 0 ? 'none' : 'multiple'
                } files at: ${componentPath}, please check it. components: ${components}`,
              )
            }
          }
          componentNode.val = realPath
          console.debug(
            `${bold(cyan('[MonoRepoResolverPlugin]'))} ${green(
              `resolve Component from "${updatedId}" to ${realPath} at:`,
            )} ${gray(importerId)}`,
          )
        }
        return componentNode.val
      } else {
        throw new Error(
          `MonoRepoResolverPlugin can not resolve Module at: ${importerId}, cache module tree is empty`,
        )
      }
    },
  }
}
/**
 * 导出Vite插件
 *
 * @param rawOptions
 * @returns
 */
export default function configMonoRepoResolverPlugin(
  rawOptions: Options = {
    find: '#',
    replacement: 'src',
  },
): Plugin {
  return {
    name: 'MonoRepoResolver',
    config: (config, env) => ({
      resolve: {
        alias: [createAlias(config, env, rawOptions)],
      },
    }),
  }
}

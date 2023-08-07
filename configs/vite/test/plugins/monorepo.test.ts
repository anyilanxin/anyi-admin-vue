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
import { expect, test, describe } from 'vitest';
import path from 'path';
import { createAlias, findNearestPackageData } from '../../src/plugins/monorepo';
import { ResolverFunction } from 'vite';

const buildTestPkgPath = (pkgRoot: string = process.cwd()) => {
  const demoPkgPath = path.resolve(pkgRoot, './configs/vite/test/plugins/testpkg')
  return [
    demoPkgPath,
    path.resolve(demoPkgPath, './index.ts')
  ]
}

describe('findNearestPackageData无法获取包', async () => {
  test('findNearestPackageData无法获取包', () => {
    const importerId = path.resolve('/', './not_exist')
    const ret = findNearestPackageData(importerId);
    expect(ret).toBeNull()
  })
})

describe('【测试MonoRepoResolverPlugin】', () => {
  test(`正常创建alias`, async () => {
    const aliasConfig = createAlias({}, { command: 'serve', mode: 'test' }, {
      find: '#',
      replacement: 'src'
    });
    expect(aliasConfig).toBeTruthy()
    expect(aliasConfig.customResolver).toBeTypeOf('function')
  })
  
  const aliasConfig = createAlias({}, { command: 'serve', mode: 'test' }, {
    find: '#',
    replacement: 'src'
  });
  const customResolver = aliasConfig.customResolver as ResolverFunction

  describe('测试customResolver解析组件路径', () => {
    test(`正常解析testpkg/src/test的形式`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/test', importerId, null)).contains('test/plugins/testpkg/src/test.ts')
    })

    test(`正常解析testpkg/src/test.ts的形式`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/test.ts', importerId, null)).contains('test/plugins/testpkg/src/test.ts')
    })

    test(`组件中存在index.ts和index.vue, 解析到index.ts`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/vue&ts', importerId)).contains('testpkg/src/vue&ts/index.ts')
    })

    test('单个Vue文件的解析', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/SingleVue', importerId)).contains('test/plugins/testpkg/src/SingleVue.vue')
    })
    
    test('文件夹下index.vue文件的解析', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/justvue', importerId)).contains('test/plugins/testpkg/src/justvue/index.vue')
    })
    
    test('匹配组件文件夹的时候忽略大小写', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/casesensitive', importerId)).contains('test/plugins/testpkg/src/casesensitive/index.ts')
    })

    test('匹配组件文件的时候忽略大小写', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/singleCasesensitive', importerId)).contains('test/plugins/testpkg/src/singleCaseSensitive.vue')
    })

    test('匹配组件index的时候忽略大小写', async () => {
      const [, importerId] = buildTestPkgPath()
      expect(customResolver.call(null, 'src/upcaseindex', importerId)).contains('test/plugins/testpkg/src/upcaseindex/Index.ts')
    })

    test(`找不到组件`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(() => customResolver.call(null, 'src/notfound', importerId)).toThrowError(/find none files at/)
    })

    test(`找到不认识格式的组件`, async () => {
      const [, importerId] = buildTestPkgPath()
      expect(() => customResolver.call(null, 'src/notype', importerId)).toThrowError(/\/index.\(ts\|js\), please check it./)
    })
})

  describe('测试包内互相引用', () => {
    test('测试test.ts中解析vue&ts的index', () => {
      const [demoPkgPath] = buildTestPkgPath()
      const importerId = path.resolve(demoPkgPath, './src/test.ts')
      expect(customResolver.call(null, 'src/vue&ts', importerId)).contains('testpkg/src/vue&ts/index.ts')
    })
  })
});

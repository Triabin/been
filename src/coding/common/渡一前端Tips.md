---
title: 渡一前端Tips
createTime: 2025/06/04 03:35:46
tags:
  - 前端
  - 渡一
  - css
  - JavaScript
  - html
---

# 渡一前端Tips

来源：见到的所有值得收藏的渡一前端Tips

## 1、封装全屏功能

来源：[https://www.bilibili.com/video/BV1PyJqz2EXD](https://www.bilibili.com/video/BV1PyJqz2EXD)

全屏的API有很多，因此需要考虑兼容性，以下为我根据渡一的原内容扩展的ts版本：

```typescript
// 扩展全局接口解决类型报错
declare global {
  interface HTMLElement {
    mozRequestFullScreen?: (options?: FullscreenOptions) => Promise<void>;
    webkitRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
    msRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
  }

  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element | null;
    webkitFullscreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  }
}

// 安全获取属性名（带类型保护）
function getPropertyName<T extends object>(
  names: (keyof T)[],
  target: T
): keyof T | undefined {
  return names.find(name => name in target);
}

// 单次初始化API名称（解决重复查找问题）
const ENTER_METHOD = getPropertyName([
    'requestFullscreen',
    'mozRequestFullScreen',
    'webkitRequestFullscreen',
    'msRequestFullscreen'
  ] as const, document.documentElement
);

const EXIT_METHOD = getPropertyName([
    'exitFullscreen',
    'mozCancelFullScreen',
    'webkitExitFullscreen',
    'msExitFullscreen'
  ] as const, document
);

const FULLSCREEN_ELEMENT_PROP = getPropertyName([
    'fullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'msFullscreenElement'
  ] as const, document
);

// 进入全屏
async function enter(ele: HTMLElement): Promise<void> {
  if (!ENTER_METHOD) throw new Error('Fullscreen API not supported');
  const method = ele[ENTER_METHOD] as (() => Promise<void>) | undefined;
  method?.call(ele);
}

// 退出全屏
async function exit(): Promise<void> {
  if (!EXIT_METHOD) throw new Error('ExitFullscreen API not supported');
  const method = document[EXIT_METHOD] as (() => Promise<void>) | undefined;
  method?.call(document);
}

// 获取全屏元素
function getFullscreenElement(): Element | null {
  return FULLSCREEN_ELEMENT_PROP
    ? (document as any)[FULLSCREEN_ELEMENT_PROP]
    : null;
}

// 检查全屏状态
function isFull(): boolean {
  return !!getFullscreenElement();
}

// 切换全屏状态
async function toggle(ele: HTMLElement = document.documentElement): Promise<void> {
  isFull() ? await exit() : await enter(ele);
}

// 导出API
export default {
  enter,
  exit,
  toggle,
  isFull
};
```

::: info 使用工具

如果需要快速实现，其实可以考虑使用成熟的工具，例如[screenfull.js](https://github.com/sindresorhus/screenfull)，可直接解决各种兼容性问题。

```typescript
import screenfull from 'screenfull';

// 进入全屏
function enter(ele: HTMLElement) {
  if (screenfull.isEnabled) screenfull.request(ele);
}

// 退出全屏
function exit() {
  if (screenfull.isFullscreen) screenfull.exit();
}
```

:::

## 2、语义化版本

来源：[https://www.bilibili.com/video/BV1anM7z3Em6/](https://www.bilibili.com/video/BV1anM7z3Em6/)

软件管理领域的一个概念，用一个字符串来表达一个软件的版本（号），例如：1.0.3、2.1.0、3.2.1beta、4.5.6-rc60等。

语义化版本基本格式：`x.y.z[-预发布版本号]`

* 规则：

  ① 版本号只能增加，不能减少，即使代码回退到原来版本，版本号也不能回退；

  ② 高位版本号增加以后，低位版本号需要置0。

* `x`：主版本号，发生截断式更新（breaking updates）时，变更主版本号；

  > 截断式更新：更新后旧版本无法兼容，需要用户重新安装。

* `y`：次版本号，兼容旧版本，主要为新增功能、新模块；

* `z`：修订号，修复bug、优化代码等；

* `预发布版本号`（可选）：`-`（`-`号可选）后面跟着的字母，表示该版本还未稳定，可能存在一些问题，例如：`1.0.3alpha`、`1.0.3-beta`、`1.0.3-rc`、`1.0.3-dev`等。

## 3、图片调色盘

来源：[https://www.bilibili.com/video/BV1BfEkzmEuT](https://www.bilibili.com/video/BV1BfEkzmEuT)

功能：根据图片，获取主要配色，例如primary、secondary、accent等。

原理简述：将图片绘制到canvas上，然后统计计算出现次数较多的像素颜色。

细节问题：有时候，人肉眼看上去的颜色与计算机实际统计结果有较大差异，因为人眼分辨的像素差值没有计算机实际计算的像素点差值精确。这就造成了统计信息与感官信息差异，因此需要将一些相近的颜色聚合，这涉及到了**色彩聚合/近似算法**。

实现：
前端有一个现成的库叫做`colorthief`（颜色小偷），用以直接提取颜色。

```typescript
import ColorThief from 'colorthief';

const colorThief = new ColorThief();
// 传入图片img，指定要获取前count中颜色，最终返回每种颜色的RGB值数组
const colors: Array<Array<number>> = await colorThief.getPalette(img, count);
```

## 4、文字智能匹配背景

来源：[https://www.bilibili.com/video/BV18zoCYsETw/](https://www.bilibili.com/video/BV18zoCYsETw/)

文字颜色与背景颜色混淆导致文字显示不清晰时，可以给文字添加样式：

```css
:root {
  mix-blend-mode: difference;
}
```

本质是添加了一个混合，该操作会对受影响的元素每一个显示的像素点与背景颜色进行混合差值运算，从而得到一个新的颜色。上述案例中就是指定了使用差值算法（difference）进行混合运算，差值算法本质就是将自身RGB值分别与背景RGB值相减，从而得到新的RGB值。

```ts
<blend-mode> = 
  normal       |
  multiply     |
  screen       |
  overlay      |
  darken       |
  lighten      |
  color-dodge  |
  color-burn   |
  hard-light   |
  soft-light   |
  difference   |
  exclusion    |
  hue          |
  saturation   |
  color        |
  luminosity 
```

## 5、在vite中自动生成路由

来源：[https://www.bilibili.com/video/BV12NKRzFEu7/]

有如下路由配置：

```javascript
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue'),
    meta: {
      title: '首页',
      menuOrder: 1
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue'),
    meta: {
      title: '关于',
      menuOrder: 10
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/contact/index.vue'),
    meta: {
      title: '联系',
      menuOrder: 20
    }
  }
]
```

路由配置本质上其实是跟目录结构在重复，这种重复的地方，很容易带来维护上的困难，尤其是当路由页面非常非常多的时候，一旦出现变更，维护上较为困难，且这种重复性的东西，能够自动生成是最好的，这样就避免了维护上的困难，例如一处变更，多出修改，单词拼写错误，增减页面只需增删对应页面文件即可等等。

这就是开发中的一种模式，叫做约定大于配置，例如react中的umijs，还有uniapp中也用目录结构代替了路由，但是vite官方和vue-cli中，都没有这些东西，因此只能自己手动实现。

从目录结构来看，目录结构中只缺失了路由对象中的meta字段信息，因此采用微信小程序的解决方案，在每个页面旁边创建一个page.js，在该文件中导出页面相关的一些额外的信息。

首先，要明确，目录结构只存在于编译时，编译打包后的运行时结果中并不存在当前的目录结构，因此要在编译时读取目录结构信息，`import.meta.glob`（vite）或`require.context`（webpack），

```javascript
// 函数需要传入一个参数，改参数为一个pattern，为一个路径匹配规则，读取结果为一个对象，该对象属性名对应匹配文件的路径，属性值对应一个函数，通过调用该函数可以导入该模块
const pages = import.meta.glob('../views/**/page.js', {
  eager: true, // 不需要函数，直接将函数结果（导出的模块）返回
  import: 'default' // 自动获取导出模块中的default导出结果
});

// 获取路由页面对应组件
const components = import.meta.glob('../views/**/index.vue');

// 将该对象转为路由配置
const routes = Object.entries(pages).map(([path, meta]) => {
  const compPath = path.replace('page.js', 'index.vue');
  path = path.replace('../views/', '').replace('/page.js', '') || '/';
  const name = path.split('/').filter(Boolean).join('-') || 'index';
  return {
    path,
    name,
    component: components[compPath], // 注意不能直接使用`import(compPath)`，因为此处获取到的是开发环境里面的路径，生产环境中该路径会丢失，需要在使用import.meta.glob函数获取生产环境的路径
    meta
  };
});
```

如此，这部分代码写完就可以不用再做修改，以后增减页面，只需增删对应页面文件及其配置即可，不用再修改路由配置。

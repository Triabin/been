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


import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "Been留痕",
  description: "人生到处知何似，应似飞鸿踏雪泥。",
  host: '0.0.0.0',
  port: 31001,
  head: [
    ['meta', { name: 'referrer', content: 'no-referrer' }]
  ],
  bundler: viteBundler(),
  theme,
  plugins: [ nodePolyfills() ]
});

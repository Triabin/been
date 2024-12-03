import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  locales: undefined,
  hostname: "https://vuepress-theme-hope-docs-demo.netlify.app",

  author: {
    name: 'Triabin',
    url: 'https://github.com/Triabin',
    email: ''
  },

  license: 'MIT',

  favicon: '/favicon.png',

  // 关键词: "iconify", "fontawesome", "fontawesome-with-brands"
  iconAssets: 'iconify', // https://icon-sets.iconify.design/
    // "fontawesome-with-brands" // https://fontawesome.com/search?o=r&m=free,

  logo: '/logo.png',

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "默认页脚",
  displayFooter: true,

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 在这里配置主题提供的插件
  plugins: {
    components: {
      components: ["Badge", "VPCard"],
    },

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    markdownImage: {
      figure: true,
      lazyload: true,
      size: true,
    },

    markdownMath: {
      // 启用前安装 katex
      type: "katex",
      // 或者安装 mathjax-full
      // type: "mathjax",
    },

    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      component: true,
      demo: true,
      include: true,
      mark: true,
      plantuml: true,
      spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tasklist: true,
      vPre: true,

      // 在启用之前安装 chart.js
      // chart: true,

      // insert component easily

      // 在启用之前安装 echarts
      // echarts: true,

      // 在启用之前安装 flowchart.ts
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // 在启用之前安装 mermaid
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // 在启用之前安装 @vue/repl
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 搜索功能
    searchPro: {
      indexContent: true, // 是否索引内容
      autoSuggestions: true, // 是否自动提示
      // customFields: [
      //   {
      //     getter: (page) => page.frontmatter.tags,
      //     formatter: {
      //       '/': '标签：$content'
      //     }
      //   }
      // ],
      hotKeys: [{ key: "k", ctrl: true }, { key: "/", ctrl: true }], // 快捷键
      queryHistoryCount: 6 // 查询历史记录条数
    },

  }
});

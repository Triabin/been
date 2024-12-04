import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  // 主题基本选项
  hostname: "https://vuepress-theme-hope-docs-demo.netlify.app", // 当前网站部署到的域名。
  // 文章显示的默认作者
  author: {
    name: 'Triabin',
    url: 'https://github.com/Triabin',
    email: ''
  },
  license: 'MIT', // 站点默认协议
  favicon: '/favicon.png', // 网站图标
  iconAssets: 'iconify', // 文章/配置中使用的图标来源，可选值有: "iconify", "fontawesome", "fontawesome-with-brands"

  // 导航栏配置
  navbarLayout: { start: ["Brand"], center: ["Links"], end: ["Language", "Repo", "Outlook", "Search"] },
  logo: '/logo-dark.png',
  logoDark: '/logo.png',
  repo: "Triabin/been",
  repoDisplay: true,
  repoLabel: 'GitHub', // GitHub, Gitlab, Gitee, Bitbucket
  navbarAutoHide: 'none', // "always" | "mobile" | "none"
  hideSiteNameOnMobile: true,
  navbar,

  // 侧边栏
  sidebar,

  locales: undefined, // 多语言配置

  // 元数据配置(Meta)
  lastUpdated: true, // 是否显示页面最后更新时间
  contributors: true, // 是否显示贡献者
  editLink: false, // 是否展示编辑此页链接
  editLinkPattern: ':repo/edit/:branch/:path', // 编辑链接的匹配。其中 :repo :branch :path 会被自动替换为 docsRepo docsBranch 和 docsDir + filePath。
  docsRepo: 'https://github.com/Triabin/been',
  docsBranch:'master',
  docsDir: "src",

  // 页脚
  footer: '用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | Copyright © 2024 Triabin MIT Licensed',
  copyright: '',
  displayFooter: true,

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
    },

    // 搜索功能
    searchPro: {
      indexContent: true, // 是否索引内容
      autoSuggestions: true, // 是否自动提示
      hotKeys: [{ key: "k", ctrl: true }, { key: "/", ctrl: true }], // 快捷键
      queryHistoryCount: 6 // 查询历史记录条数
    },

  }
});

import { hopeTheme } from "vuepress-theme-hope";
import { cut } from 'nodejs-jieba'

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  // 主题基本选项
  hostname: '', // 当前网站部署到的域名。
  // 文章显示的默认作者
  author: {
    name: 'Triabin',
    url: 'https://github.com/Triabin',
    email: ''
  },
  license: 'MIT', // 站点默认协议
  favicon: '/favicon.png', // 网站图标

  // 导航栏配置
  navbarLayout: {
    start: ["Brand"],
    center: ["Links"],
    end: ["Tip", "Language", "Repo", "Outlook", "Search"]
  },
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

  // markdown配置
  markdown: {
    figure: true,
    imgLazyload: true,
    imgSize: true,
    imgMark: true,
    // 启用PlantUML
    plantuml: true,
    mermaid: true,
    // 使用katex支持数学公式
    math: {
      type: 'katex'
    },
    codeTabs: true,
    tabs: true,
    align: true,
    attrs: true,
    component: true,
    footnote: true, // 脚注
    include: true,
    mark: true,
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

  // 在这里配置主题提供的插件
  plugins: {
    components: {
      components: ["Badge", "VPCard"],
    },
    slimsearch: {
      indexContent: true,
      indexOptions: { tokenize: (text, fieldName) => fieldName === 'id' ? [text] : cut(text, true) },
      suggestion: true,
      hotKeys: [{ key: "k", ctrl: true }, { key: "/", ctrl: false }],
      queryHistoryCount: 10,
      resultHistoryCount: 5,
      searchDelay: 150,
      filter: (page) => true,
      customFields: [
        {
          getter: (page) => page.frontmatter.tags as string | string[],
          formatter: '标签：$content'
        }
      ]
    },
    icon: {
      assets: 'iconify', // 文章/配置中使用的图标来源，可选值有: "iconify", "fontawesome", "fontawesome-with-brands"
    }
  }
});

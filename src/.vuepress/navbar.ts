import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "编程",
    icon: "arcticons:coding-c",
    prefix: "/coding/",
    activeMatch: "^/coding",
    children: [
      {
        text: '通用技术',
        icon: 'arcticons:my-base',
        link: 'common/',
        activeMatch: '^/coding/common'
      },
      {
        text: "C/C++",
        icon: "vscode-icons:file-type-cpp2",
        link: 'c-cpp/',
        activeMatch: "^/coding/c-cpp",
      },
      {
        text: "Java",
        icon: "devicon:java",
        link: 'java/',
        activeMatch: "^/coding/java"
      },
      {
        text: "Python",
        icon: "catppuccin:python",
        link: 'python/',
        activeMatch: "^/coding/python"
      },
      {
        text: '前端',
        icon: 'icon-park:web-page',
        link: 'frontend/',
        activeMatch: "^/coding/frontend"
      },
      {
        text: '仓颉',
        icon: '/icon-coding-cangjie.png',
        link: 'cangjie/',
        activeMatch: "^/coding/cangjie"
      }
    ],
  },
  {
    text: "笔记",
    icon: "marketeq:create-note-alt",
    link: "/notes/",
  },
  {
    text: '博客',
    icon: 'fa6-brands:blogger-b',
    link: '/blogs/'
  },
  '/favorites/index',
  // '/portfolio' // 档案主页demo
]);

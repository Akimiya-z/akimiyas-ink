---
title: '如何基于我的仓库搭建并上线个人网站'
description: '基于我整理好的 Astro 个人网站仓库，fork 到自己账号、改内容，再部署到 Vercel 的完整流程。'
publishDate: 2026-04-03
tags:
  - 教程
  - 建站
  - Astro
  - Vercel
language: '中文'
---

这篇文章不是从原始主题零开始，而是从我已经整理好的个人网站仓库出发。原始主题是 [cworld1/astro-theme-pure](https://github.com/cworld1/astro-theme-pure)，但如果你只是想尽快搭一个自己的版本，更省事的办法是直接基于我改好的仓库继续改，再上线到 GitHub 和 Vercel。

## 核心概念

- **Fork** - 把一个公开仓库复制到你自己的 GitHub 账号下，后续修改、部署和推送都在你自己的仓库里完成。
- **Build** - 用 `npm run build` 检查项目能不能成功产出线上版本；本地能跑不代表一定能上线。
- **正式网址** - Vercel 首次部署后给你的 `.vercel.app` 地址，需要再写回项目配置里。

## 你需要准备的内容

- 一个 GitHub 账号
- 一个 Vercel 账号
- `Node.js 24` 和 `npm`
- 一个代码编辑器，比如 VS Code
- 20 到 40 分钟

## Step 1: Fork 仓库并拉到本地

- 打开我的仓库：[Akimiya-z/akimiyas-ink](https://github.com/Akimiya-z/akimiyas-ink)
- 点击 GitHub 右上角的 **Fork**，把它复制到你自己的账号下
- 然后把你自己的仓库克隆到本地：

```bash
git clone https://github.com/你的用户名/akimiyas-ink.git
cd akimiyas-ink
```

- 这样后面的改动、提交和部署都会落在你自己的仓库里，不会动到原仓库

## Step 2: 安装依赖并跑起本地站点

- 在项目根目录安装依赖：

```bash
npm install
```

- 启动开发环境：

```bash
npm run dev
```

- 然后在浏览器打开终端里显示的本地地址，通常是：

```text
http://127.0.0.1:4321
```

- 如果 `4321` 被占用，Astro 会自动换成别的端口，直接用终端里打印出来的新地址

## Step 3: 先认清最常改的几个文件

- `src/site.config.ts`
  这里管网站标题、作者、描述、社交链接、页脚信息和站点 URL
- `src/pages/index.astro`
  这里是首页内容
- `src/pages/about/index.astro`
  这里是 About 页面内容
- `src/content/blog/`
  这里放博客文章
- `public/`
  这里放头像、favicon 和其他静态资源
- `src/assets/styles/app.css`
  这里是全局样式、背景和主题色

先抓住这几个位置，基本就够你完成第一版了。

## Step 4: 换成你自己的基础信息

- 先改 `src/site.config.ts`，把下面这些内容换成你自己的：
  - 网站标题
  - 作者名
  - 网站描述
  - GitHub 和其他社交链接
  - 页脚信息
- 如果你要换头像、favicon 或其他图片，把资源放到 `public/` 下，再改引用路径
- 这一轮先把最基本的信息统一掉，后面再慢慢细调样式

## Step 5: 改首页和 About 页面

- 在 `src/pages/index.astro` 里把首页换成你自己的内容，比如：
  - 简介
  - Education
  - Study
  - Interests
  - 最新文章
- 在 `src/pages/about/index.astro` 里写更完整的自我介绍
- 如果你是第一次接触 Astro，建议先只改文案和链接，不要急着大改布局；先跑通整套流程更重要

## Step 6: 写第一篇博客并检查构建

- 在 `src/content/blog/` 下新建一篇文章，例如：

```text
src/content/blog/my-first-post/index.md
```

- 最小 frontmatter 可以写成这样：

```md
---
title: '我的第一篇文章'
description: '这是我的第一篇博客文章。'
publishDate: 2026-04-03
tags:
  - 随笔
language: '中文'
---
```

- 内容改完以后，先跑一次构建检查：

```bash
npm run build
```

- 只要这里能通过，通常就说明已经具备上线条件

## Step 7: 推到 GitHub 并在 Vercel 部署

- 先把本地改动提交并推到你自己的 GitHub 仓库：

```bash
git add .
git commit -m "feat: set up my personal site"
git push
```

- 然后打开 [Vercel](https://vercel.com/)，导入你自己的仓库
- 创建项目时保持这些设置：
  - **Application Preset**：`Astro`
  - 其他设置：默认即可
- 点 **Deploy**，等待第一次部署完成
- 成功后你会拿到一个 `.vercel.app` 地址，例如：

```text
https://你的项目名.vercel.app
```

## Step 8: 把正式网址写回配置并完成上线

- 第一次部署成功后，再回项目里把正式网址写回去
- 主要看这两个文件：
  - `astro.config.ts`
  - `src/site.config.ts`
- 把里面的占位地址改成你自己的正式网址，例如：

```text
https://你的项目名.vercel.app
```

- 然后再提交并推一次：

```bash
git add .
git commit -m "chore: update production site url"
git push
```

- 推送后，Vercel 会自动重新部署，你的网站就真正完整了

## 补充说明

- 这个仓库已经预置了一些个人网站需要的调整，比如首页结构、页脚社交区域、部分图标和整体样式
- 对大多数使用者来说，不需要再去改主题底层实现，只需要改文案、链接、图片和博客内容
- 如果你在修改过程中卡住了，最省事的办法通常不是自己硬猜，而是把对应文件路径、报错信息、页面截图或者想实现的效果直接交给 AI 工具
- 这整套流程，包括改内容、本地预览、构建检查、提交推送和部署，本身就很适合配合 AI 工具一起完成

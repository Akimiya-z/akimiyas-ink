# 如何基于我的仓库搭建并上线个人网站

## 任务

- 主题：把本次个人网站搭建流程整理成一篇给别人复用仓库的教程
- 日期：2026-04-03
- 最终产物：`src/content/blog/build-personal-site-from-my-repo/index.md`

## 起点与前提

- 站点已经完成第一版搭建并上线到 Vercel
- 线上站点：`https://akimiyas-ink.vercel.app`
- 远程仓库：`https://github.com/Akimiya-z/akimiyas-ink`
- 原始主题来自 `cworld1/astro-theme-pure`
- 当前 GitHub 仓库是普通公开仓库，不是 template repository

## 关键步骤

1. 先确定教程目标改为“基于我的仓库快速搭建自己的个人网站”，而不是复盘所有中间折腾过程
2. 保留原始主题来源说明，但主流程改成从 `fork` 现有仓库开始
3. 把教程结构收成准备、fork、安装、本地预览、改内容、写博客、推送 GitHub、部署 Vercel、回填正式网址
4. 删除单独的 FAQ 式尾巴，只保留可执行的故障排除
5. 在补充说明里明确，这整套流程可以配合 AI 工具一起完成

## 关键命令与路径

- 命令：`git clone https://github.com/你的用户名/akimiyas-ink.git`
- 命令：`npm install`
- 命令：`npm run dev`
- 命令：`npm run build`
- 命令：`git add . && git commit -m "..." && git push`
- 路径：`src/site.config.ts`
- 路径：`src/pages/index.astro`
- 路径：`src/pages/about/index.astro`
- 路径：`src/content/blog/`
- 路径：`public/`

## 关键决策

- 不再把教程写成“我自己一步步怎么折腾出来的复盘”，而是改成“别人如何直接复用这个仓库”
- 获取项目的部分定死为 `fork` 流程，因为当前仓库不是 template repository
- 保留 Vercel 的实际部署流程和 `Application Preset: Astro`，因为这正是本次真实上线路径

## 踩坑与修复

- 问题：原稿里“获取项目”的写法把 `template`、`fork`、`clone` 混在一起，看起来乱
  修复：直接定成当前真实适用的 `fork` 流程

- 问题：原稿更像说明文，不够像可直接照做的博客教程
  修复：按教程模板改成 `Step 1` 到 `Step 8` 的结构，并补足构建检查和正式网址回填

## 仍需研究或确认

- 无

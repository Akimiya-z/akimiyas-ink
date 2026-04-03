# 我现在如何用两个 Skill 把项目过程写成教程博客

## 任务

- 主题：说明我现在如何用 `project-tutorial-generator` 和 `review-project-tutorial`，把和 Codex 的项目协作整理成教程博客
- 日期：2026-04-03
- 最终产物：`src/content/blog/codex-project-tutorial-workflow/index.md`

## 起点与前提

- 个人博客站点已经搭好并能正常发布文章
- 已经有一套本地个人专用 skill：`project-tutorial-generator` 和 `review-project-tutorial`
- 这两个 skill 只面向代码项目教程博客，不面向统计学笔记或普通博客

## 关键步骤

1. 先明确这两个 skill 的分工：一个生成初稿，一个负责审查与发布整理
2. 把文章主线定成“先做项目，再生成，再审查，再构建发布”
3. 明确写出生成器和审查器各自的自然语言用法和显式用法
4. 把输出文件位置说清楚，并注明这套路径是按我当前博客仓库约定来的：正文进 `src/content/blog/`，摘要进 `tutorial-sources/`
5. 加一节说明新对话如何靠摘要文件恢复上下文

## 关键命令与路径

- 命令：`Use $project-tutorial-generator 把这次和 Codex 协作完成的代码项目过程整理成教程博客，先给出提纲，再生成正文。`
- 命令：`Use $review-project-tutorial 审查这篇代码项目教程博客；如果问题不大，直接整理成发布版。`
- 命令：`npm run build`
- 路径：`src/content/blog/<slug>/index.md`
- 路径：`tutorial-sources/<slug>.md`

## 关键决策

- 把这篇文章写成“如何使用这两个 skill”的流程说明，而不是只介绍它们的规则文件
- 保留自然语言触发和显式调用两种写法，减少实际使用时的摩擦
- 明确强调这套流程只适合代码项目教程博客，避免和其他文章类型冲突

## 踩坑与修复

- 问题：如果只讲 skill 名称和定义，文章会更像工具说明，不像可执行博客
  修复：把正文主线改成一个固定工作流，并给出可直接复制的 prompt

- 问题：如果不解释摘要文件的作用，新对话场景会显得断裂
  修复：单独补一节说明 `tutorial-sources/<slug>.md` 的用途

## 仍需研究或确认

- 无

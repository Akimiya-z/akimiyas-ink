---
title: '我把 ARIS 封装成了 Codex App 里的可调用工具'
description: '记录我把 ARIS 独立版收进项目目录、接上会员 reviewer、补齐本地 LaTeX 和 Codex bridge，最后让 Codex App 能直接调用它。'
publishDate: 2026-04-04
tags:
  - 记录
  - ARIS
  - Codex
  - Claude
language: '中文'
---

ARIS 是 [Auto-claude-code-research-in-sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) 这套项目里分出来的独立 CLI 版本。它把 research workflow 打包成了一套可直接调用的能力：比如 idea discovery、literature review、paper writing、paper compile、slides 和 poster。对我来说，真正有吸引力的点不是“又一个命令行工具”，而是它已经把很多研究型工作流收成了现成入口。

这篇不是教程，是给未来的自己留一份过程记录。我要的不是“把 ARIS 装上”，而是让它尽量只在 `/Users/akimiya/Codex/ARIS` 这个工作区里生效：skill、配置、MCP、论文输出、实验输出都尽量收进项目里，项目外不要平白多出一套全局工作流。

最后做出来的结果不是官方原样安装版，而是一个能稳定用的本地定制版：ARIS 本体在项目里，配置在项目里，LaTeX 在项目里，Codex 里还多了一层只在我明确说“进入 ARIS 模式”后才接管的 bridge。换句话说，最后保住的不只是一个能单独启动的 ARIS CLI，而是一个能在 Codex App 里直接调用的 ARIS 工作流入口。

## 一开始我想走的其实是拼装路线

最早的思路是把上游仓库直接 clone 到 `/Users/akimiya/Codex/ARIS`，然后自己补项目级的 `.claude/skills`、`.mcp.json`、`CLAUDE.md` 和本地脚本，把 Claude Code 当 executor，把 Codex 当 reviewer。

这条路理论上能做，但有两个问题：

- 我要很小心地避免把 ARIS 的 skill 和 reviewer 配置写进全局目录。
- 我手上是会员登录态，不是成套 API key，很多默认安装文档并不是按这个前提写的。

所以我先把机器上原来的 Claude Code 痕迹清掉，再从“项目内隔离”这个目标反推应该怎么装。

## 中途改道，是因为发现了独立版

后来看到了上游 release 里的 `v0.3.0` 独立版，里面已经把大量 skill 和流程打包进 CLI 了。对我来说，这比手工拼装一大堆项目级 skill 更合适，因为真正需要解决的问题已经不是“怎么把命令都抄过来”，而是“怎么让这个现成 CLI 不污染项目外”。

所以后面的路线改成了：

- 把独立版落在 `/Users/akimiya/Codex/ARIS`
- 不按默认全局位置写配置
- 给它套一层项目内 sandbox

最后实际入口变成了：

```bash
/Users/akimiya/Codex/ARIS/scripts/aris-standalone.sh
```

## 真正卡住的地方不是安装，而是账号体系

独立版能跑起来，不代表我想要的“完整体验”天然成立。最关键的卡点其实是 reviewer。

我这边有：

- Claude 会员
- ChatGPT / Codex 会员
- Gemini 会员

但独立版默认 reviewer 走的是 `OPENAI_API_KEY`、`GEMINI_API_KEY` 这类环境变量。也就是说，Claude 这边可以直接走登录，reviewer 这边默认却是假定你手里有 API key。

这对“我只有会员也想完整用起来”这个目标不成立，所以最后不能只做配置，还得改运行方式。

## 我最后真正留下来的四层东西

### 1. 项目内配置层

ARIS 的运行配置没有落到默认全局目录，而是收进了：

```text
/Users/akimiya/Codex/ARIS/.aris-home
```

这样像 `.config/aris`、`.claude.json`、`.claude/credentials.json` 这类东西，都会优先写进这个项目自己的私有目录里。

### 2. reviewer 会员登录桥

官方独立版默认更偏向 API key 路线；我最后保留的是另一条路：

- executor 继续用 Claude 会员登录
- reviewer 改成走现有 Codex / ChatGPT 登录态

这样我不用再单独补一套 `OPENAI_API_KEY`，但 reviewer 工作流还能保住。

这也是我这套本地版和官方 release 最大的差别之一：它不是纯原样二进制，而是带了本地补丁和 wrapper 的可用版。

### 3. 项目内 LaTeX 层

论文链路最后也没有依赖系统里一套到处共用的 TeX，而是尽量收进项目目录：

```text
/Users/akimiya/Codex/ARIS/.texlive-env
```

这里面补齐了 `latexmk`、`pdflatex`、`xelatex`、`bibtex`。我当时最在意的不是“有没有 TeX”，而是“以后换项目时不要莫名其妙被这套配置影响”。所以最后连缓存和格式文件路径也一起往项目里收。

### 4. Codex 前台桥

最后我又在 `/Users/akimiya/Codex` 下单独放了一个 `aris-mode-bridge`。它不是把 ARIS 重写成 skill，而是让 Codex 继续当对话前台，ARIS 当后台执行器。

这样以后我只要明确说：

```text
进入 ARIS 模式
```

后面的相关任务就可以由 Codex 代我去操作 ARIS；如果我没切模式，它就还是普通 Codex，不会随便接管。

## 现在这套东西各自放在哪里

我最后保留下来的关键位置大概是这些：

- ARIS 工作区：`/Users/akimiya/Codex/ARIS`
- 独立版启动脚本：`/Users/akimiya/Codex/ARIS/scripts/aris-standalone.sh`
- 项目内配置：`/Users/akimiya/Codex/ARIS/.aris-home`
- 项目内 TeX：`/Users/akimiya/Codex/ARIS/.texlive-env`
- Codex bridge：`/Users/akimiya/Codex/aris-mode-bridge`

生成物也都尽量落在 ARIS 工作区里，例如：

- 论文：`/Users/akimiya/Codex/ARIS/paper/main.pdf`
- 幻灯片：`/Users/akimiya/Codex/ARIS/slides/main.pdf`
- 海报：`/Users/akimiya/Codex/ARIS/poster/main.pdf`

## 这套和官方版现在有什么差别

到这里它已经不是“刚下载下来原样运行”的状态了。保留下来的差别主要有四个：

- 配置默认写项目内，不写全局
- OpenAI reviewer 走 Codex / ChatGPT 登录态，不强依赖 API key
- LaTeX 工具链被补进项目目录
- Codex 侧多了一层 `aris-mode-bridge`

换句话说，这不是为了追求最干净的官方原版，而是为了追求“只影响这个工作区，同时还能完整用”。

## 我给未来自己的更新规则

这套东西以后不能直接无脑覆盖升级。原因很简单：一旦上游更新，变的可能不只是 ARIS 本体，还可能牵连 reviewer 路径、bridge 兼容性和项目内 TeX 层。

所以我最后给自己留的规则是：

- 稳定版一直留在 `/Users/akimiya/Codex/ARIS`
- 真要试新版本，先另建一份测试副本，比如 `/Users/akimiya/Codex/ARIS-next`
- 先验证 `doctor`、reviewer、launcher、最小 paper 编译
- `.texlive-env` 默认分开处理，不随着 ARIS 本体一起乱动

对我来说，这比“永远追最新版”更重要，因为现在这套最值钱的地方恰恰是它已经和我自己的账号体系、目录习惯、Codex 用法磨合好了。

## 现在我实际怎么用

如果我直接在项目里开 ARIS，用的是：

```bash
/Users/akimiya/Codex/ARIS/scripts/aris-standalone.sh
```

如果我想让 Codex 当入口、ARIS 当后台，就先在对话里明确说“进入 ARIS 模式”，后面再继续说我要做文献回顾、idea discovery、paper compile 或者 slides。实际体验上，这已经不是“我切到另一个 CLI 去用它”，而是“我留在 Codex App 里，由 Codex 帮我调用 ARIS”。

这篇先记到这里。它不是“别人照着就能复刻”的完整说明书，更像是我给未来自己留的一张地图：为什么最后会变成现在这套、哪些地方是官方原样、哪些地方已经被我改过，以及以后最好别怎么乱动它。

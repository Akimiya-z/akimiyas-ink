---
title: '在 Codex App 里一键启用 RTK'
description: 'clone codex-rtk-bootstrap 后运行 install.sh，就能把 RTK 接到 Codex App 的全局配置里。'
publishDate: 2026-04-03
tags:
  - 教程
  - codex
  - rtk
  - macos
language: '中文'
---

RTK 是一个本地命令代理，会把常见命令的输出压缩后再交给 AI，看起来更短，理论上也更省 token。这里这篇不是讲 RTK 本身，而是讲我这套把 RTK 接到 macOS Codex App 的安装器：[codex-rtk-bootstrap](https://github.com/Akimiya-z/codex-rtk-bootstrap)。如果你想在 Codex 里少手动敲前缀、少折腾本机配置，直接用这套会比自己一点点改 `~/.codex` 和 `PATH` 更省事。跑完安装脚本后，新开的 Codex 对话会尽量先把常见 shell 命令交给 `rtk`，再把更短的输出交给模型。

## 先说 RTK

- **RTK** - 本地命令代理，会压缩 `git status`、`ls`、`cat` 这类输出，让 AI 少看一些噪音。
- **为什么用这套仓库** - 因为它把原本要手工做的 `~/.codex` 和 `PATH` 改动打包成 `install.sh`，装一次就能在 Codex App 里复用。

## 核心概念

- **`model_instructions_file`** - Codex 读取的全局指令文件；这里我用它让新会话知道要优先走 `rtk`。
- **`PATH shim`** - 放在 `~/.local/bin` 里的命令转发器；它先被 shell 命中，再把命令交给 `rtk`。
- **`RTK_SHIM_COMMANDS`** - 你可以自己改的一串命令名，用来控制哪些命令会被接管。

## 你需要准备的内容

- 一台 macOS 电脑
- 已安装的 Codex App
- 已安装的 `rtk`
- `~/.local/bin` 已经在 `PATH` 里，并且排在系统命令路径前面
- 5 到 10 分钟

## Step 1: 补齐前提，给安装脚本一个干净环境

- 如果还没装 `rtk`，先装：

```bash
brew install rtk
```

- 确认 `~/.local/bin` 在 `PATH` 里。如果你用的是 `zsh`，可以把下面这句加进 `~/.zshrc`，而且只加一次：

```bash
grep -qxF 'export PATH="$HOME/.local/bin:$PATH"' ~/.zshrc || echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
```

- 如果你已经有自己的 `~/.codex/config.toml`，先记一下里面有没有别的 `model_instructions_file`。这份安装脚本不会替你合并冲突配置。

## Step 2: 拉取仓库并写入用户级 Codex 配置

- clone 仓库：

```bash
git clone https://github.com/Akimiya-z/codex-rtk-bootstrap.git
cd codex-rtk-bootstrap
```

- 运行安装脚本：

```bash
./install.sh
```

- 这一步会在你的用户目录里补齐三类内容：
  - `~/.codex/RTK.md`
  - `~/.codex/AGENTS.md`
  - `~/.codex/config.toml`
- 同时会在 `~/.local/bin` 里放 `rtk-shim` 和常见命令入口

## Step 3: 重开 Codex App，并确认命令被改写成 `rtk`

- 安装完以后，重启 Codex App
- 新开一个对话，直接让它执行一个常见命令，比如 `git status`
- 最好让它告诉你“实际执行了什么命令”

你可以直接发这句：

```text
请执行 git status，只告诉我你实际执行的完整命令，不要解释。
```

- 如果配置生效，你应该能看到它实际用了：

```text
rtk git status
```

- 这是关键验证，因为旧窗口不一定会立刻刷新，重开一个新对话最稳

## Step 4: 按需收紧接管范围，只保留常用命令

- 如果你不想让所有命令都经过 shim，可以改环境变量：

```bash
export RTK_SHIM_COMMANDS="git ls cat grep rg"
```

- 改完后重新运行安装脚本，让新的命令入口生效
- 如果你想指定 `rtk` 的真实路径，也可以设置：

```bash
export RTK_BIN="/opt/homebrew/bin/rtk"
```

- 这对多台机器、不同安装路径的人更稳

## Step 5: 卸载脚本，撤回这次用户级改动

- 想撤掉这套接管时，直接运行：

```bash
./uninstall.sh
```

- 它会删除 `~/.codex` 里的这份配置引用，也会删掉 `~/.local/bin` 里的 shim 入口
- 你的项目代码不会被改动

## 下一步

- 把 `RTK_SHIM_COMMANDS` 缩成你最常用的命令集合
- 在另一台 Mac 上再跑一次安装脚本，确认这套接法可复用
- 如果你有自己的 Codex 全局说明，先合并进 `~/.codex/config.toml` 再装

## 故障排除

- **问题**：Codex 里还是直接跑 `git status`  
  **处理**：重启 Codex App，开新对话，再确认 `~/.local/bin` 是否在 `PATH` 前面。

- **问题**：安装脚本提示 `rtk is not installed`  
  **处理**：先运行 `brew install rtk`，或者手动设置 `RTK_BIN`。

- **问题**：你本来就有别的 `model_instructions_file`  
  **处理**：先把旧配置合并好，再运行安装脚本，避免覆盖你自己的说明。

- **问题**：某些命令没有被接管  
  **处理**：把它们加进 `RTK_SHIM_COMMANDS`，重新安装。

# 在 Codex App 里一键启用 RTK

## 任务

- 主题：把本轮给 Codex App 接 RTK 的做法整理成一篇“怎么用”的教程博客
- 日期：2026-04-03
- 最终产物：一篇发布到个人网站的教程文章，解释如何用 `codex-rtk-bootstrap` 给 Codex App 启用 RTK

## 起点与前提

- 已经有可工作的本机方案：`~/.codex/config.toml`、`~/.codex/AGENTS.md`、`~/.codex/RTK.md` 和 `~/.local/bin/rtk-shim`
- GitHub 仓库已经发布为 `https://github.com/Akimiya-z/codex-rtk-bootstrap`
- 文章目标是“告诉别人怎么用”，不是讲 RTK 的内部实现过程
- 文章开头先交代 RTK 是什么，再解释为什么用这套仓库比手工改配置更省事

## 关键步骤

1. 先解释 RTK 的作用和这篇文章为什么要介绍这套仓库
2. 明确文章主题：面向想在 Codex App 里使用 RTK 的 macOS 用户
3. 先把安装前提说清楚：Codex App、`rtk`、`~/.local/bin` 在 PATH 里，而且只追加一次
4. 说明 clone 仓库并运行 `./install.sh`
5. 说明重启 Codex App 后用新对话验证 `rtk git status`
6. 补充可调参数 `RTK_BIN` 和 `RTK_SHIM_COMMANDS`
7. 提供 `./uninstall.sh` 作为撤销方法

## 关键命令与路径

- 命令：`brew install rtk`
- 命令：`git clone https://github.com/Akimiya-z/codex-rtk-bootstrap.git`
- 命令：`./install.sh`
- 命令：`./uninstall.sh`
- 命令：`git status`
- 命令：`rtk git status`
- 命令：`grep -qxF 'export PATH="$HOME/.local/bin:$PATH"' ~/.zshrc || echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc`
- 路径：`~/.codex/config.toml`
- 路径：`~/.codex/AGENTS.md`
- 路径：`~/.codex/RTK.md`
- 路径：`~/.local/bin/rtk-shim`

## 关键决策

- 文章重点放在“如何使用仓库”，而不是解释怎么搭 RTK 本身
- 只保留用户真正需要照做的步骤：准备前提、安装、验证、卸载
- 把可调项收在单独一步里，避免正文过早分叉

## 踩坑与修复

- 问题：Codex 旧窗口不刷新，仍然像没启用
  修复：重启 Codex App，并在新对话里验证
- 问题：`~/.local/bin` 不在 PATH 前面
  修复：把 `export PATH="$HOME/.local/bin:$PATH"` 加进 shell 初始化文件
- 问题：已有别的 `model_instructions_file`
  修复：先手动合并，再运行安装脚本

## 仍需研究或确认

- 暂无

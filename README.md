# Akimiya's ink

Akimiya 的个人网站与博客仓库，基于 `Astro Theme Pure` 搭建，并部署到 Vercel。

## 本地运行

这个项目要求 `Node 24`。你当前机器如果还是 `Node 25`，先切到 `Node 24` 再执行下面的命令。

如果你用 Homebrew，可以这样装：

```shell
brew install node@24
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
node -v
```

确认 `node -v` 是 `v24.x` 之后，再在项目根目录执行：

```shell
npm install
npm run dev
```

常用命令：

```shell
npm run dev
npm run build
npm run preview
```

## 需要改的地方

- 站点基本信息：`src/site.config.ts`
- 网站地址：`astro.config.ts` 里的 `site`
- 首页：`src/pages/index.astro`
- 关于页：`src/pages/about/index.astro`
- 博客文章：`src/content/blog/`

## 发布到 Vercel

1. 把代码推到 GitHub 仓库。
2. 打开 [Vercel](https://vercel.com/) 并用 GitHub 登录。
3. 选择 `Add New Project`，导入这个仓库。
4. 保持默认识别结果，直接部署。
5. 部署成功后，把线上地址回填到 `astro.config.ts` 的 `site`。

## 备注

- 仓库里加了 `.nvmrc` 和 `.node-version`，方便后面固定到 `Node 24`。
- 默认评论系统已经关闭。
- `docs / projects / links` 这些主题演示页已从第一版里移除。

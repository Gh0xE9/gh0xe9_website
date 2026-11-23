# Gh0xE9 门户官网

Gh0xE9（Ghost In The Bytes）的官方门户。静态站点，介绍团队、业务、公开工具，并提供一个用 Markdown 发布技术文章的栏目。

现有官网仍是 <https://team.iloli.moe/>。本仓库已按新的视觉与信息架构重写，默认发布地址是 <https://gh0xe9.top>。

## 本地开发

需要 Node.js 22.23.4 或更高版本。

```sh
npm install
npm run dev
```

开发服务器默认在 `http://localhost:4321/`。

```sh
npm run build     # 生产构建，输出到 ./dist/（可随时重建）
npm run preview   # 本地预览生产构建
```

源码在 `src/`，不要把需要长期保留的内容只放在 `dist/`、`build/`、`out/`、`coverage/` 或 `target/` 里，这些目录在部分环境刷新时可能被清除。

## 如何发布一篇文章

1. 在 `src/content/articles/<lang>/` 新增一个 `.md` 文件。`<lang>` 为 `zh`、`en` 或 `ko`。文件名会成为网址里的 id，建议用拼音或英文短横线，例如 `ssrf-notes.md`。同一篇文章的三个语言版本请使用相同的文件名。
2. 填写 frontmatter：

```md
---
title: 标题
description: 列表和 RSS 会用到的一句话摘要
pubDate: 2026-11-23
updatedDate: 2026-11-24   # 可选
tags:
  - 标签
draft: false              # true 时不会出现在列表、详情和 RSS
lang: zh                  # zh、en 或 ko，须与所在目录一致
---

正文用 Markdown 写。
```

3. 运行 `npm run build`。中文会出现在 `/articles/` 和 `/rss.xml`，英文在 `/en/articles/` 与 `/en/rss.xml`，韩语在 `/ko/articles/` 与 `/ko/rss.xml`。

请发布团队自己撰写的内容。不要转载微信公众号或其他平台的原文。

## 部署

`npm run build` 生成纯静态文件，可放到任意静态托管，包括 Gitea Pages、Nginx、对象存储或 Cloudflare Pages。

常见做法：

- 把 `dist/` 里的内容作为站点根目录。
- 默认站点地址是 `https://gh0xe9.top`。若改用其他域名，同步修改 `astro.config.mjs` 中的 `site`、`public/robots.txt` 里的 Sitemap，以及 `public/CNAME`。
- 推到 GitHub 的 `main` 后，`.github/workflows/deploy.yml` 会构建 `dist/` 并发布到 GitHub Pages。在仓库 Settings → Pages 中把 Source 设为 GitHub Actions，Custom domain 填 `gh0xe9.top`，并打开 Enforce HTTPS。
- 若站点挂在子路径（例如 `https://example.com/portal/`），再设置 `base: '/portal/'` 后重新构建。
- Gitea Pages：将构建产物发布到 Pages 所用分支或目录（视实例配置而定）。推送仓库前先完成本地构建确认。

本仓库不包含任何账号或口令。不要把密钥写入源码或构建产物。

## 主题、语言与动效

- **主题：** 暗色是暖墨、骨纸、朱红 E9 与磷光色；亮色是同一套配色的纸与墨对位，不是白底蓝按钮。右上角可切换。选择会写入 `localStorage` 的 `gh0xe9-theme`。第一次访问若还没有记录，则跟随 `prefers-color-scheme`。`<head>` 里有一段同步脚本，避免先闪错色。
- **语言：** 默认中文在根路径。英文在 `/en/`，韩语（한국어）在 `/ko/`。页头有语言切换，会留在当前栏目。`html lang`、日期、元信息与 RSS 跟随当前语言。
- **动效：** 主标题与页头标志有克制的 glitch（悬停时更明显，空闲时约每 5 秒错印两闪）。向下滚动时，标题会有错印对位，列表行会横向归位，而不是每块都做淡入上浮。若系统开启 `prefers-reduced-motion`，这些动画会关闭或大幅减弱，也不会使用高频闪烁。

## 信息架构

中文在根路径；把路径前加上 `/en/` 或 `/ko/` 即为对应语言。

| 路径 | 内容 |
| --- | --- |
| `/`、`/en/`、`/ko/` | 首页：识别度高的主视觉、业务、工具与最新文章 |
| `/about/` | 团队介绍、CTFtime 公开记录 |
| `/services/` | 红队、蓝队、代码审计、CTF 承办与训练 |
| `/tools/` | 官网介绍过的工具与 GitHub 公开仓库 |
| `/articles/`、`/articles/<id>/` | 文章列表与正文 |
| `/contact/` | 已有官网、GitHub、X、CTFtime、微信公众号 |
| `/rss.xml`、`/en/rss.xml`、`/ko/rss.xml` | 按语言区分的文章 RSS |

页面文案只使用已核验的公开信息，不编造成员、奖项、客户或未公开的产品。

## 视觉概念

**JMP 0xE9 / 观微知著。** 0xE9 是 x86 的近跳转指令，被用作门户的识别符号，而不是一段虚构的创立故事。色彩是暖墨、骨纸和朱红（E9），辅以少量磷光色，避免常见的紫渐变或深色毛玻璃模板。

团队既有标志已重绘为 SVG（`src/assets/gh0xe9-wordmark.svg` 与 `public/brand/gh0xe9-wordmark.svg`）：Gh 与 x 为深蓝 `#001028`，0、E、9 为朱红 `#f80010`，E9 更沉、更满。标志用在页头、首页主视觉、关于页与页脚。暗色主题下深蓝会改成骨纸色，以免沉进背景，红色保持可辨认。

字体改为一套互相配套的系统，避免展示字体和正文字体互相抢：界面与标题用 IBM Plex Sans（中文 IBM Plex Sans SC，韩语 IBM Plex Sans KR），元信息与反汇编仍用 IBM Plex Mono，文章正文用 Noto Serif SC / KR。层级靠字号和字重，而不是再混一套海报字体。左侧轨道、标志的 glitch 与滚动时的错印对位，都是为了让人一眼记住这是 Ghost In The Bytes。

页面预览截图在 `previews/` 目录，方便对照桌面与移动端效果。

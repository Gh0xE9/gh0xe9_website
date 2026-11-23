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

1. 在 `src/content/articles/` 新增一个 `.md` 文件（文件名会成为网址里的 id，建议用拼音或英文短横线，例如 `ssrf-notes.md`）。
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
lang: zh                  # 或 en
---

正文用 Markdown 写。
```

3. 运行 `npm run build`。文章会出现在 `/articles/`，并进入 `/rss.xml`。

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

## 信息架构

| 路径 | 内容 |
| --- | --- |
| `/` | 首页：识别度高的主视觉、业务、工具与最新文章 |
| `/about/` | 团队介绍、公众号更名沿革、CTFtime 公开记录 |
| `/services/` | 红队、蓝队、代码审计、CTF 承办与训练 |
| `/tools/` | 官网介绍过的工具与 GitHub 公开仓库 |
| `/articles/`、`/articles/<id>/` | 文章列表与正文 |
| `/contact/` | 已有官网、GitHub、X、CTFtime、微信公众号 |
| `/rss.xml` | 文章 RSS |

页面文案只使用已核验的公开信息，不编造成员、奖项、客户或未公开的产品。

## 视觉概念

**JMP 0xE9 / 观微知著。** 0xE9 是 x86 的近跳转指令，被用作门户的识别符号，而不是一段虚构的创立故事。色彩是暖墨、骨纸和朱红（E9），辅以少量磷光色，避免常见的紫渐变或深色毛玻璃模板。字体上，超大号 Big Shoulders Display 用来写 Gh0xE9，IBM Plex Mono 承担反汇编和元信息，中文正文用 Noto Serif SC。左侧轨道、错印般的悬停残影和稀疏字节背景，都是为了让人一眼记住这是 Ghost In The Bytes。

页面预览截图在 `previews/` 目录，方便对照桌面与移动端效果。

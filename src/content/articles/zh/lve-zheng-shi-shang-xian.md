---
title: LVE 正式上线，一个只收录垃圾 0day 的垃圾网站
description: 你是否因为那些看着吓人、实际毫无用处的垃圾洞交不出去而辗转反侧？今天，它来了。
pubDate: 2026-11-28
tags:
  - 网络安全
  - LVE
lang: zh
---

你是否审计过一个要管理员登录才能触发的后台 XSS 漏洞？  
你是否审计过一个要管理员权限、前面还挡着 WAF 的 SQL 盲注？  
你是否用 AI 扫出过一堆看着吓人、实际毫无用处的垃圾洞？  
你是否因为这些洞交不出去而辗转反侧？  
以及各种各样的 Self-XSS、兔子洞……

今天，它来了！在这个各种 xxx2shell 的时代，我们需要一些超脱现实的产品！

**LVE 正式上线，一个只收录垃圾 0day 的垃圾网站。**

## 访问地址

<a href="https://lveform.vercel.app/" target="_blank" rel="noopener noreferrer"><code>lveform.vercel.app</code></a>

## 站点由来

公元 2023 年，一位神秘人向 CVE 披露：DVWA 的源码里存在 SQL 注入漏洞。是的，就是那个专门写满漏洞、给人练手的靶场 DVWA。于是 CVE-2023-39848 横空出世，一时风起云涌，随后又被拒绝（让我们怀念他）。

这样的事并不少见：

扫描器标红一片“硬编码密钥”，点进去一看是官方文档里的示例；报告上写着“任意代码执行”，前提是你得先拿到管理员权限；某个 CVE 被打了 9.8 分，项目维护者亲自写长文反驳“这根本不是漏洞”。

这些东西看着像漏洞，挖出来也算发现，交上去却只会换来一句“预期行为”。

为此，我们专门推出了 LVE（Lame Vulnerabilities and Exposures，弱智洞收录中心）。CVE 收录高危漏洞，LVE 收录弱智洞。

## 它收录什么

LVE 只收录那些“看起来像漏洞，其实并无危害”的公开发现。每条记录都有正式编号（LVE-YYYY-NNNN），并写明影响产品与版本、漏洞位置、漏洞描述，以及最关键的一栏：为何无害。

收录对象包括开源框架里的默认口令与文档示例、需要先当上管理员才“能打”的发现，以及被登记成 CVE、却遭官方或维护者公开否认的案例。真正有风险的问题，请走正规渠道报告给厂商——这里不是那个地方。

## DS 弱智指数

CVSS 越高越危险，DS 越高越弱智。我们从前置条件、实际影响、默认可利用性、公开/设计如此、厂商行为、误报程度六个维度打分，从 1 到 10 分，分成轻度、中度、重度、离谱四档。满分 10 分，代表彻头彻尾的弱智洞。

## 首批收录

首批 37 条全部来自对公开开源项目的真实审计，覆盖 Flask、Django、Rails、Spring Boot、Jenkins、Keycloak、Strapi、Superset、Redis、WordPress 官方镜像等，每条都钉在具体提交上，可点链接直达源码。也收录了 PostgreSQL（CVE-2019-9193）、curl（CVE-2020-19909）、CPython（CVE-2023-36632）这类“被登记成 CVE、官方公开否认”的经典案例。

## 如何投稿

在 GitHub 按模板提交 Issue 即可：必填项只有产品、位置、看起来像什么、为何无害，外加一项知情同意。六项评分可不填，由维护者关闭时打分。维护者关闭 Issue 后，自动分配 LVE 编号并上站展示，你的 GitHub 用户名会进入名人堂。

投稿地址：<a href="https://github.com/Gh0xE9/lve_website/issues/new?template=lve-submission.yml" target="_blank" rel="noopener noreferrer">GitHub Issue 模板</a>

源码仓库：<a href="https://github.com/Gh0xE9/lve_website" target="_blank" rel="noopener noreferrer"><code>github.com/Gh0xE9/lve_website</code></a>

站点提供中英界面。

## 免责声明

本站只收录公开信息，不提供任何利用代码。LVE 是一个娱乐向收录站，与 CVE、CNVD、NVD 均无隶属关系。真正有风险的问题，请走正规渠道报告给厂商。

你挖到的弱智洞，终于有地方放了。

欢迎访问：<a href="https://lveform.vercel.app/" target="_blank" rel="noopener noreferrer"><code>lveform.vercel.app</code></a>  
欢迎投稿：<a href="https://github.com/Gh0xE9/lve_website/issues/new?template=lve-submission.yml" target="_blank" rel="noopener noreferrer">GitHub Issue 模板</a>

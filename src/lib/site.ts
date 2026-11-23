export const site = {
  name: 'Gh0xE9',
  tagline: 'Ghost In The Bytes',
  alsoKnownAs: 'Ghost Happy Team',
  mottoZh: '观微知著，消隐于无形。',
  mottoEn: 'Observe subtle clues to eliminate hidden risks.',
  url: 'https://team.iloli.moe',
  description:
    'Gh0xE9（Ghost In The Bytes）是一支安全团队：红队评估、蓝队响应与取证、代码审计，以及 CTF 赛事承办与训练。',
  descriptionEn:
    'Gh0xE9 — Ghost In The Bytes — is a security team working across red-team assessment, blue-team response and forensics, code audit, and CTF hosting and training.',
} as const;

export const links = {
  official: 'https://team.iloli.moe/',
  github: 'https://github.com/Gh0xE9',
  ctftime: 'https://ctftime.org/team/170814/',
  x: 'https://x.com/Gh0xE9',
  repos: {
    erraticgopher: 'https://github.com/Gh0xE9/erraticgopher',
    openArtex: 'https://github.com/Gh0xE9/open_artex',
    helloWriteup: 'https://github.com/Gh0xE9/hello-writeup',
  },
  wechat: {
    name: 'Gh0xE9',
    id: 'po7mn1',
  },
} as const;

export const nav = [
  { href: '/', label: '首页', en: 'Home', id: 'home' },
  { href: '/about/', label: '团队', en: 'About', id: 'about' },
  { href: '/services/', label: '业务', en: 'Services', id: 'services' },
  { href: '/tools/', label: '工具', en: 'Tools', id: 'tools' },
  { href: '/articles/', label: '文章', en: 'Articles', id: 'articles' },
  { href: '/contact/', label: '联系', en: 'Contact', id: 'contact' },
] as const;

export const services = [
  {
    no: '01',
    title: '红队渗透测试',
    titleEn: 'Red Team Penetration Testing',
    body: '面向网络与系统、Web 应用，以及社会工程与钓鱼演练的授权评估。',
  },
  {
    no: '02',
    title: '蓝队应急响应与取证',
    titleEn: 'Blue Team Incident Response & Forensics',
    body: '事件响应、入侵取证，以及日志与监测分析。',
  },
  {
    no: '03',
    title: '代码审计',
    titleEn: 'Code Audit',
    body: '静态分析、漏洞报告，以及修复建议。',
  },
  {
    no: '04',
    title: 'CTF 赛事承办与训练',
    titleEn: 'CTF Competition Hosting & Training',
    body: '面向高校与社区的比赛组织，以及配套的能力训练。',
  },
] as const;

export const tools = [
  {
    name: 'EagleSword',
    kind: '官方介绍',
    body: '轻量、模块化的进攻性安全测试工具，用于资产发现、漏洞验证与内部评估。公开介绍强调模块化、自动化发现、内网辅助与高性能扫描。',
  },
  {
    name: 'NextAssets',
    kind: '官方介绍',
    body: '面向漏洞赏金、渗透测试与演习的智能资产发现：外部资产发现、指纹识别、基础漏洞检测，以及信息泄露与薄弱点识别。',
  },
  {
    name: 'NextDetect',
    kind: '官方介绍',
    body: '侦察阶段使用的轻量扩展，用来定位敏感信息、隐藏目录与资产位置。',
  },
  {
    name: 'erraticgopher',
    kind: 'GitHub',
    href: links.repos.erraticgopher,
    body: '面向授权渗透测试与红队工作的桌面工具，源码公开在 GitHub 组织下。',
  },
  {
    name: 'open_artex',
    kind: 'GitHub',
    href: links.repos.openArtex,
    body: 'ARTEX 衍生项目的索引仓库。',
  },
  {
    name: 'hello-writeup',
    kind: 'GitHub',
    href: links.repos.helloWriteup,
    body: 'CTF writeup 仓库。',
  },
] as const;

export const wechatRenames = [
  { date: '2018.06.24', name: '冰崖工作室' },
  { date: '2018.08.08', name: '冰崖IceCliffs' },
  { date: '2018.09.16', name: '冰崖网络' },
  { date: '2019.08.24', name: '冰崖网络安全' },
  { date: '2019.11.24', name: '冰崖的部落阁' },
  { date: '2020.09.07', name: 'Gh0xE9' },
] as const;

export const ctftime = {
  id: '170814',
  alsoKnownAs: 'Ghost Happy Team',
  affiliation: 'Academic team Union',
  welcome: 'a new CTF team, welcome to join.',
  members: ['rYu1nser', 'icecliffs'] as const,
  events: [
    { name: 'Balsn CTF 2021', place: 191, points: 50 },
    { name: 'Azure Assassin Alliance CTF 2022', place: 187, points: 196 },
    { name: 'BCACTF 3.0', place: 379, points: 275 },
    { name: 'Break the Syntax CTF 2022', place: 114, points: 1 },
    { name: 'Midnight Sun CTF 2022 Quals', place: 204, points: 29 },
    { name: 'niteCTF 2024', place: 1132, points: 10 },
  ],
} as const;

export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

import { siteUrl } from './i18n';

export const site = {
  name: 'Gh0xE9',
  tagline: 'Ghost In The Bytes',
  alsoKnownAs: 'Ghost Happy Team',
  mottoZh: '观微知著，消隐于无形。',
  mottoEn: 'Observe subtle clues to eliminate hidden risks.',
  url: siteUrl,
  officialSite: 'https://team.iloli.moe/',
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

export const navItems = [
  { id: 'home', path: '/' },
  { id: 'about', path: '/about/' },
  { id: 'services', path: '/services/' },
  { id: 'tools', path: '/tools/' },
  { id: 'articles', path: '/articles/' },
  { id: 'contact', path: '/contact/' },
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

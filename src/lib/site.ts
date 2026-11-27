import { siteUrl } from './i18n';

export const site = {
  name: 'Gh0xE9',
  tagline: 'Ghost In The Bytes',
  mottoZh: '观微知著，消隐于无形。',
  mottoEn: 'Observe subtle clues to eliminate hidden risks.',
  url: siteUrl,
  officialSite: 'https://team.iloli.moe/',
} as const;

export const links = {
  official: 'https://team.iloli.moe/',
  github: 'https://github.com/Gh0xE9',
  x: 'https://x.com/Gh0xE9',
  repos: {
    erraticgopher: 'https://github.com/Gh0xE9/erraticgopher',
    openArtex: 'https://github.com/Gh0xE9/open_artex',
    helloWriteup: 'https://github.com/Gh0xE9/hello-writeup',
  },
  wechat: {
    name: 'Gh0xE9',
    id: 'Gh0xE9',
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

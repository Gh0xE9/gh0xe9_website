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
    nextassets: 'https://github.com/Gh0xE9/NextAssets',
    erraticgopher: 'https://github.com/Gh0xE9/ErraticGopher',
    eaglesword: 'https://github.com/Gh0xE9/EagleSword',
    openArtex: 'https://github.com/Gh0xE9/open_artex',
    helloWriteup: 'https://github.com/Gh0xE9/hello-writeup',
  },
  email: 'contact@gh0xe9.top',
  wechat: {
    name: 'Gh0xE9',
    id: 'Gh0xE9',
  },
} as const;

/** GitHub links for products that have a public repository. Internal products are omitted. */
export const toolRepoHrefs: Record<string, string> = {
  nextassets: links.repos.nextassets,
  erraticgopher: links.repos.erraticgopher,
  eaglesword: links.repos.eaglesword,
};

export const navItems = [
  { id: 'home', path: '/' },
  { id: 'about', path: '/about/' },
  { id: 'services', path: '/services/' },
  { id: 'tools', path: '/tools/' },
  { id: 'articles', path: '/articles/' },
  { id: 'contact', path: '/contact/' },
] as const;

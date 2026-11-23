export const locales = ['zh', 'en', 'ko'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export const localeMeta: Record<
  Locale,
  { html: string; og: string; name: string; short: string }
> = {
  zh: { html: 'zh-Hans', og: 'zh_CN', name: '中文', short: '中' },
  en: { html: 'en', og: 'en', name: 'English', short: 'EN' },
  ko: { html: 'ko', og: 'ko_KR', name: '한국어', short: '한' },
};

const localePrefix = /^\/(en|ko)(?=\/|$)/;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeFromPath(pathname: string): Locale {
  const match = pathname.match(localePrefix);
  return match && isLocale(match[1]) ? match[1] : defaultLocale;
}

export function pathWithoutLocale(pathname: string): string {
  const stripped = pathname.replace(localePrefix, '');
  if (stripped === '' || stripped === '/') return '/';
  return stripped.endsWith('/') ? stripped : `${stripped}/`;
}

export function localizeHref(locale: Locale, path: string): string {
  const base = path.startsWith('/') ? path : `/${path}`;
  const withSlash = base === '/' ? '/' : base.endsWith('/') ? base : `${base}/`;
  if (locale === defaultLocale) return withSlash;
  return `/${locale}${withSlash}`;
}

export function switchLocale(pathname: string, next: Locale): string {
  return localizeHref(next, pathWithoutLocale(pathname));
}

export function formatDate(date: Date, locale: Locale): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  if (locale === 'en') {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  if (locale === 'ko') {
    return `${y}년 ${Number(m)}월 ${Number(d)}일`;
  }
  return `${y}.${m}.${d}`;
}

export const siteUrl = 'https://gh0xe9.top';

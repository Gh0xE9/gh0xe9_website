import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './i18n';

export type Article = CollectionEntry<'articles'>;

export function articleSlug(entry: Article): string {
  const parts = entry.id.split('/');
  return (parts[parts.length - 1] ?? entry.id).replace(/\.mdx?$/, '');
}

export async function getPublishedArticles(locale: Locale): Promise<Article[]> {
  const all = await getCollection(
    'articles',
    (entry) => entry.data.draft !== true && entry.data.lang === locale,
  );
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

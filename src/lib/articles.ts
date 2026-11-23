import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => data.draft !== true);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

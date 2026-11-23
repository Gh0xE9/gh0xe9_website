import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedArticles } from '../lib/articles';
import { site } from '../lib/site';

export async function GET(context: APIContext) {
  const posts = await getPublishedArticles();
  return rss({
    title: `${site.name} 文章`,
    description: site.description,
    site: context.site ?? site.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/articles/${post.id}/`,
    })),
  });
}

import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { articleSlug, getPublishedArticles } from './articles';
import { localizeHref, siteUrl, type Locale } from './i18n';
import { t } from './messages';

export async function buildRss(context: APIContext, locale: Locale) {
  const copy = t(locale);
  const posts = await getPublishedArticles(locale);
  return rss({
    title: copy.rssTitle,
    description: copy.description,
    site: context.site ?? siteUrl,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: localizeHref(locale, `/articles/${articleSlug(post)}/`),
    })),
  });
}

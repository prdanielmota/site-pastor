import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml; q=0.1',
  }
});

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  content?: string;
  categories?: string[];
  source: string;
  isoDate?: string;
  imageUrl?: string;
  slug: string;
}

// URL-safe slug from a title (accent-insensitive). Used for internal
// /noticia/[slug] routes.
export function slugify(title: string): string {
  return (
    title
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80) || 'noticia'
  );
}

const FEEDS = {
  iasd: [
    { url: 'https://adventist.news/rss', source: 'Adventist News Network' },
    { url: 'https://www.adventistreview.org/rss.xml', source: 'Adventist Review' },
    { url: 'https://spectrummagazine.org/feed', source: 'Spectrum Magazine' },
    { url: 'https://noticias.adventistas.org/pt/feed/', source: 'Notícias Adventistas Brasil' }
  ],
  mundo: [
    { url: 'https://religionnews.com/feed', source: 'Religion News Service' },
    { url: 'https://www.christianitytoday.com/feed', source: 'Christianity Today' }
  ],
  // Signs of the Times returns HTML instead of RSS, so it is no longer listed.
  profecias: [] as { url: string; source: string }[]
};

// Helper to try to extract an image from RSS content
function extractImage(item: any): string | undefined {
  // 1. Try media:content (often used by ANN and others)
  // Check if mediaContent is an array or object
  if (Array.isArray(item.mediaContent)) {
    const medium = item.mediaContent.find((m: any) => m.$?.medium === 'image' || m.$?.type?.startsWith('image') || m.$?.url);
    if (medium && medium.$ && medium.$.url) return medium.$.url;
  } else if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
    return item.mediaContent.$.url;
  }
  
  // 2. Try enclosure (standard RSS attachment)
  if (item.enclosure && item.enclosure.url && item.enclosure.type?.startsWith('image')) {
    return item.enclosure.url;
  }

  // 3. Try media:thumbnail
  if (item.mediaThumbnail && item.mediaThumbnail.$ && item.mediaThumbnail.$.url) {
    return item.mediaThumbnail.$.url;
  }
  
  // 4. Try parsing 'content', 'content:encoded' OR 'description' for the first <img> tag
  const htmlContent = item['contentEncoded'] || item.content || item.description || '';
  if (htmlContent) {
    // Match standard img src
    let match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    // Also try to match srcset and take the first url if standard match fails
    if (!match) {
        match = htmlContent.match(/<img[^>]+srcset="([^"> ]+)/);
    }
    if (match && match[1]) {
        // Ensure it's a valid URL
        if (match[1].startsWith('http')) return match[1];
    }
  }

  // No real image found in the feed content. NewsImage renders its own
  // placeholder when imageUrl is undefined, so return undefined here.
  return undefined;
}

// Per-feed cache that never expires: last-good items are kept for the lifetime
// of the process, so a temporarily unreachable feed does not blank the page.
type FeedEntry = { items: NewsItem[]; fetchedAt: number; failedAt?: number };
const FRESH_MS = 5 * 60 * 1000;      // dentro disso, não refaz fetch
const RETRY_BACKOFF_MS = 2 * 60 * 1000; // após falha, não tenta de novo antes disso
const FEED_TIMEOUT_MS = 6000;
const feedCache = new Map<string, FeedEntry>();      // chave = feed.url
const inflight = new Map<string, Promise<NewsItem[]>>(); // dedupe de requisições

async function fetchFeed(feed: { url: string; source: string }): Promise<NewsItem[]> {
  const cached = feedCache.get(feed.url);
  if (cached && Date.now() - cached.fetchedAt < FRESH_MS) {
    return cached.items;
  }
  if (cached?.failedAt && Date.now() - cached.failedAt < RETRY_BACKOFF_MS && cached.items) {
    return cached.items;
  }
  const pending = inflight.get(feed.url);
  if (pending) {
    return pending;
  }

  const promise = (async (): Promise<NewsItem[]> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);
    try {
      const res = await fetch(feed.url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*; q=0.8'
        },
        next: { revalidate: 300 }
      });

      if (!res.ok) {
        throw new Error(`Status code ${res.status}`);
      }

      const text = await res.text();
      // Some feeds answer with an HTML error page; require an actual feed root.
      if (!text || !/<(rss|feed|rdf:RDF)\b/i.test(text.slice(0, 2000))) {
        throw new Error('Response is not RSS/Atom');
      }

      const parsed = await parser.parseString(text);
      const items = parsed.items.map(item => {
        const title = item.title || 'Sem título';
        return {
          title,
          link: item.link || '#',
          pubDate: item.pubDate || '',
          isoDate: item.isoDate,
          contentSnippet: item.contentSnippet || '',
          // Prefer full content:encoded for the article body, fall back to content.
          content: (item as { contentEncoded?: string }).contentEncoded || item.content,
          categories: item.categories,
          source: feed.source,
          imageUrl: extractImage(item),
          slug: slugify(title),
        } satisfies NewsItem;
      });

      feedCache.set(feed.url, { items, fetchedAt: Date.now() });
      return items;
    } catch (error) {
      const entry = feedCache.get(feed.url);
      console.warn(`Feed ${feed.url} failed: ${(error as Error).message}`);
      if (entry) {
        feedCache.set(feed.url, { ...entry, failedAt: Date.now() });
        return entry.items;
      }
      return [];
    } finally {
      clearTimeout(timeoutId);
    }
  })();

  inflight.set(feed.url, promise);
  try {
    return await promise;
  } finally {
    inflight.delete(feed.url);
  }
}

export async function fetchNews(category: 'iasd' | 'mundo' | 'profecias' | 'all'): Promise<NewsItem[]> {
  let feedsToFetch: { url: string; source: string }[] = [];

  if (category === 'all') {
    feedsToFetch = [...FEEDS.iasd, ...FEEDS.mundo, ...FEEDS.profecias];
  } else if (FEEDS[category]) {
    feedsToFetch = FEEDS[category];
  } else {
    return [];
  }

  const results = await Promise.allSettled(feedsToFetch.map(fetchFeed));
  const allNews = results
    .filter((r): r is PromiseFulfilledResult<NewsItem[]> => r.status === 'fulfilled')
    .flatMap(r => r.value);

  const toTime = (iso?: string) => {
    if (!iso) return 0;
    const t = new Date(iso).getTime();
    return Number.isNaN(t) ? 0 : t;
  };

  const seen = new Set<string>();
  const deduped = allNews.filter((it) => {
    if (seen.has(it.link)) return false;
    seen.add(it.link);
    return true;
  });

  return deduped.sort((a, b) => toTime(b.isoDate) - toTime(a.isoDate));
}

// Find a single article by its slug across all feeds. Returns null if not found.
export async function getArticleBySlug(slug: string): Promise<NewsItem | null> {
  const all = await fetchNews('all');
  return all.find(item => item.slug === slug) ?? null;
}

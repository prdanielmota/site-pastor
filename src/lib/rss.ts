import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['enclosure', 'enclosure'],
    ],
  },
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
}

const FEEDS = {
  iasd: [
    { url: 'https://adventist.news/rss', source: 'Adventist News Network' },
    { url: 'https://www.adventistreview.org/rss.xml', source: 'Adventist Review' },
    { url: 'https://spectrummagazine.org/feed', source: 'Spectrum Magazine' }
  ],
  mundo: [
    { url: 'https://religionnews.com/feed', source: 'Religion News Service' },
    { url: 'https://www.christianitytoday.com/feed', source: 'Christianity Today' }
  ],
  profecias: [
    // Fallback to searching in other feeds or specific prophecy blogs if found
    { url: 'https://www.signstimes.com/?rss=true', source: 'Signs of the Times' }
  ]
};

// Helper to try to extract an image from RSS content
function extractImage(item: any): string | undefined {
  // 1. Try media:content (often used by ANN and others)
  if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
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
  
  // 4. Try parsing 'content' or 'content:encoded' for the first <img> tag
  if (item.content || item['content:encoded']) {
    const content = item['content:encoded'] || item.content;
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }

  return undefined;
}

export async function fetchNews(category: 'iasd' | 'mundo' | 'profecias' | 'all'): Promise<NewsItem[]> {
  let feedsToFetch = [];
  
  if (category === 'all') {
    feedsToFetch = [...FEEDS.iasd, ...FEEDS.mundo, ...FEEDS.profecias];
  } else if (FEEDS[category]) {
    feedsToFetch = FEEDS[category];
  } else {
    return [];
  }

  const newsPromises = feedsToFetch.map(async (feedInfo) => {
    try {
      const feed = await parser.parseURL(feedInfo.url);
      return feed.items.map(item => ({
        title: item.title || 'Sem título',
        link: item.link || '#',
        pubDate: item.pubDate || '',
        isoDate: item.isoDate,
        contentSnippet: item.contentSnippet || '',
        content: item.content,
        categories: item.categories,
        source: feedInfo.source,
        imageUrl: extractImage(item)
      }));
    } catch (error) {
      console.error(`Error fetching feed ${feedInfo.url}:`, error);
      return [];
    }
  });

  const results = await Promise.all(newsPromises);
  const allNews = results.flat();

  // Sort by date descending
  return allNews.sort((a, b) => {
    const dateA = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const dateB = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return dateB - dateA;
  });
}

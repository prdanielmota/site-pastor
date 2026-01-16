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
    { url: 'https://spectrummagazine.org/feed', source: 'Spectrum Magazine' },
    { url: 'https://noticias.adventistas.org/pt/feed/', source: 'Notícias Adventistas Brasil' }
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
  const htmlContent = item['content:encoded'] || item.content || item.description || '';
  if (htmlContent) {
    const match = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    if (match) return match[1];
  }

  // 5. Fallback images based on source
  if (item.source === 'Adventist News Network') return 'https://adventist.news/images/ann-logo.png';
  if (item.source === 'Adventist Review') return 'https://www.adventistreview.org/assets/public/favicon.png';
  if (item.source === 'Spectrum Magazine') return 'https://spectrummagazine.org/sites/default/files/spectrum-logo.png';
  if (item.source === 'Notícias Adventistas Brasil') return 'https://noticias.adventistas.org/wp-content/themes/adventistas-noticias/assets/images/logo.png';
  if (item.source === 'Religion News Service') return 'https://religionnews.com/wp-content/uploads/2020/09/RNS_Logo_RGB.png';
  if (item.source === 'Christianity Today') return 'https://www.christianitytoday.com/images/ct-logo.png';
  
  // 6. Generic fallback if everything fails
  return 'https://images.unsplash.com/photo-1491396023581-4344e51f45dc?q=80&w=1000&auto=format&fit=crop';
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

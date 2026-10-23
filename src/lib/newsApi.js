import { NEWS_ARTICLES } from '../data/newsData';

export const API_BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || '';

/**
 * Generate a clean, keyword-rich SEO slug adhering to Google best practices:
 * - Optimal length: 50-60 characters
 * - Lowercase alphanumeric with hyphens
 * - Prefix with numeric ID so matching is deterministic: e.g. "1-fda-approves-first-over-the-counter-daily-birth-control-pill"
 */
export function generateNewsSlug(item) {
  if (!item) return '';
  if (item.slug && typeof item.slug === 'string' && item.slug.trim()) {
    return item.slug.trim();
  }
  const id = item.id || item._id;
  const rawTitle = item.title || item.old_title || '';
  if (!rawTitle) return String(id || '');

  // Strip stop characters and keep clear alphanumeric words
  const clean = rawTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 55)
    .replace(/-+$/, '');

  return id ? `${id}-${clean}` : clean;
}

export function parseNewsIdFromSlug(slug) {
  if (!slug) return null;
  const match = String(slug).match(/^(\d+)/);
  return match ? match[1] : slug;
}

export async function fetchNewsList(page = 1, limit = 9) {
  // 1. If an external API URL is configured, attempt remote fetch
  if (API_BASE_URL) {
    try {
      const payload = {
        page,
        limit,
        web: 'trackperiods.com',
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(`${API_BASE_URL}/getNewsList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        next: { revalidate: 300 }
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json && (json.data || Array.isArray(json))) {
          return json;
        }
      }
    } catch (error) {
      console.warn("External News API unreachable, serving curated health news fallback.");
    }
  }

  // 2. High-performance, zero-latency curated health news database
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const pagedArticles = NEWS_ARTICLES.slice(startIndex, endIndex);

  return {
    status: true,
    data: {
      data: pagedArticles,
      pagination: {
        page,
        limit,
        totalDocs: NEWS_ARTICLES.length,
        totalPages: Math.ceil(NEWS_ARTICLES.length / limit),
      }
    }
  };
}

export async function fetchNewsDetail(slug) {
  if (!slug) return null;

  const numericId = parseNewsIdFromSlug(slug);

  // 1. Check local curated health news first (instant, guaranteed accurate)
  const localMatch = NEWS_ARTICLES.find((n) => {
    const gen = generateNewsSlug(n);
    return (
      n.slug === slug ||
      gen === slug ||
      n.id?.toString() === slug?.toString() ||
      (numericId && n.id?.toString() === numericId.toString())
    );
  });

  if (localMatch) {
    return localMatch;
  }

  // 2. Fallback to external API if configured
  if (API_BASE_URL) {
    try {
      const listRes = await fetchNewsList(1, 100);
      const allNews = listRes?.data?.data || listRes?.data || [];
      return allNews.find(n => {
        const generated = generateNewsSlug(n);
        return (
          n.slug === slug ||
          generated === slug ||
          n._id?.toString() === slug?.toString() ||
          n.id?.toString() === slug?.toString() ||
          (numericId && n.id?.toString() === numericId.toString())
        );
      }) || null;
    } catch (error) {
      console.error('News Detail Fetch Error:', error);
      return null;
    }
  }

  return null;
}

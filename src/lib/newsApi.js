import { NEWS_ARTICLES } from '../data/newsData.js';

export const API_BASE_URL = process.env.NEXT_PUBLIC_NEWS_API_URL || 'https://docipo.ipotrending.com/api/v1/common';

// In-memory request deduplication cache to prevent hammering the backend API during Next.js parallel builds
let memoryCache = null;
let lastFetchTime = 0;
const CACHE_TTL = 30000; // 30 seconds memory cache

/**
 * Fallback image selector based on article topic keywords
 */
export function getNewsFallbackImage(title = '') {
  const t = (title || '').toLowerCase();
  if (t.includes('pms') || t.includes('premenstrual') || t.includes('pmdd') || t.includes('mood')) {
    return '/images/articles/pmdd-pms-mood-swings.jpg';
  }
  if (t.includes('pain') || t.includes('cramp') || t.includes('bleed') || t.includes('clot')) {
    return '/images/articles/period-facts.jpg';
  }
  if (t.includes('irregular') || t.includes('pcos') || t.includes('delay') || t.includes('late')) {
    return '/images/articles/pcos-irregular-cycles.jpg';
  }
  if (t.includes('app') || t.includes('privacy') || t.includes('birth control') || t.includes('pill')) {
    return '/images/articles/birth-control-system.jpg';
  }
  if (t.includes('ovulation') || t.includes('fertile') || t.includes('conception')) {
    return '/images/articles/boost-ovulation-fertility.jpg';
  }
  if (t.includes('stress') || t.includes('cortisol')) {
    return '/images/articles/cortisol-hormone-belly.jpg';
  }
  return '/images/articles/period-facts.jpg';
}

/**
 * Generate a clean, keyword-rich SEO slug adhering to Google best practices:
 * - Optimal length: 50-60 characters
 * - Lowercase alphanumeric with hyphens
 * - Prefix with numeric ID so matching is deterministic: e.g. "115-premenstrual-syndrome-pms-symptoms-causes-and-ways-to-manage-it"
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
  // If requesting page 1, check in-memory cache
  const now = Date.now();
  if (page === 1 && memoryCache && (now - lastFetchTime < CACHE_TTL)) {
    const all = memoryCache?.data?.data || memoryCache?.data || [];
    if (Array.isArray(all) && all.length > 0) {
      const sliced = all.slice(0, limit);
      return {
        ...memoryCache,
        data: {
          ...memoryCache.data,
          data: sliced,
        }
      };
    }
  }

  // 1. If an external API URL is configured, attempt remote fetch
  if (API_BASE_URL) {
    try {
      const payload = {
        page,
        limit,
        web: 'trackperiods.com',
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(`${API_BASE_URL}/getNewsList`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
        next: { revalidate: 60 }
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const items = json?.data?.data || json?.data;
        if (Array.isArray(items) && items.length > 0) {
          if (page === 1) {
            memoryCache = json;
            lastFetchTime = now;
          }
          return json;
        }
      }
    } catch (error) {
      console.warn("External News API unreachable, serving curated health news fallback.", error?.message);
    }
  }

  // 2. High-performance, zero-latency curated health news database fallback
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
        totalRows: NEWS_ARTICLES.length,
        totalPages: Math.ceil(NEWS_ARTICLES.length / limit),
      }
    }
  };
}

export async function fetchNewsDetail(slug) {
  if (!slug) return null;

  const numericId = parseNewsIdFromSlug(slug);

  // 1. Primary: check external API first
  if (API_BASE_URL) {
    try {
      const listRes = await fetchNewsList(1, 100);
      const allNews = listRes?.data?.data || listRes?.data || [];
      if (Array.isArray(allNews) && allNews.length > 0) {
        const match = allNews.find(n => {
          const generated = generateNewsSlug(n);
          return (
            n.slug === slug ||
            generated === slug ||
            n._id?.toString() === slug?.toString() ||
            n.id?.toString() === slug?.toString() ||
            (numericId && n.id?.toString() === numericId.toString())
          );
        });
        if (match) {
          return match;
        }
      }
    } catch (error) {
      console.error('News Detail Fetch Error:', error);
    }
  }

  // 2. Secondary: fallback to local curated health news
  const localMatch = NEWS_ARTICLES.find((n) => {
    const gen = generateNewsSlug(n);
    return (
      n.slug === slug ||
      gen === slug ||
      n.id?.toString() === slug?.toString() ||
      (numericId && n.id?.toString() === numericId.toString())
    );
  });

  return localMatch || null;
}

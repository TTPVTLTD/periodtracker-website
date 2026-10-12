export const API_BASE_URL = 'https://docipo.ipotrending.com/api/v1/common';

/**
 * Generate a clean, keyword-rich SEO slug adhering to Google best practices:
 * - Optimal length: 50-60 characters
 * - Lowercase alphanumeric with hyphens
 * - Prefix with numeric ID so matching is deterministic: e.g. "56-irregular-periods-common-causes-symptoms"
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
  try {
    const payload = {
      page,
      limit,
      web: 'trackperiods.com',
    };

    const res = await fetch(`${API_BASE_URL}/getNewsList`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      next: { revalidate: 300 } // ISR: cache for 5 minutes, enables fast static generation & auto sitemap updates
    });

    if (!res.ok) {
      console.error(`News API returned status ${res.status}`);
      return null;
    }

    const json = await res.json();
    return json; 
  } catch (error) {
    console.error("News API Fetch Error (Detailed):", error.message);
    return null;
  }
}

export async function fetchNewsDetail(slug) {
  try {
    const numericId = parseNewsIdFromSlug(slug);

    // Fetch list and locate by slug, raw id, or parsed numeric id
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

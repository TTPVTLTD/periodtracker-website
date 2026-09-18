/**
 * SEO Optimization Helpers
 * Enforces strict Google SERP character & keyword boundaries so search engines
 * never truncate titles, descriptions, or flag keyword stuffing.
 * 
 * Google Limits:
 * - Title: 50-60 characters maximum (~580px desktop width)
 * - Description: 140-158 characters maximum (~960px desktop width)
 * - Keywords: 5-7 focused search phrases maximum
 */

/**
 * Ensures title does not exceed Google's 60-character SERP limit.
 * If brand is provided and title is short enough, appends " | Brand".
 * If title is already close to 60 characters, keeps title clean.
 */
export function clampTitle(title, brand = 'Period Tracker', maxLen = 60) {
  if (!title) return brand;
  const cleanTitle = title.trim();

  // If title already has the brand, check length
  if (cleanTitle.toLowerCase().includes(brand.toLowerCase())) {
    if (cleanTitle.length <= maxLen) return cleanTitle;
    return cleanTitle.substring(0, maxLen - 3).trim() + '...';
  }

  const suffix = ` | ${brand}`;
  if (cleanTitle.length + suffix.length <= maxLen) {
    return `${cleanTitle}${suffix}`;
  }

  if (cleanTitle.length <= maxLen) {
    return cleanTitle;
  }

  return cleanTitle.substring(0, maxLen - 3).trim() + '...';
}

/**
 * Ensures meta description stays strictly between 140 and 158 characters.
 * Truncates gracefully at the last whole word if too long.
 */
export function clampDescription(text, maxLen = 158) {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();

  if (clean.length <= maxLen) {
    return clean;
  }

  // Truncate at word boundary
  const truncated = clean.substring(0, maxLen - 3);
  const lastSpace = truncated.lastIndexOf(' ');
  const safeText = lastSpace > 120 ? truncated.substring(0, lastSpace) : truncated;

  return `${safeText}...`;
}

/**
 * Limits keywords to maximum 6-7 focused terms to avoid Google penalty
 */
export function clampKeywords(keywords = [], maxCount = 6) {
  if (!Array.isArray(keywords)) return [];
  return keywords
    .map((k) => (typeof k === 'string' ? k.trim().toLowerCase() : ''))
    .filter(Boolean)
    .slice(0, maxCount);
}

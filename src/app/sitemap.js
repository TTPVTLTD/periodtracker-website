import { CALCULATORS } from '../data/calculators';
import { ARTICLES } from '../data/articles';
import { ABOUT_PAGES } from '../data/aboutPages';
import { CATEGORIES } from '../data/categories';
import { fetchNewsList, generateNewsSlug } from '../lib/newsApi';

export default async function sitemap() {
  const baseUrl = 'https://trackperiods.com';

  // Core Static Hub Routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wellness-hub`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/app-features`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/subscription`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/app-privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Topic Category Hubs (enables Google indexing for specific keyword clusters)
  const categoryRoutes = CATEGORIES.filter(cat => cat.slug !== 'all').map((cat) => ({
    url: `${baseUrl}/wellness-hub?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 8 Specialized Health & Fertility Calculators
  const calculatorRoutes = CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 32 Comprehensive Educational Articles
  const articleRoutes = ARTICLES.map((article) => ({
    url: `${baseUrl}/articles/${article.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  // About, Science, Ayurveda, AI, and Privacy Pages
  const aboutRoutes = ABOUT_PAGES.map((page) => ({
    url: `${baseUrl}/about/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  // Dynamic News Articles with Keyword-Rich Slugs
  let newsRoutes = [];
  try {
    const listData = await fetchNewsList(1, 100);
    const newsArr = listData?.data?.data || listData?.data || [];
    if (Array.isArray(newsArr)) {
      newsRoutes = newsArr.map((newsItem) => {
        const slug = generateNewsSlug(newsItem) || newsItem.slug || newsItem._id || newsItem.id;
        let lastMod = new Date();
        if (newsItem.created_at || newsItem.createdAt || newsItem.date) {
          lastMod = new Date(newsItem.created_at || newsItem.createdAt || newsItem.date);
        }
        return {
          url: `${baseUrl}/news/${slug}`,
          lastModified: lastMod,
          changeFrequency: 'weekly',
          priority: 0.8,
        };
      });
    }
  } catch (err) {
    console.error("Sitemap: Failed to fetch dynamic news", err);
  }

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...calculatorRoutes,
    ...articleRoutes,
    ...aboutRoutes,
    ...newsRoutes,
  ];
}

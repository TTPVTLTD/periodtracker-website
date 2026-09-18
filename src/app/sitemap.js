import { CALCULATORS } from '../data/calculators';
import { ARTICLES } from '../data/articles';
import { ABOUT_PAGES } from '../data/aboutPages';

export default async function sitemap() {
  const baseUrl = 'https://periodtracker.online';

  // Core Static Hub Routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
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
  ];

  // 8 Specialized Health & Fertility Calculators
  const calculatorRoutes = CALCULATORS.map((calc) => ({
    url: `${baseUrl}/calculators/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 23 Comprehensive Educational Articles
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

  return [
    ...staticRoutes,
    ...calculatorRoutes,
    ...articleRoutes,
    ...aboutRoutes,
  ];
}

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ARTICLES } from '../../data/articles';
import { APP_LINKS } from '../../data/appLinks';
import { 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  X, 
  ArrowUpRight, 
  Filter 
} from 'lucide-react';

export default function HealthLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Sync category filter from URL query parameter or hash (e.g. from Navbar dropdown)
  useEffect(() => {
    const handleUrlCategory = () => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get('category') || params.get('cat') || window.location.hash.replace('#', '');
      if (catParam && ['period', 'wellness', 'ovulation', 'pregnancy', 'ayurveda'].includes(catParam)) {
        setActiveCategoryFilter(catParam);
        setTimeout(() => {
          const el = document.getElementById(catParam) || document.getElementById('category-filter-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else if (catParam === 'all') {
        setActiveCategoryFilter('all');
      }
    };

    handleUrlCategory();
    window.addEventListener('popstate', handleUrlCategory);
    return () => window.removeEventListener('popstate', handleUrlCategory);
  }, []);

  const toggleCategoryExpand = (slug) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  // Category Configuration
  const categorySections = [
    { 
      slug: 'period', 
      name: 'Your cycle', 
      tagline: 'Menstrual rhythm, safe days & cycle biology' 
    },
    { 
      slug: 'wellness', 
      name: 'Health 360°', 
      tagline: 'Hormonal balance, cervical wellness & body signals' 
    },
    { 
      slug: 'ovulation', 
      name: 'Getting pregnant', 
      tagline: 'Ovulation detection, peak fertility windows & conception' 
    },
    { 
      slug: 'pregnancy', 
      name: 'Pregnancy', 
      tagline: 'Early symptoms, weekly milestones & body changes' 
    },
    { 
      slug: 'ayurveda', 
      name: 'Ayurveda & Remedies', 
      tagline: 'Natural herbs, teas & dosha cramp care' 
    }
  ];

  const categoryBadgeStyles = {
    period: "bg-rose-50 text-rose-700 border-rose-200",
    wellness: "bg-purple-50 text-purple-700 border-purple-200",
    ovulation: "bg-emerald-50 text-emerald-800 border-emerald-200",
    pregnancy: "bg-blue-50 text-blue-700 border-blue-200",
    ayurveda: "bg-amber-50 text-amber-800 border-amber-200"
  };

  // Filtered articles when searching
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return ARTICLES.filter((article) => 
      article.title.toLowerCase().includes(q) ||
      article.summary.toLowerCase().includes(q) ||
      article.tag?.toLowerCase().includes(q) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  // Determine which sections to show
  const activeSections = useMemo(() => {
    if (activeCategoryFilter === 'all') {
      return categorySections;
    }
    return categorySections.filter((sec) => sec.slug === activeCategoryFilter);
  }, [activeCategoryFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf9]">
      <Navbar />

      <main className="flex-1 pb-24">
        
        {/* Top Header Section with Wellness Hub Title & Clean Search */}
        <section className="pt-10 pb-10 sm:pt-14 sm:pb-12 bg-white border-b border-pink-100/70">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Wellness Hub
            </h1>

            <p className="text-base sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
              Explore informative guides on mentrual cycles, ovulation timing, fertility signals, holistic wellness, and natural symptom tracking.
            </p>

            {/* Clean Rounded Search Bar with Search Icon on Right (matching media_1789623637393.png) */}
            <div className="pt-2 max-w-2xl mx-auto">
              <div className="relative flex items-center bg-gray-50 hover:bg-white border border-gray-200 hover:border-pink-300 focus-within:border-flo-500 focus-within:bg-white focus-within:ring-3 focus-within:ring-pink-100 rounded-full transition-all shadow-xs">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles on periods, ovulation, cramps, birth control..."
                  className="w-full pl-5 pr-12 py-3.5 bg-transparent text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none"
                />
                
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="absolute right-4 text-gray-400 pointer-events-none">
                    <Search className="w-5 h-5 text-teal-700" />
                  </div>
                )}
              </div>
            </div>

            {/* Quick Trending Keyword Pills */}
            <div className="pt-1 flex items-center justify-center gap-2 flex-wrap text-xs">
              <span className="text-gray-400 font-semibold">Popular:</span>
              {['Fertile Window', 'Birth Control', 'Safe Days', 'Ovulation Signs', 'PCOS Care'].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSearchQuery(topic)}
                  className="px-3 py-1 rounded-full bg-pink-50/60 hover:bg-pink-100 text-gray-700 hover:text-flo-600 border border-pink-100 transition-colors font-medium cursor-pointer"
                >
                  {topic}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
          
          {/* 1. Explore by Category Section (Unique Interactive Cards matching Reference Screenshot) */}
          <section id="category-filter-section" className="space-y-4 scroll-mt-24">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  Explore by category
                </h2>
                <p className="text-base text-gray-500 mt-0.5">
                  Select a topic to focus on specific cycle stages and reproductive health guides
                </p>
              </div>

              {activeCategoryFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('all')}
                  className="inline-flex items-center gap-1.5 text-base font-bold text-flo-600 hover:text-flo-700 hover:underline cursor-pointer"
                >
                  <span>Show all categories</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Button Cards Grid (Clean Titles Only, Original Height, Centered Text) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {/* All Articles Button */}
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`h-[72px] sm:h-[76px] px-3 sm:px-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide ${
                  activeCategoryFilter === 'all'
                    ? 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white border-transparent shadow-md shadow-pink-200'
                    : 'bg-white hover:bg-pink-50/70 text-gray-800 border-gray-200 hover:border-pink-300 shadow-2xs'
                }`}
              >
                <span className="leading-snug text-center">All Guides</span>
              </button>

              {/* Specific Category Buttons */}
              {categorySections.map((cat) => {
                const isSelected = activeCategoryFilter === cat.slug;

                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setActiveCategoryFilter(cat.slug)}
                    className={`h-[72px] sm:h-[76px] px-3 sm:px-4 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex items-center justify-center font-bold text-xs sm:text-sm tracking-wide ${
                      isSelected
                        ? 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white border-transparent shadow-md shadow-pink-200'
                        : 'bg-white hover:bg-pink-50/70 text-gray-800 border-gray-200 hover:border-pink-300 shadow-2xs'
                    }`}
                  >
                    <span className="leading-snug text-center">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 2. Search Mode Display */}
          {searchQuery.trim() ? (
            <section className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-pink-100">
                <h3 className="text-lg font-bold text-gray-900">
                  Search results for "{searchQuery}"
                </h3>
                <span className="text-xs font-semibold text-gray-500">
                  {searchResults.length} articles found
                </span>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                  {searchResults.map((article) => (
                    <HorizontalArticleCard 
                      key={article.id} 
                      article={article} 
                      categoryBadgeStyles={categoryBadgeStyles}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl p-8 border border-pink-100 shadow-sm max-w-lg mx-auto">
                  <BookOpen className="w-12 h-12 text-pink-300 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-gray-900">No matching articles found</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    We couldn't find any guides matching "{searchQuery}". Try another keyword or reset search.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-flo-500 text-white font-bold text-xs shadow-md shadow-pink-200 cursor-pointer"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </section>
          ) : (
            /* 3. Category-Grouped Sections (4-article initial limit with append on 'View more') */
            <section className="space-y-12 sm:space-y-16">
              {activeSections.map((sec) => {
                const secArticles = ARTICLES.filter((a) => a.category === sec.slug);
                if (secArticles.length === 0) return null;

                const isExpanded = !!expandedCategories[sec.slug] || activeCategoryFilter === sec.slug;
                const visibleArticles = isExpanded ? secArticles : secArticles.slice(0, 4);
                const remainingCount = secArticles.length - 4;

                return (
                  <div key={sec.slug} id={sec.slug} className="space-y-5 scroll-mt-28">
                    
                    {/* Category Header Row matching Screenshot */}
                    <div className="flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => toggleCategoryExpand(sec.slug)}
                        className="group flex items-center gap-2 text-left cursor-pointer"
                      >
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-flo-600 transition-colors">
                          {sec.name}
                        </h3>
                        <ChevronRight className={`w-5 h-5 text-teal-700 transition-transform ${isExpanded ? 'rotate-90 text-flo-600' : 'group-hover:translate-x-1'}`} />
                      </button>

                      {/* Subtle decorative divider line */}
                      <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-pink-200 via-pink-100 to-transparent mx-3" />

                      {/* View All / Toggle Button matching media_1789625252792.png */}
                      {secArticles.length > 4 ? (
                        <button
                          type="button"
                          onClick={() => toggleCategoryExpand(sec.slug)}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-gray-950 font-black text-xs shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Show less' : 'View all'}</span>
                          <span className="w-5 h-5 rounded-full bg-gray-950 text-white text-xs font-extrabold flex items-center justify-center">
                            {secArticles.length}
                          </span>
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-gray-400">
                          {secArticles.length} guides
                        </span>
                      )}
                    </div>

                    {/* 2-Column Grid of Horizontal Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
                      {visibleArticles.map((article) => (
                        <HorizontalArticleCard 
                          key={article.id} 
                          article={article} 
                          categoryBadgeStyles={categoryBadgeStyles}
                        />
                      ))}
                    </div>

                    {/* Bottom Append / Load More Button if section has more than 4 articles */}
                    {secArticles.length > 4 && (
                      <div className="text-center pt-2">
                        <button
                          type="button"
                          onClick={() => toggleCategoryExpand(sec.slug)}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-pink-50/70 border border-pink-200 hover:border-flo-300 text-gray-800 hover:text-flo-600 font-bold text-xs sm:text-sm shadow-2xs hover:shadow-md transition-all cursor-pointer group"
                        >
                          <span>
                            {isExpanded 
                              ? `Show less (collapsing to 4)` 
                              : `View ${remainingCount} more in ${sec.name}`
                            }
                          </span>
                          <ChevronDown className={`w-4 h-4 text-flo-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </section>
          )}

        </div>

        {/* Full-Bleed Split Mission Banner matching Reference Screenshot (media_1789622616289.png) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-24">
          <div className="rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 min-h-[480px]">
            
            {/* Full Left-Side Edge-to-Edge Image (Pregnant Woman with Smartphone) */}
            <div className="md:col-span-1 lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] md:min-h-full">
              <Image
                src="/images/about/pregnancy-journey-banner.jpg"
                alt="Pregnant woman tracking wellness milestones on smartphone"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Right Side: Deep Forest Emerald Panel matching Reference Screenshot */}
            <div className="md:col-span-1 lg:col-span-6 bg-[#0c5a52] p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-left">
              <div className="space-y-5">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                  Start your personalized journey to parenthood.
                </h2>

                <div className="pt-1">
                  <a
                    href={APP_LINKS.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-all shadow-md"
                  >
                    Try Period Tracker today
                  </a>
                </div>

                {/* Direct Store Download Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                 {/* Apple App Store Button */}
              <a
                href="https://apps.apple.com/app/id6774117828"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-black hover:bg-gray-900 text-white transition-all shadow-sm hover:shadow-md duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.08 1.74-.95 2.77 1.01.08 2.05-.51 2.68-1.27z"/>
                </svg>
                <div className="text-left">
                  {/* <div className="text-xs uppercase font-medium leading-none text-gray-300">Download on the</div> */}
                  <div className="text-base font-bold leading-tight font-sans tracking-tight">App Store</div>
                </div>
              </a>

              {/* Google Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.tracewave.period"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-black hover:bg-gray-900 text-white transition-all shadow-sm hover:shadow-md duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4z"/>
                  <path fill="#FBBC05" d="M17.3 8.5L5.1.7C4.6.4 4.1.3 3.6 1.8l10.2 10.2 3.5-3.5z"/>
                  <path fill="#34A853" d="M17.3 15.5l-3.5-3.5L3.6 22.2c.5.5 1 .3 1.5.1l12.2-6.8z"/>
                  <path fill="#EA4335" d="M20.9 10.5l-3.6-2-3.5 3.5 3.5 3.5 3.6-2c.9-.5.9-1.5 0-2z"/>
                </svg>
                <div className="text-left">
                  {/* <div className="text-xs uppercase font-medium leading-none text-gray-300">GET IT ON</div> */}
                  <div className="text-base font-bold leading-tight font-sans tracking-tight">Google Play</div>
                </div>
              </a>

                </div>
              </div>

              {/* Testimonial Quote Block exactly matching Reference Screenshot */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-normal italic">
                  “Period Tracker has allowed me to keep track of my pregnancy... It’s very useful because this is my first baby, so I don't really know what's going on half the time.”
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/60 shrink-0 bg-white/20">
                    <Image
                      src="/images/about/user-anessa-avatar.jpg"
                      alt="Anessa"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs sm:text-sm leading-tight">
                      Anessa, USA
                    </div>
                    <div className="text-white/75 text-xs">
                      Period Tracker for Pregnancy user
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

/**
 * Modern Horizontal Article Card (Magazine Layout matching media_1789623637393.png & media_1789624716950.png)
 */
function HorizontalArticleCard({ article, categoryBadgeStyles }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="group flex flex-col sm:flex-row bg-white rounded-2xl sm:rounded-3xl border border-pink-100/80 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-900/5 transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
    >
      {/* Left Column: Full-Bleed Edge-to-Edge Image (No white margin around it) */}
      <div className="relative w-full sm:w-48 md:w-52 aspect-[16/10] sm:aspect-auto sm:self-stretch overflow-hidden shrink-0 bg-pink-50">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 208px"
        />
      </div>

      {/* Right Column: Content Details */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between w-full space-y-2.5 min-w-0">
        <div>
          <h4 className="!text-lg sm:text-base font-bold text-gray-900 group-hover:text-flo-600 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h4>
          <p className="text-base text-gray-500 line-clamp-2 mt-1.5 font-normal leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Tag Pill + Read Duration */}
        <div className="flex items-center justify-between pt-1">
          <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${categoryBadgeStyles[article.category] || 'bg-gray-50 text-gray-700'}`}>
            {article.tag || article.categoryName}
          </span>

          <span className="text-sm text-gray-400 font-medium flex items-center gap-1 group-hover:text-flo-600 transition-colors">
            <span>{article.readTime}</span>
            <ChevronRight className="w-3.5 h-3.5 text-flo-500 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { fetchNewsDetail, fetchNewsList, generateNewsSlug } from '../../../lib/newsApi';
import { Calendar, ChevronRight } from 'lucide-react';

export async function generateMetadata({ params }) {
  const news = await fetchNewsDetail(params.slug);
  
  if (!news) {
    return { title: 'News Not Found | Period Tracker' };
  }

  const title = news.title || 'Health News';
  const description = news.short_description || news.shortDescription || news.description?.replace(/<[^>]+>/g, '').substring(0, 160) || 'Health and wellness updates.';
  const imageUrl = news.news_image || news.image || news.thumbnail || 'https://trackperiods.com/og-image.jpg';
  const canonicalSlug = generateNewsSlug(news) || params.slug;

  return {
    title: `${title} | Period Tracker News`,
    description: description,
    alternates: {
      canonical: `https://trackperiods.com/news/${canonicalSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://trackperiods.com/news/${canonicalSlug}`,
      images: [imageUrl],
      type: 'article',
    },
  };
}

export default async function NewsDetailPage({ params }) {
  const news = await fetchNewsDetail(params.slug);
  
  if (!news) {
    notFound();
  }

  // Fetch recent news for the bottom section
  const listData = await fetchNewsList(1, 4);
  
  // Safely extract array and filter out the current article
  let recentNews = [];
  if (listData) {
    const arr = listData?.data?.data || listData?.data || [];
    if (Array.isArray(arr)) {
      recentNews = arr.filter(item => 
        (item.slug !== params.slug && item._id !== params.slug && item.id?.toString() !== params.slug)
      ).slice(0, 3);
    }
  }

  const title = news.title || 'Health & Wellness Update';
  const content = news.content || news.description || '<p>No content available.</p>';
  const imageUrl = news.news_image || news.image || news.thumbnail || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop';
  
  let dateStr = 'Recent';
  try {
    if (news.created_at || news.createdAt || news.date) {
      dateStr = new Date(news.created_at || news.createdAt || news.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch (e) {}

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F9] selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <Navbar />

      <main className="flex-1 w-full pb-16 sm:pb-24">
        {/* Article Header (Hero) */}
        <div className="relative pt-8 sm:pt-12 pb-10 sm:pb-16 px-4 sm:px-6 z-10 bg-gradient-to-b from-white to-[#FAF8F9] border-b border-pink-50">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Properly Added */}
            <nav className="flex flex-wrap items-center text-sm font-medium text-[#706B6E] mb-6 sm:mb-8 gap-2">
              <Link href="/" className="hover:text-[#FF5E8C] transition-colors">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/news" className="hover:text-[#FF5E8C] transition-colors">Health News</Link>
              <span className="text-gray-400">/</span>
              <span className="text-[#1A1819] truncate max-w-[150px] sm:max-w-xs">{title}</span>
            </nav>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 bg-pink-100 text-[#FF5E8C] text-xs font-bold uppercase tracking-wider rounded-full">
                {news.category || 'Health News'}
              </span>
              <span className="flex items-center text-gray-500 text-sm font-medium">
                <Calendar className="w-4 h-4 mr-1.5" />
                {dateStr}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1819] leading-tight mb-6">
              {title}
            </h1>
          </div>
        </div>

        {/* Featured Image (Width synchronized to max-w-6xl) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-10 relative z-20 mb-10 sm:mb-16">
          <div className="w-full h-[300px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl shadow-pink-900/10 border border-white/50 bg-white">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content (Width synchronized to max-w-6xl) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-pink-100">
            <div 
              className="prose prose-pink max-w-none text-[#706B6E] leading-relaxed 
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1A1819] [&_h2]:mt-10 [&_h2]:mb-4
                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#1A1819] [&_h3]:mt-8 [&_h3]:mb-3
                [&_p]:mb-5 [&_a]:text-[#FF5E8C] [&_a]:font-semibold hover:[&_a]:underline
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-6 [&_li]:mb-2
                [&_img]:rounded-2xl [&_img]:shadow-sm"
              dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* News Source URL */}
            {news.news_url && (
              <div className="mt-10 pt-8 border-t border-pink-50 flex items-center">
                <a 
                  href={news.news_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-pink-50 text-[#FF5E8C] font-bold rounded-2xl hover:bg-[#FF5E8C] hover:text-white transition-all duration-300 shadow-sm"
                >
                  Read Original Source
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Recent News Section */}
        {recentNews.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 sm:mt-32">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1819]">
                Recent Updates
              </h2>
              <Link href="/news" className="hidden sm:inline-flex items-center text-sm font-bold text-[#FF5E8C] hover:text-[#e04573] transition-colors group">
                View all <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {recentNews.map((item, index) => {
                const itemSlug = generateNewsSlug(item) || index.toString();
                const itemImg = item.news_image || item.image || item.thumbnail || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop';
                
                let itemDate = 'Recent';
                try {
                  if (item.created_at || item.createdAt || item.date) {
                    itemDate = new Date(item.created_at || item.createdAt || item.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    });
                  }
                } catch(e) {}

                return (
                  <Link 
                    href={`/news/${itemSlug}`} 
                    key={itemSlug}
                    className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm shadow-pink-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5E8C]/10 hover:-translate-y-1"
                  >
                    <div className="relative w-full h-48 overflow-hidden">
                      <img 
                        src={itemImg} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#FF5E8C] text-[10px] font-bold shadow-sm">
                          <Calendar className="w-3 h-3" /> {itemDate}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-[#1A1819] mb-2 line-clamp-2 leading-tight group-hover:text-[#FF5E8C] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[#706B6E] text-xs font-medium line-clamp-2 mt-auto">
                        {item.short_description || item.shortDescription || 'Read the full story to stay updated...'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/news" className="inline-flex items-center justify-center w-full py-3.5 bg-white border-2 border-[#FF5E8C]/20 text-[#1A1819] font-bold rounded-2xl">
                View all news <ChevronRight className="w-5 h-5 ml-1 text-[#FF5E8C]" />
              </Link>
            </div>
          </div>
        )}

      </main>
      
      <Footer />
    </div>
  );
}

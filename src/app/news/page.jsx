import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchNewsList } from '../../lib/newsApi';
import NewsClient from './NewsClient';
import { Newspaper } from 'lucide-react';

export const metadata = {
  title: 'Health & Wellness News | Period Tracker',
  description: 'Stay updated with the latest news, research, and tips on reproductive health, menstrual cycles, and women\'s wellness.',
  alternates: {
    canonical: 'https://trackperiods.com/news',
  },
  openGraph: {
    title: 'Health & Wellness News | Period Tracker',
    description: 'Stay updated with the latest news, research, and tips on reproductive health, menstrual cycles, and women\'s wellness.',
    url: 'https://trackperiods.com/news',
    type: 'website',
    images: [
      {
        url: 'https://trackperiods.com/brand-logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Health & Wellness News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health & Wellness News | Period Tracker',
    description: 'Stay updated with the latest news, research, and tips on reproductive health, menstrual cycles, and women\'s wellness.',
    images: ['https://trackperiods.com/brand-logo-final.png'],
  },
};

export default async function NewsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Health & Wellness News',
    description: 'Latest research and updates on reproductive wellness, fertility science, and menstrual health.',
    url: 'https://trackperiods.com/news',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://trackperiods.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'News',
        item: 'https://trackperiods.com/news',
      },
    ],
  };

  // Fetch initial data on the server (page 1, limit 9 for a 3x3 grid)
  const initialData = await fetchNewsList(1, 9);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FAF8F9] to-white selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />
      
      <main className="flex-1 w-full relative pb-16 sm:pb-24">
        {/* Premium Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#FF5E8C]/10 rounded-full blur-3xl opacity-60 animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#FF8C69]/10 rounded-full blur-3xl opacity-60 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header Section */}
        <div className="relative pt-12 sm:pt-20 pb-10 px-4 sm:px-6 z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF5E8C]/20 text-[#FF5E8C] font-bold text-xs uppercase tracking-wider shadow-sm transition-transform hover:scale-105 mx-auto">
              <Newspaper className="w-4 h-4" />
              <span>Latest Updates</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1819] leading-tight tracking-tight">
              Health & Wellness News
            </h1>
            <p className="text-[#706B6E] text-sm sm:text-base font-medium leading-relaxed max-w-2xl mx-auto">
              Discover the latest research, medical trends, and expert insights into reproductive health, ovulation tracking, and overall well-being.
            </p>
          </div>
        </div>

        {/* Client Component for Grid and Pagination */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <NewsClient initialData={initialData} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

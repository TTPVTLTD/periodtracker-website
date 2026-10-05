'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, Loader2, ArrowRight } from 'lucide-react';
import { fetchNewsList } from '../../lib/newsApi';

export default function NewsClient({ initialData }) {
  // Extract initial docs array defensively based on the exact API response
  const getDocs = (res) => {
    if (!res) return [];
    if (res.data && res.data.data && Array.isArray(res.data.data)) return res.data.data;
    if (res.data && Array.isArray(res.data)) return res.data;
    if (Array.isArray(res)) return res;
    return [];
  };

  const checkHasNextPage = (res) => {
    if (!res) return false;
    if (res.data && res.data.pagination) {
      return res.data.pagination.page < res.data.pagination.totalPages;
    }
    // Fallback: if we got exactly 9 items, assume there might be more
    return getDocs(res).length === 9; 
  };

  const [newsList, setNewsList] = useState(getDocs(initialData));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(checkHasNextPage(initialData));
  const [error, setError] = useState(null);

  const loadMore = async () => {
    if (loading || !hasNextPage) return;
    
    setLoading(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const res = await fetchNewsList(nextPage, 9);
      
      if (res) {
        const newDocs = getDocs(res);
        setNewsList(prev => [...prev, ...newDocs]);
        setPage(nextPage);
        setHasNextPage(checkHasNextPage(res) && newDocs.length > 0);
      } else {
        setError("Failed to load more news. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while loading more news.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  // Helper to extract plain text from HTML content or use short description
  const extractExcerpt = (item) => {
    if (item.shortDescription) return item.shortDescription;
    if (item.description) {
      // Strip HTML tags if any
      const plainText = item.description.replace(/<[^>]+>/g, '');
      return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
    }
    return 'Click to read the full story and stay updated with our latest health news.';
  };

  if (!newsList || newsList.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 text-center border border-[#FF5E8C]/15 shadow-sm">
        <h3 className="text-xl font-bold text-[#1A1819] mb-2">No News Available</h3>
        <p className="text-[#706B6E]">Check back later for the latest updates and health insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {newsList.map((news, index) => {
          // Fallback slug if API doesn't provide one
          const slug = news.slug || news._id || news.id || index.toString();
          const imageUrl = news.news_image || news.image || news.thumbnail || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop';
          const title = news.title || 'Health & Wellness Update';

          return (
            <Link 
              href={`/news/${slug}`} 
              key={slug}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-pink-100 shadow-sm shadow-pink-900/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5E8C]/10 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#FF5E8C] text-xs font-bold shadow-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(news.created_at || news.createdAt || news.date)}
                  </div>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-1 p-6">
                <div className="text-xs font-bold text-[#FF5E8C] uppercase tracking-wider mb-2">
                  {news.category || 'Health News'}
                </div>
                <h2 className="text-xl font-bold text-[#1A1819] mb-3 line-clamp-2 leading-tight group-hover:text-[#FF5E8C] transition-colors">
                  {title}
                </h2>
                <p className="text-[#706B6E] text-sm font-medium mb-6 line-clamp-3 leading-relaxed flex-1">
                  {extractExcerpt(news)}
                </p>
                
                <div className="flex items-center text-[#FF5E8C] font-bold text-sm mt-auto">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500 font-medium bg-red-50 py-3 px-4 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-[#FF5E8C]/20 text-[#1A1819] hover:border-[#FF5E8C] hover:text-[#FF5E8C] font-bold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#FF5E8C]" />
                Loading More...
              </>
            ) : (
              <>
                Load More News
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

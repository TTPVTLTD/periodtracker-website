'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Clock, CheckCircle2, Share2, ArrowLeft, Bookmark } from 'lucide-react';

export default function ArticleModal({ article, onClose, onSelectOtherArticle, allArticles }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!article) return null;

  const relatedArticles = allArticles
    ? allArticles.filter(a => a.id !== article.id && (a.category === article.category || Math.random() > 0.5)).slice(0, 2)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      
      {/* Click outside to close container */}
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      {/* Modal Dialog Content */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto border border-pink-100">
        
        {/* Sticky Top Bar with Close Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-pink-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-flo-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all guides</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-flo-50 text-flo-700 text-xs font-bold border border-pink-200">
              {article.categoryName}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          
          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 font-semibold text-gray-700">
                <Clock className="w-4 h-4 text-flo-500" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>Published: {article.publishedDate}</span>
              <span>•</span>
              <span className="text-gray-600 font-medium">By {article.author}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              {article.title}
            </h2>

          </div>

          {/* Article Image Banner */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-pink-100 shadow-xs">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Summary Lead */}
          <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed bg-flo-50/50 p-5 rounded-2xl border-l-4 border-flo-500">
            {article.summary}
          </p>

          {/* Article Content Paragraphs & Sections */}
          <div className="space-y-6 text-gray-800 leading-relaxed text-base">
            {article.content && article.content.map((sec, idx) => (
              <div key={idx} className="space-y-2.5">
                <h3 className="text-xl font-bold text-gray-900 pt-2">
                  {sec.heading}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {/* Tags */}
          {article.tags && (
            <div className="pt-4 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Topic Tags:
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-pink-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Recommended Related Guides
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectOtherArticle(rel)}
                    className="p-4 rounded-2xl bg-flo-50/50 border border-pink-100 hover:border-flo-300 hover:bg-white transition-all cursor-pointer flex gap-3 items-center group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-pink-100">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-flo-600 uppercase">{rel.categoryName}</span>
                      <h5 className="text-xs font-bold text-gray-900 group-hover:text-flo-600 truncate">
                        {rel.title}
                      </h5>
                      <span className="text-[11px] text-gray-500">{rel.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Period Tracker & Ovulation Cycle Library</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-flo-600 text-white font-bold hover:bg-flo-700 transition-colors"
          >
            Done Reading
          </button>
        </div>

      </div>

    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ArticleCard({ article }) {
  return (
    <Link 
      href={`/articles/${article.id}`}
      className="group bg-white rounded-3xl border border-pink-100/90 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-pink-100/60 transition-all duration-300 flex flex-col transform hover:-translate-y-1"
    >
      {/* Article Image */}
      <div className="relative w-full h-48 sm:h-52 bg-pink-100 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-flo-700 shadow-xs border border-pink-100">
          {article.categoryName}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.publishedDate}</span>
          </div>

          {/* Title */}
          <h4 className="text-lg font-bold text-gray-900 group-hover:text-flo-600 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>

          {/* Summary */}
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Card Footer: Guide type & Read link */}
        <div className="pt-3 border-t border-pink-50 flex items-center justify-between text-xs">
          <span className="text-gray-400 font-medium truncate max-w-[190px]">
            Wellness Guide
          </span>

          <span className="inline-flex items-center gap-1 font-bold text-flo-600 group-hover:translate-x-1 transition-transform">
            <span>Read Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </Link>
  );
}

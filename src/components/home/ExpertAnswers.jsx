'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, ShieldCheck, BookOpen } from 'lucide-react';

import { ARTICLES } from '../../data/articles';

export default function ExpertAnswers() {
  const categoryStyles = {
    period: "bg-rose-50 text-rose-600 border-rose-200",
    wellness: "bg-purple-50 text-purple-600 border-purple-200",
    ovulation: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pregnancy: "bg-blue-50 text-blue-600 border-blue-200"
  };

  // 3 Real Articles from Wellness Hub
  const featuredArticles = ARTICLES.slice(0, 3).map((a) => ({
    ...a,
    categoryColor: categoryStyles[a.category] || "bg-pink-50 text-pink-600 border-pink-200",
    href: `/articles/${a.id}`
  }));

  return (
    <section id="expert-answers" className="py-16 sm:py-24 bg-white border-b border-pink-100/80 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight leading-snug">
            Reproductive Health & Ovulation Questions Answered by Experts
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-gray-600 font-normal max-w-2xl mx-auto leading-relaxed">
            Medically reviewed cycle guides, conception timing insights, and natural Ayurvedic care to support every phase of your journey.
          </p>
        </div>

        {/* 3 Articles Grid matching Reference Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {featuredArticles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-pink-100/80 hover:border-pink-300 shadow-xs hover:shadow-xl hover:shadow-pink-900/5 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Article Image Container - Sleek Compact Height */}
              <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-gray-50">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full border shadow-2xs backdrop-blur-md ${article.categoryColor}`}>
                    {article.tag || article.categoryName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-flo-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Brief Excerpt */}
                  <p className="text-sm text-gray-500 font-normal mt-1.5 leading-relaxed line-clamp-2">
                    {article.summary}
                  </p>
                </div>

                {/* Meta & Action */}
                <div className="pt-3 mt-3 border-t border-pink-50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium">
                    <span>{article.publishedDate || article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-flo-600 group-hover:translate-x-0.5 transition-transform shrink-0">
                    Read &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Banner to explore full library */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/wellness-hub"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-flo-500 hover:bg-flo-600 text-white font-bold text-sm shadow-md shadow-pink-200 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>Explore All Wellness Hub Topics</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Cycle Insights
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-flo-500" />
              Ayurveda Care
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Regularly Updated
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

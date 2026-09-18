'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ARTICLES } from '../data/articles';
import ArticleCard from './ArticleCard';
import { Search, Sparkles, PlusCircle, BookOpen, ArrowRight } from 'lucide-react';

export default function ArticleSection({ selectedCategory, onSelectCategory }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddHelp, setShowAddHelp] = useState(false);

  // Filter articles based on active category & search query
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.tags && article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="articles" className="py-16 bg-flo-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
              Period & Ovulation Health Guides
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Explore helpful wellness guides, cycle tips, and reproductive health insights. Click any article to read the full guide.
            </p>
          </div>

          {/* Search Bar & Add Guide Helper */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, symptoms..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-pink-200 text-sm focus:outline-none focus:ring-2 focus:ring-flo-500 focus:border-transparent shadow-xs"
              />
            </div>

            <button
              onClick={() => setShowAddHelp(!showAddHelp)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-white hover:bg-flo-50 text-gray-700 font-bold text-xs rounded-2xl border border-pink-200 shadow-xs transition-colors shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-flo-500" />
              <span>How to Add Articles</span>
            </button>
          </div>
        </div>

        {/* User Guide Box for Adding Articles */}
        {showAddHelp && (
          <div className="mb-10 p-6 rounded-3xl bg-white border-2 border-dashed border-flo-300 shadow-sm animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-bold text-flo-700 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-flo-500" />
                  <span>તમારે નવો આર્ટિકલ કે ફોટો કેવી રીતે ઉમેરવો? (Static & Easy):</span>
                </h4>
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <p>1. <strong>ડેટા ફાઇલ:</strong> પ્રોજેક્ટમાં <code className="bg-pink-100 text-flo-700 px-2 py-0.5 rounded font-mono text-xs">src/data/articles.js</code> ફાઇલ ખોલો.</p>
                  <p>2. <strong>કોપી-પેસ્ટ:</strong> ઉપર રહેલા કોઈપણ આર્ટિકલના બ્લોકને કોપી કરીને નીચે પેસ્ટ કરો અને તમારું શીર્ષક (Title), કેટેગરી અને પેરાગ્રાફ લખો.</p>
                  <p>3. <strong>ફોટો:</strong> તમારો ફોટો <code className="bg-pink-100 text-flo-700 px-2 py-0.5 rounded font-mono text-xs">public/images/articles/</code> માં મૂકીને તેનો પાથ લખો અથવા કોઈપણ ઓનલાઇન image લિંક આપો.</p>
                  <p>4. <strong>પરિણામ:</strong> આપમેળે તેનો પોતાનો નવો અલગ URL પેજ <code className="bg-pink-100 text-flo-700 px-2 py-0.5 rounded font-mono text-xs">/articles/[id]</code> બની જશે!</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddHelp(false)}
                className="text-xs text-gray-400 hover:text-gray-600 font-bold ml-4"
              >
                Close ✕
              </button>
            </div>
          </div>
        )}

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', name: 'All Articles' },
            { id: 'period', name: 'Menstrual Cycle' },
            { id: 'ovulation', name: 'Ovulation & Fertility' },
            { id: 'pregnancy', name: 'Pregnancy Signs' },
            { id: 'wellness', name: 'PCOS & Hormones' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-flo-600 text-white border-flo-600 shadow-sm'
                  : 'bg-white text-gray-700 border-pink-200 hover:border-pink-300 hover:bg-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-pink-100 p-8">
            <p className="text-lg font-bold text-gray-700">No articles found matching "{searchQuery}"</p>
            <p className="text-sm text-gray-500 mt-1">Try another keyword or select "All Articles".</p>
            <button
              onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
              className="mt-4 px-5 py-2 bg-flo-100 text-flo-700 rounded-full text-xs font-bold hover:bg-flo-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Link to Wellness Hub */}
        <div className="mt-12 text-center">
          <Link
            href="/wellness-hub"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-pink-200 hover:border-flo-300 text-flo-600 font-bold text-sm shadow-xs hover:shadow-md transition-all"
          >
            <span>Explore Entire Wellness Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

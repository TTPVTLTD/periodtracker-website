'use client';

import React from 'react';
import { CATEGORIES } from '../data/categories';
import { Sparkles, CalendarHeart, Egg, HeartHandshake, Activity } from 'lucide-react';

const iconMap = {
  Sparkles,
  CalendarHeart,
  Egg,
  HeartHandshake,
  Activity
};

export default function CategoriesSection({ activeCategory, onSelectCategory }) {
  return (
    <section className="py-12 bg-flo-50/50 border-y border-pink-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
            Explore Health Topics & Categories
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Flo-inspired educational library written by certified reproductive specialists.
          </p>
        </div>

        {/* Categories Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const isSelected = activeCategory === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  const el = document.getElementById('articles');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white border-flo-500 shadow-md shadow-pink-100 scale-102 ring-2 ring-flo-400/20'
                    : 'bg-white/80 border-pink-100 hover:border-pink-300 hover:bg-white shadow-xs'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                  isSelected ? 'bg-flo-500 text-white' : 'bg-flo-100 text-flo-600'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className={`text-xs sm:text-sm font-bold ${
                  isSelected ? 'text-flo-600' : 'text-gray-800'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

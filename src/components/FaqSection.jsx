'use client';

import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqSection() {
  // Support independent toggling so expanding an FAQ on one side doesn't collapse the other
  const [openIndices, setOpenIndices] = useState([0]);

  const toggleFaq = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const faqs = FAQS.slice(0, 8);
  const half = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, half);
  const rightFaqs = faqs.slice(half);

  const renderFaqCard = (faq, idx) => {
    const isOpen = openIndices.includes(idx);

    return (
      <div
        key={idx}
        onMouseEnter={() => setOpenIndices((prev) => (prev.includes(idx) ? prev : [...prev, idx]))}
        onMouseLeave={() => setOpenIndices((prev) => prev.filter((i) => i !== idx))}
        className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
          isOpen ? 'border-pink-300 shadow-md shadow-pink-900/5' : 'border-pink-100/90 shadow-2xs hover:border-pink-200'
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(idx)}
          className="w-full px-5 py-4 sm:py-5 text-left flex items-start justify-between gap-3 focus:outline-none cursor-pointer"
        >
          <span className={`font-bold text-sm sm:text-base leading-snug transition-colors ${
            isOpen ? 'text-flo-600' : 'text-gray-900'
          }`}>
            {faq.question}
          </span>
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 ${
              isOpen ? 'bg-flo-600 text-white rotate-180 scale-110' : 'bg-pink-100 text-flo-600'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </button>

        {isOpen && (
          <div className="px-5 pb-5 pt-2 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-pink-50 bg-pink-50/20 animate-fadeIn">
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#fffbfa] border-b border-pink-100/70 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-flo-700 text-xs sm:text-sm font-bold mb-3 border border-pink-200">
            <HelpCircle className="w-4 h-4 text-flo-500" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Frequently Asked Questions About Period & Ovulation Tracking
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Doctor-verified answers regarding menstrual cycle calculations, fertile windows, safe days to prevent pregnancy, and personal health privacy.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* Left Column */}
          <div className="space-y-4">
            {leftFaqs.map((faq, i) => renderFaqCard(faq, i))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightFaqs.map((faq, i) => renderFaqCard(faq, i + half))}
          </div>
        </div>

      </div>
    </section>
  );
}

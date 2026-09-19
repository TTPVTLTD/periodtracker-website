'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Heart, Award } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const reviews = [
    {
      id: 0,
      text: "“Amazing platform 🌸 It's so much more than just a period tracker. It helps with trustworthy cycle insights provided by health professionals without selling my private data.”",
      author: "Priya M.",
      tag: "Cycle Tracker User"
    },
    {
      id: 1,
      text: "“Best ovulation & cycle tool I’ve ever used. Over the years I’ve tried many apps, but this website has got to be the best. By tracking my fertile window here, I got a better idea about my cycle. Now I'm pregnant!”",
      author: "Kristen Duval",
      tag: "Mom-to-be • Pregnancy Journey"
    },
    {
      id: 2,
      text: "“The Beta hCG doubling calculator and pregnancy test tool gave me complete peace of mind in early pregnancy. The doubling charts and timeline predictions are clear, honest, and easy to understand.”",
      author: "Jessica T.",
      tag: "Early Pregnancy Journey"
    },
    {
      id: 3,
      text: "“Managing PCOS made my cycles irregular and unpredictable. The ovulation prediction algorithms and cervical mucus guides finally helped me understand what was happening in my body.”",
      author: "Amina Patel",
      tag: "Hormone Wellness Reader"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-16 sm:py-20 bg-gradient-to-b from-white via-flo-50/20 to-white border-b border-pink-100/70 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching Reference Image 3 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="  font-extrabold leading-snug">
            What Our Community Says About Period Tracker
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            From managing unpredictable PCOS cycles to pinpointing fertile conception days and finding herbal cramp relief, discover why hundreds of thousands of women trust our companion every month.
          </p>
        </div>

        {/* Carousel Container matching Reference Image 3 */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* 3 Visible Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Previous Card (semi-transparent on desktop) */}
            <div className="hidden md:block p-6 rounded-3xl bg-white/70 border border-pink-100 shadow-xs opacity-60 transform scale-95 transition-all text-center space-y-4">
              <p className="text-gray-600 italic line-clamp-4 leading-relaxed">
                {reviews[(currentIndex - 1 + reviews.length) % reviews.length].text}
              </p>
              <div>
                <span className="font-bold text-gray-800 block">
                  {reviews[(currentIndex - 1 + reviews.length) % reviews.length].author}
                </span>
                <span className="text-gray-500 font-medium">
                  {reviews[(currentIndex - 1 + reviews.length) % reviews.length].tag}
                </span>
              </div>
            </div>

            {/* Active Highlighted Center Card */}
            <div className="p-8 rounded-3xl bg-white border-2 border-pink-200 shadow-xl shadow-pink-100/70 text-center space-y-6 relative transform md:scale-105 z-10 transition-all">
              
              {/* Navigation Chevrons inside or beside */}
              <div className="flex justify-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              <p className=" text-gray-800 font-medium leading-relaxed">
                {reviews[currentIndex].text}
              </p>

              <div className="pt-2 border-t border-pink-50">
                <span className="font-bold text-gray-900 block">
                  {reviews[currentIndex].author}
                </span>
                <span className="font-semibold text-flo-600 mt-0.5 block">
                  {reviews[currentIndex].tag}
                </span>
              </div>

            </div>

            {/* Next Card (semi-transparent on desktop) */}
            <div className="hidden md:block p-6 rounded-3xl bg-white/70 border border-pink-100 shadow-xs opacity-60 transform scale-95 transition-all text-center space-y-4">
              <p className="text-gray-600 italic line-clamp-4 leading-relaxed">
                {reviews[(currentIndex + 1) % reviews.length].text}
              </p>
              <div>
                <span className="font-bold text-gray-800 block">
                  {reviews[(currentIndex + 1) % reviews.length].author}
                </span>
                <span className="text-gray-500 font-medium">
                  {reviews[(currentIndex + 1) % reviews.length].tag}
                </span>
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-pink-200 bg-white hover:bg-flo-50 flex items-center justify-center text-gray-600 transition-colors shadow-xs"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === idx ? 'w-5 bg-flo-600' : 'bg-pink-200 hover:bg-pink-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-pink-200 bg-white hover:bg-flo-50 flex items-center justify-center text-gray-600 transition-colors shadow-xs"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Global Ratings Banner matching Reference Image 3 */}
        <div className="mt-16 text-center space-y-3">
          <div className="flex justify-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>

          <h3 className=" font-bold">
            Loved & Trusted by Women Worldwide
          </h3>

          <div className="flex items-center justify-center gap-6 font-bold text-gray-700 pt-1">
            <span className="flex items-center gap-1.5">
              {/* <span>🍏</span> */}
              <span>4.9 / 5 Mobile & Web</span>
            </span>
            {/* <span>•</span> */}
            {/* <span className="flex items-center gap-1.5">
              <span>⭐</span>
              <span>98% Doctor Verified Accuracy</span>
            </span> */}
          </div>
        </div>

      </div>
    </section>
  );
}

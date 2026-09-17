'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export default function WhatYouCanDo() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const features = [
    {
      id: 0,
      title: "Track your cycle and flow symptoms",
      linkText: "period and cycle predictor",
      linkHref: "/app-features#cycle-tracking",
      image: "/images/app/app-screen-1.png",
      description: "Figure out what's normal for you with our accurate cycle predictor. Spot patterns in your daily moods, cramps, and energy so you're always prepared."
    },
    {
      id: 1,
      title: "Understand your fertility better",
      linkText: "ovulation radar",
      linkHref: "/app-features#ovulation-radar",
      image: "/images/app/app-screen-2.png",
      description: "Get daily conception guidance and learn how to read your body's fertility signals with our ovulation tracker — so you can maximize your chances of a positive test."
    },
    {
      id: 2,
      title: "Pregnancy & Milestone Tracker",
      linkText: "pregnancy and milestone tracker",
      linkHref: "/app-features#pregnancy-tracker",
      image: "/images/app/app-screen-3.png",
      description: "Switch seamlessly into Pregnancy Mode to track all 40 gestational weeks, monitor developmental milestones, count fetal kicks, and prepare for your estimated due date."
    },
    {
      id: 3,
      title: "Discover ancient Ayurvedic remedies",
      linkText: "Ayurvedic wellness library",
      linkHref: "/wellness-hub",
      image: "/images/app/app-screen-4.png",
      description: "Embrace nature's path to hormonal harmony. Access time-tested Ayurvedic remedies, herbs, and diet protocols formulated for cramps, PMS, PCOS, and bloating."
    },
    {
      id: 4,
      title: "Smart AI Health Summaries & Privacy Vault",
      linkText: "doctor-ready health summaries",
      linkHref: "/app-features#ai-reports",
      image: "/images/app/app-screen-5.png",
      description: "Synthesize multi-month symptom logs into clean, doctor-ready digital wellness summaries with 100% on-device sandboxed privacy."
    }
  ];

  // Auto screen change every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % features.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, features.length]);

  const currentFeature = features[activeTab];

  return (
    <section 
      id="features"
      className="py-14 sm:py-20 bg-white border-b border-pink-100/80 scroll-mt-20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-flo-700 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-flo-600" />
            <span>Interactive Mobile Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            Smart Features Designed Around Your Natural Rhythm
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover how our intuitive companion supports every phase of your reproductive journey—from everyday symptom tracking to AI-powered health summaries and soothing herbal comfort.
          </p>
        </div>

        {/* 2-Column Showcase matching Reference Image 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Phone Showcase with Dots Below matching Reference Image 3 */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Slim Mobile Phone Frame - Silver Bezel matching Banner Simulator */}
            <div className="relative w-[240px] sm:w-[260px] md:w-[275px] h-[510px] sm:h-[550px] md:h-[585px] bg-white rounded-[2.6rem] p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(235,115,145,0.18)] border-[3.5px] border-[#e4d7d7] select-none transition-all duration-300">
              
              {/* Top Speaker Slit */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#d5cbcc] rounded-full z-30" />

              {/* Screen Display with smooth transition */}
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative shadow-inner">
                <Image
                  key={currentFeature.id}
                  src={currentFeature.image}
                  alt={currentFeature.title}
                  fill
                  priority
                  className="object-cover object-top transition-all duration-500 ease-in-out"
                  sizes="(max-width: 768px) 240px, 275px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>
            </div>

            {/* Pagination Dots below phone with active pill indicator */}
            <div className="flex items-center gap-2 mt-5">
              {features.map((feat) => (
                <button
                  key={feat.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(feat.id);
                    setIsPaused(true);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeTab === feat.id ? 'w-7 bg-flo-500 shadow-sm shadow-pink-300' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View ${feat.title}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Clean, Compact Feature List matching Reference Image 3 */}
          <div className="lg:col-span-7 space-y-2">
            {features.map((feat) => {
              const isSelected = activeTab === feat.id;

              return (
                <div
                  key={feat.id}
                  onClick={() => {
                    setActiveTab(feat.id);
                    setIsPaused(true);
                  }}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#fff0f4] border border-pink-200 border-l-4 border-l-flo-500 shadow-xs'
                      : 'bg-transparent border border-transparent hover:bg-flo-50/50'
                  }`}
                >
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
                    {feat.description.split(feat.linkText)[0]}
                    <Link
                      href={feat.linkHref}
                      className="text-gray-800 font-semibold underline decoration-pink-300 hover:text-flo-600 transition-colors inline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {feat.linkText}
                    </Link>
                    {feat.description.split(feat.linkText)[1] || ''}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Quick App Download Bar */}
        <div className="mt-12 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-flo-50/50 rounded-3xl p-6">
          <div className="text-center sm:text-left">
            <h4 className="font-extrabold text-gray-900 text-base">Ready to start tracking on your phone?</h4>
            <p className="text-xs text-gray-500 mt-0.5">Log daily periods, generate AI reports, and explore Ayurvedic remedies.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/app-features"
              className="px-4 py-2.5 rounded-xl bg-white border border-pink-200 hover:bg-pink-50 text-flo-600 font-bold text-xs transition-transform hover:-translate-y-0.5 shadow-2xs"
            >
              Explore All Features &rarr;
            </Link>
            <a
              href="https://apps.apple.com/app/id6774117828"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-gray-900 text-white font-bold text-xs transition-transform hover:-translate-y-0.5 shadow-xs cursor-pointer"
            >
              Download on App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.tracewave.period"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-black hover:bg-gray-900 text-white font-bold text-xs transition-transform hover:-translate-y-0.5 shadow-xs cursor-pointer"
            >
              Get on Google Play
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

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
      title: "Track Your Period, Flow & Cycle Symptoms",
      linkText: "period and cycle predictor",
      linkHref: "/app-features#cycle-tracking",
      image: "/images/app/app-screen-1.png",
      description: "Understand your unique cycle rhythm with our accurate period and cycle predictor. Spot recurring patterns in PMS symptoms, cramps, flow intensity, and mood so you are always prepared."
    },
    {
      id: 1,
      title: "Ovulation Calculator & Fertile Window Radar",
      linkText: "ovulation radar",
      linkHref: "/app-features#ovulation-radar",
      image: "/images/app/app-screen-2.png",
      description: "Receive daily fertility forecasts and discover your 6-day conception window with our intelligent ovulation radar — helping you pinpoint ovulation whether planning pregnancy or monitoring natural rhythm."
    },
    {
      id: 2,
      title: "Pregnancy Due Date & Milestone Tracker",
      linkText: "pregnancy and milestone tracker",
      linkHref: "/app-features#pregnancy-tracker",
      image: "/images/app/app-screen-3.png",
      description: "Switch into Pregnancy Mode to follow all 40 gestational weeks with our pregnancy and milestone tracker, monitoring fetal growth comparisons, kick counts, and estimated due date calculations."
    },
    {
      id: 3,
      title: "Ancient Ayurvedic Care for Cramps & PMS",
      linkText: "Ayurvedic wellness library",
      linkHref: "/wellness-hub?category=ayurveda",
      image: "/images/app/app-screen-4.png",
      description: "Harness natural holistic balance with our Ayurvedic wellness library. Access herbal remedies, teas, and soothing lifestyle routines crafted for menstrual cramp relief, bloating, and hormonal balance."
    },
    {
      id: 4,
      title: "Smart AI Health Summaries & 100% Private Vault",
      linkText: "doctor-ready health summaries",
      linkHref: "/app-features#ai-reports",
      image: "/images/app/app-screen-5.png",
      description: "Transform multi-month symptom logs into doctor-ready health summaries with 100% on-device sandboxed privacy — ensuring your reproductive data stays solely in your hands."
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
      className="py-14 sm:py-20 bg-white border-b border-pink-100/80 scroll-mt-24 sm:scroll-mt-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100 text-flo-700 text-xs sm:text-sm font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-flo-600" />
            <span>Comprehensive Reproductive Health Tracking</span>
          </div> */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight leading-snug">
            Smart Menstrual Cycle & Fertility Tracking Features
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover how our intuitive companion supports every stage of your reproductive journey — from daily flow logging and ovulation calculations to pregnancy milestones and natural Ayurvedic comfort.
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

                  <p className="text-sm text-gray-600 font-normal leading-relaxed">
                    {feat.description.split(feat.linkText)[0]}
                    <Link
                      href={feat.linkHref}
                      className="text-gray-900 font-semibold underline decoration-pink-300 hover:text-flo-600 transition-colors inline"
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
            <h3 className="font-bold text-gray-900 text-base">Ready to start tracking on your phone?</h3>
            <p className="text-sm text-gray-500 mt-0.5">Log daily periods, generate AI reports, and explore Ayurvedic remedies.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              href="/app-features"
              className="px-4 py-2.5 rounded-xl bg-white border border-pink-200 hover:bg-pink-50 text-flo-600 font-bold text-sm transition-transform hover:-translate-y-0.5 shadow-2xs"
            >
              Explore All Features &rarr;
            </Link>
           {/* Apple App Store Button */}
              <a
                href="https://apps.apple.com/app/id6774117828"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-black hover:bg-gray-900 text-white transition-all shadow-sm hover:shadow-md duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.08 1.74-.95 2.77 1.01.08 2.05-.51 2.68-1.27z"/>
                </svg>
                <div className="text-left">
                  {/* <div className="text-xs uppercase font-medium leading-none text-gray-300">Download on the</div> */}
                  <div className="text-sm font-bold leading-tight font-sans tracking-tight">App Store</div>
                </div>
              </a>

              {/* Google Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.tracewave.period"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-black hover:bg-gray-900 text-white transition-all shadow-sm hover:shadow-md duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4z"/>
                  <path fill="#FBBC05" d="M17.3 8.5L5.1.7C4.6.4 4.1.3 3.6 1.8l10.2 10.2 3.5-3.5z"/>
                  <path fill="#34A853" d="M17.3 15.5l-3.5-3.5L3.6 22.2c.5.5 1 .3 1.5.1l12.2-6.8z"/>
                  <path fill="#EA4335" d="M20.9 10.5l-3.6-2-3.5 3.5 3.5 3.5 3.6-2c.9-.5.9-1.5 0-2z"/>
                </svg>
                <div className="text-left">
                  {/* <div className="text-xs uppercase font-medium leading-none text-gray-300">GET IT ON</div> */}
                  <div className="text-sm font-bold leading-tight font-sans tracking-tight">Google Play</div>
                </div>
              </a>

          </div>
        </div>

      </div>
    </section>
  );
}

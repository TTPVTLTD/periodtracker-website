'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, Heart, Calendar, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-6 sm:pt-8 lg:pt-10 pb-0 bg-mesh-glow border-b border-pink-100/70 scroll-mt-24 sm:scroll-mt-28">
      
      {/* Soft background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[460px] h-[460px] bg-brand-pink/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-[380px] h-[380px] bg-brand-peach/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Left Column: Headline, App Ratings, Store Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left py-4 sm:py-6 lg:py-10">

            {/* Main Primary SEO H1 */}
            <h1 className="font-extrabold leading-snug">
               Period Tracker Ovulation Cycles - <br />
               <span className="bg-gradient-to-r from-brand-pink via-brand-babyPink to-brand-peach bg-clip-text text-transparent">Smart Cycle Calendar</span>
            </h1>

            {/* Subheadline with core keywords */}
            <p className=" text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Your ultimate daily companion for menstrual health. Forecast your period, pinpoint ovulation, and log PMS symptoms securely. 100% on-device privacy, trusted by over half a million women worldwide.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1  font-semibold text-gray-700">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-pink-100 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-flo-500" />
                98% Forecast Accuracy
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-pink-100 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-flo-500" />
                100% On-Device Privacy
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-pink-100 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-flo-500" />
                Ayurvedic Care & AI Reports
              </span>
            </div>

            {/* App Store & Google Play Download Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              
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
                  {/* <div className="uppercase font-medium leading-none text-gray-300">Download on the</div> */}
                  <div className="font-bold leading-tight font-sans tracking-tight">App Store</div>
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
                  {/* <div className="uppercase font-medium leading-none text-gray-300">GET IT ON</div> */}
                  <div className="font-bold leading-tight font-sans tracking-tight">Google Play</div>
                </div>
              </a>

              {/* Web Cycle Calculator shortcut */}
              <Link
                href="/calculators/ovulation-calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-flo-50 text-flo-600 font-bold border border-pink-200 shadow-2xs transition-colors"
              >
                <Calendar className="w-4 h-4 text-flo-500" />
                <span>Try Online Tools</span>
              </Link>
            </div>

            {/* Period tracker annotation */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-2 text-flo-600 font-semibold">
              {/* <span className=" text-flo-600 font-serif italic">Smart AI Period Tracker & Ovulation Predictor ↗</span> */}
            </div>

          </div>

          {/* Right Column: Phone Showcase emerging from bottom edge */}
          <div className="lg:col-span-5 relative flex justify-center items-end self-end select-none pt-4 lg:pt-8">
            
            {/* Background Circular Floating Accents */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border-[14px] border-pink-200/50 -z-10 bottom-6 sm:bottom-10" />
            <div className="absolute w-88 h-88 rounded-full bg-gradient-to-tr from-pink-200/30 via-rose-100/30 to-transparent -z-20 blur-xl bottom-0 pointer-events-none" />

            {/* Floating Card 1: Symptom Patterns (Flo Reference Style) */}
            <div className="absolute -left-3 sm:-left-8 top-10 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl shadow-pink-900/10 border border-pink-100/90 z-20 hidden sm:block text-left">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                Symptom patterns
              </span>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-flo-500 shrink-0" />
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < 4 ? 'bg-pink-300' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                  <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => (
                      <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < 3 ? 'bg-purple-300' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Cycle Trends (Flo Reference Style) */}
            <div className="absolute -right-3 sm:-right-8 top-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl shadow-pink-900/10 border border-pink-100/90 z-20 hidden sm:block text-left">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider block mb-1">
                Cycle trends
              </span>
              <svg className="w-24 h-7 overflow-visible" viewBox="0 0 96 28">
                <path
                  d="M2,20 C18,20 24,6 38,10 C52,14 58,4 72,14 C82,20 88,8 94,12"
                  fill="none"
                  stroke="#ff4b72"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="38" cy="10" r="2.5" fill="#ff4b72" />
                <circle cx="72" cy="14" r="2.5" fill="#ff4b72" />
              </svg>
            </div>

            {/* Floating Card 3: Health Assistant Badge */}
            <div className="absolute -right-2 sm:-right-6 bottom-32 sm:bottom-36 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg shadow-pink-900/10 border border-pink-100/90 z-20 flex items-center gap-2 hidden sm:flex">
              <span className="">🌸</span>
              <span className="text-sm font-bold text-gray-800">
                Hi, I'm Health Assistant
              </span>
            </div>

            {/* Smartphone Simulator - Light Silver/Rose-Gray Border from reference & partially submerged */}
            <div className="relative w-[235px] sm:w-[260px] md:w-[280px] h-[480px] sm:h-[520px] md:h-[550px] bg-white rounded-[2.6rem] p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(235,115,145,0.18)] border-[3.5px] border-[#e4d7d7] -mb-28 sm:-mb-32 md:-mb-36 select-none">
              
              {/* Top Speaker Slit */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#d5cbcc] rounded-full z-30" />

              {/* Screen Display Container */}
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative shadow-inner">
                
                {/* Real App Screenshot (Home Cycle Dial) */}
                <Image
                  src="/images/app/app-screen-1.png"
                  alt="Period Tracker & Ovulation Calculator app interface showing menstrual cycle calendar, period dial, and fertile window prediction"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 235px, 280px"
                />

                {/* Subtle soft glass reflection highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

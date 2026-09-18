'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function MissionBanner() {
  return (
    <section id="mission" className="w-full py-16 sm:py-24 bg-gradient-to-r from-[#fff3eb] via-[#fdeaf2] to-[#edf0fa] border-y border-pink-100/70 overflow-hidden scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Seamless Transparent Illustration with zero square edges */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-80 sm:w-96 md:w-[420px] aspect-square">
              <Image
                src="/images/global-mission.png"
                alt="Global women accessing Period Tracker and reproductive wellness tools worldwide"
                fill
                priority
                className="object-contain drop-shadow-sm"
                sizes="(max-width: 768px) 320px, 420px"
              />
            </div>
          </div>

          {/* Right Column: Mission Text Content matching Reference Image 2 */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Global Reproductive Health Access for Every Woman
            </h2>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal max-w-2xl">
              Through our Open Reproductive Health Initiative, we provide free menstrual cycle tracking, fertile window insights, and holistic Ayurvedic care to women and families worldwide — because reproductive health literacy is a fundamental right, not a luxury.
            </p>

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

              <Link
                href="/about/science-and-research"
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-900 group transition-colors ml-1"
              >
                <span className="underline decoration-teal-400 group-hover:decoration-teal-600">
                  Our Science & Research
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

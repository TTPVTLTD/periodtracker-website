'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 text-gray-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Col 1: Brand & Logo (Circle, Larger, Borderless) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center space-x-3.5 group">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
                <Image
                  src="/logo.png"
                  alt="Period Tracker & Ovulation Cycle Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black bg-gradient-to-r from-flo-600 to-pink-500 bg-clip-text text-transparent block">
                  Period Tracker & Ovulation
                </span>
                <span className="text-xs text-gray-400 font-semibold tracking-wide">
                  Women’s Health & Reproductive Wellness
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              An intelligent, 100% private women's cycle and fertility companion designed to predict periods, generate AI health reports, and provide natural Ayurvedic remedies with in-device data security.
            </p>

            {/* Official Mobile App Download Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <a
                href="https://apps.apple.com/app/id6774117828"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black hover:bg-gray-800 text-white transition-all shadow-xs text-xs font-bold cursor-pointer"
              >
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.08 1.74-.95 2.77 1.01.08 2.05-.51 2.68-1.27z"/>
                </svg>
                <span>App Store</span>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.tracewave.period"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black hover:bg-gray-800 text-white transition-all shadow-xs text-xs font-bold cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4z"/>
                  <path fill="#FBBC05" d="M17.3 8.5L5.1.7C4.6.4 4.1.3 3.6 1.8l10.2 10.2 3.5-3.5z"/>
                  <path fill="#34A853" d="M17.3 15.5l-3.5-3.5L3.6 22.2c.5.5 1 .3 1.5.1l12.2-6.8z"/>
                  <path fill="#EA4335" d="M20.9 10.5l-3.6-2-3.5 3.5 3.5 3.5 3.6-2c.9-.5.9-1.5 0-2z"/>
                </svg>
                <span>Google Play</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>End-to-End Encrypted Privacy • Zero Ad Tracking</span>
            </div>
          </div>

          {/* Col 2: Cycle Calculators */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
              Cycle Calculators
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/calculators/ovulation-calculator" className="hover:text-flo-600 transition-colors">
                  Ovulation Day Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/period-calculator" className="hover:text-flo-600 transition-colors">
                  Period & Cycle Predictor
                </Link>
              </li>
              <li>
                <Link href="/calculators/pregnancy-due-date-calculator" className="hover:text-flo-600 transition-colors">
                  Pregnancy Due Date (LMP)
                </Link>
              </li>
              <li>
                <Link href="/calculators/hcg-calculator" className="hover:text-flo-600 transition-colors">
                  Beta hCG Doubling Tracker
                </Link>
              </li>
              <li>
                <Link href="/calculators/pregnancy-test-calculator" className="hover:text-flo-600 transition-colors">
                  When to Take Pregnancy Test
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/calculators" className="text-xs font-bold text-flo-600 hover:underline inline-flex items-center gap-1">
                  <span>Browse all 8 reproductive tools</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Wellness Hub */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
              Health & Ayurveda
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/wellness-hub" className="hover:text-flo-600 transition-colors">
                  Questions Answered by Experts
                </Link>
              </li>
              <li>
                <Link href="/about/ayurveda-care" className="hover:text-flo-600 transition-colors">
                  Ayurvedic Remedies for Cramps & PMS
                </Link>
              </li>
              <li>
                <Link href="/about/ai-reports" className="hover:text-flo-600 transition-colors">
                  AI-Generated Cycle Health Reports
                </Link>
              </li>
              <li>
                <Link href="/articles/best-time-to-have-sex-avoid-pregnancy" className="hover:text-flo-600 transition-colors">
                  Fertile Windows & Timing Intercourse
                </Link>
              </li>
              <li>
                <Link href="/articles/how-long-birth-control-stays-in-system" className="hover:text-flo-600 transition-colors">
                  Birth Control & Return of Fertility
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Subscription */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider">
              Platform & App
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>
                <Link href="/app-features" className="hover:text-flo-600 transition-colors font-bold text-rose-600">
                  Mobile App Features
                </Link>
              </li>
              <li>
                <Link href="/about/science-and-research" className="hover:text-flo-600 transition-colors">
                  Science & Research
                </Link>
              </li>
              <li>
                <Link href="/subscription" className="hover:text-flo-600 transition-colors font-bold text-flo-600">
                  Manage Subscription
                </Link>
              </li>
              <li>
                <Link href="/about/privacy-portal" className="hover:text-flo-600 transition-colors">
                  Privacy & Data Safety
                </Link>
              </li>
              <li>
                <Link href="/about/contact" className="hover:text-flo-600 transition-colors">
                  Support & Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/app/id6774117828"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-flo-600 transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                >
                  <span>iOS App Store</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.tracewave.period"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-flo-600 transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                >
                  <span>Google Play App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical & Legal Disclaimer - Compact & Sleek */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gray-50/80 border border-gray-200/70 text-[11px] sm:text-xs text-gray-500 leading-relaxed">
          <p>
            <strong className="text-gray-700">Educational Disclaimer:</strong> The calculators, forecasts, and articles on this platform are for informational and educational purposes only and do not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare practitioner for personalized health care.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Period Tracker & Ovulation Cycle. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about/privacy-portal" className="hover:text-flo-600 transition-colors">
              Privacy Portal
            </Link>
            <Link href="/about/science-and-research" className="hover:text-flo-600 transition-colors">
              Science & Research
            </Link>
            <span className="flex items-center gap-1 text-gray-400">
              Made with <Heart className="w-3.5 h-3.5 text-flo-500 fill-flo-500" /> for women's wellness
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

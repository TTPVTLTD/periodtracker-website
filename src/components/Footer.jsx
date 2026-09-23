'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  // App Mode Detection (Hides Footer when ?app=true is in URL)
  const [isAppMode, setIsAppMode] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('app') === 'true') {
        setIsAppMode(true);
      }
    }
  }, []);

  if (isAppMode) return null;

  return (
    <footer className="bg-[#FFF0F2]/60 border-t border-[#FF5E8C]/15 text-[#706B6E] pt-14 pb-10 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Main 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Col 1: Brand, Summary, Download Buttons & Social Media */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block group py-1" aria-label="Period Tracker & Ovulation Cycle Home">
              <Image
                src="/brand-logo-final.png"
                alt="Period Tracker & Ovulation Cycle Logo"
                width={220}
                height={60}
                className="h-11 sm:h-12 w-auto object-contain group-hover:opacity-95 transition-opacity"
              />
            </Link>

            <p className="text-sm text-[#706B6E] leading-relaxed max-w-sm font-medium">
              An intelligent, 100% private women's cycle and fertility companion designed to predict periods, generate AI health reports, and provide natural Ayurvedic remedies with in-device data security.
            </p>

            {/* Official Mobile App Download Buttons */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              {/* Apple App Store Button */}
              <a
                href="https://apps.apple.com/app/id6774117828"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1A1819] hover:bg-[#1A1819]/90 text-white transition-all shadow-sm hover:shadow-md duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.08 1.74-.95 2.77 1.01.08 2.05-.51 2.68-1.27z" />
                </svg>
                <div className="text-left">
                  {/* <div className="text-xs uppercase font-medium leading-none text-gray-400">Download on</div> */}
                  <div className="text-sm font-bold leading-tight font-sans tracking-tight">App Store</div>
                </div>
              </a>

              {/* Google Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=com.tracewave.period"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1A1819] hover:bg-[#1A1819]/90 text-white transition-all shadow-sm hover:shadow-md duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4z" />
                  <path fill="#FBBC05" d="M17.3 8.5L5.1.7C4.6.4 4.1.3 3.6 1.8l10.2 10.2 3.5-3.5z" />
                  <path fill="#34A853" d="M17.3 15.5l-3.5-3.5L3.6 22.2c.5.5 1 .3 1.5.1l12.2-6.8z" />
                  <path fill="#EA4335" d="M20.9 10.5l-3.6-2-3.5 3.5 3.5 3.5 3.6-2c.9-.5.9-1.5 0-2z" />
                </svg>
                <div className="text-left">
                  {/* <div className="text-xs uppercase font-medium leading-none text-gray-400">GET IT ON</div> */}
                  <div className="text-sm font-bold leading-tight font-sans tracking-tight">Google Play</div>
                </div>
              </a>
            </div>

            {/* Premium Theme Social Media Community Buttons */}
            <div className="pt-2 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A1819]/70 block">
                Connect With Our Community
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/people/Periodtracker-ovulationcycle/61591714556127/?sk=about"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  title="Follow us on Facebook"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#FF5E8C]/20 text-[#FF5E8C] hover:bg-[#FF5E8C] hover:text-white font-bold text-xs shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 group"
                >
                  <Facebook className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/periodtrackercycle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  title="Follow us on Instagram"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#FF5E8C]/20 text-[#FF5E8C] hover:bg-[#FF5E8C] hover:text-white font-bold text-xs shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 group"
                >
                  <Instagram className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://www.youtube.com/channel/UCQJUxL2BRIExf0CD2W104XA"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Subscribe on YouTube"
                  title="Subscribe on YouTube"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#FF5E8C]/20 text-[#FF5E8C] hover:bg-[#FF5E8C] hover:text-white font-bold text-xs shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 group"
                >
                  <Youtube className="w-4 h-4 transition-transform group-hover:scale-110 shrink-0" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Wellness Hub Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#1A1819] uppercase">
              Wellness Hub Topics
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#706B6E]">
              <li>
                <Link href="/wellness-hub?category=period" className="hover:text-[#FF5E8C] transition-colors">
                  Your Cycle (Periods & PMS)
                </Link>
              </li>
              <li>
                <Link href="/wellness-hub?category=wellness" className="hover:text-[#FF5E8C] transition-colors">
                  Health 360° (Hormones & Care)
                </Link>
              </li>
              <li>
                <Link href="/wellness-hub?category=ovulation" className="hover:text-[#FF5E8C] transition-colors">
                  Getting Pregnant (Fertility)
                </Link>
              </li>
              <li>
                <Link href="/wellness-hub?category=pregnancy" className="hover:text-[#FF5E8C] transition-colors">
                  Pregnancy (Milestones & Signs)
                </Link>
              </li>
              <li>
                <Link href="/wellness-hub?category=ayurveda" className="hover:text-[#FF5E8C] transition-colors">
                  Ayurveda & Cramp Care
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/wellness-hub" className="text-sm font-bold text-[#FF5E8C] hover:underline inline-flex items-center gap-1">
                  <span>Explore all wellness guides</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Cycle Tools & Features */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[#1A1819] uppercase">
              Cycle Tools & Calculators
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#706B6E]">
              <li>
                <Link href="/calculators/ovulation-calculator" className="hover:text-[#FF5E8C] transition-colors">
                  Ovulation Day Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators/period-calculator" className="hover:text-[#FF5E8C] transition-colors">
                  Period & Cycle Predictor
                </Link>
              </li>
              <li>
                <Link href="/calculators/pregnancy-due-date-calculator" className="hover:text-[#FF5E8C] transition-colors">
                  Pregnancy Due Date (LMP)
                </Link>
              </li>
              <li>
                <Link href="/calculators/hcg-calculator" className="hover:text-[#FF5E8C] transition-colors">
                  Beta hCG Doubling Tracker
                </Link>
              </li>
              <li>
                <Link href="/calculators/pregnancy-test-calculator" className="hover:text-[#FF5E8C] transition-colors">
                  When to Take Pregnancy Test
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/calculators" className="text-sm font-bold text-[#FF5E8C] hover:underline inline-flex items-center gap-1">
                  <span>Browse all 8 reproductive tools</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#1A1819] uppercase">
              Platform & Legal
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#706B6E]">
            
              <li>
                <Link href="/about" className="hover:text-[#FF5E8C] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FF5E8C] transition-colors">
                  FAQs & Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FF5E8C] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FF5E8C] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FF5E8C] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
                <li>
                <Link href="/app-features" className="hover:text-[#FF5E8C] transition-colors font-bold text-[#FF5E8C]">
                  App Features
                </Link>
              </li>
              {/* <li>
                <Link href="/subscription" className="hover:text-[#FF5E8C] transition-colors">
                  Subscriptions
                </Link>
              </li> */}
            </ul>
          </div>

        </div>

        {/* Educational Disclaimer */}
        <div className="p-4 rounded-2xl bg-white/90 border border-[#FF5E8C]/15 text-sm text-[#706B6E] leading-relaxed font-medium">
          <p>
            <strong className="text-[#1A1819] font-bold">Educational Disclaimer:</strong> The calculators, forecasts, and health articles on this platform are for informational and educational purposes only and do not replace professional medical advice, diagnosis, or treatment. Always consult a qualified gynecologist or healthcare provider for personalized medical care.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Quick Links */}
        <div className="pt-6 border-t border-[#FF5E8C]/15 flex flex-col sm:flex-row items-center justify-between text-sm text-[#706B6E] gap-4">
          <p className="font-medium text-center">
            © {new Date().getFullYear()} Tracewave Transparency PVT LTD. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold text-sm">
            <Link href="/privacy" className="hover:text-[#FF5E8C] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FF5E8C] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/about" className="hover:text-[#FF5E8C] transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-[#FF5E8C] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

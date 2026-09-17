'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { APP_FEATURES, APP_FEATURES_FAQS } from '../../data/appFeatures';
import { APP_LINKS } from '../../data/appLinks';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  HeartPulse, 
  Activity, 
  Calendar, 
  Leaf, 
  FileText, 
  Check, 
  HelpCircle,
  Award
} from 'lucide-react';

const FEATURE_ICONS = {
  'cycle-tracking': Calendar,
  'ovulation-radar': HeartPulse,
  'pregnancy-tracker': Activity,
  'pregnancy-journey': Activity,
  'ai-reports': FileText,
  'ayurveda-care': Leaf,
  'privacy-vault': ShieldCheck
};

const FEATURE_STYLES = {
  'cycle-tracking': {
    color: 'text-rose-600',
    bg: 'bg-rose-500',
    lightBg: 'bg-rose-50',
    border: 'border-rose-200'
  },
  'ovulation-radar': {
    color: 'text-emerald-700',
    bg: 'bg-emerald-600',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-200'
  },
  'pregnancy-tracker': {
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  'pregnancy-journey': {
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    lightBg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  'ai-reports': {
    color: 'text-purple-600',
    bg: 'bg-purple-600',
    lightBg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  'ayurveda-care': {
    color: 'text-amber-700',
    bg: 'bg-amber-600',
    lightBg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  'privacy-vault': {
    color: 'text-teal-700',
    bg: 'bg-teal-600',
    lightBg: 'bg-teal-50',
    border: 'border-teal-200'
  }
};

export default function AppFeaturesPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf9] text-gray-900 selection:bg-rose-100 selection:text-rose-900">
      <Navbar />

      <main className="flex-1">
        {/* Simple Clean Hero Header */}
        <section className="pt-14 pb-16 bg-gradient-to-b from-[#fef0e7] via-[#fff6f0] to-[#fffbf9] border-b border-orange-100/70">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-rose-200 text-rose-700 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Mobile App Architecture</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Simple, Powerful Features Designed Around <span className="text-rose-600">Your Body.</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore the core capabilities of Period Tracker—from precision cycle forecasts to ovulation detection, pregnancy milestones, AI health reports, and holistic comfort.
            </p>

            {/* Store Download Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APP_LINKS.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.67 1.38-.56.63-.99 1.66-.86 2.7.99.08 2.02-.48 2.61-1.21z" />
                </svg>
                <span>Download on App Store</span>
              </a>

              <a
                href={APP_LINKS.android}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a2.38 2.38 0 0 1-.61-1.636V3.45c0-.62.227-1.192.61-1.636zm11.242 11.244L17.27 15.48l-11.8 6.812 9.38-9.234zm0-2.116L5.47 1.708l11.8 6.812-2.419 2.424zm1.597 1.058l2.946-1.7a1.693 1.693 0 0 1 1.708 0l.006.003c.532.308.868.87.868 1.488s-.336 1.18-.868 1.488l-2.946 1.7-1.714-1.48v-1.5z" />
                </svg>
                <span>Get it on Google Play</span>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 shadow-2xs">
                <div className="text-lg font-black text-rose-600">85%+</div>
                <div className="text-xs text-gray-600 font-medium">Cycle Accuracy</div>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 shadow-2xs">
                <div className="text-lg font-black text-emerald-700">100%</div>
                <div className="text-xs text-gray-600 font-medium">Encrypted Privacy</div>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 shadow-2xs">
                <div className="text-lg font-black text-amber-700">50+</div>
                <div className="text-xs text-gray-600 font-medium">Ayurvedic Remedies</div>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl border border-orange-100 shadow-2xs">
                <div className="text-lg font-black text-purple-700">Real-Time</div>
                <div className="text-xs text-gray-600 font-medium">Encrypted Sync</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CORE APP FEATURES (CLEAN CARDS GRID - NO SIMULATOR) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Complete App Capabilities
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Everything you need to track, understand, and nurture your body through each cycle phase.
              </p>
            </div>

            {/* 2-Column Responsive Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {APP_FEATURES.map((feature, idx) => {
                const Icon = FEATURE_ICONS[feature.id] || Sparkles;
                const style = FEATURE_STYLES[feature.id] || FEATURE_STYLES['cycle-tracking'];

                return (
                  <div
                    key={feature.id}
                    id={feature.id}
                    className="bg-[#fffbf9] rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      
                      {/* Card Header: Icon & Category Badge */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className={`w-12 h-12 rounded-2xl ${style.lightBg} border ${style.border} flex items-center justify-center ${style.color} shadow-2xs`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ${feature.badgeColor}`}>
                          {feature.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-snug">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-gray-600">
                          {feature.subtitle}
                        </p>
                      </div>

                      {/* Overview Narrative */}
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {feature.overview}
                      </p>

                      {/* 4 Capabilities Bullet Points */}
                      <div className="grid grid-cols-1 gap-2.5 pt-2">
                        {feature.bullets.map((bullet, bIdx) => {
                          const [title, desc] = bullet.includes(':') 
                            ? bullet.split(':') 
                            : [bullet, ''];
                          return (
                            <div
                              key={bIdx}
                              className="p-3 rounded-2xl bg-white border border-gray-100 hover:border-orange-100 transition-colors"
                            >
                              <div className="flex items-start gap-2.5">
                                <CheckCircle2 className={`w-4 h-4 ${style.color} shrink-0 mt-0.5`} />
                                <div className="text-xs">
                                  <span className="font-bold text-gray-900 block">{title}</span>
                                  {desc && <span className="text-gray-600 leading-snug mt-0.5 block">{desc}</span>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Clinical Highlight Callout at Bottom */}
                    <div className={`p-3.5 sm:p-4 rounded-2xl border ${style.border} ${style.lightBg} flex items-center gap-3 shadow-2xs`}>
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs shrink-0">
                        <Award className={`w-4 h-4 ${style.color}`} />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-800">
                        <span className={`font-bold mr-1 ${style.color}`}>Clinical Highlight:</span>
                        {feature.highlight}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 bg-[#fffbf9] border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Common Questions About App Features
              </h2>
            </div>

            <div className="space-y-3">
              {APP_FEATURES_FAQS.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-gray-900 hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        activeFaq === fIdx ? 'rotate-90 text-rose-600' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === fIdx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Download CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Start Tracking With Confidence
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto">
              Download Period Tracker today for accurate cycle forecasting, pregnancy monitoring, and encrypted cloud sync.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APP_LINKS.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white text-gray-950 rounded-2xl font-bold text-xs shadow-lg hover:bg-gray-50 transition-all cursor-pointer"
              >
                Download on App Store
              </a>
              <a
                href={APP_LINKS.android}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-gray-950 text-white rounded-2xl font-bold text-xs shadow-lg hover:bg-black transition-all cursor-pointer"
              >
                Get on Google Play
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

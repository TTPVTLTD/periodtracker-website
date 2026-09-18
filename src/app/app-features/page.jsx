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
    color: 'text-brand-pink',
    bg: 'bg-brand-pink',
    lightBg: 'bg-brand-accent',
    border: 'border-pink-200'
  },
  'ovulation-radar': {
    color: 'text-emerald-700',
    bg: 'bg-emerald-600',
    lightBg: 'bg-emerald-50',
    border: 'border-emerald-200'
  },
  'pregnancy-tracker': {
    color: 'text-brand-peach',
    bg: 'bg-brand-peach',
    lightBg: 'bg-orange-50',
    border: 'border-orange-200'
  },
  'pregnancy-journey': {
    color: 'text-brand-peach',
    bg: 'bg-brand-peach',
    lightBg: 'bg-orange-50',
    border: 'border-orange-200'
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
    <div className="min-h-screen flex flex-col bg-[#FAF8F9] text-brand-dark selection:bg-brand-pink/20 selection:text-brand-pink font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Simple Clean Hero Header */}
        <section id="app-features-hero" className="scroll-mt-24 pt-12 sm:pt-16 pb-14 sm:pb-16 bg-mesh-glow border-b border-pink-100/80 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="glow-orb-pink absolute top-10 left-10 w-72 h-72 pointer-events-none -z-10" />
          <div className="glow-orb-peach absolute top-20 right-10 w-80 h-80 pointer-events-none -z-10" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-pink-200 text-brand-pink text-sm font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
              <span>Mobile App Architecture</span>
            </div> */}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-dark tracking-tight leading-snug font-heading">
              Simple, Powerful Features Designed Around <span className="bg-gradient-to-r from-brand-pink via-brand-babyPink to-brand-peach bg-clip-text text-transparent">Your Body.</span>
            </h1>

            <p className="text-base sm:text-lg text-brand-gray max-w-2xl mx-auto leading-relaxed">
              Explore the core capabilities of Period Tracker—from precision cycle forecasts to ovulation detection, pregnancy milestones, AI health reports, and holistic comfort.
            </p>

            {/* Store Download Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
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
                  {/* <div className="text-sm uppercase font-medium leading-none text-gray-300">Download on the</div> */}
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
                  {/* <div className="text-sm uppercase font-medium leading-none text-gray-300">GET IT ON</div> */}
                  <div className="text-sm font-bold leading-tight font-sans tracking-tight">Google Play</div>
                </div>
              </a>

            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-pink-100 shadow-2xs">
                <div className="text-xl font-black text-brand-pink">85%+</div>
                <div className="text-sm text-brand-gray font-medium">Cycle Accuracy</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-pink-100 shadow-2xs">
                <div className="text-xl font-black text-emerald-700">100%</div>
                <div className="text-sm text-brand-gray font-medium">Encrypted Privacy</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-pink-100 shadow-2xs">
                <div className="text-xl font-black text-brand-peach">50+</div>
                <div className="text-sm text-brand-gray font-medium">Ayurvedic Remedies</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-pink-100 shadow-2xs">
                <div className="text-xl font-black text-purple-700">Real-Time</div>
                <div className="text-sm text-brand-gray font-medium">Encrypted Sync</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CORE APP FEATURES (CLEAN CARDS GRID WITH SCROLL MARGIN TOP) */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white border-b border-pink-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-brand-dark tracking-tight font-heading">
                Complete App Capabilities
              </h2>
              <p className="text-sm sm:text-base text-brand-gray">
                Everything you need to track, understand, and nurture your body through each cycle phase.
              </p>
            </div>

            {/* 2-Column Responsive Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {APP_FEATURES.map((feature) => {
                const Icon = FEATURE_ICONS[feature.id] || Sparkles;
                const style = FEATURE_STYLES[feature.id] || FEATURE_STYLES['cycle-tracking'];

                return (
                  <div
                    key={feature.id}
                    id={feature.id}
                    className="scroll-mt-24 sm:scroll-mt-28 bg-[#FAF8F9] rounded-3xl p-6 sm:p-8 border border-pink-100/90 shadow-sm hover:shadow-xl hover:shadow-pink-900/5 transition-all duration-300 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-4">
                      
                      {/* Card Header: Icon & Category Badge */}
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className={`w-12 h-12 rounded-2xl ${style.lightBg} border ${style.border} flex items-center justify-center ${style.color} shadow-2xs`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold tracking-wide uppercase border ${feature.badgeColor}`}>
                          {feature.badge}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <div className="space-y-1.5">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight leading-snug font-heading">
                          {feature.title}
                        </h3>
                        <p className="text-base sm:text-sm font-semibold text-brand-gray">
                          {feature.subtitle}
                        </p>
                      </div>

                      {/* Overview Narrative */}
                      <p className="text-brand-gray text-base sm:text-sm leading-relaxed">
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
                              className="p-3 rounded-2xl bg-white border border-pink-100/60 hover:border-pink-200 transition-colors"
                            >
                              <div className="flex items-start gap-2.5">
                                <CheckCircle2 className={`w-4 h-4 ${style.color} shrink-0 mt-0.5`} />
                                <div className="text-base">
                                  <span className="font-bold text-brand-dark block">{title}</span>
                                  {desc && <span className="text-brand-gray leading-snug mt-0.5 block">{desc}</span>}
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
                      <div className="text-base sm:text-sm font-semibold text-gray-800">
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
        <section className="py-16 bg-[#FAF8F9] border-b border-pink-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent border border-pink-200 text-brand-pink text-sm font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div> */}
              <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight font-heading">
                Frequently Asked Questions App Features
              </h2>
            </div>

            <div className="space-y-3">
              {APP_FEATURES_FAQS.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(fIdx)}
                    className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-brand-dark hover:text-brand-pink transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        activeFaq === fIdx ? 'rotate-90 text-brand-pink' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === fIdx && (
                    <div className="px-5 pb-5 pt-1 text-sm sm:text-sm text-brand-gray leading-relaxed border-t border-pink-100 bg-brand-accent/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Download CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-brand-pink via-[#FF7597] to-brand-peach text-white text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight font-heading">
             Ready to flow with
your body's rhythm?
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto">
              Download TrackFlow today for iOS or Android. Join over 100,000+ women tracking cycles, optimizing workouts, and living in sync.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
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
                  {/* <div className="text-sm uppercase font-medium leading-none text-gray-300">Download on the</div> */}
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
                  {/* <div className="text-sm uppercase font-medium leading-none text-gray-300">GET IT ON</div> */}
                  <div className="text-sm font-bold leading-tight font-sans tracking-tight">Google Play</div>
                </div>
              </a>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { APP_LINKS } from '../../data/appLinks';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Brain, 
  Flower2, 
  Clock, 
  ArrowRight, 
  HelpCircle,
  Smartphone,
  ChevronDown
} from 'lucide-react';

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' or 'annual'

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf9]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#fef0e7] via-[#fff6f0] to-[#fffbf9] pt-12 pb-16 border-b border-orange-100/70 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {/* <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-pink-200 text-flo-600 text-sm font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Manage Subscription & Premium Access</span>
            </div> */}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              Invest in your daily reproductive wellness
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Unlock unlimited AI-generated cycle reports, full Ayurvedic remedy libraries, and advanced prediction models on your mobile device.
            </p>

            {/* Billing Cycle Toggle */}
            <div className="pt-4 flex items-center justify-center">
              <div className="bg-white p-1 rounded-2xl border border-pink-200 shadow-xs flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-xl text-sm sm:text-sm font-bold transition-all cursor-pointer ${
                    billingCycle === 'monthly'
                      ? 'bg-flo-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-2 rounded-xl text-sm sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    billingCycle === 'annual'
                      ? 'bg-flo-600 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>Annual Billing</span>
                  <span className="text-sm uppercase font-black px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                    Save 50%
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards Section */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Plan 1: Free Starter */}
            <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Basic Access</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-1">Free Lifetime</h3>
                  <p className="text-sm text-gray-500 mt-1">Essential period tracking and cycle calculations</p>
                </div>

                <div className="pt-2">
                  <span className="text-4xl font-black text-gray-900">₹0</span>
                  <span className="text-sm text-gray-500 font-semibold ml-2">Forever free</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-gray-100 text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Period & bleeding duration logging</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ovulation & fertile window prediction</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1 AI-generated Health Report / month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>10+ basic Ayurvedic home remedies</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% In-Device Privacy</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 space-y-2">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm text-center block transition-colors cursor-pointer"
                >
                  Download Free App
                </a>
              </div>
            </div>

            {/* Plan 2: Premium Wellness (Highlighted) */}
            <div className="bg-gradient-to-br from-white via-pink-50/50 to-rose-50/30 rounded-3xl border-2 border-flo-400 p-8 shadow-xl shadow-pink-900/10 flex flex-col justify-between space-y-6 relative">
              
              {/* Popular Badge */}
              <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-flo-600 to-pink-500 text-white px-3.5 py-1 rounded-full text-sm font-black uppercase tracking-wider shadow-sm">
                Most Popular
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-sm font-bold uppercase tracking-wider text-flo-600">Full Access</span>
                  <h3 className="text-2xl font-black text-gray-900 mt-1">Premium Wellness</h3>
                  <p className="text-sm text-gray-500 mt-1">Unlimited AI reports, full Ayurveda module & priority care</p>
                </div>

                <div className="pt-2">
                  <span className="text-4xl font-black text-gray-900">
                    {billingCycle === 'annual' ? '₹1,999' : '₹299'}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold ml-2">
                    / month {billingCycle === 'annual' ? '(Billed annually at₹1,999)' : '(Billed monthly)'}
                  </span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-pink-100 text-sm text-gray-800 font-medium">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-flo-600 shrink-0" />
                    <span><strong>Unlimited AI Health Reports:</strong> Monthly trend analysis</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-flo-600 shrink-0" />
                    <span><strong>Full Ayurveda Module:</strong> 50+ dosha-specific remedy guides</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-flo-600 shrink-0" />
                    <span><strong>Cycle-Synced Diet & Recipes:</strong> Herbal teas & cramp foods</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-flo-600 shrink-0" />
                    <span><strong>Pregnancy Due Date & Fetal Growth Mode</strong></span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-flo-600 shrink-0" />
                    <span><strong>Exportable PDF Summaries:</strong> Ready for personal records</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-flo-600 shrink-0" />
                    <span><strong>Ad-Free Experience & VIP Fast Support</strong></span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 space-y-2.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={APP_LINKS.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-4 rounded-2xl bg-[#f43f77] hover:bg-[#e11d5f] text-white font-bold text-sm text-center shadow-md shadow-pink-200 transition-all cursor-pointer"
                  >
                    Subscribe on iOS App
                  </a>
                  <a
                    href={APP_LINKS.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-4 rounded-2xl bg-black hover:bg-gray-800 text-white font-bold text-sm text-center shadow-md transition-all cursor-pointer"
                  >
                    Subscribe on Android
                  </a>
                </div>
                <p className="text-sm text-gray-400 text-center font-medium">
                  Free 7-day trial included. Cancel anytime in Apple/Google settings.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* How to Manage or Cancel Subscription */}
        <section className="py-12 bg-white border-t border-pink-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-gray-900">How to Manage or Cancel Your Subscription</h3>
              <p className="text-sm text-gray-600">
                All subscriptions are safely managed through your official Apple App Store or Google Play account.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Apple instructions */}
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3">
                <h4 className="font-extrabold text-gray-900 flex items-center gap-2 text-base">
                  <span>Apple App Store (iPhone & iPad)</span>
                </h4>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Open the <strong>Settings</strong> app on your iPhone.</li>
                  <li>Tap your <strong>Name / Apple ID</strong> at the top.</li>
                  <li>Tap <strong>Subscriptions</strong>.</li>
                  <li>Select <strong>Period Tracker & Ovulation</strong>.</li>
                  <li>Tap <strong>Cancel Subscription</strong> to stop auto-renewal.</li>
                </ol>
              </div>

              {/* Google Play instructions */}
              <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200 space-y-3">
                <h4 className="font-extrabold text-gray-900 flex items-center gap-2 text-base">
                  <span>Google Play (Android Phones & Tablets)</span>
                </h4>
                <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>Open the <strong>Google Play Store</strong> app.</li>
                  <li>Tap your <strong>Profile Icon</strong> in the top right.</li>
                  <li>Tap <strong>Payments & subscriptions</strong> &rarr; <strong>Subscriptions</strong>.</li>
                  <li>Select <strong>Period Tracker & Ovulation</strong>.</li>
                  <li>Tap <strong>Cancel subscription</strong> and follow on-screen instructions.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

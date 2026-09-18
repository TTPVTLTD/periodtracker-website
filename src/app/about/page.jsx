'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Heart, Award, Shield, Activity, Users, AlertCircle, RefreshCw } from 'lucide-react';

export default function AboutPage() {
  const [cmsContent, setCmsContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCMSContent = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch('https://flo-tracker-api.tracewavetransparency.com/api/v1/admin/cms/list_cms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'platform': 'AnDroId@Trace'
        },
        body: JSON.stringify({ type: 'about_us' })
      });

      const resJson = await response.json();
      if (response.ok && resJson && resJson.status && resJson.data && resJson.data.length > 0 && resJson.data[0].description) {
        setCmsContent(resJson.data[0].description);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to load About Us CMS content:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCMSContent();
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About TrackFlow - Our Mission & Team',
    description: 'Learn more about the mission behind TrackFlow. We design female health trackers focused on security, biological precision, and user data safety.',
    url: 'https://periodtracker.online/about',
    publisher: {
      '@type': 'Organization',
      name: 'Period Tracker & Ovulation Cycle',
      logo: 'https://periodtracker.online/brand-logo-final.png'
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F9] selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 relative w-full">
        {/* Background Glow Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5E8C]/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF8C69]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Title Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5E8C]/10 border border-[#FF5E8C]/20 text-[#FF5E8C] font-bold text-xs sm:text-sm uppercase tracking-wider">
           About US
          </div>
          {/* <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1819] leading-tight tracking-tight font-heading">
            About TrackFlow
          </h1> */}
          <p className="text-[#706B6E] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Empowering women globally with reliable, science-backed cycle intelligence while maintaining the highest standard of data privacy.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 backdrop-blur-md border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-10 shadow-xl">
          {loading ? (
            /* Skeleton Loading State */
            <div className="animate-pulse space-y-6 py-4">
              <div className="h-8 bg-pink-100/60 rounded-xl w-2/5" />
              <div className="h-4 bg-gray-100 rounded-lg w-11/12" />
              <div className="h-4 bg-gray-100 rounded-lg w-full" />
              <div className="h-4 bg-gray-100 rounded-lg w-4/5" />
              <div className="h-8 bg-pink-100/60 rounded-xl w-1/3 mt-8" />
              <div className="h-4 bg-gray-100 rounded-lg w-5/6" />
              <div className="h-4 bg-gray-100 rounded-lg w-full" />
            </div>
          ) : cmsContent ? (
            /* Dynamic API CMS Content */
            <div
              className="prose prose-pink max-w-none space-y-6 text-[#706B6E] text-sm sm:text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: cmsContent }}
            />
          ) : error ? (
            /* Error State with Retry & Fallback Content */
            <div className="space-y-8">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center justify-between gap-4 text-red-800 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                  <span>Showing static fallback about info (server API unavailable).</span>
                </div>
                <button
                  onClick={fetchCMSContent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              </div>

              {/* Static Fallback Content Matching Reference About Html */}
              <div className="space-y-8 text-[#706B6E] text-sm sm:text-base leading-relaxed">
                {/* Core Story */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <Heart className="w-6 h-6 text-[#FF5E8C] fill-[#FF5E8C]/10" />
                    <span>Our Journey</span>
                  </h2>
                  <p>
                    TrackFlow was founded in 2025 by a passionate team of doctors, developers, and wellness advocates. We noticed a major gap in the market: most period tracking apps were tracking cycles while monetizing or leaking users' reproductive logs.
                  </p>
                  <p>
                    We set out to rebuild female cycle tracking from scratch—with bank-grade local client-side database encryption, scientific phase analytics, and a beautiful premium design. Today, TrackFlow helps thousands of women align with their natural cycles safely and elegantly.
                  </p>
                </div>

                <hr className="border-gray-100" />

                {/* Core Values */}
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <Award className="w-6 h-6 text-[#FF5E8C]" />
                    <span>What We Stand For</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2 bg-[#FF5E8C]/5 p-4 rounded-2xl border border-[#FF5E8C]/10">
                      <div className="w-10 h-10 rounded-xl bg-[#FF5E8C]/10 flex items-center justify-center text-[#FF5E8C]">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#1A1819] font-heading">Absolute Security</h3>
                      <p className="text-xs sm:text-sm text-[#706B6E] leading-relaxed">
                        Your logs belong solely to you. We employ local zero-knowledge encryption so no third parties can query your records.
                      </p>
                    </div>

                    <div className="space-y-2 bg-[#FF5E8C]/5 p-4 rounded-2xl border border-[#FF5E8C]/10">
                      <div className="w-10 h-10 rounded-xl bg-[#FF5E8C]/10 flex items-center justify-center text-[#FF5E8C]">
                        <Activity className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#1A1819] font-heading">Clinical Accuracy</h3>
                      <p className="text-xs sm:text-sm text-[#706B6E] leading-relaxed">
                        Our predictions integrate standardized reproductive research parameters to yield reliable ovulation windows.
                      </p>
                    </div>

                    <div className="space-y-2 bg-[#FF5E8C]/5 p-4 rounded-2xl border border-[#FF5E8C]/10">
                      <div className="w-10 h-10 rounded-xl bg-[#FF5E8C]/10 flex items-center justify-center text-[#FF5E8C]">
                        <Users className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#1A1819] font-heading">Empowered Wellness</h3>
                      <p className="text-xs sm:text-sm text-[#706B6E] leading-relaxed">
                        Learn how hormones affect energy, work, and workouts. Adapt your schedule to your biology, not the calendar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}

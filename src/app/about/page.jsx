'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Heart, Award, Shield, Activity, Users, AlertCircle, RefreshCw, Sparkles, CheckCircle2, ChevronRight, BookOpen } from 'lucide-react';

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
    name: 'About Period Tracker Ovulation Cycle - Our Mission & Team',
    description: 'Learn more about the mission behind Period Tracker Ovulation Cycle. We design female health trackers focused on security, biological precision, and user data safety.',
    url: 'https://trackperiods.com/about',
    publisher: {
      '@type': 'Organization',
      name: 'Period Tracker & Ovulation Cycle',
      logo: 'https://trackperiods.com/brand-logo-final.png'
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FAF8F9] to-white selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 relative w-full overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#FF5E8C]/5 to-transparent pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#FF5E8C]/10 rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-[#FF8C69]/10 rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Hero Section */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF5E8C]/20 shadow-sm text-[#FF5E8C] font-bold text-xs sm:text-sm uppercase tracking-wider mx-auto transition-transform hover:scale-105">
            <Sparkles className="w-4 h-4" />
            <span>Our Mission & Vision</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1819] leading-tight tracking-tight font-heading">
            Empowering Women Through <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E8C] to-[#FF8C69]">
              Intelligent Cycle Science
            </span>
          </h1>
          <p className="text-[#706B6E] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            We are redefining female health tracking by combining clinically-backed biological precision, holistic wellness insights, and absolute zero-knowledge data privacy.
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
            {[
              { label: 'Encrypted Data', value: '100%', icon: Shield },
              { label: 'Algorithm Precision', value: '99.4%', icon: Activity },
              { label: 'Cycle Phases', value: '4', icon: RefreshCw },
              { label: 'Active Support', value: '24/7', icon: Heart }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm border border-[#FF5E8C]/15 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <stat.icon className="w-6 h-6 text-[#FF5E8C] mx-auto mb-2 opacity-80" />
                <div className="text-2xl sm:text-3xl font-bold text-[#1A1819] font-heading">{stat.value}</div>
                <div className="text-xs sm:text-sm text-[#706B6E] font-semibold uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-white/90 backdrop-blur-xl border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-12 shadow-2xl shadow-pink-900/5 relative overflow-hidden">
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FF5E8C]/10 to-transparent rounded-bl-full pointer-events-none" />

            {loading ? (
              /* Skeleton Loading State */
              <div className="animate-pulse space-y-6 py-4">
                <div className="h-10 bg-pink-100/60 rounded-xl w-1/3" />
                <div className="h-4 bg-gray-100 rounded-lg w-full" />
                <div className="h-4 bg-gray-100 rounded-lg w-11/12" />
                <div className="h-4 bg-gray-100 rounded-lg w-4/5" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="h-32 bg-pink-50 rounded-2xl" />
                  <div className="h-32 bg-pink-50 rounded-2xl" />
                </div>
              </div>
            ) : cmsContent ? (
              /* Dynamic API CMS Content */
              <div
                className="max-w-none text-[#706B6E] leading-relaxed 
                  [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-[#1A1819] [&>h1]:font-heading [&>h1]:mt-8 [&>h1]:mb-4 
                  [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#1A1819] [&>h2]:font-heading [&>h2]:mt-8 [&>h2]:mb-4 
                  [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-[#1A1819] [&>h3]:font-heading [&>h3]:mt-6 [&>h3]:mb-3 
                  [&>p]:mb-4 
                  [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 
                  [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 
                  [&>li]:mb-1.5 
                  [&>strong]:text-[#1A1819] [&>strong]:font-bold
                  [&>a]:text-[#FF5E8C] hover:[&>a]:underline"
                dangerouslySetInnerHTML={{ __html: cmsContent }}
              />
            ) : error ? (
              /* Error State with Retry & Fallback Content */
              <div className="space-y-10">
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-red-800 text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Unable to load live story from server. Showing offline version.</span>
                  </div>
                  <button
                    onClick={fetchCMSContent}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all shrink-0 shadow-sm w-full sm:w-auto"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Connection</span>
                  </button>
                </div>

                {/* Static Fallback Content */}
                <div className="space-y-12">
                  {/* The Journey */}
                  <div className="space-y-5 relative">
                    <div className="absolute -left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF5E8C] to-transparent hidden lg:block rounded-full" />
                    <h2 className="text-3xl font-bold text-[#1A1819] flex items-center gap-3 font-heading">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E8C] to-[#FF8C69] flex items-center justify-center text-white shadow-lg shadow-pink-200">
                        <Heart className="w-5 h-5 fill-white/20" />
                      </div>
                      <span>Our Story</span>
                    </h2>
                    <p className="text-[#4A4547] text-base sm:text-lg leading-relaxed">
                      Period Tracker Ovulation Cycle was founded by a passionate collective of women's health advocates, developers, and researchers. We noticed a critical flaw in the ecosystem: the majority of digital health trackers were commoditizing deeply personal reproductive data.
                    </p>
                    <p className="text-[#4A4547] text-base sm:text-lg leading-relaxed">
                      We set out to engineer a fundamentally different platform. One built on bank-grade local encryption, scientifically validated cycle modeling, and a stunningly beautiful user experience. Today, Period Tracker Ovulation Cycle helps thousands of individuals navigate their natural biology safely, confidently, and elegantly.
                    </p>
                  </div>

                  <hr className="border-[#FF5E8C]/10" />

                  {/* Core Values Grid */}
                  <div className="space-y-6 relative">
                    <div className="absolute -left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF8C69] to-transparent hidden lg:block rounded-full" />
                    <h2 className="text-3xl font-bold text-[#1A1819] flex items-center gap-3 font-heading">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF8C69] to-[#FF5E8C] flex items-center justify-center text-white shadow-lg shadow-orange-200">
                        <Award className="w-5 h-5" />
                      </div>
                      <span>What Drives Us</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                      {[
                        {
                          icon: Shield,
                          title: 'Absolute Privacy',
                          desc: 'Your logs belong solely to you. We employ zero-knowledge architecture, meaning even we cannot query or read your encrypted health records.',
                          color: 'text-emerald-600',
                          bg: 'bg-emerald-50',
                          border: 'border-emerald-100'
                        },
                        {
                          icon: Activity,
                          title: 'Clinical Accuracy',
                          desc: 'Our forecasting engines synthesize standardized reproductive research to yield the most reliable ovulation and menstruation windows.',
                          color: 'text-blue-600',
                          bg: 'bg-blue-50',
                          border: 'border-blue-100'
                        },
                        {
                          icon: Users,
                          title: 'Empowered Wellness',
                          desc: 'We transform raw data into actionable insights. Learn exactly how your hormonal shifts influence your energy, sleep, and fitness.',
                          color: 'text-purple-600',
                          bg: 'bg-purple-50',
                          border: 'border-purple-100'
                        },
                        {
                          icon: BookOpen,
                          title: 'Holistic Education',
                          desc: 'Beyond tracking, we provide a rich library of expert-reviewed articles bridging modern science with time-tested holistic practices.',
                          color: 'text-[#FF5E8C]',
                          bg: 'bg-[#FF5E8C]/5',
                          border: 'border-[#FF5E8C]/20'
                        }
                      ].map((val, idx) => (
                        <div key={idx} className={`p-6 rounded-2xl border ${val.border} ${val.bg} transition-all hover:shadow-md group`}>
                          <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${val.color} shadow-sm mb-4 group-hover:scale-110 transition-transform`}>
                            <val.icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold text-[#1A1819] font-heading mb-2">{val.title}</h3>
                          <p className="text-sm text-[#706B6E] leading-relaxed">
                            {val.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Call to Action Banner */}
          <div className="mt-16 bg-gradient-to-r from-[#FF5E8C] to-[#FF8C69] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl shadow-pink-900/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading mb-4 relative z-10">
              Ready to take control of your cycle?
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto mb-8 font-medium relative z-10">
              Join thousands of individuals tracking their health securely and intelligently. Download Period Tracker Ovulation Cycle today.
            </p>
            <div className="relative z-10">
              <a
                href="https://apps.apple.com/app/id6774117828"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#FF5E8C] rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                <span>Get the App Now</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

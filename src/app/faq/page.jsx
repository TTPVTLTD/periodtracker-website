'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ChevronDown, AlertCircle, RefreshCw, HelpCircle, Mail } from 'lucide-react';

export default function FAQPage() {
  const [faqItems, setFaqItems] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0); // Default open first item
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
        body: JSON.stringify({ type: 'faq' })
      });

      const resJson = await response.json();
      if (response.ok && resJson && resJson.status && resJson.data && resJson.data.length > 0) {
        setFaqItems(resJson.data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to load FAQ CMS content:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCMSContent();
  }, []);

  const toggleFaq = (idx) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  const fallbackFaqs = [
    {
      title: 'How can I edit my profile?',
      description: 'To edit your profile, go to the Profile tab inside the application, tap on the edit/settings icon next to your name, and update your personal details such as average cycle length, height, weight, and name.'
    },
    {
      title: 'How do I logout?',
      description: 'You can log out by navigating to the Profile tab, scroll to the bottom of the page, and select Log Out. Your local backup settings will be saved securely on your device.'
    },
    {
      title: 'Can I delete my account?',
      description: 'Yes, from Account screen tap Delete Account and confirm. All local sandbox logs and encrypted cloud records will be deleted immediately.'
    }
  ];

  const currentFaqs = faqItems.length > 0 ? faqItems : fallbackFaqs;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: currentFaqs.map((item) => ({
      '@type': 'Question',
      name: item.title,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.description.replace(/<[^>]*>?/gm, '')
      }
    }))
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F9] selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 flex-1 relative w-full">
        {/* Decorative Background Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5E8C]/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF8C69]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Title Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5E8C]/10 border border-[#FF5E8C]/20 text-[#FF5E8C] font-bold text-xs sm:text-sm uppercase tracking-wider">
            Support Center
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1819] leading-tight tracking-tight font-heading">
            Frequently Asked Questions
          </h1>
          <p className="text-[#706B6E] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Have questions about using TrackFlow? Find quick answers regarding profile setups, accounts, and application tracking below.
          </p>
        </div>

        {/* FAQ Container Card */}
        <div className="bg-white/80 backdrop-blur-md border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
          {loading ? (
            /* Skeleton Shimmer Loading State */
            <div className="animate-pulse space-y-4 py-2">
              <div className="h-16 bg-pink-100/60 rounded-2xl w-full" />
              <div className="h-16 bg-pink-100/60 rounded-2xl w-full" />
              <div className="h-16 bg-pink-100/60 rounded-2xl w-full" />
            </div>
          ) : (
            <div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 flex items-center justify-between gap-4 text-red-800 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <span>Showing static fallback FAQs (server API unavailable).</span>
                  </div>
                  <button
                    onClick={fetchCMSContent}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry</span>
                  </button>
                </div>
              )}

              {/* Accordions */}
              <div className="space-y-4">
                {currentFaqs.map((faq, idx) => {
                  const isOpen = activeIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isOpen
                          ? 'border-[#FF5E8C]/40 shadow-md ring-1 ring-[#FF5E8C]/20'
                          : 'border-[#FF5E8C]/10 hover:border-[#FF5E8C]/20 shadow-xs'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                      >
                        <span className="text-base sm:text-lg font-bold text-[#1A1819] font-body pr-4">
                          {faq.title}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#706B6E] transition-transform duration-300 shrink-0 ${
                            isOpen ? 'rotate-180 text-[#FF5E8C]' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-5 pt-0 transition-all duration-300">
                          <div
                            className="border-t border-[#FF5E8C]/10 pt-4 text-sm sm:text-base text-[#706B6E] leading-relaxed font-medium"
                            dangerouslySetInnerHTML={{ __html: faq.description }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Still Need Help Box */}
        <div className="mt-10 text-center bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-[#FF5E8C]/15 shadow-md space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A1819] font-heading">
            Still have questions?
          </h3>
          <p className="text-sm sm:text-base text-[#706B6E] max-w-md mx-auto leading-relaxed font-medium">
            Our dedicated support team is here to assist you with any questions or custom inquiries.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FF5E8C] hover:bg-[#FF5E8C]/90 text-white rounded-full font-bold text-sm sm:text-base shadow-lg shadow-[#FF5E8C]/25 hover:shadow-xl hover:shadow-[#FF5E8C]/35 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Our Support Team</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

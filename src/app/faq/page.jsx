'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ChevronDown, AlertCircle, RefreshCw, HelpCircle, Mail, Search, MessageCircle, FileText, User, Sparkles } from 'lucide-react';

export default function FAQPage() {
  const [faqItems, setFaqItems] = useState([]);
  const [activeIdx, setActiveIdx] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Account', 'Tracking', 'Privacy'];

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
      description: 'To edit your profile, go to the Profile tab inside the application, tap on the edit/settings icon next to your name, and update your personal details such as average cycle length, height, weight, and name.',
      category: 'Account'
    },
    {
      title: 'How do I logout?',
      description: 'You can log out by navigating to the Profile tab, scroll to the bottom of the page, and select Log Out. Your local backup settings will be saved securely on your device.',
      category: 'Account'
    },
    {
      title: 'Can I delete my account?',
      description: 'Yes, from Account screen tap Delete Account and confirm. All local sandbox logs and encrypted cloud records will be deleted immediately.',
      category: 'Privacy'
    },
    {
      title: 'How do I log my period dates?',
      description: 'On the main dashboard, tap the large plus (+) button or select a specific date on the calendar view to add your period start and end dates.',
      category: 'Tracking'
    }
  ];

  const currentFaqs = faqItems.length > 0 ? faqItems : fallbackFaqs;

  // Filter logic
  const filteredFaqs = useMemo(() => {
    return currentFaqs.filter((faq) => {
      const matchesSearch = faq.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            faq.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // If categories exist on API items, map them. Else assume 'All'
      const cat = faq.category || 'Tracking'; 
      const matchesCategory = activeCategory === 'All' || cat === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [currentFaqs, searchQuery, activeCategory]);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FAF8F9] to-white selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 relative w-full overflow-hidden">
        {/* Background Glowing Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5E8C]/10 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#FF8C69]/10 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Hero Section */}
        <section className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF5E8C]/20 shadow-sm text-[#FF5E8C] font-bold text-xs sm:text-sm uppercase tracking-wider mx-auto transition-transform hover:scale-105">
            <HelpCircle className="w-4 h-4" />
            <span>Support Center</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1819] leading-tight tracking-tight font-heading">
            How can we help you today?
          </h1>
          <p className="text-[#706B6E] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Find quick answers about tracking your cycle, managing your account, and understanding our privacy features.
          </p>

          {/* Search Bar */}
          {/* <div className="max-w-2xl mx-auto mt-8 relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-[#FF5E8C] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-full text-[#1A1819] placeholder-gray-400 focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all text-base font-medium shadow-sm hover:shadow-md"
            />
          </div> */}

          {/* Category Filters */}
          {/* <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#FF5E8C] text-white shadow-md shadow-[#FF5E8C]/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF5E8C]/40 hover:bg-[#FF5E8C]/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </section>

        {/* FAQ Container */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <div className="bg-white/80 backdrop-blur-xl border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-10 shadow-xl shadow-pink-900/5">
            {loading ? (
              /* Skeleton Loading */
              <div className="animate-pulse space-y-4 py-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-pink-50/60 rounded-2xl w-full" />
                ))}
              </div>
            ) : (
              <div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-red-800 text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <span>Showing offline FAQs (server connection failed).</span>
                    </div>
                    <button
                      onClick={fetchCMSContent}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all shrink-0 w-full sm:w-auto"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry</span>
                    </button>
                  </div>
                )}

                {/* FAQ List */}
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-500">We couldn't find any FAQs matching "{searchQuery}"</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                      className="mt-4 text-[#FF5E8C] font-bold hover:underline"
                    >
                      Clear search filters
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, idx) => {
                      const isOpen = activeIdx === idx;
                      return (
                        <div
                          key={idx}
                          className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isOpen
                              ? 'border-[#FF5E8C]/40 shadow-lg shadow-pink-900/5 ring-1 ring-[#FF5E8C]/10'
                              : 'border-gray-100 hover:border-[#FF5E8C]/30 hover:shadow-md'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => toggleFaq(idx)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                          >
                            <span className={`text-base sm:text-lg font-bold font-body pr-4 transition-colors ${isOpen ? 'text-[#FF5E8C]' : 'text-[#1A1819] group-hover:text-[#FF5E8C]'}`}>
                              {faq.title}
                            </span>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#FF5E8C]/10' : 'bg-gray-50 group-hover:bg-[#FF5E8C]/10'}`}>
                              <ChevronDown
                                className={`w-5 h-5 transition-transform duration-300 ${
                                  isOpen ? 'rotate-180 text-[#FF5E8C]' : 'text-gray-400 group-hover:text-[#FF5E8C]'
                                }`}
                              />
                            </div>
                          </button>

                          <div 
                            className={`transition-all duration-300 ease-in-out ${
                              isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="px-6 pb-6 pt-0">
                              <div
                                className="border-t border-gray-100 pt-4 text-sm sm:text-base text-[#706B6E] leading-relaxed max-w-none 
                                  [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-[#1A1819] [&>h1]:mb-3 
                                  [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-[#1A1819] [&>h2]:mt-6 [&>h2]:mb-3 
                                  [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-[#1A1819] [&>h3]:mt-4 [&>h3]:mb-2 
                                  [&>p]:mb-3 
                                  [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-3 
                                  [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-3 
                                  [&>li]:mb-1 
                                  [&>strong]:text-[#1A1819] [&>strong]:font-bold
                                  [&>a]:text-[#FF5E8C] hover:[&>a]:underline"
                                dangerouslySetInnerHTML={{ __html: faq.description }}
                              />
                              
                              {/* Helpful feedback UI */}
                              <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-500">Was this helpful?</span>
                                <div className="flex gap-2">
                                  <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors">Yes</button>
                                  <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-600 hover:bg-red-50 hover:text-red-700 hover:border-red-200 transition-colors">No</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Support Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center hover:shadow-xl hover:shadow-pink-900/5 transition-all group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1819] mb-2 font-heading">User Guide</h3>
              <p className="text-[#706B6E] text-sm mb-6">Read our comprehensive guide on how to get the most out of Period Tracker Ovulation Cycle's features.</p>
              <Link href="/about" className="text-blue-600 font-bold hover:underline text-sm inline-flex items-center gap-1">
                Read Guide <ChevronDown className="w-4 h-4 -rotate-90" />
              </Link>
            </div>
            
            <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center hover:shadow-xl hover:shadow-pink-900/5 transition-all group">
              <div className="w-14 h-14 bg-pink-50 text-[#FF5E8C] rounded-full flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1819] mb-2 font-heading">Direct Support</h3>
              <p className="text-[#706B6E] text-sm mb-6">Can't find what you're looking for? Our dedicated team is ready to help you.</p>
              <Link href="/contact" className="text-[#FF5E8C] font-bold hover:underline text-sm inline-flex items-center gap-1">
                Contact Us <ChevronDown className="w-4 h-4 -rotate-90" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

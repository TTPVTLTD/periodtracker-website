'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FileText, AlertTriangle, CreditCard, Shield, HelpCircle, RefreshCw, AlertCircle, Scale, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function TermsAndConditionsPage() {
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
        body: JSON.stringify({ type: 'terms_condition' })
      });

      const resJson = await response.json();
      if (response.ok && resJson && resJson.status && resJson.data && resJson.data.length > 0 && resJson.data[0].description) {
        setCmsContent(resJson.data[0].description);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to load Terms & Conditions CMS content:', err);
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
    '@type': 'WebPage',
    name: 'Terms & Conditions - Period Tracker Ovulation Cycle Smart Period & Fertility Companion',
    description: 'Read Period Tracker Ovulation Cycle Terms and Conditions. Learn about our terms of use, subscription billing policies, and medical disclaimer statements.',
    url: 'https://periodtracker.online/terms',
    publisher: {
      '@type': 'Organization',
      name: 'Period Tracker & Ovulation Cycle',
      logo: 'https://periodtracker.online/brand-logo-final.png'
    }
  };

  const jumpLinks = [
    { id: 'acceptance', label: 'Acceptance of Terms', icon: Scale },
    { id: 'medical-disclaimer', label: 'Medical Disclaimer', icon: AlertTriangle },
    { id: 'billing', label: 'Billing & Subscriptions', icon: CreditCard },
    { id: 'user-logs', label: 'User Logs & Security', icon: Shield },
    { id: 'liability', label: 'Limitation of Liability', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FAF8F9] to-white selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 w-full relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5E8C]/10 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#FF8C69]/10 rounded-full blur-3xl opacity-70 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

        {/* Header Section */}
        <div className="relative pt-16 pb-12 px-4 sm:px-6 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF5E8C]/20 text-[#FF5E8C] font-bold text-xs uppercase tracking-wider mx-auto shadow-sm transition-transform hover:scale-105">
              <FileText className="w-4 h-4" />
              <span>Legal Agreements</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1819] font-heading tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-[#706B6E] text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Please read these terms and conditions carefully before using the Period Tracker Ovulation Cycle application or website.
            </p>
            <div className="text-sm font-bold text-gray-400">Last Updated: June 6, 2026</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-10 relative z-10">
          
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-white/90 backdrop-blur-xl rounded-2xl border border-[#FF5E8C]/15 p-3 shadow-lg shadow-pink-900/5">
              <nav className="space-y-1">
                {jumpLinks.map(link => (
                  <a key={link.id} href={`#${link.id}`} className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[#706B6E] rounded-xl hover:bg-pink-50 hover:text-[#FF5E8C] transition-colors group">
                    <link.icon className="w-4 h-4 text-gray-400 group-hover:text-[#FF5E8C]" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white/90 backdrop-blur-xl border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-pink-900/5 relative">
              
              {/* Critical Medical Disclaimer Banner */}
              <div className="mb-10 bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-6 flex flex-col sm:flex-row items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-amber-900 mb-2">Important Medical Disclaimer</h3>
                  <p className="text-sm text-amber-800 leading-relaxed font-medium">
                    Period Tracker Ovulation Cycle is a cycle-tracking tool designed for educational and self-care purposes. <strong>Period Tracker Ovulation Cycle does not provide medical diagnostics, medical advice, or family planning/contraception services.</strong> Predictive windows should not be relied upon to prevent pregnancy. Always consult a certified medical provider for health advice.
                  </p>
                </div>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-6">
                  <div className="h-8 bg-pink-50/60 rounded-lg w-1/3" />
                  <div className="h-4 bg-gray-100 rounded-lg w-full" />
                  <div className="h-4 bg-gray-100 rounded-lg w-5/6" />
                  <div className="h-32 bg-pink-50/40 rounded-xl w-full mt-6" />
                </div>
              ) : cmsContent ? (
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
                <div className="space-y-12">
                  {/* Error Notification */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4 text-red-800 text-sm font-semibold mb-8">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <span>Showing offline fallback terms.</span>
                    </div>
                    <button onClick={fetchCMSContent} className="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" /> Retry
                    </button>
                  </div>

                  {/* Offline Content */}
                  <div className="space-y-10 text-gray-600">
                    <section id="acceptance" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700"><Scale className="w-4 h-4"/></div>
                        1. Acceptance of Terms
                      </h2>
                      <p className="leading-relaxed">By downloading, installing, accessing, or using the Period Tracker Ovulation Cycle mobile application or landing page website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not access or use our services.</p>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="medical-disclaimer" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600"><AlertTriangle className="w-4 h-4"/></div>
                        2. Medical Disclaimer (Not Medical Advice)
                      </h2>
                      <p className="leading-relaxed">Period Tracker Ovulation Cycle is a cycle-tracking tool designed for educational, self-care, and general wellness purposes. <strong>Period Tracker Ovulation Cycle does not provide medical diagnostics, medical advice, or family planning/contraception services.</strong></p>
                      <p className="leading-relaxed">Predictive windows (such as estimated ovulation peak dates) generated by our algorithms are statistical estimates and should <strong>not</strong> be relied upon to prevent pregnancy or as a primary contraceptive method. Consult a certified gynecologist or medical provider for reproductive health advice.</p>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="billing" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><CreditCard className="w-4 h-4"/></div>
                        3. Premium Subscriptions & Billing
                      </h2>
                      <p className="leading-relaxed">Period Tracker Ovulation Cycle offers access to premium features (including detailed wellness analysis, phase nutritional advice, and PDF reports) through paid subscriptions.</p>
                      <div className="bg-gray-50 rounded-xl p-5 mt-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-gray-900 block text-sm">7-Day Free Trial</strong>
                            <span className="text-sm text-gray-600">You must cancel before the 7-day trial ends to avoid recurring subscription fee charges.</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-gray-900 block text-sm">Flexible Cancellations</strong>
                            <span className="text-sm text-gray-600">Subscriptions can be cancelled at any time inside the Profile screen settings without lock-in contracts.</span>
                          </div>
                        </div>
                      </div>
                    </section>
                    
                    <hr className="border-gray-100" />

                    <section id="user-logs" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><Shield className="w-4 h-4"/></div>
                        4. User Logs & Security Guidelines
                      </h2>
                      <p className="leading-relaxed">You retain full ownership of the logs, symptoms, moods, and water tracker quantities you input. You are responsible for configuring security features (such as secure passwords or Touch/Face ID locks) on your device. We use encrypted AES-256 links to save back-ups in accordance with our <Link href="/privacy" className="text-[#FF5E8C] font-semibold hover:underline">Privacy Policy</Link>.</p>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="liability" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center text-gray-700"><AlertCircle className="w-4 h-4"/></div>
                        5. Limitation of Liability
                      </h2>
                      <p className="leading-relaxed">To the maximum extent permitted by law, Period Tracker Ovulation Cycle and its developers shall not be liable for any medical issues, family planning outcomes, diagnostic errors, or data loss arising from the use of, or inability to use, the tracking services.</p>
                    </section>

                  </div>
                </div>
              ) : null}

            </div>

            <div className="mt-8 text-center bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
               <p className="text-sm text-gray-600">Questions about our Terms?</p>
               <Link href="/contact" className="text-[#FF5E8C] font-bold text-sm hover:underline mt-2 inline-block">Contact our Legal Team</Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

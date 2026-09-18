'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FileText, AlertTriangle, CreditCard, Shield, HelpCircle, RefreshCw, AlertCircle } from 'lucide-react';

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
    name: 'Terms & Conditions - TrackFlow Smart Period & Fertility Companion',
    description: 'Read TrackFlow Terms and Conditions. Learn about our terms of use, subscription billing policies, and medical disclaimer statements.',
    url: 'https://periodtracker.online/terms',
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
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5E8C]/10 border border-[#FF5E8C]/20 text-[#FF5E8C] font-bold text-xs sm:text-sm uppercase tracking-wider">
            Terms & Agreements
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1819] leading-tight tracking-tight font-heading">
            Terms & Conditions
          </h1>
          <p className="text-[#706B6E] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Please read these terms and conditions carefully before using the TrackFlow application or website.
          </p>
          <div className="text-xs sm:text-sm text-[#706B6E]/70 font-semibold">Last updated: June 6, 2026</div>
        </div>

        {/* Content Panel */}
        <div className="bg-white/80 backdrop-blur-md border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-10 shadow-xl">
          {loading ? (
            /* Skeleton Shimmer Loading State */
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
                  <span>Showing static fallback terms (server API unavailable).</span>
                </div>
                <button
                  onClick={fetchCMSContent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              </div>

              {/* Static Fallback Content Matching Reference Terms Html */}
              <div className="space-y-8 text-[#706B6E] text-sm sm:text-base leading-relaxed">
                {/* Section 1 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <FileText className="w-6 h-6 text-[#FF5E8C]" />
                    <span>1. Acceptance of Terms</span>
                  </h2>
                  <p>
                    By downloading, installing, accessing, or using the TrackFlow mobile application or landing page website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not access or use our services.
                  </p>
                </div>

                {/* Section 2 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <AlertTriangle className="w-6 h-6 text-[#FF5E8C]" />
                    <span>2. Medical Disclaimer (Not Medical Advice)</span>
                  </h2>
                  <p>
                    TrackFlow is a cycle-tracking tool designed for educational, self-care, and general wellness purposes. <strong>TrackFlow does not provide medical diagnostics, medical advice, or family planning/contraception services.</strong>
                  </p>
                  <p>
                    Predictive windows (such as estimated ovulation peak dates) generated by our algorithms are statistical estimates and should <strong>not</strong> be relied upon to prevent pregnancy or as a primary contraceptive method. Consult a certified gynecologist or medical provider for reproductive health advice.
                  </p>
                </div>

                {/* Section 3 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <CreditCard className="w-6 h-6 text-[#FF5E8C]" />
                    <span>3. Premium Subscriptions & Billing Policies</span>
                  </h2>
                  <p>
                    TrackFlow offers access to premium features (including detailed wellness analysis, phase nutritional advice, and PDF reports) through paid subscriptions:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium">
                    <li><strong>Billing:</strong> Payments are processed securely via mock billing portals or Razorpay checkout APIs as indicated at upgrade.</li>
                    <li><strong>7-Day Free Trial:</strong> Premium trials require account registration. You must cancel before the 7-day trial ends to avoid recurring subscription fee charges.</li>
                    <li><strong>Cancellations:</strong> Subscriptions are flexible and can be cancelled at any time inside the Profile screen settings without lock-in contracts.</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <Shield className="w-6 h-6 text-[#FF5E8C]" />
                    <span>4. User Logs & Security Guidelines</span>
                  </h2>
                  <p>
                    You retain full ownership of the logs, symptoms, moods, and water tracker quantities you input. You are responsible for configuring security features (such as secure passwords or Touch/Face ID locks) on your device. We use encrypted AES-256 links to save back-ups in accordance with our{' '}
                    <Link href="/privacy" className="text-[#FF5E8C] hover:underline font-semibold">
                      Privacy Policy
                    </Link>.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <HelpCircle className="w-6 h-6 text-[#FF5E8C]" />
                    <span>5. Limitation of Liability</span>
                  </h2>
                  <p>
                    To the maximum extent permitted by law, TrackFlow and its developers shall not be liable for any medical issues, family planning outcomes, diagnostic errors, or data loss arising from the use of, or inability to use, the tracking services.
                  </p>
                </div>

                {/* Section 6 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <RefreshCw className="w-6 h-6 text-[#FF5E8C]" />
                    <span>6. Changes to Terms</span>
                  </h2>
                  <p>
                    We reserve the right to modify or replace these terms at any time. Your continued use of the app following updates constitutes acceptance of the new terms.
                  </p>
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

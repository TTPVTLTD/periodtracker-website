'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ShieldCheck, Database, Lock, EyeOff, UserCheck, Mail, AlertCircle, RefreshCw } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
        body: JSON.stringify({ type: 'privacy_policy' })
      });

      const resJson = await response.json();
      if (response.ok && resJson && resJson.status && resJson.data && resJson.data.length > 0 && resJson.data[0].description) {
        setCmsContent(resJson.data[0].description);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Failed to load Privacy Policy CMS content:', err);
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
    name: 'Privacy Policy - TrackFlow Smart Period & Fertility Companion',
    description: 'Learn how TrackFlow secures your cycle, symptom, and reproductive health data with bank-grade local encryption.',
    url: 'https://periodtracker.online/privacy',
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
            Privacy & Security
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1819] leading-snug tracking-tight font-heading">
            Privacy Policy
          </h1>
          <p className="text-[#706B6E] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Your reproductive health data is personal. We believe it should remain yours, protected by industry-leading security and strict privacy guarantees.
          </p>
          <div className="text-xs sm:text-sm text-[#706B6E]/70 font-semibold">Last updated: June 6, 2026</div>
        </div>

        {/* Policy Content Panel */}
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
                  <span>Showing static fallback policy (server API unavailable).</span>
                </div>
                <button
                  onClick={fetchCMSContent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-all shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry</span>
                </button>
              </div>

              {/* Static Fallback Content Matching Reference Html */}
              <div className="space-y-8 text-[#706B6E] text-sm sm:text-base leading-relaxed">
                {/* Section 1 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <ShieldCheck className="w-6 h-6 text-[#FF5E8C]" />
                    <span>1. Our Core Privacy Commitment</span>
                  </h2>
                  <p>
                    At TrackFlow, we design our services with privacy as our foundation. Your reproductive logs, period predictions, symptom records, and wellness diary contain deeply personal health insights. Our commitment is simple: <strong>your reproductive data will never be sold, shared, or compiled for marketing or advertising purposes.</strong>
                  </p>
                </div>

                {/* Section 2 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <Database className="w-6 h-6 text-[#FF5E8C]" />
                    <span>2. What Data We Collect & How We Use It</span>
                  </h2>
                  <p>
                    To provide accurate period tracking, fertility windows, and custom phase insights, you may choose to log information including:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium">
                    <li>Cycle parameters (dates, period lengths, flow intensities).</li>
                    <li>Physical symptoms (cramps, headaches, body temperature).</li>
                    <li>Daily health logs (mood tags, medication schedules, hydration levels).</li>
                    <li>Account credentials (email address, secure passwords).</li>
                  </ul>
                  <p>
                    This data is used solely to generate period and fertility forecasts, power the interactive calendar, and deliver tailored nutritional and exercise advice inside the TrackFlow app.
                  </p>
                </div>

                {/* Section 3 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <Lock className="w-6 h-6 text-[#FF5E8C]" />
                    <span>3. Storage & Bank-Grade Security</span>
                  </h2>
                  <p>
                    We implement multiple layers of security to keep your profile protected:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium">
                    <li><strong>Local Encryption:</strong> By default, health records can be stored locally on your device with local sandbox parameters to prevent unauthorized system access.</li>
                    <li><strong>End-to-End Encryption (E2EE):</strong> Cloud backups are secured using AES-256 standard encryption keys. Only you possess the credentials to decrypt and access your records.</li>
                    <li><strong>Biometric Lock:</strong> You can configure Touch ID or Face ID in settings to prevent unauthorized local viewing of your dashboard.</li>
                  </ul>
                </div>

                {/* Section 4 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <EyeOff className="w-6 h-6 text-[#FF5E8C]" />
                    <span>4. No Third-Party Selling or Advertising</span>
                  </h2>
                  <p>
                    We maintain a zero-monetization policy on health metrics. <strong>We do not partner with data brokers, pharmaceutical advertisers, or marketing firms.</strong> Your logs remain strictly private. Any diagnostic logs submitted for technical support are fully anonymized.
                  </p>
                </div>

                {/* Section 5 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <UserCheck className="w-6 h-6 text-[#FF5E8C]" />
                    <span>5. Data Control & Account Deletion</span>
                  </h2>
                  <p>
                    You maintain full ownership of your data at all times:
                  </p>
                  <ul className="list-disc list-inside pl-4 space-y-1.5 font-medium">
                    <li><strong>Data Export:</strong> You can download a complete PDF report of your cycle metrics, temperatures, symptoms, and histories at any time.</li>
                    <li><strong>Instant Deletion:</strong> Clicking "Delete Account" inside the Profile screen permanently deletes all records from our secure servers and local device sandboxes immediately.</li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] flex items-center gap-2.5 font-heading">
                    <Mail className="w-6 h-6 text-[#FF5E8C]" />
                    <span>6. Contact Our Privacy Officer</span>
                  </h2>
                  <p>
                    If you have any questions about our privacy policies, data encryption keys, or account controls, reach out to our security team at{' '}
                    <a href="mailto:privacy@trackflow.app" className="text-[#FF5E8C] hover:underline font-semibold">
                      privacy@trackflow.app
                    </a>.
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

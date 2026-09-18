'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ShieldCheck, Database, Lock, EyeOff, UserCheck, Mail, AlertCircle, RefreshCw, ChevronRight, Fingerprint, LockKeyhole } from 'lucide-react';

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

  const jumpLinks = [
    { id: 'core-commitment', label: 'Core Commitment' },
    { id: 'data-collection', label: 'Data Collection' },
    { id: 'security', label: 'Storage & Security' },
    { id: 'no-selling', label: 'Zero Data Selling' },
    { id: 'user-control', label: 'Data Control' },
    { id: 'contact', label: 'Privacy Officer' },
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
              <ShieldCheck className="w-4 h-4" />
              <span>Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1819] font-heading tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-[#706B6E] text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Your reproductive health data is intensely personal. We safeguard it with industry-leading encryption and strict no-sell privacy guarantees.
            </p>
            <div className="text-sm font-bold text-gray-400">Last Updated: June 6, 2026</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-10 relative z-10">
          
          {/* Sidebar Jump Navigation (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-white/90 backdrop-blur-xl rounded-2xl border border-[#FF5E8C]/15 p-5 shadow-lg shadow-pink-900/5">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Navigation</h3>
              <nav className="space-y-1">
                {jumpLinks.map(link => (
                  <a key={link.id} href={`#${link.id}`} className="block px-3 py-2 text-sm font-medium text-[#706B6E] rounded-lg hover:bg-pink-50 hover:text-[#FF5E8C] transition-colors">
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-pink-50">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1819] mb-2">
                  <LockKeyhole className="w-4 h-4 text-emerald-500" />
                  AES-256 Secured
                </div>
                <p className="text-xs text-[#706B6E] font-medium leading-relaxed">All local backups and cloud syncs use military-grade encryption protocols.</p>
              </div>
            </div>
          </aside>

          {/* Main Policy Content */}
          <div className="flex-1 max-w-4xl">
            <div className="bg-white/90 backdrop-blur-xl border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-pink-900/5 relative">
              
              {/* Highlight Banner */}
              <div className="mb-10 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-1">The TrackFlow Privacy Promise</h3>
                  <p className="text-sm text-emerald-800 font-medium">We do not sell, rent, or trade your personal health data to third-party brokers, advertisers, or data aggregators. Period.</p>
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
                      <span>Showing offline fallback policy.</span>
                    </div>
                    <button onClick={fetchCMSContent} className="px-3 py-1.5 bg-white border border-red-200 text-red-600 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5" /> Retry
                    </button>
                  </div>

                  {/* Offline Content */}
                  <div className="space-y-10 text-gray-600">
                    <section id="core-commitment" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-[#FF5E8C]"><ShieldCheck className="w-4 h-4"/></div>
                        1. Our Core Privacy Commitment
                      </h2>
                      <p className="leading-relaxed">At TrackFlow, we design our services with privacy as our foundation. Your reproductive logs, period predictions, symptom records, and wellness diary contain deeply personal health insights. Our commitment is simple: <strong>your reproductive data will never be sold, shared, or compiled for marketing or advertising purposes.</strong></p>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="data-collection" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Database className="w-4 h-4"/></div>
                        2. What Data We Collect & How We Use It
                      </h2>
                      <p className="leading-relaxed">To provide accurate period tracking, fertility windows, and custom phase insights, you may choose to log information including:</p>
                      <ul className="space-y-3 mt-4">
                        <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /> <span><strong>Cycle parameters:</strong> dates, period lengths, flow intensities.</span></li>
                        <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /> <span><strong>Physical symptoms:</strong> cramps, headaches, body temperature.</span></li>
                        <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /> <span><strong>Daily health logs:</strong> mood tags, medication schedules, hydration levels.</span></li>
                        <li className="flex items-start gap-3"><ChevronRight className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /> <span><strong>Account credentials:</strong> email address, secure passwords.</span></li>
                      </ul>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="security" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500"><Lock className="w-4 h-4"/></div>
                        3. Storage & Bank-Grade Security
                      </h2>
                      <p className="leading-relaxed">We implement multiple layers of security to keep your profile protected:</p>
                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                          <LockKeyhole className="w-5 h-5 text-gray-700 mb-2" />
                          <h4 className="font-bold text-gray-900 text-sm mb-1">Local Encryption</h4>
                          <p className="text-xs leading-relaxed text-gray-500">By default, health records can be stored locally on your device with sandbox parameters to prevent unauthorized system access.</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                          <Fingerprint className="w-5 h-5 text-gray-700 mb-2" />
                          <h4 className="font-bold text-gray-900 text-sm mb-1">Biometric Lock</h4>
                          <p className="text-xs leading-relaxed text-gray-500">Configure Touch ID or Face ID in settings to prevent unauthorized local viewing of your personal dashboard.</p>
                        </div>
                      </div>
                    </section>
                    
                    <hr className="border-gray-100" />

                    <section id="no-selling" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500"><EyeOff className="w-4 h-4"/></div>
                        4. No Third-Party Selling
                      </h2>
                      <p className="leading-relaxed">We maintain a zero-monetization policy on health metrics. <strong>We do not partner with data brokers, pharmaceutical advertisers, or marketing firms.</strong> Your logs remain strictly private. Any diagnostic logs submitted for technical support are fully anonymized.</p>
                    </section>

                    <hr className="border-gray-100" />

                    <section id="user-control" className="scroll-mt-24 space-y-4">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 font-heading">
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600"><UserCheck className="w-4 h-4"/></div>
                        5. Data Control & Account Deletion
                      </h2>
                      <p className="leading-relaxed">You maintain full ownership of your data at all times. You can download a complete PDF report of your cycle metrics, temperatures, symptoms, and histories at any time. Clicking "Delete Account" inside the Profile screen permanently deletes all records from our secure servers and local device sandboxes immediately.</p>
                    </section>

                  </div>
                </div>
              ) : null}

              {/* Data Privacy Contact Card */}
              <div id="contact" className="mt-16 bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 text-center scroll-mt-24">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Mail className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading">Contact Our Privacy Officer</h3>
                <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                  If you have any questions about our privacy policies, data encryption keys, or account controls, reach out to our security team.
                </p>
                <a href="mailto:privacy@trackflow.app" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold text-sm transition-colors">
                  <Mail className="w-4 h-4" /> Email privacy@trackflow.app
                </a>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

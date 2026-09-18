'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Mail, CheckCircle2, AlertCircle, WifiOff, X, ArrowLeft, Loader2, Facebook, Instagram, Youtube } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // { type: 'success' | 'error' | 'network', message: string }
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameVal = formData.name.trim();
    if (nameVal.length < 2) {
      newErrors.name = 'Please enter your name (at least 2 characters).';
    }

    const emailVal = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailVal)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const phoneVal = formData.phone.trim();
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneVal)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    const subjectVal = formData.subject.trim();
    if (subjectVal.length < 3) {
      newErrors.subject = 'Please enter a subject (at least 3 characters).';
    }

    const messageVal = formData.message.trim();
    if (messageVal.length < 5) {
      newErrors.message = 'Please enter your message (at least 5 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!validateForm()) return;

    setSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phonenumber: '+91' + formData.phone.trim(),
      description: `Subject: ${formData.subject.trim()}\n\nMessage: ${formData.message.trim()}`
    };

    try {
      const response = await fetch('https://flo-tracker-api.tracewavetransparency.com/api/v1/app/common/submit_contact_us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'platform': 'AnDroId@Trace'
        },
        body: JSON.stringify(payload)
      });

      const resJson = await response.json();

      if (response.ok && resJson && resJson.status) {
        setStatus({
          type: 'success',
          message: resJson.message || 'Your message has been sent successfully! Our team will respond shortly.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setErrors({});
      } else {
        setStatus({
          type: 'error',
          message: resJson.message || 'Something went wrong while submitting your message. Please try again.'
        });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus({
        type: 'network',
        message: 'Network connection error. Please check your internet connectivity and try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact TrackFlow Support Team',
    description: 'Reach out to the TrackFlow support team. Submit app bugs, request features, or ask billing questions.',
    url: 'https://periodtracker.online/contact',
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex-1 relative w-full flex flex-col justify-center">
        {/* Decorative Background Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5E8C]/10 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF8C69]/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Header Title Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5E8C]/10 border border-[#FF5E8C]/20 text-[#FF5E8C] font-bold text-xs sm:text-sm uppercase tracking-wider">
            Get In Touch
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1819] leading-snug tracking-tight font-heading">
            Contact Our Team
          </h1>
          <p className="text-[#706B6E] text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            Have questions about subscription packages, app improvements, or bug logging? Fill out the contact form below and we'll reply shortly.
          </p>
        </div>

        {/* Center Form Container */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-white/80 backdrop-blur-md border border-[#FF5E8C]/15 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A1819] font-heading mb-6 flex items-center gap-2.5">
                <Mail className="w-6 h-6 text-[#FF5E8C]" />
                <span>Send Us a Message</span>
              </h2>

              {/* Dynamic Status Alert Banner */}
              {status && (
                <div
                  className={`rounded-2xl p-4 mb-6 flex items-start gap-3 transition-all duration-300 border ${
                    status.type === 'success'
                      ? 'bg-green-500/10 border-green-500/20 text-green-800'
                      : 'bg-red-500/10 border-red-500/20 text-red-800'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {status.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {status.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                    {status.type === 'network' && <WifiOff className="w-5 h-5 text-red-600" />}
                  </div>
                  <div className="flex-1 text-sm font-semibold leading-relaxed">
                    {status.message}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    aria-label="Close message"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-[#1A1819]/80 uppercase tracking-wider block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3.5 bg-white border rounded-xl text-[#1A1819] placeholder-[#706B6E]/40 focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all text-sm font-medium ${
                        errors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs sm:text-sm text-red-500 font-semibold mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-[#1A1819]/80 uppercase tracking-wider block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Please enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3.5 bg-white border rounded-xl text-[#1A1819] placeholder-[#706B6E]/40 focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all text-sm font-medium ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs sm:text-sm text-red-500 font-semibold mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-[#1A1819]/80 uppercase tracking-wider block">
                      Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-sm font-semibold text-[#1A1819]/60">+91</span>
                      <input
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full pl-14 pr-4 py-3.5 bg-white border rounded-xl text-[#1A1819] placeholder-[#706B6E]/40 focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all text-sm font-medium ${
                          errors.phone ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs sm:text-sm text-red-500 font-semibold mt-1">{errors.phone}</p>
                    )}
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-xs sm:text-sm font-bold text-[#1A1819]/80 uppercase tracking-wider block">
                      Subject / Query Topic
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full px-4 py-3.5 bg-white border rounded-xl text-[#1A1819] placeholder-[#706B6E]/40 focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all text-sm font-medium ${
                        errors.subject ? 'border-red-500' : 'border-gray-200'
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-xs sm:text-sm text-red-500 font-semibold mt-1">{errors.subject}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-[#1A1819]/80 uppercase tracking-wider block">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Please enter your message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3.5 bg-white border rounded-xl text-[#1A1819] placeholder-[#706B6E]/40 focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all text-sm font-medium resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs sm:text-sm text-red-500 font-semibold mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#FF5E8C] hover:bg-[#FF5E8C]/90 text-white rounded-xl font-bold text-sm sm:text-base shadow-lg shadow-[#FF5E8C]/20 hover:shadow-xl hover:shadow-[#FF5E8C]/35 transform hover:scale-[1.01] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <span>Send message</span>
                  )}
                </button>
              </form>

              {/* Social Media Community Section */}
              <div className="mt-8 pt-6 border-t border-[#FF5E8C]/10 text-center space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#706B6E]/70 block">
                  Or Connect With Our Community On Social Media
                </span>
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://www.facebook.com/people/Periodtracker-ovulationcycle/61591714556127/?sk=about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5E8C]/10 hover:bg-[#FF5E8C] text-[#FF5E8C] hover:text-white font-bold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://www.instagram.com/periodtrackercycle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5E8C]/10 hover:bg-[#FF5E8C] text-[#FF5E8C] hover:text-white font-bold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCQJUxL2BRIExf0CD2W104XA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF5E8C]/10 hover:bg-[#FF5E8C] text-[#FF5E8C] hover:text-white font-bold text-xs sm:text-sm transition-all transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

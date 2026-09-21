'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Mail, CheckCircle2, AlertCircle, WifiOff, X, ArrowLeft, Loader2, Facebook, Instagram, Youtube, MessageSquare, Clock, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); 
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = 'Please enter full name';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter email address';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter phone number';
    }

    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Please select a topic';
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = 'Please enter your message';
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
          message: resJson.message || 'Your message has been sent successfully! Our support team will get back to you within 24 hours.'
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
          message: resJson.message || 'Something went wrong while submitting your message. Please try again later.'
        });
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus({
        type: 'network',
        message: 'Network error. Please check your internet connection and try again.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Period Tracker Ovulation Cycle Support Team',
    description: 'Reach out to the Period Tracker Ovulation Cycle support team. Submit app bugs, request features, or ask billing questions.',
    url: 'https://trackperiods.com/contact',
    publisher: {
      '@type': 'Organization',
      name: 'Period Tracker & Ovulation Cycle',
      logo: 'https://trackperiods.com/brand-logo-final.png'
    }
  };

  const commonSubjects = ['Account Help', 'Subscription & Billing', 'Bug Report', 'Feature Request', 'Other'];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FAF8F9] to-white selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="flex-1 relative w-full overflow-hidden pb-20">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FF5E8C]/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#FF8C69]/10 to-transparent rounded-tr-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF5E8C]/20 shadow-sm text-[#FF5E8C] font-bold text-xs uppercase tracking-wider mx-auto transition-transform hover:scale-105">
              <MessageSquare className="w-4 h-4" />
              <span>Get in Touch</span>
            </div>
            <h1 className=" font-extrabold text-[#1A1819]">
              We're Here to Help
            </h1>
            <p className="text-[#706B6E] font-medium">
              Have questions about your cycle, subscription, or our app? Reach out to our dedicated support team and we'll ensure you get the answers you need.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Contact Info & Quick Links */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-pink-900/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5E8C]/5 rounded-bl-full pointer-events-none" />
                
                <h2 className="text-[#1A1819] mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-pink-50 text-[#FF5E8C] rounded-2xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 uppercase">Email Support</h3>
                      <a href="mailto:support@tracewavetransparency.com" className="text-[#FF5E8C] font-bold text-lg hover:underline">support@tracewavetransparency.com</a>
                      <p className="text-gray-500 mt-1">For general inquiries and technical help.</p>
                    </div>
                  </div>
                  
                  {/* <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 text-[#FF8C69] rounded-2xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="mb-1 uppercase">Response Time</h3>
                      <p className="text-gray-700">Within 24 Hours</p>
                      <p className="text-gray-500 mt-1">Our team is active Monday to Friday.</p>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Social Media Block */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-pink-900/5">
                <h2 className="text-[#1A1819] mb-2">Join the Community</h2>
                <p className="text-gray-500 mb-6">Follow us for wellness tips, updates, and community support.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a href="https://www.instagram.com/periodtrackercycle/" target="_blank" rel="noopener noreferrer" 
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 hover:text-[#FF5E8C] text-gray-600 transition-colors group">
                    <Instagram className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Instagram</span>
                  </a>
                  <a href="https://www.facebook.com/people/Periodtracker-ovulationcycle/61591714556127/?sk=about" target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 transition-colors group">
                    <Facebook className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Facebook</span>
                  </a>
                  <a href="https://www.youtube.com/channel/UCQJUxL2BRIExf0CD2W104XA" target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-600 transition-colors group">
                    <Youtube className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">YouTube</span>
                  </a>
                </div>
              </div>
              
              {/* FAQ Teaser */}
              <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-3xl p-6 border border-pink-100 flex items-center justify-between">
                <div>
                  <h3 className="mb-1">Need quick answers?</h3>
                  <p className="text-gray-600">Check out our Help Center.</p>
                </div>
                <Link href="/faq" className="px-4 py-2 bg-white rounded-full font-bold text-[#FF5E8C] text-sm shadow-sm hover:shadow-md transition-shadow">
                  View FAQs
                </Link>
              </div>

            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-2xl shadow-pink-900/10 relative">
                
                <div className="mb-8">
                  <h2 className="text-[#1A1819] flex items-center gap-2">
                    <Mail className="w-6 h-6 text-[#FF5E8C]" />
                    Send us a Message
                  </h2>
                </div>

                {/* Status Alert Banner */}
                {status && (
                  <div className={`rounded-2xl p-5 mb-8 flex items-start gap-4 animate-fadeIn border ${
                    status.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="shrink-0 mt-0.5">
                      {status.type === 'success' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                      {status.type === 'error' && <AlertCircle className="w-6 h-6 text-red-500" />}
                      {status.type === 'network' && <WifiOff className="w-6 h-6 text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-bold ${status.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                        {status.type === 'success' ? 'Message Sent' : 'Submission Failed'}
                      </h4>
                      <p className={` mt-1 ${status.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                        {status.message}
                      </p>
                    </div>
                    <button onClick={() => setStatus(null)} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
                      <X className={`w-5 h-5 ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`} />
                    </button>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                      <input
                        type="text"
                        placeholder="Please enter full name"
                        value={formData.name}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all font-medium ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        placeholder="Please enter email address"
                        value={formData.email}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all font-medium ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                      <div className="relative flex items-center">
                        <span className={`absolute left-4 text-sm font-bold transition-colors ${focusedField === 'phone' ? 'text-[#FF5E8C]' : 'text-gray-400'}`}>+91</span>
                        <input
                          type="tel"
                          placeholder="Please enter phone number"
                          value={formData.phone}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          className={`w-full pl-14 pr-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all font-medium ${
                            errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Topic</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:bg-white focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all font-medium appearance-none ${
                          errors.subject ? 'border-red-300 bg-red-50' : 'border-gray-200'
                        } ${!formData.subject ? 'text-gray-400' : ''}`}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}
                      >
                        <option value="" disabled>Please select a topic</option>
                        {commonSubjects.map(sub => (
                          <option key={sub} value={sub} className="text-gray-900">{sub}</option>
                        ))}
                      </select>
                      {errors.subject && <p className="text-red-500 mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">How can we help?</label>
                      <span className={`text-xs font-bold ${formData.message.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Please enter your message"
                      value={formData.message}
                      maxLength={500}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full px-4 py-3.5 bg-gray-50 border rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:border-[#FF5E8C] focus:ring-4 focus:ring-[#FF5E8C]/10 transition-all font-medium resize-none ${
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'
                      }`}
                    />
                    {errors.message && <p className="text-red-500 mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-[#FF5E8C] to-[#FF8C69] hover:from-[#FF5E8C]/90 hover:to-[#FF8C69]/90 text-white rounded-xl font-bold text-lg shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending securely...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 ml-1" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-center text-gray-400 font-medium">
                    By submitting this form, you agree to our <Link href="/privacy" className="hover:text-[#FF5E8C] underline">Privacy Policy</Link>.
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


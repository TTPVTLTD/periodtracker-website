'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function DeleteAccountPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Capture form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Log the inputs as requested
    console.log("=== Delete Account Request ===");
    console.log("Name:", data.name);
    console.log("Phone:", data.phone);
    console.log("Email:", data.email);
    console.log("Description:", data.description);
    console.log("==============================");

    // Show custom popup
    setIsSubmitted(true);

    // Clear the form inputs
    e.target.reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F9] relative">
      <Navbar />
      <main className="flex-1 pb-8 sm:pb-12">
        
        {/* Hero Section matching theme */}
        <section className="bg-gradient-to-b from-pink-50 to-[#FAF8F9] pt-8 sm:pt-10 pb-8 border-b border-pink-100/50 text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug mb-3">
              Delete Account Request
            </h1>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Permanently delete your profile data, cycle history, and symptom logs. This action is irreversible.
            </p>
          </div>
        </section>

        {/* Form Container */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-gray-900">
                  Name <span className="text-flo-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter Your Name"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-flo-400 focus:ring-1 focus:ring-flo-400 transition-colors bg-gray-50/30"
                />
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-bold text-gray-900">
                  Phone number <span className="text-flo-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+91"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-flo-400 focus:ring-1 focus:ring-flo-400 transition-colors bg-gray-50/30"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-gray-900">
                  Email Address <span className="text-flo-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-flo-400 focus:ring-1 focus:ring-flo-400 transition-colors bg-gray-50/30"
                />
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-bold text-gray-900">
                  Description <span className="text-flo-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows="4"
                  placeholder="Enter Description"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-flo-400 focus:ring-1 focus:ring-flo-400 transition-colors bg-gray-50/30 resize-y"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-6 pb-2 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto min-w-[240px] px-8 py-3.5 bg-flo-600 hover:bg-flo-700 text-white text-base font-bold rounded-full shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>
        </section>

      </main>
      <Footer />

      {/* Custom Theme Popup (Modal) */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-pink-100 transform transition-all scale-in duration-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Sent</h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              Your account deletion request has been submitted successfully. Our team will process this shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-3.5 bg-flo-600 hover:bg-flo-700 text-white font-bold rounded-xl transition-all shadow-md"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

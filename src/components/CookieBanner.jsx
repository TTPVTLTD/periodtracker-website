'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check local storage after mount (client-side only)
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleClose = (status) => {
    setIsClosing(true);
    setTimeout(() => {
      localStorage.setItem('cookieConsent', status);
      setShow(false);
    }, 300); // Matches transition duration
  };

  if (!show) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[400px] z-50 p-4 sm:p-0 transition-all duration-300 ease-in-out ${
        isClosing ? 'translate-y-full opacity-0 sm:translate-y-10' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-[#FF5E8C]/20 p-5 sm:p-6 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5E8C]/5 rounded-full blur-2xl -z-10 transform translate-x-10 -translate-y-10" />
        
        <button 
          onClick={() => handleClose('declined')}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5 text-[#FF5E8C]" />
          </div>
          <div className="pr-4">
            <h3 className="font-bold text-[#1A1819] text-base mb-1">We Care About Your Privacy</h3>
            <div className="text-sm text-[#706B6E] leading-relaxed mb-4">
              We use cookies to improve your experience and deliver relevant content. 
              Read our <Link href="/privacy" className="text-[#FF5E8C] font-semibold hover:underline">Privacy Policy</Link>.
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button 
                onClick={() => handleClose('accepted')}
                className="px-4 py-2 bg-[#FF5E8C] hover:bg-pink-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-pink-200"
              >
                Accept All
              </button>
              <button 
                onClick={() => handleClose('declined')}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#706B6E] text-sm font-bold rounded-xl transition-colors"
              >
                No, Thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

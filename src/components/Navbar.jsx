'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { APP_LINKS } from '../data/appLinks';
import {
  Apple,
  Smartphone,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Calendar,
  Heart,
  Activity,
  CheckCircle2,
  BookOpen,
  Egg,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CALCULATORS } from '../data/calculators';
import { TOP_NAV_MENUS } from '../data/navigation';

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  // App Mode Detection (Hides Navbar when ?app=true is in URL)
  const [isAppMode, setIsAppMode] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('app') === 'true') {
        setIsAppMode(true);
      }
    }
  }, []);

  // Detect scroll to animate header from compact floating to full-width
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to smoothly scroll to anchor with accurate sticky header clearance
  const smoothScrollToHash = (hash) => {
    if (!hash || typeof window === 'undefined') return;
    const cleanHash = hash.replace(/^#/, '');
    const target = document.getElementById(cleanHash);
    if (target) {
      const headerOffset = 92;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  // Ensure anchor navigation aligns properly below sticky header on mount & hashchange
  useEffect(() => {
    const handleHashNavigation = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        setTimeout(() => {
          smoothScrollToHash(window.location.hash);
        }, 150);
      }
    };

    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isAppMode) return null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm shadow-pink-900/5 border-b border-pink-100/90'
        : 'bg-white/90 backdrop-blur-sm border-b border-pink-100/60'
        }`}
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16 sm:h-17' : 'h-18 sm:h-20'}`}>

          {/* Brand Logo: Common Official Logo from Reference Site */}
          <Link href="/" className="flex items-center group shrink-0 py-1" aria-label="Period Tracker & Ovulation Cycle Home">
            <Image
              src="/brand-logo-final.png"
              alt="Period Tracker & Ovulation Cycle Logo"
              width={200}
              height={55}
              priority
              className="h-10 sm:h-11 w-auto object-contain group-hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-bold text-gray-700 shrink-0">
            {TOP_NAV_MENUS.map((menu) => {

              // 1. Calculators Dropdown Menu (Flo style)
              if (menu.isCalculatorsMenu) {
                const isOpen = activeDropdown === 'calculators';
                return (
                  <div
                    key={menu.id}
                    className="relative py-2"
                    onMouseEnter={() => setActiveDropdown('calculators')}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={menu.href || '/calculators'}
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all text-sm font-bold ${isOpen ? 'bg-flo-100 text-flo-700' : 'hover:text-flo-600 hover:bg-flo-50'
                        }`}
                    >
                      <span>{menu.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-flo-600' : 'text-gray-400'}`} />
                    </Link>

                    {isOpen && (
                      <div className="absolute top-full left-0 pt-1.5 z-50 animate-fadeIn">
                        <div className="w-72 sm:w-80 bg-white rounded-2xl shadow-xl shadow-pink-900/10 border border-pink-100 p-2.5">
                          <div className="px-3 py-1.5 mb-1 border-b border-pink-50 flex items-center justify-between">
                            <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                              Cycle & Fertility Tools
                            </span>

                          </div>

                          <div className="space-y-0.5">
                            {CALCULATORS.map((calc) => (
                              <Link
                                key={calc.slug}
                                href={`/calculators/${calc.slug}`}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-flo-50 hover:text-flo-600 transition-colors group text-sm font-semibold text-gray-800"
                              >
                                <span className="group-hover:text-flo-600 transition-colors">
                                  {calc.name}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-flo-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                              </Link>
                            ))}
                          </div>

                          <div className="mt-1 pt-1.5 border-t border-pink-50 px-2">
                            <Link
                              href="/calculators"
                              onClick={() => setActiveDropdown(null)}
                              className="text-sm font-bold text-flo-600 hover:underline flex items-center justify-between px-1 py-1"
                            >
                              <span>Explore all 8 cycle tools &rarr;</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // 2. Regular Dropdown Menus (About, Product)
              if (menu.dropdown) {
                const isOpen = activeDropdown === menu.id;
                return (
                  <div
                    key={menu.id}
                    className="relative py-2"
                    onMouseEnter={() => setActiveDropdown(menu.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={menu.href || '#'}
                      onClick={() => setActiveDropdown(null)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all text-sm font-bold ${isOpen ? 'bg-flo-100 text-flo-700' : 'hover:text-flo-600 hover:bg-flo-50'
                        }`}
                    >
                      <span>{menu.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-flo-600' : 'text-gray-400'}`} />
                    </Link>

                    {isOpen && (
                      <div className="absolute top-full left-0 pt-1.5 z-50 animate-fadeIn">
                        <div className="w-64 sm:w-72 bg-white rounded-2xl shadow-xl shadow-pink-900/10 border border-pink-100 p-2">
                          <div className="space-y-0.5">
                            {menu.dropdown.map((sub, idx) => (
                              <Link
                                key={idx}
                                href={sub.href}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  if (typeof window !== 'undefined' && sub.href.includes('#')) {
                                    const [path, hash] = sub.href.split('#');
                                    if (window.location.pathname === path && hash) {
                                      smoothScrollToHash(hash);
                                    }
                                  }
                                }}
                                className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-flo-50 hover:text-flo-600 transition-colors group text-sm font-semibold text-gray-800"
                              >
                                <span className="group-hover:text-flo-600 transition-colors">
                                  {sub.name}
                                </span>
                                {sub.badge ? (
                                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                                    {sub.badge}
                                  </span>
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-flo-600 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                                )}
                              </Link>
                            ))}
                          </div>

                          {menu.href && (
                            <div className="mt-1 pt-1.5 border-t border-pink-50 px-2">
                              <Link
                                href={menu.href}
                                onClick={() => setActiveDropdown(null)}
                                className="text-sm font-bold text-flo-600 hover:underline flex items-center justify-between px-1 py-1"
                              >
                                <span>Explore all {menu.name} &rarr;</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // 3. Direct Links (Health Library)
              return (
                <Link
                  key={menu.id}
                  href={menu.href}
                  className="hover:text-flo-600 hover:bg-flo-50/70 transition-colors px-3 py-2 rounded-full whitespace-nowrap"
                >
                  {menu.name}
                </Link>
              );
            })}
          </nav>

          {/* Top Right Actions - Distinct & Clean Row */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0 whitespace-nowrap">
            <Link
              href="/subscription"
              className="text-sm font-bold text-gray-700 hover:text-flo-600 transition-colors whitespace-nowrap px-1 py-1"
            >
              Subscription Plans
            </Link>

            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 bg-brand-pink hover:bg-flo-600 text-white font-bold px-4 lg:px-5 py-2.5 rounded-full shadow-md shadow-pink-200 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-xs cursor-pointer whitespace-nowrap"
              >
                <span>Get the App</span>
                {/* <Sparkles className="w-3.5 h-3.5" /> */}
              </button>

              <div className="absolute top-full right-0 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-pink-100 rounded-2xl shadow-xl p-3 flex flex-row gap-3 w-max">
                  <a href={APP_LINKS.ios} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition-colors">
                    <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.08 1.74-.95 2.77 1.01.08 2.05-.51 2.68-1.27z" />
                    </svg>
                    <div className="flex flex-col items-start leading-none">
                      {/* <span className="text-[10px] text-gray-300 font-medium tracking-wide mb-0.5">Download on the</span> */}
                      <span className="text-sm font-bold">App Store</span>
                    </div>
                  </a>
                  <a href={APP_LINKS.android} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition-colors">
                    
                    <img className="w-5 h-5" src="https://img.utdstc.com/icon/5d0/b04/5d0b0403257ac6cde82fa20c08ec83bea1d4b6ccd406fefdb1672717881c1a7a:600" alt="" />
                    <div className="flex flex-col items-start leading-none">
                      {/* <span className="text-[10px] text-gray-300 font-medium tracking-wide mb-0.5">GET IT ON</span> */}
                      <span className="text-sm font-bold">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-gray-600 hover:text-flo-600 hover:bg-flo-50 transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 border-b border-pink-100 px-4 pt-3 pb-6 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto">
          {TOP_NAV_MENUS.map((menu) => {
            if (menu.isCalculatorsMenu) {
              const isExp = mobileExpandedGroup === 'calculators';
              return (
                <div key={menu.id} className="border-b border-pink-50 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedGroup(isExp ? null : 'calculators')}
                    className="w-full flex items-center justify-between py-2.5 text-left font-bold text-gray-800"
                  >
                    <span>{menu.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExp ? 'rotate-180 text-flo-600' : 'text-gray-400'}`} />
                  </button>
                  {isExp && (
                    <div className="pl-3 space-y-1 pt-1">
                      {CALCULATORS.map((calc) => (
                        <Link
                          key={calc.slug}
                          href={`/calculators/${calc.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-sm text-gray-700 hover:text-flo-600 font-semibold"
                        >
                          • {calc.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (menu.dropdown) {
              const isExp = mobileExpandedGroup === menu.id;
              return (
                <div key={menu.id} className="border-b border-pink-50 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedGroup(isExp ? null : menu.id)}
                    className="w-full flex items-center justify-between py-2.5 text-left font-bold text-gray-800"
                  >
                    <span>{menu.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExp ? 'rotate-180 text-flo-600' : 'text-gray-400'}`} />
                  </button>
                  {isExp && (
                    <div className="pl-3 space-y-1 pt-1">
                      {menu.href && (
                        <Link
                          href={menu.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-2 text-sm text-flo-600 font-bold"
                        >
                          → Explore All {menu.name}
                        </Link>
                      )}
                      {menu.dropdown.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={sub.href}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            if (typeof window !== 'undefined' && sub.href.includes('#')) {
                              const [path, hash] = sub.href.split('#');
                              if (window.location.pathname === path && hash) {
                                smoothScrollToHash(hash);
                              }
                            }
                          }}
                          className="block py-2 text-sm text-gray-700 hover:text-flo-600 font-semibold"
                        >
                          • {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div key={menu.id} className="border-b border-pink-50 pb-2">
                <Link
                  href={menu.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 font-bold text-gray-800 hover:text-flo-600"
                >
                  {menu.name}
                </Link>
              </div>
            );
          })}

          <div className="border-b border-pink-50 pb-2">
            <Link
              href="/subscription"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 font-bold text-gray-800 hover:text-flo-600"
            >
              Subscription Plans
            </Link>
          </div>

          <div className="pt-3 grid grid-cols-2 gap-3">
            <a
              href={APP_LINKS.ios}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-black hover:bg-gray-800 text-white rounded-xl transition-all"
            >
              <Apple className="w-5 h-5 fill-current" />
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] text-gray-300 font-medium mb-0.5">Download on</span>
                <span className="text-xs font-bold">App Store</span>
              </div>
            </a>
            <a
              href={APP_LINKS.android}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-black hover:bg-gray-800 text-white rounded-xl transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L15.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z" fill="#4CAF50" />
                <path d="M15.69 12L19.41 8.27L21.41 9.42C22.21 9.88 22.21 11.02 21.41 11.48L19.41 12.63L15.69 12Z" fill="#FFEB3B" />
                <path d="M15.69 12L3.84 21.85C4.04 21.96 4.27 22 4.5 22C4.77 22 5.04 21.92 5.28 21.78L19.41 12.63L15.69 12Z" fill="#F44336" />
                <path d="M15.69 12L19.41 8.27L5.28 2.22C5.04 2.08 4.77 2 4.5 2C4.27 2 4.04 2.04 3.84 2.15L15.69 12Z" fill="#2196F3" />
              </svg>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] text-gray-300 font-medium mb-0.5">GET IT ON</span>
                <span className="text-xs font-bold">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

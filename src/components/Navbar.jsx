'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
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

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
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
                      className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all text-sm font-bold ${
                        isOpen ? 'bg-flo-100 text-flo-700' : 'hover:text-flo-600 hover:bg-flo-50'
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
                            <span className="text-xs font-bold text-flo-600 bg-flo-50 px-2 py-0.5 rounded-full border border-pink-200">
                              8 Calculators
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
                              className="text-xs font-bold text-flo-600 hover:underline flex items-center justify-between px-1 py-1"
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
                      className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all text-sm font-bold ${
                        isOpen ? 'bg-flo-100 text-flo-700' : 'hover:text-flo-600 hover:bg-flo-50'
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
                                      const target = document.getElementById(hash);
                                      if (target) {
                                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                      }
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
                                className="text-xs font-bold text-flo-600 hover:underline flex items-center justify-between px-1 py-1"
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
              className="text-xs sm:text-sm font-bold text-gray-700 hover:text-flo-600 transition-colors whitespace-nowrap px-1 py-1"
            >
              Subscription Plans
            </Link>

            <a
              href="https://apps.apple.com/app/id6774117828"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-brand-pink hover:bg-flo-600 text-white font-bold px-4 lg:px-5 py-2.5 rounded-full shadow-md shadow-pink-200 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
            >
              <span>Get the App</span>
              <Sparkles className="w-3.5 h-3.5" />
            </a>
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
                          className="block py-1.5 text-xs text-gray-600 hover:text-flo-600 font-medium"
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
                          className="block py-1.5 text-xs text-flo-600 font-bold"
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
                                const target = document.getElementById(hash);
                                if (target) {
                                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }
                            }
                          }}
                          className="block py-1.5 text-xs text-gray-600 hover:text-flo-600 font-medium"
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

          <div className="pt-3">
            <a
              href="https://apps.apple.com/app/id6774117828"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-brand-pink hover:bg-flo-600 text-white rounded-full font-bold shadow-md shadow-pink-200 text-center text-sm transition-colors"
            >
              <span>Get the App</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

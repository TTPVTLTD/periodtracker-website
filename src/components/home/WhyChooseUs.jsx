'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Target,
      title: "Predictions You Can Confidently Plan Around",
      description: "Obstetric mathematical algorithms adapt to your unique cycle history — delivering pinpoint period start dates, fertile ovulation windows, and safe day estimations.",
      linkText: "Why women rely on our cycle calculations",
      linkHref: "/calculators/ovulation-calculator"
    },
    {
      icon: Lock,
      title: "100% In-Device Privacy & Zero Ad Tracking",
      description: "Your intimate menstrual logs and symptom history are safeguarded with local on-device encryption. No cloud leaks, zero third-party data broker selling, complete peace of mind.",
      linkText: "Read our strict data privacy standards",
      linkHref: "/about/privacy-portal"
    },
    {
      icon: Sparkles,
      title: "Ayurvedic Cramp Care & Smart AI Insights",
      description: "Harness ancient herbal wisdom for period cramp relief and PMS alongside doctor-ready AI health summaries that chart symptom patterns across months.",
      linkText: "Explore Ayurvedic remedies & AI models",
      linkHref: "/about/ayurveda-care"
    }
  ];

  return (
    <section id="why-choose-us" className="py-16 sm:py-20 bg-white border-b border-pink-100/70 scroll-mt-24 sm:scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Why Choose Period Tracker & Ovulation Calculator?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            A clinically grounded, private women’s wellness companion built for predictive accuracy, personalized hormone insights, and natural menstrual care.
          </p>
        </div>

        {/* 3 Pillars Grid matching Reference Image 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                
                {/* Outlined Circular Icon matching Reference Image 2 */}
                <div className="w-16 h-16 rounded-full border-2 border-pink-300 flex items-center justify-center text-flo-500 bg-flo-50/50 shadow-xs">
                  <Icon className="w-8 h-8 stroke-[1.75]" />
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 leading-snug max-w-xs">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                  {item.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={item.linkHref}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-flo-600 hover:text-flo-700 hover:underline transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

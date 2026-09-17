'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Target,
      title: "Predictions you can plan around",
      description: "Obstetric mathematical models adapted to your unique cycle history, giving you reliable period forecasts and pinpoint ovulation dates.",
      linkText: "Why women rely on our cycle calculations",
      linkHref: "/calculators/ovulation-calculator"
    },
    {
      icon: Lock,
      title: "Personal data that stays private to you",
      description: "Your intimate menstrual records and cycle history are protected by private end-to-end encryption. Zero advertising trackers, zero data selling.",
      linkText: "Your privacy standards answered",
      linkHref: "/about/privacy-portal"
    },
    {
      icon: Sparkles,
      title: "AI health reports & Ayurveda care",
      description: "Automated monthly AI trend summaries from your logs, alongside time-tested Ayurvedic remedies for cramps and natural cycle balance.",
      linkText: "Explore our Ayurveda remedies & AI models",
      linkHref: "/about/ayurveda-care"
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-pink-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Why choose Period Tracker?
          </h2>
          <p className="mt-3 text-base text-gray-600">
            A private, intelligent wellness experience designed for predictive accuracy and natural self-care.
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
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-flo-600 hover:text-flo-700 hover:underline transition-colors"
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

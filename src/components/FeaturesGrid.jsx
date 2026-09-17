'use client';

import React from 'react';
import { ShieldCheck, Heart, Sparkles, Moon, Calendar, Zap } from 'lucide-react';

export default function FeaturesGrid() {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Cycle Predictions',
      desc: 'Anticipate your period start dates and cycle fluctuations with reliable obstetric formulas adapted to your body.'
    },
    {
      icon: Sparkles,
      title: 'Peak Ovulation Tracking',
      desc: 'Pinpoint the 6-day fertile window and the exact ovulation release day to plan pregnancy or monitor fertility.'
    },
    {
      icon: ShieldCheck,
      title: '100% Client-Side Privacy',
      desc: 'Unlike cloud apps, your menstrual health information never leaves your browser. Zero third-party trackers or servers.'
    },
    {
      icon: Moon,
      title: 'Phase-Based Self Care',
      desc: 'Understand how estrogen, progesterone, and LH shifts govern your mood, sleep, physical stamina, and appetite.'
    },
    {
      icon: Heart,
      title: 'Pregnancy Due Date Math',
      desc: 'Calculate accurate gestation milestones and track weekly fetal development comparisons from week 4 to week 40.'
    },
    {
      icon: Zap,
      title: 'Zero Latency & Instant Access',
      desc: 'No account sign-up, no passwords, and no subscriptions. Open the site and calculate your cycle in seconds.'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-flo-600 uppercase tracking-widest bg-flo-50 px-3 py-1 rounded-full border border-pink-200">
            Why Women Love This Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Designed for Clarity, Privacy & Health Empowerment
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-flo-50/40 border border-pink-100 hover:border-pink-300 hover:bg-white hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-flo-100 flex items-center justify-center text-flo-600 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {feat.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

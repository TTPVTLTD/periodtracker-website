import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhatYouCanDo from '../components/home/WhatYouCanDo';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import MissionBanner from '../components/home/MissionBanner';
import ExpertAnswers from '../components/home/ExpertAnswers';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Period Tracker & Ovulation Calculator - Cycle Calendar',
  description: 'Track your period, calculate fertile ovulation days, and log cycle symptoms with 100% privacy. Free, simple, and accurate menstrual health companion.',
  keywords: [
    'period tracker',
    'ovulation calculator',
    'menstrual cycle',
    'period calendar',
    'fertility tracker',
    'safe days to avoid pregnancy'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Period Tracker & Ovulation Calculator - Cycle Calendar',
    description: 'Track your period, calculate fertile ovulation days, and log cycle symptoms with 100% privacy. Free, simple, and accurate menstrual health companion.',
    url: '/',
    siteName: 'Period Tracker & Ovulation Cycle',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Period Tracker & Ovulation Calculator - Cycle Calendar',
    description: 'Track your period, calculate fertile ovulation days, and log cycle symptoms with 100% privacy. Free, simple, and accurate menstrual health companion.',
  },
};

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Period Tracker & Ovulation Cycle',
    url: 'https://periodtracker.online',
    description: 'Free, simple, and accurate menstrual cycle, ovulation, and pregnancy tracking platform with 100% in-browser privacy.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://periodtracker.online/wellness-hub?category={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Period Tracker & Ovulation Cycle',
    url: 'https://periodtracker.online',
    logo: 'https://periodtracker.online/logo.png',
    sameAs: [
      'https://apps.apple.com/app/id6774117828',
      'https://play.google.com/store/apps/details?id=com.tracewave.period',
    ],
  };

  return (
    <div className="flex-1 flex flex-col bg-[#fff9fb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Top Navbar with Dynamic Dropdowns */}
      <Navbar />

      {/* Main Homepage Flow (Application Showcase & Marketing Flow) */}
      <main className="flex-1">
        {/* 1. App Showcase Hero matching Screenshot (App Store & Google Play Badges, Seamless Floating Preview) */}
        <Hero />

        {/* 2. What can you do with Period Tracker? (Interactive Phone Simulator with Normal Sleek Mobile Frame) */}
        <WhatYouCanDo />

        {/* 3. Why choose Period Tracker? (3 Clean Value Pillars) */}
        <WhyChooseUs />

        {/* 4. What our users say about us (Testimonial Carousel & 5-Star Ratings) */}
        <Testimonials />

        {/* 5. Access for all, not just the privileged (Open Health Mission Banner) */}
        <MissionBanner />

        {/* 6. Questions about your body, answered by experts (Reference Screenshot) */}
        <ExpertAnswers />

        {/* 7. FAQs Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

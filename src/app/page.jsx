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
  title: 'Period Tracker & Ovulation Calculator — Menstrual Cycle Calendar',
  description: 'Track your period, calculate fertile ovulation days, identify safe days, and log cycle symptoms with 100% private on-device security. Free, accurate menstrual health companion.',
  keywords: [
    'period tracker',
    'ovulation calculator',
    'menstrual cycle calendar',
    'fertile window calculator',
    'safe days to avoid pregnancy',
    'period symptoms tracker',
    'pcos cycle tracker',
    'pregnancy due date calculator',
    'natural period cramp remedies ayurveda'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Period Tracker & Ovulation Calculator — Menstrual Cycle Calendar',
    description: 'Track your period, calculate fertile ovulation days, identify safe days, and log cycle symptoms with 100% private on-device security. Free, accurate menstrual health companion.',
    url: '/',
    siteName: 'Period Tracker & Ovulation Cycle',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Period Tracker & Ovulation Calculator — Menstrual Cycle Calendar',
    description: 'Track your period, calculate fertile ovulation days, identify safe days, and log cycle symptoms with 100% private on-device security. Free, accurate menstrual health companion.',
  },
};

export default function HomePage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Period Tracker & Ovulation Cycle',
    url: 'https://trackperiods.com',
    description: 'Free, simple, and accurate menstrual cycle, ovulation, and pregnancy tracking platform with 100% in-browser privacy.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://trackperiods.com/wellness-hub?category={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Period Tracker & Ovulation Cycle',
    url: 'https://trackperiods.com',
    logo: 'https://trackperiods.com/brand-logo-final.png',
    sameAs: [
      'https://apps.apple.com/app/id6774117828',
      'https://play.google.com/store/apps/details?id=com.tracewave.period',
    ],
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Period Tracker & Ovulation Cycle',
    operatingSystem: 'iOS, Android, Web',
    applicationCategory: 'HealthApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '500000',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const faqPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I calculate my ovulation day and fertile window?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ovulation typically occurs around 14 days before your next period starts in an average 28-day menstrual cycle. Your fertile window spans 6 days: the 5 days leading up to ovulation plus ovulation day itself.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Period Tracker calculate my next cycle?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The period tracker counts from the first day of your last period and adds your average menstrual cycle length (typically 21 to 35 days) to forecast your upcoming period start date, follicular phase, and luteal phase.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I track irregular periods or PCOS cycles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our adaptive algorithm accommodates cycle variations and logs symptoms, cervical mucus changes, and basal body temperature to provide accurate forecasting even for irregular menstrual patterns.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my menstrual health data kept private and secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100%. All cycle calculations and logs are processed locally with on-device encryption. No personal health information or cycle dates are sold to data brokers or third-party advertisers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do Ayurvedic remedies help with period cramps and PMS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ayurvedic care addresses Dosha imbalances (predominantly Vata and Pitta) through herbal preparations like ginger, ashoka, cumin tea, and dietary protocols that naturally alleviate dysmenorrhea, bloating, and fatigue.',
        },
      },
    ],
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F9]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
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

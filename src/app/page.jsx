'use client';

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

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col bg-[#fff9fb]">
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

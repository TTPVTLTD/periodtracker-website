import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ABOUT_PAGES } from '../../../data/aboutPages';
import { APP_LINKS } from '../../../data/appLinks';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/about/ContactForm';
import { 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Brain, 
  Flower2, 
  Lock, 
  ArrowUpRight,
  ArrowRight,
  Activity,
  Mail,
  Send,
  Leaf,
  Check,
  Globe2,
  Heart
} from 'lucide-react';
import { clampTitle, clampDescription, clampKeywords } from '../../../utils/seo';

export function generateStaticParams() {
  return ABOUT_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export function generateMetadata({ params }) {
  const pageData = ABOUT_PAGES.find((p) => p.slug === params.slug);
  if (!pageData) {
    return {
      title: 'Page Not Found',
    };
  }

  const keywordsMap = {
    'science-and-research': ['menstrual cycle science', 'predictive cycle algorithms', 'fertility research', 'period tracking science'],
    'ai-reports': ['ai cycle reports', 'smart health summaries', 'menstrual symptom analysis', 'doctor ready period reports'],
    'ayurveda-care': ['ayurvedic period care', 'cramp relief remedies', 'holistic menstrual health', 'ayurveda for pms'],
    'privacy-portal': ['period tracker privacy', 'private health app', 'zero ad tracking period tracker', 'encrypted cycle data'],
    'contact': ['period tracker support', 'contact period tracker', 'cycle app community help', 'customer support'],
    'medical-affairs': ['period tracker medical affairs', 'clinical cycle review', 'reproductive health board'],
    'accuracy': ['period tracker accuracy', 'ovulation prediction reliability', 'cycle prediction models'],
  };

  const rawTitle = `${pageData.title} - Science & Care`;
  const rawDesc = pageData.subtitle || pageData.heroDesc;
  const safeTitle = clampTitle(rawTitle, 'Period Tracker', 60);
  const safeDesc = clampDescription(rawDesc, 158);
  const safeKeywords = clampKeywords(keywordsMap[pageData.slug] || [pageData.title, 'period tracker', 'reproductive health'], 6);

  return {
    title: safeTitle,
    description: safeDesc,
    keywords: safeKeywords,
    alternates: {
      canonical: `/about/${pageData.slug}`,
    },
    openGraph: {
      title: safeTitle,
      description: safeDesc,
      url: `/about/${pageData.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDesc,
    },
  };
}

export default function AboutDetailPage({ params }) {
  const { slug } = params;
  const pageData = ABOUT_PAGES.find((p) => p.slug === slug);

  if (!pageData) {
    notFound();
  }

  const otherPages = ABOUT_PAGES.filter((p) => p.slug !== slug);

  // Render Distinct Page Layouts based on Slug
  const renderCustomView = () => {
    switch (slug) {
      case 'science-and-research':
      case 'medical-affairs':
        return <ScienceAndResearchView pageData={pageData} otherPages={otherPages} />;
      case 'ai-reports':
        return <AiReportsView pageData={pageData} otherPages={otherPages} />;
      case 'ayurveda-care':
        return <AyurvedaCareView pageData={pageData} otherPages={otherPages} />;
      case 'privacy-portal':
        return <PrivacyPortalView pageData={pageData} otherPages={otherPages} />;
      case 'contact':
        return <ContactView pageData={pageData} otherPages={otherPages} />;
      default:
        return <ScienceAndResearchView pageData={pageData} otherPages={otherPages} />;
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: pageData.title,
    description: pageData.subtitle || pageData.heroDesc,
    url: `https://periodtracker.online/about/${pageData.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Period Tracker & Ovulation Cycle',
      logo: 'https://periodtracker.online/logo.png',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf9]">
      <Navbar />
      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {renderCustomView()}
      </main>
      <Footer />
    </div>
  );
}


/**
 * Reusable Detailed Content Pillars, Checklists, FAQs & Sidebar
 */
function DetailedContentAndFaqs({ pageData, otherPages, accentColor = "rose" }) {
  const accentClasses = {
    rose: {
      check: "text-flo-500",
      bulletCard: "bg-pink-50/50 border-pink-100",
      bulletTitle: "text-pink-900",
      faqBox: "border-pink-100",
      faqIcon: "bg-pink-100 text-flo-600",
      faqItem: "bg-[#fffbf9] border-pink-100 open:border-flo-300 open:ring-flo-200",
      faqPlus: "text-flo-500"
    },
    purple: {
      check: "text-purple-600",
      bulletCard: "bg-purple-50/50 border-purple-100",
      bulletTitle: "text-purple-900",
      faqBox: "border-purple-100",
      faqIcon: "bg-purple-100 text-purple-700",
      faqItem: "bg-[#fcfaff] border-purple-100 open:border-purple-300 open:ring-purple-200",
      faqPlus: "text-purple-600"
    },
    emerald: {
      check: "text-emerald-600",
      bulletCard: "bg-emerald-50/50 border-emerald-100",
      bulletTitle: "text-emerald-900",
      faqBox: "border-emerald-100",
      faqIcon: "bg-emerald-100 text-emerald-700",
      faqItem: "bg-[#f9fdfa] border-emerald-100 open:border-emerald-300 open:ring-emerald-200",
      faqPlus: "text-emerald-600"
    },
    teal: {
      check: "text-teal-600",
      bulletCard: "bg-teal-50/50 border-teal-100",
      bulletTitle: "text-teal-900",
      faqBox: "border-teal-100",
      faqIcon: "bg-teal-100 text-teal-700",
      faqItem: "bg-[#f9fdfd] border-teal-100 open:border-teal-300 open:ring-teal-200",
      faqPlus: "text-teal-600"
    },
    orange: {
      check: "text-orange-600",
      bulletCard: "bg-orange-50/50 border-orange-100",
      bulletTitle: "text-orange-900",
      faqBox: "border-orange-100",
      faqIcon: "bg-orange-100 text-orange-700",
      faqItem: "bg-[#fff9f5] border-orange-100 open:border-orange-300 open:ring-orange-200",
      faqPlus: "text-orange-600"
    }
  }[accentColor] || {
    check: "text-flo-500",
    bulletCard: "bg-pink-50/50 border-pink-100",
    bulletTitle: "text-pink-900",
    faqBox: "border-pink-100",
    faqIcon: "bg-pink-100 text-flo-600",
    faqItem: "bg-[#fffbf9] border-pink-100 open:border-flo-300 open:ring-flo-200",
    faqPlus: "text-flo-500"
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Detailed Content Pillars */}
          <div className="space-y-6 text-gray-800 leading-relaxed">
            {pageData.content && pageData.content.map((sec, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-pink-100/90 p-6 sm:p-8 shadow-xs space-y-4">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-3">
                  <CheckCircle2 className={`w-6 h-6 ${accentClasses.check} shrink-0`} />
                  <span>{sec.heading}</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed pl-9">
                  {sec.body}
                </p>

                {/* Section Checklist Bullets */}
                {sec.bullets && sec.bullets.length > 0 && (
                  <div className="mt-3 pl-9">
                    <div className={`${accentClasses.bulletCard} border rounded-2xl p-4 sm:p-5 space-y-2.5`}>
                      <h4 className={`text-xs font-black uppercase tracking-wider ${accentClasses.bulletTitle}`}>
                        Key Standards & Fact Checklist
                      </h4>
                      <ul className="space-y-2">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-snug">
                            <Check className={`w-4 h-4 ${accentClasses.check} shrink-0 mt-0.5`} />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Frequently Asked Questions */}
          {pageData.faqs && pageData.faqs.length > 0 && (
            <div className={`bg-white rounded-3xl border ${accentClasses.faqBox} p-6 sm:p-8 shadow-xs space-y-6`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl ${accentClasses.faqIcon} flex items-center justify-center font-black text-lg`}>
                  ?
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900">
                    Frequently Asked Questions
                  </h3>
                  <p className="text-xs text-gray-500">
                    Clear answers to common questions regarding {pageData.title}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {pageData.faqs.map((faq, fIdx) => (
                  <details
                    key={fIdx}
                    className={`group rounded-2xl border ${accentClasses.faqItem} p-5 open:ring-1 transition-all`}
                  >
                    <summary className="flex items-center justify-between font-bold text-gray-900 cursor-pointer list-none select-none text-sm sm:text-base">
                      <span className="pr-4">{faq.question}</span>
                      <span className={`${accentClasses.faqPlus} text-lg font-black group-open:rotate-45 transition-transform shrink-0`}>
                        +
                      </span>
                    </summary>
                    <div className="mt-3 text-xs sm:text-sm text-gray-600 leading-relaxed pt-3 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Sidebar: Explore Platform & Cycle Calculator Promo */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">
              EXPLORE ABOUT TOPICS
            </h3>
            <div className="space-y-1.5">
              {otherPages && otherPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/about/${p.slug}`}
                  className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-pink-50/70 text-xs font-bold text-gray-700 hover:text-flo-600 transition-colors"
                >
                  <span className="truncate">{p.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white space-y-3 shadow-md shadow-pink-200">
            <div className="text-xs font-bold uppercase tracking-wider text-pink-100">
              Free Web Tools
            </div>
            <h4 className="text-lg font-black leading-snug">
              Calculate Your Cycle & Ovulation Window
            </h4>
            <p className="text-xs text-white/90 leading-relaxed">
              Use our private in-browser calculators to predict your fertile days and period timeline in seconds.
            </p>
            <Link
              href="/cycle-tools"
              className="inline-block w-full py-2.5 px-4 rounded-full bg-white text-gray-900 font-bold text-center text-xs hover:bg-gray-50 transition-colors shadow-xs"
            >
              Open Cycle Tools &rarr;
            </Link>
          </div>
        </aside>

      </div>
    </section>
  );
}

/* =========================================================================
   1. SCIENCE & RESEARCH VIEW (Warm Peach/Apricot Theme)
   ========================================================================= */
function ScienceAndResearchView({ pageData, otherPages }) {
  return (
    <div>
      {/* Flo Warm Peach Hero Section */}
      <section className="bg-gradient-to-b from-[#fef0e7] via-[#fff6f0] to-[#fffbf9] pt-10 sm:pt-14 pb-16 border-b border-orange-100/60 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-8 flex-wrap">
            <Link href="/" className="hover:text-flo-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">ABOUT</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-800 font-bold">Science & Research</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-block text-[#0f766e] text-xs sm:text-sm font-bold uppercase tracking-wider">
                Advancing female health
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-[1.15]">
                Science and research at Period Tracker
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                On a global level, female health has historically lacked personalized research. That’s why we built Period Tracker around user empowerment: combining smart predictive algorithms, AI health reports, and time-tested Ayurvedic remedies to give women full ownership of their reproductive well-being.
              </p>

              {/* Official Store Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg className="w-6 h-6 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.08 1.74-.95 2.77 1.01.08 2.05-.51 2.68-1.27z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase font-medium leading-none text-gray-300">Download on the</div>
                    <div className="text-sm font-bold leading-tight font-sans tracking-tight">App Store</div>
                  </div>
                </a>

                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white shadow-sm transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2c-.3-.3-.6-.8-.6-1.4V3.2c0-.6.3-1.1.6-1.4z"/>
                    <path fill="#FBBC05" d="M17.3 8.5L5.1.7C4.6.4 4.1.3 3.6 1.8l10.2 10.2 3.5-3.5z"/>
                    <path fill="#34A853" d="M17.3 15.5l-3.5-3.5L3.6 22.2c.5.5 1 .3 1.5.1l12.2-6.8z"/>
                    <path fill="#EA4335" d="M20.9 10.5l-3.6-2-3.5 3.5 3.5 3.5 3.6-2c.9-.5.9-1.5 0-2z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[9px] uppercase font-medium leading-none text-gray-300">GET IT ON</div>
                    <div className="text-sm font-bold leading-tight font-sans tracking-tight">Google Play</div>
                  </div>
                </a>
              </div>

              {/* Flo-Style Handwritten Annotation matching Reference Screenshot */}
              <div className="pt-2 text-teal-800 text-xs font-semibold flex items-center gap-1.5">
                <span className="text-base font-bold text-teal-600">⤹</span>
                <span>Join 500,000+ women already using Period Tracker. It's 100% free to join</span>
              </div>
            </div>

            {/* Right Column: Serene Female Wellness Visual & Cycle Mockup matching media_1789623136969.png */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Organic Circular Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/50 via-pink-200/40 to-purple-200/40 rounded-full blur-2xl transform scale-95 -z-0" />
                
                {/* Serene Female Wellness Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <div className="relative w-full h-64 sm:h-72">
                    <Image
                      src="/images/about/female_yoga_wellness.jpg"
                      alt="Woman in peaceful meditation tracking cycle health"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>

                  {/* Cycle Status Floating Card */}
                  <div className="p-4 bg-white/95 backdrop-blur-md flex items-center justify-between border-t border-orange-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-flo-50 text-flo-600 flex items-center justify-center font-bold text-xs">
                        🌸
                      </div>
                      <div>
                        <div className="text-xs font-black text-gray-900">Daily Cycle Insight</div>
                        <div className="text-[11px] text-gray-500">Day 14 • High Fertility Window</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                      Predictive AI
                    </span>
                  </div>
                </div>

                {/* Flo-style Floating Circular Badge */}
                <div className="absolute -bottom-3 -left-3 bg-white px-3.5 py-1.5 rounded-full shadow-lg border border-pink-100 text-xs font-bold text-gray-800 flex items-center gap-1.5 z-10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cycle & Ovulation Modeling</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Female Health Circular Showcase & Flo-Style Overlapping Stats matching media_1789623136969.png */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-pink-50/20 to-white border-b border-pink-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-flo-700 text-xs font-bold">
              <span>Empowering Every Woman</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Designed for Women, Grounded in Real Science
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Our team is committed to finding new ways to support groundbreaking app features and addressing the gaps in female health science.
            </p>
          </div>

          {/* 1. 4 Circular Female Cards with Real Women Photos, Pastel Rings & Floating Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Circle 1: AI-Driven Science */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-4">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-rose-200 ring-4 ring-rose-50 shadow-md group-hover:scale-105 transition-transform duration-300 relative bg-rose-50">
                  <Image
                    src="/images/about/female_avatar_ai.jpg"
                    alt="Young woman smiling using AI cycle mobile app"
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI Smart Reports</span>
                </div>
              </div>
              <h3 className="text-base font-black text-gray-900 mt-2">AI-Driven Insights</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                Smart mathematical pattern analysis for rolling cycle shifts
              </p>
            </div>

            {/* Circle 2: 100% Private Data */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-4">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-emerald-200 ring-4 ring-emerald-50 shadow-md group-hover:scale-105 transition-transform duration-300 relative bg-emerald-50">
                  <Image
                    src="/images/about/female_avatar_privacy.jpg"
                    alt="Woman in peaceful morning routine with complete privacy"
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>100% In-Device</span>
                </div>
              </div>
              <h3 className="text-base font-black text-gray-900 mt-2">Private & Confidential</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                Your intimate cycle records never leave your local mobile sandbox
              </p>
            </div>

            {/* Circle 3: Ayurveda Herbal Care */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-4">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-amber-200 ring-4 ring-amber-50 shadow-md group-hover:scale-105 transition-transform duration-300 relative bg-amber-50">
                  <Image
                    src="/images/about/ayurvedic_herbal_hero.jpg"
                    alt="Authentic Ayurvedic herbal remedies and soothing teas"
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  <span>Ayurveda Care</span>
                </div>
              </div>
              <h3 className="text-base font-black text-gray-900 mt-2">Natural Herbal Relief</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                Ancient herbal infusions & dietary remedies for menstrual cramp comfort
              </p>
            </div>

            {/* Circle 4: 500K+ Happy Users */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-4">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-purple-200 ring-4 ring-purple-50 shadow-md group-hover:scale-105 transition-transform duration-300 relative bg-purple-50">
                  <Image
                    src="/images/about/female_avatar_community.jpg"
                    alt="Diverse smiling woman part of global female health community"
                    fill
                    className="object-cover"
                    sizes="144px"
                  />
                </div>
                <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2.5 py-1 rounded-full bg-purple-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>500K+ Women</span>
                </div>
              </div>
              <h3 className="text-base font-black text-gray-900 mt-2">Global Community</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                Trusted by hundreds of thousands of women across 140+ countries
              </p>
            </div>

          </div>

          {/* 2. Flo-Style Highlights & Overlapping Circular Stats (matching media_1789623136969.png bottom) */}
          <div className="pt-10 border-t border-pink-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Authentic Copy with Peach Highlighted Pills */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 leading-relaxed font-normal">
                  In the Period Tracker app, you'll find the lowdown on what to expect{' '}
                  <span className="bg-[#ffe4d6] text-gray-950 px-2 py-0.5 rounded font-medium">cycle by cycle</span>.
                  {' '}Plus a{' '}
                  <span className="bg-[#ffe4d6] text-gray-950 px-2 py-0.5 rounded font-medium">smart AI health report</span>{' '}
                  and all the{' '}
                  <span className="bg-[#ffe4d6] text-gray-950 px-2 py-0.5 rounded font-medium">Ayurvedic natural remedies you need</span>{' '}
                  — whether you're wondering about fertile days or why you might be experiencing a certain symptom.
                </p>

                <div className="pt-2">
                  <Link
                    href="/calculators"
                    className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-950 group transition-colors"
                  >
                    <span className="underline decoration-teal-400 group-hover:decoration-teal-600">
                      Explore our full suite of 8 cycle tools
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Staggered Overlapping Circular Stats matching Screenshot */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end items-center">
                <div className="relative flex items-center">
                  
                  {/* Circle 1: Soft Lavender Circle */}
                  <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#f3ebf8] flex flex-col items-center justify-center p-6 text-center shadow-md border border-purple-100 relative z-10">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                      88%
                    </span>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium mt-2 leading-snug">
                      of users felt more educated about their cycle & hormones
                    </span>
                  </div>

                  {/* Circle 2: Soft Mint / Sage Circle (Overlapping & Staggered) */}
                  <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-[#d7ece6] flex flex-col items-center justify-center p-6 text-center shadow-lg border border-teal-100 -ml-10 sm:-ml-14 -mt-6 sm:-mt-8 relative z-20">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                      1 in 3
                    </span>
                    <span className="text-xs sm:text-sm text-gray-700 font-medium mt-2 leading-snug">
                      discovered irregular cycle patterns early with our AI tools
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <DetailedContentAndFaqs pageData={pageData} otherPages={otherPages} accentColor="orange" />

      {/* Custom Mission Banner matching Reference Screenshot with Nigerian Woman Portrait */}
      <section className="w-full py-16 sm:py-20 bg-gradient-to-r from-[#fff3eb] via-[#fdeaf2] to-[#edf0fa] border-y border-pink-100/70 overflow-hidden my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Authentic Portrait with Circular Orbit Rings */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[10px] border-orange-200/50 -z-0 animate-pulse" />
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-xl border-4 border-white z-10 bg-orange-50">
                  <Image
                    src="/images/about/science-mission.jpg"
                    alt="Nigerian woman accessing mobile reproductive science"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 224px, 288px"
                  />
                </div>
                <div className="absolute -bottom-2 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-orange-200 text-xs font-bold text-gray-800 flex items-center gap-1.5 z-20">
                  <Globe2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>140+ Countries</span>
                </div>
              </div>
            </div>

            {/* Right Column: Mission Text & Store CTAs */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                Closing the global divide in female health science
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-2xl">
                Historically, women’s reproductive studies were concentrated in narrow geographic regions. Period Tracker delivers free, localized cycle tools and predictive health models to women and families across Nigeria, Africa, and communities worldwide.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-gray-900 text-white font-bold text-xs shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Download on App Store</span>
                </a>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black hover:bg-gray-900 text-white font-bold text-xs shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Get on Google Play</span>
                </a>
                <Link
                  href="/calculators"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-800 hover:text-teal-900 group transition-colors ml-1"
                >
                  <span className="underline decoration-teal-400 group-hover:decoration-teal-600">
                    Explore Cycle Tools
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   2. AI HEALTH REPORTS VIEW (Violet/Indigo High-Tech AI Aesthetic)
   ========================================================================= */
function AiReportsView({ pageData, otherPages }) {
  return (
    <div className="space-y-12">
      {/* AI Hero Banner */}
      <section className="bg-gradient-to-b from-purple-100/70 via-pink-50/40 to-[#fffbf9] pt-10 sm:pt-14 pb-14 border-b border-purple-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex-wrap">
            <Link href="/" className="hover:text-flo-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">ABOUT</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-800 font-bold">AI Health Reports</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold">
                <Brain className="w-4 h-4 text-purple-600" />
                <span>Intelligent Cycle Diagnostics</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                AI-Generated Health Reports for Your Cycle
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
                When you log your period days, cramp intensity, and body signals, our in-app AI synthesizes the patterns into comprehensive digital health reports. Spot irregularities, track rolling averages, and stay in sync with your rhythm.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Generate Report on iOS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                >
                  <span>Get on Android</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* AI Report Card Preview Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-purple-200 shadow-xl shadow-purple-900/10 space-y-4">
                <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 block">AI Cycle Report</span>
                      <span className="text-[10px] text-gray-400 block">Generated via On-Device AI</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active Cycle
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 bg-purple-50/50 rounded-2xl border border-purple-100">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Predicted Length</span>
                    <span className="text-lg font-black text-gray-900 mt-0.5 block">28 Days</span>
                  </div>
                  <div className="p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
                    <span className="text-[10px] text-gray-400 font-bold block uppercase">Ovulation Surge</span>
                    <span className="text-lg font-black text-flo-600 mt-0.5 block">Day 14 (Peak)</span>
                  </div>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-600 space-y-1.5">
                  <strong className="text-gray-900 block text-xs">AI Pattern Insight:</strong>
                  <p className="leading-relaxed">
                    "Mild cramps observed on Days 1–2. Energy peak recorded on Day 12. Late luteal phase progesterone dip expected in 4 days. Keep hydrated with herbal tea."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Deep Dive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-black">
              1
            </div>
            <h3 className="text-lg font-bold text-gray-900">User Cycle Logging</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Log period starts, flow heaviness, and symptoms with a few quick taps. The app stores all logs securely on your phone.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-flo-600 flex items-center justify-center font-black">
              2
            </div>
            <h3 className="text-lg font-bold text-gray-900">AI Pattern Recognition</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              The AI detects rolling cycle shifts, fertile windows, and PMS trends over 3, 6, and 12 months with high mathematical accuracy.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              3
            </div>
            <h3 className="text-lg font-bold text-gray-900">Personalized Health Reports</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Export digital summary reports and review your menstrual statistics anytime without third-party data harvesting.
            </p>
          </div>
        </div>
      </section>

            <DetailedContentAndFaqs pageData={pageData} otherPages={otherPages} accentColor="purple" />

      {/* Full Left-Side Split Banner with Original Nigerian Woman (media_1789622616289.png style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 min-h-[480px]">
          
          {/* Full Left-Side Edge-to-Edge Image of Authentic Nigerian Woman */}
          <div className="md:col-span-1 lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] md:min-h-full">
            <Image
              src="/images/about/nigerian-woman-phone-banner.jpg"
              alt="Authentic smiling Nigerian woman using cycle mobile app"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Side: Rich Deep Violet/Plum Panel */}
          <div className="md:col-span-1 lg:col-span-6 bg-[#2a1340] p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-left">
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Personalized AI cycle intelligence in every woman’s hands.
              </h2>

              <div className="pt-1">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-all shadow-md"
                >
                  Generate Your AI Health Report
                </a>
              </div>

              {/* Direct App Store & Play Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  <span>Download on App Store</span>
                </a>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  <span>Get on Google Play</span>
                </a>
              </div>
            </div>

            {/* Testimonial Quote Block */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-normal italic">
                “Generating my monthly AI cycle report before visiting my practitioner made everything so simple. It organized all my cramps, energy shifts, and PMS patterns into one easy-to-read summary.”
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/60 shrink-0 bg-white/20">
                  <Image
                    src="/images/about/user-avatar-2.jpg"
                    alt="Folake O."
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-xs sm:text-sm leading-tight">
                    Folake O., Lagos, Nigeria
                  </div>
                  <div className="text-white/75 text-[11px] sm:text-xs">
                    AI Cycle Reports user
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   3. AYURVEDA CARE VIEW (Lush Botanical Emerald & Natural Remedies)
   ========================================================================= */
function AyurvedaCareView({ pageData, otherPages }) {
  const remedies = [
    {
      title: "Ginger & Sesame Warm Infusion",
      benefit: "Soothes acute uterine cramping & eases pelvic contraction",
      timing: "Menstrual Phase (Days 1–3)",
      ingredient: "Fresh ginger, warm water, pure sesame oil droplets"
    },
    {
      title: "Ajwain & Cumin Roasted Water",
      benefit: "Relieves abdominal bloating, gas & water retention",
      timing: "Pre-Menstrual & Luteal Phase",
      ingredient: "Roasted ajwain seeds, jeera (cumin), warm water"
    },
    {
      title: "Chamomile & Shatavari Calming Tea",
      benefit: "Balances Pitta dosha, calms mood swings & supports restorative sleep",
      timing: "Late Luteal Phase",
      ingredient: "Chamomile blossoms, organic shatavari root powder"
    },
    {
      title: "Golden Turmeric & Nutmeg Elixir",
      benefit: "Deep pelvic relaxation, anti-inflammatory relief & nervous calm",
      timing: "Bedtime during period days",
      ingredient: "Turmeric, pinch of nutmeg, warm almond or cow's milk"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Botanical Herbal Hero Banner */}
      <section className="bg-gradient-to-b from-emerald-100/60 via-teal-50/30 to-[#fffbf9] pt-10 sm:pt-14 pb-14 border-b border-emerald-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex-wrap">
            <Link href="/" className="hover:text-flo-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">ABOUT</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-800 font-bold">Ayurveda Care</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <Flower2 className="w-4 h-4 text-emerald-600" />
                <span>Ancient Wisdom for Cycle Harmony</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Ayurveda & Natural Home Remedies Module
              </h1>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                In Ayurveda, the menstrual cycle is a sacred monthly renewal. Our dedicated in-app module brings you natural home remedies, cycle-synced nutrition, and herbal teas to comfort cramps and harmonize hormones naturally.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-2xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-colors"
                >
                  Download on iOS
                </a>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-2xl bg-black text-white font-bold text-xs hover:bg-gray-800 transition-colors"
                >
                  Get on Android
                </a>
              </div>
            </div>

            {/* Right Column: Circular Female Wellness Botanical Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-emerald-200 ring-8 ring-emerald-50 shadow-xl relative bg-emerald-50">
                  <Image
                    src="/images/about/ayurvedic_herbal_hero.jpg"
                    alt="Authentic Ayurvedic herbal tea, healing botanicals and natural spices"
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>
                <div className="absolute -bottom-3 inset-x-0 mx-auto w-max px-4 py-1.5 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Dosha & Herbal Care</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Remedies Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900">Featured In-App Ayurvedic Remedies</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Proven herbal kitchen remedies accessible right inside your mobile app
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {remedies.map((rem, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-100 shadow-xs hover:shadow-md transition-shadow space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {rem.timing}
                </span>
                <Leaf className="w-4 h-4 text-emerald-500" />
              </div>

              <h3 className="text-lg font-bold text-gray-900">{rem.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{rem.benefit}</p>
              
              <div className="pt-2 border-t border-emerald-50 text-[11px] text-gray-400 font-medium">
                <strong className="text-gray-600">Key Ingredients:</strong> {rem.ingredient}
              </div>
            </div>
          ))}
        </div>
      </section>

            <DetailedContentAndFaqs pageData={pageData} otherPages={otherPages} accentColor="emerald" />

      {/* Full Left-Side Split Banner for Ayurveda & Period Cramp Relief (media_1789622616289.png style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 min-h-[480px]">
          
          {/* Full Left-Side Edge-to-Edge Image of Period Cramp Comfort & Warm Tea */}
          <div className="md:col-span-1 lg:col-span-6 relative min-h-[340px] sm:min-h-[420px] md:min-h-full">
            <Image
              src="/images/about/period-cramps-tea.jpg"
              alt="Woman holding warm soothing tea for natural menstrual cramp relief"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right Side: Deep Warm Terracotta Panel */}
          <div className="md:col-span-1 lg:col-span-6 bg-[#48211b] p-8 sm:p-12 lg:p-14 flex flex-col justify-between text-left">
            <div className="space-y-5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight">
                Gentle, natural herbal relief for menstrual discomfort.
              </h2>

              <div className="pt-1">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-white text-gray-900 font-bold text-sm hover:bg-gray-100 transition-all shadow-md"
                >
                  Explore Ayurvedic Remedies
                </a>
              </div>

              {/* Direct App Store & Play Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  <span>Download on App Store</span>
                </a>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 text-white font-semibold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  <span>Get on Google Play</span>
                </a>
              </div>
            </div>

            {/* Testimonial Quote Block */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/95 text-xs sm:text-sm leading-relaxed font-normal italic">
                “Drinking the warm ginger-ajwain herbal infusion on Day 1 completely eased my acute menstrual cramps naturally. I love having authentic holistic remedies right alongside my cycle tracker.”
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/60 shrink-0 bg-white/20">
                  <Image
                    src="/images/about/user-avatar-3.jpg"
                    alt="Sunita P."
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-xs sm:text-sm leading-tight">
                    Sunita P., India
                  </div>
                  <div className="text-white/75 text-[11px] sm:text-xs">
                    Natural Cycle Care user
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   4. PRIVACY PORTAL VIEW (Trustworthy Emerald & Navy Security Aesthetic)
   ========================================================================= */
function PrivacyPortalView({ pageData, otherPages }) {
  return (
    <div className="space-y-12">
      {/* Privacy Hero */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-10 sm:pt-14 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-6 flex-wrap">
            <Link href="/" className="hover:text-flo-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-gray-400">ABOUT</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-white font-bold">Privacy Portal</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Lock className="w-3.5 h-3.5" />
              <span>100% In-Device Data Protection</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Your cycle data belongs strictly to you. Period.
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Unlike typical period tracking apps that harvest intimate dates for advertising brokers, our calculations happen locally on your device. We have zero access to your cycle records.
            </p>
          </div>

        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-7 border border-pink-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">End-to-End Encryption</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Your period logs and sensitive test entries are protected by private encryption. They are never sold to ad brokers or marketing networks.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-pink-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Anonymous Web Tools</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              No account, email, or telephone number is ever required to use our ovulation calculators, due date tools, or read our health library.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-pink-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Zero Advertising Brokers</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              We never sell or monetize sensitive reproductive health metrics. Your bodily data remains completely confidential.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-pink-100 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">One-Tap Data Erasure</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Want to reset your cycle history? Wipe your records anytime with a single tap in the app settings, or close your browser tab.
            </p>
          </div>
        </div>
      </section>

            <DetailedContentAndFaqs pageData={pageData} otherPages={otherPages} accentColor="teal" />

      {/* Direct Clean Rectangular Image Section (Zero circular frames, clean modern photography) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Direct Clean Rectangular Photo (No circle, no pulse rings) */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/about/black-woman-mobile.jpg"
                alt="Confident modern woman using private cycle tracker on mobile"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Clean Assurance & Action Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>100% In-Device Data Protection</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Your body, your cycle, your private sanctuary
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Your reproductive logs and intimacy timeline are strictly personal. We guarantee that your period records and pregnancy calculations remain saved on your own device—never sold to advertisers, never stored on external cloud brokers.
            </p>

            <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100 text-xs text-teal-900 leading-relaxed italic">
              “Knowing my daily cycle logs never leave my phone gives me the ultimate peace of mind. True reproductive privacy done right.”
              <span className="block mt-1 font-bold text-teal-950 not-italic">— Elena K., Privacy Advocate & User</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={APP_LINKS.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Download on App Store</span>
              </a>
              <a
                href={APP_LINKS.android}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Get on Google Play</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   5. CONTACT VIEW (Clean Customer Support Hub & Real Interactive Feedback Form)
   ========================================================================= */
function ContactView({ pageData, otherPages }) {
  return (
    <div className="space-y-12">
      {/* Contact Hero Banner - Clean & Inviting */}
      <section className="bg-gradient-to-b from-pink-50/70 via-white to-[#fffbf9] pt-10 sm:pt-14 pb-14 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex-wrap">
            <Link href="/" className="hover:text-flo-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500">ABOUT</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-800 font-bold">Contact & Support</span>
          </nav>

          <div className="max-w-2xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-flo-700 text-xs font-bold">
              <Mail className="w-3.5 h-3.5" />
              <span>We're Here to Help</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Contact & Community Support
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Have questions about your cycle predictions, suggestions for new Ayurvedic remedies, or need assistance with the app? Our team is always ready to listen.
            </p>
          </div>

        </div>
      </section>

      {/* Contact Channels & Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Support Cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-flo-50 text-flo-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Direct Email Inquiries</h3>
              <p className="text-xs text-gray-500">
                Reach our app support team directly for assistance:
              </p>
              <a href="mailto:support@tracewave.period" className="text-xs font-bold text-flo-600 hover:underline block pt-1">
                support@tracewave.period
              </a>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-base">Feature & Remedy Requests</h3>
              <p className="text-xs text-gray-500">
                Want to see a specific home remedy or cycle feature? Let us know and we'll add it in upcoming app releases.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-xs space-y-3">
              <h3 className="font-bold text-gray-900 text-sm">Download Mobile App</h3>
              <div className="flex gap-2">
                <a
                  href={APP_LINKS.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-black text-white text-xs font-bold text-center hover:bg-gray-800 transition-colors"
                >
                  iOS App Store
                </a>
                <a
                  href={APP_LINKS.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-black text-white text-xs font-bold text-center hover:bg-gray-800 transition-colors"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: In-Page Feedback Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-pink-100 shadow-sm">
            <ContactForm />
          </div>

        </div>
      </section>

            <DetailedContentAndFaqs pageData={pageData} otherPages={otherPages} accentColor="rose" />

      {/* Direct Clean Rectangular Image Section for Community & Support */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 sm:my-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-rose-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Direct Clean Rectangular Photo (No circle, no pulse rings) */}
          <div className="lg:col-span-5">
            <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/about/contact-mission.jpg"
                alt="Friendly community specialist ready to assist you"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Supportive Narrative & Action Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              <Heart className="w-4 h-4 text-flo-500 fill-flo-500" />
              <span>Dedicated 24/7 Community Care</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              A supportive global sisterhood, wherever you live
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Have questions about our cycle algorithms, suggestions for new Ayurvedic home remedies, or need help managing your mobile subscription? Our support team and global community creators are always here to listen and help you thrive.
            </p>

            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 text-xs text-rose-900 leading-relaxed italic">
              “Whenever I had a question about migrating my cycle data to my new phone, the support team answered within hours. Real support for real women.”
              <span className="block mt-1 font-bold text-rose-950 not-italic">— Maria L., Community Member</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={APP_LINKS.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Download on App Store</span>
              </a>
              <a
                href={APP_LINKS.android}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-gray-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                <span>Get on Google Play</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CALCULATORS } from '../../../data/calculators';
import { CALCULATOR_ARTICLES } from '../../../data/calculatorArticles';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PeriodCalculator from '../../../components/PeriodCalculator';
import DueDateCalculator from '../../../components/DueDateCalculator';
import HcgCalculator from '../../../components/calculators/HcgCalculator';
import ImplantationCalculator from '../../../components/calculators/ImplantationCalculator';
import PregnancyTestCalculator from '../../../components/calculators/PregnancyTestCalculator';
import WeeksToMonthsCalculator from '../../../components/calculators/WeeksToMonthsCalculator';

import { APP_LINKS } from '../../../data/appLinks';
import { 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Activity, 
  HelpCircle,
  ArrowRight,
  BookOpen,
  Smartphone
} from 'lucide-react';

import { clampTitle, clampDescription, clampKeywords } from '../../../utils/seo';
import BottomLinkingHub from '../../../components/BottomLinkingHub';

export function generateStaticParams() {
  return CALCULATORS.map((calc) => ({
    slug: calc.slug,
  }));
}

export function generateMetadata({ params }) {
  const calc = CALCULATORS.find((c) => c.slug === params.slug);
  if (!calc) {
    return {
      title: 'Calculator Not Found',
    };
  }

  const rawTitle = calc.seoTitle || `${calc.name} - Free Online Tool`;
  const rawDesc = calc.seoDescription || calc.description || calc.summary;
  const safeTitle = clampTitle(rawTitle, 'Period Tracker', 60);
  const safeDesc = clampDescription(rawDesc, 158);
  const safeKeywords = clampKeywords(calc.keywords || [calc.name, 'period tracker', 'fertility calculator'], 6);

  return {
    title: safeTitle,
    description: safeDesc,
    keywords: safeKeywords,
    alternates: {
      canonical: `https://trackperiods.com/calculators/${calc.slug}`,
    },
    openGraph: {
      title: safeTitle,
      description: safeDesc,
      url: `https://trackperiods.com/calculators/${calc.slug}`,
      type: 'website',
      images: [
        {
          url: 'https://trackperiods.com/brand-logo-final.png',
          width: 1200,
          height: 630,
          alt: safeTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDesc,
      images: ['https://trackperiods.com/brand-logo-final.png'],
    },
  };
}

function renderFormattedText(text) {
  if (typeof text !== 'string') return text;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const anchor = match[1];
    const url = match[2];
    const isExternal = url.startsWith('http') && !url.includes('trackperiods.com');
    parts.push(
      isExternal ? (
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-flo-600 hover:text-flo-700 font-semibold underline decoration-pink-300 underline-offset-2 hover:decoration-flo-500 transition-colors"
        >
          {anchor}
        </a>
      ) : (
        <Link
          key={match.index}
          href={url}
          className="text-flo-600 hover:text-flo-700 font-semibold underline decoration-pink-300 underline-offset-2 hover:decoration-flo-500 transition-colors"
        >
          {anchor}
        </Link>
      )
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function CalculatorDetailPage({ params }) {
  const { slug } = params;
  const calc = CALCULATORS.find((c) => c.slug === slug);

  if (!calc) {
    notFound();
  }

  const articleData = CALCULATOR_ARTICLES[slug];

  // Render matching interactive calculator component
  const renderCalculatorComponent = () => {
    switch (slug) {
      case 'hcg-calculator':
        return <HcgCalculator />;
      case 'ovulation-calculator':
      case 'period-calculator':
      case 'menstrual-cycle-calculator':
        return <PeriodCalculator />;
      case 'pregnancy-due-date-calculator':
        return <DueDateCalculator />;
      case 'implantation-calculator':
        return <ImplantationCalculator />;
      case 'pregnancy-test-calculator':
        return <PregnancyTestCalculator />;
      case 'pregnancy-weeks-to-months-calculator':
        return <WeeksToMonthsCalculator />;
      default:
        return <PeriodCalculator />;
    }
  };

  const otherCalculators = CALCULATORS.filter((c) => c.slug !== slug);

  const faqSection = articleData?.sections?.find(s => s.id === 'expert-faqs');
  const faqItems = faqSection?.paragraphs?.map(p => {
    const qIndex = p.indexOf('?');
    if (qIndex !== -1) {
      return {
        '@type': 'Question',
        name: p.substring(0, qIndex + 1).trim(),
        acceptedAnswer: {
          '@type': 'Answer',
          text: p.substring(qIndex + 1).trim(),
        },
      };
    }
    return null;
  }).filter(Boolean) || [];

  const faqJsonLd = faqItems.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems,
  } : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://trackperiods.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: 'https://trackperiods.com/calculators',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calc.shortTitle || calc.name,
        item: `https://trackperiods.com/calculators/${calc.slug}`,
      },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.name,
    description: calc.seoDescription || calc.description || calc.summary,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    url: `https://trackperiods.com/calculators/${calc.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff9fb]">
      <Navbar />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        {/* Flo.health Top Banner matching screenshot */}
        <section className="bg-gradient-to-b from-flo-100/70 via-pink-50/40 to-[#fff9fb] pt-8 pb-12 border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb matching user's screenshot: Home > WELLNESS HUB > TOOLS > [TOOL NAME] */}
            <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex-wrap">
              <Link href="/" className="hover:text-flo-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link href="/calculators" className="hover:text-flo-600 transition-colors">
                TOOLS
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-800 font-bold truncate">
                {calc.breadcrumb}
              </span>
            </nav>

            {/* Main Title matching screenshot */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight max-w-4xl">
              {calc.shortTitle} &amp; Early Health Charts
            </h1>

            {/* Subheading / Description matching screenshot */}
            <p className="mt-4 text-gray-700 leading-relaxed max-w-3xl">
              {calc.summary}
            </p>

            {/* Tool Byline */}
            <div className="mt-6 pt-6 border-t border-pink-200/70 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span className="text-sm text-gray-500">
                Updated &nbsp; <strong className="text-gray-800">{calc.updatedDate}</strong>
              </span>
              <span>•</span>
              <span className="text-sm text-flo-600 font-semibold">
                Smart Predictive Cycle Tool
              </span>
              <span>•</span>
              <span className="text-sm text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                Medically Verified Guide
              </span>
            </div>

          </div>
        </section>

        {/* Interactive Calculator Section - Full container width to ensure unbreakable, spacious layout */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="calculator-tool" className="scroll-mt-28">
              {renderCalculatorComponent()}
            </div>
          </div>
        </section>

        {/* Guide & Sidebar Grid */}
        <section className="py-12 border-t border-pink-100 bg-white/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Detailed Medical Guide Section (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-10">
                
                {articleData && articleData.sections ? (
                  <div className="space-y-12 text-gray-800 leading-relaxed">
                    
                    {/* Article Header Banner */}
                    <div className="p-6 rounded-3xl bg-flo-50/70 border border-pink-200/80 space-y-2">
                      <div className="flex items-center gap-2 text-flo-700 font-bold text-sm">
                        <BookOpen className="w-4 h-4 text-flo-600" />
                        <span>Clinical Guide & Medical Analysis</span>
                      </div>
                      <h2 className=" font-extrabold">
                        {articleData.title}
                      </h2>
                    </div>

                    {/* Render Each Point/Section with minimum 4 detailed paragraphs */}
                    {articleData.sections.map((sec) => (
                      <div key={sec.id} id={sec.id} className="scroll-mt-28 space-y-4">
                        <h2 className=" font-extrabold border-b border-pink-100 pb-3">
                          {sec.heading}
                        </h2>
                        
                        <div className="space-y-4">
                          {sec.paragraphs.map((para, pIdx) => (
                            <p key={pIdx} className=" text-gray-700 leading-relaxed bg-white p-5 sm:p-6 rounded-2xl border border-pink-100/80 shadow-2xs hover:border-pink-200 transition-colors"
                            >
                              {renderFormattedText(para)}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 text-gray-800 leading-relaxed">
                    <div id="overview" className="scroll-mt-28 space-y-3">
                      <h2 className=" font-extrabold">
                        Understanding How This Calculation Works
                      </h2>
                      <p className="text-gray-700 leading-relaxed">
                        Our calculator relies on reproductive biology models, cycle averages, and predictive algorithmic estimation. Menstrual cycle variations, LH hormone surges, and basal temperature shifts provide reliable benchmarks for predicting reproductive milestones.
                      </p>
                    </div>
                  </div>
                )}

                {/* Educational Disclaimer Box */}
                <div className="p-6 sm:p-7 rounded-3xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-2.5">
                  <h3 className="flex items-center gap-2 text-amber-950 uppercase">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                    <span>Educational Disclaimer</span>
                  </h3>
                  <p className="text-base">
                    This online calculator is an educational estimation tool based on average biological models. It is not a diagnostic device or a substitute for medical testing, clinical consultation, or pelvic ultrasound. Always consult your obstetrician or healthcare practitioner for personalized fertility management and prenatal care.
                  </p>
                </div>
              </div>

              {/* Right Column: Sticky Table of Contents & Other Calculators (lg:col-span-4) */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                
                {/* Dynamic Table of Contents */}
                <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-xs space-y-3">
                  <h5 className="uppercase tracking-widest text-gray-400">
                    IN THIS article
                  </h5>
                  <ul className="space-y-2 text-sm font-semibold">
                    <li>
                      <a href="#calculator-tool" className="text-flo-600 hover:underline block py-0.5">
                        • Interactive Calculator Widget
                      </a>
                    </li>
                    {articleData?.sections?.map((sec) => (
                      <li key={sec.id}>
                        <a href={`#${sec.id}`} className="text-gray-700 hover:text-flo-600 transition-colors block py-0.5 line-clamp-1">
                          • {sec.heading.replace(/^[0-9]+\.\s*/, '')}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct App Install Banner (Conversion Booster) */}
                <div className="bg-gradient-to-br from-[#FF3B70] to-[#E0265B] text-white rounded-3xl p-6 shadow-md space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                        Free Mobile App
                      </span>
                      <h4 className="text-white font-bold text-base mt-0.5">
                        Track Periods on Your Phone
                      </h4>
                    </div>
                  </div>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Save your cycle records, predict fertile windows, and get smart period alerts with 100% on-device private storage.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={APP_LINKS.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition shadow-sm"
                    >
                      <span>App Store</span>
                    </a>
                    <a
                      href={APP_LINKS.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-xs hover:bg-white/20 transition"
                    >
                      <span>Google Play</span>
                    </a>
                  </div>
                </div>

                {/* Other Calculators Switcher List */}
                <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-xs space-y-3">
                  <h5 className="uppercase tracking-widest text-gray-400">
                    MORE CALCULATORS
                  </h5>
                  <div className="space-y-1.5">
                    {otherCalculators.slice(0, 6).map((c) => (
                      <Link
                        key={c.slug}
                        href={`/calculators/${c.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-flo-50 text-xs font-bold text-gray-700 hover:text-flo-600 transition-colors"
                      >
                        <span className="truncate text-sm">{c.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-pink-50">
                    <Link
                      href="/calculators"
                      className="text-xs font-bold text-flo-600 hover:underline block text-center"
                    >
                      View all 8 reproductive tools &rarr;
                    </Link>
                  </div>
                </div>

              </aside>

            </div>
          </div>
        </section>

        {/* Bottom Contextual Link Juice Sculpting Hub */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <BottomLinkingHub 
            currentSlug={calc.slug} 
            cluster={
              calc.slug.includes('implantation') || calc.slug.includes('ovulation') ? 'fertility' :
              calc.slug.includes('hcg') || calc.slug.includes('pregnancy') || calc.slug.includes('due-date') || calc.slug.includes('months') ? 'pregnancy' :
              'cycle'
            } 
            pageType="calculator" 
          />
        </div>

      </main>

      <Footer />
    </div>
  );
}

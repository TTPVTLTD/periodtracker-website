import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CALCULATORS } from '../../../data/calculators';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PeriodCalculator from '../../../components/PeriodCalculator';
import DueDateCalculator from '../../../components/DueDateCalculator';
import HcgCalculator from '../../../components/calculators/HcgCalculator';
import ImplantationCalculator from '../../../components/calculators/ImplantationCalculator';
import PregnancyTestCalculator from '../../../components/calculators/PregnancyTestCalculator';
import WeeksToMonthsCalculator from '../../../components/calculators/WeeksToMonthsCalculator';

import { 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Sparkles, 
  Activity, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

import { clampTitle, clampDescription, clampKeywords } from '../../../utils/seo';

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
      canonical: `/calculators/${calc.slug}`,
    },
    openGraph: {
      title: safeTitle,
      description: safeDesc,
      url: `/calculators/${calc.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDesc,
    },
  };
}

export default function CalculatorDetailPage({ params }) {
  const { slug } = params;
  const calc = CALCULATORS.find((c) => c.slug === slug);

  if (!calc) {
    notFound();
  }

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.name,
    description: calc.description || calc.summary,
    applicationCategory: 'HealthApplication',
    operatingSystem: 'All',
    url: `https://periodtracker.online/calculators/${calc.slug}`,
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
        {/* Flo.health Top Banner matching screenshot */}
        <section className="bg-gradient-to-b from-flo-100/70 via-pink-50/40 to-[#fff9fb] pt-8 pb-12 border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb matching user's screenshot: Home > WELLNESS HUB > TOOLS > [TOOL NAME] */}
            <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex-wrap">
              <Link href="/" className="hover:text-flo-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link href="/wellness-hub" className="hover:text-flo-600 transition-colors">
                WELLNESS HUB
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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight max-w-4xl">
              {calc.shortTitle} & Early Health Charts
            </h1>

            {/* Subheading / Description matching screenshot */}
            <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl">
              {calc.summary}
            </p>

            {/* Tool Byline */}
            <div className="mt-6 pt-6 border-t border-pink-200/70 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span className="text-gray-500">
                Updated <strong className="text-gray-800">{calc.updatedDate}</strong>
              </span>
              <span>•</span>
              <span className="text-flo-600 font-semibold">
                Smart Predictive Cycle Tool
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
              
              {/* Left Column: Detailed Guide Section (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-10">
                <div className="space-y-6 text-gray-800 leading-relaxed">
                  <div id="overview" className="scroll-mt-28 space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                      Understanding How This Calculation Works
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Our calculator relies on reproductive biology models, cycle averages, and predictive algorithmic estimation. Menstrual cycle variations, LH hormone surges, and basal temperature shifts provide reliable benchmarks for predicting reproductive milestones.
                    </p>
                  </div>

                  <div id="accuracy" className="scroll-mt-28 space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                      When Are the Calculations Most Accurate?
                    </h2>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Calculations achieve peak reliability when tracked across 2 to 3 consecutive natural cycles. If you have recently discontinued hormonal contraception, experienced significant stress, or are managing conditions such as PCOS, standard timelines may exhibit natural variations.
                    </p>
                  </div>
                </div>

                {/* Educational Disclaimer Box */}
                <div className="p-6 sm:p-7 rounded-3xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-900 leading-relaxed space-y-2.5">
                  <h4 className="font-bold flex items-center gap-2 text-amber-950 uppercase tracking-wider text-xs">
                    <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                    <span>Educational Disclaimer</span>
                  </h4>
                  <p>
                    This online calculator is an educational estimation tool based on average biological models. It is not a diagnostic device or a substitute for medical testing, clinical consultation, or pelvic ultrasound. Always consult your obstetrician or healthcare practitioner for personalized fertility management and prenatal care.
                  </p>
                </div>
              </div>

              {/* Right Column: Sticky Table of Contents & Other Calculators (lg:col-span-4) */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                
                {/* Table of Contents */}
                <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">
                    IN THIS TOOL
                  </h3>
                  <ul className="space-y-2 text-sm font-semibold">
                    <li>
                      <a href="#calculator-tool" className="text-flo-600 hover:underline block py-0.5">
                        • Interactive Calculator Widget
                      </a>
                    </li>
                    <li>
                      <a href="#overview" className="text-gray-700 hover:text-flo-600 transition-colors block py-0.5">
                        • How the Calculation Works
                      </a>
                    </li>
                    <li>
                      <a href="#accuracy" className="text-gray-700 hover:text-flo-600 transition-colors block py-0.5">
                        • Accuracy & Biological Factors
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Other Calculators Switcher List */}
                <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-xs space-y-3">
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-400">
                    MORE CALCULATORS
                  </h3>
                  <div className="space-y-1.5">
                    {otherCalculators.slice(0, 6).map((c) => (
                      <Link
                        key={c.slug}
                        href={`/calculators/${c.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-flo-50 text-xs font-bold text-gray-700 hover:text-flo-600 transition-colors"
                      >
                        <span className="truncate">{c.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-pink-50">
                    <Link
                      href="/calculators"
                      className="text-xs font-bold text-flo-600 hover:underline block text-center"
                    >
                      View all reproductive tools &rarr;
                    </Link>
                  </div>
                </div>

              </aside>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

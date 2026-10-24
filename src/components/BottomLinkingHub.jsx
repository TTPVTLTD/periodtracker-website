import React from 'react';
import Link from 'next/link';
import { Calculator, BookOpen, Sparkles, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

export default function BottomLinkingHub({ 
  currentSlug = '', 
  cluster = 'fertility',
  pageType = 'calculator' 
}) {
  // Curated Cluster Link Matrix to sculpt PageRank across all 50+ pages
  const clusters = {
    fertility: {
      title: 'Conception, Ovulation & Implantation Authority Cluster',
      desc: 'Verify fertile windows, blastocyst implantation timing, and basal body temperature shifts.',
      tools: [
        { name: 'Implantation Calculator', href: '/calculators/implantation-calculator', tag: '6–12 DPO' },
        { name: 'Ovulation Calculator', href: '/calculators/ovulation-calculator', tag: 'Peak Fertility' },
        { name: 'Pregnancy Test Calculator', href: '/calculators/pregnancy-test-calculator', tag: '99% Accuracy' },
        { name: 'Beta hCG Calculator', href: '/calculators/hcg-calculator', tag: 'Doubling Math' },
      ],
      articles: [
        { title: '7 Clear Signs of Ovulation: Peak Fertility Guide', href: '/articles/ovulation-symptoms-signs-fertile-window-body-signals' },
        { title: 'Embryo Implantation Timeline & Symptoms Guide', href: '/articles/embryo-implantation-timeline-symptoms-calculator-guide' },
        { title: 'Implantation Bleeding vs Period: 7 Key Differences', href: '/articles/implantation-bleeding-vs-period-differences' },
        { title: 'How to Track BBT for Natural Conception (3-over-6 Rule)', href: '/articles/how-to-track-bbt-basal-body-temperature-conception' },
        { title: 'Implantation Cramps vs Period Cramps: Timing & Location', href: '/articles/implantation-cramps-vs-period-cramps-timing-location' },
        { title: 'When to Take a Pregnancy Test: 8 DPO to 14 DPO Timeline', href: '/articles/when-to-take-a-pregnancy-test-dpo-accuracy-calculator-timeline' },
      ]
    },
    pregnancy: {
      title: 'Early Pregnancy, hCG Velocity & Gestational Health',
      desc: 'Monitor beta hCG doubling velocities, pregnancy test timelines, and gestational week benchmarks.',
      tools: [
        { name: 'Beta hCG Doubling Calculator', href: '/calculators/hcg-calculator', tag: '48–72h Math' },
        { name: 'Pregnancy Test Calculator', href: '/calculators/pregnancy-test-calculator', tag: 'DPO Timing' },
        { name: 'Pregnancy Due Date Calculator', href: '/calculators/pregnancy-due-date-calculator', tag: 'LMP / EDD' },
        { name: 'Weeks to Months Calculator', href: '/calculators/pregnancy-weeks-to-months-calculator', tag: 'Trimesters' },
      ],
      articles: [
        { title: 'hCG Levels Chart by Week & Doubling Time Guide', href: '/articles/hcg-levels-chart-by-week-doubling-time-calculator-guide' },
        { title: 'When to Take a Pregnancy Test: DPO Accuracy & Timing', href: '/articles/when-to-take-a-pregnancy-test-dpo-accuracy-calculator-timeline' },
        { title: 'Early Signs of Pregnancy vs PMS: Complete Comparison', href: '/articles/early-signs-of-pregnancy-vs-pms-complete-comparison' },
        { title: 'Early Pregnancy Symptoms Before Missed Period', href: '/articles/early-pregnancy-symptoms-before-missed-period' },
        { title: 'Embryo Implantation Timeline: Symptoms, DPO & Calculator', href: '/articles/embryo-implantation-timeline-symptoms-calculator-guide' },
      ]
    },
    cycle: {
      title: 'Menstrual Cycle Health, Safe Days & Flow Diagnostics',
      desc: 'Understand menstrual blood clot dimensions, natural family planning safe days, and cycle lengths.',
      tools: [
        { name: 'Period Date Calculator', href: '/calculators/period-calculator', tag: 'Next Period' },
        { name: 'Menstrual Cycle Calculator', href: '/calculators/menstrual-cycle-calculator', tag: '4 Phases' },
        { name: 'Ovulation Calculator', href: '/calculators/ovulation-calculator', tag: 'Safe Days' },
        { name: 'Implantation Calculator', href: '/calculators/implantation-calculator', tag: 'Spotting' },
      ],
      articles: [
        { title: 'How to Calculate Your Period Cycle Length Accurately', href: '/articles/how-to-calculate-period-cycle-length-accurately' },
        { title: 'Why Is My Period Late? 10 Causes Other Than Pregnancy', href: '/articles/why-is-my-period-late-causes-other-than-pregnancy' },
        { title: 'How to Relieve Period Cramps Fast: 9 Gentle Remedies', href: '/articles/period-cramps-relief-home-remedies-fast-pain-relief' },
        { title: 'Period Blood Clots: Jelly-Like Chunks, Sizes & What It Means', href: '/articles/period-blood-clots-what-they-mean' },
        { title: 'Safe Days to Avoid Pregnancy: Natural Family Planning Guide', href: '/articles/safe-days-to-avoid-pregnancy-calculation-guide' },
        { title: 'Is There a Best Time to Have Sex to Avoid Pregnancy?', href: '/articles/best-time-to-have-sex-avoid-pregnancy' },
        { title: 'Spotting vs Period: 5 Clear Ways to Tell the Difference', href: '/articles/spotting-vs-period-differences-color-flow-causes' },
      ]
    },
    pcos: {
      title: 'PCOS, Irregular Cycles & Cycle Syncing Authority',
      desc: 'Proven endocrine tracking protocols for irregular cycles, luteal phase defects, and hormone balancing.',
      tools: [
        { name: 'Menstrual Cycle Calculator', href: '/calculators/menstrual-cycle-calculator', tag: 'Hormone Map' },
        { name: 'Ovulation Calculator', href: '/calculators/ovulation-calculator', tag: 'Fertile Window' },
        { name: 'Period Calculator', href: '/calculators/period-calculator', tag: 'Irregular' },
        { name: 'Implantation Calculator', href: '/calculators/implantation-calculator', tag: 'Conception' },
      ],
      articles: [
        { title: 'Irregular Periods & PCOS: How to Track Ovulation & Fertile Windows', href: '/articles/pcos-irregular-period-ovulation-tracking-guide' },
        { title: 'Understanding PCOS, Irregular Cycles & Hormonal Imbalance', href: '/articles/understanding-pcos-irregular-cycles-hormones' },
        { title: 'Follicular Phase vs Luteal Phase: Energy, Mood & Nutrition', href: '/articles/follicular-phase-vs-luteal-phase-hormones-energy-cycle-syncing' },
        { title: 'Cycle Syncing: Workout & Nutrition Blueprint by Phase', href: '/articles/cycle-syncing-workout-nutrition-phases' },
        { title: 'Ayurvedic Herbs for Regular Periods, PCOS & Hormones', href: '/articles/ayurvedic-herbs-for-regular-periods-and-pcos-hormonal-balance' },
      ]
    }
  };

  const activeCluster = clusters[cluster] || clusters.fertility;

  return (
    <section className="mt-14 pt-10 border-t border-pink-100 bg-linear-to-b from-white via-pink-50/30 to-white rounded-3xl p-6 sm:p-10 shadow-xs">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-flo-600">
              <Sparkles className="w-4 h-4 text-flo-500" />
              <span>Related Clinical Resources & Internal Tools</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {activeCluster.title}
            </h3>
            <p className="text-sm text-gray-600 max-w-2xl">
              {activeCluster.desc}
            </p>
          </div>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-flo-700 hover:text-flo-800 bg-white border border-pink-200 px-4 py-2 rounded-full shadow-2xs hover:shadow-sm transition"
          >
            <span>All 8 Calculators</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Grid: Tools (Left) & Clinical Guides (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Complementary Tools Column */}
          <div className="lg:col-span-5 bg-white border border-pink-100 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-pink-50">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-700 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-flo-500" />
                <span>Complementary Clinical Calculators</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {activeCluster.tools
                .filter(t => !currentSlug || !t.href.includes(currentSlug))
                .slice(0, 4)
                .map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.href}
                    className="flex items-center justify-between p-3 rounded-xl bg-pink-50/40 hover:bg-flo-50 border border-pink-100/60 hover:border-pink-200 text-sm font-semibold text-gray-800 hover:text-flo-700 transition group"
                  >
                    <span className="truncate">{tool.name}</span>
                    <span className="text-[10px] uppercase font-bold text-flo-600 bg-white px-2 py-0.5 rounded-md border border-pink-100 shrink-0 ml-2">
                      {tool.tag}
                    </span>
                  </Link>
              ))}
            </div>
          </div>

          {/* Deep-Dive Companion Guides Column */}
          <div className="lg:col-span-7 bg-white border border-pink-100 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-pink-50">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-flo-500" />
                <span>Recommended Medical Guides & Verification</span>
              </span>
              <Link href="/wellness-hub" className="text-[11px] font-bold text-flo-600 hover:underline">
                Wellness Hub &rarr;
              </Link>
            </div>
            <div className="space-y-2">
              {activeCluster.articles
                .filter(a => !currentSlug || !a.href.includes(currentSlug))
                .slice(0, 4)
                .map((art, idx) => (
                  <Link
                    key={idx}
                    href={art.href}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-flo-50 text-xs sm:text-sm font-medium text-gray-700 hover:text-flo-700 transition group"
                  >
                    <span className="line-clamp-1 pr-2">{art.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-flo-600 shrink-0 group-hover:translate-x-0.5 transition" />
                  </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Global Site Authority Hub Strip */}
        <div className="pt-4 border-t border-pink-100/80 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>100% On-Device Private Tracking: Zero Cloud Data Collection</span>
          </span>
          <div className="flex items-center gap-4 font-bold text-flo-700">
            <Link href="/" className="hover:underline">Home</Link>
            <span>•</span>
            <Link href="/app-features" className="hover:underline">Mobile App</Link>
            <span>•</span>
            <Link href="/about/science-and-research" className="hover:underline">Science & Research</Link>
            <span>•</span>
            <Link href="/faq" className="hover:underline">FAQ</Link>
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CALCULATORS } from '../../data/calculators';
import { 
  Calculator, 
  ChevronRight, 
  Sparkles, 
  Activity, 
  Egg, 
  Calendar, 
  Clock, 
  Heart, 
  CheckCircle,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

const iconMap = {
  Activity,
  Egg,
  Calendar,
  Clock,
  Heart,
  CheckCircle,
  Sparkles
};

export const metadata = {
  title: 'Free Period & Ovulation Calculators - Menstrual Tools',
  description: 'Calculate your next period date, ovulation day, fertile window, beta hCG doubling, and pregnancy due date. Free, instant, and 100% private in-browser tools.',
  keywords: [
    'period calculator',
    'ovulation calculator',
    'fertility tools',
    'pregnancy due date calculator',
    'beta hcg calculator',
    'cycle tools'
  ],
  alternates: {
    canonical: '/calculators',
  },
  openGraph: {
    title: 'Free Period & Ovulation Calculators - Menstrual Tools | Period Tracker',
    description: 'Calculate your next period date, ovulation day, fertile window, beta hCG doubling, and pregnancy due date. 100% private in-browser reproductive tools.',
    url: '/calculators',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Period & Ovulation Calculators - Menstrual Tools',
    description: 'Calculate your next period date, ovulation day, fertile window, beta hCG doubling, and pregnancy due date. 100% private in-browser tools.',
  },
};

export default function CalculatorsHubPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff9fb]">
      <Navbar />

      <main className="flex-1">
        {/* Top Header */}
        <section className="bg-gradient-to-b from-flo-100/70 via-pink-50/40 to-[#fff9fb] py-14 border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <nav className="flex justify-center items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              <Link href="/" className="hover:text-flo-600 transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-800 font-bold">HEALTH TOOLS & CALCULATORS</span>
            </nav>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight leading-snug">
              Reproductive & Cycle Calculators
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Smart interactive tools designed to predict menstrual phases, calculate hCG doubling rates, determine fertile windows, and estimate pregnancy due dates.
            </p>

            {/* <div className="mt-6 flex items-center justify-center gap-4 text-xs font-semibold text-emerald-800">
              <span className="flex items-center gap-1.5 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% In-Browser Privacy
              </span>
              <span className="flex items-center gap-1.5 bg-pink-50 px-3.5 py-1.5 rounded-full border border-pink-200 text-flo-700">
                <Sparkles className="w-4 h-4 text-flo-500" />
                Zero API or Tracking
              </span>
            </div> */}

          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CALCULATORS.map((calc) => {
                const Icon = iconMap[calc.icon] || Calculator;

                return (
                  <Link
                    key={calc.slug}
                    href={`/calculators/${calc.slug}`}
                    className="group bg-white rounded-3xl border border-pink-100 p-6 shadow-xs hover:shadow-xl hover:shadow-pink-100/60 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-flo-100 text-flo-600 flex items-center justify-center group-hover:bg-flo-600 group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold text-flo-700 bg-flo-50 px-3 py-1 rounded-full border border-pink-200">
                          {calc.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-flo-600 transition-colors">
                          {calc.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {calc.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-pink-50 mt-6 flex items-center justify-between text-xs font-bold text-flo-600">
                      <span>Open Calculator</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* General Disclaimer */}
            <div className="mt-14 p-6 rounded-3xl bg-flo-50/70 border border-pink-100 text-xs text-gray-600 leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-flo-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-gray-900 block mb-1">Educational Disclaimer for All Calculators:</strong>
                <p>
                  These calculators provide statistical estimates based on biological cycle averages and standard reproductive models. Individual cycles and hormone levels vary substantially. Results are not medical diagnoses. Please consult a qualified healthcare practitioner for personal advice.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

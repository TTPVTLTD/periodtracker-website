'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Clock, Calendar, CheckCircle2, AlertCircle, Baby, ArrowDown, Sparkles } from 'lucide-react';

export default function WeeksToMonthsCalculator() {
  const [weeks, setWeeks] = useState(20);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultsRef = useRef(null);

  const results = useMemo(() => {
    const w = Number(weeks);
    if (w < 1 || w > 42) return null;

    let month = 1;
    let trimester = 'First Trimester (Weeks 1 – 13)';
    let trimesterColor = 'bg-pink-50 text-pink-700 border-pink-200';

    if (w <= 4) month = 1;
    else if (w <= 8) month = 2;
    else if (w <= 13) month = 3;
    else if (w <= 17) {
      month = 4;
      trimester = 'Second Trimester (Weeks 14 – 27)';
      trimesterColor = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (w <= 22) {
      month = 5;
      trimester = 'Second Trimester (Weeks 14 – 27)';
      trimesterColor = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (w <= 27) {
      month = 6;
      trimester = 'Second Trimester (Weeks 14 – 27)';
      trimesterColor = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (w <= 31) {
      month = 7;
      trimester = 'Third Trimester (Weeks 28 – 40+)';
      trimesterColor = 'bg-purple-50 text-purple-700 border-purple-200';
    } else if (w <= 35) {
      month = 8;
      trimester = 'Third Trimester (Weeks 28 – 40+)';
      trimesterColor = 'bg-purple-50 text-purple-700 border-purple-200';
    } else {
      month = 9;
      trimester = 'Third Trimester (Weeks 28 – 40+)';
      trimesterColor = 'bg-purple-50 text-purple-700 border-purple-200';
    }

    return {
      month,
      trimester,
      trimesterColor,
      daysRemaining: Math.max(0, (40 - w) * 7)
    };
  }, [weeks]);

  const handleCalculate = async () => {
    setIsCalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setIsCalculating(false);
    setHasCalculated(true);

    try {
      if (typeof window !== 'undefined') {
        const confetti = (await import('canvas-confetti')).default;
        confetti({
          particleCount: 75,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#f43f77', '#fc6a97', '#ffe4ec', '#10b981', '#f59e0b']
        });
      }
    } catch (e) {
      // fallback
    }

    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Slider (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm space-y-6">
          
          <div className="flex items-center gap-3 pb-4 border-b border-pink-100">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-flo-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Weeks to Months</h3>
              <p className="text-xs text-gray-500">Convert pregnancy weeks to months & trimesters</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-800">
                Current Gestational Week
              </label>
              <span className="px-3.5 py-1 bg-flo-50 rounded-full text-flo-600 font-extrabold text-sm border border-pink-200 shadow-xs">
                Week {weeks}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="42"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="w-full accent-flo-500 cursor-pointer h-2 bg-pink-200 rounded-lg"
            />
            <div className="flex justify-between text-xs text-gray-400 font-medium mt-1">
              <span>Week 1</span>
              <span className="font-bold text-gray-600">Week 20 (Halfway)</span>
              <span>Week 40+ (Full Term)</span>
            </div>
          </div>

          {/* Quick presets */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Trimester Milestones:</p>
            <div className="grid grid-cols-3 gap-2">
              {[12, 24, 36].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeeks(w)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    weeks === w 
                      ? 'bg-flo-600 text-white border-flo-600 shadow-xs' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-flo-300'
                  }`}
                >
                  Week {w}
                </button>
              ))}
            </div>
          </div>

          {/* Prominent Flo-style [See results] Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-4 rounded-full bg-[#f43f77] hover:bg-[#e11d5f] text-white font-bold text-base shadow-md shadow-pink-200 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2 disabled:opacity-85 cursor-pointer"
            >
              {isCalculating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Converting gestational timeline...</span>
                </>
              ) : (
                <>
                  <span>See results</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Gestational Context:</strong> A pregnancy is 40 weeks long, which works out to ~9.2 calendar months since months have 4.3 weeks on average.
            </span>
          </div>

        </div>

        {/* Right Column: Calculated Results & Timeline (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6" ref={resultsRef}>
          
          {!hasCalculated ? (
            /* Flo-inspired Initial Preview State */
            <div className="bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 rounded-3xl p-8 sm:p-12 border-2 border-dashed border-pink-200 text-center flex flex-col items-center justify-center min-h-[440px] space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-pink-100 text-flo-600 flex items-center justify-center relative">
                <Clock className="w-10 h-10 text-flo-500 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-flo-500"></span>
                </span>
              </div>

              <div className="max-w-md space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Ready to Convert Weeks to Months
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Select your current pregnancy week on the left and click <strong className="text-flo-600">"See results"</strong> to view your exact medical month and trimester breakdown.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-flo-500 shrink-0 ring-2 ring-pink-200" />
                  <span className="text-xs font-bold text-gray-800">Calendar Month Equivalent</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-200" />
                  <span className="text-xs font-bold text-gray-800">Trimester Stage</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 ring-2 ring-emerald-200" />
                  <span className="text-xs font-bold text-gray-800">Days to Full Term</span>
                </div>
              </div>
            </div>
          ) : results && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                
                <div className="p-5 rounded-3xl bg-gradient-to-br from-flo-50 to-pink-100/70 border border-flo-200 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-flo-700 uppercase tracking-wider block truncate">
                    Calendar Month
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 block truncate">
                    Month {results.month}
                  </span>
                  <span className="text-xs text-gray-600 mt-1 block leading-snug">
                    You are in your {results.month}th month
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-white border border-pink-200 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block truncate">
                    Trimester Stage
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold border mt-3 ${results.trimesterColor}`}>
                    {results.trimester}
                  </span>
                  <span className="text-xs text-gray-500 mt-1 block">
                    Gestational phase
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100/70 border border-emerald-300 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block truncate">
                    Countdown to 40w
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-950 mt-2 block truncate">
                    ~{results.daysRemaining} Days
                  </span>
                  <span className="text-xs text-emerald-800 mt-1 block leading-snug font-medium">
                    To standard 40-week delivery
                  </span>
                </div>

              </div>

              {/* Conversion Reference Card */}
              <div className="p-6 rounded-3xl bg-white border border-pink-200 shadow-xs space-y-3">
                <h5 className="font-extrabold text-gray-900 text-base flex items-center gap-2">
                  <Baby className="w-5 h-5 text-flo-500" />
                  <span>Trimester & Gestational Chart Overview</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3 bg-pink-50/60 rounded-2xl border border-pink-100">
                    <strong className="block text-pink-900">1st Trimester</strong>
                    <span className="text-gray-600">Weeks 1 – 13 (Months 1 – 3)</span>
                  </div>
                  <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100">
                    <strong className="block text-amber-900">2nd Trimester</strong>
                    <span className="text-gray-600">Weeks 14 – 27 (Months 4 – 6)</span>
                  </div>
                  <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100">
                    <strong className="block text-purple-900">3rd Trimester</strong>
                    <span className="text-gray-600">Weeks 28 – 40+ (Months 7 – 9)</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

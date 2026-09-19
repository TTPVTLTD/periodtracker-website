'use client';

import React, { useState, useMemo, useRef } from 'react';
import { CheckCircle, AlertCircle, Clock, Calendar, ArrowDown, Sparkles } from 'lucide-react';

export default function PregnancyTestCalculator() {
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 10);
    return d.toISOString().split('T')[0];
  };

  const [calcType, setCalcType] = useState('period');
  const [dateValue, setDateValue] = useState(getDefaultDate());
  const [cycleDays, setCycleDays] = useState(28);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultsRef = useRef(null);

  const results = useMemo(() => {
    if (!dateValue) return null;
    const base = new Date(dateValue + 'T00:00:00');
    if (isNaN(base.getTime())) return null;

    let expectedPeriodDate = new Date(base);
    let earlyTestDate = new Date(base);
    let definitiveTestDate = new Date(base);

    if (calcType === 'period') {
      expectedPeriodDate.setDate(expectedPeriodDate.getDate() + Number(cycleDays));
      earlyTestDate = new Date(expectedPeriodDate);
      earlyTestDate.setDate(earlyTestDate.getDate() - 4);
      definitiveTestDate = new Date(expectedPeriodDate);
    } else {
      expectedPeriodDate.setDate(expectedPeriodDate.getDate() + 14);
      earlyTestDate = new Date(base);
      earlyTestDate.setDate(earlyTestDate.getDate() + 10);
      definitiveTestDate = new Date(base);
      definitiveTestDate.setDate(definitiveTestDate.getDate() + 14);
    }

    return {
      earlyTestDate,
      definitiveTestDate,
      expectedPeriodDate
    };
  }, [calcType, dateValue, cycleDays]);

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
        
        {/* Left Column: Form & Settings (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm space-y-6">
          
          <div className="flex items-center gap-3 pb-4 border-b border-pink-100">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-flo-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="">Test Timing Inputs</h3>
              <p className="text-gray-500">Calculate date for reliable at-home testing</p>
            </div>
          </div>

          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Calculation Basis
            </label>
            <div className="flex rounded-2xl bg-flo-50 p-1.5 border border-pink-100">
              <button
                type="button"
                onClick={() => setCalcType('period')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  calcType === 'period' ? 'bg-white text-flo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Last Period (LMP)
              </button>
              <button
                type="button"
                onClick={() => setCalcType('ovulation')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  calcType === 'ovulation' ? 'bg-white text-flo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Ovulation Date
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              {calcType === 'period' ? 'First Day of Last Period' : 'Date of Ovulation'}
            </label>
            <input
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-300 text-base font-bold text-gray-800 focus:ring-2 focus:ring-flo-500 shadow-xs"
            />
          </div>

          {calcType === 'period' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-bold text-gray-800">Average Cycle Length</label>
                <span className="text-xs font-bold text-flo-600 bg-flo-50 px-3 py-1 rounded-full border border-pink-200">
                  {cycleDays} Days
                </span>
              </div>
              <input
                type="range"
                min="21"
                max="45"
                value={cycleDays}
                onChange={(e) => setCycleDays(e.target.value)}
                className="w-full accent-flo-500 cursor-pointer h-2 bg-pink-200 rounded-lg"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
                <span>21 Days</span>
                <span className="font-bold text-gray-600">28 Days (Average)</span>
                <span>45 Days</span>
              </div>
            </div>
          )}

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
                  <span>Calculating test timeline...</span>
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
              <strong>Testing Tip:</strong> For highest accuracy, test first thing in the morning when urine is most concentrated and hCG levels are easiest to detect.
            </span>
          </div>

        </div>

        {/* Right Column: Calculated Results & Timeline (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6" ref={resultsRef}>
          
          {!hasCalculated ? (
            /* Flo-inspired Initial Preview State */
            <div className="bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 rounded-3xl p-8 sm:p-12 border-2 border-dashed border-pink-200 text-center flex flex-col items-center justify-center min-h-[440px] space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-pink-100 text-flo-600 flex items-center justify-center relative">
                <Sparkles className="w-10 h-10 text-flo-500 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-flo-500"></span>
                </span>
              </div>

              <div className="max-w-md space-y-2">
                <h3 className="text-xl  font-bold">
                  Ready to Calculate Test Date
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Enter your cycle dates on the left and click <strong className="text-flo-600">"See results"</strong> to determine the earliest reliable date you can test at home without false negatives.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0 ring-2 ring-emerald-200" />
                  <span className="text-xs font-bold text-gray-800">99% Accurate Test Date</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-flo-500 shrink-0 ring-2 ring-pink-200" />
                  <span className="text-xs font-bold text-gray-800">Earliest Detection Day</span>
                </div>
              </div>
            </div>
          ) : results && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 99% Accuracy Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100/70 border border-emerald-300 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                    Recommended For 99% Accuracy
                  </span>
                  <span className=" font-black text-emerald-950 mt-2 block">
                    {results.definitiveTestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <p className="text-emerald-800 mt-2 leading-relaxed font-medium">
                    Day of expected missed period. Urine hCG levels are high enough to virtually eliminate false negatives.
                  </p>
                </div>

                {/* Earliest Sensitive Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-flo-50 to-pink-100/70 border border-flo-200 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-flo-700 uppercase tracking-wider block">
                    Earliest Sensitive Test
                  </span>
                  <span className=" font-black text-gray-900 mt-2 block">
                    {results.earlyTestDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <p className="text-gray-600 mt-2 leading-relaxed">
                    Valid for ultra-sensitive (10 mIU/mL) early detection tests. If negative, re-test on the recommended date above.
                  </p>
                </div>

              </div>

              {/* Tips Card */}
              <div className="p-6 rounded-3xl bg-white border border-pink-200 shadow-xs space-y-3">
                <h5 className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-flo-500" />
                  <span>Understanding At-Home Urine Test Sensitivity</span>
                </h5>
                <p className="text-gray-700 leading-relaxed">
                  Home urine pregnancy tests detect human chorionic gonadotropin (hCG). Standard kits require 25 mIU/mL, which is reliably present starting the first day of a missed period. Testing earlier than 10 to 12 days after ovulation may show a false negative even if conception occurred.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

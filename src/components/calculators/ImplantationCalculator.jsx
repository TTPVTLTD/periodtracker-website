'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Sparkles, Calendar, Heart, AlertCircle, CheckCircle2, ArrowDown } from 'lucide-react';

export default function ImplantationCalculator() {
  const getDefaultOvulation = () => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  };

  const [ovulationDate, setOvulationDate] = useState(getDefaultOvulation());
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultsRef = useRef(null);

  const results = useMemo(() => {
    if (!ovulationDate) return null;
    const base = new Date(ovulationDate + 'T00:00:00');
    if (isNaN(base.getTime())) return null;

    const earlyImp = new Date(base);
    earlyImp.setDate(earlyImp.getDate() + 6);

    const peakStart = new Date(base);
    peakStart.setDate(peakStart.getDate() + 8);

    const peakEnd = new Date(base);
    peakEnd.setDate(peakEnd.getDate() + 10);

    const lateImp = new Date(base);
    lateImp.setDate(lateImp.getDate() + 12);

    const testDate = new Date(base);
    testDate.setDate(testDate.getDate() + 14);

    return {
      earlyImp,
      peakStart,
      peakEnd,
      lateImp,
      testDate
    };
  }, [ovulationDate]);

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
        
        {/* Left Column: Form Inputs (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm space-y-6">
          
          <div className="flex items-center gap-3 pb-4 border-b border-pink-100">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-flo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Implantation Window</h3>
              <p className="text-xs text-gray-500">Calculate when the blastocyst attaches</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              Estimated Ovulation (or Conception) Date
            </label>
            <input
              type="date"
              value={ovulationDate}
              onChange={(e) => setOvulationDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-300 text-base font-bold text-gray-800 focus:ring-2 focus:ring-flo-500 focus:outline-none shadow-xs"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Typically occurs 14 days before your expected period.
            </p>
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
                  <span>Calculating attachment timeline...</span>
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
              <strong>Biology Fact:</strong> Implantation occurs between 6 and 12 days after ovulation, with 85% of successful blastocyst attachments taking place between days 8 and 10.
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
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Ready to Calculate Implantation
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enter your estimated ovulation or conception date on the left and click <strong className="text-flo-600">"See results"</strong> to view your attachment window and earliest pregnancy test date.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-flo-500 shrink-0 ring-2 ring-pink-200" />
                  <span className="text-xs font-bold text-gray-800">Peak Window (8-10 DPO)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 ring-2 ring-emerald-200" />
                  <span className="text-xs font-bold text-gray-800">Full Span (6-12 DPO)</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-200" />
                  <span className="text-xs font-bold text-gray-800">First Reliable Test Date</span>
                </div>
              </div>
            </div>
          ) : results && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* 3 Result Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                
                <div className="p-5 rounded-3xl bg-gradient-to-br from-flo-50 to-pink-100/70 border border-flo-200 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-flo-700 uppercase tracking-wider block truncate">
                    Most Likely Window
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-gray-900 mt-2 block truncate">
                    {results.peakStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {results.peakEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs text-gray-600 mt-1 block leading-snug">
                    8 to 10 days post-ovulation (85% of cases)
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-100/70 border border-emerald-200 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block truncate">
                    Full Span
                  </span>
                  <span className="text-lg sm:text-xl font-black text-emerald-950 mt-2 block truncate">
                    {results.earlyImp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {results.lateImp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs text-emerald-700 mt-1 block leading-snug">
                    6 to 12 days past ovulation
                  </span>
                </div>

                <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100/70 border border-amber-200 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block truncate">
                    Recommended Test
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-amber-950 mt-2 block truncate">
                    {results.testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="text-xs text-amber-700 mt-1 block leading-snug">
                    Allows hCG to rise post-attachment
                  </span>
                </div>

              </div>

              {/* Clinical Educational Explanation */}
              <div className="p-6 rounded-3xl bg-white border border-pink-200 shadow-xs space-y-3">
                <h5 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-flo-500" />
                  <span>What does implantation feel like?</span>
                </h5>
                <p className="text-sm text-gray-700 leading-relaxed">
                  About 1 in 3 women notice light implantation bleeding: a few drops of pale pink or light brown spotting lasting 24 to 48 hours without heavy flow or clots. Mild lower pelvis twinges may also occur as the blastocyst burrows into the vascular lining.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

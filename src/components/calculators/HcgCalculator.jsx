'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Activity, Clock, Info, AlertCircle, CheckCircle2, TrendingUp, Sparkles, ArrowDown } from 'lucide-react';

export default function HcgCalculator() {
  const [hcg1, setHcg1] = useState(150);
  const [hcg2, setHcg2] = useState(380);
  const [timeValue, setTimeValue] = useState(48);
  const [timeUnit, setTimeUnit] = useState('hours'); // 'hours' or 'days'
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultsRef = useRef(null);

  const results = useMemo(() => {
    const v1 = parseFloat(hcg1);
    const v2 = parseFloat(hcg2);
    const timeNum = parseFloat(timeValue);

    if (isNaN(v1) || isNaN(v2) || isNaN(timeNum) || v1 <= 0 || v2 <= 0 || timeNum <= 0) {
      return null;
    }

    const hours = timeUnit === 'days' ? timeNum * 24 : timeNum;
    if (hours <= 0) return null;

    const ratio = v2 / v1;
    let doublingTimeHours = null;
    let percentIncrease48h = null;
    let totalPercentIncrease = ((v2 - v1) / v1) * 100;

    if (ratio > 1) {
      doublingTimeHours = (hours * Math.log(2)) / Math.log(ratio);
      percentIncrease48h = (Math.pow(ratio, 48 / hours) - 1) * 100;
    }

    let status = 'normal';
    let statusText = 'Normal Doubling Rate';
    let statusColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
    let statusDesc = 'In early viable intrauterine pregnancy below 1,200 mIU/mL, hCG levels typically double every 48 to 72 hours.';

    if (doublingTimeHours) {
      if (doublingTimeHours < 40) {
        status = 'fast';
        statusText = 'Rapid Rise (< 40 hours)';
        statusColor = 'text-blue-800 bg-blue-50 border-blue-200';
        statusDesc = 'Your hCG is rising faster than average. This frequently occurs in healthy pregnancies or multiple gestations (twins).';
      } else if (doublingTimeHours <= 72) {
        status = 'normal';
        statusText = 'Expected Healthy Doubling (48 – 72 hours)';
        statusColor = 'text-emerald-800 bg-emerald-50 border-emerald-200';
        statusDesc = 'Your beta hCG levels are doubling within the standard healthy clinical range.';
      } else if (doublingTimeHours <= 96) {
        status = 'moderate';
        statusText = 'Moderate Rise (72 – 96 hours)';
        statusColor = 'text-amber-800 bg-amber-50 border-amber-200';
        statusDesc = 'As hCG surpasses 1,200–6,000 mIU/mL, doubling naturally slows down to 72–96 hours.';
      } else {
        status = 'slow';
        statusText = 'Slower than Average (> 96 hours)';
        statusColor = 'text-rose-800 bg-rose-50 border-rose-200';
        statusDesc = 'A doubling time exceeding 96 hours is expected once hCG passes 6,000 mIU/mL, but earlier in gestation it warrants consultation with your doctor.';
      }
    } else {
      status = 'dropping';
      statusText = 'hCG Levels Decreased';
      statusColor = 'text-red-800 bg-red-50 border-red-200';
      statusDesc = 'Second hCG measurement is lower than the first. Please contact your healthcare provider immediately for evaluation.';
    }

    return {
      hours: hours.toFixed(0),
      doublingHours: doublingTimeHours ? doublingTimeHours.toFixed(1) : 'N/A',
      doublingDays: doublingTimeHours ? (doublingTimeHours / 24).toFixed(1) : 'N/A',
      totalPercentIncrease: totalPercentIncrease.toFixed(1),
      percentIncrease48h: percentIncrease48h ? percentIncrease48h.toFixed(1) : 'N/A',
      statusText,
      statusColor,
      statusDesc
    };
  }, [hcg1, hcg2, timeValue, timeUnit]);

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
    <div className="w-full space-y-8">
      
      {/* Flo.health Style Form Card */}
      <div className="bg-white rounded-3xl border border-pink-100 p-6 sm:p-10 shadow-sm space-y-6">
        
        <div className="flex items-center gap-3 pb-4 border-b border-pink-100">
          <div className="w-10 h-10 rounded-2xl bg-pink-100 text-flo-600 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">Beta hCG Doubling Inputs</h3>
            <p className="text-xs text-gray-500">Calculate hormone rise rate between two serial blood draws</p>
          </div>
        </div>

        {/* Form Inputs Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* First hCG level */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              First β-hCG level
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                min="1"
                placeholder="e.g. 150"
                value={hcg1}
                onChange={(e) => setHcg1(e.target.value)}
                className="w-full pl-4 pr-16 py-3.5 rounded-2xl bg-white border border-gray-300 text-gray-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-flo-500 focus:border-transparent transition-all shadow-xs"
              />
              <span className="absolute right-4 text-xs font-semibold text-gray-500 pointer-events-none">
                mIU/mL
              </span>
            </div>
          </div>

          {/* Second hCG level */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Second β-hCG level
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                min="1"
                placeholder="e.g. 380"
                value={hcg2}
                onChange={(e) => setHcg2(e.target.value)}
                className="w-full pl-4 pr-16 py-3.5 rounded-2xl bg-white border border-gray-300 text-gray-900 font-bold text-base focus:outline-none focus:ring-2 focus:ring-flo-500 focus:border-transparent transition-all shadow-xs"
              />
              <span className="absolute right-4 text-xs font-semibold text-gray-500 pointer-events-none">
                mIU/mL
              </span>
            </div>
          </div>

          {/* Time between tests */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Time between tests
            </label>
            <div className="relative flex items-center rounded-2xl bg-white border border-gray-300 overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-flo-500">
              <input
                type="number"
                min="1"
                placeholder="Number of..."
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="w-full pl-4 pr-24 py-3.5 text-gray-900 font-bold text-base focus:outline-none bg-transparent"
              />
              <div className="absolute right-1.5 flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTimeUnit('days')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${timeUnit === 'days' ? 'bg-white text-flo-600 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Days
                </button>
                <button
                  type="button"
                  onClick={() => setTimeUnit('hours')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${timeUnit === 'hours' ? 'bg-white text-flo-600 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
                >
                  Hours
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Big Flo-style [See results] button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full py-4 rounded-full bg-[#f43f77] hover:bg-[#e11d5f] text-white font-bold text-base sm:text-lg shadow-md shadow-pink-200 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2 disabled:opacity-85 cursor-pointer"
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Calculating hormone doubling rate...</span>
              </>
            ) : (
              <>
                <span>See results</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </>
            )}
          </button>
        </div>

        {/* Initial Preview State before calculation */}
        {!hasCalculated ? (
          <div className="bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 rounded-3xl p-8 sm:p-10 border-2 border-dashed border-pink-200 text-center flex flex-col items-center justify-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-pink-100 text-flo-600 flex items-center justify-center relative">
              <Sparkles className="w-8 h-8 text-flo-500 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-flo-500"></span>
              </span>
            </div>

            <div className="max-w-md space-y-1.5">
              <h4 className="text-xl sm:text-2xl font-black text-gray-900">
                Ready to Calculate Doubling Rate
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Enter your two blood test values and elapsed time above, then click <strong className="text-flo-600">"See results"</strong> to view doubling times and 48-hour percentage increase.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
              <div className="p-3 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-flo-500 shrink-0 ring-2 ring-pink-200" />
                <span className="text-xs font-bold text-gray-800">Doubling Time (Hours)</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 ring-2 ring-emerald-200" />
                <span className="text-xs font-bold text-gray-800">48-Hour Increase %</span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-200" />
                <span className="text-xs font-bold text-gray-800">Interpretation Guide</span>
              </div>
            </div>
          </div>
        ) : results && (
          /* Calculated Results Panel (Revealed upon See Results) */
          <div ref={resultsRef} className="pt-6 border-t border-pink-100 space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Calculated Test Results
              </span>
              <span className="text-xs font-semibold text-flo-600 bg-flo-50 px-3 py-1 rounded-full border border-pink-200">
                Time Interval: {results.hours} Hours
              </span>
            </div>

            {/* Results Grid - Responsive 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-flo-50 to-pink-100/70 border border-flo-200 shadow-xs flex flex-col justify-between min-w-0">
                <span className="text-xs font-bold text-flo-700 uppercase tracking-wider block">
                  Doubling Time
                </span>
                <span className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 block truncate">
                  {results.doublingHours} <span className="text-sm font-semibold text-gray-600">Hours</span>
                </span>
                <span className="text-xs text-gray-500 mt-1 block">
                  (~{results.doublingDays} days to double)
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100/70 border border-emerald-200 shadow-xs flex flex-col justify-between min-w-0">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  48-Hour Increase
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-950 mt-2 block truncate">
                  +{results.percentIncrease48h}%
                </span>
                <span className="text-xs text-emerald-700 mt-1 block">
                  Standard expected: +66% or higher
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/70 border border-amber-200 shadow-xs flex flex-col justify-between min-w-0">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                  Overall Increase
                </span>
                <span className="text-2xl sm:text-3xl font-black text-amber-950 mt-2 block truncate">
                  +{results.totalPercentIncrease}%
                </span>
                <span className="text-xs text-amber-700 mt-1 block">
                  From {hcg1} to {hcg2} mIU/mL
                </span>
              </div>

            </div>

            {/* Clinical Interpretation Banner */}
            <div className={`p-5 rounded-2xl border ${results.statusColor} flex items-start gap-3 shadow-xs`}>
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm sm:text-base">{results.statusText}</h5>
                <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">{results.statusDesc}</p>
              </div>
            </div>

          </div>
        )}

        {/* Flo-style Info and Privacy Disclaimer */}
        <div className="p-5 rounded-2xl bg-flo-50/60 border border-pink-100/80 text-xs text-gray-600 leading-relaxed space-y-3">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p>
                • Remember that hCG calculator tools and hCG level charts can help you learn more about the part hCG plays in pregnancy. However, results are estimates, and they are for informational purposes only, not a replacement for medical advice or as a self-diagnosis tool. Your doctor should always be your first resource when it comes to tracking and explaining hCG progression.
              </p>
              <p>
                • Please note that <strong>Period Tracker & Ovulation Cycle</strong> does not collect, process, or store any of the data that you enter while using these tools. All calculations are done exclusively in your browser. We do not have access to the results. All data will be permanently erased after leaving or closing the page.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Clinical Reference Chart Table */}
      <div className="bg-white rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm">
        <h4 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-flo-500" />
          <span>Beta hCG Reference Ranges by Gestational Week</span>
        </h4>
        <p className="text-xs text-gray-500 mb-4">
          Weeks counted from the first day of your last menstrual period (LMP). Normal ranges vary widely between individuals.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-flo-50/80 border-b border-pink-200 text-flo-900 font-bold">
                <th className="py-3 px-4 rounded-l-xl">Gestational Age (LMP)</th>
                <th className="py-3 px-4">Standard Range (mIU/mL)</th>
                <th className="py-3 px-4 rounded-r-xl">Doubling Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50 text-gray-700">
              <tr>
                <td className="py-3 px-4 font-semibold">3 Weeks LMP</td>
                <td className="py-3 px-4">5 – 50 mIU/mL</td>
                <td className="py-3 px-4">Every 36 – 48 hours</td>
              </tr>
              <tr className="bg-flo-50/20">
                <td className="py-3 px-4 font-semibold">4 Weeks LMP (Missed Period)</td>
                <td className="py-3 px-4">5 – 426 mIU/mL</td>
                <td className="py-3 px-4">Every 48 hours</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">5 Weeks LMP</td>
                <td className="py-3 px-4">18 – 7,340 mIU/mL</td>
                <td className="py-3 px-4">Every 48 – 72 hours</td>
              </tr>
              <tr className="bg-flo-50/20">
                <td className="py-3 px-4 font-semibold">6 Weeks LMP</td>
                <td className="py-3 px-4">1,080 – 56,500 mIU/mL</td>
                <td className="py-3 px-4">Every 72 – 96 hours</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">7 – 8 Weeks LMP</td>
                <td className="py-3 px-4">7,650 – 229,000 mIU/mL</td>
                <td className="py-3 px-4">Plateaus / slows down</td>
              </tr>
              <tr className="bg-flo-50/20">
                <td className="py-3 px-4 font-semibold">9 – 12 Weeks LMP (Peak)</td>
                <td className="py-3 px-4">25,700 – 288,000 mIU/mL</td>
                <td className="py-3 px-4">Stabilizes then slowly declines</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

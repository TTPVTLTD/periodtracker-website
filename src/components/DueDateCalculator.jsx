'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Heart, Baby, Calendar, Clock, Sparkles, AlertCircle, ArrowDown, CheckCircle2 } from 'lucide-react';

export default function DueDateCalculator() {
  const getInitialLmp = () => {
    const d = new Date();
    d.setDate(d.getDate() - 56);
    return d.toISOString().split('T')[0];
  };

  const [calcMethod, setCalcMethod] = useState('lmp');
  const [selectedDate, setSelectedDate] = useState(getInitialLmp());
  const [cycleDays, setCycleDays] = useState(28);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const resultsRef = useRef(null);

  const results = useMemo(() => {
    if (!selectedDate) return null;
    const baseDate = new Date(selectedDate + 'T00:00:00');
    if (isNaN(baseDate.getTime())) return null;

    let dueDate = new Date(baseDate);

    if (calcMethod === 'lmp') {
      dueDate.setDate(dueDate.getDate() + 280 + (Number(cycleDays) - 28));
    } else {
      dueDate.setDate(dueDate.getDate() + 266);
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    let gestationalDays = 0;
    if (calcMethod === 'lmp') {
      gestationalDays = Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    } else {
      gestationalDays = Math.floor((today.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24)) + 14;
    }

    const weeks = Math.max(0, Math.floor(gestationalDays / 7));
    const days = Math.max(0, gestationalDays % 7);

    let trimester = 'First Trimester';
    let trimesterColor = 'text-pink-700 bg-pink-50 border-pink-200';
    if (weeks > 13 && weeks <= 27) {
      trimester = 'Second Trimester';
      trimesterColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (weeks > 27) {
      trimester = 'Third Trimester';
      trimesterColor = 'text-purple-700 bg-purple-50 border-purple-200';
    }

    const sizeMap = {
      4: { fruit: 'Poppy Seed', desc: 'Blastocyst implanting into uterine lining' },
      5: { fruit: 'Sesame Seed', desc: 'Heart begins rudimentary rhythmic beating' },
      6: { fruit: 'Lentil', desc: 'Facial features and buds for limbs form' },
      7: { fruit: 'Blueberry', desc: 'Brain hemispheres developing rapidly' },
      8: { fruit: 'Raspberry', desc: 'Fingers and toes are forming' },
      9: { fruit: 'Green Olive', desc: 'Muscles tiny twitches begin' },
      10: { fruit: 'Prune', desc: 'Vital organs starting to function' },
      11: { fruit: 'Lime', desc: 'Tooth buds and vocal cords developing' },
      12: { fruit: 'Plum', desc: 'Reflexes are developing' },
      14: { fruit: 'Lemon', desc: 'Can make facial expressions' },
      16: { fruit: 'Avocado', desc: 'Eyes are becoming light-sensitive' },
      20: { fruit: 'Banana', desc: 'You may begin feeling subtle flutters (quickening)' },
      24: { fruit: 'Corn on Cob', desc: 'Lungs are producing surfactant' },
      28: { fruit: 'Eggplant', desc: 'Can blink and open eyelashes' },
      32: { fruit: 'Squash', desc: 'Practicing breathing movements' },
      36: { fruit: 'Papaya', desc: 'Gaining fat rapidly for warmth' },
      40: { fruit: 'Watermelon', desc: 'Fully formed and ready to meet the world!' }
    };

    let matchedFruit = { fruit: 'Sweet Pea', desc: 'Early cell division in progress' };
    const weekKeys = Object.keys(sizeMap).map(Number).sort((a,b) => a - b);
    for (const k of weekKeys) {
      if (weeks >= k) {
        matchedFruit = sizeMap[k];
      }
    }

    return {
      dueDate,
      weeks,
      days,
      trimester,
      trimesterColor,
      matchedFruit,
      isRealistic: weeks <= 42
    };
  }, [selectedDate, calcMethod, cycleDays]);

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
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Inputs (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm space-y-6">
          
          <div className="flex items-center gap-3 pb-4 border-b border-pink-100">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-flo-600 flex items-center justify-center">
              <Baby className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Due Date Calculation</h3>
              <p className="text-xs text-gray-500">Calculate delivery date using Naegele's standard rule</p>
            </div>
          </div>

          {/* Method Selector Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Calculation Method
            </label>
            <div className="flex rounded-2xl bg-flo-50 p-1.5 border border-pink-100">
              <button
                type="button"
                onClick={() => setCalcMethod('lmp')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  calcMethod === 'lmp'
                    ? 'bg-white text-flo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Last Period (LMP)
              </button>
              <button
                type="button"
                onClick={() => setCalcMethod('conception')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  calcMethod === 'conception'
                    ? 'bg-white text-flo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Conception Date
              </button>
            </div>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              {calcMethod === 'lmp' 
                ? 'First day of your last period' 
                : 'Estimated Date of Conception'
              }
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-300 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-flo-500 transition-all shadow-xs text-base"
            />
          </div>

          {calcMethod === 'lmp' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-bold text-gray-800">
                  Average Cycle Length
                </label>
                <span className="text-xs font-bold text-flo-600 bg-flo-50 px-3 py-1 rounded-full border border-pink-200">
                  {cycleDays} Days
                </span>
              </div>
              <input
                type="range"
                min="22"
                max="40"
                value={cycleDays}
                onChange={(e) => setCycleDays(e.target.value)}
                className="w-full accent-flo-500 cursor-pointer h-2 bg-pink-200 rounded-lg"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
                <span>22 Days</span>
                <span className="font-bold text-gray-600">28 Days (Standard)</span>
                <span>40 Days</span>
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
                  <span>Calculating due date...</span>
                </>
              ) : (
                <>
                  <span>See results</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-flo-50/70 border border-pink-100 flex items-start gap-2.5 text-xs text-gray-600">
            <AlertCircle className="w-4 h-4 text-flo-500 shrink-0 mt-0.5" />
            <span>
              <strong>Delivery Fact:</strong> Only 4% to 5% of babies deliver precisely on their calculated due date. Most arrive safely within 2 weeks before or after.
            </span>
          </div>

        </div>

        {/* Right Column: Calculated Results & Fruit Visual (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6" ref={resultsRef}>
          
          {!hasCalculated ? (
            /* Flo-inspired Engaging Initial Preview State */
            <div className="bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 rounded-3xl p-8 sm:p-12 border-2 border-dashed border-pink-200 text-center flex flex-col items-center justify-center min-h-[460px] space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-pink-100 text-flo-600 flex items-center justify-center relative">
                <Baby className="w-10 h-10 text-flo-500 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-flo-500"></span>
                </span>
              </div>

              <div className="max-w-md space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Ready to Calculate Your Due Date
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Provide your last period start date or conception date on the left and click <strong className="text-flo-600">"See results"</strong> to estimate delivery date and baby size.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-flo-500 shrink-0 ring-2 ring-pink-200" />
                  <span className="text-xs font-bold text-gray-800">Estimated Due Date</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-200" />
                  <span className="text-xs font-bold text-gray-800">Current Gestational Age</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 ring-2 ring-emerald-200" />
                  <span className="text-xs font-bold text-gray-800">Trimester Stage</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-purple-400 shrink-0 ring-2 ring-purple-200" />
                  <span className="text-xs font-bold text-gray-800">Baby Size Fruit Comparison</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-medium">
                Standard American College of Obstetricians and Gynecologists (ACOG) guidelines
              </p>
            </div>
          ) : results && (
            <div className="bg-gradient-to-br from-flo-50 via-white to-pink-50/60 rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-sm space-y-6 animate-fadeIn">
              
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider bg-white text-flo-700 border-pink-200 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Estimated Delivery Date</span>
                </div>

                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                  {results.dueDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  Calculated based on a 40-week gestational model
                </p>
              </div>

              {/* Progress Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                <div className="p-4 bg-white rounded-2xl border border-pink-100 shadow-2xs">
                  <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Gestational Age</span>
                  <span className="text-xl sm:text-2xl font-black text-gray-900 mt-1 block">
                    {results.weeks} Weeks, {results.days} Days
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 block">
                    {(40 - results.weeks) > 0 ? `${(40 - results.weeks)} weeks remaining` : 'Full term reached'}
                  </span>
                </div>

                <div className="p-4 bg-white rounded-2xl border border-pink-100 shadow-2xs">
                  <span className="text-xs text-gray-400 font-bold block uppercase tracking-wider">Current Stage</span>
                  <span className="text-xl sm:text-2xl font-black text-flo-600 mt-1 block">
                    {results.trimester}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 block">
                    Key fetal development milestone
                  </span>
                </div>
              </div>

              {/* Baby Size Visual */}
              <div className="p-5 rounded-2xl bg-white border border-pink-100 flex items-center gap-4 text-left shadow-2xs">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-200 flex items-center justify-center shrink-0 text-3xl shadow-xs">
                  🌱
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900">
                    Baby size: <span className="text-flo-600 font-black">{results.matchedFruit.fruit}</span>
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {results.matchedFruit.desc}
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

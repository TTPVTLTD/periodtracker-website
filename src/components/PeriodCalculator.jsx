'use client';

import React, { useState, useMemo, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  Sparkles, 
  Heart, 
  Clock, 
  Info, 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight,
  Share2,
  Check,
  Zap,
  HelpCircle,
  ArrowDown,
  Activity,
  CheckCircle2
} from 'lucide-react';

export default function PeriodCalculator() {
  const getInitialDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d.toISOString().split('T')[0];
  };

  const [lastPeriodDate, setLastPeriodDate] = useState(getInitialDate());
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [calendarMonthOffset, setCalendarMonthOffset] = useState(0);
  const resultsRef = useRef(null);

  // Calculations
  const calculations = useMemo(() => {
    if (!lastPeriodDate) return null;

    const startDate = new Date(lastPeriodDate + 'T00:00:00');
    if (isNaN(startDate.getTime())) return null;

    const nextPeriodStart = new Date(startDate);
    nextPeriodStart.setDate(nextPeriodStart.getDate() + Number(cycleLength));

    const nextPeriodEnd = new Date(nextPeriodStart);
    nextPeriodEnd.setDate(nextPeriodEnd.getDate() + Number(periodDuration) - 1);

    const followingPeriodStart = new Date(nextPeriodStart);
    followingPeriodStart.setDate(followingPeriodStart.getDate() + Number(cycleLength));

    const ovulationDate = new Date(nextPeriodStart);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let currentPhase = 'Follicular Phase';
    let phaseBadgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
    let phaseDescription = 'Estrogen is steadily rising, boosting your physical energy and mental focus.';
    let chanceOfPregnancy = 'Low';

    if (diffDays >= 1 && diffDays <= Number(periodDuration)) {
      currentPhase = 'Menstrual Phase';
      phaseBadgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
      phaseDescription = 'Your body is shedding the uterine lining. Rest, stay hydrated, and nourish with iron.';
      chanceOfPregnancy = 'Very Low';
    } else if (today >= fertileStart && today <= fertileEnd) {
      if (today.getTime() === ovulationDate.getTime()) {
        currentPhase = 'Ovulation Day (Peak)';
        phaseBadgeColor = 'bg-amber-100 text-amber-900 border-amber-300';
        phaseDescription = 'An egg has been released from your ovary! Today is the pinnacle moment of your fertility.';
        chanceOfPregnancy = 'Peak (Highest)';
      } else {
        currentPhase = 'Fertile Window';
        phaseBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
        phaseDescription = 'High chances of conception. Cervical fluid is becoming clear, wet, and stretchy.';
        chanceOfPregnancy = 'High';
      }
    } else if (today > fertileEnd && today < nextPeriodStart) {
      currentPhase = 'Luteal Phase';
      phaseBadgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
      phaseDescription = 'Progesterone is elevated. Keep active with gentle walks, and prioritize restful sleep.';
      chanceOfPregnancy = 'Low';
    }

    return {
      startDate,
      nextPeriodStart,
      nextPeriodEnd,
      followingPeriodStart,
      ovulationDate,
      fertileStart,
      fertileEnd,
      diffDays,
      currentPhase,
      phaseBadgeColor,
      phaseDescription,
      chanceOfPregnancy
    };
  }, [lastPeriodDate, cycleLength, periodDuration]);

  // Click on "See results"
  const handleCalculate = async () => {
    setIsCalculating(true);
    
    // Brief realistic calculation delay for medical simulation feel
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

  const copySummary = () => {
    if (!calculations) return;
    const text = `🌸 My Cycle Summary (Period Tracker & Ovulation Cycle):\n- Next Period: ${calculations.nextPeriodStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n- Estimated Ovulation: ${calculations.ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}\n- Fertile Window: ${calculations.fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${calculations.fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}\n- Average Cycle: ${cycleLength} days`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Calendar Day Generation
  const calendarDays = useMemo(() => {
    if (!calculations) return null;

    const baseDate = new Date(calculations.nextPeriodStart);
    baseDate.setMonth(baseDate.getMonth() + calendarMonthOffset);
    baseDate.setDate(1);

    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ empty: true, key: `empty-${i}` });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      currentDate.setHours(0, 0, 0, 0);

      const time = currentDate.getTime();
      const nextStart = new Date(calculations.nextPeriodStart);
      nextStart.setHours(0,0,0,0);
      const nextEnd = new Date(calculations.nextPeriodEnd);
      nextEnd.setHours(0,0,0,0);

      const ovDate = new Date(calculations.ovulationDate);
      ovDate.setHours(0,0,0,0);

      const fertileStart = new Date(calculations.fertileStart);
      fertileStart.setHours(0,0,0,0);
      const fertileEnd = new Date(calculations.fertileEnd);
      fertileEnd.setHours(0,0,0,0);

      const origStart = new Date(calculations.startDate);
      origStart.setHours(0,0,0,0);
      const origEnd = new Date(origStart);
      origEnd.setDate(origEnd.getDate() + Number(periodDuration) - 1);

      let status = 'normal';
      let label = 'Normal cycle day';

      if (time >= origStart.getTime() && time <= origEnd.getTime()) {
        status = 'period-past';
        label = 'Past Period Bleeding';
      } else if (time >= nextStart.getTime() && time <= nextEnd.getTime()) {
        status = 'period-next';
        label = 'Predicted Next Period';
      } else if (time === ovDate.getTime()) {
        status = 'ovulation';
        label = 'Ovulation Day (Egg Released)';
      } else if (time >= fertileStart.getTime() && time <= fertileEnd.getTime()) {
        status = 'fertile';
        label = 'Fertile Window (High Chance)';
      }

      const isToday = new Date().setHours(0,0,0,0) === time;

      days.push({
        day,
        date: currentDate,
        status,
        label,
        isToday,
        key: `day-${year}-${month}-${day}`
      });
    }

    return {
      monthName: baseDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      days
    };
  }, [calculations, calendarMonthOffset, periodDuration]);

  return (
    <div className="w-full">
      {/* Main Grid: Left is Form with 'See results' Button, Right is Results & Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form & Inputs (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-pink-200/90 shadow-sm space-y-6">
          
          <div className="flex items-center gap-3 pb-4 border-b border-pink-100">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-flo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Cycle Details</h3>
              <p className="text-xs text-gray-500">Instant ovulation & period prediction</p>
            </div>
          </div>

          {/* Input 1: Last Period Date */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              First day of your last period
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl bg-white border border-gray-300 text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-flo-500 focus:border-transparent transition-all shadow-xs text-base"
            />
            <p className="text-xs text-gray-500 mt-1.5">
              The date you first noticed regular menstrual bleeding.
            </p>
          </div>

          {/* Input 2: Cycle Length */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-800">
                Average Cycle Length
              </label>
              <span className="px-3 py-1 bg-flo-50 rounded-full text-flo-600 font-bold text-sm border border-pink-200 shadow-xs">
                {cycleLength} Days
              </span>
            </div>
            <input
              type="range"
              min="21"
              max="45"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full accent-flo-500 cursor-pointer h-2 bg-pink-200 rounded-lg"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
              <span>21 Days</span>
              <span className="font-bold text-gray-600">28 Days (Average)</span>
              <span>45 Days</span>
            </div>
          </div>

          {/* Input 3: Period Duration */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-gray-800">
                Period Duration (Bleeding Days)
              </label>
              <span className="px-3 py-1 bg-flo-50 rounded-full text-flo-600 font-bold text-sm border border-pink-200 shadow-xs">
                {periodDuration} Days
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              value={periodDuration}
              onChange={(e) => setPeriodDuration(Number(e.target.value))}
              className="w-full accent-flo-500 cursor-pointer h-2 bg-pink-200 rounded-lg"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 font-medium">
              <span>3 Days</span>
              <span className="font-bold text-gray-600">5 Days</span>
              <span>10 Days</span>
            </div>
          </div>

          {/* Common Presets */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Quick Cycle Presets:</p>
            <div className="grid grid-cols-3 gap-2">
              {[26, 28, 30].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setCycleLength(days)}
                  className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                    cycleLength === days 
                      ? 'bg-flo-600 text-white border-flo-600 shadow-xs' 
                      : 'bg-white text-gray-700 border-gray-200 hover:border-flo-300'
                  }`}
                >
                  {days} Days
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
                  <span>Calculating your cycle...</span>
                </>
              ) : (
                <>
                  <span>See results</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </>
              )}
            </button>
          </div>

          {/* Privacy note */}
          <div className="p-3.5 rounded-2xl bg-flo-50/70 border border-pink-100 flex items-start gap-2.5 text-xs text-gray-600">
            <Info className="w-4 h-4 text-flo-500 shrink-0 mt-0.5" />
            <span>
              <strong>100% In-Browser Privacy:</strong> Your menstrual dates are processed locally inside this browser and are never transmitted to any external server.
            </span>
          </div>

        </div>

        {/* Right Column: Calculated Results & Clean Calendar (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6" ref={resultsRef}>
          
          {!hasCalculated ? (
            /* Flo-inspired Engaging Initial Preview State */
            <div className="bg-gradient-to-br from-pink-50/70 via-white to-rose-50/40 rounded-3xl p-8 sm:p-12 border-2 border-dashed border-pink-200 text-center flex flex-col items-center justify-center min-h-[460px] space-y-6">
              <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-pink-100 text-flo-600 flex items-center justify-center relative">
                <Sparkles className="w-10 h-10 text-flo-500 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-flo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-flo-500"></span>
                </span>
              </div>

              <div className="max-w-md space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
                  Ready to Predict Your Cycle
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Enter your period details on the left and click <strong className="text-flo-600">"See results"</strong> to reveal your ovulation date, peak fertility window, and personalized monthly calendar.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg text-left">
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 ring-2 ring-amber-200" />
                  <span className="text-xs font-bold text-gray-800">Peak Ovulation Day</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 ring-2 ring-emerald-200" />
                  <span className="text-xs font-bold text-gray-800">6-Day Fertile Window</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#f43f77] shrink-0 ring-2 ring-pink-200" />
                  <span className="text-xs font-bold text-gray-800">Upcoming Period Forecast</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-pink-100 shadow-2xs flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-purple-400 shrink-0 ring-2 ring-purple-200" />
                  <span className="text-xs font-bold text-gray-800">Interactive Monthly Calendar</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-medium">
                Predictive cycle modeling based on your menstrual dates and averages
              </p>
            </div>
          ) : calculations && (
            <div className="space-y-6 animate-fadeIn">
              {/* 3 Result Highlights - Clean responsive grid with unbreakable spacing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                
                {/* Next Period */}
                <div className="bg-gradient-to-br from-flo-50 to-pink-100/70 rounded-3xl p-5 border border-flo-200 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-flo-700 flex items-center gap-1.5 truncate">
                    <CalendarIcon className="w-3.5 h-3.5 text-flo-500 shrink-0" />
                    Next Period
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mt-2 truncate">
                    {calculations.nextPeriodStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-snug">
                    Bleeding runs until {calculations.nextPeriodEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>

                {/* Ovulation Day */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/70 rounded-3xl p-5 border border-amber-300 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 truncate">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    Ovulation Day
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-amber-950 mt-2 truncate">
                    {calculations.ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </h4>
                  <p className="text-xs text-amber-800 mt-1 font-medium leading-snug">
                    Egg release (Peak fertility)
                  </p>
                </div>

                {/* Fertile Window */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-100/70 rounded-3xl p-5 border border-emerald-300 shadow-xs flex flex-col justify-between min-w-0">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 truncate">
                    <Heart className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Fertile Window
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-emerald-950 mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {calculations.fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {calculations.fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1 font-medium leading-snug">
                    6 Days favorable for conception
                  </p>
                </div>

              </div>

              {/* Today's Phase Banner */}
              <div className="p-5 rounded-3xl bg-white border border-pink-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Cycle Status</span>
                    <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${calculations.phaseBadgeColor}`}>
                      {calculations.currentPhase}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {calculations.phaseDescription}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copySummary}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-flo-50 hover:bg-flo-100 text-flo-700 border border-flo-200 transition-colors shrink-0 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* Clean, Polished Interactive Calendar Grid */}
              {calendarDays && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-sm space-y-6">
                  
                  {/* Calendar Month Header & Switcher */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-flo-100 text-flo-600 flex items-center justify-center">
                        <CalendarDays className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg">
                        {calendarDays.monthName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setCalendarMonthOffset(calendarMonthOffset - 1)}
                        className="p-2 rounded-xl border border-gray-200 hover:bg-flo-50 hover:border-pink-300 text-gray-600 transition-colors"
                        title="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalendarMonthOffset(0)}
                        className="px-3 py-1.5 text-xs font-bold text-flo-600 hover:bg-flo-50 rounded-xl border border-pink-200 transition-colors"
                      >
                        Predicted Month
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalendarMonthOffset(calendarMonthOffset + 1)}
                        className="p-2 rounded-xl border border-gray-200 hover:bg-flo-50 hover:border-pink-300 text-gray-600 transition-colors"
                        title="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day of week headers */}
                  <div className="grid grid-cols-7 text-center font-bold text-xs text-gray-400 pb-2 border-b border-gray-100">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* Clean Days Grid */}
                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {calendarDays.days.map((item) => {
                      if (item.empty) {
                        return <div key={item.key} className="h-10 sm:h-12" />;
                      }

                      let bgClass = 'bg-gray-50/70 text-gray-700 hover:bg-gray-100';
                      let dot = null;

                      if (item.status === 'period-past') {
                        bgClass = 'bg-rose-100 text-rose-900 font-bold border border-rose-200';
                      } else if (item.status === 'period-next') {
                        bgClass = 'bg-[#f43f77] text-white font-black shadow-sm';
                        dot = <span className="w-1.5 h-1.5 rounded-full bg-white absolute bottom-1.5" />;
                      } else if (item.status === 'ovulation') {
                        bgClass = 'bg-amber-400 text-amber-950 font-black ring-2 ring-amber-500 shadow-sm';
                        dot = <span className="w-1.5 h-1.5 rounded-full bg-amber-900 absolute bottom-1.5" />;
                      } else if (item.status === 'fertile') {
                        bgClass = 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-200';
                      }

                      const todayRing = item.isToday ? 'ring-2 ring-flo-600 ring-offset-2' : '';

                      return (
                        <div
                          key={item.key}
                          title={`${item.label} (${item.date.toDateString()})`}
                          className={`h-10 sm:h-12 rounded-2xl flex flex-col items-center justify-center relative text-xs sm:text-sm cursor-pointer transition-all ${bgClass} ${todayRing}`}
                        >
                          <span>{item.day}</span>
                          {dot}
                        </div>
                      );
                    })}
                  </div>

                  {/* Clear, High-Contrast Legend */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-gray-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-lg bg-[#f43f77] shadow-xs" />
                      <span className="font-semibold text-gray-800">Next Period</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-lg bg-amber-400 ring-1 ring-amber-500" />
                      <span className="font-semibold text-gray-800">Ovulation Day</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-lg bg-emerald-100 border border-emerald-300" />
                      <span className="font-semibold text-gray-800">Fertile Window</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-lg bg-rose-100 border border-rose-200" />
                      <span className="text-gray-600">Past Bleed</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

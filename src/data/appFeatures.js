/**
 * ========================================================================
 * PERIOD TRACKER & OVULATION CYCLE - APP FEATURES DATABASE
 * ========================================================================
 * Comprehensive data for all 6 flagship mobile app features with
 * app screenshots and real-time encrypted cloud sync.
 * ========================================================================
 */

export const APP_FEATURES = [
  {
    id: "cycle-tracking",
    slug: "cycle-tracking",
    badge: "Core Predictor",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    title: "Dynamic Cycle & Flow Predictor",
    subtitle: "Adaptive rolling algorithms that model your personal cycle rhythm with precision.",
    image: "/images/app/app-screen-1.png",
    widget: {
      category: "Cycle Telemetry",
      title: "Day 14 • Follicular Peak",
      badge: "98% Confidence",
      metricLabel: "Next Period Expected In",
      metricValue: "14 Days",
      subtext: "Rolling average calibrated from your last 4 cycles",
      highlightPill: "Normal Flow (Medium)"
    },
    overview: "Your menstrual cycle is as unique as your fingerprint. Instead of forcing your body into a generic 28-day textbook formula, our predictive engine dynamically recalibrates using rolling data from your last 3 to 12 cycles. It separates your variable follicular phase from your consistent luteal phase, delivering reliable forecasts for period onsets, flow intensity, and expected cycle length.",
    bullets: [
      "Rolling Average Recalibration: Self-corrects each time you log a new period date to reflect recent physiological trends.",
      "Flow Intensity Spectrum: Record Spotting, Light, Medium, and Heavy flow to track volume variations across cycles.",
      "Outlier Rejection Intelligence: Prevents anomalous cycles caused by temporary stress or travel from skewing your future forecast.",
      "PMS Warning Horizon: Receive subtle, private reminders 3–5 days prior to anticipated premenstrual physical shifts."
    ],
    highlight: "85%+ accuracy in predicting period onset after just 3 logged cycles.",
    accent: "rose"
  },
  {
    id: "ovulation-radar",
    slug: "ovulation-radar",
    badge: "Fertility Intelligence",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    title: "Fertile Window & Ovulation Radar",
    subtitle: "Gamete viability modeling and biomarker tracking to maximize natural conception chances.",
    image: "/images/app/app-screen-2.png",
    widget: {
      category: "Conception Window",
      title: "Peak Ovulation Window",
      badge: "High Probability",
      metricLabel: "Biphasic Thermal Shift",
      metricValue: "+0.6°F",
      subtext: "Progesterone thermal rise confirmed post-ovulation",
      highlightPill: "Egg-White Fluid Logged"
    },
    overview: "Conception is only biologically viable during a 6-day timeframe each month. Our Ovulation Radar models sperm longevity (up to 120 hours in fertile cervical fluid) and ovum lifespan (12–24 hours post-rupture) to pinpoint your highest probability days. Cross-reference predictions with basal body temperature (BBT) shifts and LH test strip logs for double confirmation.",
    bullets: [
      "6-Day Fertile Window Physics: Identifies the 5 days before ovulation plus ovulation day itself.",
      "Conception Probability Score: Highlights High, Peak, and Low fertility days for optimal intercourse timing.",
      "Cervical Fluid Mapping: Log transitions from dry to creamy, watery, and peak stretchy egg-white fluid.",
      "Biphasic BBT Integration: Confirms post-ovulatory progesterone thermal rise (0.4°F–0.8°F shift)."
    ],
    highlight: "Pinpoints your peak 48-hour conception window with clinical mathematical modeling.",
    accent: "emerald"
  },
  {
    id: "pregnancy-tracker",
    slug: "pregnancy-tracker",
    badge: "Obstetric Tracker",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    title: "Pregnancy & Milestone Tracker",
    subtitle: "Week-by-week anatomical developmental milestones, gestational tracking, and obstetric due date calculations.",
    image: "/images/app/app-screen-3.png",
    widget: {
      category: "Gestational Monitor",
      title: "Week 24 • Second Trimester",
      badge: "Healthy Progression",
      metricLabel: "Fetal Size Comparison",
      metricValue: "Cantaloupe",
      subtext: "Approx 11.8 inches • 1.3 lbs • Auditory response active",
      highlightPill: "Due Date: Nov 18"
    },
    overview: "When you receive a positive test, switch to Pregnancy Mode seamlessly. The app transforms into your daily gestational tracker, computing your estimated due date using Naegele’s rule modified by your personal cycle length. Follow weekly fetal growth comparisons, understand changing maternal physiology, and prepare for each trimester milestone with confidence.",
    bullets: [
      "Naegele's & Parikh's Math: Calculates due date (EDD) customized to your unique follicular phase length.",
      "Weekly Developmental Milestones: Visual fruit and vegetable size comparisons paired with organogenesis milestones.",
      "Trimester Evolution Tracker: Monitor expected physical adjustments, fatigue waves, and blood volume shifts.",
      "Kick Counter & Contraction Log: Essential late-pregnancy monitoring tools built directly into the app."
    ],
    highlight: "Track all 40 gestational weeks with obstetric benchmarks and physiological body guides.",
    accent: "blue"
  },
  {
    id: "ai-reports",
    slug: "ai-reports",
    badge: "Intelligent Analytics",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    title: "Smart AI Health Summaries & Analytics",
    subtitle: "Synthesizing multi-month symptom logs into clean, doctor-ready digital wellness summaries.",
    image: "/images/app/app-screen-4.png",
    widget: {
      category: "Clinical Analytics",
      title: "Gynecological PDF Export",
      badge: "Doctor-Ready",
      metricLabel: "Symptom Correlation",
      metricValue: "94% Clean",
      subtext: "Luteal phase duration verified healthy at 13 days",
      highlightPill: "Doctor-Ready PDF"
    },
    overview: "Gone are the days of trying to remember when your cramps started during a quick doctor's visit. Our intelligent AI engine processes your logged dates, pain intensities, emotional changes, and energy levels into structured monthly health summaries. Spot recurring patterns across 3, 6, and 12 months, and export clean PDF summaries to share with your gynecologist.",
    bullets: [
      "Symptom Clustering Analytics: Uncovers whether headaches, bloating, or fatigue correlate with specific phases.",
      "Doctor-Ready PDF Export: Beautifully formatted reports in standard clinical gynecological terminology.",
      "Hormonal Anomaly Alerts: Identifies luteal phase defects (under 10 days) or sudden cycle length deviations.",
      "Private Algorithmic Processing: Advanced neural models synthesize multi-month cycle logs without exposing your data to third-party ad networks."
    ],
    highlight: "End-to-end encrypted architecture — your comprehensive health summaries are generated securely without third-party data selling.",
    accent: "purple"
  },
  {
    id: "ayurveda-care",
    slug: "ayurveda-care",
    badge: "Holistic Remedies",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    title: "Holistic Ayurveda & Cramp Care Module",
    subtitle: "Time-tested kitchen herbs, dosha balancing, and gentle natural remedies for cycle comfort.",
    image: "/images/app/app-screen-5.png",
    widget: {
      category: "Natural Kitchen Care",
      title: "CCF Cramp Soothing Brew",
      badge: "Fast Relief",
      metricLabel: "Apana Vata Balance",
      metricValue: "Optimal",
      subtext: "Ginger, Cumin, Coriander & Ajwain herbal decoction",
      highlightPill: "15-20 Min Relief"
    },
    overview: "In Ayurveda, the menstrual cycle (Artava Chakra) is a sacred monthly detoxification governed by Apana Vata. When stress or diet aggravates Vata or Pitta, cramps and heavy bleeding arise. Our dedicated in-app module provides step-by-step preparations for soothing kitchen herbal teas, castor oil warmth rituals, and cycle-synced nutrition tailored to your body type.",
    bullets: [
      "Instant Herbal Tea Recipes: Quick-brewing instructions for ginger-ajwain, CCF (cumin-coriander-fennel), and chamomile.",
      "Seed Cycling Protocol: Flax & pumpkin seeds in follicular phase; sesame & sunflower seeds in luteal phase.",
      "Castor Oil Pelvic Packs: Step-by-step guidance on external castor oil applications to ease pelvic congestion.",
      "Dosha Self-Assessment: Identify whether your symptoms are Vata (spasmodic), Pitta (inflammatory), or Kapha (congestive)."
    ],
    highlight: "Over 50 gentle, natural kitchen home remedies formulated for dysmenorrhea and bloating.",
    accent: "amber"
  },
  {
    id: "privacy-vault",
    slug: "privacy-vault",
    badge: "Security & Privacy",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
    title: "Encrypted Privacy Vault & Data Sanctuary",
    subtitle: "Your intimate cycle milestones belong to you — end-to-end encrypted with zero third-party advertising tracking.",
    image: "/images/about/black-woman-mobile.jpg",
    widget: {
      category: "Data Protection",
      title: "End-to-End Encrypted Cloud Vault",
      badge: "Zero-Knowledge",
      metricLabel: "Third-Party Ad Pixels",
      metricValue: "0 Trackers",
      subtext: "Protected by military-grade encryption and biometric authentication",
      highlightPill: "Encrypted Sync"
    },
    overview: "In an era where personal health logs are frequently tracked by ad networks and third-party data brokers, Period Tracker is built on a non-negotiable principle: your reproductive records belong solely to you. Your data is protected by end-to-end encryption with seamless real-time cloud synchronization, ensuring your history is accessible across your devices while remaining completely shielded from advertisers.",
    bullets: [
      "Zero Ad Profiling: We never sell your cycle dates, symptoms, or intimate notes to data brokers or ad networks.",
      "Seamless Encrypted Cloud Sync: Real-time synchronization keeps your cycle, fertility, and pregnancy logs up-to-date across all your devices.",
      "Biometric App Lock: Secure the app on your phone using Face ID, Touch ID, or a custom PIN code.",
      "Instant One-Tap Erasure: Delete your entire account and cycle history permanently from our servers and device anytime with a single tap."
    ],
    highlight: "End-to-end encrypted cloud sync with zero third-party advertising tracking.",
    accent: "teal"
  }
];

export const APP_FEATURES_FAQS = [
  {
    question: "How does real-time synchronization keep my data secure?",
    answer: "Period Tracker synchronizes your cycle records, ovulation calculations, pregnancy milestones, and symptoms in real-time using end-to-end encryption. Your data is strictly private to your account and never shared with advertising brokers."
  },
  {
    question: "How is Period Tracker different from standard cycle tracking apps?",
    answer: "Unlike typical apps that monetize your intimate reproductive logs with third-party tracking pixels, Period Tracker provides strict data encryption with zero ad trackers. It also uniquely integrates a dedicated Ayurveda and herbal remedies module alongside advanced AI health reports and full pregnancy tracking."
  },
  {
    question: "Can I access my cycle data if I switch to a new phone?",
    answer: "Yes! Simply sign in to your account on your new device and all your cycle logs, custom symptoms, and pregnancy history will immediately synchronize securely."
  },
  {
    question: "Are the core tracking features free?",
    answer: "Yes, absolutely. Daily cycle logging, ovulation predictions, period calendar calculations, pregnancy milestone tracking, and essential home remedies are completely free to use."
  }
];

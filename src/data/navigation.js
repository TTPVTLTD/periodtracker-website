export const TOP_NAV_MENUS = [
   {
    id: "home",
    name: "Home",
    href: "/",
   },
  {
    id: "features",
    name: "App Features",
    href: "/app-features",
    // dropdown: [
    //   {
    //     name: "Cycle & Flow Predictor",
    //     href: "/app-features#cycle-tracking"
    //   },
    //   {
    //     name: "Ovulation & Fertility Radar",
    //     href: "/app-features#ovulation-radar"
    //   },
    //   {
    //     name: "Pregnancy & Milestone Tracker",
    //     href: "/app-features#pregnancy-tracker"
    //   },
    //   {
    //     name: "Smart AI Health Summaries",
    //     href: "/app-features#ai-reports"
    //   },
    //   {
    //     name: "Ayurveda & Cramp Care",
    //     href: "/app-features#ayurveda-care"
    //   },
    //   {
    //     name: "Encrypted Privacy Vault",
    //     href: "/app-features#privacy-vault",
    //     badge: "Encrypted"
    //   }
    // ]
  },
  {
    id: "health-library",
    name: "Wellness Hub",
    href: "/wellness-hub",
    dropdown: [
      {
        name: "Your Cycle (Periods & PMS)",
        href: "/wellness-hub?category=period"
      },
      {
        name: "Health 360° (Hormones & Care)",
        href: "/wellness-hub?category=wellness"
      },
      {
        name: "Getting Pregnant (Fertility & Ovulation)",
        href: "/wellness-hub?category=ovulation"
      },
      {
        name: "Pregnancy (Milestones & Signs)",
        href: "/wellness-hub?category=pregnancy"
      },
      {
        name: "Ayurveda & Cramp Care",
        href: "/wellness-hub?category=ayurveda"
      }
    ]
  },
  {
    id: "calculators",
    name: "Cycle Tools",
    href: "/calculators",
    isCalculatorsMenu: true // renders the 8 specialized calculators from calculators.js
  },
  // {
  //   id: "about",
  //   name: "About Us",
  //   href: "/about",
    // dropdown: [
    //   {
    //     name: "About TrackFlow",
    //     href: "/about"
    //   },
    //   {
    //     name: "Predictive Cycle Science",
    //     href: "/about/science-and-research"
    //   },
    //   {
    //     name: "Smart AI Cycle Reports",
    //     href: "/about/ai-reports"
    //   },
    //   {
    //     name: "Holistic Ayurvedic Care",
    //     href: "/about/ayurveda-care"
    //   },
    //   {
    //     name: "Data Privacy Policy",
    //     href: "/privacy",
    //     badge: "100% Private"
    //   },
    //   {
    //     name: "Frequently Asked Questions",
    //     href: "/faq"
    //   },
    //   {
    //     name: "Contact & Support",
    //     href: "/contact"
    //   }
    // ]
  // }
];

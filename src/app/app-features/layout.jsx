export const metadata = {
  title: 'Mobile App Features & Cycle Tools | Period Tracker',
  description: 'Explore the 6 flagship mobile app features: predictive cycle engine, fertility radar, pregnancy milestones, smart AI summaries, and private encrypted vault.',
  keywords: [
    'period tracker app features',
    'ovulation radar app',
    'pregnancy tracker app',
    'ai health summaries',
    'ayurveda cramp relief app',
    'private period tracker'
  ],
  alternates: {
    canonical: 'https://trackperiods.com/app-features',
  },
  openGraph: {
    title: 'Mobile App Features & Cycle Tools | Period Tracker',
    description: 'Explore the 6 flagship mobile app features: predictive cycle engine, fertility radar, pregnancy milestones, and private encrypted vault.',
    url: 'https://trackperiods.com/app-features',
    type: 'website',
    images: [
      {
        url: 'https://trackperiods.com/brand-logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Period Tracker Mobile App Features',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile App Features & Cycle Tools | Period Tracker',
    description: 'Explore our mobile app features: predictive cycle engine, fertility radar, pregnancy milestones, and private encrypted vault.',
    images: ['https://trackperiods.com/brand-logo-final.png'],
  },
};

export default function AppFeaturesLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Period Tracker Ovulation Cycle',
    operatingSystem: 'iOS, Android',
    applicationCategory: 'HealthApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: '100% private, on-device cycle tracker, ovulation predictor, and pregnancy companion with biometric lock.',
    url: 'https://trackperiods.com/app-features',
    image: 'https://trackperiods.com/brand-logo-final.png',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

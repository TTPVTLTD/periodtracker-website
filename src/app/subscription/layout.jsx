export const metadata = {
  title: 'Subscription & Premium Plans | Period Tracker',
  description: 'Invest in your daily reproductive wellness. Unlock unlimited AI cycle reports, full Ayurvedic remedy libraries, and advanced prediction models.',
  keywords: [
    'period tracker subscription',
    'premium period tracker',
    'ai health reports membership',
    'ayurvedic cycle care plan',
    'reproductive health subscription'
  ],
  alternates: {
    canonical: 'https://trackperiods.com/subscription',
  },
  openGraph: {
    title: 'Subscription & Premium Plans | Period Tracker',
    description: 'Invest in your reproductive wellness with unlimited AI cycle reports and personalized Ayurvedic remedy modules.',
    url: 'https://trackperiods.com/subscription',
    type: 'website',
    images: [
      {
        url: 'https://trackperiods.com/brand-logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Subscription & Premium Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscription & Premium Plans | Period Tracker',
    description: 'Invest in your reproductive wellness with unlimited AI cycle reports and personalized Ayurvedic remedy modules.',
    images: ['https://trackperiods.com/brand-logo-final.png'],
  },
};

export default function SubscriptionLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Period Tracker Premium Membership',
    description: 'Subscription and pricing plans for Period Tracker Ovulation Cycle.',
    url: 'https://trackperiods.com/subscription',
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

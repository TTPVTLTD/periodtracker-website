export const metadata = {
  title: "Women's Wellness Hub & Health Library | Period Tracker",
  description: "Doctor-backed guides on menstrual cycles, ovulation signs, natural conception, pregnancy milestones, and Ayurvedic cramp relief remedies.",
  keywords: [
    'womens wellness hub',
    'period health articles',
    'ovulation signs',
    'fertile days guide',
    'ayurvedic cramp relief',
    'pregnancy milestones'
  ],
  alternates: {
    canonical: 'https://trackperiods.com/wellness-hub',
  },
  openGraph: {
    title: "Women's Wellness Hub & Health Library | Period Tracker",
    description: "Doctor-backed guides on menstrual cycles, ovulation signs, natural conception, pregnancy milestones, and Ayurvedic cramp relief remedies.",
    url: 'https://trackperiods.com/wellness-hub',
    type: 'website',
    images: [
      {
        url: 'https://trackperiods.com/brand-logo-final.png',
        width: 1200,
        height: 630,
        alt: "Women's Wellness Hub & Health Library",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Women's Wellness Hub & Health Library | Period Tracker",
    description: "Doctor-backed guides on menstrual cycles, ovulation signs, natural conception, pregnancy milestones, and Ayurvedic cramp relief remedies.",
    images: ['https://trackperiods.com/brand-logo-final.png'],
  },
};

export default function WellnessHubLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "Women's Wellness Hub & Reproductive Health Library",
    description: 'Evidence-based guides on menstrual cycles, ovulation detection, natural conception, and holistic wellness.',
    url: 'https://trackperiods.com/wellness-hub',
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

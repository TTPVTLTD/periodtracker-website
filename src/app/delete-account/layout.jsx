export const metadata = {
  title: 'Delete Account & Data | Period Tracker Ovulation Cycle',
  description: 'Request permanent account and health data deletion for the Period Tracker mobile app in compliance with Google Play and Apple data safety policies.',
  alternates: {
    canonical: 'https://trackperiods.com/delete-account',
  },
  openGraph: {
    title: 'Delete Account & Data | Period Tracker Ovulation Cycle',
    description: 'Request permanent account and health data deletion for the Period Tracker mobile app in compliance with Google Play and Apple data safety policies.',
    url: 'https://trackperiods.com/delete-account',
    type: 'website',
    images: [
      {
        url: 'https://trackperiods.com/brand-logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Delete Account & Data Privacy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delete Account & Data | Period Tracker Ovulation Cycle',
    description: 'Request permanent account and health data deletion for the Period Tracker mobile app in compliance with Google Play and Apple data safety policies.',
    images: ['https://trackperiods.com/brand-logo-final.png'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function DeleteAccountLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Delete Account & Data Privacy Portal',
    description: 'Permanent account and personal data deletion request portal for Period Tracker Ovulation Cycle.',
    url: 'https://trackperiods.com/delete-account',
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

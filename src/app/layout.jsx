import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import CookieBanner from '../components/CookieBanner';
import { GoogleAnalytics } from '@next/third-parties/google';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport = {
  themeColor: '#FF5E8C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://trackperiods.com'),
  title: {
    default: 'Period Tracker Ovulation Cycles | Smart Cycle Calendar',
    template: '%s',
  },
  description: 'Period Tracker Ovulation Cycles is your 100% private companion to track periods, calculate fertile ovulation days, and monitor menstrual health effortlessly.',
  keywords: [
    'Period Tracker Ovulation Cycles',
    'period date calculator',
    'safe period calculator',
    'safe days to avoid pregnancy',
    'ovulation calculator for pregnancy',
    'irregular period tracker',
    'pcos cycle tracker',
    'best days to get pregnant',
    'free period tracker app india',
    'menstrual cycle calendar'
  ],
  authors: [{ name: 'Period Tracker Ovulation Cycle Team' }],
  creator: 'Period Tracker Ovulation Cycle',
  publisher: 'Period Tracker Ovulation Cycle',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  itunes: {
    appId: '6774117828',
  },
  openGraph: {
    title: 'Period Tracker Ovulation Cycles | Smart Cycle Calendar',
    description: 'Track your menstrual cycle, predict your next period and peak ovulation days with the Period Tracker Ovulation Cycle app.',
    url: 'https://trackperiods.com',
    siteName: 'Period Tracker Ovulation Cycle',
    images: [
      {
        url: 'https://trackperiods.com/brand-logo-final.png',
        width: 1200,
        height: 630,
        alt: 'Period Tracker Ovulation Cycle App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Period Tracker Ovulation Cycle',
    description: '100% private in-browser menstrual cycle, ovulation, and pregnancy milestone tracking.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'dw-5G220K4G8AzdxGAnJi1e9GKmwfVL4E4gxqGe2bSw',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth font-sans`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Period Tracker & Ovulation Cycle',
              url: 'https://trackperiods.com',
              description: 'Free, simple, and accurate menstrual cycle, ovulation, and pregnancy tracking platform with 100% in-browser privacy.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://trackperiods.com/wellness-hub?category={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
              speakable: {
                '@type': 'SpeakableSpecification',
                cssSelector: ['h1', 'h2', 'p', '.speakable-summary'],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Period Tracker & Ovulation Cycle',
              legalName: 'Tracewave Transparency Private Limited',
              url: 'https://trackperiods.com',
              logo: 'https://trackperiods.com/brand-logo-final.png',
              sameAs: [
                'https://apps.apple.com/app/id6774117828',
                'https://play.google.com/store/apps/details?id=com.tracewave.period',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Period Tracker & Ovulation Cycle',
              operatingSystem: 'iOS, Android, Web Browser',
              applicationCategory: 'HealthApplication',
              applicationSubCategory: 'Menstrual Cycle & Ovulation Tracker',
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              softwareVersion: '2.4',
              screenshot: 'https://trackperiods.com/brand-logo-final.png',
              featureList: [
                'Smart Cycle & Period Prediction',
                'Ovulation & Peak Fertile Window Detection',
                'Symptom, BBT & Mood Logging',
                'Ayurvedic Remedy & Holistic Care Hub',
                '100% On-Device Private & Encrypted Health Logs',
              ],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '500000',
                bestRating: '5',
                worstRating: '1',
              },
            }),
          }}
        />
      </head>
      <body className={`${plusJakartaSans.className} min-h-screen flex flex-col bg-[#FAF8F9] text-[#1A1819] antialiased selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C] font-sans`}>
        {children}
        <CookieBanner />
        <GoogleAnalytics gaId="G-XT1YPH9XL8" />
      </body>
    </html>
  );
}

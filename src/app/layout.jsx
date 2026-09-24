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
      </head>
      <body className={`${plusJakartaSans.className} min-h-screen flex flex-col bg-[#FAF8F9] text-[#1A1819] antialiased selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C] font-sans`}>
        {children}
        <CookieBanner />
        <GoogleAnalytics gaId="G-XT1YPH9XL8" />
      </body>
    </html>
  );
}

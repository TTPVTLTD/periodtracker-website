import './globals.css';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';

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

export const metadata = {
  metadataBase: new URL('https://periodtracker.online'),
  title: {
    default: 'Period Tracker & Ovulation Calculator - Cycle Calendar',
    template: '%s',
  },
  description: 'Track your period, calculate fertile ovulation days, and log cycle symptoms with 100% privacy. Free, simple, and accurate menstrual health companion.',
  keywords: [
    'period tracker',
    'ovulation calculator',
    'menstrual cycle',
    'fertility tracker',
    'period calendar',
    'safe days to avoid pregnancy'
  ],
  authors: [{ name: 'Period Tracker Editorial Team' }],
  creator: 'Period Tracker & Ovulation Cycle',
  publisher: 'Period Tracker & Ovulation Cycle',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Period Tracker & Ovulation Cycle | Women\'s Health & Fertility Platform',
    description: 'Track your menstrual cycle, predict your next period and peak ovulation days, and explore doctor-reviewed health guides.',
    url: 'https://periodtracker.online',
    siteName: 'Period Tracker & Ovulation Cycle',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Period Tracker & Ovulation Cycle',
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable} scroll-smooth font-sans`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={`${plusJakartaSans.className} min-h-screen flex flex-col bg-[#FAF8F9] text-[#1A1819] antialiased selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C] font-sans text-base`}>
        {children}
      </body>
    </html>
  );
}

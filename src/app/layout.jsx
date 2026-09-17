import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Period Tracker & Ovulation Cycle | Women\'s Health & Fertility Platform',
  description: 'Track your menstrual cycle, predict your next period and peak ovulation days, and explore doctor-reviewed health guides. Flo-inspired, 100% private in-browser tracking.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} scroll-smooth font-sans`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={`${plusJakartaSans.className} min-h-screen flex flex-col bg-[#fff9fb] text-gray-900 antialiased selection:bg-flo-200 selection:text-flo-900 font-sans`}>
        {children}
      </body>
    </html>
  );
}

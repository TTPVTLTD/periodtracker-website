import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { 
  Database, 
  Activity, 
  EyeOff, 
  Lock, 
  Clock, 
  UserCheck, 
  Mail, 
  AlertTriangle,
  ShieldCheck,
  LockKeyhole,
  Heading2
} from 'lucide-react';

export const metadata = {
  title: 'App Privacy Policy | Period Tracker Ovulation Cycle',
  description: 'Privacy Policy for the Period Tracker Ovulation Cycle mobile application. Learn how we collect, use, and safeguard your health and cycle data.',
  alternates: {
    canonical: 'https://trackperiods.com/app-privacy',
  },
};

export default function AppPrivacyPage() {
  const jumpLinks = [
    { id: 'information-we-collect', label: '1. Info We Collect' },
    { id: 'how-we-use-your-information', label: '2. How We Use It' },
    { id: 'data-sharing', label: '3. Data Sharing' },
    { id: 'data-security', label: '4. Data Security' },
    { id: 'data-retention', label: '5. Data Retention' },
    { id: 'user-rights', label: '6. User Rights & Deletion' },
    { id: 'contact-us', label: '7. Contact Us' },
    { id: 'medical-disclaimer', label: '8. Medical Disclaimer' },
    { id: 'gdpr-ccpa', label: '9. GDPR / CCPA' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FAF8F9] to-white selection:bg-[#FF5E8C]/20 selection:text-[#FF5E8C] scroll-smooth">
      <Navbar />

      <main className="flex-1 w-full relative pb-8 sm:pb-12">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#FF5E8C]/10 rounded-full blur-3xl opacity-70 animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#FF8C69]/10 rounded-full blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Header Section */}
        <div className="relative pt-6 sm:pt-10 pb-4 px-4 sm:px-6 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#FF5E8C]/20 text-[#FF5E8C] font-bold text-xs uppercase tracking-wider mx-auto shadow-sm transition-transform hover:scale-105">
              <ShieldCheck className="w-4 h-4" />
              <span>Mobile App Policy</span>
            </div>
            <h1 className="font-bold text-[#1A1819]">
              App Privacy Policy
            </h1>
            <p className="text-sm sm:text-base text-[#706B6E] max-w-2xl mx-auto font-medium">
              This Privacy Policy explains how we protect, store, and process your cycle metrics inside the mobile application.
            </p>
            <div className="text-sm font-bold text-gray-400">Last Updated: June 22, 2026</div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-5 flex flex-col lg:flex-row gap-10 relative z-10">
          
          {/* Sidebar Jump Navigation (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28 bg-white/90 backdrop-blur-xl rounded-2xl border border-[#FF5E8C]/15 p-5 shadow-lg shadow-pink-900/5">
              <h3 className="text-xs font-bold text-gray-500 uppercase mb-4 tracking-wider">Quick Navigation</h3>
              <nav className="space-y-1">
                {jumpLinks.map(link => (
                  <a key={link.id} href={`#${link.id}`} className="block px-3 py-2 text-sm font-medium text-[#706B6E] rounded-lg hover:bg-pink-50 hover:text-[#FF5E8C] transition-colors">
                    {link.label}
                  </a>
                ))}
              </nav>
{/* 
              <div className="mt-8 pt-6 border-t border-pink-50">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1A1819] mb-2">
                  <LockKeyhole className="w-4 h-4 text-emerald-500" />
                  AES-256 Secured
                </div>
                <p className="text-[#706B6E] text-xs font-medium leading-relaxed">Your data remains encrypted and safe inside the application.</p>
              </div> */}
            </div>
          </aside>

          {/* Main Content Card */}
          <div className="flex-1 bg-white/60 backdrop-blur-md rounded-3xl p-6 sm:p-12 shadow-lg shadow-pink-900/5 border border-[#FF5E8C]/15">
            <div className="text-[#706B6E] space-y-8 text-sm sm:text-base font-medium">
              
              <div className="leading-relaxed">
                <p>
                  At <strong className="text-[#1A1819]">Period Tracker Ovulation Cycle</strong> ("App", "we", "our", or "us"), we respect your privacy and are committed to protecting your personal and health data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
                </p>
              </div>

              <hr className="border-gray-100" />

              {/* Section 1 */}
              <div id="information-we-collect" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-[#FF5E8C]" />
                  1. Information We Collect
                </h3>
                <p>
                  We only collect information that is strictly necessary to provide you with cycle predictions, logs, reminders, and personalized health reports.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong className="text-[#1A1819]">Account Setup & Authentication:</strong> We offer two secure methods to log in. You can choose to log in via OTP (which collects your Phone Number) or via Google Sign-In (which collects your Email Address).
                  </li>
                  <li>
                    <strong className="text-[#1A1819]">Mandatory Health & Cycle Data:</strong> To calculate your predictions we require your Name, Date of Birth (DoB), Period Length, Period Cycle Length, Previous Month's Period Date, Height, and Weight during the mandatory profile setup.
                  </li>
                  <li>
                    <strong className="text-[#1A1819]">Optional Profile Data:</strong> You may optionally choose to add or edit a Profile Picture, or an Email/Phone number (if not already used for login) within your profile settings. The app remains fully functional even without these optional details.
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div id="how-we-use-your-information" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <Activity className="w-5 h-5 text-[#FF5E8C]" />
                  2. How We Use Your Information
                </h3>
                <p>
                  We use the collected data strictly for running the core features of the app, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>To predict your period, fertile window, and ovulation.</li>
                  <li>Displaying health reports and tracking charts for your Weight, Temperature, and Water level logs.</li>
                  <li>Generating detailed insights such as your Cycle Report, Flow Report, Fertility Report, and Sex Life Report.</li>
                  <li>Providing informational articles across different categories.</li>
                  <li>To sync your data across devices securely.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="data-sharing" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <EyeOff className="w-5 h-5 text-[#FF5E8C]" />
                  3. Data Sharing & Third Parties
                </h3>
                <div className="bg-rose-50/80 border border-rose-100 p-4 rounded-2xl text-rose-900 font-bold uppercase text-xs sm:text-sm tracking-wide leading-relaxed shadow-sm">
                  WE DO NOT SELL, RENT, OR SHARE YOUR MENSTRUAL CYCLE, HEALTH, OR PERSONAL DATA WITH ADVERTISERS, AD NETWORKS, OR MARKETING COMPANIES.
                </div>
                <p>
                  Your data is used solely to provide and improve the services within the app for your personal benefit. We do not disclose your sensitive information to any third parties unless required by strict legal obligations or court orders.
                </p>
              </div>

              {/* Section 4 */}
              <div id="data-security" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <Lock className="w-5 h-5 text-[#FF5E8C]" />
                  4. Data Security
                </h3>
                <p>
                  Your reproductive and health data is highly personal. We implement industry-standard security measures, including encryption protocols (SSL/TLS), to safeguard your data both in transit (when it is sent to our servers) and at rest (when stored securely).
                </p>
              </div>

              {/* Section 5 */}
              <div id="data-retention" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#FF5E8C]" />
                  5. Data Retention
                </h3>
                <p>
                  We retain your personal information and health-related data only for as long as your account remains active or as long as necessary to provide the services offered by the App, including cycle tracking, ovulation predictions, reminders, reports, and secure data sync across devices.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Account and health data remain stored while your account is active.</li>
                  <li>If you delete your account through the App or request account deletion through our support team, your personal information, login details, profile data, and associated health records will be permanently deleted from our active systems within 30 days of the deletion request, unless a longer retention period is required by applicable law.</li>
                  <li>We do not retain your menstrual cycle, reproductive health, or personal data for advertising, marketing, or sale to third parties.</li>
                  <li>We do not retain personally identifiable data after account deletion, except where retention is required by applicable law.</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="user-rights" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-[#FF5E8C]" />
                  6. User Rights & Data Deletion
                </h3>
                <p>
                  You retain absolute ownership and control over your data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>You can review, edit, or modify your profile details and daily logs at any time directly through the app interface.</li>
                  <li>
                    <strong className="text-[#1A1819]">Account and Data Deletion:</strong> If you wish to stop using the app, you can permanently delete your account directly through the Account Settings by selecting <Link href="/delete-account?app=true" className="text-[#FF5E8C] hover:underline font-bold">"Delete Account"</Link>. Upon receiving this request, all your personal info, login details, and logged health history will be permanently and irreversibly deleted from our active systems within 30 days, except where retention is required by law.
                  </li>
                </ul>
              </div>

              {/* Section 7 */}
              <div id="contact-us" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-[#FF5E8C]" />
                  7. Contact Us
                </h3>
                <p>
                  For any privacy-related queries or to request data assistance, please contact us at:
                </p>
                <div className="inline-block bg-white/80 backdrop-blur-sm px-5 py-3 rounded-xl border border-pink-100 shadow-sm">
                  <strong className="text-[#1A1819] block mb-1">Email:</strong>
                  <a href="mailto:info@tracewavetransparency.com" className="text-[#FF5E8C] hover:underline font-bold sm:text-lg">
                    info@tracewavetransparency.com
                  </a>
                </div>
              </div>

              {/* Section 8 */}
              <div id="medical-disclaimer" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-[#FF5E8C]" />
                  8. Medical and Health Disclaimer
                </h3>
                <div className="bg-amber-50/80 border border-amber-100 p-5 rounded-2xl space-y-3 text-amber-900 shadow-sm">
                  <p>
                    <strong className="block mb-1 text-amber-950 font-bold">Not Medical Advice:</strong> 
                    The information, articles, and predictions provided by the Period Tracker Ovulation Cycle app are for general informational and personal tracking purposes only. This app is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider or doctor with any questions you may have regarding a medical condition, severe symptoms, or changes in your health.
                  </p>
                  <p>
                    <strong className="block mb-1 text-amber-950 font-bold">Not for Contraception:</strong> 
                    The fertility date range, ovulation day, and cycle predictions provided by the app are estimates based on your logged data. These predictions should NOT be used as a method of birth control or contraception to prevent pregnancy.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div id="gdpr-ccpa" className="space-y-3 leading-relaxed scroll-mt-24">
                <h3 className="text-lg sm:text-xl font-bold text-[#1A1819] flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#FF5E8C]" />
                  9. Your Rights (GDPR / CCPA)
                </h3>
                <p>
                  Depending on your location, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Access the personal data we hold about you.</li>
                  <li>Request the correction or deletion of your data.</li>
                  <li>Opt-out of any non-essential data processing.</li>
                  <li>To delete your account and all associated health data, you can do so directly via the App settings or by contacting our support team.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

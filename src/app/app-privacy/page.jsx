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
  ShieldCheck
} from 'lucide-react';

export const metadata = {
  title: 'App Privacy Policy | Period Tracker Ovulation Cycle',
  description: 'Privacy Policy for the Period Tracker Ovulation Cycle mobile application. Learn how we collect, use, and safeguard your health and cycle data.',
  alternates: {
    canonical: 'https://trackperiods.com/app-privacy',
  },
};

export default function AppPrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F9]">
      <Navbar />
      <main className="flex-1 pb-16 md:pb-24">
        
        {/* Header Section */}
        <section className="bg-gradient-to-b from-pink-50 to-[#FAF8F9] pt-12 sm:pt-16 pb-12 border-b border-pink-100/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-flo-600 font-bold text-xs uppercase tracking-wider mb-6">
              Mobile App Policy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
              App Privacy Policy
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              This Privacy Policy explains how we protect, store, and process your cycle metrics inside the mobile application.
            </p>
            <div className="text-sm text-gray-500 font-semibold">
              Last Updated: June 22, 2026
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-sm space-y-10">
            
            <div className="text-gray-700 leading-relaxed">
              <p>
                At <strong>Period Tracker Ovulation Cycle</strong> ("App", "we", "our", or "us"), we respect your privacy and are committed to protecting your personal and health data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application.
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Section 1 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Database className="w-6 h-6 text-flo-600" />
                1. Information We Collect
              </h2>
              <p>
                We only collect information that is strictly necessary to provide you with cycle predictions, logs, reminders, and personalized health reports.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong className="text-gray-900">Account Setup & Authentication:</strong> We offer two secure methods to log in. You can choose to log in via OTP (which collects your Phone Number) or via Google Sign-In (which collects your Email Address).
                </li>
                <li>
                  <strong className="text-gray-900">Mandatory Health & Cycle Data:</strong> To calculate your predictions we require your Name, Date of Birth (DoB), Period Length, Period Cycle Length, Previous Month's Period Date, Height, and Weight during the mandatory profile setup.
                </li>
                <li>
                  <strong className="text-gray-900">Optional Profile Data:</strong> You may optionally choose to add or edit a Profile Picture, or an Email/Phone number (if not already used for login) within your profile settings. The app remains fully functional even without these optional details.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Activity className="w-6 h-6 text-flo-600" />
                2. How We Use Your Information
              </h2>
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
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <EyeOff className="w-6 h-6 text-flo-600" />
                3. Data Sharing & Third Parties
              </h2>
              <div className="bg-rose-50 border border-rose-100 p-4 sm:p-5 rounded-2xl text-rose-900 font-bold uppercase text-sm tracking-wide leading-relaxed">
                WE DO NOT SELL, RENT, OR SHARE YOUR MENSTRUAL CYCLE, HEALTH, OR PERSONAL DATA WITH ADVERTISERS, AD NETWORKS, OR MARKETING COMPANIES.
              </div>
              <p>
                Your data is used solely to provide and improve the services within the app for your personal benefit. We do not disclose your sensitive information to any third parties unless required by strict legal obligations or court orders.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Lock className="w-6 h-6 text-flo-600" />
                4. Data Security
              </h2>
              <p>
                Your reproductive and health data is highly personal. We implement industry-standard security measures, including encryption protocols (SSL/TLS), to safeguard your data both in transit (when it is sent to our servers) and at rest (when stored securely).
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Clock className="w-6 h-6 text-flo-600" />
                5. Data Retention
              </h2>
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
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-flo-600" />
                6. User Rights & Data Deletion
              </h2>
              <p>
                You retain absolute ownership and control over your data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>You can review, edit, or modify your profile details and daily logs at any time directly through the app interface.</li>
                <li>
                  <strong className="text-gray-900">Account and Data Deletion:</strong> If you wish to stop using the app, you can permanently delete your account directly through the Account Settings by selecting <Link href="/delete-account?app=true" className="text-flo-600 hover:underline font-bold">"Delete Account"</Link>. Upon receiving this request, all your personal info, login details, and logged health history will be permanently and irreversibly deleted from our active systems within 30 days, except where retention is required by law.
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <Mail className="w-6 h-6 text-flo-600" />
                7. Contact Us
              </h2>
              <p>
                For any privacy-related queries or to request data assistance, please contact us at:
              </p>
              <div className="inline-block bg-gray-50 px-6 py-4 rounded-xl border border-gray-100">
                <strong className="text-gray-900 block mb-1">Email:</strong>
                <a href="mailto:info@tracewavetransparency.com" className="text-flo-600 hover:underline font-bold text-lg">
                  info@tracewavetransparency.com
                </a>
              </div>
            </div>

            {/* Section 8 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-flo-600" />
                8. Medical and Health Disclaimer
              </h2>
              <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl space-y-4 text-amber-900">
                <p>
                  <strong className="block mb-1 text-amber-950 text-lg">Not Medical Advice:</strong> 
                  The information, articles, and predictions provided by the Period Tracker Ovulation Cycle app are for general informational and personal tracking purposes only. This app is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified healthcare provider or doctor with any questions you may have regarding a medical condition, severe symptoms, or changes in your health.
                </p>
                <p>
                  <strong className="block mb-1 text-amber-950 text-lg">Not for Contraception:</strong> 
                  The fertility date range, ovulation day, and cycle predictions provided by the app are estimates based on your logged data. These predictions should NOT be used as a method of birth control or contraception to prevent pregnancy.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-flo-600" />
                9. Your Rights (GDPR / CCPA)
              </h2>
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
        </section>

      </main>
      <Footer />
    </div>
  );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '../../../data/articles';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { APP_LINKS } from '../../../data/appLinks';
import { 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  Sparkles, 
  ArrowLeft,
  Calendar,
  BookOpen,
  Smartphone
} from 'lucide-react';
import { clampTitle, clampDescription, clampKeywords } from '../../../utils/seo';
import BottomLinkingHub from '../../../components/BottomLinkingHub';

// Next.js static params generation for all articles
export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    id: article.id,
  }));
}

export function generateMetadata({ params }) {
  const article = ARTICLES.find((a) => a.id === params.id);
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const safeTitle = clampTitle(article.title, 'Period Tracker', 60);
  const safeDesc = clampDescription(article.summary, 158);
  const safeKeywords = clampKeywords(article.tags || [article.categoryName, 'period health', 'fertility tracker'], 6);

  return {
    title: safeTitle,
    description: safeDesc,
    keywords: safeKeywords,
    alternates: {
      canonical: `https://trackperiods.com/articles/${article.id}`,
    },
    openGraph: {
      title: safeTitle,
      description: safeDesc,
      url: `https://trackperiods.com/articles/${article.id}`,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.author || 'Period Tracker Health Editorial'],
      images: [
        {
          url: article.image || '/logo.png',
          alt: safeTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: safeTitle,
      description: safeDesc,
      images: [article.image || '/logo.png'],
    },
  };
}

function renderFormattedText(text) {
  if (typeof text !== 'string') return text;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const anchor = match[1];
    const url = match[2];
    const isExternal = url.startsWith('http') && !url.includes('trackperiods.com');
    parts.push(
      isExternal ? (
        <a
          key={match.index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-flo-600 hover:text-flo-700 font-semibold underline decoration-pink-300 underline-offset-2 hover:decoration-flo-500 transition-colors"
        >
          {anchor}
        </a>
      ) : (
        <Link
          key={match.index}
          href={url}
          className="text-flo-600 hover:text-flo-700 font-semibold underline decoration-pink-300 underline-offset-2 hover:decoration-flo-500 transition-colors"
        >
          {anchor}
        </Link>
      )
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ArticlePage({ params }) {
  const { id } = params;
  const article = ARTICLES.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || Math.random() > 0.4)
  ).slice(0, 3);

  let isoDatePublished = new Date().toISOString();
  try {
    const parsed = new Date(article.publishedDate);
    if (!isNaN(parsed.getTime())) {
      isoDatePublished = parsed.toISOString();
    }
  } catch (e) {}

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'MedicalWebPage'],
    headline: article.title,
    name: article.title,
    description: article.summary,
    image: [
      `https://trackperiods.com${article.image}`,
      'https://trackperiods.com/brand-logo-final.png'
    ],
    datePublished: isoDatePublished,
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: article.author || 'Period Tracker Health Editorial',
      url: 'https://trackperiods.com/about/science-and-research',
    },
    reviewer: {
      '@type': 'MedicalOrganization',
      name: article.reviewer || 'Period Tracker Medical Advisory Board',
      url: 'https://trackperiods.com/about/medical-affairs',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tracewave Transparency Private Limited',
      url: 'https://trackperiods.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://trackperiods.com/brand-logo-final.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://trackperiods.com/articles/${article.id}`,
    },
    about: {
      '@type': 'MedicalCondition',
      name: article.tag || 'Menstrual Cycle Health',
    },
    medicalAudience: {
      '@type': 'MedicalAudience',
      audienceType: 'Patients',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'p', 'h2'],
    },
  };

  const faqJsonLd = article.faqs && article.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://trackperiods.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Wellness Hub',
        item: 'https://trackperiods.com/wellness-hub',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.categoryName || 'Articles',
        item: `https://trackperiods.com/wellness-hub?category=${article.category}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: `https://trackperiods.com/articles/${article.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F9]">
      <Navbar />

      <main className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        {/* Flo.health Top Header Banner */}
        <section className="bg-gradient-to-b from-flo-100/60 via-pink-50/40 to-[#fff9fb] pt-8 pb-12 border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb matching Flo screenshot: Home > WELLNESS HUB > [Category] > [Title] */}
            <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 flex-wrap">
              <Link href="/" className="hover:text-flo-600 transition-colors flex items-center gap-1">
                <span>Home</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link href="/wellness-hub" className="hover:text-flo-600 transition-colors">
                WELLNESS HUB
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <Link href={`/wellness-hub?category=${article.category}`} className="hover:text-flo-600 transition-colors">
                {article.categoryName}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-800 font-bold truncate max-w-xs sm:max-w-md">
                {article.title}
              </span>
            </nav>

            {/* Article Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-tight max-w-4xl">
              {article.title}
            </h1>

            {/* Subtitle / Lead Summary */}
            <p className="mt-4 text-gray-700 leading-relaxed max-w-3xl">
              {article.summary}
            </p>

            {/* Byline */}
            <div className="mt-6 pt-6 border-t border-pink-200/70 flex flex-wrap items-center gap-4 text-xs text-gray-600">
              <span className="text-gray-500">
                Updated <strong className="text-gray-800">{article.publishedDate}</strong>
              </span>
              <span>•</span>
              <span className="text-flo-600 font-semibold">
                Period Tracker Wellness Guide
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {article.readTime}
              </span>
            </div>

          </div>
        </section>

        {/* Main Article Content & Table of Contents Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Full Content (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Hero Featured Image */}
                <div className="relative w-full h-72 sm:h-96 rounded-3xl overflow-hidden bg-pink-100 shadow-md">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Key Takeaways Callout Box (Flo Style) */}
                <div className="p-6 rounded-3xl bg-flo-50 border border-flo-200 space-y-2">
                  <h3 className="text-flo-800 uppercase flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-flo-600" />
                    <span>Key Takeaways at a Glance</span>
                  </h3>
                  <div className="text-sm text-gray-800 leading-relaxed font-medium">
                    {article.summary}
                  </div>
                </div>

                {/* Article Sections */}
                <div className="space-y-10 text-gray-800 leading-relaxed text-base">
                  {article.content && article.content.map((sec, idx) => (
                    <div 
                      key={idx} 
                      id={`section-${idx}`}
                      className="space-y-4 scroll-mt-28"
                    >
                      <h2 className="text-xl sm:text-2xl font-extrabold pt-2 border-b border-pink-100 pb-2 text-gray-900">
                        {sec.heading}
                      </h2>
                      {Array.isArray(sec.paragraphs) ? (
                        <div className="space-y-4">
                          {sec.paragraphs.map((para, pIdx) => (
                            <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                              {renderFormattedText(para)}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {typeof sec.body === 'string' && sec.body.split('\n\n').map((para, pIdx) => (
                            <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                              {renderFormattedText(para)}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Section Detail Bullets */}
                      {sec.bullets && sec.bullets.length > 0 && (
                        <div className="bg-white/90 border border-pink-100/90 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-3 mt-4">
                          <h4 className="uppercase text-flo-700">
                            Key Checklist & Essential Facts
                          </h4>
                          <ul className="space-y-2.5">
                            {sec.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-3 text-sm text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-flo-500 shrink-0 mt-0.5" />
                                <span className="leading-snug">{renderFormattedText(bullet)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Frequently Asked Questions (Interactive Accordion) */}
                {article.faqs && article.faqs.length > 0 && (
                  <div id="faqs" className="mt-14 pt-10 border-t border-pink-100 space-y-6 scroll-mt-28">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-flo-100 text-flo-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xl  font-bold">
                          Frequently Asked Questions
                        </h3>
                        <p className="text-gray-500">
                          Clear, doctor-reviewed answers to common questions
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {article.faqs.map((faq, fIdx) => (
                        <details 
                          key={fIdx} 
                          className="group rounded-2xl bg-white border border-pink-100 p-5 shadow-2xs open:border-flo-300 open:ring-1 open:ring-flo-200 transition-all"
                        >
                          <summary className="flex items-center justify-between font-bold text-gray-900 cursor-pointer list-none select-none text-base">
                            <span className="pr-4">{faq.question}</span>
                            <span className="text-flo-500 text-xl font-bold group-open:rotate-45 transition-transform shrink-0">
                              +
                            </span>
                          </summary>
                          <div className="mt-3 text-base text-gray-600 leading-relaxed pt-3 border-t border-pink-50">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Educational & Health Wellness Disclaimer */}
                <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-amber-50/80 border border-amber-200/90 space-y-2.5 text-xs text-amber-950 leading-relaxed shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 font-bold uppercase tracking-wider text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Educational & Wellness Disclaimer</span>
                  </div>
                  <p className="text-amber-900/90 leading-relaxed">
                    The health guides, cycle timelines, natural remedies, and symptom insights published on Period Tracker & Ovulation are strictly for general educational, self-tracking, and informational purposes. They are not a substitute for clinical advice, formal medical diagnosis, or personalized treatment plans. If you have severe pelvic discomfort, irregular bleeding, or questions about pregnancy, always consult with a licensed physician or gynecologist.
                  </p>
                </div>

                {/* Tags */}
                {article.tags && (
                  <div className="pt-6 border-t border-pink-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-gray-400 uppercase mr-2">Tags:</span>
                    {article.tags.map((tag, idx) => (
                      <span key={idx} className="px-3.5 py-1 bg-white border border-pink-200 text-gray-700 text-xs font-semibold rounded-full shadow-2xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              </div>

              {/* Right Column: Sticky 'IN THIS ARTICLE' Table of Contents (lg:col-span-4) */}
              <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                
                {/* Table of Contents Box (Matching screenshot) */}
                <div className="bg-white rounded-3xl border border-pink-100 p-6 shadow-xs space-y-4">
                  <h5 className="uppercase tracking-widest text-gray-400">
                    IN THIS ARTICLE
                  </h5>

                  <ul className="space-y-2.5 text-sm font-semibold">
                    {article.content && article.content.map((sec, idx) => (
                      <li key={idx}>
                        <a 
                          href={`#section-${idx}`}
                          className="text-gray-700 hover:text-flo-600 transition-colors block py-0.5 hover:translate-x-1 transition-transform"
                        >
                          {sec.heading}
                        </a>
                      </li>
                    ))}
                    {article.faqs && article.faqs.length > 0 && (
                      <li className="pt-1 border-t border-pink-50">
                        <a 
                          href="#faqs"
                          className="text-flo-600 hover:text-flo-700 font-bold transition-colors block py-0.5 hover:translate-x-1 transition-transform"
                        >
                          Frequently Asked Questions
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Quick Interactive Cycle Tool Promo Card */}
                <div className="bg-gradient-to-br from-flo-50 via-white to-pink-50 rounded-3xl border border-pink-200 p-6 space-y-4 shadow-sm">
                  <div className="w-10 h-10 rounded-2xl bg-flo-500 text-white flex items-center justify-center shadow-xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="">Calculate Your Own Cycle</h4>
                    <div className="text-sm text-gray-700 leading-relaxed mt-1">
                      Predict your next period, ovulation day, and fertile window in seconds.
                    </div>
                  </div>
                  <Link
                    href="/calculators/ovulation-calculator"
                    className="block w-full py-2.5 px-4 rounded-full bg-flo-600 hover:bg-flo-700 text-white font-bold text-center text-xs shadow-xs transition-colors"
                  >
                    Open Cycle Calculator &rarr;
                  </Link>
                </div>

                {/* Direct App Install Banner (Conversion Booster) */}
                <div className="bg-gradient-to-br from-[#FF3B70] to-[#E0265B] text-white rounded-3xl p-6 shadow-md space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                        Free Mobile App
                      </span>
                      <h4 className="text-white font-bold text-base mt-0.5">
                        Never Miss a Period Again
                      </h4>
                    </div>
                  </div>
                  <p className="text-white/90 text-xs leading-relaxed">
                    Track cycle milestones, log daily symptoms, and predict fertile days offline with 100% private biometric lock.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={APP_LINKS.ios}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white text-gray-900 font-bold text-xs hover:bg-gray-100 transition shadow-sm"
                    >
                      <span>App Store</span>
                    </a>
                    <a
                      href={APP_LINKS.android}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-xs hover:bg-white/20 transition"
                    >
                      <span>Google Play</span>
                    </a>
                  </div>
                </div>

              </aside>

            </div>
          </div>
        </section>

        {/* Related Guides Section */}
        {relatedArticles.length > 0 && (
          <section className="py-16 bg-flo-50/40 border-t border-pink-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="">
                    Recommended Health Guides
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Continue reading certified guides in {article.categoryName}.
                  </p>
                </div>
                <Link
                  href="/wellness-hub"
                  className="text-xs font-bold text-flo-600 hover:underline"
                >
                  View Wellness Hub &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.id}`}
                    className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-pink-100 transition-all duration-200 group flex flex-col"
                  >
                    <div className="relative w-full h-44 bg-pink-100 overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <span className="text-xs font-bold text-flo-600 uppercase tracking-wider block mb-1">
                          {rel.categoryName}
                        </span>
                        <h4 className="group-hover:text-flo-600 line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {rel.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Contextual Link Juice Sculpting Hub */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <BottomLinkingHub 
            currentSlug={article.id} 
            cluster={
              article.id.includes('implantation') || article.category === 'ovulation' ? 'fertility' :
              article.category === 'pregnancy' || article.id.includes('hcg') || article.id.includes('pregnancy-test') ? 'pregnancy' :
              article.id.includes('pcos') || article.id.includes('syncing') ? 'pcos' :
              'cycle'
            } 
            pageType="article" 
          />
        </div>

      </main>

      <Footer />
    </div>
  );
}

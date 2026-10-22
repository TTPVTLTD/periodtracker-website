/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/cycle-tools',
        destination: '/calculators',
        permanent: true,
      },
      {
        source: '/calculator',
        destination: '/calculators',
        permanent: true,
      },
      {
        source: '/tools',
        destination: '/calculators',
        permanent: true,
      },
      {
        source: '/tools/:slug',
        destination: '/calculators/:slug',
        permanent: true,
      },
      {
        source: '/calculator/:slug',
        destination: '/calculators/:slug',
        permanent: true,
      },
      {
        source: '/calculators/ovulation',
        destination: '/calculators/ovulation-calculator',
        permanent: true,
      },
      {
        source: '/calculators/hcg',
        destination: '/calculators/hcg-calculator',
        permanent: true,
      },
      {
        source: '/calculators/pregnancy-test',
        destination: '/calculators/pregnancy-test-calculator',
        permanent: true,
      },
      {
        source: '/calculators/due-date',
        destination: '/calculators/pregnancy-due-date-calculator',
        permanent: true,
      },
      {
        source: '/calculators/due-date-calculator',
        destination: '/calculators/pregnancy-due-date-calculator',
        permanent: true,
      },
      {
        source: '/calculators/implantation',
        destination: '/calculators/implantation-calculator',
        permanent: true,
      },
      {
        source: '/calculators/period',
        destination: '/calculators/period-calculator',
        permanent: true,
      },
      {
        source: '/calculators/menstrual-cycle',
        destination: '/calculators/menstrual-cycle-calculator',
        permanent: true,
      },
      {
        source: '/calculators/weeks-to-months',
        destination: '/calculators/pregnancy-weeks-to-months-calculator',
        permanent: true,
      },
      {
        source: '/article/:id',
        destination: '/articles/:id',
        permanent: true,
      },
      {
        source: '/blog/:id',
        destination: '/articles/:id',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/wellness-hub',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/app-features',
        permanent: true,
      },
      {
        source: '/app',
        destination: '/app-features',
        permanent: true,
      },
      {
        source: '/download',
        destination: '/app-features',
        permanent: true,
      },
      {
        source: '/health-library',
        destination: '/wellness-hub',
        permanent: true,
      },
      {
        source: '/articles',
        destination: '/wellness-hub',
        permanent: true,
      },
      {
        source: '/contact.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/privacy.html',
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/terms.html',
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/about.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/faq.html',
        destination: '/faq',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

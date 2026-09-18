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
        source: '/features',
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

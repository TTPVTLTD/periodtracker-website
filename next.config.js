/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
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
        source: '/about',
        destination: '/about/science-and-research',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

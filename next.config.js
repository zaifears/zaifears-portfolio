/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Link', value: '</llms.txt>; rel="llms-txt", </llms-full.txt>; rel="llms-full-txt"' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/llm.txt', destination: '/llms.txt', permanent: true },
    ];
  },
  productionBrowserSourceMaps: false,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  compress: true,
  turbopack: {},
};

module.exports = nextConfig;
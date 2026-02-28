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
  // previously we added aggressive cache headers for some routes to avoid stale data,
  // but this causes cold-start delays on Vercel Hobby tier. ISR is preferred instead.
  // async headers() {
  //   return [ /* removed */ ];
  // },
  productionBrowserSourceMaps: false,
  typescript: {
    tsconfigPath: './tsconfig.json'
  }
};

module.exports = nextConfig;
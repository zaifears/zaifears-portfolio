/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add the Contentful image domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**', // Allow any path from this hostname
      },
    ],
    // If you were using 'domains' before, you can remove it and use 'remotePatterns'
    // domains: ['images.ctfassets.net'], // Older way, remotePatterns is preferred
  },
};

module.exports = nextConfig;

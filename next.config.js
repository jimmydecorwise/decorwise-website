/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  trailingSlash: true,
  // Disable React StrictMode for static export
  reactStrictMode: false,
  // Environment variables
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  },
  // This is needed for static export with API routes
  skipTrailingSlashRedirect: true,
  // Configure webpack to ignore the docs directory during development
  webpack: (config, { dev }) => {
    if (dev) {
      // Ignore the docs directory during development
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/docs/**'],
      };
    }
    return config;
  },
};

module.exports = nextConfig;

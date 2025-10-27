/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com'], // For existing GCS images if needed
    formats: ['image/avif', 'image/webp'],
  },
  // Enable server actions for form submissions
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
}

module.exports = nextConfig

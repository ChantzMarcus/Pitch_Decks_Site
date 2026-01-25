/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-project.supabase.co', 'localhost', '127.0.0.1'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/questionnaire',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
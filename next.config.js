/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-project.supabase.co', 'localhost', '127.0.0.1'],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
  // Removed redirect - homepage is now at / via (public)/page.tsx
}

module.exports = nextConfig
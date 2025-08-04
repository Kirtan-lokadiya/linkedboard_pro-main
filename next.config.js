/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    unoptimized: true
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/home-dashboard',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
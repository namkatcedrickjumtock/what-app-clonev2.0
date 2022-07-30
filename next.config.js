/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["https://1000logos.net/wp-content/uploads/2021/04/WhatsApp-logo.png" ],
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false
      }
    }
    return config
  },
}

module.exports = nextConfig

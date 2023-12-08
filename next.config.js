/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["fakestoreapi.com","localhost","m.media-amazon.com","images-na.ssl-images-amazon.com"],
  },

  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  },
  experimental: { images: { allowFutureImage: true } },
}

module.exports = nextConfig

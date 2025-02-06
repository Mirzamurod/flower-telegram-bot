/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '/', pathname: '**' },
      { protocol: 'https', hostname: '/', pathname: '**' },
    ],
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fimgs.net',
      }
    ]
  }
};

export default nextConfig;

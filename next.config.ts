import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "example.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'in.pinterest.com',
      },
    ],
  },
};

export default nextConfig;

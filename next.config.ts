import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "example.com", "i.pinimg.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'in.pinterest.com',
      },
    ],
  },
};

export default nextConfig;

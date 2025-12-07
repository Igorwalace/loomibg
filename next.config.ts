import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // isso faz o build ignorar warnings
  },
  images: {
    qualities: [25, 50, 75],
    remotePatterns: [
      {
        hostname: 'ivusgtddoellanjrmnzl.supabase.co',
      },
      {
        hostname: 'fra.cloud.appwrite.io',
      },
      {
        hostname: 'tor.cloud.appwrite.io',
      },
      {
        hostname: 'res.cloudinary.com',
      }
    ],

  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'ivusgtddoellanjrmnzl.supabase.co',
      },
      {
        hostname: 'fra.cloud.appwrite.io',
      }
    ],
  },
};

export default nextConfig;

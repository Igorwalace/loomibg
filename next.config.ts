import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      }
    ],
    
  },
};

export default nextConfig;

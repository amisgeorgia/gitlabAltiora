import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autoriser l'accès depuis le smartphone sur le réseau local
  allowedDevOrigins: ["192.168.88.20", "192.168.88.20:3000", "localhost:3000", "localhost"],
  images: {
    qualities: [75, 85, 90, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

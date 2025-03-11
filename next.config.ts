import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "assets.lummi.ai",
      },
    ],
  },
};

export default nextConfig;

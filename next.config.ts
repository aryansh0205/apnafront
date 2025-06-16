import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1tdhqm9w1ybsh.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;

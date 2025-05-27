import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1tdhqm9w1ybsh.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "dn3w8358m09e7.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;

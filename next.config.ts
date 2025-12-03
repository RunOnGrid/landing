import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net"],
  },
  // Enable standalone output so the server bundle can run inside Docker
  output: "standalone",
};

export default nextConfig;

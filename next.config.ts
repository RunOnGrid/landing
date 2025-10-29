import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net"],
    unoptimized: true, // Required for static export
  },
  // Use export for static generation with nginx
  output: 'export',
  trailingSlash: true,
  // Disable image optimization for static export
  distDir: 'out',
};

export default nextConfig;

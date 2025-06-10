import type { NextConfig } from "next";

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swMinify: true,
  disable: false,
  // Enable PWA in production only
  // disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  }
});

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // turbo configuration removed as it is not valid

  },
  images: {
    domains: ['randomuser.me', 'upload.wikimedia.org', 'lh3.googleusercontent.com', 'images.ctfassets.net' ],
  },
};

export default withPWA(nextConfig);

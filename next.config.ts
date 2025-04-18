import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // turbo configuration removed as it is not valid

  },
  images: {
    domains: ['randomuser.me', 'upload.wikimedia.org', 'lh3.googleusercontent.com', 'images.ctfassets.net' ],
  },
};

export default nextConfig;

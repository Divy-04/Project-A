import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers has no Next image optimiser. The files in
    // public/images are pre-compressed WebP and served as they are; Sanity
    // photographs never went through next/image in the first place.
    unoptimized: true,
  },
};

export default nextConfig;

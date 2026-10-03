import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Workers has no Next image optimiser. The files in
    // public/images are pre-compressed WebP and served as they are; Sanity
    // photographs never went through next/image in the first place.
    unoptimized: true,
  },
  // `experimental.inlineCss` was tried on 3 Oct 2026 and left off: it writes
  // the stylesheet into the HTML twice (a <style> tag and the RSC payload),
  // taking the homepage from 44 KB to 78 KB gzipped — about what the one
  // saved stylesheet request is worth, on every page view.
};

export default nextConfig;

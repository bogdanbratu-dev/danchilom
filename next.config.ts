import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Pozele originale sunt JPG de ~340KB fiecare; servite ca AVIF/WebP ajung sub 60KB pe mobil.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 828, 1080, 1200, 1920],
    imageSizes: [96, 160, 256, 384, 540],
    // Poze/logo urcate din admin ajung pe Vercel Blob (URL absolut), nu în public/.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;

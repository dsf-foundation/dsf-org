import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [82],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: `res.cloudinary.com`,
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "thy4ada6"}/**`,
      },
    ],
  },
  serverExternalPackages: ["cloudinary"],
};

export default nextConfig;

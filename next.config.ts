import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // خروجی مستقل (standalone) می‌سازد: روی هر هاستِ Node.js با یک دستور اجرا می‌شود،
  // بدون اینکه به Vercel یا کل پوشه‌ی node_modules نیاز داشته باشد.
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

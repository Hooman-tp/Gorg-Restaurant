import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "گرگ | GORG",
    short_name: "گرگ",
    description: "رستوران گرگ — برگر، بریسکت، نشویل و بال. سفارش آنلاین.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d0403",
    theme_color: "#0d0403",
    lang: "fa",
    dir: "rtl",
    icons: [
      { src: "/images/gorg-mark-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/images/gorg-mark-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/images/gorg-mark-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/images/gorg-mark-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

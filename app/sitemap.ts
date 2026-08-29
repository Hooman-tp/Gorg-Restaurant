import type { MetadataRoute } from "next";

const BASE_URL = "https://gorg-restaurant.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/menu", "/gallery", "/about", "/contact"];
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}

import type { MetadataRoute } from "next";

const baseUrl = "https://imrandevify.online";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}

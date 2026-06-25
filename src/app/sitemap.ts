import type { MetadataRoute } from "next";

const BASE_URL = "https://danielmota.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/noticias`,
      changeFrequency: "hourly",
      priority: 0.8,
    },
  ];
}

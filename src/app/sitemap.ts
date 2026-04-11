import type { MetadataRoute } from "next";
import { programs } from "@/data/programs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://partnersview.co.kr";
  const now = new Date();

  const programPages: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${baseUrl}/programs/${program.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...programPages,
  ];
}

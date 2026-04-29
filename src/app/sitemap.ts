import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seasidestories.in";
  return [
    { url: base, lastModified: new Date("2026-04-29"), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/gallery`, lastModified: new Date("2026-04-29"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/book`, lastModified: new Date("2026-04-29"), changeFrequency: "weekly", priority: 0.9 },
  ];
}

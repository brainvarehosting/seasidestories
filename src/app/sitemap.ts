import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://seasidestories.in";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/book`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];
}

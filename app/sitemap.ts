import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { categoryOrder } from "./data/categories";
import { serviceHref, services } from "./data/services";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: Entry[] = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...categoryOrder.map((category) => ({
      url: absoluteUrl(`/${category}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(serviceHref(service)),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/devis"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/rendez-vous"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/tarifs"), lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/a-propos"), lastModified, changeFrequency: "yearly", priority: 0.5 },
    ...["/mentions-legales", "/confidentialite", "/cookies"].map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
  // Une URL ne doit apparaître qu'une fois (ex. /professionnels : catégorie et fiche fusionnées).
  const seen = new Set<string>();
  return entries.filter((entry) => !seen.has(entry.url) && Boolean(seen.add(entry.url)));
}

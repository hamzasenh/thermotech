import { chauffageServices } from "./chauffage";
import { electriciteServices } from "./electricite";
import { plomberieServices } from "./plomberie";
import { climatisationServices } from "./climatisation";
import { professionnelsServices } from "./professionnels";
import type { Service, ServiceCategory, ServiceRef } from "./types";

export * from "./types";

// Toutes les pages service du site. Une entrée = une URL /<category>/<slug>,
// générée statiquement par app/<category>/[slug]/page.tsx. Pour ajouter un
// service : ajouter un objet dans le fichier de sa catégorie — la page, le
// menu, le footer et le sitemap suivent automatiquement.
export const services: Service[] = [
  ...chauffageServices,
  ...electriciteServices,
  ...plomberieServices,
  ...climatisationServices,
  ...professionnelsServices,
];

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function getService(category: ServiceCategory, slug: string): Service | undefined {
  return services.find((s) => s.category === category && s.slug === slug);
}

export function getServiceByRef(ref: ServiceRef): Service {
  const [category, slug] = ref.split("/") as [ServiceCategory, string];
  const service = getService(category, slug);
  if (!service) throw new Error(`Service introuvable : ${ref}`);
  return service;
}

export function serviceHref(service: Pick<Service, "category" | "slug" | "path">): string {
  return service.path ?? `/${service.category}/${service.slug}`;
}

import { services } from "../services";
import type { ServiceCategory } from "../services/types";
import { isVisible } from "../visibility";
import type { Guide } from "./types";
import { vaillantCodesErreur } from "./vaillant-codes-erreur";

export * from "./types";

// Guides d'aide (prompts/refonte/08-guides.md). Une entrée = une URL : sous sa
// page parente (/chauffage/vaillant/codes-erreur) ou /guide/<slug>. Les
// brouillons n'existent pas en production, et un guide dont la page parente
// est un brouillon reste caché avec elle.
const allGuides: Guide[] = [vaillantCodesErreur];

export const guides: Guide[] = allGuides.filter(
  (guide) => isVisible(guide) && (!guide.parent || services.some((s) => `${s.category}/${s.slug}` === guide.parent))
);

export function guideHref(guide: Pick<Guide, "parent" | "slug">): string {
  return guide.parent ? `/${guide.parent}/${guide.slug}` : `/guide/${guide.slug}`;
}

/** Guides rattachés à une page parente de ce métier : paramètres de app/<métier>/[slug]/[guide]. */
export function getChildGuides(category: ServiceCategory): Guide[] {
  return guides.filter((guide) => guide.parent?.startsWith(`${category}/`));
}

export function getChildGuide(category: ServiceCategory, parentSlug: string, slug: string): Guide | undefined {
  return guides.find((guide) => guide.parent === `${category}/${parentSlug}` && guide.slug === slug);
}

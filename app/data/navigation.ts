import { categoryLabels, categoryOrder, getCategory } from "./categories";
import { getServiceByRef, serviceHref, services, type ServiceCategory } from "./services";
import type { ServiceIntent } from "./services/types";

export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  category: ServiceCategory;
  label: string;
  href: string;
  items: NavItem[];
}

/**
 * Arborescence de navigation dérivée des données (catégories + services).
 * Calculée côté serveur puis passée en props au Header (client) : seul ce
 * petit objet part dans le bundle navigateur, pas le contenu des pages.
 */
export function getNavGroups(): NavGroup[] {
  return categoryOrder.map((category) => ({
    category,
    label: categoryLabels[category],
    href: `/${category}`,
    items: getCategory(category)
      .services.map(getServiceByRef)
      .map((service) => ({ label: service.title, href: serviceHref(service) })),
  }));
}

export interface PageAction {
  intent: ServiceIntent;
  /** Sujet du message WhatsApp pré-rempli. */
  label: string;
}

/**
 * Intention et nom de chaque page service / catégorie, par chemin : la barre
 * d'actions mobile (client) adapte sa 2e action (devis, rendez-vous, WhatsApp)
 * sans embarquer le contenu des pages dans le navigateur.
 */
export function getPageActions(): Record<string, PageAction> {
  const actions: Record<string, PageAction> = {};
  for (const category of categoryOrder) {
    const content = getCategory(category);
    actions[`/${category}`] = { intent: content.hero.intent, label: content.label };
  }
  for (const service of services) {
    actions[serviceHref(service)] = { intent: service.intent, label: service.name };
  }
  return actions;
}


import { categoryLabels, categoryOrder, getCategory } from "./categories";
import { getServiceByRef, serviceHref, type ServiceCategory } from "./services";

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

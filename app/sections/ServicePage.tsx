import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getService, getServicesByCategory, serviceHref, type ServiceCategory } from "../data/services";
import { ServicePageV2 } from "./v2/ServicePageV2";

/**
 * Exports de route pour app/<categorie>/[slug]/page.tsx — évite de dupliquer
 * generateStaticParams / generateMetadata / page dans chaque catégorie.
 * Le gabarit est app/sections/v2/ServicePageV2.tsx.
 */
export function serviceRoute(category: ServiceCategory) {
  return {
    generateStaticParams() {
      // Les services servis à une autre URL (ex. /professionnels) n'ont pas de page /categorie/slug.
      return getServicesByCategory(category)
        .filter((service) => !service.path)
        .map((service) => ({ slug: service.slug }));
    },

    async generateMetadata({
      params,
    }: {
      params: Promise<{ slug: string }>;
    }): Promise<Metadata> {
      const { slug } = await params;
      const service = getService(category, slug);
      if (!service) return {};
      return pageMetadata({
        title: service.metaTitle,
        description: service.metaDescription,
        path: serviceHref(service),
      });
    },

    async Page({ params }: { params: Promise<{ slug: string }> }) {
      const { slug } = await params;
      const service = getService(category, slug);
      if (!service || service.path) notFound();
      return <ServicePageV2 service={service} />;
    },
  };
}

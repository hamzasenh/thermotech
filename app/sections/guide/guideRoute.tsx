import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getChildGuide, getChildGuides, guideHref } from "@/app/data/guides";
import type { ServiceCategory } from "@/app/data/services";
import { GuidePage } from "./GuidePage";

/**
 * Exports de route pour app/<métier>/[slug]/[guide]/page.tsx : guides
 * rattachés à une page (ex. /chauffage/vaillant/codes-erreur). Contenu :
 * app/data/guides/. Gabarit : GuidePage.
 */
export function guideRoute(category: ServiceCategory) {
  type Params = Promise<{ slug: string; guide: string }>;
  return {
    generateStaticParams() {
      return getChildGuides(category).map((guide) => ({ slug: guide.parent!.split("/")[1], guide: guide.slug }));
    },

    async generateMetadata({ params }: { params: Params }): Promise<Metadata> {
      const { slug, guide: guideSlug } = await params;
      const guide = getChildGuide(category, slug, guideSlug);
      if (!guide) return {};
      return pageMetadata({
        title: guide.metaTitle,
        description: guide.metaDescription,
        path: guideHref(guide),
        noindex: guide.draft,
      });
    },

    async Page({ params }: { params: Params }) {
      const { slug, guide: guideSlug } = await params;
      const guide = getChildGuide(category, slug, guideSlug);
      if (!guide) notFound();
      return <GuidePage guide={guide} />;
    },
  };
}

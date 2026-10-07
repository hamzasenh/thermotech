import type { Metadata } from "next";
import { JsonLd } from "@/components/site/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { getCategory } from "../data/categories";
import { contactActionHref } from "../data/company";
import { getServiceByRef, type ServiceCategory, type ServiceRef } from "../data/services";
import { resolveCta } from "./ctaDefaults";
import { ServicesPanel } from "./v2/aside";
import { BrandsV2, CallBandV2, ProofV2, ZonesV2 } from "./v2/blocks";
import { FinalCtaV2 } from "./v2/chrome";
import { FeaturesV2, GuideV2, PricingV2, ServiceGridV2 } from "./v2/content";
import { finalCtaVisual } from "./v2/cta";
import { FaqV2 } from "./v2/FaqV2";
import { ServiceHeroV2 } from "./v2/ServiceHeroV2";
import { backgrounds } from "./v2/tones";

// Services mis en avant en tête de la catégorie chauffage (le cœur de métier).
const featuredByCategory: Partial<Record<ServiceCategory, ServiceRef[]>> = {
  chauffage: ["chauffage/depannage-chaudiere", "chauffage/entretien-chaudiere", "chauffage/remplacement-chaudiere"],
};

/**
 * Gabarit des pages catégorie (/chauffage, /electricite…) : page d'atterrissage
 * SEO de chaque métier, qui oriente vers les fiches service. Design refondu
 * (app/sections/v2) ; contenu dans app/data/categories.ts.
 */
export function CategoryPage({ category }: { category: ServiceCategory }) {
  const content = getCategory(category);
  const featuredRefs = featuredByCategory[category] ?? [];
  const featured = featuredRefs.map(getServiceByRef);
  const others = content.services.filter((ref) => !featuredRefs.includes(ref)).map(getServiceByRef);
  const cta = resolveCta(content.cta.intent, content.cta);
  const visual = finalCtaVisual[content.cta.intent];
  const quickLinks = content.services.slice(0, 5).map(getServiceByRef);
  // Fonds blanc / beige en alternance, dans l'ordre des sections (voir v2/tones.ts).
  const bg = backgrounds();
  const grid = bg.next();
  const band = bg.attach();
  const why = content.why ? bg.next() : undefined;
  const pricing = content.pricing ? bg.next() : undefined;
  const brands = content.brands ? bg.next() : undefined;
  const guide = content.guide ? bg.next() : undefined;
  const proof = bg.next();
  const zones = bg.next();
  const faq = bg.next();

  return (
    <>
      <JsonLd data={faqJsonLd(content.faqs)} />

      <ServiceHeroV2
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: content.label, href: `/${category}` },
        ]}
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        intro={content.hero.intro}
        panel={<ServicesPanel eyebrow={content.label} title="Votre besoin ?" services={quickLinks} />}
        facts={content.facts}
        context={category}
        intent={content.hero.intent}
      />

      <ServiceGridV2
        eyebrow={`Nos services · ${content.label}`}
        title={content.servicesTitle}
        intro={content.servicesIntro}
        featured={featured}
        featuredTitle={featured.length ? "Votre chaudière" : undefined}
        services={others}
        othersTitle={featured.length ? "Le reste de votre chauffage" : undefined}
        tone={grid}
      />
      <CallBandV2 context={category} intent={content.hero.intent} tone={band.tone} attached={band.attached} />
      {content.why && <FeaturesV2 {...content.why} tone={why} />}
      {content.pricing && <PricingV2 {...content.pricing} context={category} tone={pricing} />}
      {content.brands && <BrandsV2 {...content.brands} tone={brands} />}
      {content.guide && <GuideV2 {...content.guide} tone={guide} />}
      <ProofV2 tone={proof} />
      <ZonesV2 tone={zones} />
      <FaqV2 faqs={content.faqs} title={content.faqTitle} rappelHref={contactActionHref("rappel", category)} tone={faq} />
      <FinalCtaV2
        eyebrow={cta.eyebrow}
        title={cta.title}
        highlight={cta.highlight}
        body={cta.body}
        image={visual.image}
        imageAlt={visual.alt}
        secondary={visual.secondary}
        context={category}
      />
    </>
  );
}

export function categoryMetadata(category: ServiceCategory): Metadata {
  const content = getCategory(category);
  return pageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: `/${category}`,
  });
}

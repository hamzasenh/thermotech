import type { Metadata } from "next";
import { company } from "@/app/data/company";
import { zonesIntervention } from "@/app/data/zones-intervention";
import { resolvePrice, type PriceRef } from "@/app/data/pricing";
import type { FaqItem } from "@/app/data/services/types";
import { toPlainText } from "@/components/site/RichText";

export const BUSINESS_ID = `${company.siteUrl}/#entreprise`;

export function absoluteUrl(path: string): string {
  return `${company.siteUrl}${path === "/" ? "" : path}`;
}

/** Métadonnées d'une page : titre (suffixé « | Radialec » par le layout), description, canonical, Open Graph. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** Titre complet sans suffixe automatique (homepage). */
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${company.name}`,
      description,
      url: path,
      siteName: company.name,
      locale: "fr_BE",
      type: "website",
      // Image par défaut du site (app/opengraph-image.tsx). Les segments qui ont
      // leur propre opengraph-image (catégories, fiches service) la remplacent.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${company.name} — ${company.tagline}` }],
    },
  };
}

export interface Crumb {
  label: string;
  href: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function faqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: toPlainText(faq.answer) },
    })),
  };
}

const areaServed = zonesIntervention.flatMap((zone) =>
  zone.communes.map((name) => ({ "@type": "City", name }))
);

export function serviceJsonLd({
  name,
  description,
  path,
  price,
}: {
  name: string;
  description: string;
  path: string;
  price?: PriceRef;
}) {
  const resolved = price ? resolvePrice(price) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": BUSINESS_ID },
    areaServed,
    ...(resolved?.amount !== undefined && {
      offers: {
        "@type": "Offer",
        price: resolved.amount,
        priceCurrency: "EUR",
        description: resolved.note ?? resolved.label,
      },
    }),
  };
}

export function localBusinessJsonLd(logoUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": ["HVACBusiness", "Electrician", "Plumber"],
    "@id": BUSINESS_ID,
    name: company.name,
    description: company.description,
    url: company.siteUrl,
    logo: logoUrl,
    image: logoUrl,
    telephone: company.phone.e164,
    email: company.email,
    address: company.address
      ? {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          postalCode: company.address.postalCode,
          addressLocality: company.address.city,
          addressCountry: "BE",
        }
      : { "@type": "PostalAddress", addressLocality: "Bruxelles", addressCountry: "BE" },
    areaServed,
    knowsAbout: [
      "Chauffage",
      "Chaudière",
      "Pompe à chaleur",
      "Électricité",
      "Plomberie",
      "Climatisation",
    ],
  };
}

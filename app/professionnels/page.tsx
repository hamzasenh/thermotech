import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getService, serviceHref } from "../data/services";
import { ServicePageV2 } from "../sections/v2/ServicePageV2";

// Page unique Professionnels (catégorie + fiche syndics fusionnées) :
// contenu dans app/data/services/professionnels.ts.
const service = getService("professionnels", "syndics-coproprietes");

export const metadata = service
  ? pageMetadata({ title: service.metaTitle, description: service.metaDescription, path: serviceHref(service) })
  : {};

export default function Page() {
  if (!service) notFound();
  return <ServicePageV2 service={service} />;
}

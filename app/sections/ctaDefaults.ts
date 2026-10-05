import type { StaticImageData } from "next/image";
import technicienUrgence from "@/assets/technicien_courant_avec_boite_outils_en_main_écriture-sur-image-technicien-agree-et-intervention-en-24-heures-avec-fleches-sortantes.png";
import technicienInstallation from "@/assets/technicien_debout_regarde_devis_et_ecrit_ecriture-sur-image-technicien-agrée-et-devis-clair-et-transparent-avec-flèche-sortantes.png";
import technicienEntretien from "@/assets/technicien_noir_debout_souriant_doigt_sur_tablette_coupe_aux_cuisses.png";
import type { CtaContent, ServiceIntent } from "../data/services/types";

// CTA final par intention (validés sur les pages de référence : urgence sur la
// homepage, installation sur remplacement-chaudiere, entretien sur
// entretien-chaudiere). Chaque page peut surcharger titre et texte.
export const ctaDefaults: Record<
  ServiceIntent,
  Required<Pick<CtaContent, "eyebrow" | "title">> & {
    highlight?: string;
    image: StaticImageData;
    imageAlt: string;
  }
> = {
  urgence: {
    eyebrow: "Dépannage express",
    title: "Une urgence ? Votre technicien est (presque) déjà en route.",
    highlight: "(presque)",
    image: technicienUrgence,
    imageAlt: "Technicien Radialec en route pour un dépannage",
  },
  installation: {
    eyebrow: "Installation & rénovation",
    title: "Un projet d'installation ? Votre devis, sans mauvaise surprise.",
    image: technicienInstallation,
    imageAlt: "Technicien Radialec préparant un devis d'installation",
  },
  entretien: {
    eyebrow: "Entretien & contrôle",
    title: "Votre entretien est (bientôt) dû ? Prenons rendez-vous.",
    highlight: "(bientôt)",
    image: technicienEntretien,
    imageAlt: "Technicien Radialec prêt pour votre entretien",
  },
};

export function resolveCta(intent: ServiceIntent, cta: CtaContent) {
  const base = ctaDefaults[intent];
  return {
    image: base.image,
    imageAlt: base.imageAlt,
    eyebrow: cta.eyebrow ?? base.eyebrow,
    title: cta.title ?? base.title,
    // Le surlignage par défaut ne s'applique qu'au titre par défaut.
    highlight: cta.title ? cta.highlight : base.highlight,
    body: cta.body,
  };
}

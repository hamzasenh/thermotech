import type { StaticImageData } from "next/image";
import technicienBrasCroises from "@/assets/technicien_debout_souriant_bras_croises_coupés_aux_cuisses.png";
import technicienHanches from "@/assets/technicien_debout_souriant_bras_croisés_coupé_aux_hanches.png";
import technicienCourant from "@/assets/technicien_courant_avec_boite_outils_en_main_écriture-sur-image-technicien-agree-et-intervention-en-24-heures-avec-fleches-sortantes.png";
import type { ServiceIntent } from "@/app/data/services/types";

// Visuel et 2e action du CTA final selon l'intention de la page. Le fond est
// lavande partout (2026-10-05).
export const finalCtaVisual: Record<ServiceIntent, { image: StaticImageData; alt: string; secondary: "devis" | "rendezVous" }> = {
  installation: { image: technicienBrasCroises, alt: "Technicien Radialec, bras croisés", secondary: "devis" },
  entretien: { image: technicienHanches, alt: "Technicien Radialec souriant", secondary: "rendezVous" },
  urgence: { image: technicienCourant, alt: "Technicien Radialec en route avec sa caisse à outils", secondary: "devis" },
};

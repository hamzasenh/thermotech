import type { StaticImageData } from "next/image";

import vaillant from "@/assets/vaillant.png";
import bulex from "@/assets/blx.png";
import buderus from "@/assets/buderus.png";
import bosch from "@/assets/bosch.png";
import junkers from "@/assets/junkers.png";
import viessmann from "@/assets/viessmann.png";
import chaffoteaux from "@/assets/chaffoteaux.png";

import environnement from "@/assets/enviro.png";
import vlaams from "@/assets/vlaams.png";
import wallonie from "@/assets/wallo.png";

export interface Logo {
  src: StaticImageData;
  alt: string;
}

// Marques de chaudières installées et entretenues (logos réels du repo).
// Aucun logo de marque de climatisation / électricité n'existe encore.
export const boilerBrands: Logo[] = [
  { src: vaillant, alt: "Vaillant" },
  { src: bulex, alt: "Bulex" },
  { src: bosch, alt: "Bosch" },
  { src: buderus, alt: "Buderus" },
  { src: junkers, alt: "Junkers" },
  { src: viessmann, alt: "Viessmann" },
  { src: chaffoteaux, alt: "Chaffoteaux" },
];

// Agréments régionaux (Bruxelles, Flandre, Wallonie).
export const certifications: Logo[] = [
  { src: environnement, alt: "Bruxelles Environnement" },
  { src: vlaams, alt: "VEKA – Vlaams Energie- en Klimaatagentschap" },
  { src: wallonie, alt: "Wallonie Environnement" },
];

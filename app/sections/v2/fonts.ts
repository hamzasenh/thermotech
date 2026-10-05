import { Archivo } from "next/font/google";

// Police de la refonte : Archivo (gratuite, Google Fonts), variable en graisse
// et en largeur — titres en version large (font-stretch), texte en largeur normale.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * Fonds des sections de lecture : blanc ou beige (chalk). Règle unique du site
 * (2026-10-05), appliquée par `backgrounds()` dans chaque gabarit :
 *
 * - après une section lavande (haut de page, garantie), on repart sur blanc,
 *   puis on alterne blanc / beige ; l'ordre des sections ne change jamais
 *   pour « tomber juste », c'est la couleur qui s'adapte ;
 * - le bandeau d'appel et la promo (cartes lavande) n'ont aucun fond propre :
 *   comme l'alerte sécurité, ils prolongent la section qui les précède et en
 *   prennent la couleur, blanche ou beige (2026-10-05) ;
 * - le CTA final est lavande, le footer bleu nuit.
 */
export type Tone = "white" | "chalk";

export const toneBg: Record<Tone, string> = { white: "bg-white", chalk: "bg-chalk" };

/** Cartes posées dans une section : toujours l'autre ton, pour rester visibles. */
export const cardBg: Record<Tone, string> = { white: "bg-chalk", chalk: "bg-white" };

export function backgrounds() {
  let last: Tone | "lavender" = "lavender";
  return {
    /** Section de lecture : ton suivant de l'alternance. */
    next(): Tone {
      last = last === "white" ? "chalk" : "white";
      return last;
    },
    /**
     * Carte ou encadré (bandeau d'appel, promo, alerte) : même fond que la
     * section précédente, sans marge haute — sauf juste après une section
     * lavande, où il prend une place blanche.
     */
    attach(): { tone: Tone; attached: boolean } {
      if (last === "lavender") {
        last = "white";
        return { tone: "white", attached: false };
      }
      return { tone: last, attached: true };
    },
    /** Section lavande pleine largeur : l'alternance repart sur blanc après elle. */
    lavender(): void {
      last = "lavender";
    },
  };
}

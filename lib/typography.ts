/**
 * Typographie française : espace insécable avant « ? ! : ; » et à l'intérieur
 * des guillemets, pour éviter qu'une ponctuation se retrouve seule en début
 * de ligne. Appliqué au rendu de tous les textes de contenu.
 */
const NBSP = "\u00a0";

export function fr(text: string): string {
  return text
    .replace(/[ \u00a0]([?!:;»])/g, `${NBSP}$1`)
    .replace(/«[ \u00a0]/g, `«${NBSP}`);
}

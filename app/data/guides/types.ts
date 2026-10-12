import type { CtaContent, FaqItem, ImageSpec, ServiceCategory, ServiceIntent, ServiceRef } from "../services/types";

/**
 * Blocs d'une section de guide, rendus dans l'ordre. Les textes acceptent le
 * format enrichi de RichText (**gras**, [lien](/url)).
 */
export type GuideBlock =
  /** Paragraphes de lecture. */
  | { type: "text"; paragraphs: string[] }
  /** « Ce que vous pouvez vérifier sans risque » : liste numérotée sur carte. */
  | { type: "checks"; title?: string; items: string[] }
  /** « Appelez un technicien si… » : liste au filet rouge, le point de bascule vers l'appel. */
  | { type: "callIf"; title?: string; items: string[] }
  /** Encadré « Bon à savoir ». */
  | { type: "note"; text: string }
  | { type: "image"; image: ImageSpec; caption?: string };

export interface GuideSection {
  /** Ancre de la section (#f28). */
  id: string;
  /** Grand repère typographique (« F.28 ») : la section apparaît dans l'index du haut de page. */
  code?: string;
  /** Libellé court pour l'index et le sommaire (« Pas d'allumage »). */
  label: string;
  /** check : le client peut vérifier quelques points lui-même · pro : technicien nécessaire. */
  status?: "check" | "pro";
  title: string;
  blocks: GuideBlock[];
  /** Question de l'aide en fin de section (« F.28 revient après un réarmement ? »). */
  help?: string;
  /** Sujet du message WhatsApp pré-rempli de cette section. */
  topic?: string;
}

export interface Guide {
  slug: string;
  /** Page parente : l'URL devient parent + /slug (ex. /chauffage/vaillant/codes-erreur). Sinon /guide/<slug>. */
  parent?: ServiceRef;
  category: ServiceCategory;
  /** Pilote les boutons (urgence : appel + WhatsApp « envoyer une photo »), la barre mobile, le CTA final. */
  intent: ServiceIntent;
  /** true = pas encore relu par le gestionnaire : invisible en production (app/data/visibility.ts). */
  draft?: boolean;
  metaTitle: string;
  metaDescription: string;
  /** Dernier maillon du fil d'Ariane. */
  breadcrumb: string;
  eyebrow: string;
  /** <h1>. */
  title: string;
  /** La réponse courte, en tête de page. */
  intro: string;
  /** AAAA-MM-JJ. */
  updated: string;
  /** Nom et métier du relecteur, uniquement après une vraie relecture (« Houdaifa Senhaji, chauffagiste »). */
  reviewedBy?: string;
  /** Sujet du message WhatsApp général du guide. */
  topic: string;
  /** Libellé du bouton WhatsApp du haut de page (défaut : « Envoyer une photo »). */
  photoLabel?: string;
  /** Titre du panneau d'accès rapide du haut de page (« Votre code »). */
  indexTitle?: string;
  /** Encadré de sécurité juste après le haut de page (ex. odeur de gaz, texte validé). */
  safety?: { title: string; paragraphs: string[] };
  /** Réflexes valables pour toute la page, avant les sections. */
  reflexes?: { title: string; items: { title: string; text: string }[] };
  sections: GuideSection[];
  /** Sources consultées, affichées en bas de l'article. */
  sources?: string[];
  /** Mise en garde en bas de l'article (limites du guide). */
  disclaimer?: string;
  faqs: FaqItem[];
  related: ServiceRef[];
  cta: CtaContent;
}

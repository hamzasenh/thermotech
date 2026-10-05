import type { AssetId } from "../assets-needed";
import type { StaticImageData } from "next/image";
import type { IconKey } from "@/components/site/Icon";
import type { PriceRef } from "../pricing";

export type ServiceCategory =
  | "chauffage"
  | "electricite"
  | "plomberie"
  | "climatisation"
  | "professionnels";

/**
 * Intention dominante du visiteur sur la page. Elle pilote le CTA principal
 * du hero (appel / devis / rendez-vous), le bandeau d'appel en milieu de page
 * et le visuel du CTA final.
 */
export type ServiceIntent = "urgence" | "entretien" | "installation";

/** Référence « categorie/slug » vers une page service. */
export type ServiceRef = `${ServiceCategory}/${string}`;

export interface ImageSpec {
  src?: StaticImageData;
  alt: string;
  /** Asset attendu (identifiant de prompts/refonte/02-assets.md) tant que `src` manque. */
  asset?: AssetId;
  /**
   * Description précise de l'image à produire quand `src` est absent —
   * affichée telle quelle dans le placeholder.
   */
  placeholder?: string;
}

export interface Fact {
  icon: IconKey;
  stat: string;
  label: string;
}

export interface Feature {
  icon: IconKey;
  title: string;
  text: string;
}

export interface Step {
  title: string;
  description: string;
  /** Visuel de l'étape (gabarit refondu uniquement). */
  image?: ImageSpec;
}

/** Verdict court d'un encadré comparatif (gabarit refondu) : ex. « Mazout — interdit à Bruxelles ». */
export interface Verdict {
  label: string;
  /** Statut court affiché en grand (ex. « Interdit », « TVA 6 % »). */
  status: string;
  note: string;
  /** flame / water : couleur du logo associée · off : option exclue. */
  tone: "flame" | "water" | "off";
}

export interface Option {
  title: string;
  badge?: string;
  text: string;
  points?: string[];
}

export interface FaqItem {
  id: number;
  question: string;
  /** Texte enrichi : **gras** et [lien](/url) autorisés. */
  answer: string;
}

/**
 * Blocs de contenu d'une page service, rendus dans l'ordre du tableau.
 * Les champs texte acceptent le format enrichi minimal de RichText
 * (**gras**, [lien](/url)).
 */
export type Block =
  | {
      type: "features";
      eyebrow?: string;
      title: string;
      intro?: string;
      items: Feature[];
      /** columns : pictos centrés (3-4 items) · list : lignes à gauche (symptômes, 4-8 items) */
      layout?: "columns" | "list";
      note?: string;
    }
  | {
      type: "checklist";
      eyebrow?: string;
      title: string;
      intro?: string;
      items: string[];
      note?: string;
      image: ImageSpec;
    }
  | {
      type: "steps";
      eyebrow?: string;
      title: string;
      intro?: string;
      steps: Step[];
    }
  | {
      type: "callout";
      title: string;
      paragraphs: string[];
      /** Gabarit refondu : résumé visuel des options, tiré du texte validé. */
      verdicts?: Verdict[];
    }
  /** Chiffres mis en avant (ex. garantie 2 ans + 2 ans) avec leur texte. */
  | {
      type: "highlight";
      eyebrow?: string;
      title: string;
      figures: { value: string; label: string }[];
      paragraphs: string[];
      /** Condition en petit, en bas du bloc. */
      note?: string;
    }
  | {
      type: "options";
      eyebrow?: string;
      title: string;
      intro?: string;
      items: Option[];
    }
  | {
      type: "pricing";
      eyebrow?: string;
      title: string;
      intro?: string;
      items: PriceRef[];
      note?: string;
    }
  | {
      type: "brands";
      title: string;
      intro?: string;
    }
  | {
      type: "alert";
      title: string;
      paragraphs: string[];
      tone?: "danger" | "info";
    }
  /** Bandeau d'appel navy. Inséré automatiquement après le 2e bloc si absent. */
  | {
      type: "callBand";
      title?: string;
      text?: string;
    };

export interface CtaContent {
  eyebrow?: string;
  title?: string;
  /** Portion du titre mise en évidence en rouge flamme, ex. « (presque) ». */
  highlight?: string;
  body: string;
}

export interface Service {
  category: ServiceCategory;
  slug: string;
  /** URL publique si elle diffère de /categorie/slug (ex. page Professionnels fusionnée : « /professionnels »). */
  path?: string;
  /** Libellé court : navigation, pastilles. */
  title: string;
  /** Nom descriptif : cartes, fil d'Ariane, liens connexes. */
  name: string;
  /** <h1> de la page. */
  pageTitle: string;
  /** <title> sans le suffixe « | Radialec » (ajouté par le template). */
  metaTitle: string;
  metaDescription: string;
  /** Résumé 1-2 phrases pour les cartes. */
  summary: string;
  icon: IconKey;
  intent: ServiceIntent;
  /** Prix d'appel (hero, cartes, données structurées). */
  price?: PriceRef;
  hero: {
    eyebrow: string;
    intro: string;
    image: ImageSpec;
  };
  facts: Fact[];
  blocks: Block[];
  faqTitle?: string;
  faqs: FaqItem[];
  related: ServiceRef[];
  cta: CtaContent;
  zonesIntro?: string;
  /**
   * true = texte rédigé sans validation de Radialec (brouillon IA) : à
   * relire avant d'être considéré comme un engagement commercial.
   */
  draft?: boolean;
}

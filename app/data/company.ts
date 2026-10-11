// Source unique des coordonnées et promesses commerciales de Radialec.
// Tout composant qui affiche un numéro, un e-mail, une note Google ou une
// promesse (délai, garantie…) doit lire ce fichier — ne jamais recopier ces
// valeurs en dur dans une page.

/** Actions mesurées comme conversions Google Ads (lib/tracking.ts). */
export type AdsConversion = "devis" | "rappel" | "rendezVous" | "appel" | "whatsapp";

export const company = {
  name: "Radialec",
  tagline: "Chauffage, électricité, plomberie et climatisation à Bruxelles",
  description:
    "Chauffagiste, électricien et plombier à Bruxelles et ses environs : installation, entretien et dépannage 7j/7, intervention sous 24h, devis gratuit.",

  phone: {
    display: "+32 486 44 21 86",
    /** Format court, pour les écrans étroits (en-tête mobile). */
    local: "0486 44 21 86",
    href: "tel:+32486442186",
    e164: "+32486442186",
  },

  // WhatsApp sur le numéro principal (analyse : prompts/refonte/06-cta-whatsapp-avis.md).
  // À CONFIRMER : WhatsApp (Business) doit être actif sur ce numéro.
  whatsapp: {
    /** Numéro au format international, sans « + » ni espaces (lien wa.me). */
    number: "32486442186",
    hours: "7j/7, de 10h à 21h",
  },

  // Boîte @radialec active (Q45, 04-reponses) : remplace info@thermotechs.be.
  email: "info@radialec.be",

  // Siège social, sans local ni accueil du public (Q20, 04-reponses). Affiché
  // uniquement dans le pied de page (« Siège social ») et les pages légales :
  // jamais comme adresse de visite (pas de carte, pas de « venez nous voir »).
  address: {
    street: "Lange Eikstraat 46",
    postalCode: "1970",
    city: "Wezembeek-Oppem",
  } as null | {
    street: string;
    postalCode: string;
    city: string;
  },

  hours: {
    summary: "7j/7",
    // Appels pris tous les jours de 10h à 21h (Q20). Jamais « 24h/24 ».
    detail: "7j/7, de 10h à 21h" as string | null,
  },

  google: {
    // Pas de nombre exact en dur (D5) : il change. « Plus de 30 » reste vrai quand il
    // augmente (31 avis le 11/10/2026).
    rating: 5,
    reviewsFloor: 30,
    url: "https://share.google/2lcgT4FuqMHlxXEqc",
    // Formulaire « Écrire un avis » (ordinateur et mobile). Place ID tiré de l'identifiant
    // Maps de la fiche (0x47c3ddc0a0322b9f:0x481790fd4bad26ad) ; vérifié le 11/10/2026 :
    // ouvre bien le formulaire d'avis RADIALEC. Toujours diffusé via radialec.be/avis
    // (next.config.ts) : la cible peut changer sans réimprimer les cartes QR.
    reviewUrl: "https://search.google.com/local/writereview?placeid=ChIJnysyoMDdw0cRrSatS_2QF0g",
  },

  // À FOURNIR — les icônes existaient dans l'ancien footer mais sans URL.
  // Un réseau n'est affiché que si son URL est renseignée.
  socials: {
    instagram: null as string | null,
    tiktok: null as string | null,
  },

  promises: {
    intervention: "Intervention sous 24h",
    availability: "7j/7",
    quote: "Devis gratuit sous 24h",
    warranty: "Garantie 2 ans",
    clients: "+200 clients satisfaits",
    // Seul délai confirmé (Q27, 04-reponses) : rappel en journée.
    callback: "sous 2 h, entre 10h et 21h" as string | null,
    // Urgences par téléphone (demande du 12/10/2026, confirmations devis et rappel).
    // À CONFIRMER : le reste du site affiche les appels 7j/7 de 10h à 21h (hours.detail).
    emergency: "24h/24",
  },

  // À FOURNIR — informations légales (mentions légales, politique de
  // confidentialité). Tant qu'une valeur est null, les pages légales affichent
  // un placeholder « À fournir ».
  legal: {
    // Vérifié sur la BCE publique le 08/10/2026 (kbopub.economie.fgov.be, n° 1008.693.201) :
    // entreprise active, SRL, siège à Wezembeek-Oppem, début le 23/04/2024, assujettie TVA.
    /** Dénomination sociale exacte (peut différer du nom commercial). */
    companyName: "Thermo Tech Solutions SRL" as string | null,
    /** Forme juridique, ex. « SRL ». */
    legalForm: "Société à responsabilité limitée (SRL)" as string | null,
    /** Numéro d'entreprise BCE, ex. « BE 0123.456.789 ». */
    enterpriseNumber: "BE 1008.693.201" as string | null,
    /** Hébergeur du site : nom, adresse, contact (adresse : vercel.com/legal/privacy-policy, 08/10/2026). */
    host: "Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (vercel.com)" as string | null,
    /** Responsable de la publication (personne physique). */
    publisher: "Houdaifa Senhaji, gérant de Thermo Tech Solutions SRL" as string | null,
  },

  // Mesure d'audience — chargée uniquement après consentement (CookieConsent).
  analyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "G-T01KFFNNN3",

  // Microsoft Clarity (enregistrements de visites anonymisés, cartes de clics) :
  // identifiant du projet (clarity.microsoft.com → Paramètres). Absent = désactivé.
  // Chargé uniquement après accord « mesure d'audience ».
  clarityId: (process.env.NEXT_PUBLIC_CLARITY_ID || null) as string | null,

  // Google Ads : balise « AW-123456789 » (Objectifs → Conversions → Configuration
  // de la balise). Absent = désactivé, et la bannière cookies ne parle pas de publicité.
  // Chargée uniquement après accord « publicité ». Pas de remarketing (ad_personalization refusé).
  googleAds: {
    id: (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || null) as string | null,
    // Libellé de chaque action de conversion (« AW-123456789/AbCdEf… » → « AbCdEf… »).
    // null = conversion non envoyée. Voir prompts/refonte/07-suivi-ads-clarity.md.
    conversions: {
      devis: null,
      rappel: null,
      rendezVous: null,
      appel: null,
      whatsapp: null,
    } as Record<AdsConversion, string | null>,
  },

  // À CONFIRMER — domaine de production, utilisé pour les URL canoniques, le
  // sitemap et les données structurées. Surchargeable via NEXT_PUBLIC_SITE_URL.
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.radialec.be").replace(/\/$/, ""),
};

// Les trois actions de conversion du site. `href` vide = pas encore branché :
// sur /contact le bouton reste inerte ; ailleurs sur le site, les CTA mènent à
// l'ancre correspondante de /contact. Renseigner `href` suffit à tout brancher.
export type ContactActionKey = "devis" | "rendezVous" | "rappel";

export const contactActions: Record<
  ContactActionKey,
  { label: string; anchor: string; href: string | null }
> = {
  devis: {
    label: "Demander un devis gratuit",
    anchor: "devis",
    href: "/devis",
  },
  rendezVous: {
    label: "Prendre rendez-vous",
    anchor: "rendez-vous",
    href: "/rendez-vous",
  },
  rappel: {
    label: "Être rappelé",
    anchor: "rappel",
    href: "/contact#formulaire-rappel",
  },
};

/**
 * Lien WhatsApp avec un message pré-rempli : le client n'a plus qu'à décrire son
 * besoin, Radialec sait de quelle page il vient.
 */
export function whatsappHref(topic?: string): string {
  const text = topic
    ? `Bonjour Radialec, je vous contacte au sujet de : ${topic}.`
    : "Bonjour Radialec, j'aimerais un renseignement.";
  return `https://wa.me/${company.whatsapp.number}?text=${encodeURIComponent(text)}`;
}

/**
 * `context` = service (« chauffage/pompe-a-chaleur ») ou catégorie
 * (« chauffage ») d'où part le clic : la page de destination se pré-remplit
 * avec (prestation du devis, type de rendez-vous, sujet du rappel).
 */
export function contactActionHref(key: ContactActionKey, context?: string): string {
  const href = contactActions[key].href;
  if (!href) return `/contact#${contactActions[key].anchor}`;
  if (!context || !href.startsWith("/")) return href;
  // La requête doit précéder l'ancre : /contact?service=…#formulaire-rappel.
  const [path, hash] = href.split("#");
  return `${path}?service=${encodeURIComponent(context)}${hash ? `#${hash}` : ""}`;
}

// Réservation en ligne (Cal.com) sur /rendez-vous. Chaque type de rendez-vous
// créé sur Cal.com est relié aux prestations qu'il couvre (`services`, réf.
// « categorie/slug »). Un visiteur qui arrive d'une prestation sans type de
// rendez-vous en ligne (clim, ramonage, boiler…) se voit proposer d'être rappelé
// plutôt qu'un créneau qui ne correspond pas à son besoin.
// Les réservations arrivent dans l'agenda du compte Cal.com qui possède le
// lien : changer de compte = remplacer `calLink` ici.
export const onlineBooking = {
  /** Couleur des boutons de l'agenda = flame (tailwind.config.ts). */
  brandColor: "#e52619",
  events: [
    {
      calLink: "mohamed-senhaji-yzzi5r/rendez-vous-de-45-min-entretien-chaudiere",
      label: "Entretien de chaudière",
      services: ["chauffage/entretien-chaudiere"],
    },
  ],
  /** Type proposé quand le visiteur arrive sans prestation précise (accueil, /contact, /tarifs…). */
  defaultEvent: "mohamed-senhaji-yzzi5r/rendez-vous-de-45-min-entretien-chaudiere",
};

export type BookingEvent = (typeof onlineBooking.events)[number];

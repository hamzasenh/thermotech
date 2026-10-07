// Source unique des coordonnées et promesses commerciales de Radialec.
// Tout composant qui affiche un numéro, un e-mail, une note Google ou une
// promesse (délai, garantie…) doit lire ce fichier — ne jamais recopier ces
// valeurs en dur dans une page.

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
    // Pas de nombre d'avis en dur (D5, 04-reponses) : il change, on ne l'affiche plus.
    rating: 5,
    url: "https://share.google/2lcgT4FuqMHlxXEqc",
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

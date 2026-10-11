import type { ServiceCategory, ServiceIntent } from "./services/types";

/**
 * Avis Google réels de la fiche RADIALEC, copiés mot pour mot (relevés le
 * 11/10/2026 sur Google Maps : 31 avis, note 5,0). Prénom + initiale seulement.
 * Date approximative tirée de la date relative de Google (« il y a un mois »…) :
 * mois pour les avis récents, année au-delà. Ne jamais réécrire ni inventer un avis.
 * À rafraîchir chaque mois avec les nouveaux avis précis (prompts/refonte/06).
 */
export interface Review {
  author: string;
  /** « 2026-09 » (mois) ou « 2025 » (année seule quand Google indique « il y a un an »). */
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Prestation concernée, pour montrer l'avis sur les pages qui lui correspondent. */
  intent?: ServiceIntent;
  category?: ServiceCategory;
}

export const reviews: Review[] = [
  {
    author: "Eva M.",
    date: "2026-09",
    rating: 5,
    text: "Intervention très rapide un vendredi soir et un jour férié pour une fuite urgente sur notre chaudière. Le technicien a identifié le problème et est revenu le lendemain pour remplacer la pièce et tout remettre en service. Service efficace et réactif dans une situation d'urgence.",
    intent: "urgence",
    category: "chauffage",
  },
  {
    author: "Elodie M.",
    date: "2026-09",
    rating: 5,
    text: "Très satisfait de l’entretien de ma chaudière. Service professionnel et prix correct.",
    intent: "entretien",
    category: "chauffage",
  },
  {
    author: "Lorenzo M.",
    date: "2026-09",
    rating: 5,
    text: "Chauffagiste très professionnel. Il a rapidement identifié le problème sur notre chaudière et l’a réparé.",
    intent: "urgence",
    category: "chauffage",
  },
  {
    author: "Paul B.",
    date: "2026-08",
    rating: 5,
    text: "Super satisfait. Je n’avais plus d’eau chaude ; le problème a été rapidement identifié et résolu. Prix correct, travail professionnel. Je ne peux que recommander Houdaifa !",
    intent: "urgence",
    category: "chauffage",
  },
  {
    author: "Humic H.",
    date: "2025",
    rating: 5,
    text: "Je suis très satisfait du service d'entretien de chaudière que j'ai reçu. Le technicien a été professionnelle, ponctuelle et a effectué un travail de qualité. Je recommande vivement leurs services à tous ceux qui cherchent un entretien fiable et efficace.",
    intent: "entretien",
    category: "chauffage",
  },
  {
    author: "Sam S.",
    date: "2025",
    rating: 5,
    text: "Un code erreur incompréhensible sur ma chaudière, mais ils ont rapidement trouvé la panne et réparé. Très pro !",
    intent: "urgence",
    category: "chauffage",
  },
  {
    author: "Bogdan M.",
    date: "2025",
    rating: 5,
    text: "J'ai contacté pour faire l'entretient de ma chaudière je suis très content du résultat. Très bon service rapide de qualité. Je recommande.",
    intent: "entretien",
    category: "chauffage",
  },
  {
    author: "Youssef T.",
    date: "2025",
    rating: 5,
    text: "Très bon chauffagiste et travail très propre, je recommande !!!",
    category: "chauffage",
  },
  {
    author: "Viviane L.",
    date: "2025",
    rating: 5,
    text: "Très bon service avec le sourire et rapide",
  },
];

/**
 * Les `count` avis les plus utiles pour une page : même prestation d'abord,
 * puis même métier, puis les plus récents et les plus précis. Sans contexte
 * (accueil, tarifs…), on panache urgence / entretien pour montrer les deux.
 */
export interface ReviewContext {
  intent?: ServiceIntent;
  category?: ServiceCategory;
}

export function pickReviews({ intent, category }: ReviewContext = {}, count = 3): Review[] {
  const score = (review: Review) =>
    (intent && review.intent === intent ? 4 : 0) +
    (category && review.category === category ? 2 : 0) +
    (review.date.length > 4 ? 1 : 0) +
    (review.text.length > 90 ? 0.5 : 0);
  const sorted = [...reviews].sort((a, b) => score(b) - score(a) || b.date.localeCompare(a.date));
  if (intent || category) return sorted.slice(0, count);

  // Sans contexte : au moins un avis de dépannage et un d'entretien.
  const picked: Review[] = [];
  for (const wanted of ["urgence", "entretien", undefined] as const) {
    const next = sorted.find((r) => !picked.includes(r) && (wanted === undefined || r.intent === wanted));
    if (next) picked.push(next);
  }
  return [...picked, ...sorted.filter((r) => !picked.includes(r))].slice(0, count);
}

/** Le plus récent des avis courts (encart du devis, là où la place manque). */
export function shortReview(maxLength = 110): Review {
  const short = reviews.filter((r) => r.text.length <= maxLength);
  return [...(short.length ? short : reviews)].sort((a, b) => b.date.localeCompare(a.date))[0];
}

const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** « septembre 2026 » ou « 2025 ». */
export function reviewDate(date: string): string {
  const [year, month] = date.split("-");
  return month ? `${months[Number(month) - 1]} ${year}` : year;
}

// Grille tarifaire unique du site (prix TVAC). Toute page qui affiche un prix
// passe par ce fichier : modifier un tarif ici le met à jour partout
// (homepage, pages service, /tarifs, données structurées).

export interface PriceItem {
  label: string;
  /** Montant TVAC en euros. Absent = « Sur devis ». */
  amount?: number;
  /** Ancien prix barré (promo). */
  originalAmount?: number;
  /** Affiche « Dès » devant le montant. */
  from?: boolean;
  note?: string;
  popular?: boolean;
}

export const prices = {
  entretienChaudiereGaz: {
    label: "Entretien chaudière gaz",
    // Repassé à 149 € le 08/10/2026 (fin du prix de lancement à 129 €).
    amount: 149,
    note: "Contrôle complet + attestation",
    popular: true,
  },
  depannage: {
    label: "Dépannage (chaudière, sanitaire, électrique, clim/PAC)",
    amount: 149,
    note: "Déplacement + diagnostic + 1ère heure",
  },
  entretienChaudiereMazout: {
    label: "Entretien chaudière mazout",
    amount: 219,
    note: "Contrôle complet + attestation",
  },
  entretienChauffeEau: {
    label: "Entretien chauffe-eau",
    amount: 129,
  },
  entretienBoilerElectrique: {
    label: "Entretien boiler électrique",
    amount: 149,
  },
  debouchage: {
    label: "Débouchage canalisation / WC / lavabo",
    amount: 200,
  },
  ramonage: {
    label: "Ramonage cheminée",
    amount: 149,
  },
  entretienPac: {
    label: "Entretien pompe à chaleur",
    amount: 180,
  },
} satisfies Record<string, PriceItem>;

export type PriceKey = keyof typeof prices;

/**
 * Conditions tarifaires affichées sur le « ticket » de /tarifs.
 * À CONFIRMER par Radialec : tant qu'une valeur est null, le ticket affiche
 * « à confirmer » à la place. Renseigner la valeur (texte court, tel qu'il
 * doit apparaître) suffit à la publier partout.
 */
export const pricingPolicy = {
  /** Tarif au-delà de la 1ère heure de dépannage. Ex. « 65€ TVAC / heure entamée » */
  extraHour: null as string | null,
  /** Supplément soir / week-end / jours fériés. Ex. « Aucun — même prix 7j/7 » */
  surcharge: null as string | null,
  /** Déplacement pour un entretien ou une installation. Ex. « Inclus dans toute la zone » */
  travel: null as string | null,
  /** Taux de TVA appliqué. Ex. « 6% (logement de plus de 10 ans), sinon 21% » */
  vatRate: "6 % sur le remplacement de chaudière si le logement a au moins 10 ans" as string | null,
  /** Moyens de paiement acceptés. Ex. « Bancontact, Payconiq, virement » */
  payment: null as string | null,
  /** Validité de l'offre entretien gaz (prix et ancien prix : entretienChaudiereGaz). Ex. « Jusqu'au 31/12/2026 » */
  promoValidity: null as string | null,
};

/** Référence à un tarif de la grille, avec libellé/note surchargeables pour le contexte d'une page. */
export interface PriceRef {
  key?: PriceKey;
  label?: string;
  note?: string;
  popular?: boolean;
}

export function resolvePrice(ref: PriceRef): PriceItem {
  const base: PriceItem = ref.key ? prices[ref.key] : { label: "" };
  return {
    ...base,
    label: ref.label ?? base.label,
    note: ref.note ?? base.note,
    popular: ref.popular ?? base.popular,
  };
}

export function formatAmount(item: PriceItem): string {
  return item.amount === undefined ? "Sur devis" : `${item.amount}€`;
}

// Grille tarifaire unique du site (prix TVAC). Toute page qui affiche un prix
// passe par ce fichier : modifier un tarif ici le met à jour partout
// (homepage, pages service, /tarifs, données structurées).

/** Supplément par unité intérieure pour l'entretien d'une airco (gestionnaire, 08/10/2026). */
export const aircoPerIndoorUnit = 90;

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
  // Dépannage 149 € et heure supplémentaire 60 € TVAC : confirmés par le gestionnaire le 08/10/2026.
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
  // Prix confirmés par le gestionnaire le 08/10/2026 (chauffe-eau gaz 129 €, électrique 160 €).
  entretienChauffeEau: {
    label: "Entretien chauffe-eau gaz",
    amount: 129,
  },
  entretienBoilerElectrique: {
    label: "Entretien boiler électrique",
    amount: 160,
  },
  debouchage: {
    label: "Débouchage canalisation / WC / lavabo",
    amount: 200,
    note: "Colonne et égout chiffrés à part",
  },
  ramonage: {
    label: "Ramonage cheminée",
    amount: 149,
    note: "Attestation de ramonage comprise",
  },
  entretienPac: {
    label: "Entretien pompe à chaleur",
    amount: 180,
  },
  // Ajouts du 08/10/2026 (réponses du gestionnaire).
  heureSupplementaire: {
    label: "Heure supplémentaire (dépannage)",
    amount: 60,
  },
  entretienAirco: {
    label: "Entretien climatisation (airco)",
    amount: 240,
    note: `+ ${aircoPerIndoorUnit} € par unité intérieure`,
  },
  detartrage: {
    label: "Détartrage",
    amount: 300,
  },
  miseEnConformite: {
    label: "Mise en conformité électrique",
    amount: 990,
    note: "Repérage, schémas électriques et passage de l'organisme agréé, si aucune modification n'est nécessaire",
  },
  contratEntretien: {
    label: "Contrat d'entretien chaudière (2 ans)",
    amount: 130,
    note: "Particuliers",
  },
} satisfies Record<string, PriceItem>;

export type PriceKey = keyof typeof prices;

/**
 * Conditions tarifaires affichées sous la carte de /tarifs (réponses du
 * gestionnaire, 08/10/2026). Une valeur null n'est pas affichée du tout.
 * Aucun pourcentage de TVA n'est publié (choix du propriétaire) : les prix sont TVAC.
 */
export const pricingPolicy = {
  /** Tarif au-delà de la 1ère heure de dépannage. Ex. « 65€ TVAC / heure entamée » */
  extraHour: `${prices.heureSupplementaire.amount} € TVAC de l'heure` as string | null,
  /** Suppléments (gestionnaire, 08/10/2026), un par ligne sur /tarifs. */
  weekendSurcharge: "+20 €" as string | null,
  holidaySurcharge: "+50 €" as string | null,
  /** Urgence = intervention dans les 2 heures. */
  urgentSurcharge: "+50 €" as string | null,
  /** Déplacement pour un entretien ou une installation. Ex. « Inclus dans toute la zone » */
  travel: "Compris jusqu'à 50 km, supplément au-delà" as string | null,
  /** Taux de TVA : jamais publié (choix du propriétaire, 08/10/2026). Laisser null. */
  vatRate: null as string | null,
  /** Moyens de paiement acceptés. Ex. « Bancontact, Payconiq, virement » */
  payment: "Espèces ou application bancaire (Wero, Payconiq)" as string | null,
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

import { categoryOrder } from "./categories";
import { pricingPolicy, resolvePrice, type PriceRef } from "./pricing";
import { getServiceByRef, serviceHref } from "./services";
import type { ServiceRef } from "./services/types";

// Contenu de /tarifs : quelles lignes de prix, dans quel ordre, vers quelle
// page. Les MONTANTS viennent de pricing.ts ; les conditions générales
// (heure supplémentaire, TVA, paiement…) de `pricingPolicy`.
//
// Questions encore ouvertes côté Radialec (à reporter dans les notes une fois
// confirmées) :
//   - chauffe-eau à 129€ : quel type d'appareil (gaz ?) ;
//   - ramonage à 149€ : attestation incluse ? ;
//   - débouchage à 200€ : colonne et égout inclus ? ;
//   - entretien PAC à 180€ : l'airco (air-air) au même tarif ?

interface TarifLine {
  id: string;
  price: PriceRef;
  service: ServiceRef;
}

interface TarifGroup {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  lines: TarifLine[];
}

const groups: TarifGroup[] = [
  {
    id: "chauffage",
    label: "Chauffage",
    shortLabel: "Chauffage",
    href: "/chauffage",
    lines: [
      { id: "entretien-gaz", price: { key: "entretienChaudiereGaz" }, service: "chauffage/entretien-chaudiere" },
      { id: "entretien-mazout", price: { key: "entretienChaudiereMazout" }, service: "chauffage/entretien-chaudiere" },
      {
        id: "depannage-chaudiere",
        price: { key: "depannage", label: "Dépannage chaudière" },
        service: "chauffage/depannage-chaudiere",
      },
      { id: "chauffe-eau", price: { key: "entretienChauffeEau" }, service: "chauffage/entretien-chauffe-eau-boiler" },
      { id: "boiler", price: { key: "entretienBoilerElectrique" }, service: "chauffage/entretien-chauffe-eau-boiler" },
      { id: "ramonage", price: { key: "ramonage" }, service: "chauffage/ramonage-cheminee" },
      {
        id: "remplacement-chaudiere",
        price: { label: "Remplacement de chaudière", note: "Gaz à condensation ou pompe à chaleur" },
        service: "chauffage/remplacement-chaudiere",
      },
      {
        id: "pompe-a-chaleur",
        price: { label: "Pompe à chaleur", note: "Étude du logement et dimensionnement" },
        service: "chauffage/pompe-a-chaleur",
      },
      {
        id: "desembouage",
        price: { label: "Désembouage", note: "Selon la taille de l'installation" },
        service: "chauffage/desembouage",
      },
      {
        id: "radiateurs",
        price: { label: "Radiateurs", note: "Selon le nombre et le modèle" },
        service: "chauffage/installation-radiateurs",
      },
    ],
  },
  {
    id: "plomberie",
    label: "Plomberie & sanitaire",
    shortLabel: "Plomberie",
    href: "/plomberie",
    lines: [
      { id: "depannage-sanitaire", price: { key: "depannage", label: "Dépannage sanitaire" }, service: "plomberie/depannage" },
      { id: "debouchage", price: { key: "debouchage", label: "Débouchage" }, service: "plomberie/debouchage" },
      {
        id: "detartrage",
        price: { label: "Détartrage", note: "Selon les équipements à traiter" },
        service: "plomberie/detartrage",
      },
    ],
  },
  {
    id: "electricite",
    label: "Électricité",
    shortLabel: "Électricité",
    href: "/electricite",
    lines: [
      {
        id: "depannage-electrique",
        price: { key: "depannage", label: "Dépannage électrique" },
        service: "electricite/depannage-electrique",
      },
      {
        id: "installation-electrique",
        price: { label: "Installation électrique", note: "Neuf, rénovation ou extension" },
        service: "electricite/installation-electricite",
      },
      {
        id: "conformite",
        price: { label: "Mise en conformité RGIE", note: "Après diagnostic de l'installation" },
        service: "electricite/mise-en-conformite-electrique",
      },
      {
        id: "renovation-electrique",
        price: { label: "Rénovation électrique", note: "Partielle ou complète" },
        service: "electricite/renovation",
      },
      {
        id: "schema",
        price: { label: "Schéma électrique", note: "Unifilaire + plans de position" },
        service: "electricite/schema-electrique",
      },
      {
        id: "borne",
        price: { label: "Borne de recharge", note: "Selon la puissance et le raccordement" },
        service: "electricite/installation-borne-recharge",
      },
      {
        id: "parlophonie",
        price: { label: "Parlophonie", note: "Maison ou immeuble" },
        service: "electricite/installation-parlophonie",
      },
      {
        id: "videophonie",
        price: { label: "Vidéophonie", note: "Selon le modèle choisi" },
        service: "electricite/installation-videophonie",
      },
    ],
  },
  {
    id: "climatisation",
    label: "Climatisation & PAC",
    shortLabel: "Clim & PAC",
    href: "/climatisation",
    lines: [
      { id: "entretien-pac", price: { key: "entretienPac" }, service: "climatisation/entretien-climatisation" },
      {
        id: "depannage-clim",
        price: { key: "depannage", label: "Dépannage clim / PAC" },
        service: "climatisation/depannage-climatisation",
      },
      {
        id: "installation-clim",
        price: { label: "Installation de climatisation", note: "Selon le nombre d'unités" },
        service: "climatisation/installation-climatisation",
      },
      {
        id: "entretien-airco",
        price: { label: "Entretien airco", note: "Selon le nombre d'unités" },
        service: "climatisation/entretien-climatisation",
      },
    ],
  },
];

export interface ResolvedTarif {
  id: string;
  label: string;
  note?: string;
  amount?: number;
  originalAmount?: number;
  href: string;
  serviceName: string;
}

export interface ResolvedGroup {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  lines: ResolvedTarif[];
}

export function getTarifGroups(): ResolvedGroup[] {
  // Même ordre que la navigation (priorité commerciale, Q13).
  const rank = (id: string) => categoryOrder.indexOf(id as (typeof categoryOrder)[number]);
  return [...groups].sort((a, b) => rank(a.id) - rank(b.id)).map((group) => ({
    id: group.id,
    label: group.label,
    shortLabel: group.shortLabel,
    href: group.href,
    lines: group.lines.map((line) => {
      const price = resolvePrice(line.price);
      const service = getServiceByRef(line.service);
      return {
        id: line.id,
        label: price.label,
        note: price.note,
        amount: price.amount,
        originalAmount: price.originalAmount,
        href: serviceHref(service),
        serviceName: service.name,
      };
    }),
  }));
}

/** Conditions générales affichées sous la carte. `value: null` = encore à confirmer. */
/**
 * Conditions affichées sous la carte des prix. Une condition encore non décidée
 * (`null`) n'est pas affichée du tout : le site ne dit rien plutôt que « à
 * confirmer » (04-reponses, Q22).
 */
export function getPolicyRows(): { label: string; value: string }[] {
  const rows = [
    { label: "Dépannage au-delà de la 1ère heure", value: pricingPolicy.extraHour },
    { label: "Soir, week-end et jours fériés", value: pricingPolicy.surcharge },
    { label: "Déplacement (entretiens)", value: pricingPolicy.travel },
    { label: "TVA réduite", value: pricingPolicy.vatRate },
    { label: "Paiement", value: pricingPolicy.payment },
    { label: "Offre entretien gaz", value: pricingPolicy.promoValidity },
  ];
  return rows.flatMap((row) => (row.value ? [{ label: row.label, value: row.value }] : []));
}

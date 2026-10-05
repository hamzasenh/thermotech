import type { Service } from "./types";

// Catégorie Professionnels. Aucune référence client n'est citée : à ajouter
// uniquement avec l'accord écrit des syndics concernés.

export const professionnelsServices: Service[] = [
  {
    category: "professionnels",
    slug: "syndics-coproprietes",
    // Page fusionnée avec la catégorie : servie à /professionnels (l'ancienne URL redirige).
    path: "/professionnels",
    title: "Syndics & copropriétés",
    name: "Services pour syndics et copropriétés",
    pageTitle: "Chauffage, électricité et plomberie pour syndics et copropriétés à Bruxelles",
    metaTitle: "Technicien pour syndics et copropriétés à Bruxelles",
    metaDescription:
      "Syndics et copropriétés à Bruxelles : chaufferie collective, électricité des communs, parlophonie, colonnes. Un interlocuteur unique, devis sous 24h.",
    summary:
      "Chaufferie collective, électricité des communs, parlophonie, colonnes : un interlocuteur unique pour vos immeubles.",
    icon: "building",
    intent: "installation",
    hero: {
      eyebrow: "Syndics · Gestionnaires · ACP",
      intro:
        "Chaufferie collective, éclairage des communs, parlophonie, colonnes d'eau : gérer un immeuble, c'est jongler avec les corps de métier. Radialec vous offre un interlocuteur unique, disponible 7j/7, et des devis clairs à présenter à vos copropriétaires.",
      image: {
        asset: "P50",
        alt: "Technicien Radialec dans la chaufferie collective d'un immeuble",
        placeholder:
          "Technicien Radialec en tenue navy dans la chaufferie collective d'un immeuble bruxellois, tablette en main devant une chaudière au sol (format paysage)",
      },
    },
    facts: [
      { icon: "users", stat: "Interlocuteur unique", label: "Chauffage, électricité, plomberie" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention rapide, 7j/7" },
      { icon: "fileSign", stat: "Devis gratuit sous 24h", label: "Détaillé, prêt pour l'AG" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
    ],
    blocks: [
      {
        type: "features",
        title: "Tout le technique de vos parties communes",
        intro: "Un seul prestataire pour les installations que partagent vos copropriétaires.",
        items: [
          {
            icon: "fire",
            title: "Chauffage collectif",
            text: "Entretien et dépannage de la chaufferie, contrôle des circuits, [désembouage](/chauffage/desembouage) si les radiateurs chauffent mal.",
          },
          {
            icon: "bolt",
            title: "Électricité des communs",
            text: "Éclairage des halls et escaliers, minuteries, prises et tableaux des communs, [mise en conformité](/electricite/mise-en-conformite-electrique).",
          },
          {
            icon: "bell",
            title: "Parlophonie et vidéophonie",
            text: "Platines de rue, combinés, [parlophonie d'immeuble](/electricite/installation-parlophonie) à réparer ou à moderniser.",
          },
          {
            icon: "water",
            title: "Plomberie et colonnes",
            text: "Fuites, colonnes d'eau, [débouchage](/plomberie/debouchage) des colonnes et évacuations communes.",
          },
        ],
      },
      {
        type: "steps",
        title: "Comment nous travaillons avec vous",
        intro: "Une méthode simple, pensée pour les contraintes d'un gestionnaire.",
        steps: [
          {
            title: "Premier contact",
            description: "Vous nous présentez l'immeuble, ses installations et vos besoins, ponctuels ou récurrents.",
          },
          {
            title: "Visite et état des lieux",
            description: "Nous examinons les installations communes concernées et repérons les points d'attention.",
          },
          {
            title: "Devis détaillé sous 24h",
            description: "Gratuit, poste par poste, facile à présenter en assemblée générale ou au conseil de copropriété.",
          },
          {
            title: "Interventions et suivi",
            description: "Planification des travaux et des entretiens, compte rendu d'intervention sur demande.",
          },
        ],
      },
      {
        type: "callBand",
        title: "Une panne dans les communs ? Un appel suffit.",
        text: "Chaufferie à l'arrêt, communs dans le noir, fuite sur une colonne : nous intervenons sous 24h, 7j/7. Pour vos projets, devis détaillé sous 24h.",
      },
      {
        type: "features",
        layout: "list",
        title: "Un partenaire pensé pour les gestionnaires",
        items: [
          {
            icon: "headset",
            title: "Un seul numéro",
            text: "Chauffage, électricité, plomberie : un seul contact pour tous vos immeubles, 7j/7.",
          },
          {
            icon: "clock",
            title: "Des délais tenus",
            text: "Une panne dans les communs ? Intervention sous 24h, week-end compris.",
          },
          {
            icon: "fileSign",
            title: "Des devis lisibles",
            text: "Gratuits, remis sous 24h et détaillés poste par poste pour faciliter la décision des copropriétaires.",
          },
          {
            icon: "calendar",
            title: "Des entretiens planifiés",
            text: "Nous vous aidons à planifier les entretiens périodiques pour ne plus courir après les échéances.",
          },
          {
            icon: "euro",
            title: "Des prix annoncés",
            text: "Le prix annoncé est le prix payé : aucune mauvaise surprise à justifier en fin d'exercice.",
          },
          {
            icon: "comments",
            title: "Un compte rendu clair",
            text: "Sur demande, un résumé de chaque intervention pour vos dossiers et vos copropriétaires.",
          },
        ],
      },
      {
        type: "callout",
        title: "Entretiens et contrôles périodiques : ne rien laisser passer",
        paragraphs: [
          "Chaudières collectives, installation électrique des communs : plusieurs équipements d'un immeuble font l'objet d'entretiens ou de contrôles périodiques imposés par la réglementation. Nous prenons en charge ceux qui relèvent du chauffage, de l'électricité et de la plomberie, et vous aidons à tenir le calendrier.",
          "Pour la réglementation chauffage en Région bruxelloise, la source officielle reste [environnement.brussels](https://environnement.brussels).",
        ],
      },
      {
        type: "pricing",
        title: "Des tarifs clairs pour vos immeubles",
        intro:
          "Dépannage au forfait, entretiens et travaux sur devis détaillé : de quoi préparer votre budget et vos assemblées générales sereinement.",
        items: [
          { key: "depannage" },
          { label: "Entretien des installations collectives", note: "Sur devis, selon l'immeuble" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes des syndics et gestionnaires",
    faqs: [
      {
        id: 1,
        question: "Intervenez-vous dans les parties communes comme dans les appartements ?",
        answer:
          "Oui : dans les parties communes pour le syndic, comme dans les appartements à la demande des propriétaires ou des locataires.",
      },
      {
        id: 2,
        question: "Pouvez-vous établir un devis à présenter en assemblée générale ?",
        answer:
          "Oui. Nos devis sont gratuits, remis sous 24h et détaillés poste par poste pour faciliter la décision des copropriétaires.",
      },
      {
        id: 3,
        question: "Proposez-vous des contrats d'entretien ?",
        answer:
          "Nous étudions avec vous la formule la plus adaptée à votre immeuble : entretiens planifiés, interventions à la demande… [Parlons-en](/contact#formulaire-rappel).",
      },
      {
        id: 4,
        question: "Quels délais pour une panne dans les communs ?",
        answer:
          "Nous intervenons sous 24h, 7j/7 : chaufferie à l'arrêt, éclairage des communs en panne ou fuite sur une colonne.",
      },
      {
        id: 5,
        question: "Travaillez-vous aussi pour les agences et les propriétaires-bailleurs ?",
        answer:
          "Oui, notamment pour l'[entretien des chaudières](/chauffage/entretien-chaudiere), la [mise en conformité électrique](/electricite/mise-en-conformite-electrique) avant une vente ou une location et les dépannages entre deux locataires.",
      },
      {
        id: 6,
        question: "Dans quelles communes intervenez-vous ?",
        answer:
          "Dans les 19 communes de la Région bruxelloise et en périphérie, en Brabant flamand et en Brabant wallon.",
      },
    ],
    related: [
      "chauffage/entretien-chaudiere",
      "electricite/installation-parlophonie",
      "plomberie/debouchage",
      "electricite/mise-en-conformite-electrique",
    ],
    cta: {
      title: "Un immeuble à gérer ? Un seul numéro pour tout le technique.",
      body: "Chaufferie, électricité des communs, parlophonie, colonnes d'eau : présentez-nous votre immeuble et vos besoins. Devis détaillé sous 24h, interventions 7j/7 et un interlocuteur unique pour vous et vos copropriétaires.",
    },
    zonesIntro:
      "Nous intervenons pour les immeubles et copropriétés des 19 communes bruxelloises et de la périphérie, en Brabant flamand et en Brabant wallon.",
    draft: true,
  },
];

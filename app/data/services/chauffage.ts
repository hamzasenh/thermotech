import { boilerBrandNames } from "../brands";
import { prices } from "../pricing";
import type { Service } from "./types";

import boilerMaintenance from "@/assets/boiler-maintenance.png";

// Pages service de la catégorie chauffage (/chauffage/<slug>).
// remplacement-chaudiere et entretien-chaudiere reprennent mot pour mot le
// contenu validé des anciennes pages dédiées. Les autres pages ont été validées
// par le gestionnaire le 08/10/2026 (draft: false). Seule exception : la
// formulation des consignes gaz (dépannage chaudière) attend encore sa relecture.
export const chauffageServices: Service[] = [
  // --- Remplacement / installation — contenu validé (ancienne page dédiée) ---
  {
    category: "chauffage",
    slug: "remplacement-chaudiere",
    // Ajouts non validés : title, name, summary, facts, related, zonesIntro
    title: "Installation chaudière",
    name: "Remplacement et installation de chaudière",
    pageTitle: "Remplacement et installation de chaudières à Bruxelles et ses environs",
    metaTitle: "Remplacement et installation de chaudière à Bruxelles",
    metaDescription:
      "Remplacement et installation de chaudières à Bruxelles et ses environs. Devis sous 24h, garantie 2 ans. Gaz à condensation, pompe à chaleur.",
    summary:
      "Chaudière gaz à condensation ou pompe à chaleur : devis sous 24h, pose en 1 à 2 jours, garantie 2 ans pose + 2 ans pièces.",
    icon: "tools",
    intent: "installation",
    hero: {
      eyebrow: "Installation & remplacement",
      intro:
        "Nous remplaçons votre ancienne chaudière ou installons un nouveau système de chauffage, adapté à votre logement et à votre budget : chaudière à gaz à condensation, pompe à chaleur ou système de chauffage central. Chaque installation respecte les normes en vigueur (PEB, RGIE), avec un devis détaillé sous 24 heures.",
      image: {
        asset: "P02",
        alt: "Technicien Radialec ouvrant une chaudière murale neuve",
      },
    },
    // Ajouts non validés : facts
    facts: [
      { icon: "clipboard", stat: "Devis sous 24h", label: "Clair et sans surprise" },
      { icon: "shield", stat: "Garantie 2 + 2 ans", label: "Pose Radialec + pièces fabricant" },
      { icon: "clock", stat: "1 à 2 jours", label: "Pour une installation standard" },
      { icon: "award", stat: "Conforme PEB & RGIE", label: "Normes en vigueur respectées" },
    ],
    blocks: [
      {
        type: "steps",
        title: "Notre process d'installation",
        steps: [
          {
            title: "Devis sous 24h",
            description:
              "Nous évaluons votre besoin et vous transmettons un devis clair, sans surprise.",
            image: {
              src: boilerMaintenance,
              alt: "Technicien Radialec notant les caractéristiques d'une chaudière avant de faire le devis",
            },
          },
          {
            title: "Planification",
            description:
              "Nous fixons ensemble une date d'intervention adaptée à votre disponibilité.",
            image: {
              asset: "P04",
              alt: "Caisse à outils ouverte sur une bâche de protection, au pied d'une chaudière",
            },
          },
          {
            title: "Installation",
            description:
              "Pose de votre nouvelle chaudière par un technicien qualifié (comptez 1 à 2 jours pour une installation standard).",
            image: {
              asset: "P01",
              alt: "Mains d'un technicien serrant un raccord sous une chaudière neuve",
            },
          },
          {
            title: "Suivi",
            description: "Vérification du bon fonctionnement et conseils d'entretien.",
            image: {
              asset: "P03",
              alt: "Technicien réglant l'écran d'une chaudière neuve en fonctionnement",
            },
          },
        ],
      },
      {
        type: "brands",
        title: "Les marques que nous installons",
        intro:
          "Nous installons et entretenons les plus grandes marques de chaudières et de pompes à chaleur, pour un matériel fiable et des pièces disponibles sur le long terme.",
      },
      {
        type: "callout",
        title: "Gaz, mazout ou pompe à chaleur : que choisir en 2026 ?",
        paragraphs: [
          "La Région bruxelloise interdit désormais l'installation de nouvelles chaudières au mazout. Les primes RENOLUTION pour le remplacement de chaudière sont actuellement suspendues. Nous vous conseillons sur la solution la plus adaptée à votre logement et vous orientons vers les informations à jour sur [environnement.brussels](https://environnement.brussels).",
        ],
        // Résumé visuel tiré uniquement du paragraphe ci-dessus et de la FAQ validée.
        // Aucun pourcentage de TVA publié sur le site (choix du propriétaire, 08/10/2026).
        verdicts: [
          { label: "Mazout", status: "Interdit", note: "Pour les nouvelles installations en Région bruxelloise", tone: "off" },
          { label: "Gaz à condensation", status: "Possible", note: "Une alternative au mazout pour remplacer votre chaudière", tone: "flame" },
          { label: "Pompe à chaleur", status: "À étudier", note: "Nous vous conseillons selon votre logement", tone: "water" },
        ],
      },
      // Repris mot pour mot de la réponse FAQ validée « Quelle garantie sur l'installation ? ».
      {
        type: "highlight",
        eyebrow: "Garantie",
        title: "Votre installation garantie, pièces et pose",
        figures: [
          { value: "2 ans", label: "Garantie fabricant sur les pièces" },
          { value: "2 ans", label: "Garantie Radialec sur la pose" },
        ],
        paragraphs: [
          "Votre nouvelle chaudière bénéficie d'une garantie fabricant de 2 ans sur les pièces, ainsi que d'une garantie de 2 ans de Radialec sur la pose.",
        ],
        note: "Condition : pendant cette période de 2 ans, aucune autre entreprise ne doit intervenir sur votre installation, sous peine d'annulation de la garantie.",
      },
    ],
    faqTitle: "FAQ Remplacement et installation de chaudière",
    faqs: [
      {
        id: 1,
        question: "Combien de temps dure une installation de chaudière ?",
        answer: "Comptez 1 à 2 jours pour une installation standard.",
      },
      {
        id: 2,
        question: "Quelle garantie sur l'installation ?",
        answer:
          "Votre nouvelle chaudière bénéficie d'une garantie fabricant de 2 ans sur les pièces, ainsi que d'une garantie de 2 ans de Radialec sur la pose. Pendant cette période de 2 ans, aucune autre entreprise ne doit intervenir sur votre installation, sous peine d'annulation de la garantie.",
      },
      {
        id: 3,
        question: "Puis-je encore installer une chaudière au mazout à Bruxelles ?",
        answer:
          "Non, l'installation de nouvelles chaudières au mazout n'est plus autorisée en Région bruxelloise. Nous vous accompagnons vers une alternative (gaz à condensation ou pompe à chaleur).",
      },
      {
        id: 4,
        question: "Dois-je être présent lors de l'installation ?",
        answer:
          "Non, ce n'est pas indispensable. Nous nous occupons de toute l'installation et vous tenons informé à chaque étape.",
      },
    ],
    // Ajouts non validés : related
    related: [
      "chauffage/pompe-a-chaleur",
      "chauffage/desembouage",
      "chauffage/installation-radiateurs",
      "chauffage/entretien-chaudiere",
    ],
    cta: {
      body: "Chaudière vieillissante, tableau électrique à mettre aux normes, envie de passer à la pompe à chaleur : un projet ne s'improvise pas. Nos techniciens agréés interviennent à Bruxelles et dans toute la région, avec un seul interlocuteur du premier rendez-vous jusqu'à la mise en service. Décrivez votre projet, on s'occupe du reste.",
    },
    zonesIntro:
      "Nous remplaçons et installons des chaudières dans les 19 communes bruxelloises et en périphérie, en Brabant flamand et en Brabant wallon.",
    draft: false,
  },

  // --- Entretien de chaudière — contenu validé (ancienne page dédiée) ---
  {
    category: "chauffage",
    slug: "entretien-chaudiere",
    // Ajouts non validés : title, name, related
    title: "Entretien chaudière",
    name: "Entretien de chaudière",
    pageTitle: "Entretien de chaudière à Bruxelles et ses environs",
    metaTitle: "Entretien de chaudière à Bruxelles",
    metaDescription:
      "Entretien de chaudière obligatoire à Bruxelles : gaz ou mazout, technicien agréé, attestation remise immédiatement. Devis clair, RDV sous 24h.",
    summary:
      "Entretien obligatoire de votre chaudière gaz ou mazout par un technicien agréé, avec attestation remise immédiatement.",
    icon: "clipboard",
    intent: "entretien",
    price: { key: "entretienChaudiereGaz" },
    hero: {
      eyebrow: "Obligation légale · Tous les 1 à 2 ans",
      intro:
        "Gaz ou mazout, chaudière ou chauffe-eau : nos techniciens agréés réalisent votre entretien obligatoire, effectuent les tests de sécurité et vous remettent votre attestation le jour même. Sans mauvaise surprise sur le prix.",
      image: {
        asset: "P06",
        alt: "Technicien nettoyant l'échangeur d'une chaudière ouverte",
      },
    },
    facts: [
      { icon: "euro", stat: `Dès ${prices.entretienChaudiereGaz.amount}€ TVAC`, label: "Entretien chaudière gaz" },
      { icon: "clock", stat: "~1 heure", label: "Intervention moyenne" },
      { icon: "clipboard", stat: "Attestation immédiate", label: "Remise le jour même" },
      { icon: "shield", stat: "Technicien agréé", label: "Contrôle sécurité inclus" },
    ],
    blocks: [
      {
        type: "features",
        title: "Un entretien obligatoire, pas une option",
        intro:
          "En Région bruxelloise, l'entretien de votre chaudière n'est pas un conseil, c'est une obligation légale : tous les deux ans pour une chaudière au gaz, chaque année pour une chaudière au mazout. Un contrôle réalisé par un technicien agréé, qui se termine par la remise d'une attestation d'entretien officielle.",
        items: [
          {
            icon: "alert",
            title: "Sécurité",
            text: "Une chaudière mal entretenue est l'un des premiers facteurs de risque d'intoxication au monoxyde de carbone.",
          },
          {
            icon: "file",
            title: "Assurance",
            text: "En cas de sinistre lié au chauffage, votre assureur peut exiger une attestation d'entretien à jour pour intervenir.",
          },
          {
            icon: "home",
            title: "Revente & location",
            text: "L'attestation d'entretien est régulièrement demandée lors de la vente ou de la location d'un bien.",
          },
        ],
        note: "La périodicité exacte et les sanctions en cas de non-respect sont fixées par la Région bruxelloise. Nous vous orientons vers les informations officielles sur [environnement.brussels](https://environnement.brussels) — et nous nous chargeons de vous rappeler quand votre prochain entretien approche.",
      },
      {
        type: "checklist",
        title: "Ce qui est inclus dans votre entretien",
        // Contenu décrit par le gestionnaire le 08/10/2026 (Q31).
        items: [
          "Nettoyage de la chambre de combustion",
          "**Chaudière gaz** : nettoyage des composants électriques et électroniques, contrôle de l'absence de fuite, contrôle du vase d'expansion, analyse de combustion",
          "**Chaudière mazout** : contrôle et nettoyage du moteur, contrôle de la pompe, réglage du gicleur, contrôle et nettoyage du filtre",
          "Contrôle de l'évacuation des gaz brûlés et des fumées",
          "Attestation de conformité envoyée en PDF",
        ],
        note: "Comptez environ une heure d'intervention, pour une chaudière gaz comme pour une chaudière mazout.",
        image: {
          asset: "P07",
          alt: "Analyseur de combustion branché sur une chaudière pendant l'entretien",
        },
      },
      {
        type: "steps",
        title: "Notre process d'entretien",
        steps: [
          {
            title: "Prise de rendez-vous",
            description:
              "Un créneau rapide, en ligne ou par téléphone — généralement sous 24h.",
            image: {
              asset: "P04",
              alt: "Caisse à outils posée au pied de la chaudière, sur une bâche de protection",
            },
          },
          {
            title: "Contrôle complet",
            description: "Nettoyage, réglages et vérifications selon les normes en vigueur.",
            image: {
              asset: "P03",
              alt: "Technicien réglant l'écran d'une chaudière",
            },
          },
          {
            title: "Tests de sécurité",
            description:
              "Contrôle de la combustion, de l'étanchéité et des dispositifs de sécurité.",
            image: {
              asset: "P09",
              alt: "Contrôle électrique d'une chaudière au multimètre",
            },
          },
          {
            title: "Attestation remise",
            description:
              "Votre attestation de conformité, envoyée en PDF le jour même.",
            image: {
              asset: "P08",
              alt: "Attestation d'entretien affichée sur un téléphone devant la chaudière",
            },
          },
        ],
      },
      {
        type: "brands",
        title: "Les marques que nous installons",
        intro:
          `Nous entretenons les chaudières ${boilerBrandNames}, quel que soit leur âge ou leur modèle.`,
      },
      {
        type: "pricing",
        eyebrow: "Des tarifs clairs, sans surprise",
        title: "Tarifs entretien de chaudière à Bruxelles",
        items: [{ key: "entretienChaudiereGaz" }, { key: "entretienChaudiereMazout" }, { key: "contratEntretien" }],
      },
    ],
    faqTitle: "FAQ Entretien de chaudière",
    faqs: [
      {
        id: 1,
        question: "L'entretien de ma chaudière est-il vraiment obligatoire ?",
        answer:
          "Oui. En Région bruxelloise, l'entretien périodique de votre chaudière est une obligation légale : tous les deux ans pour le gaz, chaque année pour le mazout. Il doit être réalisé par un technicien agréé qui vous remet une attestation officielle.",
      },
      {
        id: 2,
        question: "Que se passe-t-il si je ne fais pas entretenir ma chaudière ?",
        answer:
          "Outre le risque pour votre sécurité (intoxication au monoxyde de carbone, pannes, surconsommation), l'absence d'attestation à jour peut poser problème auprès de votre assurance en cas de sinistre, ou lors de la vente ou de la location de votre bien.",
      },
      {
        id: 3,
        question: "Combien coûte un entretien de chaudière à Bruxelles ?",
        answer:
          `Comptez ${prices.entretienChaudiereGaz.amount}€ TVAC pour l'entretien d'une chaudière au gaz, et ${prices.entretienChaudiereMazout.amount}€ TVAC pour une chaudière au mazout. Le prix inclut le contrôle complet, les tests de sécurité et votre attestation de conformité. Les particuliers peuvent aussi choisir un contrat d'entretien de 2 ans à ${prices.contratEntretien.amount}€ TVAC.`,
      },
      {
        id: 4,
        question: "Que comprend un entretien de chaudière ?",
        answer:
          "Notre entretien comprend le nettoyage du brûleur, l'analyse de la combustion, le contrôle de l'étanchéité et de la pression, le test des sécurités, la vérification de l'évacuation des fumées et la remise de votre attestation officielle.",
      },
      {
        id: 5,
        question: "À quelle fréquence dois-je entretenir ma chaudière ?",
        answer:
          "Tous les deux ans pour une chaudière au gaz, chaque année pour une chaudière au mazout. Nous pouvons vous envoyer un rappel avant l'échéance pour que vous n'ayez plus à y penser.",
      },
      {
        id: 6,
        question: "Combien de temps dure un entretien ?",
        answer:
          "Comptez environ une heure, pour une chaudière gaz comme pour une chaudière mazout.",
      },
      {
        id: 7,
        question: "Recevrai-je une attestation après l'entretien ?",
        answer:
          "Oui, votre attestation de conformité vous est envoyée en PDF, le jour même de l'intervention.",
      },
      {
        id: 8,
        question: "Ma chaudière n'a pas été entretenue depuis longtemps, est-ce grave ?",
        answer:
          "Pas de panique. Nos techniciens réalisent un contrôle complet et vous conseillent si des réparations sont nécessaires avant de délivrer l'attestation — il n'est jamais trop tard pour se mettre en règle.",
      },
    ],
    // Ajouts non validés : 4e lien (depannage-chaudiere)
    related: [
      "chauffage/desembouage",
      "chauffage/entretien-chauffe-eau-boiler",
      "chauffage/ramonage-cheminee",
      "chauffage/depannage-chaudiere",
    ],
    cta: {
      body: "Chaudière gaz ou mazout, avec ou sans chauffe-eau intégré : nos techniciens agréés s'occupent de votre entretien de A à Z et vous remettent votre attestation le jour même. Un seul rendez-vous, l'esprit tranquille pour les deux prochaines années.",
    },
    draft: false,
  },

  // --- Dépannage / réparation ---
  {
    category: "chauffage",
    slug: "depannage-chaudiere",
    title: "Dépannage chaudière",
    name: "Dépannage et réparation de chaudière",
    pageTitle: "Dépannage et réparation de chaudière à Bruxelles, 7j/7",
    metaTitle: "Dépannage chaudière à Bruxelles – 7j/7, sous 24h",
    metaDescription:
      `Chaudière en panne à Bruxelles ? Dépannage 7j/7, intervention sous 24h, Vaillant, Bulex, Bosch… ${prices.depannage.amount}€ TVAC déplacement + diagnostic + 1ère heure. Appelez-nous.`,
    summary:
      "Plus de chauffage ou d'eau chaude ? Diagnostic et réparation des grandes marques (Vaillant, Bulex, Bosch…), 7j/7, avec intervention sous 24h.",
    icon: "wrench",
    intent: "urgence",
    price: { key: "depannage", label: "Dépannage chaudière" },
    hero: {
      eyebrow: "Dépannage 7j/7 · Sous 24h",
      intro:
        `Plus de chauffage, plus d'eau chaude, chaudière en sécurité ? Nos techniciens agréés diagnostiquent et réparent les chaudières ${boilerBrandNames}, 7j/7, avec une intervention sous 24h. Le prix vous est annoncé avant toute réparation.`,
      image: {
        asset: "P09",
        alt: "Technicien diagnostiquant une chaudière en panne à l'aide d'un multimètre",
      },
    },
    facts: [
      { icon: "euro", stat: `${prices.depannage.amount}€ TVAC`, label: "Déplacement + diagnostic + 1ère heure" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention rapide" },
      { icon: "calendar", stat: "7j/7", label: "Week-end compris" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Pièces et interventions" },
    ],
    blocks: [
      {
        type: "features",
        layout: "list",
        eyebrow: "Diagnostic",
        title: "Les pannes de chaudière que nous réparons",
        intro:
          "Quel que soit le symptôme, nous commençons par un diagnostic complet, puis nous vous annonçons le prix avant toute réparation.",
        items: [
          {
            icon: "fire",
            title: "Plus de chauffage",
            text: "Radiateurs froids alors que la chaudière semble tourner : circulateur, vanne trois voies, thermostat ou carte électronique peuvent être en cause.",
          },
          {
            icon: "drop",
            title: "Plus d'eau chaude",
            text: "Le chauffage fonctionne mais l'eau reste froide au robinet : souvent l'échangeur sanitaire, la vanne trois voies ou un capteur de débit.",
          },
          {
            icon: "pressure",
            title: "Pression qui chute",
            text: "Aiguille sous 1 bar, remises à niveau fréquentes : il y a probablement une fuite sur le circuit ou un vase d'expansion à regonfler.",
          },
          {
            icon: "alert",
            title: "Chaudière en sécurité ou code erreur",
            text: "Voyant rouge ou code affiché à l'écran : notez-le avec la marque de votre chaudière, il nous aide à préparer l'intervention.",
          },
          {
            icon: "volume",
            title: "Bruits anormaux",
            text: "Claquements, sifflements ou gargouillis : air dans le circuit, calcaire dans l'échangeur ou circulateur fatigué.",
          },
          {
            icon: "water",
            title: "Fuite sous la chaudière",
            text: "Goutte à goutte ou flaque : soupape de sécurité, raccord ou joint défaillant. Coupez l'arrivée d'eau si la fuite est importante.",
          },
          {
            icon: "burn",
            title: "Allumage qui échoue",
            text: "La flamme ou la veilleuse s'éteint après quelques secondes : électrode, alimentation gaz, ventilateur ou évacuation des fumées à contrôler.",
          },
          {
            icon: "smog",
            title: "Mauvaise combustion",
            text: "Flamme jaune, traces de suie ou odeur de brûlé : arrêtez la chaudière et faites contrôler la combustion sans attendre.",
          },
        ],
      },
      {
        type: "alert",
        tone: "danger",
        title: "Odeur de gaz ? Les bons réflexes, dans cet ordre",
        // Consignes officielles Sibelga / Fluvius et numéros vérifiés le 06/10/2026 (04-reponses, Q33) :
        // sibelga.be, fluvius.be, ores.be. Formulation à faire valider mot pour mot par le technicien.
        paragraphs: [
          "**Ouvrez portes et fenêtres.** Aucune flamme ni étincelle : ne touchez à aucun interrupteur, n'allumez pas de lampe, n'utilisez ni appareil électrique ni téléphone dans le logement.",
          "Si le robinet du compteur de gaz est accessible sans allumer la lumière, fermez-le. Puis **quittez le logement** et appelez depuis l'extérieur.",
          "Numéros d'urgence gaz, gratuits : **Bruxelles** (Sibelga) **0800 19 400** · **Brabant flamand** (Fluvius) **0800 65 0 65** · **Brabant wallon** (ORES) **0800 87 087** · ou le **112**.",
          "Quand la situation est sécurisée, contactez-nous pour contrôler et remettre votre installation en service.",
        ],
      },
      {
        type: "callout",
        title: "Avant d'appeler : 3 vérifications rapides",
        paragraphs: [
          "**La pression.** Sur le manomètre, l'aiguille se situe en général entre 1 et 2 bar à froid. En dessous, un simple remplissage peut suffire — suivez la notice de votre chaudière.",
          "**Le thermostat.** Piles vides, mauvais programme ou consigne trop basse : c'est une cause de « panne » plus fréquente qu'on ne le pense.",
          "**L'alimentation.** Vérifiez que le disjoncteur de la chaudière n'a pas sauté. Si elle est en sécurité, vous pouvez tenter un réarmement ; si le défaut revient, n'insistez pas et [appelez-nous](/contact).",
        ],
      },
      {
        type: "steps",
        title: "Comment se déroule un dépannage",
        steps: [
          {
            title: "Appel et premier avis",
            description:
              "Vous nous décrivez la panne (symptômes, code erreur, marque). Nous fixons un créneau d'intervention sous 24h, 7j/7.",
          },
          {
            title: "Diagnostic sur place",
            description:
              `Votre technicien identifie la cause exacte de la panne. Déplacement, diagnostic et première heure : ${prices.depannage.amount}€ TVAC.`,
          },
          {
            title: "Prix annoncé, puis réparation",
            description:
              "Si une pièce doit être remplacée, vous connaissez le prix avant que nous commencions. Vous décidez.",
          },
          {
            title: "Remise en service",
            description:
              "Contrôle du fonctionnement, de la pression et des sécurités, puis conseils pour éviter que la panne ne se reproduise.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarif dépannage de chaudière à Bruxelles",
        intro:
          "Un forfait clair pour démarrer, sans frais cachés : vous savez ce que vous payez avant même l'arrivée du technicien.",
        items: [
          { key: "depannage", label: "Dépannage chaudière", popular: true },
          {
            label: "Remplacement de chaudière",
            note: "Si la réparation n'en vaut plus la peine — devis gratuit",
          },
        ],
        note: "Prix TVAC. Pièces éventuelles : prix communiqué et validé avec vous avant la réparation. Le prix annoncé est le prix payé.",
      },
      {
        type: "brands",
        title: "Les marques que nous dépannons",
        intro: `${boilerBrandNames} : nos techniciens dépannent les chaudières gaz et mazout de ces marques.`,
      },
    ],
    faqTitle: "Questions fréquentes sur le dépannage de chaudière",
    faqs: [
      {
        id: 1,
        question: "Combien coûte un dépannage de chaudière à Bruxelles ?",
        answer:
          `Le dépannage est facturé **${prices.depannage.amount}€ TVAC**, déplacement, diagnostic et première heure de travail compris. Si une pièce doit être remplacée, nous vous communiquons son prix avant la réparation.`,
      },
      {
        id: 2,
        question: "En combien de temps pouvez-vous intervenir ?",
        answer:
          "Nous intervenons sous 24h, 7 jours sur 7, week-end compris, à Bruxelles et dans sa périphérie.",
      },
      {
        id: 3,
        question: "Quelles marques de chaudières réparez-vous ?",
        answer: `Nous intervenons sur les chaudières gaz et mazout des marques ${boilerBrandNames}.`,
      },
      {
        id: 4,
        question: "Ma chaudière affiche un code erreur, que faire ?",
        answer:
          "Notez le code et la marque de votre chaudière. Vous pouvez tenter un réarmement ; si le défaut revient, n'insistez pas et appelez-nous : le code nous aide à préparer l'intervention.",
      },
      {
        id: 5,
        question: "La pression de ma chaudière baisse sans arrêt, est-ce grave ?",
        answer:
          "Une pression qui chute régulièrement signale en général une fuite sur le circuit ou un vase d'expansion dégonflé. Ce n'est pas dangereux dans l'immédiat, mais la chaudière finira par se mettre en sécurité : mieux vaut faire contrôler l'installation.",
      },
      {
        id: 6,
        question: "Vaut-il mieux réparer ou remplacer ma chaudière ?",
        answer:
          "La durée de vie d'une chaudière est de plus ou moins 15 ans. Au-delà de 12 à 15 ans, ou si les pannes se répètent, un [remplacement](/chauffage/remplacement-chaudiere) est souvent plus rentable. Nous vous conseillons après le diagnostic, devis à l'appui.",
      },
      {
        id: 7,
        question: "Une chaudière entretenue tombe-t-elle moins en panne ?",
        answer:
          "Oui : un [entretien régulier](/chauffage/entretien-chaudiere) permet de repérer l'usure des pièces avant la panne. Il est de toute façon obligatoire en Région bruxelloise.",
      },
      {
        id: 8,
        question: "Je sens une odeur de gaz, dois-je vous appeler ?",
        answer:
          "Pas en premier : quittez immédiatement le logement sans toucher aux interrupteurs, puis appelez depuis l'extérieur le numéro d'urgence gaz de votre région (Sibelga **0800 19 400** à Bruxelles, Fluvius **0800 65 0 65** en Brabant flamand, ORES **0800 87 087** en Brabant wallon) ou le 112. Contactez-nous ensuite, une fois la situation sécurisée.",
      },
      {
        // Garantie 2 ans + même condition que l'installation (gestionnaire, 08/10/2026, Q35).
        id: 9,
        question: "Le dépannage est-il garanti ?",
        answer:
          "Oui, nos dépannages sont garantis 2 ans. Pendant cette période, aucune autre entreprise ne doit intervenir sur l'installation concernée, sous peine d'annulation de la garantie.",
      },
    ],
    related: [
      "chauffage/entretien-chaudiere",
      "chauffage/remplacement-chaudiere",
      "chauffage/desembouage",
      "plomberie/depannage",
    ],
    cta: {
      title: "Chaudière en panne ? Votre technicien est (presque) déjà en route.",
      highlight: "(presque)",
      body: "Plus de chauffage, plus d'eau chaude, chaudière en sécurité : décrivez-nous la panne. Nous intervenons 7j/7 à Bruxelles et dans toute la région, sous 24h, et vous annonçons le prix avant toute réparation.",
    },
    zonesIntro:
      "Dépannage de chaudière sous 24h dans les 19 communes bruxelloises et en périphérie, en Brabant flamand et en Brabant wallon.",
    draft: false,
  },

  // --- Chauffe-eau & boiler ---
  {
    category: "chauffage",
    slug: "entretien-chauffe-eau-boiler",
    title: "Chauffe-eau & boiler",
    name: "Entretien de chauffe-eau et boiler",
    pageTitle: "Entretien de chauffe-eau et de boiler à Bruxelles",
    metaTitle: "Entretien chauffe-eau et boiler à Bruxelles",
    metaDescription:
      `Entretien de chauffe-eau et de boiler électrique à Bruxelles : détartrage, anode, groupe de sécurité. Dès ${prices.entretienChauffeEau.amount}€ TVAC, prix affiché. Prenez rendez-vous.`,
    summary:
      "Détartrage, contrôle de l'anode et du groupe de sécurité : une eau chaude fiable et un appareil qui dure plus longtemps.",
    icon: "drop",
    intent: "entretien",
    price: { key: "entretienChauffeEau", note: "Entretien chauffe-eau" },
    hero: {
      eyebrow: "Eau chaude · Entretien",
      intro:
        "L'eau bruxelloise est calcaire : sans entretien, votre boiler s'entartre, consomme plus et finit par lâcher. Nos techniciens détartrent, contrôlent l'anode et le groupe de sécurité, pour une eau chaude fiable toute l'année.",
      image: {
        asset: "P17",
        alt: "Anode entartrée retirée d'un boiler électrique",
      },
    },
    facts: [
      { icon: "euro", stat: `Dès ${prices.entretienChauffeEau.amount}€ TVAC`, label: "Entretien chauffe-eau" },
      { icon: "calendarCheck", stat: "Créneau rapide", label: "Généralement sous 24h" },
      { icon: "tools", stat: "Tous types", label: "Boiler électrique, ballon, chaudière mixte" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
    ],
    blocks: [
      {
        type: "features",
        title: "Pourquoi entretenir votre boiler ?",
        intro:
          "À Bruxelles, l'eau du robinet est dure : le calcaire se dépose sur la résistance et au fond de la cuve, année après année.",
        items: [
          {
            icon: "piggy",
            title: "Moins de consommation",
            text: "Une résistance entartrée chauffe moins bien : votre boiler tourne plus longtemps pour la même quantité d'eau chaude.",
          },
          {
            icon: "clock",
            title: "Une durée de vie prolongée",
            text: "L'anode protège la cuve contre la corrosion. Remplacée à temps, elle évite la fuite qui oblige à changer tout l'appareil.",
          },
          {
            icon: "shield",
            title: "Plus de sécurité",
            text: "Le groupe de sécurité protège la cuve contre la surpression. Encore faut-il qu'il fonctionne : nous le testons à chaque entretien.",
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que comprend l'entretien",
        items: [
          "Vidange partielle ou complète de la cuve selon son état",
          "Détartrage de la résistance et élimination des dépôts",
          "Contrôle de l'anode, remplacement proposé si elle est usée",
          "Test du groupe de sécurité et de la soupape",
          "Contrôle du thermostat et de la température de consigne",
          "Vérification des raccordements et de l'étanchéité",
          "Contrôle de l'alimentation électrique (boiler électrique)",
          "Conseils de réglage pour limiter le calcaire et la consommation",
        ],
        note: "Une pièce à remplacer (anode, résistance, groupe de sécurité) ? Son prix vous est annoncé avant l'intervention.",
        image: {
          asset: "P19",
          alt: "Résistance de boiler entartrée comparée à une résistance neuve",
        },
      },
      {
        type: "options",
        title: "Quel appareil avez-vous ?",
        intro:
          "L'entretien dépend de la façon dont votre eau chaude est produite. En cas de doute, une photo de l'appareil suffit pour nous permettre de vous orienter.",
        items: [
          {
            title: "Boiler électrique",
            text: "Une cuve d'eau chauffée par une résistance électrique. C'est lui qui souffre le plus du calcaire.",
            points: [
              "Détartrage de la résistance",
              "Contrôle de l'anode",
              "Test du groupe de sécurité",
            ],
          },
          {
            title: "Ballon couplé à la chaudière",
            text: "L'eau du ballon est chauffée par votre chaudière via un serpentin. Il s'entretient comme un boiler.",
            points: [
              "Contrôle de l'anode et du groupe de sécurité",
              "Vérification de la sonde et du serpentin",
            ],
          },
          {
            title: "Chaudière mixte",
            text: "Pas de réserve : l'eau est chauffée à la demande par la chaudière elle-même.",
            points: [
              "Contrôlée lors de l'[entretien de la chaudière](/chauffage/entretien-chaudiere)",
              "Détartrage de l'échangeur sanitaire si nécessaire",
            ],
          },
        ],
      },
      {
        type: "features",
        layout: "list",
        title: "Les signes que votre boiler a besoin d'un entretien",
        items: [
          {
            icon: "tempLow",
            title: "Eau tiède ou qui refroidit vite",
            text: "La résistance entartrée ne parvient plus à chauffer toute la cuve.",
          },
          {
            icon: "volume",
            title: "Bruits de bouilloire",
            text: "Craquements ou sifflements pendant la chauffe : le calcaire s'accumule au fond de la cuve.",
          },
          {
            icon: "drop",
            title: "Eau trouble ou rouillée",
            text: "Signe possible d'une anode usée et d'une cuve qui commence à se corroder.",
          },
          {
            icon: "water",
            title: "Groupe de sécurité qui coule en permanence",
            text: "Un léger écoulement pendant la chauffe est normal ; un écoulement continu ne l'est pas.",
          },
          {
            icon: "euro",
            title: "Facture d'électricité en hausse",
            text: "Un boiler encrassé consomme davantage pour le même confort.",
          },
          {
            icon: "calendar",
            title: "Plus de 2 ans sans entretien",
            text: "Avec une eau aussi calcaire qu'à Bruxelles, un entretien tous les 1 à 2 ans est généralement recommandé.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarifs entretien chauffe-eau et boiler",
        items: [{ key: "entretienChauffeEau" }, { key: "entretienBoilerElectrique" }],
      },
    ],
    faqTitle: "Questions fréquentes sur l'entretien de chauffe-eau et boiler",
    faqs: [
      {
        id: 1,
        question: "Combien coûte l'entretien d'un boiler à Bruxelles ?",
        answer:
          `L'entretien d'un chauffe-eau gaz est à **${prices.entretienChauffeEau.amount}€ TVAC** et celui d'un boiler électrique à **${prices.entretienBoilerElectrique.amount}€ TVAC**. Si une pièce doit être remplacée, son prix vous est annoncé avant l'intervention.`,
      },
      {
        id: 2,
        question: "À quelle fréquence faut-il détartrer un boiler ?",
        answer:
          "Avec l'eau calcaire de Bruxelles, un entretien tous les 1 à 2 ans est généralement conseillé, selon votre consommation d'eau chaude.",
      },
      {
        id: 3,
        question: "À quoi sert l'anode d'un boiler ?",
        answer:
          "L'anode s'use à la place de la cuve pour la protéger de la corrosion. Une fois qu'elle est consommée, c'est la cuve qui rouille : d'où l'intérêt de la contrôler régulièrement.",
      },
      {
        id: 4,
        question: "Mon groupe de sécurité goutte, est-ce normal ?",
        answer:
          "Un léger écoulement pendant la chauffe est normal : c'est l'eau qui se dilate. S'il coule en permanence, le groupe de sécurité est probablement défaillant et doit être remplacé.",
      },
      {
        id: 5,
        question: "Combien de temps dure un boiler ?",
        answer:
          "En moyenne 10 à 15 ans, selon la qualité de l'eau et l'entretien. Un boiler jamais détartré à Bruxelles vieillit nettement plus vite.",
      },
      {
        id: 6,
        question: "Faut-il couper le boiler pendant les vacances ?",
        answer:
          "Pour une absence courte, baissez simplement la température. Pour une longue absence, vous pouvez le couper : à votre retour, laissez-le chauffer à 60 °C au moins une fois avant d'utiliser l'eau.",
      },
      {
        id: 7,
        question: "Réparez-vous aussi les boilers en panne ?",
        answer:
          "Oui. Plus d'eau chaude, fuite, disjoncteur qui saute : nous intervenons en [dépannage](/plomberie/depannage) 7j/7, sous 24h.",
      },
    ],
    related: [
      "plomberie/detartrage",
      "chauffage/entretien-chaudiere",
      "plomberie/depannage",
      "chauffage/desembouage",
    ],
    cta: {
      title: "Votre boiler fatigue ? Prenons rendez-vous (avant) la panne.",
      highlight: "(avant)",
      body: "Boiler électrique, ballon couplé à la chaudière ou chaudière mixte : nos techniciens détartrent, contrôlent et remettent votre production d'eau chaude en ordre. Un rendez-vous rapide, un prix connu à l'avance.",
    },
    draft: false,
  },

  // --- Désembouage ---
  {
    category: "chauffage",
    slug: "desembouage",
    title: "Désembouage",
    name: "Désembouage de circuit de chauffage",
    pageTitle: "Désembouage de circuit de chauffage à Bruxelles",
    metaTitle: "Désembouage de radiateurs et chauffage à Bruxelles",
    metaDescription:
      "Radiateurs froids en bas, bruits, surconsommation ? Désembouage de circuit de chauffage à Bruxelles par un chauffagiste agréé. Devis gratuit sous 24h.",
    summary:
      "Boues et rouille bouchent vos radiateurs ? Nous nettoyons tout le circuit pour retrouver une chaleur homogène et protéger la chaudière.",
    icon: "sync",
    intent: "entretien",
    hero: {
      eyebrow: "Chauffage · Performance",
      intro:
        "Radiateurs tièdes, froids en bas, bruits dans les tuyaux ? Des boues se sont accumulées dans votre circuit. Nous le désembouons en profondeur pour retrouver une chaleur homogène, réduire votre consommation et protéger votre chaudière.",
      image: {
        asset: "P16",
        alt: "Eau boueuse retirée d'un circuit de chauffage, à côté de la machine de désembouage",
      },
    },
    facts: [
      { icon: "euro", stat: "Devis gratuit", label: "Sous 24h" },
      { icon: "award", stat: "Chauffagiste agréé", label: "Bruxelles, Flandre, Wallonie" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
      { icon: "calendar", stat: "7j/7", label: "Selon vos disponibilités" },
    ],
    blocks: [
      {
        type: "features",
        layout: "list",
        title: "Les signes d'un circuit de chauffage embouant",
        intro:
          "Au fil des années, rouille, calcaire et résidus forment une boue qui se dépose au bas des radiateurs et jusque dans la chaudière.",
        items: [
          {
            icon: "tempLow",
            title: "Radiateurs froids en bas",
            text: "Le haut chauffe, le bas reste froid : la boue s'est déposée dans la partie basse du radiateur.",
          },
          {
            icon: "thermometer",
            title: "Chaleur inégale entre les pièces",
            text: "Certains radiateurs chauffent bien, d'autres à peine, malgré les purges.",
          },
          {
            icon: "volume",
            title: "Bruits de circulation",
            text: "Gargouillis, sifflements ou claquements dans les tuyaux et la chaudière.",
          },
          {
            icon: "drop",
            title: "Eau noire à la purge",
            text: "Une eau noire ou rougeâtre qui sort du purgeur trahit la présence de boues et de rouille.",
          },
          {
            icon: "euro",
            title: "Consommation en hausse",
            text: "La chaudière tourne plus longtemps pour atteindre la même température.",
          },
          {
            icon: "alert",
            title: "Chaudière qui se met en sécurité",
            text: "Les boues freinent la circulation de l'eau et peuvent faire surchauffer l'échangeur.",
          },
        ],
      },
      {
        type: "options",
        title: "La méthode adaptée à votre installation",
        intro:
          "Après diagnostic, nous vous proposons la méthode qui convient à l'âge et à l'encrassement de votre circuit.",
        items: [
          {
            title: "Désembouage chimique",
            text: "Un produit désembouant est injecté dans le circuit et circule avec le chauffage en marche, en général pendant quelques semaines, avant un rinçage complet.",
            points: [
              "Encrassement léger à modéré",
              "Peu de temps d'intervention sur place",
              "Idéal en entretien préventif",
            ],
          },
          {
            title: "Désembouage hydrodynamique",
            badge: "Circuit très encrassé",
            text: "Une pompe de désembouage fait circuler l'eau à fort débit, en inversant le sens de circulation, pour décoller les dépôts radiateur par radiateur.",
            points: [
              "Résultat visible dans l'eau évacuée",
              "Souvent combiné à un produit désembouant",
              "Recommandé avant une nouvelle chaudière",
            ],
          },
          {
            title: "Protéger le circuit ensuite",
            text: "Un inhibiteur de corrosion ajouté à l'eau propre ralentit la formation de nouvelles boues. Un filtre magnétique peut aussi être posé sur le retour de la chaudière.",
            points: [
              "Inhibiteur de corrosion",
              "Filtre magnétique en option, sur devis",
              "Conseils pour limiter les appoints d'eau",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Comment se passe un désembouage",
        steps: [
          {
            title: "Diagnostic et devis",
            description:
              "Nous contrôlons l'état du circuit, des radiateurs et de la chaudière, puis vous remettons un devis gratuit sous 24h.",
          },
          {
            title: "Préparation",
            description:
              "Protection de la zone de travail, isolement de la chaudière si nécessaire, raccordement du matériel.",
          },
          {
            title: "Désembouage",
            description:
              "Nettoyage du circuit radiateur par radiateur, jusqu'à ce que l'eau ressorte claire.",
          },
          {
            title: "Rinçage et protection",
            description:
              "Remplissage à l'eau propre, ajout d'un inhibiteur, purge et remise en pression.",
          },
          {
            title: "Contrôle final",
            description:
              "Vérification de la chauffe de chaque radiateur et équilibrage si nécessaire.",
          },
        ],
      },
      {
        type: "callout",
        title: "Nouvelle chaudière ou pompe à chaleur ? Désembouez d'abord",
        paragraphs: [
          "Installer une chaudière neuve sur un circuit plein de boues, c'est l'exposer aux mêmes dépôts dès le premier hiver. De nombreux fabricants demandent d'ailleurs un circuit propre pour faire jouer leur garantie.",
          "C'est encore plus vrai pour une [pompe à chaleur](/chauffage/pompe-a-chaleur), sensible à la qualité de l'eau du circuit. Lors d'un [remplacement de chaudière](/chauffage/remplacement-chaudiere), nous vous indiquons si un désembouage est recommandé.",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur le désembouage",
    faqs: [
      {
        id: 1,
        question: "Qu'est-ce qu'un désembouage de chauffage ?",
        answer:
          "C'est le nettoyage complet du circuit de chauffage central (tuyaux, radiateurs, chaudière) pour éliminer les boues, la rouille et le calcaire qui s'y accumulent avec le temps.",
      },
      {
        id: 2,
        question: "Comment savoir si mes radiateurs ont besoin d'un désembouage ?",
        answer:
          "Radiateurs froids en bas, chaleur inégale entre les pièces, bruits dans les tuyaux ou eau noire à la purge sont les signes les plus fréquents. En cas de doute, nous faisons le diagnostic.",
      },
      {
        id: 3,
        question: "Combien coûte un désembouage à Bruxelles ?",
        answer:
          "Le prix dépend du nombre de radiateurs, du niveau d'encrassement et de la méthode choisie. Nous établissons un devis gratuit et détaillé sous 24h, sans engagement.",
      },
      {
        id: 4,
        question: "Combien de temps dure un désembouage ?",
        answer:
          "Pour un désembouage à la pompe, comptez généralement une demi-journée à une journée selon le nombre de radiateurs. Un traitement chimique agit, lui, sur plusieurs semaines.",
      },
      {
        id: 5,
        question: "Tous les combien faut-il désembouer ?",
        answer:
          "Il n'y a pas de fréquence fixe : un circuit protégé par un inhibiteur et un filtre peut rester propre longtemps. On recommande en général un contrôle tous les 5 à 10 ans, et un désembouage dès que les symptômes apparaissent.",
      },
      {
        id: 6,
        question: "Le désembouage est-il obligatoire avant une nouvelle chaudière ?",
        answer:
          "Ce n'est pas une obligation légale, mais c'est fortement recommandé et souvent exigé par les fabricants pour la garantie. Une chaudière neuve sur un circuit encrassé s'use plus vite.",
      },
      {
        id: 7,
        question: "Dois-je vidanger mes radiateurs avant votre passage ?",
        answer:
          "Non, nous nous occupons de tout : vidange, nettoyage, remplissage, purge et remise en pression.",
      },
    ],
    related: [
      "chauffage/entretien-chaudiere",
      "chauffage/installation-radiateurs",
      "chauffage/remplacement-chaudiere",
      "chauffage/depannage-chaudiere",
    ],
    cta: {
      title: "Des radiateurs tièdes ? Retrouvez (enfin) une chaleur homogène.",
      highlight: "(enfin)",
      body: "Radiateurs froids en bas, bruits, chaudière qui peine : décrivez-nous les symptômes. Nous vous proposons la méthode de désembouage adaptée, avec un devis gratuit et détaillé sous 24h.",
    },
    draft: false,
  },

  // --- Radiateurs ---
  {
    category: "chauffage",
    slug: "installation-radiateurs",
    title: "Radiateurs",
    name: "Installation et remplacement de radiateurs",
    pageTitle: "Installation et remplacement de radiateurs à Bruxelles",
    metaTitle: "Installation de radiateurs à Bruxelles",
    metaDescription:
      "Remplacement, ajout ou déplacement de radiateurs à Bruxelles : acier, sèche-serviettes, basse température. Pose soignée, devis gratuit sous 24h.",
    summary:
      "Remplacer, ajouter ou déplacer un radiateur : nous dimensionnons, posons et raccordons proprement à votre circuit existant.",
    icon: "thermometer",
    intent: "installation",
    hero: {
      eyebrow: "Chauffage central · Radiateurs",
      intro:
        "Radiateurs vétustes, pièce mal chauffée, salle de bain à rénover : nous dimensionnons, installons et raccordons vos nouveaux radiateurs à votre chauffage central, avec vannes thermostatiques et équilibrage du circuit.",
      image: {
        asset: "P14",
        alt: "Radiateur neuf posé sous une fenêtre",
      },
    },
    facts: [
      { icon: "euro", stat: "Devis gratuit", label: "Sous 24h" },
      { icon: "ruler", stat: "Sur mesure", label: "Puissance adaptée à chaque pièce" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
      { icon: "award", stat: "Chauffagiste agréé", label: "Pose conforme aux normes" },
    ],
    blocks: [
      {
        type: "options",
        title: "Quel radiateur pour quelle pièce ?",
        intro:
          "Le bon radiateur dépend de la pièce, de votre chaudière et de vos projets. Nous vous conseillons avant de poser quoi que ce soit.",
        items: [
          {
            title: "Radiateur panneau acier",
            badge: "Le plus courant",
            text: "Le standard du chauffage central : bon rendement, prix contenu, et de nombreuses dimensions pour s'adapter aux raccordements existants.",
            points: [
              "Montée en température rapide",
              "Existe en version verticale",
              "Compatible avec toutes les chaudières",
            ],
          },
          {
            title: "Sèche-serviettes",
            text: "Pour la salle de bain : il chauffe la pièce et sèche le linge. Raccordé au chauffage central, électrique ou mixte.",
            points: [
              "Raccordement eau chaude ou électrique",
              "Nombreuses tailles et finitions",
              "Idéal en rénovation de salle de bain",
            ],
          },
          {
            title: "Radiateur basse température",
            text: "Une plus grande surface d'échange pour chauffer avec une eau moins chaude : l'allié d'une chaudière à condensation ou d'une [pompe à chaleur](/chauffage/pompe-a-chaleur).",
            points: [
              "Prépare le passage à la PAC",
              "Meilleur rendement de la chaudière à condensation",
              "Chaleur plus douce et homogène",
            ],
          },
        ],
      },
      {
        type: "features",
        title: "Nos interventions sur vos radiateurs",
        items: [
          {
            icon: "tools",
            title: "Remplacement",
            text: "Un vieux radiateur qui fuit ou chauffe mal ? Nous le remplaçons par un modèle adapté, en réutilisant les raccordements quand c'est possible.",
          },
          {
            icon: "layers",
            title: "Ajout",
            text: "Nouvelle pièce, véranda, grenier aménagé : nous prolongeons le circuit et ajoutons des radiateurs dimensionnés pour l'espace.",
          },
          {
            icon: "sync",
            title: "Déplacement",
            text: "Rénovation, nouvelle cuisine : nous déplaçons un radiateur et reprenons la tuyauterie proprement.",
          },
          {
            icon: "thermometer",
            title: "Vannes thermostatiques",
            text: "Pose ou remplacement de vannes thermostatiques pour régler chaque pièce et éviter de chauffer inutilement.",
          },
        ],
      },
      {
        type: "steps",
        title: "Du devis à la première chauffe",
        steps: [
          {
            title: "Visite et conseil",
            description:
              "Nous évaluons les pièces à chauffer, votre chaudière et les raccordements existants.",
          },
          {
            title: "Devis sous 24h",
            description:
              "Un devis clair et détaillé : radiateurs, accessoires, main-d'œuvre. Sans surprise.",
          },
          {
            title: "Pose et raccordement",
            description:
              "Vidange du circuit si nécessaire, pose, raccordement et contrôle de l'étanchéité.",
          },
          {
            title: "Remise en service",
            description:
              "Remplissage, purge, remise en pression et équilibrage, pour que chaque radiateur chauffe comme il faut.",
          },
        ],
      },
      {
        type: "alert",
        tone: "info",
        title: "Un radiateur qui chauffe mal n'est pas forcément à remplacer",
        paragraphs: [
          "**Froid en haut, chaud en bas ?** Il contient de l'air : une purge suffit souvent.",
          "**Froid en bas, chaud en haut ?** Ce sont des boues qui se sont déposées : un [désembouage](/chauffage/desembouage) redonnera de la chaleur à tout le circuit.",
        ],
      },
      {
        type: "callout",
        title: "Radiateurs et pompe à chaleur : anticipez",
        paragraphs: [
          "Vous envisagez de passer à la [pompe à chaleur](/chauffage/pompe-a-chaleur) dans les prochaines années ? Une PAC chauffe avec une eau plus tiède qu'une chaudière classique : vos radiateurs doivent donc offrir une surface d'échange suffisante.",
          "En choisissant dès aujourd'hui des radiateurs dimensionnés pour la basse température, vous évitez de devoir les remplacer une seconde fois. Nous vous conseillons sur le bon compromis entre confort, budget et évolutivité.",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur l'installation de radiateurs",
    faqs: [
      {
        id: 1,
        question: "Combien coûte l'installation d'un radiateur à Bruxelles ?",
        answer:
          "Le prix dépend du type et de la taille du radiateur, et des travaux de raccordement (remplacement à l'identique, ajout, déplacement). Nous vous remettons un devis gratuit et détaillé sous 24h.",
      },
      {
        id: 2,
        question: "Peut-on remplacer un radiateur sans vidanger toute l'installation ?",
        answer:
          "Souvent oui, en isolant le radiateur ou en ne vidangeant qu'une partie du circuit. Tout dépend de la configuration de votre installation, que nous vérifions sur place.",
      },
      {
        id: 3,
        question: "Comment choisir la puissance d'un radiateur ?",
        answer:
          "Elle dépend du volume de la pièce, de son isolation, de son exposition et de la température de l'eau fournie par votre chaudière. Nous faisons ce calcul pour vous, pièce par pièce.",
      },
      {
        id: 4,
        question: "Mes radiateurs sont-ils compatibles avec une pompe à chaleur ?",
        answer:
          "Pas toujours : une pompe à chaleur produit une eau moins chaude, qui demande des radiateurs plus grands ou basse température. Nous vérifions votre installation avant tout projet de [pompe à chaleur](/chauffage/pompe-a-chaleur).",
      },
      {
        id: 5,
        question: "Pouvez-vous installer un sèche-serviettes dans ma salle de bain ?",
        answer:
          "Oui, raccordé au chauffage central, électrique ou mixte, selon votre installation et l'usage souhaité.",
      },
      {
        id: 6,
        question: "Faut-il purger les radiateurs après une installation ?",
        answer:
          "Oui : après la pose, nous remplissons, purgeons et remettons le circuit en pression, puis vérifions que chaque radiateur chauffe correctement.",
      },
      {
        id: 7,
        question: "Quelle garantie sur la pose ?",
        answer: "Nos interventions sont couvertes par une garantie de 2 ans.",
      },
    ],
    related: [
      "chauffage/desembouage",
      "chauffage/pompe-a-chaleur",
      "chauffage/remplacement-chaudiere",
      "chauffage/entretien-chaudiere",
    ],
    cta: {
      body: "Radiateur à remplacer, pièce à chauffer, salle de bain à rénover : décrivez-nous votre projet. Nous vous conseillons le bon modèle et vous remettons un devis clair sous 24h, pose et raccordement compris.",
    },
    draft: false,
  },

  // --- Pompe à chaleur ---
  // À CONFIRMER : certification frigoriste de Radialec (à afficher si elle existe)
  {
    category: "chauffage",
    slug: "pompe-a-chaleur",
    title: "Pompe à chaleur",
    name: "Installation de pompe à chaleur",
    pageTitle: "Installation de pompe à chaleur à Bruxelles et ses environs",
    metaTitle: "Installation de pompe à chaleur à Bruxelles",
    metaDescription:
      "Installation de pompe à chaleur air-eau à Bruxelles : étude, dimensionnement, pose et entretien. Devis gratuit sous 24h.",
    summary:
      "Remplacer votre chaudière par une PAC air-eau : étude du logement, dimensionnement, pose et suivi par un seul interlocuteur.",
    icon: "leaf",
    intent: "installation",
    hero: {
      eyebrow: "Chauffage bas carbone",
      intro:
        "Votre chaudière arrive en fin de vie, ou vous voulez sortir du mazout ? Nous étudions votre logement, dimensionnons la pompe à chaleur adaptée et assurons une pose conforme, du premier rendez-vous à la mise en service.",
      image: {
        asset: "P12",
        alt: "Unité extérieure d'une pompe à chaleur air-eau installée dans un jardin",
      },
    },
    facts: [
      { icon: "award", stat: "Dimensionnement", label: "Puissance calculée pour votre logement" },
      { icon: "euro", stat: "Devis gratuit", label: "Sous 24h" },
      { icon: "handshake", stat: "Un seul interlocuteur", label: "De l'étude à la mise en service" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
    ],
    blocks: [
      {
        type: "features",
        title: "Pourquoi passer à la pompe à chaleur ?",
        items: [
          {
            icon: "leaf",
            title: "Moins d'énergie consommée",
            text: "Une PAC puise l'essentiel de son énergie dans l'air extérieur : en général, elle restitue 3 à 4 fois plus de chaleur qu'elle ne consomme d'électricité.",
          },
          {
            icon: "fire",
            title: "La fin du mazout",
            text: "La Région bruxelloise interdit désormais l'installation de nouvelles chaudières au mazout : la PAC est l'une des alternatives.",
          },
          {
            icon: "snowflake",
            title: "Chaud l'hiver, frais l'été",
            text: "Certains modèles sont réversibles et peuvent aussi rafraîchir votre logement pendant les fortes chaleurs.",
          },
        ],
        note: "Les primes RENOLUTION sont actuellement suspendues. Les règles évoluant régulièrement, vérifiez les informations à jour sur [environnement.brussels](https://environnement.brussels) — nous vous aidons à y voir clair lors de l'étude.",
      },
      {
        type: "options",
        title: "Air-eau, air-air ou hybride : quelle pompe à chaleur ?",
        intro:
          "Toutes les pompes à chaleur ne répondent pas au même besoin. Le bon choix dépend de votre logement, de vos émetteurs de chaleur et de votre budget.",
        items: [
          {
            title: "PAC air-eau",
            badge: "Remplace la chaudière",
            text: "Elle chauffe l'eau de votre chauffage central (radiateurs ou plancher chauffant) et, selon le modèle, votre eau chaude sanitaire.",
            points: [
              "Se raccorde au circuit existant",
              "Idéale avec plancher chauffant ou radiateurs basse température",
              "Peut produire l'eau chaude sanitaire",
            ],
          },
          {
            title: "PAC air-air",
            text: "Une climatisation réversible qui souffle de l'air chaud ou froid via des unités intérieures. En complément, ou pour un logement sans chauffage central.",
            points: [
              "Chauffe et rafraîchit",
              "Aucun radiateur nécessaire",
              "[Voir l'installation de climatisation](/climatisation/installation-climatisation)",
            ],
          },
          {
            title: "PAC hybride",
            text: "Une pompe à chaleur associée à une chaudière gaz qui prend le relais par grand froid. Une transition en douceur pour les maisons peu isolées.",
            points: [
              "Conserve une chaudière en appoint",
              "Plus tolérante avec des radiateurs existants",
              "Bascule automatiquement vers la source la plus adaptée",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Votre projet de pompe à chaleur, étape par étape",
        steps: [
          {
            title: "Visite et étude",
            description:
              "Nous analysons votre logement : surface, isolation, émetteurs de chaleur, place disponible pour l'unité extérieure.",
          },
          {
            title: "Dimensionnement et devis",
            description:
              "Nous calculons la puissance nécessaire et vous remettons un devis détaillé sous 24h. Une PAC mal dimensionnée, c'est du confort et de l'argent perdus.",
          },
          {
            title: "Installation",
            description:
              "Pose de l'unité extérieure et du module intérieur, raccordements hydraulique et électrique, mise en service.",
          },
          {
            title: "Réglages et suivi",
            description:
              "Réglage de la courbe de chauffe, prise en main avec vous, puis entretien régulier pour préserver les performances.",
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que nous vérifions avant d'installer",
        items: [
          "Les besoins de chaleur de votre logement (isolation, surface, orientation)",
          "La compatibilité de vos radiateurs avec une eau à basse température",
          "L'emplacement de l'unité extérieure : bruit, distance, voisinage",
          "Les autorisations éventuelles (copropriété, urbanisme selon l'emplacement)",
          "La puissance électrique disponible et le raccordement au tableau",
          "La production d'eau chaude sanitaire (ballon intégré ou séparé)",
          "L'état du circuit de chauffage ([désembouage](/chauffage/desembouage) si nécessaire)",
        ],
        note: "Selon l'emplacement de l'unité extérieure (façade à rue, copropriété), une autorisation peut être nécessaire : nous vous aidons à le vérifier avant les travaux.",
        image: {
          asset: "P13",
          alt: "Technicien Radialec réglant le module intérieur d'une pompe à chaleur, à côté du ballon d'eau chaude",
        },
      },
      {
        type: "pricing",
        title: "Tarifs pompe à chaleur à Bruxelles",
        items: [
          {
            label: "Installation de pompe à chaleur",
            note: "Sur devis gratuit, après étude de votre logement",
          },
          { key: "entretienPac" },
        ],
        note: "Prix TVAC. Installation sur devis gratuit et détaillé : le prix annoncé est le prix payé.",
      },
    ],
    faqTitle: "Questions fréquentes sur la pompe à chaleur",
    faqs: [
      {
        id: 1,
        question: "Combien coûte une pompe à chaleur à Bruxelles ?",
        answer:
          "Le prix dépend de la puissance nécessaire, du type de PAC et des adaptations éventuelles (radiateurs, électricité, eau chaude). Après une visite, nous vous remettons un devis gratuit et détaillé sous 24h.",
      },
      {
        id: 2,
        question: "Existe-t-il des primes pour une pompe à chaleur à Bruxelles ?",
        answer:
          "Les primes RENOLUTION sont actuellement suspendues. Consultez les informations à jour sur [environnement.brussels](https://environnement.brussels).",
      },
      {
        id: 3,
        question: "Une pompe à chaleur fonctionne-t-elle avec mes radiateurs ?",
        answer:
          "Souvent, à condition qu'ils soient assez grands pour chauffer avec une eau moins chaude. Nous le vérifions pièce par pièce ; si besoin, quelques [radiateurs](/chauffage/installation-radiateurs) peuvent être remplacés.",
      },
      {
        id: 4,
        question: "Une pompe à chaleur est-elle efficace en plein hiver ?",
        answer:
          "Oui, les PAC air-eau actuelles fonctionnent même par températures négatives. Leur rendement baisse par grand froid, d'où l'importance d'un bon dimensionnement, ou d'une solution hybride dans une maison peu isolée.",
      },
      {
        id: 5,
        question: "Une pompe à chaleur fait-elle du bruit ?",
        answer:
          "Les modèles récents sont de plus en plus silencieux, mais l'unité extérieure reste audible. Son emplacement est choisi pour limiter la gêne, pour vous comme pour vos voisins.",
      },
      {
        id: 6,
        question: "Faut-il entretenir une pompe à chaleur ?",
        answer:
          `Oui : un entretien régulier préserve ses performances et sa durée de vie, et la plupart des fabricants le recommandent chaque année. L'[entretien d'une pompe à chaleur](/climatisation/entretien-climatisation) est à **${prices.entretienPac.amount}€ TVAC**.`,
      },
      {
        id: 7,
        question: "Puis-je remplacer ma chaudière au mazout par une pompe à chaleur ?",
        answer:
          "Oui, c'est un cas fréquent : l'installation de nouvelles chaudières au mazout n'est plus autorisée en Région bruxelloise. Nous étudions avec vous la PAC, ou la solution hybride, adaptée à votre maison.",
      },
      {
        id: 8,
        question: "Combien de temps dure l'installation ?",
        answer:
          "Comptez généralement quelques jours, selon les adaptations nécessaires (radiateurs, électricité, eau chaude). Le planning précis figure dans votre devis.",
      },
    ],
    related: [
      "chauffage/remplacement-chaudiere",
      "chauffage/installation-radiateurs",
      "climatisation/installation-climatisation",
      "climatisation/entretien-climatisation",
    ],
    cta: {
      body: "Sortir du mazout, remplacer une chaudière en fin de vie, réduire votre facture : un projet de pompe à chaleur ne s'improvise pas. Nous étudions votre logement et vous remettons un devis clair sous 24h, avec un seul interlocuteur jusqu'à la mise en service.",
    },
    draft: false,
  },

  // --- Ramonage ---
  {
    category: "chauffage",
    slug: "ramonage-cheminee",
    title: "Ramonage",
    name: "Ramonage de cheminée et de conduits",
    pageTitle: "Ramonage de cheminée et de conduits à Bruxelles",
    metaTitle: `Ramonage de cheminée à Bruxelles – ${prices.ramonage.amount}€ TVAC`,
    metaDescription:
      `Ramonage de cheminée, poêle, insert et conduit de chaudière mazout à Bruxelles et environs. ${prices.ramonage.amount}€ TVAC, prix annoncé à l'avance. Prenez rendez-vous.`,
    summary:
      "Cheminée, poêle, insert ou conduit de chaudière mazout : un ramonage régulier limite les risques d'incendie et d'intoxication.",
    icon: "broom",
    intent: "entretien",
    price: { key: "ramonage" },
    hero: {
      eyebrow: "Sécurité · Entretien annuel",
      intro:
        "Feu ouvert, insert, poêle à bois ou chaudière au mazout : les suies qui tapissent vos conduits sont une cause majeure de feux de cheminée et d'intoxications. Nos techniciens ramonent et contrôlent vos conduits, au prix affiché.",
      image: {
        asset: "P18",
        alt: "Technicien ramonant un conduit de fumée",
      },
    },
    facts: [
      { icon: "euro", stat: `${prices.ramonage.amount}€ TVAC`, label: "Ramonage cheminée" },
      { icon: "calendar", stat: "1 fois par an", label: "Fréquence généralement recommandée" },
      { icon: "shield", stat: "Moins de risques", label: "Feu de cheminée et monoxyde de carbone" },
      { icon: "calendarCheck", stat: "Créneau rapide", label: "Généralement sous 24h" },
    ],
    blocks: [
      {
        type: "features",
        title: "Pourquoi faire ramoner vos conduits ?",
        intro:
          "Chaque flambée et chaque combustion de mazout déposent des suies dans le conduit. Sans ramonage, elles s'accumulent jusqu'à devenir dangereuses.",
        items: [
          {
            icon: "fire",
            title: "Éviter le feu de cheminée",
            text: "Les dépôts de suie et de goudron sont inflammables : ils peuvent s'embraser et endommager le conduit, voire la toiture.",
          },
          {
            icon: "smog",
            title: "Bien évacuer les fumées",
            text: "Un conduit encrassé ou obstrué (nid, débris) évacue mal les fumées, avec un risque de refoulement de monoxyde de carbone.",
          },
          {
            icon: "file",
            title: "Rester couvert",
            text: "En cas de sinistre, votre assureur peut demander la preuve d'un ramonage récent. Conservez le document remis après l'intervention.",
          },
          {
            icon: "wind",
            title: "Un meilleur tirage",
            text: "Un conduit propre tire mieux : le feu démarre plus facilement et votre appareil brûle plus proprement.",
          },
        ],
      },
      {
        type: "options",
        title: "Quels conduits ramonons-nous ?",
        items: [
          {
            title: "Feu ouvert et insert",
            text: "Pour les foyers au bois utilisés régulièrement, les dépôts s'accumulent vite dans le conduit maçonné ou tubé.",
            points: [
              "Ramonage mécanique du conduit",
              "Contrôle visuel du tirage",
              "Conseils d'utilisation (bois sec, allumage)",
            ],
          },
          {
            title: "Poêle à bois ou à pellets",
            text: "Les poêles produisent des suies fines qui encrassent rapidement le conduit et le tuyau de raccordement.",
            points: [
              "Ramonage du conduit et du raccordement",
              "Vérification de l'étanchéité du raccordement",
            ],
          },
          {
            title: "Conduit de chaudière au mazout",
            text: "La combustion du mazout encrasse le conduit : un ramonage régulier est indispensable au bon fonctionnement de la chaudière.",
            points: [
              "Complète l'[entretien de chaudière](/chauffage/entretien-chaudiere)",
              "Évacuation des fumées contrôlée",
            ],
          },
        ],
      },
      {
        type: "alert",
        tone: "info",
        title: "Chaudière gaz à ventouse ?",
        paragraphs: [
          "Les chaudières gaz à condensation évacuent leurs fumées par une ventouse ou un conduit spécifique. Leur évacuation des fumées est contrôlée lors de l'[entretien de chaudière](/chauffage/entretien-chaudiere), obligatoire en Région bruxelloise : en général, pas besoin de ramonage séparé.",
        ],
      },
      {
        type: "steps",
        title: "Déroulement d'un ramonage",
        steps: [
          {
            title: "Rendez-vous",
            description:
              "Nous fixons un créneau, idéalement avant la saison de chauffe. Ne faites pas de feu dans les heures qui précèdent : le conduit doit être froid.",
          },
          {
            title: "Protection",
            description: "Protection de la zone autour de l'appareil avant de commencer.",
          },
          {
            title: "Ramonage",
            description:
              "Passage du hérisson dans tout le conduit pour décoller suies et dépôts, puis évacuation des résidus.",
          },
          {
            title: "Contrôle et conseils",
            description:
              "Vérification du tirage et de l'état visible du conduit, conseils d'utilisation et document d'intervention à conserver.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarif ramonage à Bruxelles",
        items: [{ key: "ramonage", popular: true }, { key: "entretienChaudiereMazout" }],
      },
    ],
    faqTitle: "Questions fréquentes sur le ramonage",
    faqs: [
      {
        id: 1,
        question: "Le ramonage est-il obligatoire ?",
        answer:
          "Les obligations dépendent de votre appareil et de votre combustible, et votre assureur ou votre bail peut aussi l'imposer. Dans tous les cas, un ramonage au moins une fois par an est fortement recommandé pour tout conduit utilisé régulièrement.",
      },
      {
        id: 2,
        question: "Combien coûte un ramonage de cheminée à Bruxelles ?",
        answer:
          `Le ramonage d'une cheminée est à **${prices.ramonage.amount}€ TVAC**. L'attestation de ramonage est comprise et le prix vous est annoncé avant l'intervention : pas de mauvaise surprise.`,
      },
      {
        id: 3,
        question: "À quelle fréquence faire ramoner ?",
        answer:
          "Au moins une fois par an pour une cheminée, un poêle ou un conduit de chaudière mazout utilisés régulièrement, idéalement avant l'hiver. Une utilisation intensive peut justifier un second passage.",
      },
      {
        id: 4,
        question: "Faut-il ramoner le conduit d'une chaudière au gaz ?",
        answer:
          "Pour une chaudière gaz à ventouse, l'évacuation des fumées est contrôlée lors de l'[entretien de chaudière](/chauffage/entretien-chaudiere). Pour un ancien conduit maçonné, demandez-nous conseil.",
      },
      {
        id: 5,
        question: "Combien de temps dure un ramonage ?",
        answer:
          "En général moins d'une heure pour un conduit standard, davantage si le conduit est très encrassé ou difficile d'accès.",
      },
      {
        id: 6,
        question: "Que faire en cas de feu de cheminée ?",
        answer:
          "Fermez si possible l'arrivée d'air de l'appareil, ne jetez jamais d'eau dans le foyer, évacuez le logement et appelez le 112.",
      },
      {
        id: 7,
        question: "Dois-je préparer quelque chose avant votre passage ?",
        answer:
          "Ne faites pas de feu dans les heures qui précèdent pour que le conduit soit froid, et dégagez l'accès à l'appareil. Nous nous occupons du reste.",
      },
    ],
    related: [
      "chauffage/entretien-chaudiere",
      "chauffage/depannage-chaudiere",
      "chauffage/pompe-a-chaleur",
      "chauffage/desembouage",
    ],
    cta: {
      title: "Votre ramonage est (bientôt) dû ? Prenons rendez-vous.",
      highlight: "(bientôt)",
      body: "Cheminée, insert, poêle ou chaudière au mazout : prenez rendez-vous avant la saison de chauffe. Un ramonage au prix affiché, et vous profitez de vos flambées en toute sérénité.",
    },
    draft: false,
  },
];

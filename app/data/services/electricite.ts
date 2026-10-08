import { prices } from "../pricing";
import type { Service } from "./types";

// Pages service « Électricité » — /electricite/<slug>.
// Textes validés par le gestionnaire le 08/10/2026 (draft: false). Les points
// techniques et réglementaires (RGIE, contrôle, bornes) restent des
// informations générales, pas des engagements commerciaux.
export const electriciteServices: Service[] = [
  // --- Dépannage électrique -------------------------------------------------
  {
    category: "electricite",
    slug: "depannage-electrique",
    title: "Dépannage électrique",
    name: "Dépannage électrique",
    pageTitle: "Dépannage électrique à Bruxelles, 7j/7",
    metaTitle: "Dépannage électrique à Bruxelles – 7j/7",
    metaDescription:
      `Électricien en urgence à Bruxelles : panne de courant, disjoncteur qui saute, prise HS. Intervention sous 24h, 7j/7, forfait ${prices.depannage.amount}€ TVAC. Appelez-nous.`,
    summary:
      "Panne de courant, différentiel qui saute, prise ou interrupteur HS : un électricien chez vous sous 24h, 7j/7.",
    icon: "bolt",
    intent: "urgence",
    price: { key: "depannage", label: "Dépannage électrique" },
    hero: {
      eyebrow: "Urgence électrique · 7j/7",
      intro:
        "Plus de courant, un différentiel qui saute sans arrêt, une prise qui chauffe ? Nos électriciens localisent la panne, sécurisent votre installation et rétablissent le courant, sous 24h, 7j/7, au prix annoncé avant intervention.",
      image: {
        asset: "P20",
        alt: "Électricien intervenant sur un tableau électrique ouvert, tournevis isolé en main",
      },
    },
    facts: [
      { icon: "euro", stat: `${prices.depannage.amount}€ TVAC`, label: "Déplacement + diagnostic + 1ère heure" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention rapide" },
      { icon: "calendarCheck", stat: "7j/7", label: "Week-end compris" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Pièces et interventions" },
    ],
    blocks: [
      {
        type: "features",
        layout: "list",
        eyebrow: "Diagnostic",
        title: "Les pannes électriques les plus fréquentes",
        intro:
          "Une panne électrique n'arrive jamais au bon moment. Chacune a pourtant une cause identifiable, et une solution.",
        items: [
          {
            icon: "power",
            title: "Disjoncteur ou différentiel qui saute",
            text: "Il coupe dès que vous branchez un appareil, ou sans raison apparente : appareil défectueux, défaut d'isolement ou circuit surchargé. Nous identifions le coupable.",
          },
          {
            icon: "bolt",
            title: "Panne de courant partielle",
            text: "Une pièce, un étage ou un circuit ne fonctionne plus alors que le reste du logement est alimenté.",
          },
          {
            icon: "plug",
            title: "Prise ou interrupteur hors service",
            text: "Prise qui ne délivre plus de courant, interrupteur qui grésille ou ne commande plus rien : remplacement dans les règles de l'art.",
          },
          {
            icon: "smog",
            title: "Odeur de brûlé",
            text: "Une odeur de plastique chaud près d'une prise, d'un interrupteur ou du tableau est un signal d'alerte : un contact qui chauffe peut provoquer un incendie.",
          },
          {
            icon: "tempHigh",
            title: "Prise ou fiche qui chauffe",
            text: "Contact desserré, prise usée ou multiprise surchargée : la chaleur est le premier signe d'un échauffement dangereux.",
          },
          {
            icon: "lightbulb",
            title: "Éclairage qui clignote",
            text: "Ampoules qui vacillent ou baisses de tension répétées : connexion lâche, variateur défaillant ou problème sur le circuit.",
          },
        ],
      },
      {
        type: "alert",
        tone: "danger",
        title: "Fil dénudé, étincelles, odeur de brûlé : les bons réflexes",
        paragraphs: [
          "**Coupez immédiatement le disjoncteur général** de votre tableau électrique, ne touchez ni aux fils ni à l'appareil en cause et éloignez les enfants.",
          "Ne tentez jamais de réparer vous-même un câble dénudé ou une prise noircie. Si une personne est électrisée, ne la touchez pas avant d'avoir coupé le courant. En cas d'électrisation ou de début d'incendie, appelez le **112** sans attendre.",
          "Une fois la situation sécurisée, appelez-nous : un électricien intervient sous 24h, 7j/7, pour localiser le défaut et remettre votre installation en service en toute sécurité.",
        ],
      },
      {
        type: "features",
        layout: "columns",
        eyebrow: "Avant d'appeler",
        title: "Trois vérifications qui font gagner du temps",
        items: [
          {
            icon: "search",
            title: "Toute la rue est-elle touchée ?",
            text: "Si vos voisins sont aussi dans le noir, la panne vient du réseau public, géré par le gestionnaire de réseau (Sibelga à Bruxelles) : votre installation n'est pas en cause.",
          },
          {
            icon: "power",
            title: "Quel disjoncteur est tombé ?",
            text: "Repérez au tableau le disjoncteur ou le différentiel en position basse. S'il refuse de se réarmer ou retombe aussitôt, ne forcez pas.",
          },
          {
            icon: "plug",
            title: "Débranchez, puis réarmez",
            text: "Débranchez les appareils du circuit concerné et réarmez. Si tout revient, rebranchez-les un par un : celui qui fait tout sauter est probablement défectueux.",
          },
        ],
        note: "Le différentiel retombe même avec tout débranché ? Le défaut se trouve dans l'installation elle-même : c'est le moment de nous appeler.",
      },
      {
        type: "steps",
        title: "Comment se déroule un dépannage électrique",
        steps: [
          {
            title: "Appel et premiers conseils",
            description:
              "Vous nous décrivez la panne : nous vous donnons les consignes de sécurité et planifions l'intervention sous 24h, 7j/7.",
          },
          {
            title: "Diagnostic sur place",
            description:
              "Votre électricien teste le tableau, les circuits et l'isolement pour localiser précisément le défaut.",
          },
          {
            title: "Prix annoncé, puis réparation",
            description:
              "Si des pièces ou du temps supplémentaire sont nécessaires, le prix vous est annoncé avant toute intervention. Vous validez, nous réparons.",
          },
          {
            title: "Remise en service",
            description:
              "Tests de fonctionnement et de sécurité, puis conseils pour éviter que la panne ne se reproduise.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarif dépannage électrique à Bruxelles",
        intro:
          "Un forfait clair qui couvre le déplacement, le diagnostic et la première heure de travail. Pièces éventuelles : devis communiqué et validé avant réparation.",
        items: [
          { key: "depannage", label: "Dépannage électrique", popular: true },
          {
            label: "Travaux complémentaires (tableau, circuit…)",
            note: "Devis gratuit, validé avant travaux",
          },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur le dépannage électrique",
    faqs: [
      {
        id: 1,
        question: "Intervenez-vous en urgence le week-end ?",
        answer:
          "Oui, nous intervenons 7j/7, week-end compris, avec une intervention sous 24h. Appelez-nous et nous planifions l'intervention au plus vite.",
      },
      {
        id: 2,
        question: "Combien coûte un dépannage électrique à Bruxelles ?",
        answer:
          `Le forfait dépannage est de **${prices.depannage.amount}€ TVAC** : il comprend le déplacement, le diagnostic et la première heure de travail. Au-delà de la première heure, chaque heure supplémentaire est facturée **${prices.heureSupplementaire.amount}€ TVAC**. Si des pièces ou des travaux supplémentaires sont nécessaires, le prix vous est annoncé avant toute intervention. Voir [tous nos tarifs](/tarifs).`,
      },
      {
        id: 3,
        question: "Pourquoi mon différentiel saute-t-il sans arrêt ?",
        answer:
          "Le plus souvent à cause d'un appareil défectueux (lave-linge, four, chauffe-eau…), d'humidité dans une boîte de connexion ou d'un défaut d'isolement d'un câble. Débranchez tout et réarmez : s'il retombe encore, le défaut est dans l'installation et doit être recherché par un électricien.",
      },
      {
        id: 4,
        question: "Je n'ai plus de courant du tout, que faire ?",
        answer:
          "Vérifiez d'abord votre disjoncteur général, puis demandez à vos voisins s'ils sont aussi touchés. Si toute la rue est dans le noir, la panne vient du réseau public, géré par Sibelga à Bruxelles. Si seul votre logement est concerné, appelez-nous.",
      },
      {
        id: 5,
        question: "Une prise qui chauffe, est-ce dangereux ?",
        answer:
          "Oui. Un échauffement signale un mauvais contact ou une surcharge, qui peut provoquer un incendie. Débranchez ce qui y est raccordé, coupez le circuit au tableau et faites-la vérifier rapidement.",
      },
      {
        id: 6,
        question: "Pouvez-vous remplacer mon tableau électrique après le dépannage ?",
        answer:
          "Oui. Si le diagnostic révèle un tableau vétuste ou non conforme, nous vous remettons un devis gratuit pour sa [rénovation](/electricite/renovation) ou sa [mise en conformité](/electricite/mise-en-conformite-electrique).",
      },
      {
        id: 7,
        question: "Vos réparations sont-elles garanties ?",
        answer: "Oui, nos pièces et interventions bénéficient d'une garantie de 2 ans.",
      },
      {
        // Garantie 2 ans + même condition que l'installation (gestionnaire, 08/10/2026, Q35).
        id: 8,
        question: "Le dépannage est-il garanti ?",
        answer:
          "Oui, nos dépannages sont garantis 2 ans. Pendant cette période, aucune autre entreprise ne doit intervenir sur l'installation concernée, sous peine d'annulation de la garantie.",
      },
    ],
    related: [
      "electricite/renovation",
      "electricite/mise-en-conformite-electrique",
      "electricite/installation-electricite",
      "chauffage/depannage-chaudiere",
    ],
    cta: {
      title: "Plus de courant ? Votre électricien est (presque) déjà en route.",
      highlight: "(presque)",
      body: "Différentiel qui saute, circuit en panne, prise qui chauffe : ne restez pas dans le noir. Nos électriciens interviennent 7j/7 à Bruxelles et en périphérie, sous 24h, au prix annoncé avant intervention. Décrivez-nous la panne, on s'occupe du reste.",
    },
    draft: false,
  },

  // --- Installation électrique ----------------------------------------------
  {
    category: "electricite",
    slug: "installation-electricite",
    title: "Installation électrique",
    name: "Installation électrique",
    pageTitle: "Installation électrique à Bruxelles : neuf, rénovation, extension",
    metaTitle: "Installation électrique à Bruxelles",
    metaDescription:
      "Installation électrique complète ou extension à Bruxelles : tableau, circuits, prises, éclairage. Conforme au RGIE, devis gratuit sous 24h, garantie 2 ans.",
    summary:
      "Construction, rénovation ou extension : tableau, circuits, prises et éclairage posés dans le respect du RGIE, prêts pour le contrôle.",
    icon: "plug",
    intent: "installation",
    hero: {
      eyebrow: "Installation · Devis gratuit",
      intro:
        "Construction neuve, rénovation ou simple extension : nous réalisons votre installation électrique (tableau, circuits, prises, éclairage) dans le respect du RGIE, avec un devis détaillé sous 24h.",
      image: {
        asset: "P26",
        alt: "Tableau électrique neuf installé dans son armoire",
      },
    },
    facts: [
      { icon: "clipboard", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
      { icon: "schema", stat: "Conforme au RGIE", label: "Prête pour le contrôle" },
      { icon: "users", stat: "Un seul interlocuteur", label: "De l'étude à la mise en service" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos travaux" },
    ],
    blocks: [
      {
        type: "options",
        eyebrow: "Votre projet",
        title: "Une installation électrique pour chaque projet",
        intro:
          "Du logement neuf à la pièce ajoutée, le point de départ est le même : une installation sûre, pensée pour vos usages et conforme au RGIE.",
        items: [
          {
            title: "Construction neuve",
            text: "Nous réalisons l'installation complète à partir de vos plans : implantation des prises et points lumineux, tableau, circuits spécialisés (cuisine, chauffe-eau, borne…).",
            points: [
              "Étude des besoins pièce par pièce",
              "Tableau dimensionné pour l'avenir",
              "Documents prêts pour le contrôle de conformité",
            ],
          },
          {
            title: "Rénovation",
            badge: "Maison ancienne",
            text: "Maison ancienne, appartement rénové : nous remplaçons tout ou partie d'une installation vieillissante. Voir notre page [rénovation électrique](/electricite/renovation).",
            points: [
              "Remplacement du tableau",
              "Nouveaux circuits avec terre",
              "Travaux organisés dans un logement habité",
            ],
          },
          {
            title: "Extension",
            text: "Nouvelle pièce, cuisine, véranda, grenier aménagé, garage : nous ajoutons les circuits nécessaires en vérifiant que votre tableau et votre raccordement peuvent suivre.",
            points: [
              "Contrôle de la capacité existante",
              "Nouveaux circuits protégés",
              "Intégration propre à l'existant",
            ],
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que comprend votre installation",
        items: [
          "Étude de vos besoins et plan d'implantation (prises, éclairage, circuits)",
          "Tableau électrique avec disjoncteurs et protections différentielles adaptés",
          "Circuits séparés pour les gros appareils (cuisson, lave-linge, chauffe-eau…)",
          "Prises, interrupteurs et points lumineux posés et raccordés",
          "Liaison à la terre et liaisons équipotentielles (salle de bain)",
          "Tests de fonctionnement et de sécurité avant mise en service",
          "[Schéma unifilaire et plans de position](/electricite/schema-electrique) pour le contrôle",
        ],
        note: "Le choix de l'appareillage et des luminaires se fait avec vous, au moment du devis.",
        image: {
          asset: "P22",
          alt: "Électricien mesurant la tension d'une prise murale au multimètre",
        },
      },
      {
        type: "callout",
        title: "RGIE et contrôle de conformité : ce qu'il faut savoir",
        paragraphs: [
          "En Belgique, toute installation électrique domestique doit respecter le **RGIE** (Règlement général sur les installations électriques). Avant sa mise en service, une nouvelle installation doit en principe être contrôlée par un **organisme agréé**, indépendant de l'électricien qui l'a réalisée.",
          "Pour cette visite, l'organisme demande le **schéma unifilaire** et les **plans de position** de l'installation. Nous les préparons avec votre installation, pour que le contrôle se passe sans mauvaise surprise. En savoir plus sur la [mise en conformité électrique](/electricite/mise-en-conformite-electrique).",
          "Les règles détaillées sont publiées par le [SPF Économie](https://economie.fgov.be).",
        ],
      },
      {
        type: "steps",
        title: "Votre installation, étape par étape",
        steps: [
          {
            title: "Visite et devis sous 24h",
            description:
              "Nous évaluons votre projet sur place et vous remettons un devis détaillé, gratuit et sans engagement.",
          },
          {
            title: "Plan d'implantation",
            description:
              "Emplacement des prises, points lumineux et circuits validé avec vous, pièce par pièce.",
          },
          {
            title: "Réalisation",
            description:
              "Pose des gaines, du câblage, du tableau et de l'appareillage par un électricien qualifié.",
          },
          {
            title: "Tests et documents",
            description:
              "Essais de fonctionnement et de sécurité, remise des schémas pour le contrôle de conformité.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarifs installation électrique à Bruxelles",
        intro:
          "Chaque installation dépend de la surface, du nombre de circuits et des équipements choisis : nous chiffrons précisément votre projet, gratuitement.",
        items: [
          { label: "Installation complète (neuf ou rénovation)", note: "Devis gratuit sous 24h" },
          { label: "Extension ou nouveau circuit", note: "Devis gratuit sous 24h" },
          { key: "depannage", label: "Dépannage électrique" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur l'installation électrique",
    faqs: [
      {
        id: 1,
        question: "Combien coûte une installation électrique complète ?",
        answer:
          "Le prix dépend de la surface du logement, du nombre de circuits et de points (prises, éclairage) et du matériel choisi. Nous établissons un devis détaillé et gratuit sous 24h, sans engagement.",
      },
      {
        id: 2,
        question: "Une nouvelle installation électrique doit-elle être contrôlée ?",
        answer:
          "Oui. Selon le RGIE, une nouvelle installation doit être contrôlée par un organisme agréé avant sa mise en service. Nous préparons le [schéma unifilaire et les plans de position](/electricite/schema-electrique) nécessaires à cette visite.",
      },
      {
        id: 3,
        question: "Pouvez-vous ajouter des prises ou un circuit à mon installation ?",
        answer:
          "Oui. Nous vérifions d'abord que votre tableau et votre raccordement peuvent supporter ce nouveau circuit, puis nous l'intégrons proprement. Une modification importante peut nécessiter un nouveau contrôle : nous vous le signalons dans le devis.",
      },
      {
        id: 4,
        question: "Combien de temps durent les travaux ?",
        answer:
          "Cela dépend de l'ampleur du chantier : quelques heures pour un nouveau circuit, davantage pour une installation complète. Le planning est fixé avec vous dans le devis.",
      },
      {
        id: 5,
        question: "Intervenez-vous aussi sur le chauffage et la plomberie ?",
        answer:
          "Oui, c'est l'avantage Radialec : un seul interlocuteur pour l'électricité, le [chauffage](/chauffage), la [plomberie](/plomberie) et la [climatisation](/climatisation). Pratique en rénovation.",
      },
      {
        id: 6,
        question: "Mon installation sera-t-elle garantie ?",
        answer: "Oui, nos travaux bénéficient d'une garantie de 2 ans.",
      },
    ],
    related: [
      "electricite/schema-electrique",
      "electricite/renovation",
      "electricite/installation-borne-recharge",
      "electricite/installation-videophonie",
    ],
    cta: {
      body: "Construction, rénovation ou extension : un projet électrique ne s'improvise pas. Nos électriciens qualifiés interviennent à Bruxelles et dans toute la région, avec un seul interlocuteur du premier rendez-vous jusqu'à la mise en service. Décrivez votre projet, on s'occupe du reste.",
    },
    draft: false,
  },

  // --- Mise en conformité électrique ----------------------------------------
  {
    category: "electricite",
    slug: "mise-en-conformite-electrique",
    title: "Mise en conformité",
    name: "Mise en conformité électrique",
    pageTitle: "Mise en conformité électrique à Bruxelles (RGIE)",
    metaTitle: "Mise en conformité électrique à Bruxelles",
    metaDescription:
      "Vente, rapport négatif, installation ancienne : mise en conformité RGIE à Bruxelles, travaux et schémas pour le contrôle. Devis gratuit sous 24h.",
    summary:
      "Vente de votre bien, rapport de contrôle négatif : nous réalisons les travaux et préparons les documents pour passer le contrôle RGIE.",
    icon: "shield",
    intent: "installation",
    price: { key: "miseEnConformite" },
    hero: {
      eyebrow: "RGIE · Vente & contrôle",
      intro:
        "Vous vendez votre bien ou avez reçu un rapport de contrôle négatif ? Nous analysons les remarques, réalisons les travaux de mise en conformité et préparons les schémas demandés pour la visite de l'organisme agréé.",
      image: {
        asset: "P20",
        alt: "Électricien contrôlant un tableau électrique ouvert",
      },
    },
    facts: [
      { icon: "clipboard", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
      { icon: "file", stat: "Rapport analysé", label: "Chaque remarque traitée" },
      { icon: "schema", stat: "Schémas préparés", label: "Unifilaire + plans de position" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos travaux" },
    ],
    blocks: [
      {
        type: "features",
        layout: "columns",
        eyebrow: "Obligation légale",
        title: "Quand le contrôle RGIE est-il obligatoire ?",
        intro:
          "Le contrôle de conformité est réalisé par un **organisme agréé**, indépendant de l'électricien. Il est exigé dans quatre situations.",
        items: [
          {
            icon: "home",
            title: "Vente d'un logement",
            text: "Le vendeur doit faire contrôler l'installation électrique et remettre le procès-verbal à l'acheteur.",
          },
          {
            icon: "plug",
            title: "Nouvelle installation",
            text: "Toute installation neuve doit être contrôlée avant sa mise en service.",
          },
          {
            icon: "tools",
            title: "Modification importante",
            text: "Une extension ou une transformation notable de l'installation doit, elle aussi, passer par un contrôle.",
          },
          {
            icon: "calendar",
            title: "Contrôle périodique",
            text: "Une installation domestique doit être recontrôlée tous les 25 ans.",
          },
        ],
        note: "Radialec réalise les travaux et prépare votre dossier ; le procès-verbal de conformité est délivré par l'organisme agréé que vous mandatez. Les règles exactes sont publiées par le [SPF Économie](https://economie.fgov.be).",
      },
      {
        type: "checklist",
        title: "Rapport négatif : ce que nous corrigeons",
        intro:
          "Un procès-verbal négatif liste des infractions à corriger. Les plus fréquentes :",
        items: [
          "Absence ou insuffisance de **protection différentielle**",
          "Tableau vétuste, fusibles à remplacer par des disjoncteurs",
          "Circuits sans **mise à la terre** ou terre insuffisante",
          "Section de câbles inadaptée au calibre de la protection",
          "Prises, boîtes de dérivation ou connexions mal protégées",
          "Liaisons équipotentielles manquantes dans la salle de bain",
          "[Schéma unifilaire et plans de position](/electricite/schema-electrique) absents ou incomplets",
        ],
        note: "À partir du rapport de l'organisme, nous vous remettons un devis clair, poste par poste.",
        image: {
          asset: "P25",
          alt: "Schéma unifilaire posé à côté du tableau électrique",
        },
      },
      {
        type: "callBand",
        title: "Un rapport négatif ? Envoyez-le-nous.",
        text: "Transmettez-nous le procès-verbal de l'organisme agréé : nous chiffrons gratuitement les travaux de mise en conformité, poste par poste, sous 24h.",
      },
      {
        type: "callout",
        title: "Vendre ou acheter avec un rapport négatif",
        paragraphs: [
          "Un procès-verbal négatif n'empêche pas la vente. Mais l'acheteur devra faire réaliser les travaux et **faire recontrôler l'installation dans le délai fixé par le RGIE**. C'est souvent un argument de négociation du prix.",
          "Vendeur, vous pouvez anticiper les travaux pour vendre avec un rapport positif. Acheteur, nous chiffrons les corrections pour vous aider à décider, puis nous réalisons la mise en conformité après la vente.",
          "Installation très ancienne ? Une [rénovation électrique](/electricite/renovation) complète peut revenir moins cher qu'une accumulation de corrections.",
        ],
      },
      {
        type: "steps",
        title: "De l'analyse au contrôle réussi",
        steps: [
          {
            title: "Analyse du rapport ou visite",
            description:
              "Nous étudions le procès-verbal de l'organisme ou inspectons votre installation avant le contrôle.",
          },
          {
            title: "Devis détaillé sous 24h",
            description:
              "Chaque correction chiffrée, poste par poste, gratuitement et sans engagement.",
          },
          {
            title: "Travaux de mise en conformité",
            description:
              "Réalisés par un électricien qualifié, dans le respect du RGIE.",
          },
          {
            title: "Dossier pour la visite",
            description:
              "Schéma unifilaire et plans de position à jour, prêts pour le nouveau passage de l'organisme agréé.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarifs mise en conformité électrique",
        intro:
          "Un forfait si votre installation est déjà conforme. Si des travaux sont nécessaires, nous les chiffrons gratuitement, poste par poste.",
        items: [
          { key: "miseEnConformite" },
          { label: "Travaux de mise en conformité après rapport", note: "Devis gratuit, poste par poste" },
          { label: "Schéma unifilaire + plans de position", note: "Sur devis selon la taille du logement" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur la mise en conformité électrique",
    faqs: [
      {
        id: 1,
        question: "Le contrôle électrique est-il obligatoire pour vendre à Bruxelles ?",
        answer:
          "Oui. En Belgique, la vente d'un logement impose un contrôle de l'installation électrique par un organisme agréé. Le procès-verbal est remis à l'acheteur, qu'il soit positif ou négatif.",
      },
      {
        id: 2,
        question: "Radialec peut-il délivrer le certificat de conformité ?",
        answer:
          "Non : le procès-verbal est établi par un organisme agréé, indépendant de l'électricien. Nous réalisons les travaux de mise en conformité et préparons les documents demandés pour que le contrôle se passe bien.",
      },
      {
        id: 3,
        question: "Que faire après un rapport de contrôle négatif ?",
        answer:
          "Faites corriger les infractions listées, puis faites recontrôler l'installation dans le délai prévu par le RGIE. Envoyez-nous le rapport : nous chiffrons les travaux gratuitement.",
      },
      {
        id: 4,
        question: "Combien coûte une mise en conformité électrique ?",
        answer:
          `Si aucune modification n'est nécessaire, comptez **${prices.miseEnConformite.amount}€ TVAC** : repérage de l'installation, schémas électriques et passage de l'organisme agréé pour l'attestation de conformité. Si des travaux sont à prévoir, tout dépend du nombre et de la nature des remarques : nous établissons un devis gratuit, poste par poste.`,
      },
      {
        id: 5,
        question: "Qu'est-ce qu'un schéma unifilaire ?",
        answer:
          "C'est le plan qui représente les circuits de votre installation et leurs protections. L'organisme agréé l'exige lors du contrôle, avec les plans de position. [En savoir plus](/electricite/schema-electrique).",
      },
      {
        id: 6,
        question: "Mon installation doit-elle être recontrôlée si je ne vends pas ?",
        answer:
          "Oui : une installation domestique doit être contrôlée périodiquement, tous les 25 ans, ainsi qu'après toute modification importante.",
      },
    ],
    related: [
      "electricite/schema-electrique",
      "electricite/renovation",
      "electricite/depannage-electrique",
      "electricite/installation-electricite",
    ],
    cta: {
      title: "Un contrôle à passer ? Votre devis, sans mauvaise surprise.",
      body: "Vente de votre bien, rapport négatif ou installation vieillissante : nos électriciens qualifiés analysent la situation, réalisent les corrections et préparent vos documents. Un seul interlocuteur jusqu'au nouveau passage de l'organisme agréé.",
    },
    draft: false,
  },

  // --- Borne de recharge ----------------------------------------------------
  {
    category: "electricite",
    slug: "installation-borne-recharge",
    title: "Borne de recharge",
    name: "Installation de borne de recharge",
    pageTitle: "Installation de borne de recharge à Bruxelles",
    metaTitle: "Installation borne de recharge à Bruxelles",
    metaDescription:
      "Borne de recharge pour voiture électrique à Bruxelles : étude du raccordement, circuit dédié, protections adaptées. Devis gratuit sous 24h, garantie 2 ans.",
    summary:
      "Wallbox à domicile ou en parking : étude de votre raccordement, circuit dédié et protections adaptées à la recharge d'un véhicule électrique.",
    icon: "charging",
    intent: "installation",
    hero: {
      eyebrow: "Voiture électrique · Devis gratuit",
      intro:
        "Rechargez votre voiture chez vous, en toute sécurité. Nous vérifions votre raccordement, dimensionnons la puissance utile et installons votre borne sur un circuit dédié, avec les protections exigées pour la recharge.",
      image: {
        asset: "P23",
        alt: "Borne de recharge murale installée dans un garage, voiture en charge",
      },
    },
    facts: [
      { icon: "search", stat: "Étude du raccordement", label: "Puissance et réseau vérifiés" },
      { icon: "plug", stat: "Circuit dédié", label: "Protections adaptées" },
      { icon: "clipboard", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur l'installation" },
    ],
    blocks: [
      {
        type: "options",
        eyebrow: "Puissance",
        title: "Quelle puissance de borne pour votre voiture ?",
        intro:
          "La bonne puissance dépend de votre raccordement, de votre véhicule et de vos trajets. La plupart des particuliers rechargent la nuit : inutile de surdimensionner.",
        items: [
          {
            title: "7,4 kW – monophasé",
            badge: "Le plus courant",
            text: "La solution la plus répandue en maison. Une nuit de recharge couvre largement les trajets quotidiens de la plupart des conducteurs.",
            points: [
              "Compatible avec un raccordement monophasé",
              "Coût d'installation maîtrisé",
              "Idéal pour une recharge nocturne",
            ],
          },
          {
            title: "11 kW – triphasé",
            text: "Pour un raccordement triphasé adapté et un véhicule qui accepte cette puissance en courant alternatif. Recharge plus rapide.",
            points: [
              "Raccordement triphasé adapté requis",
              "Charge répartie sur les trois phases",
              "Puissance acceptée par la voiture à vérifier",
            ],
          },
          {
            title: "22 kW",
            text: "Réservé aux installations dont le raccordement le permet et aux véhicules capables d'en profiter : rare chez les particuliers, plus fréquent en entreprise.",
            points: [
              "Raccordement de forte puissance requis",
              "Peu de voitures chargent à 22 kW en courant alternatif",
              "Étude préalable indispensable",
            ],
          },
        ],
      },
      {
        type: "callout",
        title: "Réseau 3×230 V : une particularité bruxelloise",
        paragraphs: [
          "De nombreux logements bruxellois sont raccordés en **3×230 V** (triphasé sans neutre), et non en 3N400 V. Toutes les bornes et tous les véhicules ne se comportent pas de la même façon sur ce type de réseau : certains limitent la puissance de recharge.",
          "Avant de vous conseiller un modèle, nous vérifions votre type de raccordement, la puissance disponible au compteur et la capacité de votre tableau. Si une augmentation de puissance est nécessaire, elle se demande auprès du gestionnaire de réseau (Sibelga à Bruxelles) : nous vous indiquons la marche à suivre.",
        ],
      },
      {
        type: "checklist",
        title: "Une installation dans les règles",
        items: [
          "Visite technique : raccordement, compteur et tableau électrique",
          "Conseil sur la puissance et le type de borne adaptés à votre véhicule",
          "Circuit dédié depuis le tableau, câble dimensionné pour la recharge",
          "Protection différentielle adaptée (type A avec détection DC 6 mA, ou type B)",
          "Pose de la borne au mur ou sur pied, à l'intérieur ou à l'extérieur",
          "Configuration, essai de charge et explication de l'utilisation",
          "Documents pour le contrôle de conformité du nouveau circuit",
        ],
        note: "Le choix de la borne (gestion de charge, application, câble attaché ou non) se fait avec vous, selon votre véhicule et votre budget.",
        image: {
          asset: "P21",
          alt: "Tableau électrique neuf avec ses protections différentielles",
        },
      },
      {
        type: "steps",
        title: "Votre borne installée en 4 étapes",
        steps: [
          {
            title: "Étude de faisabilité",
            description:
              "Nous vérifions votre raccordement, la puissance disponible et l'emplacement idéal de la borne.",
          },
          {
            title: "Devis détaillé sous 24h",
            description:
              "Borne, câblage, protections et main-d'œuvre : tout est chiffré, gratuitement.",
          },
          {
            title: "Installation",
            description:
              "Pose du circuit dédié, des protections et de la borne par un électricien qualifié.",
          },
          {
            title: "Mise en service",
            description:
              "Configuration, essai de recharge avec votre véhicule et conseils d'utilisation.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarif installation de borne de recharge",
        intro:
          "Le prix dépend surtout de la distance entre le tableau et la borne, de votre raccordement et du modèle choisi. Nous le chiffrons précisément après visite.",
        items: [
          { label: "Borne de recharge à domicile", note: "Fourniture + pose, devis gratuit" },
          { label: "Borne en parking de copropriété", note: "Étude et devis gratuits" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur les bornes de recharge",
    faqs: [
      {
        id: 1,
        question: "Quelle puissance choisir pour ma borne de recharge ?",
        answer:
          "Pour la plupart des particuliers, une borne de 7,4 kW suffit pour recharger pendant la nuit. Le 11 kW n'a d'intérêt qu'avec un raccordement triphasé adapté et une voiture qui accepte cette puissance. Nous vous conseillons après avoir vu votre installation.",
      },
      {
        id: 2,
        question: "Mon raccordement électrique est-il suffisant ?",
        answer:
          "C'est la première chose que nous vérifions : type de réseau (monophasé, 3×230 V ou 3N400 V), puissance au compteur et capacité du tableau. Si une augmentation de puissance s'impose, elle se demande au gestionnaire de réseau.",
      },
      {
        id: 3,
        question: "Faut-il faire contrôler l'installation d'une borne ?",
        answer:
          "En principe, oui : la borne est alimentée par un nouveau circuit, qui doit faire l'objet d'un contrôle de conformité par un organisme agréé. Nous préparons les documents nécessaires.",
      },
      {
        id: 4,
        question: "Peut-on installer une borne dans un parking de copropriété ?",
        answer:
          "Oui, avec l'accord de la copropriété et une étude du raccordement commun. Nous travaillons aussi avec les syndics : [voir nos services aux copropriétés](/professionnels/syndics-coproprietes).",
      },
      {
        id: 5,
        question: "Puis-je recharger ma voiture sur une prise classique ?",
        answer:
          "En dépannage, oui, mais lentement, et en sollicitant une prise qui n'est pas conçue pour des heures de charge à forte intensité. Pour un usage quotidien, une borne sur circuit dédié est bien plus sûre.",
      },
      {
        id: 6,
        question: "Combien coûte l'installation d'une borne de recharge ?",
        answer:
          "Tout dépend du modèle, de la distance entre le tableau et la borne, et des éventuelles adaptations du tableau. Nous établissons un devis gratuit et détaillé sous 24h.",
      },
    ],
    related: [
      "electricite/installation-electricite",
      "electricite/renovation",
      "electricite/mise-en-conformite-electrique",
      "professionnels/syndics-coproprietes",
    ],
    cta: {
      title: "Une voiture électrique ? Votre borne, sans mauvaise surprise.",
      body: "Raccordement à vérifier, puissance à choisir, circuit à créer : une borne de recharge se prépare. Nos électriciens qualifiés étudient votre installation et vous remettent un devis clair sous 24h, à Bruxelles et dans toute la région.",
    },
    draft: false,
  },

  // --- Parlophonie ----------------------------------------------------------
  {
    category: "electricite",
    slug: "installation-parlophonie",
    title: "Parlophonie",
    name: "Installation de parlophone",
    pageTitle: "Installation et remplacement de parlophone à Bruxelles",
    metaTitle: "Installation de parlophone à Bruxelles",
    metaDescription:
      "Installation ou remplacement de parlophone à Bruxelles, maison ou immeuble : platine de rue, combinés, ouvre-porte. Devis gratuit sous 24h, garantie 2 ans.",
    summary:
      "Parlophone pour maison ou immeuble : platine de rue, combinés dans chaque logement et ouvre-porte, en installation neuve ou en remplacement.",
    icon: "bell",
    intent: "installation",
    hero: {
      eyebrow: "Maison & immeuble",
      intro:
        "Parlophone qui grésille, combiné qui ne sonne plus, ouvre-porte en panne ? Nous installons ou remplaçons votre parlophonie (platine de rue, combinés, gâche électrique), en maison comme en immeuble à appartements.",
      image: {
        asset: "P24",
        alt: "Platine de rue de parlophone et vidéophone sur une façade",
      },
    },
    facts: [
      { icon: "building", stat: "Maison ou immeuble", label: "Particuliers et copropriétés" },
      { icon: "sync", stat: "Remplacement", label: "Câblage existant réutilisé si possible" },
      { icon: "clipboard", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur l'installation" },
    ],
    blocks: [
      {
        type: "features",
        layout: "list",
        title: "Les signes qu'il est temps de remplacer votre parlophone",
        items: [
          {
            icon: "volume",
            title: "Son qui grésille ou qui coupe",
            text: "Voix inaudible, parasites, conversation qui se coupe : les composants ou le câblage fatiguent.",
          },
          {
            icon: "bell",
            title: "Ça ne sonne plus",
            text: "Un combiné muet, ou une sonnerie qui ne fonctionne qu'une fois sur deux.",
          },
          {
            icon: "key",
            title: "L'ouvre-porte ne répond plus",
            text: "Gâche électrique en panne ou commande défaillante : vos visiteurs restent à la porte.",
          },
          {
            icon: "damage",
            title: "Platine abîmée",
            text: "Boutons usés, étiquettes illisibles, platine vandalisée ou abîmée par les intempéries.",
          },
          {
            icon: "tools",
            title: "Pièces introuvables",
            text: "Sur les installations anciennes, les combinés de remplacement ne se trouvent plus : un remplacement complet devient plus simple.",
          },
          {
            icon: "video",
            title: "Envie de voir qui sonne",
            text: "Selon le système en place, le passage à la [vidéophonie](/electricite/installation-videophonie) peut réutiliser une partie du câblage existant.",
          },
        ],
      },
      {
        type: "options",
        title: "Maison ou immeuble : deux configurations",
        items: [
          {
            title: "Maison unifamiliale",
            text: "Une platine de rue avec un bouton d'appel, un combiné (ou un par étage) et la commande de la gâche électrique de la porte d'entrée.",
            points: [
              "Platine de rue à un bouton",
              "Un ou plusieurs combinés intérieurs",
              "Ouverture de la porte depuis le combiné",
            ],
          },
          {
            title: "Immeuble à appartements",
            badge: "Copropriétés",
            text: "Une platine avec un bouton par logement, un combiné dans chaque appartement et une alimentation commune. Nous coordonnons l'intervention avec le [syndic](/professionnels/syndics-coproprietes).",
            points: [
              "Platine multi-logements",
              "Combiné dans chaque appartement",
              "Travaux coordonnés avec le syndic",
            ],
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que comprend l'installation",
        items: [
          "Diagnostic de l'installation existante et du câblage",
          "Conseil sur le système adapté : audio ou vidéo, nombre de logements",
          "Pose de la platine de rue et des combinés intérieurs",
          "Raccordement de la gâche électrique ou de la serrure de la porte",
          "Étiquetage des noms sur la platine",
          "Essais d'appel et d'ouverture depuis chaque combiné",
        ],
        image: {
          asset: "P52",
          alt: "Platine de parlophone à l'entrée d'un immeuble",
        },
      },
      {
        type: "steps",
        title: "Comment se passe un remplacement",
        steps: [
          {
            title: "Visite et diagnostic",
            description:
              "Nous examinons la platine, les combinés et le câblage existant pour savoir ce qui peut être conservé.",
          },
          {
            title: "Devis gratuit sous 24h",
            description:
              "Un prix clair et, pour un immeuble, un devis que vous pouvez présenter à la copropriété.",
          },
          {
            title: "Installation",
            description:
              "Pose de la platine et des combinés, raccordement de l'ouvre-porte, en limitant la gêne pour les occupants.",
          },
          {
            title: "Essais avec vous",
            description:
              "Appel et ouverture testés depuis chaque logement avant notre départ.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarifs parlophonie à Bruxelles",
        intro:
          "Le prix dépend du nombre de logements, du type de platine et de l'état du câblage : nous le chiffrons gratuitement, sous 24h.",
        items: [
          { label: "Parlophone pour maison", note: "Fourniture + pose, devis gratuit" },
          { label: "Parlophonie d'immeuble", note: "Devis gratuit pour la copropriété" },
          { key: "depannage", label: "Dépannage parlophone" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur les parlophones",
    faqs: [
      {
        id: 1,
        question: "Peut-on remplacer un parlophone sans refaire le câblage ?",
        answer:
          "Souvent, oui : de nombreux systèmes récents fonctionnent sur deux fils existants. Nous vérifions l'état et le type de câblage lors de la visite avant de vous conseiller.",
      },
      {
        id: 2,
        question: "Installez-vous des parlophones dans les immeubles à appartements ?",
        answer:
          "Oui. Nous installons et remplaçons la parlophonie des immeubles et coordonnons l'intervention avec le syndic. [Découvrir nos services aux copropriétés](/professionnels/syndics-coproprietes).",
      },
      {
        id: 3,
        question: "Mon ouvre-porte ne fonctionne plus, que faire ?",
        answer:
          `La panne peut venir de la gâche électrique, de son alimentation ou du bouton du combiné. Un diagnostic permet de le savoir rapidement : c'est un [dépannage électrique](/electricite/depannage-electrique) au forfait de ${prices.depannage.amount}€ TVAC (déplacement + diagnostic + 1ère heure).`,
      },
      {
        id: 4,
        question: "Parlophone ou vidéophone : que choisir ?",
        answer:
          "Le parlophone suffit pour dialoguer et ouvrir. Le [vidéophone](/electricite/installation-videophonie) permet en plus de voir le visiteur avant d'ouvrir, un vrai plus pour la sécurité. Nous vous conseillons selon votre bâtiment et votre budget.",
      },
      {
        id: 5,
        question: "Peut-on remplacer un seul combiné dans un immeuble ?",
        answer:
          "Oui, si un combiné compatible avec le système existant est encore disponible. Sur les installations anciennes, ce n'est pas toujours le cas : nous vous le disons lors du diagnostic.",
      },
      {
        id: 6,
        question: "Combien coûte l'installation d'un parlophone ?",
        answer:
          "Le prix dépend du nombre de logements, du type de platine et de l'état du câblage. Le devis est gratuit, établi sous 24h.",
      },
    ],
    related: [
      "electricite/installation-videophonie",
      "professionnels/syndics-coproprietes",
      "electricite/depannage-electrique",
      "electricite/installation-electricite",
    ],
    cta: {
      title: "Un parlophone à remplacer ? Votre devis, sans mauvaise surprise.",
      body: "Maison ou immeuble, installation neuve ou remplacement : nos électriciens qualifiés vous conseillent le bon système et l'installent proprement, à Bruxelles et dans toute la région. Décrivez-nous votre porte d'entrée, on s'occupe du reste.",
    },
    draft: false,
  },

  // --- Vidéophonie ----------------------------------------------------------
  {
    category: "electricite",
    slug: "installation-videophonie",
    title: "Vidéophonie",
    name: "Installation de vidéophone",
    pageTitle: "Installation de vidéophone à Bruxelles",
    metaTitle: "Installation de vidéophone à Bruxelles",
    metaDescription:
      "Voyez qui sonne avant d'ouvrir : installation de vidéophone à Bruxelles, maison ou immeuble, en neuf ou en remplacement d'un parlophone. Devis gratuit 24h.",
    summary:
      "Voyez qui sonne avant d'ouvrir : écran intérieur, platine caméra et ouverture de porte, en maison comme en immeuble.",
    icon: "video",
    intent: "installation",
    hero: {
      eyebrow: "Sécurité · Contrôle d'accès",
      intro:
        "Voyez qui sonne avant d'ouvrir. Nous installons votre vidéophone (platine caméra, écran intérieur, ouverture de porte) en maison ou en immeuble, en neuf ou en remplacement d'un ancien parlophone.",
      image: {
        asset: "P24",
        alt: "Platine de rue de vidéophone avec caméra sur une façade",
      },
    },
    facts: [
      { icon: "video", stat: "Voir avant d'ouvrir", label: "Image du visiteur à l'écran" },
      { icon: "sync", stat: "Remplacement possible", label: "D'un ancien parlophone" },
      { icon: "clipboard", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur l'installation" },
    ],
    blocks: [
      {
        type: "features",
        layout: "columns",
        title: "Pourquoi passer à la vidéophonie ?",
        items: [
          {
            icon: "userShield",
            title: "Plus de sécurité",
            text: "Vous identifiez le visiteur avant de décrocher ou d'ouvrir : fini les ouvertures à l'aveugle.",
          },
          {
            icon: "door",
            title: "Plus de confort",
            text: "Répondez et ouvrez la porte depuis l'écran, sans descendre, même depuis l'étage.",
          },
          {
            icon: "wifi",
            title: "Connecté, selon le modèle",
            text: "Certains systèmes renvoient l'appel sur votre smartphone via le Wi-Fi : vous répondez même en votre absence.",
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que comprend l'installation",
        items: [
          "Conseil sur le modèle : écran, platine, options connectées",
          "Pose de la platine caméra à l'entrée, à la bonne hauteur",
          "Installation de l'écran intérieur, et de postes supplémentaires si besoin",
          "Raccordement de l'ouverture de porte (gâche électrique)",
          "Configuration de l'application smartphone, selon le modèle",
          "Essais d'appel, d'image et d'ouverture avec vous",
        ],
        image: {
          asset: "P27",
          alt: "Écran de vidéophone intérieur affichant un visiteur",
        },
      },
      {
        type: "options",
        title: "Maison ou immeuble",
        items: [
          {
            title: "Maison",
            text: "Une platine caméra à la porte ou au portail et un ou plusieurs écrans intérieurs. Idéal si votre porte d'entrée n'est pas visible depuis le séjour.",
            points: [
              "Platine caméra à un bouton",
              "Un ou plusieurs écrans",
              "Renvoi sur smartphone selon le modèle",
            ],
          },
          {
            title: "Immeuble à appartements",
            badge: "Copropriétés",
            text: "Une platine caméra commune avec un appel par logement et un écran dans chaque appartement. Nous organisons le chantier avec le [syndic](/professionnels/syndics-coproprietes).",
            points: [
              "Platine multi-logements",
              "Écran dans chaque appartement",
              "Coordination avec le syndic",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Votre vidéophone installé en 4 étapes",
        steps: [
          {
            title: "Visite",
            description:
              "Nous vérifions l'entrée, le câblage existant et vos besoins (nombre d'écrans, smartphone…).",
          },
          {
            title: "Devis gratuit sous 24h",
            description: "Matériel et pose chiffrés clairement, sans engagement.",
          },
          {
            title: "Installation",
            description:
              "Pose de la platine et des écrans, raccordement de l'ouverture de porte.",
          },
          {
            title: "Mise en service",
            description:
              "Réglage de l'image et du son, configuration de l'application le cas échéant, essais avec vous.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarifs vidéophonie à Bruxelles",
        intro:
          "Le prix dépend du matériel choisi, du nombre d'écrans et de l'état du câblage : nous le chiffrons gratuitement, sous 24h.",
        items: [
          { label: "Vidéophone pour maison", note: "Fourniture + pose, devis gratuit" },
          { label: "Vidéophonie d'immeuble", note: "Devis gratuit pour la copropriété" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur les vidéophones",
    faqs: [
      {
        id: 1,
        question: "Peut-on remplacer un parlophone par un vidéophone ?",
        answer:
          "Oui, et souvent sans refaire tout le câblage : de nombreux vidéophones fonctionnent sur deux fils. Nous vérifions votre installation existante lors de la visite.",
      },
      {
        id: 2,
        question: "Peut-on répondre au vidéophone depuis son smartphone ?",
        answer:
          "Oui, avec un modèle connecté : l'appel est renvoyé sur votre smartphone via le Wi-Fi du logement. Nous vous conseillons un modèle adapté et le configurons avec vous.",
      },
      {
        id: 3,
        question: "Faut-il une alimentation électrique près de l'écran ?",
        answer:
          "L'écran doit être alimenté, soit par une alimentation installée au tableau, soit par le bus du système, selon le modèle. Nous prévoyons l'alimentation lors de la pose.",
      },
      {
        id: 4,
        question: "Installez-vous des vidéophones dans les immeubles ?",
        answer:
          "Oui, avec une platine commune et un écran par appartement. Nous travaillons en lien avec le syndic : [voir nos services aux copropriétés](/professionnels/syndics-coproprietes).",
      },
      {
        id: 5,
        question: "Vidéophone filaire ou sans fil ?",
        answer:
          "Pour la platine et l'écran principal, le filaire reste la solution la plus fiable. Le sans-fil concerne surtout le renvoi d'appel sur smartphone. Nous vous conseillons selon votre bâtiment.",
      },
      {
        id: 6,
        question: "Combien coûte l'installation d'un vidéophone ?",
        answer:
          "Cela dépend du modèle, du nombre d'écrans et du câblage à prévoir. Nous établissons un devis gratuit et détaillé sous 24h.",
      },
    ],
    related: [
      "electricite/installation-parlophonie",
      "electricite/installation-electricite",
      "professionnels/syndics-coproprietes",
      "electricite/depannage-electrique",
    ],
    cta: {
      title: "Voir avant d'ouvrir ? Votre devis, sans mauvaise surprise.",
      body: "Maison ou immeuble, installation neuve ou remplacement d'un parlophone : nos électriciens qualifiés vous conseillent le bon système et l'installent proprement, à Bruxelles et dans toute la région. Décrivez-nous votre entrée, on s'occupe du reste.",
    },
    draft: false,
  },

  // --- Schéma électrique ----------------------------------------------------
  {
    category: "electricite",
    slug: "schema-electrique",
    title: "Schéma électrique",
    name: "Schéma unifilaire et plans de position",
    pageTitle: "Schéma électrique unifilaire à Bruxelles",
    metaTitle: "Schéma unifilaire électrique à Bruxelles",
    metaDescription:
      "Schéma unifilaire et plans de position de votre installation électrique à Bruxelles, exigés pour le contrôle RGIE (vente, conformité). Devis gratuit 24h.",
    summary:
      "Schéma unifilaire et plans de position à jour, exigés par l'organisme agréé lors du contrôle RGIE : vente, conformité, travaux.",
    icon: "schema",
    intent: "installation",
    hero: {
      eyebrow: "Contrôle RGIE · Vente",
      intro:
        "Pas de schéma, pas de contrôle réussi. Nous relevons votre installation électrique circuit par circuit et établissons le schéma unifilaire et les plans de position exigés par l'organisme agréé lors du contrôle RGIE.",
      image: {
        asset: "P25",
        alt: "Schéma unifilaire posé à côté d'un tableau électrique",
      },
    },
    facts: [
      { icon: "schema", stat: "Schéma unifilaire", label: "Circuits et protections" },
      { icon: "map", stat: "Plans de position", label: "Pièce par pièce" },
      { icon: "file", stat: "Prêts pour le contrôle", label: "Exigés par l'organisme agréé" },
      { icon: "clipboard", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
    ],
    blocks: [
      {
        type: "options",
        eyebrow: "Deux documents",
        title: "Schéma unifilaire et plans de position : de quoi parle-t-on ?",
        intro:
          "Le RGIE impose deux documents complémentaires, que l'organisme agréé demande lors de chaque contrôle.",
        items: [
          {
            title: "Le schéma unifilaire",
            text: "Il représente, avec des symboles normalisés, l'organisation électrique de votre installation : tableau, protections, circuits et ce qu'ils alimentent.",
            points: [
              "Disjoncteurs et différentiels, avec leurs calibres",
              "Sections des câbles",
              "Prises et points lumineux par circuit",
            ],
          },
          {
            title: "Les plans de position",
            text: "Ils situent, sur un plan de chaque niveau du logement, l'emplacement des équipements électriques et le circuit auquel chacun appartient.",
            points: [
              "Prises, interrupteurs et points lumineux",
              "Tableau et appareils fixes",
              "Repérage des circuits pièce par pièce",
            ],
          },
        ],
      },
      {
        type: "features",
        layout: "columns",
        title: "Quand avez-vous besoin d'un schéma électrique ?",
        items: [
          {
            icon: "home",
            title: "Vente de votre bien",
            text: "Le contrôle obligatoire avant la vente exige un schéma et des plans à jour.",
          },
          {
            icon: "clipboard",
            title: "Contrôle de conformité",
            text: "Réception d'une nouvelle installation, contrôle périodique ou recontrôle après un rapport négatif.",
          },
          {
            icon: "tools",
            title: "Travaux ou extension",
            text: "Après une modification, les documents doivent être mis à jour pour refléter l'installation réelle.",
          },
        ],
        note: "Schéma absent, illisible ou qui ne correspond plus à l'installation ? C'est une remarque fréquente dans les rapports de contrôle. Nous le reconstituons à partir de l'existant. En savoir plus sur la [mise en conformité électrique](/electricite/mise-en-conformite-electrique).",
      },
      {
        type: "steps",
        title: "Comment nous établissons votre schéma",
        steps: [
          {
            title: "Relevé du tableau",
            description:
              "Identification de chaque protection, de son calibre et du circuit qu'elle alimente.",
          },
          {
            title: "Relevé pièce par pièce",
            description:
              "Repérage de chaque prise, interrupteur et point lumineux, et du circuit auquel il appartient.",
          },
          {
            title: "Mise au propre",
            description:
              "Réalisation du schéma unifilaire et des plans de position selon les conventions attendues par les organismes de contrôle.",
          },
          {
            title: "Remise des documents",
            description:
              "Vous recevez un dossier prêt à présenter à l'organisme agréé lors de sa visite.",
          },
        ],
      },
      {
        type: "callout",
        title: "Un relevé révèle souvent des anomalies",
        paragraphs: [
          "En relevant l'installation, il n'est pas rare de découvrir des points non conformes : circuit sans protection différentielle, câble sous-dimensionné, absence de terre. Nous vous les signalons avant le contrôle, pour que vous puissiez décider en connaissance de cause.",
          "Si des corrections sont nécessaires, nous vous remettons un devis clair et pouvons réaliser les travaux dans la foulée : voir la [rénovation électrique](/electricite/renovation).",
        ],
      },
      {
        type: "pricing",
        title: "Tarif schéma électrique",
        intro:
          "Le prix dépend de la taille du logement et du nombre de circuits : nous le chiffrons gratuitement, sous 24h.",
        items: [
          { label: "Schéma unifilaire + plans de position", note: "Devis gratuit selon la taille du logement" },
          { label: "Mise en conformité après relevé", note: "Devis gratuit, poste par poste" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur le schéma électrique",
    faqs: [
      {
        id: 1,
        question: "Qu'est-ce qu'un schéma unifilaire ?",
        answer:
          "C'est la représentation simplifiée, avec des symboles normalisés, de votre installation électrique : protections, circuits et équipements alimentés. Il est exigé lors du contrôle RGIE, avec les plans de position.",
      },
      {
        id: 2,
        question: "Le schéma électrique est-il obligatoire pour vendre ?",
        answer:
          "Oui : l'organisme agréé qui réalise le contrôle obligatoire avant la vente demande le schéma unifilaire et les plans de position. Sans documents à jour, le rapport risque d'être négatif.",
      },
      {
        id: 3,
        question: "Je n'ai plus le schéma de mon installation, que faire ?",
        answer:
          "Nous pouvons le reconstituer à partir de l'installation existante : relevé du tableau, puis de chaque pièce. C'est un travail courant, notamment avant une vente.",
      },
      {
        id: 4,
        question: "Combien de temps faut-il pour réaliser un schéma ?",
        answer:
          "Cela dépend de la taille du logement et de la lisibilité du tableau. Nous vous indiquons un délai précis avec le devis.",
      },
      {
        id: 5,
        question: "Combien coûte un schéma unifilaire ?",
        answer:
          "Le prix varie selon la surface et le nombre de circuits. Nous établissons un devis gratuit sous 24h, sans engagement.",
      },
      {
        id: 6,
        question: "Radialec réalise-t-il aussi le contrôle ?",
        answer:
          "Non, le contrôle est réalisé par un organisme agréé indépendant. Nous préparons les documents et réalisons les éventuels travaux de [mise en conformité](/electricite/mise-en-conformite-electrique).",
      },
    ],
    related: [
      "electricite/mise-en-conformite-electrique",
      "electricite/renovation",
      "electricite/installation-electricite",
      "electricite/depannage-electrique",
    ],
    cta: {
      title: "Un contrôle électrique à préparer ? Votre devis, sans mauvaise surprise.",
      body: "Vente, rapport négatif ou travaux récents : nos électriciens qualifiés relèvent votre installation et établissent des documents clairs, prêts pour l'organisme agréé. Un seul interlocuteur, à Bruxelles et dans toute la région.",
    },
    draft: false,
  },

  // --- Rénovation électrique ------------------------------------------------
  {
    category: "electricite",
    slug: "renovation",
    title: "Rénovation électrique",
    name: "Rénovation électrique",
    pageTitle: "Rénovation électrique à Bruxelles : tableau et câblage",
    metaTitle: "Rénovation électrique et tableau à Bruxelles",
    metaDescription:
      "Tableau à fusibles, câblage ancien sans terre : rénovation électrique partielle ou complète à Bruxelles, conforme au RGIE. Devis gratuit sous 24h.",
    summary:
      "Tableau à fusibles, câblage sans terre, installation d'origine : nous modernisons tout ou partie de votre installation électrique.",
    icon: "hardhat",
    intent: "installation",
    hero: {
      eyebrow: "Rénovation · Devis gratuit",
      intro:
        "Tableau à fusibles, prises sans terre, câblage d'un autre âge : nous modernisons votre installation électrique, partiellement ou entièrement, pour plus de sécurité et une installation conforme au RGIE.",
      image: {
        asset: "P21",
        alt: "Tableau électrique neuf, différentiels et disjoncteurs rangés",
      },
    },
    facts: [
      { icon: "userShield", stat: "Plus de sécurité", label: "Différentiels et mise à la terre" },
      { icon: "layers", stat: "Partielle ou complète", label: "Selon l'état de l'installation" },
      { icon: "clipboard", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos travaux" },
    ],
    blocks: [
      {
        type: "features",
        layout: "list",
        title: "Votre installation a-t-elle besoin d'une rénovation ?",
        intro:
          "Beaucoup de maisons et d'appartements bruxellois ont conservé une installation électrique d'origine. Ces signes doivent vous alerter :",
        items: [
          {
            icon: "power",
            title: "Tableau à fusibles",
            text: "Fusibles à broche ou en porcelaine, sans disjoncteurs modernes : une technologie dépassée, qui protège mal.",
          },
          {
            icon: "shield",
            title: "Pas de protection différentielle",
            text: "Le différentiel coupe le courant en cas de fuite vers la terre : c'est lui qui protège les personnes contre l'électrocution.",
          },
          {
            icon: "plug",
            title: "Prises sans terre",
            text: "Prises à deux trous, pas de liaison à la terre : les appareils métalliques ne sont pas protégés.",
          },
          {
            icon: "damage",
            title: "Câbles anciens",
            text: "Gaine textile, câbles qui s'effritent, fils apparents : l'isolant vieillit et se dégrade.",
          },
          {
            icon: "tempHigh",
            title: "Disjoncteurs qui sautent souvent",
            text: "Une installation sous-dimensionnée ne suit plus les usages actuels : cuisson, lave-linge, chauffage d'appoint…",
          },
          {
            icon: "file",
            title: "Rapport de contrôle négatif",
            text: "Quand les remarques s'accumulent, rénover coûte parfois moins cher que corriger point par point.",
          },
        ],
      },
      {
        type: "options",
        title: "Rénovation partielle ou complète ?",
        intro:
          "Tout dépend de l'état de l'installation et de vos projets. Nous vous conseillons après diagnostic, sans surdimensionner les travaux.",
        items: [
          {
            title: "Remplacement du tableau",
            text: "Nouveau tableau avec disjoncteurs et protections différentielles, raccordé aux circuits existants s'ils sont en bon état.",
            points: [
              "Intervention rapide",
              "Gain de sécurité immédiat",
              "Idéal si le câblage est sain",
            ],
          },
          {
            title: "Rénovation partielle",
            text: "Tableau et quelques circuits repris : cuisine, salle de bain, pièce rénovée. Le reste est contrôlé et conservé.",
            points: [
              "Travaux ciblés, budget maîtrisé",
              "Priorité aux pièces à risque",
              "Compatible avec un logement habité",
            ],
          },
          {
            title: "Rénovation complète",
            badge: "Maison ancienne",
            text: "Tout est refait : tableau, câblage, prises, éclairage, terre. La solution durable pour une installation d'origine ou avant de gros travaux.",
            points: [
              "Installation neuve de A à Z",
              "Pensée pour vos usages actuels",
              "Documents prêts pour le contrôle",
            ],
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que comprend une rénovation électrique",
        items: [
          "Diagnostic complet de l'installation existante",
          "Nouveau tableau avec disjoncteurs et protections différentielles",
          "Remplacement du câblage vétuste, circuits réorganisés",
          "Mise à la terre et liaisons équipotentielles",
          "Nouvelles prises, interrupteurs et points lumineux selon vos besoins",
          "[Schéma unifilaire et plans de position](/electricite/schema-electrique) à jour",
          "Tests de sécurité avant remise en service",
        ],
        note: "Nous préparons les documents pour la visite de contrôle exigée après une modification importante de l'installation.",
        image: {
          asset: "P20",
          alt: "Électricien intervenant sur un tableau électrique ouvert",
        },
      },
      {
        type: "steps",
        title: "Une rénovation bien organisée",
        steps: [
          {
            title: "Diagnostic et conseils",
            description:
              "Nous inspectons l'installation et vous expliquons ce qui peut être conservé, et ce qui doit être remplacé.",
          },
          {
            title: "Devis gratuit sous 24h",
            description:
              "Travaux priorisés et chiffrés clairement, pour décider sereinement.",
          },
          {
            title: "Travaux",
            description:
              "Planifiés avec vous, pièce par pièce si vous habitez sur place, pour limiter les coupures.",
          },
          {
            title: "Tests et documents",
            description:
              "Essais de sécurité, remise des schémas et préparation du contrôle de conformité.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarifs rénovation électrique",
        intro:
          "Chaque rénovation est différente : nous chiffrons précisément votre projet après visite, gratuitement et sans engagement.",
        items: [
          { label: "Remplacement de tableau électrique", note: "Devis gratuit sous 24h" },
          { label: "Rénovation partielle ou complète", note: "Devis gratuit après visite" },
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur la rénovation électrique",
    faqs: [
      {
        id: 1,
        question: "Quand faut-il rénover une installation électrique ?",
        answer:
          "Lorsque le tableau fonctionne encore avec des fusibles, qu'il n'y a ni protection différentielle ni terre, ou que les câbles sont anciens et abîmés. Un rapport de contrôle négatif est aussi un bon moment pour faire le point.",
      },
      {
        id: 2,
        question: "Peut-on seulement remplacer le tableau électrique ?",
        answer:
          "Oui, si le câblage est en bon état. C'est souvent la première étape, avec un gain de sécurité immédiat. Nous vérifions les circuits avant de vous le proposer.",
      },
      {
        id: 3,
        question: "Peut-on rester dans le logement pendant les travaux ?",
        answer:
          "Dans la plupart des cas, oui. Nous organisons le chantier pièce par pièce pour limiter les coupures de courant. Pour une rénovation complète, un planning précis est défini avec vous.",
      },
      {
        id: 4,
        question: "Faut-il un contrôle après une rénovation électrique ?",
        answer:
          "Une modification importante de l'installation doit en principe être contrôlée par un organisme agréé. Nous préparons le [schéma unifilaire et les plans de position](/electricite/schema-electrique) pour cette visite.",
      },
      {
        id: 5,
        question: "Combien coûte la rénovation électrique d'une maison ?",
        answer:
          "Le prix dépend de la surface, du nombre de circuits et de l'étendue des travaux. Nous établissons un devis gratuit, détaillé poste par poste, sous 24h.",
      },
      {
        id: 6,
        question: "Pouvez-vous coordonner la rénovation avec le chauffage ou la plomberie ?",
        answer:
          "Oui, c'est tout l'intérêt de Radialec : un seul interlocuteur pour l'électricité, le [chauffage](/chauffage) et la [plomberie](/plomberie). Idéal en rénovation.",
      },
    ],
    related: [
      "electricite/mise-en-conformite-electrique",
      "electricite/schema-electrique",
      "electricite/installation-electricite",
      "chauffage/remplacement-chaudiere",
    ],
    cta: {
      title: "Une installation d'un autre âge ? Votre devis, sans mauvaise surprise.",
      body: "Tableau à fusibles, câbles fatigués, prises sans terre : ne laissez pas une installation vieillissante mettre votre sécurité en jeu. Nos électriciens qualifiés rénovent votre installation à Bruxelles et dans toute la région, avec un devis clair sous 24h.",
    },
    draft: false,
  },
];

import type { Service } from "./types";

// Catégorie Climatisation & pompes à chaleur (air-air). La PAC air-eau
// (remplacement de chaudière) vit dans chauffage/pompe-a-chaleur.
// Aucune photo dédiée n'existe encore : les heros affichent un placeholder.
// À CONFIRMER : certification frigoriste de Radialec (badge à afficher si oui)

export const climatisationServices: Service[] = [
  // --- Installation ---------------------------------------------------------
  {
    category: "climatisation",
    slug: "installation-climatisation",
    title: "Installation airco",
    name: "Installation de climatisation",
    pageTitle: "Installation de climatisation à Bruxelles et ses environs",
    metaTitle: "Installation de climatisation à Bruxelles",
    metaDescription:
      "Installation d'airco réversible à Bruxelles : mono-split ou multi-split, puissance calculée pour vos pièces. Devis gratuit sous 24h, garantie 2 ans.",
    summary:
      "Airco réversible mono ou multi-split, dimensionnée pour vos pièces : fraîcheur l'été, chauffage d'appoint l'hiver.",
    icon: "snowflake",
    intent: "installation",
    hero: {
      eyebrow: "Airco réversible · Devis gratuit",
      intro:
        "Nous installons votre climatisation réversible, dimensionnée pour vos pièces et posée proprement : fraîcheur en été, chaleur d'appoint en hiver. Devis détaillé sous 24h, gratuit et sans engagement.",
      image: {
        asset: "P43",
        alt: "Technicien Radialec mettant de niveau une unité intérieure de climatisation",
      },
    },
    facts: [
      { icon: "clipboard", stat: "Devis gratuit sous 24h", label: "Sans engagement" },
      { icon: "snowflake", stat: "Réversible", label: "Froid l'été, chaud l'hiver" },
      { icon: "ruler", stat: "Sur mesure", label: "Puissance calculée pièce par pièce" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
    ],
    blocks: [
      {
        type: "features",
        eyebrow: "Airco réversible",
        title: "Un seul appareil, deux saisons de confort",
        intro:
          "Une climatisation réversible est une **pompe à chaleur air-air** : elle rafraîchit l'été et chauffe l'hiver, pièce par pièce.",
        items: [
          {
            icon: "tempLow",
            title: "Fraîcheur maîtrisée",
            text: "Une température agréable pendant les canicules, dans le séjour, les chambres ou un bureau sous les toits.",
          },
          {
            icon: "tempHigh",
            title: "Chauffage d'appoint efficace",
            text: "En mode chaud, elle restitue généralement plus d'énergie qu'elle n'en consomme : idéal pour la mi-saison ou une pièce mal chauffée.",
          },
          {
            icon: "volume",
            title: "Discrète au quotidien",
            text: "Les unités intérieures récentes sont silencieuses ; l'emplacement de l'unité extérieure est choisi pour limiter toute gêne.",
          },
        ],
      },
      {
        type: "options",
        title: "Mono-split, multi-split ou gainable : quelle installation ?",
        intro:
          "Le bon système dépend du nombre de pièces à équiper, de la place disponible et de l'esthétique recherchée. Nous vous conseillons lors de la visite.",
        items: [
          {
            title: "Mono-split",
            badge: "Le plus courant",
            text: "Une unité extérieure reliée à une unité intérieure murale. La solution simple pour une pièce : chambre, bureau ou séjour.",
            points: [
              "Pose rapide, budget maîtrisé",
              "Idéal pour une pièce principale",
              "Évolutif : d'autres pièces peuvent suivre",
            ],
          },
          {
            title: "Multi-split",
            text: "Une seule unité extérieure pour plusieurs unités intérieures, chacune réglable indépendamment.",
            points: [
              "Plusieurs pièces, une seule unité en façade",
              "Adapté aux appartements",
              "Température réglée pièce par pièce",
            ],
          },
          {
            title: "Gainable",
            text: "L'unité est cachée dans un faux plafond et l'air est diffusé par des bouches discrètes. Faisabilité à étudier selon le projet.",
            points: [
              "Invisible dans la pièce",
              "Nécessite un faux plafond",
              "Pertinent en rénovation lourde",
            ],
          },
        ],
      },
      {
        type: "steps",
        title: "Votre installation, étape par étape",
        intro: "Un seul interlocuteur, du premier rendez-vous à la mise en service.",
        steps: [
          {
            title: "Visite et dimensionnement",
            description:
              "Surface, orientation, isolation, usage de chaque pièce : nous calculons la puissance juste et choisissons l'emplacement des unités avec vous.",
          },
          {
            title: "Devis détaillé sous 24h",
            description:
              "Un devis clair, poste par poste, gratuit et sans engagement. Le prix annoncé est le prix payé.",
          },
          {
            title: "Pose soignée",
            description:
              "Unités intérieure et extérieure, liaisons frigorifiques, évacuation des condensats et raccordement électrique.",
          },
          {
            title: "Mise en service et prise en main",
            description:
              "Test en froid et en chaud, réglages, explication de la télécommande et conseils d'entretien.",
          },
        ],
      },
      {
        type: "checklist",
        title: "Une pose pensée pour durer",
        items: [
          "Puissance calculée selon chaque pièce, ni trop ni trop peu",
          "Emplacement de l'unité extérieure étudié : bruit, voisinage, accès pour l'entretien",
          "Évacuation des condensats propre et discrète",
          "Liaisons frigorifiques réalisées dans les règles de l'art",
          "Circuit électrique adapté et protégé, conforme au [RGIE](/electricite/mise-en-conformite-electrique)",
          "Goulottes et percements réduits au minimum",
          "Mise en service avec test en mode froid et en mode chaud",
          "Conseils d'utilisation et d'[entretien](/climatisation/entretien-climatisation)",
        ],
        note: "Le tout couvert par notre garantie de 2 ans sur l'intervention.",
        image: {
          asset: "P40",
          alt: "Unité intérieure de climatisation murale dans un salon",
        },
      },
      {
        type: "callout",
        title: "Copropriété, façade, voisinage : ce qu'il faut vérifier",
        paragraphs: [
          "En appartement, poser une unité extérieure (façade, balcon, toiture) nécessite en général l'**accord de la copropriété**. Selon l'emplacement, en particulier en façade à rue, une **autorisation urbanistique** peut aussi être demandée : renseignez-vous auprès de votre commune avant les travaux.",
          "L'unité extérieure produit un bruit de fonctionnement. Nous choisissons avec vous un emplacement qui préserve votre confort et celui de vos voisins.",
          "Vous hésitez avec une [pompe à chaleur air-eau](/chauffage/pompe-a-chaleur) pour remplacer votre chaudière ? L'airco réversible chauffe par l'air, pièce par pièce ; la PAC air-eau alimente vos radiateurs ou votre chauffage par le sol. Nous vous aidons à choisir.",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur l'installation de climatisation",
    faqs: [
      {
        id: 1,
        question: "Combien coûte l'installation d'une climatisation à Bruxelles ?",
        answer:
          "Le prix dépend du nombre de pièces, de la puissance nécessaire et de la configuration (mono-split, multi-split, longueur des liaisons). Nous vous remettons un devis détaillé et gratuit sous 24h : le prix annoncé est le prix payé.",
      },
      {
        id: 2,
        question: "Une climatisation réversible peut-elle chauffer tout mon logement ?",
        answer:
          "Elle chauffe efficacement les pièces équipées, souvent en complément du chauffage central. Pour remplacer une chaudière et alimenter des radiateurs, une [pompe à chaleur air-eau](/chauffage/pompe-a-chaleur) est généralement plus adaptée.",
      },
      {
        id: 3,
        question: "Faut-il une autorisation pour installer une airco en appartement ?",
        answer:
          "En copropriété, l'accord de l'assemblée générale est généralement nécessaire pour poser une unité extérieure. Selon l'emplacement, une autorisation urbanistique peut aussi être requise par la commune : mieux vaut vérifier avant les travaux.",
      },
      {
        id: 4,
        question: "Combien de temps dure l'installation ?",
        answer:
          "Tout dépend de la configuration : une installation simple (mono-split) se fait souvent en une journée, un multi-split demande davantage. Nous vous indiquons la durée prévue lors du devis.",
      },
      {
        id: 5,
        question: "Une climatisation fait-elle du bruit ?",
        answer:
          "Les unités intérieures récentes sont discrètes, surtout en vitesse lente. L'unité extérieure produit un bruit de fonctionnement : son emplacement est étudié pour limiter la gêne, chez vous comme chez vos voisins.",
      },
      {
        id: 6,
        question: "Faut-il entretenir une climatisation ?",
        answer:
          "Oui : un entretien régulier, en général une fois par an, garde un air sain, limite la consommation et prolonge la durée de vie de l'appareil. Découvrez notre [entretien de climatisation](/climatisation/entretien-climatisation).",
      },
      {
        id: 7,
        question: "Quelle garantie sur l'installation ?",
        answer:
          "Nos interventions sont couvertes par une garantie de 2 ans. La garantie fabricant de l'appareil dépend de la marque et du modèle choisis.",
      },
    ],
    related: [
      "climatisation/entretien-climatisation",
      "chauffage/pompe-a-chaleur",
      "climatisation/depannage-climatisation",
      "electricite/installation-electricite",
    ],
    cta: {
      body: "Une chambre qui étouffe l'été, un bureau sous les toits, envie d'un chauffage d'appoint efficace : décrivez-nous votre projet de climatisation. Conseil, dimensionnement et devis détaillé sous 24h, sans engagement, avec un seul interlocuteur jusqu'à la mise en service.",
    },
    zonesIntro:
      "Nous installons votre climatisation dans les 19 communes de la Région bruxelloise et en périphérie, en Brabant flamand et en Brabant wallon.",
    draft: true,
  },

  // --- Entretien ------------------------------------------------------------
  {
    category: "climatisation",
    slug: "entretien-climatisation",
    title: "Entretien airco & PAC",
    name: "Entretien de climatisation et pompe à chaleur",
    pageTitle: "Entretien de climatisation et de pompe à chaleur à Bruxelles",
    metaTitle: "Entretien climatisation et PAC à Bruxelles",
    metaDescription:
      "Entretien d'airco et de pompe à chaleur à Bruxelles : nettoyage, désinfection, contrôle du circuit. Entretien PAC à 180€ TVAC, prix annoncé à l'avance.",
    summary:
      "Nettoyage, désinfection et contrôle de votre airco ou pompe à chaleur, pour un air sain et une consommation maîtrisée.",
    icon: "fan",
    intent: "entretien",
    price: { key: "entretienPac" },
    hero: {
      eyebrow: "Entretien annuel recommandé",
      intro:
        "Filtres encrassés, échangeur colonisé par les bactéries, performances en baisse : une airco ou une pompe à chaleur non entretenue consomme plus et souffle un air moins sain. Nos techniciens nettoient, désinfectent et contrôlent votre installation.",
      image: {
        asset: "P41",
        alt: "Technicien retirant le filtre d'une climatisation murale",
      },
    },
    facts: [
      { icon: "euro", stat: "180€ TVAC", label: "Entretien pompe à chaleur" },
      { icon: "calendar", stat: "1 fois par an", label: "Rythme généralement recommandé" },
      { icon: "leaf", stat: "Air plus sain", label: "Filtres et échangeur désinfectés" },
      { icon: "chart", stat: "Consommation maîtrisée", label: "Performances préservées" },
    ],
    blocks: [
      {
        type: "features",
        title: "Pourquoi entretenir votre airco ou votre PAC ?",
        items: [
          {
            icon: "leaf",
            title: "Un air sain",
            text: "Filtres, échangeur et bac à condensats accumulent poussières, moisissures et bactéries : odeurs, allergies et air vicié en sont la conséquence.",
          },
          {
            icon: "piggy",
            title: "Une facture plus légère",
            text: "Un appareil encrassé force davantage pour le même confort. Propre et bien réglé, il consomme moins.",
          },
          {
            icon: "shield",
            title: "Une installation qui dure",
            text: "Les petits défauts sont repérés avant la panne. Beaucoup de fabricants conditionnent aussi leur garantie à un entretien régulier : vérifiez les conditions de la vôtre.",
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que comprend notre entretien",
        items: [
          "Nettoyage ou remplacement des filtres de l'unité intérieure",
          "Nettoyage et désinfection de l'échangeur et de la turbine",
          "Nettoyage du bac et contrôle de l'évacuation des condensats",
          "Contrôle du circuit frigorifique (pressions, absence de fuite apparente)",
          "Nettoyage de l'unité extérieure : batterie, grille, ventilateur",
          "Vérification des raccordements électriques et de la commande",
          "Pompe à chaleur air-eau : contrôle de la pression du circuit de chauffage et des réglages",
          "Test de fonctionnement en froid et en chaud, conseils de réglage",
        ],
        note: "Un défaut détecté pendant l'entretien ? Nous vous annonçons le prix de la réparation avant toute intervention.",
        image: {
          asset: "P44",
          alt: "Désinfection de l'échangeur d'une unité intérieure de climatisation",
        },
      },
      {
        type: "pricing",
        title: "Tarifs entretien climatisation et pompe à chaleur",
        intro:
          "Un prix connu avant le rendez-vous. Pour une airco, le tarif dépend du nombre d'unités intérieures à entretenir.",
        items: [
          { key: "entretienPac" },
          { label: "Entretien climatisation (airco)", note: "Selon le nombre d'unités" },
        ],
      },
      {
        type: "steps",
        title: "Votre entretien en 4 étapes",
        steps: [
          {
            title: "Prise de rendez-vous",
            description: "Un créneau rapide, par téléphone, au prix annoncé à l'avance.",
          },
          {
            title: "Nettoyage et désinfection",
            description: "Filtres, échangeur, turbine, bac à condensats et unité extérieure.",
          },
          {
            title: "Contrôles et tests",
            description:
              "Circuit frigorifique, écoulement, raccordements électriques, fonctionnement en froid et en chaud.",
          },
          {
            title: "Bilan et conseils",
            description:
              "Vous savez ce qui a été fait. Si une réparation est nécessaire, son prix vous est annoncé avant toute intervention.",
          },
        ],
      },
      {
        type: "callout",
        title: "Quand programmer l'entretien ?",
        paragraphs: [
          "Idéalement **au printemps** pour une airco utilisée surtout l'été, et **avant l'hiver** pour une pompe à chaleur qui assure votre chauffage. Une visite par an est la fréquence généralement recommandée par les fabricants.",
          "Entre deux visites, dépoussiérez les filtres de l'unité intérieure régulièrement pendant la saison d'utilisation, en suivant la notice : c'est le geste qui fait le plus de différence.",
          "Un souci de fonctionnement avant la date prévue ? Consultez notre [dépannage de climatisation et PAC](/climatisation/depannage-climatisation).",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur l'entretien de climatisation et PAC",
    faqs: [
      {
        id: 1,
        question: "À quelle fréquence entretenir une climatisation ?",
        answer:
          "Une fois par an est la fréquence généralement recommandée. Entre deux entretiens, dépoussiérez régulièrement les filtres de l'unité intérieure pendant la saison d'utilisation.",
      },
      {
        id: 2,
        question: "Combien coûte l'entretien d'une pompe à chaleur ?",
        answer:
          "L'entretien d'une pompe à chaleur est à **180€ TVAC**. Pour une climatisation (airco), le prix dépend du nombre d'unités : il vous est annoncé avant l'intervention.",
      },
      {
        id: 3,
        question: "L'entretien d'une climatisation est-il obligatoire ?",
        answer:
          "L'entretien courant n'est pas toujours une obligation légale, mais il est vivement recommandé et souvent exigé par les fabricants pour maintenir la garantie. Certaines installations sont en outre soumises à des contrôles réglementaires : renseignez-vous sur [environnement.brussels](https://environnement.brussels).",
      },
      {
        id: 4,
        question: "Ma climatisation sent mauvais, est-ce grave ?",
        answer:
          "Une odeur de moisi vient généralement de l'encrassement du filtre, de l'échangeur ou du bac à condensats. Un nettoyage avec désinfection règle le problème dans la plupart des cas.",
      },
      {
        id: 5,
        question: "Que se passe-t-il si le technicien détecte une panne ?",
        answer:
          "Il vous explique le problème et vous annonce le prix de la réparation avant toute intervention. Rien n'est fait sans votre accord.",
      },
      {
        id: 6,
        question: "Puis-je nettoyer ma climatisation moi-même ?",
        answer:
          "Le dépoussiérage des filtres, oui : c'est même conseillé. La désinfection de l'échangeur, le contrôle du circuit frigorifique et le nettoyage de l'unité extérieure relèvent en revanche d'un professionnel.",
      },
      {
        id: 7,
        question: "Faut-il être présent pendant l'entretien ?",
        answer:
          "Oui, ou une personne de confiance : le technicien doit pouvoir accéder aux unités intérieures et à l'unité extérieure.",
      },
    ],
    related: [
      "climatisation/depannage-climatisation",
      "climatisation/installation-climatisation",
      "chauffage/pompe-a-chaleur",
      "chauffage/entretien-chaudiere",
    ],
    cta: {
      body: "Airco murale, multi-split ou pompe à chaleur : nos techniciens nettoient, désinfectent et contrôlent votre installation, puis vous expliquent ce qui a été fait. Un rendez-vous rapide, un prix connu d'avance et un air plus sain toute l'année.",
    },
    draft: true,
  },

  // --- Dépannage ------------------------------------------------------------
  {
    category: "climatisation",
    slug: "depannage-climatisation",
    title: "Dépannage airco & PAC",
    name: "Dépannage de climatisation et pompe à chaleur",
    pageTitle: "Dépannage de climatisation et de pompe à chaleur à Bruxelles",
    metaTitle: "Dépannage climatisation et PAC à Bruxelles",
    metaDescription:
      "Airco ou pompe à chaleur en panne à Bruxelles ? Intervention sous 24h, 7j/7. Dépannage à 149€ TVAC : déplacement, diagnostic et 1ère heure compris.",
    summary:
      "Votre airco ne refroidit plus, fuit ou affiche un code erreur ? Diagnostic et réparation sous 24h, 7j/7.",
    icon: "tempHigh",
    intent: "urgence",
    price: { key: "depannage", label: "Dépannage clim / PAC" },
    hero: {
      eyebrow: "Dépannage 7j/7 · Sous 24h",
      intro:
        "Plus de froid en pleine canicule, plus de chauffage avec votre pompe à chaleur, de l'eau qui coule sous l'unité murale : nos techniciens diagnostiquent la panne et réparent votre installation, au prix annoncé avant toute intervention.",
      image: {
        asset: "P42",
        alt: "Manomètres frigorifiques branchés sur l'unité extérieure d'une climatisation",
      },
    },
    facts: [
      { icon: "euro", stat: "149€ TVAC", label: "Déplacement + diagnostic + 1ère heure" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention rapide" },
      { icon: "calendarCheck", stat: "7j/7", label: "Week-end compris" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
    ],
    blocks: [
      {
        type: "features",
        layout: "list",
        title: "Les pannes que nous réparons",
        intro: "Airco murale, multi-split ou pompe à chaleur : décrivez-nous le symptôme, nous remontons à la cause.",
        items: [
          {
            icon: "tempHigh",
            title: "Ne refroidit plus",
            text: "L'appareil tourne mais souffle un air tiède : filtre colmaté, manque de fluide, sonde ou compresseur en cause.",
          },
          {
            icon: "tempLow",
            title: "Ne chauffe plus",
            text: "Votre PAC ou airco réversible ne produit plus de chaleur, ou se met en sécurité par temps froid.",
          },
          {
            icon: "drop",
            title: "Fuite d'eau de l'unité intérieure",
            text: "Évacuation des condensats bouchée, bac plein ou pente incorrecte : l'eau coule le long du mur.",
          },
          {
            icon: "smog",
            title: "Mauvaise odeur",
            text: "Odeur de moisi à la mise en route : échangeur et bac à condensats à nettoyer et désinfecter.",
          },
          {
            icon: "volume",
            title: "Bruit anormal",
            text: "Claquements, vibrations ou sifflements, sur l'unité intérieure comme sur l'unité extérieure.",
          },
          {
            icon: "alert",
            title: "Code erreur ou voyant qui clignote",
            text: "Le code affiché oriente le diagnostic : notez-le avant de nous appeler.",
          },
          {
            icon: "snowflake",
            title: "Givre sur l'unité ou les tuyaux",
            text: "Un givrage anormal signale souvent un problème de circulation d'air ou de fluide frigorigène.",
          },
          {
            icon: "power",
            title: "L'appareil ne démarre plus",
            text: "Télécommande, alimentation électrique, carte électronique : nous cherchons la cause exacte.",
          },
        ],
      },
      {
        type: "alert",
        tone: "info",
        title: "Avant d'appeler : 4 vérifications rapides",
        paragraphs: [
          "**Télécommande** : vérifiez les piles et le mode sélectionné (froid, chaud, déshumidification, ventilation).",
          "**Disjoncteur** : assurez-vous que le disjoncteur de la climatisation n'a pas sauté dans votre tableau électrique. S'il saute à nouveau, ne le réarmez pas en boucle.",
          "**Filtres** : des filtres saturés de poussière suffisent à faire chuter les performances. Dépoussiérez-les s'ils sont accessibles.",
          "**Unité extérieure** : rien ne doit gêner la circulation de l'air (bâche, feuilles, meuble). Toujours en panne ? Coupez l'appareil et appelez-nous.",
        ],
      },
      {
        type: "steps",
        title: "Comment se passe un dépannage ?",
        steps: [
          {
            title: "Appel et premier diagnostic",
            description:
              "Vous nous décrivez les symptômes et l'éventuel code erreur. Nous planifions l'intervention sous 24h, 7j/7.",
          },
          {
            title: "Diagnostic sur place",
            description:
              "Contrôle électrique, circuit frigorifique, écoulement des condensats, unité extérieure.",
          },
          {
            title: "Prix annoncé avant réparation",
            description: "Vous savez ce qui doit être fait et combien cela coûte avant que nous intervenions.",
          },
          {
            title: "Réparation et test",
            description: "Remise en service, test en froid et en chaud, conseils pour éviter que la panne se reproduise.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarif dépannage climatisation et pompe à chaleur",
        intro:
          "Le forfait couvre le déplacement, le diagnostic et la première heure de travail. Pièces éventuelles : prix annoncé et validé avant la réparation.",
        items: [{ key: "depannage", label: "Dépannage clim / PAC" }, { key: "entretienPac" }],
      },
      {
        type: "callout",
        title: "Réparer ou remplacer votre appareil ?",
        paragraphs: [
          "Sur une installation récente, la réparation est presque toujours la bonne option. Sur un appareil ancien dont les pannes se multiplient, nous vous donnons un avis honnête : réparer, ou envisager une [nouvelle installation](/climatisation/installation-climatisation).",
          "Dans tous les cas, un [entretien annuel](/climatisation/entretien-climatisation) reste le meilleur moyen d'éviter la panne en pleine canicule ou au cœur de l'hiver.",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur le dépannage de climatisation",
    faqs: [
      {
        id: 1,
        question: "Combien coûte un dépannage de climatisation ?",
        answer:
          "Le dépannage est à **149€ TVAC**, déplacement, diagnostic et première heure compris. Les pièces éventuelles vous sont annoncées avant la réparation.",
      },
      {
        id: 2,
        question: "Intervenez-vous le week-end ?",
        answer:
          "Oui, nous intervenons 7j/7, avec une intervention sous 24h à Bruxelles et en périphérie.",
      },
      {
        id: 3,
        question: "Pourquoi ma climatisation coule-t-elle ?",
        answer:
          "Le plus souvent, l'évacuation des condensats est bouchée ou le bac est plein. Coupez l'appareil pour éviter les dégâts et faites-le contrôler.",
      },
      {
        id: 4,
        question: "Ma climatisation ne refroidit plus, que faire ?",
        answer:
          "Vérifiez le mode, la température de consigne et l'état des filtres. Si l'air reste tiède, un manque de fluide ou un composant défaillant est possible : un diagnostic professionnel s'impose.",
      },
      {
        id: 5,
        question: "Dépannez-vous aussi les pompes à chaleur ?",
        answer:
          "Oui, les pompes à chaleur air-air (airco réversible) comme air-eau, qui alimentent votre chauffage. Le même forfait de dépannage s'applique.",
      },
      {
        id: 6,
        question: "Le fluide frigorigène peut-il simplement être rechargé ?",
        answer:
          "Un manque de fluide signale presque toujours une fuite : elle doit être localisée et réparée avant toute recharge, réalisée par un technicien habilité.",
      },
      {
        id: 7,
        question: "Comment éviter les pannes de climatisation ?",
        answer:
          "Un [entretien annuel](/climatisation/entretien-climatisation) et des filtres dépoussiérés régulièrement évitent la plupart des pannes et des mauvaises odeurs.",
      },
    ],
    related: [
      "climatisation/entretien-climatisation",
      "climatisation/installation-climatisation",
      "electricite/depannage-electrique",
      "chauffage/depannage-chaudiere",
    ],
    cta: {
      title: "Airco en panne ? Votre technicien est (presque) déjà en route.",
      highlight: "(presque)",
      body: "Canicule sans fraîcheur, pompe à chaleur à l'arrêt, eau qui coule sous l'unité : décrivez-nous la panne, on s'occupe du reste. Intervention sous 24h, 7j/7, à Bruxelles et en périphérie, au prix annoncé.",
    },
    draft: true,
  },
];

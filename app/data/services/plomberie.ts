import type { Service } from "./types";

// Catégorie Plomberie & sanitaire. Aucune photo dédiée n'existe encore :
// les heros et visuels affichent un placeholder décrivant la photo attendue.

export const plomberieServices: Service[] = [
  // --- Dépannage ------------------------------------------------------------
  {
    category: "plomberie",
    slug: "depannage",
    title: "Dépannage plomberie",
    name: "Dépannage de plomberie",
    pageTitle: "Plombier en urgence à Bruxelles : dépannage de plomberie 7j/7",
    metaTitle: "Plombier en urgence à Bruxelles, 7j/7",
    metaDescription:
      "Fuite d'eau, WC qui coule, canalisation percée à Bruxelles ? Plombier sous 24h, 7j/7. Dépannage à 149€ TVAC : déplacement, diagnostic et 1ère heure.",
    summary:
      "Fuite d'eau, WC qui coule, robinet ou canalisation percée : un plombier chez vous sous 24h, 7j/7, au prix annoncé.",
    icon: "faucet",
    intent: "urgence",
    price: { key: "depannage", label: "Dépannage sanitaire" },
    hero: {
      eyebrow: "Urgence plomberie · 7j/7",
      intro:
        "Fuite sous l'évier, chasse d'eau qui coule sans arrêt, tuyau percé ou pression en berne : nos plombiers interviennent sous 24h, 7j/7, à Bruxelles et en périphérie. Diagnostic clair, réparation durable, prix annoncé avant intervention.",
      image: {
        asset: "P30",
        alt: "Plombier réparant un siphon sous un évier",
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
        type: "alert",
        tone: "danger",
        title: "Fuite importante : les bons réflexes",
        paragraphs: [
          "**Coupez l'arrivée d'eau.** La vanne d'arrêt générale se trouve généralement près du compteur Vivaqua, souvent en cave, dans un local technique ou une gaine technique en appartement. Pour une fuite localisée, fermez le robinet d'arrêt de l'appareil (WC, lavabo, lave-linge).",
          "**Éloignez l'eau de l'électricité.** Si l'eau approche des prises, d'un appareil ou du tableau électrique, coupez le disjoncteur concerné, sans jamais toucher un équipement électrique les pieds dans l'eau.",
          "**Limitez les dégâts** : épongez, protégez vos biens et prenez des photos pour votre assurance. En cas de danger immédiat pour les personnes, appelez le 112 ; pour la fuite elle-même, appelez-nous.",
        ],
      },
      {
        type: "features",
        layout: "list",
        title: "Les pannes de plomberie que nous réparons",
        items: [
          {
            icon: "drop",
            title: "Fuite d'eau",
            text: "Robinet qui goutte, flexible fissuré, raccord ou siphon qui suinte, fuite apparente sur une canalisation.",
          },
          {
            icon: "toilet",
            title: "WC qui coule en continu",
            text: "Mécanisme de chasse, flotteur ou joint défaillant : une fuite discrète qui peut peser lourd sur votre facture d'eau.",
          },
          {
            icon: "water",
            title: "Canalisation percée",
            text: "Tuyau fendu, corrodé ou percé lors de travaux : réparation ou remplacement du tronçon abîmé.",
          },
          {
            icon: "pressure",
            title: "Pression d'eau faible",
            text: "Débit en baisse au robinet ou à la douche : calcaire, vanne mal ouverte, réducteur de pression ou fuite en amont. Voir aussi le [détartrage](/plomberie/detartrage).",
          },
          {
            icon: "thermometer",
            title: "Groupe de sécurité qui fuit",
            text: "Le groupe de sécurité de votre boiler goutte en permanence : contrôle et remplacement si nécessaire. Voir l'[entretien de boiler](/chauffage/entretien-chauffe-eau-boiler).",
          },
          {
            icon: "sink",
            title: "Évacuation lente ou bouchée",
            text: "Évier, douche ou WC qui s'écoule mal : consultez notre [débouchage de canalisations](/plomberie/debouchage).",
          },
          {
            icon: "faucet",
            title: "Robinetterie défectueuse",
            text: "Mitigeur qui fuit, robinet bloqué ou dur à manœuvrer : réparation ou remplacement.",
          },
          {
            icon: "damage",
            title: "Dégât des eaux",
            text: "Tache au plafond ou mur humide : nous cherchons l'origine de la fuite et la réparons.",
          },
        ],
      },
      {
        type: "steps",
        title: "Votre dépannage en 4 étapes",
        steps: [
          {
            title: "Appel",
            description:
              "Vous nous décrivez la fuite ; nous vous guidons pour limiter les dégâts et planifions l'intervention sous 24h, 7j/7.",
          },
          {
            title: "Diagnostic sur place",
            description: "Le plombier localise l'origine du problème et vous l'explique simplement.",
          },
          {
            title: "Prix annoncé",
            description: "Pièces et temps nécessaires : vous validez le prix avant toute réparation.",
          },
          {
            title: "Réparation et contrôle",
            description: "Étanchéité vérifiée, remise en eau, conseils pour éviter une nouvelle fuite.",
          },
        ],
      },
      {
        type: "pricing",
        title: "Tarif dépannage plomberie à Bruxelles",
        intro:
          "Le forfait couvre le déplacement, le diagnostic et la première heure de travail. Pièces et temps supplémentaire éventuels : annoncés et validés avant la réparation.",
        items: [{ key: "depannage", label: "Dépannage sanitaire" }, { key: "debouchage" }],
      },
      {
        type: "callout",
        title: "Fuite invisible : surveillez votre compteur",
        paragraphs: [
          "Une facture d'eau qui grimpe sans raison ? Fermez tous les robinets, relevez votre compteur Vivaqua, puis relevez-le à nouveau une heure plus tard sans avoir utilisé d'eau. S'il a tourné, une fuite existe quelque part.",
          "Le coupable le plus fréquent reste un **WC qui coule en continu**, suivi du **groupe de sécurité du boiler**. Deux réparations simples, qui s'amortissent vite.",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur le dépannage de plomberie",
    faqs: [
      {
        id: 1,
        question: "Combien coûte l'intervention d'un plombier en urgence ?",
        answer:
          "Notre dépannage est à **149€ TVAC**, déplacement, diagnostic et première heure compris. Si des pièces ou du temps supplémentaire sont nécessaires, le prix vous est annoncé avant la réparation.",
      },
      {
        id: 2,
        question: "Intervenez-vous le week-end ?",
        answer: "Oui, 7j/7, avec une intervention sous 24h à Bruxelles et en périphérie.",
      },
      {
        id: 3,
        question: "Où se trouve la vanne d'arrêt d'eau ?",
        answer:
          "Généralement près du compteur d'eau Vivaqua : souvent en cave, dans un local technique ou une gaine technique en appartement. Repérez-la dès aujourd'hui : en cas de fuite, chaque minute compte.",
      },
      {
        id: 4,
        question: "Mon WC coule en continu, que faire ?",
        answer:
          "Fermez le robinet d'arrêt du WC, en général situé derrière la cuvette, pour stopper la fuite. Le mécanisme de chasse ou le flotteur est le plus souvent en cause : une réparation rapide.",
      },
      {
        id: 5,
        question: "Un dégât des eaux est-il couvert par mon assurance ?",
        answer:
          "Cela dépend de votre contrat. Prenez des photos, limitez les dégâts et prévenez votre assureur ; nous vous remettons une facture détaillée de la réparation.",
      },
      {
        id: 6,
        question: "Réparez-vous aussi les boilers et chauffe-eau ?",
        answer:
          "Oui : fuite du groupe de sécurité, eau tiède, entartrage… Consultez notre page [entretien de chauffe-eau et boiler](/chauffage/entretien-chauffe-eau-boiler).",
      },
      {
        id: 7,
        question: "Pourquoi ma pression d'eau est-elle faible ?",
        answer:
          "Le calcaire dans les mousseurs et pommeaux est une cause fréquente à Bruxelles, où l'eau est dure. Si toute la maison est concernée, une vanne, un réducteur de pression ou une fuite peut être en cause.",
      },
    ],
    related: [
      "plomberie/debouchage",
      "plomberie/detartrage",
      "chauffage/entretien-chauffe-eau-boiler",
      "electricite/depannage-electrique",
    ],
    cta: {
      title: "Une fuite ? Votre plombier est (presque) déjà en route.",
      highlight: "(presque)",
      body: "Fuite sous l'évier, WC qui coule, tuyau percé : coupez l'eau, appelez-nous, on s'occupe du reste. Intervention sous 24h, 7j/7, à Bruxelles et en périphérie, au prix annoncé avant réparation.",
    },
    draft: true,
  },

  // --- Débouchage -----------------------------------------------------------
  {
    category: "plomberie",
    slug: "debouchage",
    title: "Débouchage",
    name: "Débouchage de canalisations",
    pageTitle: "Débouchage de canalisations et de WC à Bruxelles",
    metaTitle: "Débouchage WC et canalisation à Bruxelles",
    metaDescription:
      "WC, évier, douche ou canalisation bouchés à Bruxelles ? Débouchage à 200€ TVAC, intervention sous 24h, 7j/7, sans abîmer vos tuyaux. Appelez-nous.",
    summary:
      "WC, évier, douche ou colonne bouchés : débouchage professionnel sous 24h, 7j/7, sans abîmer vos canalisations.",
    icon: "toilet",
    intent: "urgence",
    price: { key: "debouchage" },
    hero: {
      eyebrow: "Débouchage · 7j/7",
      intro:
        "Évier qui ne s'écoule plus, WC qui déborde, douche qui refoule ou mauvaises odeurs : nous débouchons vos canalisations avec un matériel professionnel adapté, sans abîmer votre installation, et cherchons la cause pour éviter la récidive.",
      image: {
        asset: "P31",
        alt: "Débouchage d'une évacuation de douche au furet électrique",
      },
    },
    facts: [
      { icon: "euro", stat: "200€ TVAC", label: "Canalisation, WC ou lavabo" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention rapide" },
      { icon: "calendarCheck", stat: "7j/7", label: "Week-end compris" },
      { icon: "tools", stat: "Matériel pro", label: "Furet ou hydrocurage selon le cas" },
    ],
    blocks: [
      {
        type: "features",
        title: "Ce que nous débouchons",
        items: [
          {
            icon: "toilet",
            title: "WC",
            text: "Bouchon, eau qui monte, évacuation lente ou débordement.",
          },
          {
            icon: "sink",
            title: "Évier et lavabo",
            text: "Graisses, résidus alimentaires, cheveux et calcaire accumulés dans le siphon ou la conduite.",
          },
          {
            icon: "shower",
            title: "Douche et baignoire",
            text: "Cheveux et savon qui ralentissent l'écoulement jusqu'au refoulement.",
          },
          {
            icon: "water",
            title: "Colonnes et canalisations",
            text: "Colonne d'immeuble, canalisation principale ou raccordement à l'égout, selon l'accès.",
          },
        ],
      },
      {
        type: "options",
        title: "La bonne méthode pour chaque bouchon",
        intro:
          "Nous choisissons la technique selon l'emplacement et la nature du bouchon, pour déboucher sans endommager vos canalisations.",
        items: [
          {
            title: "Ventouse et pompe professionnelles",
            text: "Pour un bouchon récent et proche de l'appareil : WC, lavabo, évier.",
          },
          {
            title: "Furet manuel ou électrique",
            text: "Pour un bouchon plus loin dans la canalisation : le furet désagrège et ramène les dépôts (cheveux, graisses, lingettes).",
          },
          {
            title: "Hydrocurage",
            text: "Selon le cas, pour une canalisation encrassée sur toute sa longueur : un jet d'eau sous haute pression nettoie les parois.",
          },
        ],
      },
      {
        type: "steps",
        title: "Votre débouchage en 4 étapes",
        steps: [
          {
            title: "Appel et premiers conseils",
            description:
              "N'actionnez plus la chasse, fermez l'arrivée d'eau de l'appareil qui déborde et n'ajoutez pas de produit chimique. Nous planifions l'intervention sous 24h, 7j/7.",
          },
          {
            title: "Localisation du bouchon",
            description: "Le technicien identifie où se situe le bouchon et choisit la méthode adaptée.",
          },
          {
            title: "Débouchage",
            description: "Ventouse, furet ou hydrocurage selon le cas, au prix annoncé avant l'intervention.",
          },
          {
            title: "Contrôle et conseils",
            description: "Test d'écoulement, cause expliquée et conseils pour que le problème ne revienne pas.",
          },
        ],
      },
      {
        type: "alert",
        tone: "info",
        title: "Soude caustique et déboucheurs chimiques : à éviter",
        paragraphs: [
          "Les produits agressifs peuvent attaquer certaines canalisations et joints, et rendent l'intervention plus délicate lorsqu'ils stagnent dans un tuyau bouché.",
          "Vous en avez déjà versé ? Signalez-le au technicien dès son arrivée : c'est important pour sa sécurité.",
        ],
      },
      {
        type: "pricing",
        title: "Tarif débouchage à Bruxelles",
        intro:
          "Un prix clair pour déboucher une canalisation, un WC ou un lavabo. Pour une colonne ou un égout, le prix vous est annoncé avant d'intervenir.",
        items: [{ key: "debouchage" }, { key: "depannage", label: "Dépannage sanitaire" }],
      },
      {
        type: "callout",
        title: "Éviter que ça se bouche à nouveau",
        paragraphs: [
          "Ne jetez ni lingettes (même dites « biodégradables »), ni graisses de cuisson, ni cotons-tiges dans les évacuations.",
          "Posez des grilles anti-cheveux sur la douche et la baignoire, une crépine sur l'évier, et faites couler régulièrement de l'eau très chaude.",
          "À Bruxelles, le calcaire rétrécit aussi les canalisations au fil des années : pensez au [détartrage](/plomberie/detartrage).",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur le débouchage",
    faqs: [
      {
        id: 1,
        question: "Combien coûte un débouchage à Bruxelles ?",
        answer:
          "Le débouchage d'une canalisation, d'un WC ou d'un lavabo est à **200€ TVAC**. Pour une colonne ou un égout, le prix vous est annoncé avant l'intervention.",
      },
      {
        id: 2,
        question: "Intervenez-vous en urgence pour un WC bouché ?",
        answer:
          "Oui, 7j/7, avec une intervention sous 24h. En attendant, n'actionnez plus la chasse pour éviter le débordement.",
      },
      {
        id: 3,
        question: "Faut-il utiliser un déboucheur chimique avant d'appeler ?",
        answer:
          "Nous le déconseillons : ces produits peuvent abîmer certaines canalisations et compliquer l'intervention. Si vous en avez versé, prévenez le technicien.",
      },
      {
        id: 4,
        question: "Pourquoi mes canalisations sentent-elles mauvais ?",
        answer:
          "Un siphon desséché ou encrassé, ou un début de bouchon, en est souvent la cause. Faites couler l'eau dans les évacuations peu utilisées ; si l'odeur persiste, un nettoyage s'impose.",
      },
      {
        id: 5,
        question: "Débouchez-vous les colonnes d'immeuble ?",
        answer:
          "Oui, selon l'accès. Pour les copropriétés, consultez nos [services aux syndics](/professionnels/syndics-coproprietes).",
      },
      {
        id: 6,
        question: "Comment éviter que mon évier se bouche ?",
        answer:
          "Pas de graisse ni de restes alimentaires dans l'évier, une crépine pour filtrer et de l'eau très chaude régulièrement. En cas d'écoulement lent, n'attendez pas le bouchon complet.",
      },
      {
        id: 7,
        question: "Le débouchage risque-t-il d'abîmer mes canalisations ?",
        answer:
          "Nous adaptons la technique (ventouse, furet ou hydrocurage selon le cas) au type et à l'état de vos canalisations, justement pour déboucher sans endommager votre installation.",
      },
    ],
    related: [
      "plomberie/depannage",
      "plomberie/detartrage",
      "professionnels/syndics-coproprietes",
      "chauffage/entretien-chauffe-eau-boiler",
    ],
    cta: {
      title: "Ça bouche ? Votre technicien est (presque) déjà en route.",
      highlight: "(presque)",
      body: "WC qui déborde, évier qui refoule, douche qui ne s'écoule plus : n'attendez pas le dégât des eaux. Intervention sous 24h, 7j/7, à Bruxelles et en périphérie, au prix annoncé.",
    },
    draft: true,
  },

  // --- Détartrage -----------------------------------------------------------
  {
    category: "plomberie",
    slug: "detartrage",
    title: "Détartrage",
    name: "Détartrage sanitaire et canalisations",
    pageTitle: "Détartrage de robinetterie, boiler et canalisations à Bruxelles",
    metaTitle: "Détartrage plomberie et boiler à Bruxelles",
    metaDescription:
      "Eau calcaire à Bruxelles : détartrage de robinetterie, pommeaux, boiler et canalisations. Débit retrouvé, appareils préservés. Devis gratuit sous 24h.",
    summary:
      "L'eau bruxelloise est calcaire : nous détartrons robinets, pommeaux, boiler et canalisations pour retrouver débit et eau chaude.",
    icon: "drop",
    intent: "entretien",
    hero: {
      eyebrow: "Eau calcaire · Bruxelles",
      intro:
        "À Bruxelles, l'eau du robinet est calcaire. Au fil des mois, le tartre réduit le débit, encrasse votre boiler et use prématurément robinets et mitigeurs. Nous détartrons vos équipements pour retrouver un débit normal et prolonger leur durée de vie.",
      image: {
        asset: "P32",
        alt: "Mousseur de robinet entartré",
      },
    },
    facts: [
      { icon: "pressure", stat: "Débit retrouvé", label: "Robinets et douches" },
      { icon: "thermometer", stat: "Eau chaude plus vite", label: "Boiler désentartré" },
      { icon: "piggy", stat: "Moins d'énergie", label: "Résistance sans tartre" },
      { icon: "clipboard", stat: "Devis gratuit", label: "Réponse sous 24h" },
    ],
    blocks: [
      {
        type: "features",
        layout: "list",
        title: "Les signes d'un excès de calcaire",
        intro:
          "Le tartre s'installe lentement : ces symptômes indiquent qu'il est temps d'agir, avant la panne.",
        items: [
          {
            icon: "pressure",
            title: "Débit faible",
            text: "Moins d'eau au robinet ou à la douche, alors que la pression du réseau est normale.",
          },
          {
            icon: "shower",
            title: "Pommeau aux jets irréguliers",
            text: "Buses bouchées, jets qui partent dans tous les sens.",
          },
          {
            icon: "faucet",
            title: "Mitigeur dur ou qui goutte",
            text: "Une cartouche entartrée se manœuvre mal et finit par fuir.",
          },
          {
            icon: "thermometer",
            title: "Eau chaude longue à venir",
            text: "La résistance d'un boiler entartré chauffe moins bien et s'use plus vite.",
          },
          {
            icon: "volume",
            title: "Boiler qui crépite",
            text: "Des crépitements pendant la chauffe signalent souvent du tartre accumulé au fond de la cuve.",
          },
          {
            icon: "water",
            title: "Traces blanches persistantes",
            text: "Dépôts sur la robinetterie et les parois de douche qui reviennent aussitôt nettoyés.",
          },
        ],
      },
      {
        type: "checklist",
        title: "Ce que nous détartrons",
        items: [
          "Mousseurs et robinetterie : lavabos, évier, baignoire",
          "Pommeaux, flexibles et colonnes de douche",
          "Cartouches de mitigeurs (détartrage ou remplacement)",
          "Résistance et cuve de votre boiler électrique, voir [l'entretien de chauffe-eau et boiler](/chauffage/entretien-chauffe-eau-boiler)",
          "Groupe de sécurité du boiler",
          "Canalisations et raccords accessibles entartrés",
          "Conseils pour limiter le calcaire au quotidien",
        ],
        note: "Une pièce trop entartrée pour être récupérée ? Nous vous le disons et vous annonçons le prix de son remplacement avant d'intervenir.",
        image: {
          asset: "P33",
          alt: "Boiler électrique en cours de vidange, résistance entartrée posée au sol",
        },
      },
      {
        type: "pricing",
        title: "Tarifs détartrage et entretien de boiler",
        intro:
          "Le prix du détartrage dépend des équipements à traiter. Il vous est toujours annoncé avant l'intervention.",
        items: [
          { label: "Détartrage robinetterie et sanitaires", note: "Selon les équipements" },
          { key: "entretienBoilerElectrique" },
          { key: "entretienChauffeEau" },
        ],
      },
      {
        type: "steps",
        title: "Votre détartrage en 4 étapes",
        steps: [
          {
            title: "Diagnostic",
            description: "Nous repérons les équipements touchés par le calcaire et évaluons leur état.",
          },
          {
            title: "Prix annoncé",
            description: "Vous savez ce qui sera fait et combien cela coûte avant toute intervention.",
          },
          {
            title: "Détartrage",
            description: "Démontage, détartrage avec des produits adaptés, remplacement des pièces irrécupérables si vous le validez.",
          },
          {
            title: "Contrôle et conseils",
            description: "Débit et étanchéité vérifiés, conseils pour ralentir le retour du calcaire.",
          },
        ],
      },
      {
        type: "callout",
        title: "Adoucisseur, filtre anti-calcaire : faut-il s'équiper ?",
        paragraphs: [
          "Un **adoucisseur** réduit fortement le tartre dans toute l'installation, mais demande un suivi régulier (sel, réglages). D'autres solutions existent, plus simples mais plus limitées.",
          "Nous vous conseillons en fonction de votre logement et de votre consommation, sans rien vous imposer. À défaut d'équipement, un détartrage régulier de vos appareils reste la solution la plus simple.",
          "Une question sur votre installation ? [Posez-la-nous](/contact#formulaire-rappel).",
        ],
      },
    ],
    faqTitle: "Questions fréquentes sur le détartrage",
    faqs: [
      {
        id: 1,
        question: "L'eau de Bruxelles est-elle calcaire ?",
        answer:
          "Oui, l'eau distribuée à Bruxelles est considérée comme dure : elle dépose du tartre dans les canalisations, les appareils et la robinetterie. Les caractéristiques de votre eau sont disponibles sur le site de [Vivaqua](https://www.vivaqua.be).",
      },
      {
        id: 2,
        question: "À quelle fréquence détartrer son boiler ?",
        answer:
          "Cela dépend de la dureté de l'eau et de votre consommation. En zone calcaire comme Bruxelles, un contrôle tous les 1 à 2 ans est généralement conseillé.",
      },
      {
        id: 3,
        question: "Combien coûte un détartrage ?",
        answer:
          "Le prix dépend des équipements à traiter et vous est annoncé avant l'intervention. L'entretien d'un boiler électrique est à **149€ TVAC** et celui d'un chauffe-eau à **129€ TVAC**.",
      },
      {
        id: 4,
        question: "Puis-je détartrer moi-même mes robinets ?",
        answer:
          "Les mousseurs et pommeaux, oui : un bain de vinaigre blanc suffit souvent. Pour un mitigeur, un boiler ou des canalisations, mieux vaut faire appel à un professionnel.",
      },
      {
        id: 5,
        question: "Le calcaire peut-il faire tomber mon boiler en panne ?",
        answer:
          "Oui : le tartre isole la résistance, qui chauffe plus et s'use plus vite, et peut faire goutter le groupe de sécurité. Un détartrage régulier prolonge sa durée de vie.",
      },
      {
        id: 6,
        question: "Installez-vous des adoucisseurs ?",
        answer:
          "Nous vous conseillons sur l'intérêt d'un adoucisseur pour votre logement. Parlons-en lors de notre passage ou [posez-nous la question](/contact#formulaire-rappel).",
      },
    ],
    related: [
      "chauffage/entretien-chauffe-eau-boiler",
      "plomberie/depannage",
      "plomberie/debouchage",
      "chauffage/entretien-chaudiere",
    ],
    cta: {
      title: "Débit en berne, boiler entartré ? Prenons rendez-vous.",
      body: "Robinetterie, pommeaux, boiler, canalisations : nos techniciens traquent le calcaire là où il vous coûte le plus cher. Un rendez-vous rapide, un prix annoncé à l'avance et une eau qui coule à nouveau normalement.",
    },
    draft: true,
  },
];

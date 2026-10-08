import { boilerBrandNames } from "./brands";
import { prices, type PriceRef } from "./pricing";
import type {
  CtaContent,
  Fact,
  FaqItem,
  Feature,
  ImageSpec,
  ServiceCategory,
  ServiceIntent,
  ServiceRef,
} from "./services/types";

// Contenu des pages catégorie (/chauffage, /electricite…), rendues par
// app/sections/CategoryPage.tsx. NB : ne pas importer ./services (index) ici
// — seulement des types — pour éviter une dépendance circulaire.

// Ordre de priorité commerciale (Q13, 04-reponses) : chauffage, électricité,
// climatisation et PAC, puis plomberie (complémentaire, à ne pas remonter).
export const categoryOrder: ServiceCategory[] = [
  "chauffage",
  "electricite",
  "climatisation",
  "plomberie",
  "professionnels",
];

export const categoryLabels: Record<ServiceCategory, string> = {
  chauffage: "Chauffage",
  electricite: "Électricité",
  plomberie: "Plomberie",
  climatisation: "Climatisation",
  professionnels: "Professionnels",
};

export interface CategoryContent {
  category: ServiceCategory;
  label: string;
  /** <title> sans le suffixe « | Radialec ». */
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    highlight?: string;
    intro: string;
    intent: ServiceIntent;
  };
  /** Exactement 4 chiffres/promesses clés. */
  facts: Fact[];
  servicesTitle: string;
  servicesIntro?: string;
  /** Cartes de services, dans l'ordre ; peut inclure d'autres catégories. */
  services: ServiceRef[];
  why?: {
    eyebrow?: string;
    title: string;
    intro?: string;
    items: Feature[];
    layout?: "columns" | "list";
    note?: string;
  };
  pricing?: {
    eyebrow?: string;
    title: string;
    intro?: string;
    items: PriceRef[];
    note?: string;
  };
  brands?: { title: string; intro?: string };
  guide?: {
    eyebrow?: string;
    title: string;
    paragraphs: string[];
    image?: ImageSpec;
  };
  faqTitle: string;
  faqs: FaqItem[];
  cta: CtaContent & { intent: ServiceIntent };
  /** true = texte non encore validé par Radialec. */
  draft?: boolean;
}

const depannageFrom = `Dès ${prices.depannage.amount}€ TVAC`;
// Prix d'appel du chauffage : le moins cher du dépannage et de l'entretien gaz.
const chauffageFrom = `Dès ${Math.min(prices.depannage.amount, prices.entretienChaudiereGaz.amount)}€ TVAC`;

export const categories: Record<ServiceCategory, CategoryContent> = {
  // ---------------------------------------------------------------------------
  // CHAUFFAGE
  // ---------------------------------------------------------------------------
  chauffage: {
    category: "chauffage",
    label: "Chauffage",
    metaTitle: "Chauffagiste à Bruxelles – dépannage 7j/7",
    metaDescription:
      "Chauffagiste à Bruxelles : installation, entretien et dépannage de chaudière 7j/7, intervention sous 24h, devis gratuit. Vaillant, Bulex, Bosch…, garantie 2 ans.",
    hero: {
      eyebrow: "Chauffagiste agréé · 7j/7",
      title: "Chauffagiste à Bruxelles : installation, entretien et dépannage",
      highlight: "Bruxelles",
      intro:
        `Chaudière en panne, entretien obligatoire ou remplacement : nos techniciens agréés interviennent sous 24h, 7j/7, sur les marques ${boilerBrandNames}. Prix annoncé avant intervention, devis gratuit.`,
      intent: "urgence",
    },
    facts: [
      { icon: "euro", stat: chauffageFrom, label: "Dépannage ou entretien gaz" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention à Bruxelles et environs" },
      { icon: "calendarCheck", stat: "7j/7", label: "Week-end compris" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Pièces et interventions" },
    ],
    servicesTitle: "Tous nos services de chauffage",
    servicesIntro:
      "De la simple panne au remplacement complet de votre installation : choisissez votre besoin, nous nous occupons du reste.",
    services: [
      "chauffage/remplacement-chaudiere",
      "chauffage/entretien-chaudiere",
      "chauffage/depannage-chaudiere",
      "chauffage/entretien-chauffe-eau-boiler",
      "chauffage/desembouage",
      "chauffage/installation-radiateurs",
      "chauffage/pompe-a-chaleur",
      "chauffage/ramonage-cheminee",
    ],
    why: {
      title: "Pourquoi confier votre chauffage à Radialec ?",
      items: [
        {
          icon: "award",
          title: "Techniciens agréés",
          text: "Agréés par Bruxelles Environnement, la VEKA et la Wallonie : nos interventions sont reconnues dans les trois régions.",
        },
        {
          icon: "tools",
          title: "Les grandes marques",
          text: `${boilerBrandNames} : nous connaissons votre chaudière, quel que soit son âge.`,
        },
        {
          icon: "euro",
          title: "Prix affichés",
          text: "Entretien, dépannage, ramonage : nos tarifs sont publics et le prix annoncé est le prix payé. [Voir nos tarifs](/tarifs).",
        },
        {
          icon: "handshake",
          title: "Un seul interlocuteur",
          text: "Chaudière, radiateurs, boiler, pompe à chaleur : une seule équipe suit votre installation dans la durée.",
        },
      ],
    },
    pricing: {
      title: "Tarifs chauffage à Bruxelles",
      intro:
        "Les prestations les plus demandées, à prix fixe. Pour une installation ou un remplacement, le [devis est gratuit](/contact#devis).",
      items: [
        { key: "entretienChaudiereGaz" },
        { key: "depannage", label: "Dépannage chaudière" },
        { key: "entretienChaudiereMazout" },
        { key: "ramonage" },
      ],
    },
    brands: {
      title: "Toutes les grandes marques de chaudières",
      intro:
        "Nous installons, entretenons et dépannons les chaudières des principaux fabricants, pour un matériel fiable et des pièces disponibles sur le long terme.",
    },
    guide: {
      title: "Réparer ou remplacer votre chaudière ?",
      paragraphs: [
        "Une chaudière qui tombe en panne n'est pas forcément à remplacer. Avant de vous parler de devis, nos techniciens posent un diagnostic et vous disent honnêtement si une [réparation](/chauffage/depannage-chaudiere) suffit.",
        "## Quand la réparation reste la bonne option",
        "Chaudière relativement récente, panne isolée (sonde, vanne, circulateur, carte électronique), entretien à jour : une réparation ciblée est généralement la solution la plus économique.",
        "## Quand envisager le remplacement",
        "Au-delà d'une quinzaine d'années, les pannes ont tendance à se répéter, certaines pièces deviennent difficiles à trouver et le rendement baisse — ce qui se paie sur chaque facture de gaz. Une chaudière à condensation récente consomme nettement moins qu'un ancien modèle.",
        "Vous chauffez au mazout ? La Région bruxelloise n'autorise plus l'installation de nouvelles chaudières au mazout : le [remplacement](/chauffage/remplacement-chaudiere) se fera vers le gaz à condensation ou une [pompe à chaleur](/chauffage/pompe-a-chaleur).",
        "Dans tous les cas, notre devis est gratuit et détaillé : vous comparez réparation et remplacement en connaissance de cause. Pour les primes et obligations à jour, référez-vous à [environnement.brussels](https://environnement.brussels).",
      ],
    },
    faqTitle: "Questions fréquentes sur le chauffage",
    faqs: [
      {
        id: 1,
        question: "Intervenez-vous le week-end pour une panne de chauffage ?",
        answer:
          "Oui. Nous intervenons 7j/7, week-end compris, à Bruxelles et dans ses environs, avec une intervention sous 24h. Appelez-nous : nous évaluons la situation par téléphone et fixons un créneau.",
      },
      {
        id: 2,
        question: "Combien coûte le déplacement d'un chauffagiste ?",
        answer:
          "Notre forfait dépannage comprend le déplacement, le diagnostic et la première heure de travail, à prix fixe TVAC. Si des pièces sont nécessaires, leur prix vous est annoncé avant toute réparation. Tous nos prix sont sur la page [Tarifs](/tarifs).",
      },
      {
        id: 3,
        question: "Ma chaudière est ancienne : pouvez-vous encore la réparer ?",
        answer:
          `Dans la plupart des cas, oui : nous intervenons sur les marques ${boilerBrandNames}, y compris les modèles anciens. Si les pièces ne sont plus disponibles ou si la réparation n'est plus rentable, nous vous le disons clairement et vous proposons un devis de [remplacement](/chauffage/remplacement-chaudiere) gratuit.`,
      },
      {
        id: 4,
        question: "Dois-je remplacer ma chaudière au mazout ?",
        answer:
          "Une chaudière au mazout existante, entretenue et en bon état, peut en principe continuer à fonctionner. En revanche, l'installation d'une nouvelle chaudière au mazout n'est plus autorisée en Région bruxelloise : le jour du remplacement, il faudra passer au gaz à condensation ou à une [pompe à chaleur](/chauffage/pompe-a-chaleur). Les règles à jour sont sur [environnement.brussels](https://environnement.brussels).",
      },
      {
        id: 5,
        question: "Mes radiateurs chauffent mal : est-ce la chaudière ?",
        answer:
          "Pas forcément. Des radiateurs tièdes en bas ou froids par endroits signalent souvent de l'air ou des boues dans le circuit : une purge, un équilibrage ou un [désembouage](/chauffage/desembouage) peut suffire. Notre technicien vérifie d'abord la chaudière, puis le circuit.",
      },
      {
        id: 6,
        question: "Intervenez-vous en dehors de Bruxelles ?",
        answer:
          "Oui : dans les 19 communes bruxelloises et en périphérie, en Brabant flamand (Tervuren, Kraainem, Rhode-Saint-Genèse…) et en Brabant wallon (Waterloo, La Hulpe, Lasne…). La liste complète figure dans notre zone d'intervention.",
      },
    ],
    cta: {
      intent: "urgence",
      title: "Plus de chauffage ? Votre chauffagiste est (presque) déjà en route.",
      highlight: "(presque)",
      body: "Chaudière en sécurité, radiateurs froids, plus d'eau chaude : nos chauffagistes agréés interviennent 7j/7 à Bruxelles et dans ses environs, sous 24h, au prix annoncé avant l'intervention. Décrivez-nous la panne, on s'occupe du reste.",
    },
    draft: false,
  },

  // ---------------------------------------------------------------------------
  // ÉLECTRICITÉ
  // ---------------------------------------------------------------------------
  electricite: {
    category: "electricite",
    label: "Électricité",
    metaTitle: "Électricien à Bruxelles – dépannage 7j/7",
    metaDescription:
      "Électricien à Bruxelles : dépannage 7j/7 sous 24h, installation, mise en conformité RGIE, borne de recharge, parlophone. Devis gratuit, prix annoncés.",
    hero: {
      eyebrow: "Électricien · Dépannage 7j/7",
      title: "Électricien à Bruxelles : dépannage, installation et conformité",
      highlight: "Bruxelles",
      intro:
        "Coupure de courant, différentiel qui saute, tableau vétuste ou contrôle RGIE avant une vente : nos électriciens interviennent 7j/7, sous 24h, avec un devis gratuit pour vos travaux.",
      intent: "urgence",
    },
    facts: [
      { icon: "euro", stat: depannageFrom, label: "Déplacement + diagnostic + 1ère heure" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention à Bruxelles et environs" },
      { icon: "shield", stat: "Normes RGIE", label: "Travaux prêts pour le contrôle" },
      { icon: "file", stat: "Devis gratuit", label: "Avant tous travaux" },
    ],
    servicesTitle: "Tous nos services d'électricité",
    servicesIntro:
      "Du dépannage urgent à la rénovation complète, en passant par la borne de recharge et le parlophone : un électricien pour tout votre logement.",
    services: [
      "electricite/depannage-electrique",
      "electricite/installation-electricite",
      "electricite/mise-en-conformite-electrique",
      "electricite/renovation",
      "electricite/schema-electrique",
      "electricite/installation-borne-recharge",
      "electricite/installation-parlophonie",
      "electricite/installation-videophonie",
    ],
    why: {
      title: "Un électricien qui travaille dans les règles",
      items: [
        {
          icon: "shield",
          title: "Aux normes RGIE",
          text: "Chaque circuit posé ou modifié respecte le Règlement général sur les installations électriques, pour passer le contrôle sans mauvaise surprise.",
        },
        {
          icon: "search",
          title: "Diagnostic d'abord",
          text: "Nous cherchons la cause de la panne avant de remplacer quoi que ce soit : vous ne payez que ce qui est utile.",
        },
        {
          icon: "euro",
          title: "Prix annoncé",
          text: "Forfait dépannage affiché, devis gratuit et détaillé pour tous les travaux. Le prix annoncé est le prix payé.",
        },
        {
          icon: "handshake",
          title: "Un seul interlocuteur",
          text: "Électricité, chauffage, plomberie : une seule équipe pour votre logement, sans multiplier les corps de métier.",
        },
      ],
    },
    pricing: {
      title: "Tarifs électricité à Bruxelles",
      intro:
        "Le dépannage est à prix fixe ; pour les travaux, chaque devis est gratuit et détaillé poste par poste.",
      items: [
        { key: "depannage", label: "Dépannage électrique" },
        { label: "Mise en conformité RGIE", note: "Devis gratuit et détaillé" },
        { label: "Installation de borne de recharge", note: "Devis gratuit selon votre installation" },
        { label: "Rénovation / tableau électrique", note: "Devis gratuit et détaillé" },
      ],
    },
    guide: {
      eyebrow: "Le conseil de l'électricien",
      title: "Vendre un bien : ce qu'il faut pour le contrôle électrique",
      paragraphs: [
        "En Belgique, la vente d'une habitation impose un **contrôle de l'installation électrique** par un organisme agréé, conformément au RGIE. Le rapport de visite est remis à l'acheteur : conforme ou non, la vente peut avoir lieu, mais les infractions relevées devront être corrigées dans le délai prévu par la réglementation.",
        "## Les documents à préparer",
        "L'organisme de contrôle a besoin d'un **schéma unifilaire** et d'un **plan de position** à jour. S'ils manquent ou ne correspondent plus à la réalité, nous les [réalisons pour vous](/electricite/schema-electrique) avant le passage du contrôleur.",
        "## Si l'installation n'est pas conforme",
        "Pas de panique : le rapport liste précisément les points à corriger. Nous chiffrons gratuitement la [mise en conformité](/electricite/mise-en-conformite-electrique) et réalisons les travaux avant la visite de recontrôle. Pour un tableau ou un câblage trop ancien, une [rénovation](/electricite/renovation) complète est parfois plus rationnelle.",
        "Les règles détaillées sont publiées par le SPF Économie : [economie.fgov.be](https://economie.fgov.be).",
      ],
    },
    faqTitle: "Questions fréquentes sur l'électricité",
    faqs: [
      {
        id: 1,
        question: "Mon différentiel saute sans arrêt : que faire ?",
        answer:
          "Débranchez tous les appareils, réarmez le différentiel, puis rebranchez-les un par un : s'il saute à nouveau sur un appareil précis, celui-ci est probablement en cause. S'il saute même sans rien de branché, le défaut vient de l'installation : ne forcez pas le réarmement et faites appel à notre [dépannage électrique](/electricite/depannage-electrique).",
      },
      {
        id: 2,
        question: "Tout le quartier est dans le noir : devez-vous intervenir ?",
        answer:
          "Si vos voisins sont aussi privés de courant, la panne vient probablement du réseau de distribution, géré par Sibelga à Bruxelles : c'est à eux qu'il faut la signaler. Si vous êtes seul concerné, le problème se situe en principe chez vous : nous intervenons 7j/7.",
      },
      {
        id: 3,
        question: "Quand un contrôle de l'installation électrique est-il obligatoire ?",
        answer:
          "Le RGIE impose un contrôle par un organisme agréé notamment lors de la vente d'une habitation, avant la mise en service d'une nouvelle installation et après une modification importante. Nous préparons votre installation et les [schémas](/electricite/schema-electrique) pour que ce contrôle se passe bien.",
      },
      {
        id: 4,
        question: "Pouvez-vous installer une borne de recharge dans une maison ancienne ?",
        answer:
          "Dans la grande majorité des cas, oui. Nous vérifions d'abord la puissance disponible, le type de réseau (le 3x230 V reste fréquent à Bruxelles) et l'état du tableau, puis nous vous proposons la solution adaptée. Détails sur la page [borne de recharge](/electricite/installation-borne-recharge).",
      },
      {
        id: 5,
        question: "Faut-il refaire toute l'électricité d'une maison ancienne ?",
        answer:
          "Pas nécessairement. Selon l'état du tableau, des câbles et de la mise à la terre, une remise en conformité ciblée peut suffire. Après diagnostic, nous vous présentons les deux options chiffrées : [mise en conformité](/electricite/mise-en-conformite-electrique) ou [rénovation](/electricite/renovation).",
      },
      {
        id: 6,
        question: "Installez-vous aussi des parlophones dans les immeubles ?",
        answer:
          "Oui, en maison comme en immeuble à appartements, pour les particuliers comme pour les syndics : [parlophonie](/electricite/installation-parlophonie) audio ou [vidéophonie](/electricite/installation-videophonie).",
      },
    ],
    cta: {
      intent: "urgence",
      title: "Plus de courant ? Votre électricien est (presque) déjà en route.",
      highlight: "(presque)",
      body: "Différentiel qui saute, prise qui chauffe, coupure partielle : nos électriciens interviennent 7j/7 à Bruxelles et dans ses environs, sous 24h, au prix annoncé avant l'intervention. Et pour vos projets, le devis est gratuit.",
    },
    draft: false,
  },

  // ---------------------------------------------------------------------------
  // PLOMBERIE
  // ---------------------------------------------------------------------------
  plomberie: {
    category: "plomberie",
    label: "Plomberie",
    metaTitle: "Plombier à Bruxelles – dépannage 7j/7",
    metaDescription:
      "Plombier à Bruxelles : fuite d'eau, WC ou évier bouché, détartrage. Intervention 7j/7 sous 24h, prix fixes TVAC annoncés d'avance, devis gratuit.",
    hero: {
      eyebrow: "Plombier · Urgence 7j/7",
      title: "Plombier à Bruxelles : fuite, débouchage et détartrage",
      highlight: "Bruxelles",
      intro:
        "Fuite d'eau, WC bouché, évier qui ne s'écoule plus ou robinetterie entartrée : nos plombiers interviennent 7j/7, sous 24h, à prix fixe annoncé avant l'intervention.",
      intent: "urgence",
    },
    facts: [
      { icon: "euro", stat: depannageFrom, label: "Dépannage sanitaire" },
      { icon: "clock", stat: "Sous 24h", label: "Intervention rapide" },
      { icon: "calendarCheck", stat: "7j/7", label: "Week-end compris" },
      { icon: "balance", stat: "Prix fixes", label: "Annoncés avant intervention" },
    ],
    servicesTitle: "Nos services de plomberie",
    servicesIntro:
      "Les interventions sanitaires les plus fréquentes, réalisées proprement, avec un prix connu d'avance.",
    services: [
      "plomberie/depannage",
      "plomberie/debouchage",
      "plomberie/detartrage",
      "chauffage/entretien-chauffe-eau-boiler",
    ],
    why: {
      title: "Un plombier sur qui compter",
      items: [
        {
          icon: "stopwatch",
          title: "Réactifs",
          text: "Une fuite n'attend pas : nous intervenons sous 24h, 7j/7, dans toute la Région bruxelloise et en périphérie.",
        },
        {
          icon: "search",
          title: "La cause, pas le symptôme",
          text: "Nous cherchons l'origine de la fuite ou du bouchon pour qu'il ne revienne pas la semaine suivante.",
        },
        {
          icon: "euro",
          title: "Prix fixes",
          text: "Dépannage et débouchage à prix fixe TVAC : pas de surprise sur la facture. [Voir nos tarifs](/tarifs).",
        },
      ],
    },
    pricing: {
      title: "Tarifs plomberie à Bruxelles",
      intro:
        "Deux forfaits clairs pour les interventions les plus courantes ; pour le reste, un devis gratuit.",
      items: [{ key: "depannage", label: "Dépannage sanitaire" }, { key: "debouchage" }],
    },
    guide: {
      eyebrow: "En attendant le plombier",
      title: "Fuite d'eau : les bons réflexes",
      paragraphs: [
        "Une fuite peut vite causer des dégâts chez vous… et chez le voisin du dessous. Quelques gestes simples limitent les dégâts en attendant notre arrivée.",
        "## 1. Coupez l'eau",
        "Fermez le robinet d'arrêt de l'appareil concerné (WC, lavabo, machine à laver) s'il y en a un. Sinon, fermez la **vanne d'arrêt générale**, en général située près du compteur d'eau Vivaqua, souvent en cave ou dans un local technique.",
        "## 2. Coupez l'électricité si l'eau approche des appareils",
        "Si l'eau atteint des prises, des appareils ou le tableau électrique, coupez le disjoncteur général avant de vous approcher. En cas de danger, appelez le 112.",
        "## 3. Protégez et documentez",
        "Épongez, placez un récipient sous la fuite et prenez des photos : elles seront utiles pour votre assureur. En appartement, prévenez les voisins du dessous et votre syndic.",
        "## 4. Appelez-nous",
        "Nous intervenons 7j/7 pour un [dépannage de plomberie](/plomberie/depannage), avec un prix annoncé avant toute réparation. Canalisation bouchée plutôt que fuite ? Voir notre service de [débouchage](/plomberie/debouchage).",
      ],
    },
    faqTitle: "Questions fréquentes sur la plomberie",
    faqs: [
      {
        id: 1,
        question: "Mon WC coule en continu : est-ce urgent ?",
        answer:
          "Ce n'est pas dangereux, mais un WC qui coule en permanence peut gaspiller beaucoup d'eau et faire grimper votre facture. Le plus souvent, le mécanisme de chasse ou le robinet flotteur est en cause : une intervention rapide, généralement sans gros travaux.",
      },
      {
        id: 2,
        question: "Faut-il utiliser de la soude caustique pour déboucher ?",
        answer:
          "Nous le déconseillons : ces produits abîment les joints et certaines canalisations, et sont dangereux à manipuler — surtout si le bouchon résiste et qu'un technicien doit ensuite intervenir. Un [débouchage professionnel](/plomberie/debouchage) est plus sûr et plus efficace.",
      },
      {
        id: 3,
        question: "L'eau de Bruxelles est-elle calcaire ?",
        answer:
          "Oui, l'eau de distribution à Bruxelles est plutôt dure. Le calcaire se dépose dans la robinetterie, les pommeaux de douche et les boilers, ce qui réduit le débit et use les équipements. Un [détartrage](/plomberie/detartrage) régulier prolonge leur durée de vie.",
      },
      {
        id: 4,
        question: "Intervenez-vous sur les boilers et chauffe-eau ?",
        answer:
          "Oui : entretien, détartrage et dépannage des boilers électriques et des chauffe-eau. Consultez notre page [chauffe-eau et boiler](/chauffage/entretien-chauffe-eau-boiler).",
      },
      {
        id: 5,
        question: "Combien coûte l'intervention d'un plombier ?",
        answer:
          "Le dépannage sanitaire et le débouchage sont à prix fixe TVAC, affichés sur notre page [Tarifs](/tarifs). Si des pièces ou des travaux supplémentaires sont nécessaires, le prix vous est annoncé avant l'intervention.",
      },
      {
        id: 6,
        question: "Intervenez-vous en appartement et pour les syndics ?",
        answer:
          "Oui, chez les particuliers comme dans les parties communes des copropriétés (colonnes, décharges communes). Voir nos services pour [syndics et copropriétés](/professionnels/syndics-coproprietes).",
      },
    ],
    cta: {
      intent: "urgence",
      title: "Une fuite ? Votre plombier est (presque) déjà en route.",
      highlight: "(presque)",
      body: "Fuite, WC bouché, évier qui déborde : nos plombiers interviennent 7j/7 à Bruxelles et dans ses environs, sous 24h, au prix annoncé avant l'intervention. Coupez l'eau, on s'occupe du reste.",
    },
    draft: false,
  },

  // ---------------------------------------------------------------------------
  // CLIMATISATION & POMPE À CHALEUR
  // ---------------------------------------------------------------------------
  climatisation: {
    category: "climatisation",
    label: "Climatisation",
    metaTitle: "Climatisation et pompe à chaleur à Bruxelles",
    metaDescription:
      "Installation, entretien et dépannage de climatisation et de pompe à chaleur à Bruxelles et environs. Devis gratuit sous 24h, dépannage 7j/7.",
    hero: {
      eyebrow: "Airco & pompe à chaleur",
      title: "Climatisation et pompe à chaleur à Bruxelles",
      highlight: "Bruxelles",
      intro:
        "Airco réversible ou pompe à chaleur air-eau : nous vous conseillons, installons et entretenons votre équipement pour un confort toute l'année — avec un dépannage 7j/7 si l'appareil faiblit.",
      intent: "installation",
    },
    facts: [
      { icon: "file", stat: "Devis gratuit", label: "Sous 24h, sans engagement" },
      {
        icon: "euro",
        stat: `${prices.entretienPac.amount}€ TVAC`,
        label: "Entretien pompe à chaleur",
      },
      { icon: "calendarCheck", stat: "Dépannage 7j/7", label: "Clim et pompe à chaleur" },
      { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos interventions" },
    ],
    servicesTitle: "Nos services climatisation et pompe à chaleur",
    servicesIntro:
      "Rafraîchir en été, chauffer en hiver, maîtriser la facture : choisissez le service qui correspond à votre projet.",
    services: [
      "climatisation/installation-climatisation",
      "climatisation/entretien-climatisation",
      "climatisation/depannage-climatisation",
      "chauffage/pompe-a-chaleur",
    ],
    why: {
      title: "Un projet de confort, pas juste un appareil",
      items: [
        {
          icon: "ruler",
          title: "Bien dimensionné",
          text: "Un appareil trop puissant ou trop faible consomme plus et s'use plus vite : nous calculons la puissance adaptée à vos pièces.",
        },
        {
          icon: "volume",
          title: "Pensé pour le voisinage",
          text: "Emplacement de l'unité extérieure, bruit, évacuation des condensats : nous anticipons les contraintes d'une ville dense comme Bruxelles.",
        },
        {
          icon: "sync",
          title: "Chaud et froid",
          text: "Une climatisation réversible est aussi un chauffage d'appoint efficace à la mi-saison.",
        },
        {
          icon: "tools",
          title: "Suivi dans la durée",
          text: "Entretien et dépannage assurés par nos soins après l'installation, avec des tarifs connus d'avance.",
        },
      ],
    },
    pricing: {
      title: "Tarifs climatisation et pompe à chaleur",
      intro:
        "Entretien et dépannage à prix fixe ; installation sur devis gratuit, après étude de votre logement.",
      items: [
        { key: "entretienPac" },
        { key: "depannage", label: "Dépannage clim / PAC" },
        { label: "Installation airco ou pompe à chaleur", note: "Devis gratuit sous 24h" },
      ],
    },
    guide: {
      title: "Airco réversible ou pompe à chaleur air-eau : quelle différence ?",
      paragraphs: [
        "Les deux sont des pompes à chaleur : elles puisent les calories de l'air extérieur. La différence tient à la façon dont elles restituent la chaleur dans votre logement.",
        "## L'airco réversible (pompe à chaleur air-air)",
        "Elle souffle de l'air chaud ou froid dans la pièce via une unité murale. Idéale pour rafraîchir des chambres ou un séjour en été et chauffer à la mi-saison, sans toucher à votre chauffage central. Voir [installation de climatisation](/climatisation/installation-climatisation).",
        "## La pompe à chaleur air-eau",
        "Elle chauffe l'eau de vos radiateurs ou de votre chauffage par le sol, et souvent votre eau chaude sanitaire : elle remplace la chaudière. Elle donne le meilleur d'elle-même avec des émetteurs basse température et un logement bien isolé. Voir [pompe à chaleur](/chauffage/pompe-a-chaleur).",
        "## Ce qui change en 2026",
        "Les primes RENOLUTION pour le remplacement de chaudière sont actuellement suspendues. Consultez les informations à jour sur [environnement.brussels](https://environnement.brussels) — nous vous aidons à y voir clair lors de la visite.",
      ],
    },
    faqTitle: "Questions fréquentes : climatisation et pompe à chaleur",
    faqs: [
      {
        id: 1,
        question: "Une climatisation peut-elle aussi chauffer ?",
        answer:
          "Oui, si elle est réversible — c'est le cas de la plupart des modèles actuels. En mode chauffage, elle fonctionne comme une pompe à chaleur air-air, efficace en complément de votre chauffage central, surtout à la mi-saison.",
      },
      {
        id: 2,
        question: "Faut-il une autorisation pour installer une unité extérieure à Bruxelles ?",
        answer:
          "Cela dépend de l'emplacement : une unité visible depuis la rue, placée en façade ou dans une copropriété peut nécessiter une autorisation (urbanisme, accord de l'assemblée générale). Nous vous aidons à identifier les démarches lors de la visite technique.",
      },
      {
        id: 3,
        question: "À quelle fréquence entretenir une climatisation ou une pompe à chaleur ?",
        answer:
          "Un entretien annuel est généralement recommandé par les fabricants : nettoyage des filtres et de l'échangeur, contrôle du circuit et des performances. Il maintient le rendement, limite les pannes et préserve la qualité de l'air. Voir notre [entretien](/climatisation/entretien-climatisation).",
      },
      {
        id: 4,
        question: "Ma clim ne refroidit plus : que faire ?",
        answer:
          "Vérifiez d'abord le mode, la consigne et la propreté des filtres. Si le problème persiste — ou si l'unité goutte, givre ou fait un bruit inhabituel — coupez l'appareil et faites appel à notre [dépannage](/climatisation/depannage-climatisation), disponible 7j/7.",
      },
      {
        id: 5,
        question: "Une pompe à chaleur peut-elle remplacer ma chaudière ?",
        answer:
          "Souvent, oui, à condition que le logement et les radiateurs s'y prêtent. Nous étudions votre isolation, vos émetteurs et vos besoins avant de vous conseiller une [pompe à chaleur](/chauffage/pompe-a-chaleur), une solution hybride ou une [chaudière à condensation](/chauffage/remplacement-chaudiere).",
      },
      {
        id: 6,
        question: "Le bruit d'une unité extérieure est-il gênant ?",
        answer:
          "Les appareils récents sont nettement plus silencieux qu'auparavant, mais l'emplacement compte : distance des fenêtres voisines, supports anti-vibrations, orientation. Nous en tenons compte dès l'étude de votre projet.",
      },
    ],
    cta: {
      intent: "installation",
      title: "Un projet d'airco ou de pompe à chaleur ? Votre devis, sans mauvaise surprise.",
      body: "Rafraîchir les chambres, remplacer une vieille chaudière, réduire la facture : nous étudions votre logement, dimensionnons l'appareil et vous remettons un devis détaillé sous 24h. Un seul interlocuteur, de la visite technique à la mise en service.",
    },
    draft: false,
  },

  // ---------------------------------------------------------------------------
  // PROFESSIONNELS (syndics, copropriétés, gestionnaires)
  // ---------------------------------------------------------------------------
  professionnels: {
    category: "professionnels",
    label: "Professionnels",
    metaTitle: "Services techniques pour syndics à Bruxelles",
    metaDescription:
      "Chauffage, électricité et plomberie des parties communes : Radialec accompagne syndics et copropriétés à Bruxelles. Dépannage 7j/7, devis gratuits.",
    hero: {
      eyebrow: "Syndics · Gestionnaires · Copropriétés",
      title: "Syndics et copropriétés : un partenaire technique à Bruxelles",
      highlight: "Bruxelles",
      intro:
        "Chaufferie collective, colonnes d'eau, parlophonie, éclairage des communs : un seul interlocuteur pour l'entretien et le dépannage de vos immeubles, avec des devis clairs à présenter en assemblée.",
      intent: "installation",
    },
    facts: [
      { icon: "handshake", stat: "Un interlocuteur", label: "Chauffage, électricité, plomberie" },
      { icon: "clock", stat: "Sous 24h", label: "Dépannage des parties communes" },
      { icon: "file", stat: "Devis gratuits", label: "Clairs et détaillés pour l'AG" },
      { icon: "calendarCheck", stat: "7j/7", label: "Urgences comprises" },
    ],
    servicesTitle: "Nos services pour les immeubles",
    servicesIntro:
      "Les interventions les plus demandées par les syndics et gestionnaires de biens bruxellois.",
    services: [
      "professionnels/syndics-coproprietes",
      "chauffage/entretien-chaudiere",
      "plomberie/debouchage",
      "electricite/installation-parlophonie",
    ],
    why: {
      title: "Pensé pour la gestion d'immeubles",
      items: [
        {
          icon: "userTie",
          title: "Un seul contact",
          text: "Un interlocuteur unique pour les principaux corps de métier techniques : moins d'appels, moins de coordination pour le syndic.",
        },
        {
          icon: "clipboard",
          title: "Des devis lisibles",
          text: "Des devis détaillés poste par poste, faciles à présenter au conseil de copropriété ou en assemblée générale.",
        },
        {
          icon: "stopwatch",
          title: "Réactivité",
          text: "Panne de chauffage collectif, fuite en colonne, parlophone muet : intervention sous 24h, 7j/7.",
        },
        {
          icon: "calendar",
          title: "Entretiens planifiés",
          text: "Nous planifions avec vous les entretiens périodiques des installations communes, pour ne plus rater une échéance.",
        },
      ],
    },
    guide: {
      eyebrow: "Le point de vue du technicien",
      title: "Parties communes : ce que le syndic doit anticiper",
      paragraphs: [
        "Dans une copropriété, les installations communes — chaufferie, colonnes d'eau, éclairage, parlophonie — relèvent de la gestion du syndic. Une panne touche tous les occupants en même temps ; un entretien oublié peut poser problème en cas de sinistre.",
        "## Le chauffage collectif",
        "Les chaudières collectives sont, elles aussi, soumises à un entretien périodique par un technicien agréé. Nos chauffagistes sont agréés en Région bruxelloise, en Flandre et en Wallonie : voir notre [entretien de chaudière](/chauffage/entretien-chaudiere).",
        "## Les canalisations et décharges",
        "Une décharge commune bouchée peut provoquer des refoulements dans plusieurs appartements. Nous intervenons rapidement pour le [débouchage](/plomberie/debouchage) et recherchons la cause pour éviter la récidive.",
        "## L'accès à l'immeuble",
        "Parlophone muet ou platine de rue abîmée : nous réparons ou remplaçons votre [parlophonie](/electricite/installation-parlophonie), en conservant ou non le câblage existant selon son état.",
      ],
    },
    faqTitle: "Questions fréquentes des syndics",
    faqs: [
      {
        id: 1,
        question: "Travaillez-vous avec des syndics professionnels et bénévoles ?",
        answer:
          "Oui : syndics professionnels, syndics bénévoles, gestionnaires de biens et propriétaires d'immeubles de rapport.",
      },
      {
        id: 2,
        question: "Pouvez-vous intervenir en urgence dans les parties communes ?",
        answer:
          "Oui, 7j/7, avec une intervention sous 24h : chauffage collectif en panne, fuite en colonne, décharge bouchée, éclairage des communs…",
      },
      {
        id: 3,
        question: "Comment nous transmettre une demande d'intervention ?",
        answer:
          "Par téléphone ou par e-mail, depuis notre page [Contact](/contact). Précisez l'adresse de l'immeuble, la nature du problème et la personne à contacter sur place : nous organisons l'accès avec vous.",
      },
      {
        id: 4,
        question: "Vos devis sont-ils adaptés aux assemblées générales ?",
        answer:
          "Nos devis sont gratuits, détaillés poste par poste et rédigés pour être compris par des non-techniciens : vous pouvez les présenter tels quels au conseil de copropriété.",
      },
      {
        id: 5,
        question: "Intervenez-vous aussi dans les appartements privatifs ?",
        answer:
          "Oui. Les copropriétaires peuvent nous contacter directement pour leur chauffage, leur électricité ou leur plomberie privative, aux mêmes [tarifs publics](/tarifs).",
      },
      {
        id: 6,
        question: "Dans quelles communes intervenez-vous ?",
        answer:
          "Dans les 19 communes de la Région bruxelloise et en périphérie (Brabant flamand et Brabant wallon). La liste complète figure dans notre zone d'intervention.",
      },
    ],
    cta: {
      intent: "installation",
      title: "Vous gérez un immeuble ? Parlons de vos installations.",
      body: "Chaufferie, colonnes, parlophonie, éclairage des communs : présentez-nous votre immeuble, nous vous remettons un devis clair et un interlocuteur unique pour la suite. Et pour les urgences, nous sommes là 7j/7.",
    },
    draft: false,
  },
};

export function getCategory(category: ServiceCategory): CategoryContent {
  return categories[category];
}

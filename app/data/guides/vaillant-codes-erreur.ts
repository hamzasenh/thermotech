import { prices } from "../pricing";
import { gasLeakAlert } from "../safety";
import type { Guide } from "./types";

// Guide « codes erreur Vaillant » (/chauffage/vaillant/codes-erreur).
// Sources : vaillant.be (Service & support, codes d'erreur) et notice
// d'installation et de maintenance ecoTEC plus, consultées le 12/10/2026.
// Les gestes conseillés au client reprennent les formulations déjà validées
// (fiche dépannage chaudière : pression « entre 1 et 2 bar à froid »,
// remplissage selon la notice, un seul réarmement). BROUILLON : chaque
// affirmation est à relire par le gestionnaire (prompts/refonte/08-guides.md).
export const vaillantCodesErreur: Guide = {
  slug: "codes-erreur",
  parent: "chauffage/vaillant",
  category: "chauffage",
  intent: "urgence",
  draft: true,
  metaTitle: "Codes erreur Vaillant (F.28, F.22, F.75…) : que faire ?",
  metaDescription:
    "F.20, F.22, F.27, F.28, F.29, F.75 : ce que signifie le code de votre chaudière Vaillant, ce que vous pouvez vérifier sans risque et quand appeler un chauffagiste à Bruxelles.",
  breadcrumb: "Codes d'erreur",
  eyebrow: "Guide · Chaudière Vaillant",
  title: "Codes erreur Vaillant : que faire ?",
  intro:
    "Un « F. » suivi de deux chiffres sur l'écran : votre chaudière Vaillant s'est mise en sécurité. Pas de panique. Voici ce que veulent dire les codes les plus fréquents, ce que vous pouvez vérifier vous-même sans risque, et quand il vaut mieux nous appeler.",
  updated: "2026-10-12",
  topic: "un code d'erreur sur ma chaudière Vaillant",
  photoLabel: "Envoyer une photo de l'écran",
  indexTitle: "Votre code",
  safety: gasLeakAlert,
  reflexes: {
    title: "Trois réflexes, quel que soit le code",
    items: [
      {
        title: "Notez le code, prenez une photo",
        text: "Le code exact et la plaque signalétique de la chaudière (modèle, numéro de série) nous font gagner un temps précieux. Vous pouvez nous les envoyer sur WhatsApp.",
      },
      {
        title: "Réarmez une seule fois",
        text: "Pour la plupart des codes, une pression sur la touche de réarmement (reset) peut suffire. Si le code revient, n'insistez pas : la chaudière vous signale un vrai défaut.",
      },
      {
        title: "Regardez la pression",
        text: "Sur le manomètre, l'aiguille se situe en général entre 1 et 2 bar à froid. En dessous, la chaudière manque d'eau.",
      },
    ],
  },
  sections: [
    {
      id: "f20",
      code: "F.20",
      label: "Surchauffe",
      status: "check",
      title: "Surchauffe : la sécurité a coupé le gaz",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "L'eau de la chaudière a dépassé la température maximale. Le limiteur de sécurité a coupé l'arrivée de gaz au brûleur : c'est une protection.",
            "Le plus souvent, l'eau circule mal dans l'installation : manque d'eau, air dans les radiateurs, pompe ou vanne trois voies bloquée. Plus rarement, une sonde de température est en cause.",
          ],
        },
        {
          type: "checks",
          items: [
            "Laissez la chaudière refroidir quelques minutes.",
            "Regardez la pression : entre 1 et 2 bar à froid. En dessous, voyez le code [F.22](#f22).",
            "Des radiateurs froids en haut et chauds en bas contiennent de l'air : une purge peut aider.",
            "Réarmez une fois.",
          ],
        },
        {
          type: "callIf",
          items: [
            "F.20 revient après le réarmement, même avec une pression correcte.",
            "La chaudière se met en sécurité plusieurs fois dans la même journée.",
          ],
        },
        {
          type: "note",
          text: "Pompe, vanne trois voies, sonde de température : ces pièces se contrôlent chaudière ouverte, par un technicien.",
        },
      ],
      help: "F.20 revient après refroidissement ?",
      topic: "le code F.20 sur ma chaudière Vaillant",
    },
    {
      id: "f22",
      code: "F.22",
      label: "Manque d'eau",
      status: "check",
      title: "Manque d'eau dans la chaudière",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "La chaudière ne détecte pas assez d'eau dans son circuit : la pression est trop basse. Elle se met en sécurité pour ne pas chauffer à vide.",
            "Une pression qui baisse un peu après la purge des radiateurs, c'est normal. Si elle redescend souvent, il y a une cause : une fuite, ou un vase d'expansion qui ne joue plus son rôle.",
          ],
        },
        {
          type: "image",
          image: { asset: "P65", alt: "Manomètre d'une chaudière, l'aiguille entre 1 et 2 bar" },
          caption: "Le manomètre : chaudière froide, l'aiguille se situe en général entre 1 et 2 bar.",
        },
        {
          type: "checks",
          items: [
            "Lisez la pression sur le manomètre, chaudière froide.",
            "En dessous de 1 bar, un simple remplissage peut suffire : suivez la notice de votre chaudière, puis réarmez.",
            "Regardez sous la chaudière et aux raccords des radiateurs : une trace d'eau signale une fuite.",
          ],
        },
        {
          type: "callIf",
          items: [
            "Vous ne savez pas comment remettre de l'eau dans l'installation.",
            "La pression redescend en quelques jours après un remplissage.",
            "F.22 s'affiche alors que la pression est correcte : le capteur de pression peut être en cause.",
          ],
        },
      ],
      help: "La pression ne tient pas ?",
      topic: "le code F.22 sur ma chaudière Vaillant",
    },
    {
      id: "f27",
      code: "F.27",
      label: "Flamme parasite",
      status: "pro",
      title: "Une flamme détectée alors que le brûleur est éteint",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "La chaudière « voit » une flamme alors qu'elle n'a rien demandé. Par sécurité, elle s'arrête complètement.",
            "Ce défaut vient de l'intérieur de l'appareil : électronique, contrôle de flamme ou vanne gaz. Ce n'est pas un réglage que vous pouvez faire vous-même.",
          ],
        },
        {
          type: "callIf",
          title: "Ce qu'il faut faire",
          items: [
            "Laissez la chaudière à l'arrêt, sans la réarmer en boucle.",
            "Notez le code et appelez-nous : il faut un technicien, chaudière ouverte.",
            "Si vous sentez une odeur de gaz, suivez d'abord les [consignes de sécurité](#securite).",
          ],
        },
      ],
      help: "F.27 à l'écran ?",
      topic: "le code F.27 sur ma chaudière Vaillant",
    },
    {
      id: "f28",
      code: "F.28",
      label: "Pas d'allumage",
      status: "check",
      title: "La chaudière n'arrive pas à s'allumer",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Au démarrage, la chaudière a essayé plusieurs fois d'allumer son brûleur, sans succès. Soit le gaz n'arrive pas, soit l'allumage ne se fait pas.",
            "Les causes vont du simple robinet fermé à une électrode d'allumage usée, un brûleur encrassé ou une évacuation des condensats bouchée.",
          ],
        },
        {
          type: "image",
          image: { asset: "P64", alt: "Écran d'une chaudière Vaillant affichant un code d'erreur" },
          caption: "Notez le code exact et prenez l'écran en photo : c'est la première chose que le technicien vous demandera.",
        },
        {
          type: "checks",
          items: [
            "Vérifiez que le robinet de gaz de la chaudière est ouvert.",
            "Testez un autre appareil au gaz, la cuisinière par exemple. S'il ne fonctionne pas non plus, le problème vient de l'arrivée de gaz, pas de la chaudière.",
            "Réarmez une fois.",
          ],
        },
        {
          type: "callIf",
          items: [
            "F.28 revient après le réarmement alors que le gaz arrive bien.",
            "Le code revient régulièrement, même si la chaudière repart après un réarmement.",
          ],
        },
      ],
      help: "F.28 revient après un réarmement ?",
      topic: "le code F.28 sur ma chaudière Vaillant",
    },
    {
      id: "f29",
      code: "F.29",
      label: "Flamme perdue",
      status: "check",
      title: "La flamme s'est éteinte en cours de fonctionnement",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "La chaudière s'était bien allumée, puis la flamme s'est éteinte et n'a pas pu repartir.",
            "Une coupure de gaz momentanée peut suffire à le provoquer. Si le code revient, la cause est ailleurs : évacuation des condensats bouchée, évacuation des fumées ou allumage.",
          ],
        },
        {
          type: "checks",
          items: ["Vérifiez que vos autres appareils au gaz fonctionnent.", "Réarmez une fois."],
        },
        {
          type: "callIf",
          items: [
            "F.29 revient après le réarmement.",
            "La chaudière s'arrête régulièrement en pleine chauffe.",
            "Vous sentez une odeur de gaz : suivez d'abord les [consignes de sécurité](#securite).",
          ],
        },
      ],
      help: "F.29 à répétition ?",
      topic: "le code F.29 sur ma chaudière Vaillant",
    },
    {
      id: "f75",
      code: "F.75",
      label: "Pression pompe",
      status: "check",
      title: "La pompe ne fait pas monter la pression",
      blocks: [
        {
          type: "text",
          paragraphs: [
            "Quand la pompe démarre, la chaudière s'attend à voir la pression monter légèrement. Elle ne mesure rien, alors elle se met en sécurité.",
            "Première piste : l'installation manque d'eau ou contient de l'air. Sinon, la pompe, le capteur de pression ou le vase d'expansion sont à contrôler.",
          ],
        },
        {
          type: "checks",
          items: [
            "Lisez la pression, chaudière froide : en dessous de 1 bar, remettez de l'eau en suivant la notice, comme pour le code [F.22](#f22).",
            "Réarmez une fois.",
          ],
        },
        {
          type: "callIf",
          items: [
            "La pression est correcte mais F.75 revient : la pompe ou le capteur de pression doivent être contrôlés.",
            "Vous devez remettre de l'eau souvent.",
          ],
        },
      ],
      help: "F.75 malgré une bonne pression ?",
      topic: "le code F.75 sur ma chaudière Vaillant",
    },
  ],
  sources: [
    "Vaillant Belgique, « Service & support : codes d'erreur » (vaillant.be), consulté le 12 octobre 2026.",
    "Vaillant ecoTEC plus, notice d'installation et de maintenance : tableau des codes de défaut.",
  ],
  disclaimer:
    "Ces explications valent pour la plupart des chaudières Vaillant récentes ; un code peut avoir un sens différent selon le modèle. Elles ne remplacent ni la notice de votre appareil, ni l'avis d'un technicien.",
  faqs: [
    {
      id: 1,
      question: "Combien de fois puis-je réarmer ma chaudière Vaillant ?",
      answer:
        "Une fois. Si le même code revient, la chaudière signale un vrai défaut : la réarmer en boucle ne le répare pas. Pour le code F.27, ne la réarmez pas du tout : laissez-la à l'arrêt et [appelez-nous](/contact).",
    },
    {
      id: 2,
      question: "Mon code n'est pas dans cette liste. Que faire ?",
      answer:
        "Vaillant utilise de nombreux codes, qui varient selon les modèles. Envoyez-nous une photo de l'écran et de la plaque signalétique sur WhatsApp, ou appelez-nous : nous vous disons s'il faut intervenir.",
    },
    {
      id: 3,
      question: "Combien coûte un dépannage de chaudière Vaillant ?",
      answer: `**${prices.depannage.amount} € TVAC**, déplacement, diagnostic et première heure compris, quelle que soit la marque. Au-delà, **${prices.heureSupplementaire.amount} € TVAC** de l'heure. Si une pièce doit être remplacée, nous vous communiquons son prix avant la réparation.`,
    },
    {
      id: 4,
      question: "Intervenez-vous le week-end ?",
      answer:
        "Oui, 7j/7, avec une intervention sous 24h à Bruxelles et dans ses environs. Un supplément s'applique le week-end et les jours fériés : [voir nos tarifs](/tarifs).",
    },
    {
      id: 5,
      question: "Êtes-vous un service agréé Vaillant ?",
      answer:
        "Non : Radialec est un chauffagiste indépendant, pas le service après-vente de Vaillant. Nos techniciens sont agréés et interviennent sur les chaudières Vaillant comme sur les autres marques que nous installons.",
    },
  ],
  related: ["chauffage/depannage-chaudiere", "chauffage/entretien-chaudiere", "chauffage/vaillant"],
  cta: {
    body: "Un code qui revient, une chaudière qui ne repart pas : décrivez-nous la panne ou envoyez une photo de l'écran. Nous intervenons 7j/7 à Bruxelles et dans ses environs, sous 24h, et vous annonçons le prix avant toute réparation.",
  },
};

// Assets de la refonte (même numérotation que prompts/refonte/02-assets.md).
// Tant qu'un asset manque, le site affiche à sa place un emplacement réservé
// qui reprend ces informations (app/sections/v2/media.tsx). Livrer = déposer
// le fichier dans assets/refonte/ puis l'ajouter à app/data/photos.ts : toutes
// les images des données qui portent son identifiant l'affichent aussitôt.

export interface NeededAsset {
  /** Nom du fichier attendu dans assets/refonte/. */
  file: string;
  /** Ce qu'on doit voir sur la photo / vidéo. */
  subject: string;
  format: string;
}

export const neededAssets = {
  // Priorité 1 — chaudière
  P01: { file: "etape-3-installation.png", subject: "Gros plan : les mains serrent un raccord en laiton sur les tuyaux en cuivre sous une chaudière. Pas de visage.", format: "Portrait" },
  P02: { file: "hero-remplacement-chaudiere.png", subject: "Technicien de dos ou de trois-quarts face à une chaudière murale neuve, main sur l'appareil ou en train de refermer le capot.", format: "Portrait" },
  P03: { file: "etape-4-suivi.png", subject: "Gros plan sur l'écran ou le manomètre d'une chaudière en marche, aiguille dans le vert.", format: "Portrait" },
  P04: { file: "etape-2-planification.png", subject: "Caisse à outils ouverte au pied d'une chaudière, sur la bâche de protection.", format: "Portrait" },
  P05: { file: "chaudiere-neuve.png", subject: "Chaudière neuve installée, propre, raccords visibles, en plan large.", format: "Portrait + paysage" },
  P06: { file: "entretien-chaudiere.png", subject: "Chaudière capot ouvert : les mains nettoient le brûleur ou l'échangeur.", format: "Portrait + paysage" },
  P07: { file: "entretien-mesure.png", subject: "Appareil de mesure (analyse de combustion) branché sur la chaudière, écran lisible.", format: "Portrait" },
  P08: { file: "entretien-attestation.png", subject: "L'attestation d'entretien remplie, posée sur la chaudière, sans données client lisibles.", format: "Portrait" },
  P09: { file: "depannage-chaudiere.png", subject: "Chaudière capot ouvert, diagnostic : multimètre ou lampe frontale, mains au travail.", format: "Portrait + paysage" },
  P10: { file: "depannage-piece.png", subject: "Une pièce remplacée tenue en main (pompe, vanne, carte), chaudière floue derrière.", format: "Portrait" },
  P11: { file: "ancienne-chaudiere.png", subject: "Vieille chaudière au sol dans une cave bruxelloise, avant remplacement.", format: "Paysage" },
  // Priorité 2 — reste du chauffage
  P12: { file: "pac-unite-exterieure.png", subject: "Unité extérieure de pompe à chaleur installée (jardin, façade arrière ou toit plat).", format: "Portrait + paysage" },
  P13: { file: "pac-unite-interieure.png", subject: "Module intérieur ou ballon de la pompe à chaleur, raccords propres.", format: "Portrait" },
  P14: { file: "radiateur-neuf.png", subject: "Radiateur neuf posé sous une fenêtre bruxelloise.", format: "Portrait + paysage" },
  P15: { file: "radiateur-purge.png", subject: "Gros plan : mains qui purgent ou règlent une vanne thermostatique.", format: "Portrait" },
  P16: { file: "desembouage-eau.png", subject: "L'eau boueuse du circuit dans un récipient transparent, à côté de la machine de désembouage.", format: "Portrait" },
  P17: { file: "boiler-anode.png", subject: "Anode entartrée tenue en main, ou groupe de sécurité d'un boiler.", format: "Portrait" },
  P19: { file: "boiler-resistance.png", subject: "Résistance de boiler entartrée tenue à côté d'une résistance neuve.", format: "Portrait" },
  P18: { file: "ramonage.png", subject: "Hérisson ou brosse dans un conduit, ou mains qui ramonent.", format: "Portrait" },
  // Priorité 3 — électricité, plomberie, climatisation, professionnels
  P20: { file: "tableau-ouvert.png", subject: "Tableau électrique ouvert, mains avec un tournevis isolé.", format: "Portrait + paysage" },
  P21: { file: "tableau-neuf.png", subject: "Tableau électrique neuf, rangé, différentiels étiquetés.", format: "Portrait" },
  P22: { file: "testeur-prise.png", subject: "Testeur ou multimètre sur une prise.", format: "Portrait" },
  P23: { file: "borne-recharge.png", subject: "Borne de recharge murale installée (garage, parking), câble branché.", format: "Portrait + paysage" },
  P24: { file: "platine-rue.png", subject: "Platine de parlophone ou de vidéophone sur une façade bruxelloise.", format: "Portrait" },
  P25: { file: "schema-unifilaire.png", subject: "Schéma unifilaire (papier ou tablette) posé près d'un tableau.", format: "Paysage" },
  P26: { file: "tableau-armoire.png", subject: "Tableau électrique neuf dans son armoire, porte ouverte.", format: "Portrait" },
  P27: { file: "videophone-ecran.png", subject: "Écran de vidéophone intérieur fixé au mur, image d'un visiteur à l'écran (visage non reconnaissable).", format: "Portrait" },
  P30: { file: "plomberie-siphon.png", subject: "Mains qui réparent un siphon ou un raccord sous un évier.", format: "Portrait + paysage" },
  P31: { file: "debouchage-furet.png", subject: "Furet ou déboucheur en action, cadrage propre.", format: "Portrait" },
  P32: { file: "robinet-calcaire.png", subject: "Gros plan d'un pommeau ou d'un mousseur entartré.", format: "Portrait" },
  P33: { file: "boiler-vidange.png", subject: "Boiler électrique en cours de vidange, résistance entartrée posée au sol.", format: "Paysage" },
  P40: { file: "airco-murale.png", subject: "Unité intérieure d'airco murale installée.", format: "Portrait + paysage" },
  P41: { file: "airco-filtre.png", subject: "Mains qui retirent ou nettoient le filtre d'une airco.", format: "Portrait" },
  P42: { file: "manometres-clim.png", subject: "Manomètres frigorifiques branchés sur une unité extérieure.", format: "Portrait" },
  P43: { file: "airco-installation.png", subject: "Technicien qui met de niveau une unité intérieure d'airco murale.", format: "Paysage" },
  P44: { file: "airco-nettoyage.png", subject: "Mains gantées qui pulvérisent un désinfectant sur l'échangeur d'une airco ouverte.", format: "Paysage" },
  P50: { file: "immeuble-facade.png", subject: "Façade d'immeuble à appartements bruxellois, sans personne ni plaque.", format: "Portrait + paysage" },
  P51: { file: "chaufferie-collective.png", subject: "Chaufferie collective d'immeuble.", format: "Paysage" },
  P52: { file: "parlophone-immeuble.png", subject: "Platine de parlophone d'immeuble, noms illisibles ou masqués.", format: "Portrait" },
  // Sans priorité
  P60: { file: "rue-bruxelles.png", subject: "Rue bruxelloise typique (façades), sans personne ni plaque lisible.", format: "Paysage" },
  P61: { file: "devis-tablette.png", subject: "Mains qui notent sur une tablette ou un bloc devant une installation.", format: "Portrait" },
  // P62 abandonnée le 08/10/2026 (pas de photo d'équipe sur le site).
  P62: { file: "equipe.png", subject: "Portrait d'équipe, le jour où les tenues Radialec existent.", format: "Paysage" },
  P63: { file: "camionnette.png", subject: "La camionnette, si elle est floquée Radialec.", format: "Paysage" },
  // Vidéos courtes (facultatives)
  V01: { file: "video-ecran-chaudiere.mp4", subject: "L'écran d'une chaudière qui s'allume, ou la flamme par le hublot. 6 à 10 s, téléphone posé, sans son.", format: "Vertical" },
  V02: { file: "video-raccord.mp4", subject: "Mains qui serrent un raccord. 6 à 10 s, téléphone posé, sans son.", format: "Vertical" },
} satisfies Record<string, NeededAsset>;

export type AssetId = keyof typeof neededAssets;

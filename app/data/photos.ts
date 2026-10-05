import type { StaticImageData } from "next/image";
import type { AssetId } from "./assets-needed";
import aircoFiltre from "@/assets/refonte/airco-filtre.png";
import aircoInstallation from "@/assets/refonte/airco-installation.png";
import aircoMurale from "@/assets/refonte/airco-murale.png";
import aircoNettoyage from "@/assets/refonte/airco-nettoyage.png";
import boilerAnode from "@/assets/refonte/boiler-anode.png";
import boilerResistance from "@/assets/refonte/boiler-resistance.png";
import boilerVidange from "@/assets/refonte/boiler-vidange.png";
import borneRecharge from "@/assets/refonte/borne-recharge.png";
import chaudiereNeuve from "@/assets/refonte/chaudiere-neuve.png";
import debouchageFuret from "@/assets/refonte/debouchage-furet.png";
import depannageChaudiere from "@/assets/refonte/depannage-chaudiere.png";
import desembouageEau from "@/assets/refonte/desembouage-eau.png";
import entretienAttestation from "@/assets/refonte/entretien-attestation.png";
import entretienChaudiere from "@/assets/refonte/entretien-chaudiere.png";
import entretienMesure from "@/assets/refonte/entretien-mesure.png";
import etape2Planification from "@/assets/refonte/etape-2-planification.png";
import etape3Installation from "@/assets/refonte/etape-3-installation.png";
import etape4Suivi from "@/assets/refonte/etape-4-suivi.png";
import heroRemplacementChaudiere from "@/assets/refonte/hero-remplacement-chaudiere.png";
import manometresClim from "@/assets/refonte/manometres-clim.png";
import pacUniteExterieure from "@/assets/refonte/pac-unite-exterieure.png";
import pacUniteInterieure from "@/assets/refonte/pac-unite-interieure.png";
import platineRue from "@/assets/refonte/platine-rue.png";
import plomberieSiphon from "@/assets/refonte/plomberie-siphon.png";
import radiateurNeuf from "@/assets/refonte/radiateur-neuf.png";
import robinetCalcaire from "@/assets/refonte/robinet-calcaire.png";
import schemaUnifilaire from "@/assets/refonte/schema-unifilaire.png";
import tableauArmoire from "@/assets/refonte/tableau-armoire.png";
import tableauNeuf from "@/assets/refonte/tableau-neuf.png";
import tableauOuvert from "@/assets/refonte/tableau-ouvert.png";
import videophoneEcran from "@/assets/refonte/videophone-ecran.png";

export interface Photo {
  src: StaticImageData;
  /** Point de cadrage (CSS object-position) quand la photo est recadrée. Centre par défaut. */
  position?: string;
}

/**
 * Photos livrées (assets/refonte/), par identifiant de assets-needed.ts.
 * Une image des données qui porte `asset: "Pxx"` affiche automatiquement la
 * photo dès qu'elle est listée ici ; sinon l'emplacement réservé reste visible.
 */
export const photos: Partial<Record<AssetId, Photo>> = {
  P01: { src: etape3Installation },
  P02: { src: heroRemplacementChaudiere, position: "60% 50%" },
  P03: { src: etape4Suivi },
  P04: { src: etape2Planification },
  P05: { src: chaudiereNeuve },
  P06: { src: entretienChaudiere },
  P07: { src: entretienMesure },
  P08: { src: entretienAttestation },
  P09: { src: depannageChaudiere },
  P12: { src: pacUniteExterieure },
  P13: { src: pacUniteInterieure, position: "38% 50%" },
  P14: { src: radiateurNeuf },
  P16: { src: desembouageEau },
  P17: { src: boilerAnode },
  P19: { src: boilerResistance },
  P20: { src: tableauOuvert },
  P21: { src: tableauNeuf },
  P23: { src: borneRecharge, position: "45% 50%" },
  P24: { src: platineRue, position: "60% 50%" },
  P25: { src: schemaUnifilaire },
  P26: { src: tableauArmoire },
  P27: { src: videophoneEcran, position: "68% 50%" },
  P30: { src: plomberieSiphon },
  P31: { src: debouchageFuret },
  P32: { src: robinetCalcaire },
  P33: { src: boilerVidange },
  P40: { src: aircoMurale },
  P41: { src: aircoFiltre },
  P42: { src: manometresClim },
  P43: { src: aircoInstallation, position: "38% 50%" },
  P44: { src: aircoNettoyage },
};

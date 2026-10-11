// Textes communs à l'écran de confirmation (client) et à l'e-mail de
// confirmation envoyé au client (serveur) : un seul endroit pour les promesses
// de rappel. Aucune dépendance serveur.

import { company } from "@/app/data/company";
import type { CallbackRequest } from "./callback";
import type { QuoteRequest } from "./schema";

const callbackPromise = company.promises.callback ?? "rapidement";

const slotPhrase: Record<string, string> = {
  matin: "le matin",
  "apres-midi": "l'après-midi",
  soir: "en soirée",
};

/** « Nous vous rappelons sous 2 h, entre 10h et 21h » ou le créneau choisi par le client. */
export function quoteContactPromise(quote: Pick<QuoteRequest, "contactPreference" | "callbackSlot">): string {
  if (quote.contactPreference === "email") return `Nous vous répondons par e-mail ${callbackPromise}`;
  const slot = slotPhrase[quote.callbackSlot];
  return slot ? `Nous vous rappelons ${slot}, comme vous l'avez demandé` : `Nous vous rappelons ${callbackPromise}`;
}

/** Les trois étapes après une demande de devis. */
export function quoteNextSteps(quote: Pick<QuoteRequest, "contactPreference" | "callbackSlot">) {
  return [
    {
      title: quoteContactPromise(quote),
      text: "Un technicien relit votre demande et vous contacte pour préciser ce qui doit l'être.",
    },
    {
      title: "Visite technique si nécessaire",
      text: "Pour certains projets, un passage sur place permet de chiffrer au plus juste.",
    },
    {
      title: company.promises.quote,
      text: "Un devis détaillé et sans engagement : vous décidez ensuite, sans pression.",
    },
  ];
}

/** « sous 2 h, entre 10h et 21h » si le client veut être rappelé dès que possible, sinon le créneau choisi. */
export function callbackWhen(callback: Pick<CallbackRequest, "time">): string {
  const slot = slotPhrase[callback.time];
  return slot ? `${slot}, comme vous l'avez demandé` : callbackPromise;
}

/** Ligne d'urgence des confirmations : « Une urgence ? Appelez-nous 24h/24 au … ». */
export const emergencyLine = `Une urgence ? Appelez-nous ${company.promises.emergency} au ${company.phone.display}.`;

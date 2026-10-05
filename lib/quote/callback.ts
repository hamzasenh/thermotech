// « Être rappelé » : schéma et validation partagés entre le formulaire
// (client) et /api/rappel (serveur). Aucune dépendance serveur.

import { isValidPhone, LIMITS } from "./schema";

export const callbackTopics = {
  chauffage: "Chauffage",
  electricite: "Électricité",
  plomberie: "Plomberie",
  climatisation: "Clim & PAC",
  autre: "Autre",
} as const;

export const callbackTimes = {
  asap: "Dès que possible",
  matin: "Le matin",
  "apres-midi": "L'après-midi",
  soir: "En soirée",
} as const;

const has = (map: object, key: string) => Object.prototype.hasOwnProperty.call(map, key);

export type CallbackTopic = keyof typeof callbackTopics;
export type CallbackTime = keyof typeof callbackTimes;

export interface CallbackRequest {
  name: string;
  phone: string;
  time: CallbackTime;
  topic: CallbackTopic | "";
  /** Facultatif : la question ou le besoin, en quelques mots. */
  message: string;
  /** Page d'origine (« categorie/slug » ou « categorie »), renseignée automatiquement. */
  service: string;
  /** « rendez-vous » : demande envoyée depuis /rendez-vous (créneau à fixer par téléphone). */
  purpose: "" | "rendez-vous";
}

export const emptyCallback: CallbackRequest = {
  name: "",
  phone: "",
  time: "asap",
  topic: "",
  message: "",
  service: "",
  purpose: "",
};

export type CallbackField = keyof CallbackRequest;
export type CallbackErrors = Partial<Record<CallbackField, string>>;

/** Sujet déduit de la page d'origine (« chauffage/entretien-chaudiere » → chauffage). */
export function topicFromContext(context: string | null | undefined): CallbackTopic | "" {
  const category = context?.split("/")[0];
  return category && has(callbackTopics, category) ? (category as CallbackTopic) : "";
}

export function validateCallback(data: CallbackRequest): CallbackErrors {
  const errors: CallbackErrors = {};
  if (data.name.trim().length < 2 || data.name.length > LIMITS.name) errors.name = "Indiquez votre nom.";
  if (!isValidPhone(data.phone)) errors.phone = "Numéro invalide (ex. 0486 12 34 56).";
  if (!has(callbackTimes, data.time)) errors.time = "Choisissez un moment.";
  if (data.topic && !has(callbackTopics, data.topic)) errors.topic = "Sujet invalide.";
  if (data.purpose && data.purpose !== "rendez-vous") errors.purpose = "Motif invalide.";
  if (data.message.length > LIMITS.description) errors.message = `${LIMITS.description} caractères maximum.`;
  return errors;
}

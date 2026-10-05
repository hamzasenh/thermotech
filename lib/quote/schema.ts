// Demande de devis : types, libellés et validation — partagés entre le
// formulaire (client) et la route /api/devis (serveur). Aucune dépendance
// serveur ici : ce fichier part dans le bundle navigateur.

export const requestTypes = {
  installation: "Installation / remplacement",
  entretien: "Entretien",
  reparation: "Réparation / panne",
  autre: "Autre / je ne sais pas",
} as const;

export const timings = {
  asap: "Dès que possible",
  month: "Dans le mois",
  quarter: "Dans les 3 mois",
  info: "Je me renseigne",
} as const;

export const properties = {
  maison: "Maison",
  appartement: "Appartement",
  professionnel: "Commerce / bureau",
  copropriete: "Copropriété (parties communes)",
} as const;

export const contactPreferences = {
  telephone: "Par téléphone",
  email: "Par e-mail",
} as const;

export const callbackSlots = {
  matin: "Matin",
  "apres-midi": "Après-midi",
  soir: "En soirée",
  indifferent: "Peu importe",
} as const;

/** Chauffage actuel : premier choix du « devis express » des pages refondues (?actuel=). */
export const currentHeating = {
  gaz: "Gaz",
  mazout: "Mazout",
  electrique: "Électrique",
  inconnu: "Je ne sais pas",
} as const;

export type CurrentHeating = keyof typeof currentHeating;

export type RequestType = keyof typeof requestTypes;
export type Timing = keyof typeof timings;
export type Property = keyof typeof properties;
export type ContactPreference = keyof typeof contactPreferences;
export type CallbackSlot = keyof typeof callbackSlots;

export const OTHER_SERVICE = "autre";

export const PHOTO_LIMITS = {
  maxCount: 3,
  /** Par photo, après compression côté navigateur. */
  maxBytes: 1.5 * 1024 * 1024,
  accept: "image/jpeg,image/png,image/webp,image/heic,image/heif",
};

export interface QuoteRequest {
  category: string;
  /** Référence « categorie/slug » ou OTHER_SERVICE. */
  service: string;
  requestType: RequestType | "";
  timing: Timing | "";
  property: Property | "";
  description: string;
  name: string;
  phone: string;
  email: string;
  postalCode: string;
  commune: string;
  address: string;
  contactPreference: ContactPreference;
  callbackSlot: CallbackSlot;
}

export const emptyQuote: QuoteRequest = {
  category: "",
  service: "",
  requestType: "",
  timing: "",
  property: "",
  description: "",
  name: "",
  phone: "",
  email: "",
  postalCode: "",
  commune: "",
  address: "",
  contactPreference: "telephone",
  callbackSlot: "indifferent",
};

export type QuoteField = keyof QuoteRequest;
export type QuoteErrors = Partial<Record<QuoteField, string>>;

/** Champs validés à chaque étape du formulaire. */
export const stepFields: QuoteField[][] = [
  ["category", "service"],
  ["requestType", "timing", "property", "description"],
  ["name", "phone", "email", "postalCode", "commune", "address", "contactPreference", "callbackSlot"],
];

export const LIMITS = { description: 2000, name: 80, address: 160, commune: 60 };

const isOneOf = <T extends Record<string, string>>(map: T, value: string): value is Extract<keyof T, string> =>
  Object.prototype.hasOwnProperty.call(map, value);

/** Numéro belge ou international plausible : 9 à 15 chiffres, « + » initial toléré. */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[\s./()-]/g, "");
  return /^\+?\d{9,15}$/.test(digits);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/**
 * Valide les champs demandés (toutes les étapes par défaut). `knownServices`
 * = références de services existantes, vérifiées côté serveur.
 */
export function validateQuote(
  data: QuoteRequest,
  fields: QuoteField[] = stepFields.flat(),
  knownServices?: Set<string>
): QuoteErrors {
  const errors: QuoteErrors = {};
  const need = new Set(fields);
  const text = (value: string) => value.trim();

  if (need.has("category") && !text(data.category)) errors.category = "Choisissez le domaine concerné.";
  if (need.has("service")) {
    if (!text(data.service)) errors.service = "Choisissez la prestation (ou « Autre »).";
    else if (knownServices && data.service !== OTHER_SERVICE && !knownServices.has(data.service))
      errors.service = "Prestation inconnue.";
  }
  if (need.has("requestType") && !isOneOf(requestTypes, data.requestType))
    errors.requestType = "Précisez la nature de votre demande.";
  if (need.has("timing") && !isOneOf(timings, data.timing)) errors.timing = "Indiquez le délai souhaité.";
  if (need.has("property") && !isOneOf(properties, data.property)) errors.property = "Indiquez le type de bien.";
  if (need.has("description")) {
    if (text(data.description).length < 10)
      errors.description = "Décrivez votre besoin en quelques mots (10 caractères minimum).";
    else if (data.description.length > LIMITS.description)
      errors.description = `${LIMITS.description} caractères maximum.`;
  }
  if (need.has("name") && (text(data.name).length < 2 || data.name.length > LIMITS.name))
    errors.name = "Indiquez votre nom.";
  if (need.has("phone") && !isValidPhone(data.phone))
    errors.phone = "Numéro invalide (ex. 0486 12 34 56).";
  if (need.has("email") && !isValidEmail(data.email)) errors.email = "Adresse e-mail invalide.";
  if (need.has("postalCode") && !/^\d{4}$/.test(text(data.postalCode)))
    errors.postalCode = "Code postal à 4 chiffres.";
  if (need.has("commune") && (text(data.commune).length < 2 || data.commune.length > LIMITS.commune))
    errors.commune = "Indiquez votre commune.";
  if (need.has("address") && data.address.length > LIMITS.address) errors.address = "Adresse trop longue.";
  if (need.has("contactPreference") && !isOneOf(contactPreferences, data.contactPreference))
    errors.contactPreference = "Choix invalide.";
  if (need.has("callbackSlot") && !isOneOf(callbackSlots, data.callbackSlot))
    errors.callbackSlot = "Choix invalide.";

  return errors;
}

/** Contexte d'acquisition joint à la demande (page d'origine, campagne…). */
export interface QuoteAttribution {
  landing?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
}

/** Relit le JSON d'attribution envoyé par le formulaire (clés connues, valeurs tronquées). */
export function parseAttribution(raw: unknown): QuoteAttribution {
  if (typeof raw !== "string") return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.fromEntries(
      ATTRIBUTION_KEYS.filter((key) => typeof parsed[key] === "string" && parsed[key]).map((key) => [
        key,
        String(parsed[key]).slice(0, 200),
      ])
    );
  } catch {
    return {};
  }
}

export const ATTRIBUTION_KEYS: (keyof QuoteAttribution)[] = [
  "landing",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
];

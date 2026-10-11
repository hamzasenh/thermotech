// Alerte instantanée sur Telegram à chaque demande (devis, rappel), en plus de
// l'e-mail : celui qui rappelle le premier gagne le client. Serveur uniquement.
//
// Variables d'environnement (.env.local en local, réglages de l'hébergeur en production) :
//   TELEGRAM_BOT_TOKEN  jeton donné par @BotFather (secret)
//   TELEGRAM_CHAT_ID    destinataire(s), séparés par des virgules : la conversation
//                       privée de chaque personne qui a « démarré » le bot, ou un groupe
//                       où le bot a été ajouté. `npm run telegram -- ids` les affiche.
//
// Sans ces variables, rien n'est envoyé (l'e-mail reste le canal de référence).
// Une alerte qui échoue ne fait jamais échouer la demande : elle est seulement journalisée.

import { attributionChannel, label, type QuoteEmailInput } from "./email";
import { callbackSlots, contactPreferences, properties, requestTypes, timings, type QuoteAttribution } from "./schema";

export interface TelegramAlert {
  /** Message au format HTML de Telegram (b, i, a, code). Utiliser `escapeTelegram` pour le texte du client. */
  html: string;
  /** Téléphone du client : bouton « WhatsApp » sous le message. */
  phone?: string;
  /** Photos jointes à la demande, envoyées juste après le message. */
  photos?: { filename: string; content: Buffer; contentType: string }[];
  reference: string;
}

const API = "https://api.telegram.org";
const MAX_LENGTH = 4096;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function telegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

export function escapeTelegram(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** « 0486 12 34 56 » → « 32486123456 » (format wa.me), ou undefined si le numéro est inexploitable. */
export function internationalDigits(phone: string): string | undefined {
  const digits = phone.trim().replace(/^\+/, "00").replace(/\D/g, "");
  const international = digits.startsWith("00") ? digits.slice(2) : digits.startsWith("0") ? `32${digits.slice(1)}` : digits;
  return /^\d{9,15}$/.test(international) ? international : undefined;
}

/** Une ligne : canal d'acquisition + page d'arrivée. */
export function attributionLine(attribution: QuoteAttribution): string {
  const landing = attribution.landing?.split("?")[0];
  return `${attributionChannel(attribution)}${landing ? ` · arrivé sur ${landing}` : ""}`;
}

async function call(token: string, method: string, body: BodyInit | object): Promise<void> {
  const isForm = body instanceof FormData;
  const response = await fetch(`${API}/bot${token}/${method}`, {
    method: "POST",
    headers: isForm ? undefined : { "Content-Type": "application/json" },
    body: isForm ? body : JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`${method} ${response.status} : ${detail.slice(0, 200)}`);
  }
}

/** Message d'une demande de devis : l'essentiel pour rappeler, lisible d'un coup d'œil sur un téléphone. */
export function quoteAlertHtml(input: QuoteEmailInput): string {
  const { quote } = input;
  const e = escapeTelegram;
  const urgent = quote.timing === "asap" || quote.requestType === "reparation";
  const slot = quote.callbackSlot === "indifferent" ? "" : `, ${label(callbackSlots, quote.callbackSlot).toLowerCase()}`;
  return [
    urgent ? "🔴 <b>Devis à traiter vite</b>" : "<b>Nouvelle demande de devis</b>",
    `<b>${e(input.serviceLabel)}</b> · ${e(input.categoryLabel)}${input.displayedPrice ? ` · prix affiché ${e(input.displayedPrice)}` : ""}`,
    "",
    `👤 ${e(quote.name)}`,
    `📞 ${e(quote.phone)}`,
    `✉️ ${e(quote.email)}`,
    `📍 ${e([quote.address, `${quote.postalCode} ${quote.commune}`].filter(Boolean).join(", "))}`,
    `Préfère : ${e(label(contactPreferences, quote.contactPreference).toLowerCase())}${e(slot)}`,
    "",
    [label(requestTypes, quote.requestType), label(timings, quote.timing), label(properties, quote.property)].map(e).join(" · "),
    ...(quote.description ? [`💬 <i>${e(quote.description)}</i>`] : []),
    ...(input.photoCount ? [`📷 ${input.photoCount} photo${input.photoCount > 1 ? "s" : ""} (ci-dessous)`] : []),
    "",
    `Origine : ${e(attributionLine(input.attribution))}`,
    `Réf. <code>${e(input.reference)}</code>`,
  ].join("\n");
}

/** Texte brut (sans balises) pour un message trop long : couper du HTML casserait ses balises. */
function plainText(html: string): string {
  const text = html.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH - 1)}…` : text;
}

async function sendTo(token: string, chatId: string, alert: TelegramAlert): Promise<void> {
  const digits = alert.phone ? internationalDigits(alert.phone) : undefined;
  // Pas de bouton WhatsApp pour un fixe belge (02, 03…) : seuls les mobiles (04…) et les numéros étrangers.
  const wa = digits && (digits.startsWith("324") || !digits.startsWith("32")) ? digits : undefined;
  const fits = alert.html.length <= MAX_LENGTH;
  await call(token, "sendMessage", {
    chat_id: chatId,
    text: fits ? alert.html : plainText(alert.html),
    ...(fits ? { parse_mode: "HTML" } : {}),
    link_preview_options: { is_disabled: true },
    // Le numéro du message est cliquable (appel) ; le bouton ouvre WhatsApp avec le client.
    ...(wa ? { reply_markup: { inline_keyboard: [[{ text: "Écrire sur WhatsApp", url: `https://wa.me/${wa}` }]] } } : {}),
  });

  const photos = alert.photos ?? [];
  if (!photos.length) return;
  // Le message est arrivé : un échec sur les photos (déjà dans l'e-mail) est seulement journalisé.
  try {
    await sendPhotos(token, chatId, alert.reference, photos);
  } catch (error) {
    console.error(`[telegram] ${alert.reference} → ${chatId} : photos non envoyées (${(error as Error).message})`);
  }
}

async function sendPhotos(token: string, chatId: string, reference: string, photos: NonNullable<TelegramAlert["photos"]>) {
  // Un format non affichable (HEIC…) part en fichier ; un album ne mélange pas photos et fichiers.
  const type = photos.every((p) => PHOTO_TYPES.includes(p.contentType)) ? "photo" : "document";
  const caption = `Photos · ${reference}`;
  const blob = (photo: (typeof photos)[number]) => new Blob([new Uint8Array(photo.content)], { type: photo.contentType });
  const form = new FormData();
  form.append("chat_id", chatId);

  // Un album demande au moins deux éléments : une photo seule part avec sendPhoto / sendDocument.
  if (photos.length === 1) {
    form.append(type, blob(photos[0]), photos[0].filename);
    form.append("caption", caption);
    await call(token, type === "photo" ? "sendPhoto" : "sendDocument", form);
    return;
  }

  form.append(
    "media",
    JSON.stringify(photos.map((_, index) => ({ type, media: `attach://photo${index}`, ...(index === 0 ? { caption } : {}) })))
  );
  photos.forEach((photo, index) => form.append(`photo${index}`, blob(photo), photo.filename));
  await call(token, "sendMediaGroup", form);
}

/** Envoie l'alerte à chaque destinataire. Ne lève jamais d'erreur : renvoie true si au moins un l'a reçue. */
export async function sendTelegramAlert(alert: TelegramAlert): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (!token || !chatIds.length) return false;

  const results = await Promise.allSettled(chatIds.map((chatId) => sendTo(token, chatId, alert)));
  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`[telegram] ${alert.reference} → ${chatIds[index]} : ${(result.reason as Error).message}`);
    }
  });
  return results.some((result) => result.status === "fulfilled");
}

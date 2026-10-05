// Mise en forme de la demande de devis envoyée par e-mail à Radialec.
// Serveur uniquement.

import {
  callbackSlots,
  contactPreferences,
  properties,
  requestTypes,
  timings,
  type QuoteAttribution,
  type QuoteRequest,
} from "./schema";

export interface QuoteEmailInput {
  quote: QuoteRequest;
  reference: string;
  receivedAt: Date;
  categoryLabel: string;
  serviceLabel: string;
  /** Prix affiché sur le site pour cette prestation, s'il existe. */
  displayedPrice?: string;
  photoCount: number;
  attribution: QuoteAttribution;
}

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const label = <T extends Record<string, string>>(map: T, key: string) => (key in map ? map[key as keyof T] : key || "—");

const attributionLabels: Record<keyof QuoteAttribution, string> = {
  landing: "Page d'arrivée",
  referrer: "Page précédente",
  utm_source: "Source",
  utm_medium: "Support",
  utm_campaign: "Campagne",
  utm_term: "Mot-clé",
  utm_content: "Annonce / contenu",
  gclid: "Clic Google Ads (gclid)",
};

const PAID_MEDIUMS = ["cpc", "ppc", "paid", "paidsearch", "display", "paid_social"];

/** Résumé lisible de la provenance du client, à partir des paramètres bruts. */
function channel(a: QuoteAttribution): string {
  const medium = a.utm_medium?.toLowerCase() ?? "";
  if (a.gclid) return "Publicité Google Ads";
  if (PAID_MEDIUMS.includes(medium)) return `Publicité${a.utm_source ? ` (${a.utm_source})` : ""}`;
  if (a.utm_source) return `Campagne ${a.utm_source}${medium ? ` · ${medium}` : ""}`;
  if (a.referrer && /^https?:\/\//.test(a.referrer)) {
    const host = new URL(a.referrer).hostname.replace(/^www\./, "");
    if (/(^|\.)google\./.test(host)) return "Recherche Google";
    if (/(^|\.)bing\.com$/.test(host)) return "Recherche Bing";
    if (/(^|\.)(facebook|instagram)\.com$/.test(host)) return `Réseaux sociaux (${host})`;
    return `Site externe : ${host}`;
  }
  if (a.referrer) return "Navigation sur le site";
  return "Accès direct (lien enregistré, saisie de l'adresse…)";
}

/** Lignes « Origine » : canal en tête, puis les détails utiles, sans les paramètres techniques en double. */
export function attributionRows(a: QuoteAttribution): string[][] {
  const landing = a.landing?.split("?")[0];
  const details: [keyof QuoteAttribution, string | undefined][] = [
    ["landing", landing],
    ["referrer", a.referrer],
    ["utm_source", a.utm_source],
    ["utm_medium", a.utm_medium],
    ["utm_campaign", a.utm_campaign],
    ["utm_term", a.utm_term],
    ["utm_content", a.utm_content],
    ["gclid", a.gclid],
  ];
  return [
    ["Canal", channel(a)],
    ...details.filter(([, value]) => value).map(([key, value]) => [attributionLabels[key], value as string]),
  ];
}

function sections(input: QuoteEmailInput) {
  const { quote } = input;
  const date = input.receivedAt.toLocaleString("fr-BE", { timeZone: "Europe/Brussels", dateStyle: "full", timeStyle: "short" });
  const phoneHref = `tel:${quote.phone.replace(/[^\d+]/g, "")}`;

  return [
    {
      title: "La demande",
      rows: [
        ["Référence", input.reference],
        ["Reçue le", date],
        ["Domaine", input.categoryLabel],
        ["Prestation", input.serviceLabel],
        ...(input.displayedPrice ? [["Prix affiché sur le site", input.displayedPrice]] : []),
        ["Nature", label(requestTypes, quote.requestType)],
        ["Délai souhaité", label(timings, quote.timing)],
        ["Type de bien", label(properties, quote.property)],
        ["Photos jointes", input.photoCount ? `${input.photoCount} (en pièces jointes)` : "Aucune"],
      ],
    },
    {
      title: "Le client",
      rows: [
        ["Nom", quote.name],
        ["Téléphone", quote.phone, phoneHref],
        ["E-mail", quote.email, `mailto:${quote.email}`],
        ["Adresse", quote.address || "—"],
        ["Localité", `${quote.postalCode} ${quote.commune}`],
        ["Préfère être contacté", label(contactPreferences, quote.contactPreference)],
        ["Créneau de rappel", label(callbackSlots, quote.callbackSlot)],
      ],
    },
    { title: "Origine du client", rows: attributionRows(input.attribution) },
  ] as { title: string; rows: string[][] }[];
}

export interface EmailBlock {
  title: string;
  rows: string[][];
}

/**
 * Gabarit commun des e-mails reçus par Radialec (devis, rappel) : en-tête
 * navy, bouton « Appeler », blocs de lignes, message du client. HTML compatible
 * clients mail (tables, styles en ligne) + version texte.
 */
export function renderEmail({
  kicker,
  title,
  reference,
  name,
  phone,
  email,
  blocks,
  messageTitle,
  message,
}: {
  kicker: string;
  title: string;
  reference: string;
  name: string;
  /** Absent : pas de bouton « Appeler ». */
  phone?: string;
  /** Absent : pas de mention « Répondre à cet e-mail » (demande de rappel). */
  email?: string;
  blocks: EmailBlock[];
  messageTitle: string;
  /** Vide : pas de bloc message. */
  message: string;
}) {
  const text = [
    `${kicker} — ${reference}`,
    "",
    ...blocks.flatMap((block) => [
      `== ${block.title.toUpperCase()} ==`,
      ...block.rows.map(([k, v]) => `${k} : ${v}`),
      "",
    ]),
    ...(message ? [`== ${messageTitle.toUpperCase()} ==`, message, ""] : []),
    ...(email ? ["Répondre à cet e-mail écrit directement au client."] : []),
  ].join("\n");

  const row = ([k, v, href]: string[]) => `
      <tr>
        <td style="padding:8px 12px 8px 0;color:#5b6180;font-size:13px;vertical-align:top;white-space:nowrap;">${escape(k)}</td>
        <td style="padding:8px 0;color:#010D3E;font-size:14px;font-weight:600;">${
          href ? `<a href="${escape(href)}" style="color:#001E80;">${escape(v)}</a>` : escape(v)
        }</td>
      </tr>`;

  const html = `<!doctype html>
<html lang="fr"><body style="margin:0;background:#EAEEFE;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EAEEFE;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:#010D3E;padding:24px 28px;">
          <p style="margin:0;color:#f9bc2d;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${escape(kicker)}</p>
          <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;line-height:1.3;">${escape(title)}</h1>
          <p style="margin:6px 0 0;color:#c7cbe0;font-size:13px;">Réf. ${escape(reference)}</p>
        </td></tr>
        ${
          phone
            ? `<tr><td style="padding:20px 28px 0;">
          <a href="tel:${escape(phone.replace(/[^\d+]/g, ""))}" style="display:inline-block;background:#e52619;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:10px;font-size:14px;">Appeler ${escape(name)} · ${escape(phone)}</a>
        </td></tr>`
            : ""
        }
        ${blocks
          .map(
            (block) => `
        <tr><td style="padding:20px 28px 0;">
          <p style="margin:0 0 4px;color:#e52619;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;">${escape(block.title)}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e6e8f2;">${block.rows.map(row).join("")}</table>
        </td></tr>`
          )
          .join("")}
        <tr><td style="padding:20px 28px 28px;">${
          message
            ? `
          <p style="margin:0 0 8px;color:#e52619;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;">${escape(messageTitle)}</p>
          <div style="background:#F4F6FE;border-left:4px solid #001E80;border-radius:8px;padding:14px 16px;color:#010D3E;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escape(message)}</div>`
            : ""
        }${
          email
            ? `
          <p style="margin:18px 0 0;color:#8a8fa8;font-size:12px;">Répondre à cet e-mail écrit directement au client (${escape(email)}).</p>`
            : ""
        }
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { html, text };
}

export function buildQuoteEmail(input: QuoteEmailInput) {
  const { quote } = input;
  const urgent = quote.timing === "asap" || quote.requestType === "reparation";
  const subject = `${urgent ? "🔴 " : ""}Devis ${input.reference} · ${input.serviceLabel} · ${quote.commune} — ${quote.name}`;
  const { html, text } = renderEmail({
    kicker: `Nouvelle demande de devis${urgent ? " · À traiter vite" : ""}`,
    title: `${input.serviceLabel} — ${quote.commune}`,
    reference: input.reference,
    name: quote.name,
    phone: quote.phone,
    email: quote.email,
    blocks: sections(input),
    messageTitle: "Description du client",
    message: quote.description,
  });
  return { subject, html, text };
}

/** Référence lisible et datée (heure de Bruxelles), ex. RAD-20261001-K7QX. */
export function newReference(prefix: string, date: Date) {
  // Date de Bruxelles (et non UTC) : une demande envoyée à 0h30 porte bien la date du jour.
  const day = date.toLocaleDateString("sv-SE", { timeZone: "Europe/Brussels" }).replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${day}-${suffix}`;
}

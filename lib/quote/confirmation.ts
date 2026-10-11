// E-mails de confirmation envoyés au CLIENT après une demande de devis ou de
// rappel : référence, prochaines étapes (rappel sous 2 h), ligne d'urgence
// 24h/24 avec le numéro, récapitulatif. Serveur uniquement.
// HTML compatible clients mail (tables, styles en ligne, aucun dégradé CSS) + version texte.

import { company } from "@/app/data/company";
import { label, type QuoteEmailInput } from "./email";
import { callbackTimes, type CallbackRequest } from "./callback";
import { callbackWhen, emergencyLine, quoteNextSteps } from "./messages";
import { callbackSlots, contactPreferences, properties, requestTypes, timings } from "./schema";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const firstName = (name: string) => name.trim().split(/\s+/)[0];

// Couleurs de la marque (app/globals.css, tailwind.config.ts).
const night = "#0B1222";
const muted = "#5b6273";
const lavender = "#EAEEFE";
const chalk = "#F6F3EE";
const flame = "#E52619";
const energy = ["#e52619", "#ed7020", "#ffd505", "#38b7e8", "#3468af"];

interface CustomerEmail {
  /** Aperçu affiché par la messagerie après l'objet. */
  preheader: string;
  kicker: string;
  title: string;
  intro: string;
  steps: { title: string; text: string }[];
  recap: [string, string][];
  messageTitle?: string;
  message?: string;
  reference: string;
}

function render(email: CustomerEmail): { html: string; text: string } {
  const logo = `${company.siteUrl}/email/radialec-logo.png`;
  const tel = company.phone.href;

  const text = [
    email.title,
    "",
    email.intro,
    "",
    "LA SUITE",
    ...email.steps.map((step, i) => `${i + 1}. ${step.title}. ${step.text}`),
    "",
    emergencyLine,
    "",
    "VOTRE DEMANDE",
    ...email.recap.map(([k, v]) => `${k} : ${v}`),
    ...(email.message ? ["", `${email.messageTitle} :`, email.message] : []),
    "",
    "Une question ou une erreur dans votre demande ? Répondez simplement à cet e-mail.",
    "",
    `${company.name} · ${company.siteUrl.replace(/^https?:\/\/(www\.)?/, "")} · ${company.phone.display}`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escape(email.title)}</title></head>
<body style="margin:0;padding:0;background:${chalk};font-family:Arial,Helvetica,sans-serif;color:${night};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(email.preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${chalk};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;">
        <tr><td style="padding:24px 32px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;"><img src="${logo}" width="33" height="37" alt="" style="display:block;border:0;"></td>
            <td style="vertical-align:middle;padding-left:10px;font-size:22px;font-weight:800;letter-spacing:-0.5px;color:${night};">Radialec</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:22px 32px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${energy
              .map((c) => `<td width="7" height="3" style="width:7px;height:3px;background:${c};font-size:0;line-height:0;"></td>`)
              .join("")}</tr></table></td>
            <td style="vertical-align:middle;padding-left:10px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:${muted};">${escape(email.kicker)}</td>
          </tr></table>
          <h1 style="margin:14px 0 0;font-size:26px;line-height:1.2;font-weight:800;letter-spacing:-0.5px;color:${night};">${escape(email.title)}</h1>
          <p style="margin:12px 0 0;font-size:16px;line-height:1.6;color:${muted};">${escape(email.intro)}</p>
          <p style="margin:16px 0 0;"><span style="display:inline-block;background:${chalk};border-radius:10px;padding:8px 14px;font-size:12px;color:${muted};">Référence&nbsp;&nbsp;<strong style="font-size:15px;letter-spacing:1px;color:${night};">${escape(email.reference)}</strong></span></p>
        </td></tr>

        <tr><td style="padding:28px 32px 0;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:${muted};">La suite</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${email.steps
            .map(
              (step, i) => `
            <tr><td style="padding:12px 0;border-top:2px solid #eceef3;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:top;width:34px;font-size:13px;font-weight:800;color:#ED7020;">${String(i + 1).padStart(2, "0")}</td>
                <td style="vertical-align:top;">
                  <p style="margin:0;font-size:16px;font-weight:700;line-height:1.4;color:${night};">${escape(step.title)}</p>
                  <p style="margin:4px 0 0;font-size:14px;line-height:1.5;color:${muted};">${escape(step.text)}</p>
                </td>
              </tr></table>
            </td></tr>`
            )
            .join("")}
          </table>
        </td></tr>

        <tr><td style="padding:20px 32px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${lavender};border-radius:16px;">
            <tr><td style="padding:20px 22px;">
              <p style="margin:0;font-size:17px;font-weight:800;color:${night};">Une urgence&nbsp;?</p>
              <p style="margin:6px 0 0;font-size:14px;line-height:1.5;color:${muted};">N'attendez pas notre rappel&nbsp;: appelez-nous ${escape(company.promises.emergency)}.</p>
              <p style="margin:14px 0 0;"><a href="${tel}" style="display:inline-block;background:${flame};color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:13px 22px;border-radius:12px;">&#9742;&nbsp; ${escape(company.phone.display)}</a></p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:28px 32px 0;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:${muted};">Votre demande</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${email.recap
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:9px 14px 9px 0;border-top:1px solid #eceef3;font-size:13px;color:${muted};vertical-align:top;width:38%;">${escape(k)}</td>
              <td style="padding:9px 0;border-top:1px solid #eceef3;font-size:14px;font-weight:600;color:${night};vertical-align:top;">${escape(v)}</td>
            </tr>`
            )
            .join("")}
          </table>${
            email.message
              ? `
          <p style="margin:18px 0 6px;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:700;color:${muted};">${escape(email.messageTitle ?? "Votre message")}</p>
          <div style="background:${chalk};border-radius:12px;padding:14px 16px;font-size:14px;line-height:1.6;color:${night};white-space:pre-wrap;">${escape(email.message)}</div>`
              : ""
          }
        </td></tr>

        <tr><td style="padding:24px 32px 30px;">
          <p style="margin:0;font-size:14px;line-height:1.6;color:${muted};">Une question, ou une erreur dans votre demande&nbsp;? Répondez simplement à cet e-mail.</p>
        </td></tr>
      </table>
      <p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#8a8f9c;text-align:center;">
        ${escape(company.name)} · <a href="${company.siteUrl}" style="color:#8a8f9c;">${escape(company.siteUrl.replace(/^https?:\/\/(www\.)?/, ""))}</a> · ${escape(company.phone.display)}<br>
        Vous recevez cet e-mail parce que vous avez fait une demande sur notre site. <a href="${company.siteUrl}/confidentialite" style="color:#8a8f9c;">Confidentialité</a>
      </p>
    </td></tr>
  </table>
</body></html>`;

  return { html, text };
}

/** Confirmation d'une demande de devis, avec le récapitulatif complet. */
export function buildQuoteConfirmation(input: QuoteEmailInput) {
  const { quote } = input;
  const slot = quote.callbackSlot === "indifferent" ? "" : `, ${label(callbackSlots, quote.callbackSlot).toLowerCase()}`;
  const recap: [string, string][] = [
    ["Prestation", input.serviceLabel],
    ["Domaine", input.categoryLabel],
    ...(input.displayedPrice ? ([["Prix affiché sur le site", input.displayedPrice]] as [string, string][]) : []),
    ["Nature", label(requestTypes, quote.requestType)],
    ["Délai souhaité", label(timings, quote.timing)],
    ["Type de bien", label(properties, quote.property)],
    ["Adresse", [quote.address, `${quote.postalCode} ${quote.commune}`].filter(Boolean).join(", ")],
    ["Téléphone", quote.phone],
    ["E-mail", quote.email],
    ["Être contacté", `${label(contactPreferences, quote.contactPreference)}${slot}`],
    ["Photos jointes", input.photoCount ? String(input.photoCount) : "Aucune"],
  ];
  const { html, text } = render({
    preheader: `${quoteNextSteps(quote)[0].title}. ${emergencyLine}`,
    kicker: "Demande de devis reçue",
    title: `Merci ${firstName(quote.name)}, votre demande est bien arrivée.`,
    intro: `Nous avons bien reçu votre demande de devis pour : ${input.serviceLabel}. Voici la suite, et le récapitulatif de ce que vous nous avez envoyé.`,
    steps: quoteNextSteps(quote),
    recap,
    messageTitle: "Votre description",
    message: quote.description,
    reference: input.reference,
  });
  return { subject: `Votre demande de devis Radialec · ${input.reference}`, html, text };
}

/** Confirmation d'une demande de rappel (ou de rendez-vous à fixer par téléphone). */
export function buildCallbackConfirmation(input: {
  callback: CallbackRequest;
  reference: string;
  topic?: string;
  origin?: string;
}) {
  const { callback } = input;
  const rendezVous = callback.purpose === "rendez-vous";
  const when = callbackWhen(callback);
  const recap: [string, string][] = [
    ["Motif", rendezVous ? "Fixer un rendez-vous" : "Être rappelé"],
    ["Téléphone", callback.phone],
    ["Moment", callbackTimes[callback.time]],
    ...(input.topic ? ([["Sujet", input.topic]] as [string, string][]) : []),
    ...(input.origin ? ([["Depuis la page", input.origin]] as [string, string][]) : []),
  ];
  const step = `Nous vous rappelons ${when}`;
  const { html, text } = render({
    preheader: `${step}. ${emergencyLine}`,
    kicker: rendezVous ? "Rendez-vous à fixer" : "Demande de rappel reçue",
    title: `Merci ${firstName(callback.name)}, c'est noté.`,
    intro: `${step}, au ${callback.phone}.`,
    steps: [
      {
        title: "Un technicien vous appelle",
        text: rendezVous
          ? "Vous fixez ensemble le créneau de votre rendez-vous."
          : "Il répond à votre question ou organise l'intervention avec vous.",
      },
      { title: "Sans engagement", text: "Vous décidez de la suite après l'appel." },
    ],
    recap,
    messageTitle: "Votre message",
    message: callback.message,
    reference: input.reference,
  });
  return {
    subject: `Votre demande ${rendezVous ? "de rendez-vous" : "de rappel"} Radialec · ${input.reference}`,
    html,
    text,
  };
}

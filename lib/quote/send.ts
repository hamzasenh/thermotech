// Envoi de la demande de devis via Resend (API REST, sans dépendance).
// Serveur uniquement.
//
// Variables d'environnement (.env.local en local, réglages de l'hébergeur en production) :
//   RESEND_API_KEY    clé Resend (une clé « envoi uniquement » suffit)
//   QUOTE_TO_EMAIL    destinataire des demandes
//   QUOTE_FROM_EMAIL  expéditeur, ex. « Radialec <devis@radialec.be> » — domaine
//                     vérifié dans Resend. Par défaut, l'expéditeur de test de
//                     Resend, qui ne peut écrire qu'à l'adresse du compte Resend.
//
// Sans RESEND_API_KEY : en développement, la demande est affichée dans la
// console du serveur ; en production, l'envoi échoue explicitement (503) —
// on n'affiche jamais « demande envoyée » si personne ne la reçoit.

export interface QuoteEmail {
  to: string;
  /** Absent (demande de rappel sans e-mail) : réponse à l'expéditeur. */
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments: { filename: string; content: Buffer; contentType: string }[];
  /** Référence de la demande : sert de clé d'idempotence (pas de doublon en cas de nouvel essai). */
  reference: string;
}

export class QuoteDeliveryError extends Error {}

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "Radialec · Devis <onboarding@resend.dev>";

export function quoteRecipient(): string {
  const to = process.env.QUOTE_TO_EMAIL;
  if (!to) throw new QuoteDeliveryError("QUOTE_TO_EMAIL n'est pas défini.");
  return to;
}

export async function sendQuoteEmail(email: QuoteEmail): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `\n[e-mail] RESEND_API_KEY absente — e-mail NON envoyé (développement).\n` +
          `À : ${email.to} · Réponse à : ${email.replyTo ?? "—"}\nObjet : ${email.subject}\n` +
          `Pièces jointes : ${email.attachments.map((a) => `${a.filename} (${Math.round(a.content.length / 1024)} Ko)`).join(", ") || "aucune"}\n\n` +
          `${email.text}\n`
      );
      return { delivered: false };
    }
    throw new QuoteDeliveryError("Envoi d'e-mail non configuré (RESEND_API_KEY).");
  }

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": email.reference,
      },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || DEFAULT_FROM,
        to: [email.to],
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
        subject: email.subject,
        html: email.html,
        text: email.text,
        attachments: email.attachments.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content.toString("base64"),
          content_type: attachment.contentType,
        })),
        tags: [{ name: "type", value: "devis" }],
      }),
      signal: AbortSignal.timeout(15_000),
    });
  } catch (error) {
    throw new QuoteDeliveryError(`Resend injoignable : ${(error as Error).message}`);
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new QuoteDeliveryError(`Resend a refusé l'envoi (${response.status}) : ${detail.slice(0, 300)}`);
  }

  return { delivered: true };
}

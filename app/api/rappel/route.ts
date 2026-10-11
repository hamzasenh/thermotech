import { NextResponse } from "next/server";
import { categoryLabels } from "@/app/data/categories";
import { services } from "@/app/data/services";
import { attributionRows, newReference, renderEmail } from "@/lib/quote/email";
import {
  callbackTimes,
  callbackTopics,
  emptyCallback,
  validateCallback,
  type CallbackRequest,
} from "@/lib/quote/callback";
import { LIMITS, parseAttribution } from "@/lib/quote/schema";
import { QuoteDeliveryError, quoteRecipient, sendQuoteEmail } from "@/lib/quote/send";
import { attributionLine, escapeTelegram as e, sendTelegramAlert } from "@/lib/quote/telegram";

export const runtime = "nodejs";

// Plus court que /api/devis : deux champs, souvent remplis par le navigateur
// (saisie automatique). Un vrai client ne doit jamais tomber sous ce seuil.
const MIN_FILL_MS = 1500;

/** Libellé lisible de la page d'origine, ou undefined si la référence est inconnue. */
function originLabel(context: string): string | undefined {
  if (!context) return undefined;
  const service = services.find((s) => `${s.category}/${s.slug}` === context);
  if (service) return service.name;
  return Object.prototype.hasOwnProperty.call(categoryLabels, context)
    ? categoryLabels[context as keyof typeof categoryLabels]
    : undefined;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  const receivedAt = new Date();
  const reference = newReference("RAP", receivedAt);

  // Anti-spam : même logique que /api/devis (champ piège, remplissage trop rapide).
  const startedAt = Number(form.get("startedAt"));
  if (form.get("website") || !startedAt || receivedAt.getTime() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, reference });
  }

  const callback = { ...emptyCallback };
  for (const key of Object.keys(emptyCallback) as (keyof CallbackRequest)[]) {
    const value = form.get(key);
    if (typeof value === "string") (callback as Record<string, string>)[key] = value.trim().slice(0, LIMITS.description);
  }

  const errors = validateCallback(callback);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const topic = callback.topic ? callbackTopics[callback.topic] : undefined;
  const origin = originLabel(callback.service);
  const when = callbackTimes[callback.time];
  const attribution = parseAttribution(form.get("attribution"));
  const rendezVous = callback.purpose === "rendez-vous";
  const date = receivedAt.toLocaleString("fr-BE", { timeZone: "Europe/Brussels", dateStyle: "full", timeStyle: "short" });
  const { html, text } = renderEmail({
    kicker: `${rendezVous ? "Rendez-vous à fixer" : "Rappel demandé"}${
      callback.time === "asap" ? " · Dès que possible" : ""
    }`,
    title: `Rappeler ${callback.name} · ${when.toLowerCase()}`,
    reference,
    name: callback.name,
    phone: callback.phone,
    blocks: [
      {
        title: "La demande",
        rows: [
          ["Référence", reference],
          ["Reçue le", date],
          ["Motif", rendezVous ? "Prendre rendez-vous" : "Être rappelé"],
          ["À rappeler", when],
          ["Sujet", topic ?? "Non précisé"],
          ...(origin ? [["Depuis la page", origin]] : []),
        ],
      },
      {
        title: "Le client",
        rows: [
          ["Nom", callback.name],
          ["Téléphone", callback.phone, `tel:${callback.phone.replace(/[^\d+]/g, "")}`],
        ],
      },
      { title: "Origine du client", rows: attributionRows(attribution) },
    ],
    messageTitle: "Son message",
    message: callback.message,
  });

  const alertHtml = [
    `📞 <b>${rendezVous ? "Rendez-vous à fixer" : "À rappeler"} · ${e(when.toLowerCase())}</b>`,
    "",
    `👤 ${e(callback.name)}`,
    `📞 ${e(callback.phone)}`,
    [topic, origin && `depuis « ${origin} »`].filter(Boolean).map((part) => e(part as string)).join(" · ") || "Sujet non précisé",
    ...(callback.message ? [`💬 <i>${e(callback.message)}</i>`] : []),
    "",
    `Origine : ${e(attributionLine(attribution))}`,
    `Réf. <code>${e(reference)}</code>`,
  ].join("\n");

  // E-mail (trace) et alerte Telegram (instantanée) en parallèle.
  const [email, alert] = await Promise.allSettled([
    (async () =>
      sendQuoteEmail({
        to: quoteRecipient(),
        reference,
        subject: `📞 ${rendezVous ? "Rendez-vous à fixer" : "À rappeler"} ${when.toLowerCase()} · ${origin ?? topic ?? "Rappel"} — ${
          callback.name
        } · ${callback.phone}`,
        html,
        text,
        attachments: [],
      }))(),
    sendTelegramAlert({ html: alertHtml, phone: callback.phone, reference }),
  ]);
  const alerted = alert.status === "fulfilled" && alert.value;

  if (email.status === "rejected") {
    if (!(email.reason instanceof QuoteDeliveryError)) throw email.reason;
    console.error(`[rappel] ${reference} e-mail non envoyé : ${email.reason.message}${alerted ? " (alerte Telegram reçue)" : ""}`);
    if (!alerted) {
      return NextResponse.json({ ok: false, message: "L'envoi a échoué de notre côté. Appelez-nous directement." }, { status: 503 });
    }
  }

  const delivered = (email.status === "fulfilled" && email.value.delivered) || alerted;
  return NextResponse.json({ ok: true, reference, delivered });
}

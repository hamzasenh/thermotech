import { NextResponse } from "next/server";
import { categoryLabels } from "../../data/categories";
import { formatAmount, resolvePrice } from "../../data/pricing";
import { getServiceByRef, services, type ServiceCategory, type ServiceRef } from "../../data/services";
import { buildQuoteEmail, newReference } from "@/lib/quote/email";
import {
  emptyQuote,
  LIMITS,
  OTHER_SERVICE,
  PHOTO_LIMITS,
  parseAttribution,
  validateQuote,
  type QuoteRequest,
} from "@/lib/quote/schema";
import { QuoteDeliveryError, quoteRecipient, sendQuoteEmail } from "@/lib/quote/send";

export const runtime = "nodejs";

const knownServices = new Set(services.map((s) => `${s.category}/${s.slug}`));
const MIN_FILL_MS = 3000;

function readQuote(form: FormData): QuoteRequest {
  const quote = { ...emptyQuote };
  for (const key of Object.keys(emptyQuote) as (keyof QuoteRequest)[]) {
    const value = form.get(key);
    if (typeof value === "string") (quote as Record<string, string>)[key] = value.trim().slice(0, LIMITS.description);
  }
  return quote;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "Requête invalide." }, { status: 400 });
  }

  const receivedAt = new Date();
  const reference = newReference("RAD", receivedAt);

  // Anti-spam : champ piège rempli ou formulaire rempli trop vite → on
  // répond « OK » sans rien envoyer, pour ne pas renseigner le robot.
  const startedAt = Number(form.get("startedAt"));
  if (form.get("website") || !startedAt || receivedAt.getTime() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true, reference });
  }

  const quote = readQuote(form);
  const errors = validateQuote(quote, undefined, knownServices);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const files = form.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);
  if (
    files.length > PHOTO_LIMITS.maxCount ||
    files.some((file) => !file.type.startsWith("image/") || file.size > PHOTO_LIMITS.maxBytes * 1.2)
  ) {
    return NextResponse.json(
      { ok: false, message: `Photos : ${PHOTO_LIMITS.maxCount} images maximum, 1,5 Mo chacune.` },
      { status: 422 }
    );
  }

  const service = quote.service === OTHER_SERVICE ? undefined : getServiceByRef(quote.service as ServiceRef);
  const price = service?.price ? resolvePrice(service.price) : undefined;

  const { subject, html, text } = buildQuoteEmail({
    quote,
    reference,
    receivedAt,
    categoryLabel: categoryLabels[quote.category as ServiceCategory] ?? quote.category,
    serviceLabel: service?.name ?? "Autre besoin (voir description)",
    displayedPrice: price?.amount !== undefined ? `${formatAmount(price)} TVAC` : undefined,
    photoCount: files.length,
    attribution: parseAttribution(form.get("attribution")),
  });

  let delivered: boolean;
  try {
    ({ delivered } = await sendQuoteEmail({
      to: quoteRecipient(),
      replyTo: quote.email,
      reference,
      subject,
      html,
      text,
      attachments: await Promise.all(
        files.map(async (file, index) => ({
          filename: `${reference}-photo-${index + 1}.${file.type.split("/")[1] ?? "jpg"}`,
          content: Buffer.from(await file.arrayBuffer()),
          contentType: file.type,
        }))
      ),
    }));
  } catch (error) {
    if (error instanceof QuoteDeliveryError) {
      console.error(`[devis] ${reference} non envoyée : ${error.message}`);
      return NextResponse.json(
        { ok: false, message: "L'envoi a échoué de notre côté. Appelez-nous, nous traitons votre demande tout de suite." },
        { status: 503 }
      );
    }
    throw error;
  }

  // `delivered: false` n'arrive qu'en développement sans Resend (voir lib/quote/send.ts).
  return NextResponse.json({ ok: true, reference, delivered });
}

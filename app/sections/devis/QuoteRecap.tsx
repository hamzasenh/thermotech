"use client";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { PhoneLink } from "@/components/site/Actions";
import { GoogleRating } from "@/components/site/GoogleRating";
import { properties, requestTypes, timings, type QuoteRequest } from "@/lib/quote/schema";

interface QuoteRecapProps {
  quote: QuoteRequest;
  categoryLabel?: string;
  serviceLabel?: string;
  amount?: number;
  photoCount: number;
}

function Line({ label, value }: { label: string; value?: string }) {
  return (
    <li className="flex items-baseline gap-2">
      <span className="text-ink/60">{label}</span>
      <span aria-hidden="true" className="min-w-[1rem] flex-1 -translate-y-1 border-b border-dotted border-ink/20" />
      <span className={cn("max-w-[60%] truncate text-right font-semibold", value ? "text-ink" : "text-ink/25")}>
        {value || "—"}
      </span>
    </li>
  );
}

/** Récapitulatif vivant de la demande (colonne de droite), esthétique « ticket » de /tarifs. */
export function QuoteRecap({ quote, categoryLabel, serviceLabel, amount, photoCount }: QuoteRecapProps) {
  const locality = [quote.postalCode, quote.commune].filter(Boolean).join(" ");

  return (
    <div className="space-y-5">
      {/* Sur mobile, le récapitulatif arriverait après le formulaire : inutile, on ne garde que l'aide urgence. */}
      <div className="hidden [filter:drop-shadow(0_20px_36px_rgba(0,30,128,0.14))] lg:block">
        <div className="rounded-t-3xl bg-white px-6 pb-6 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flame">Votre demande</p>
          <div aria-hidden="true" className="my-4 border-t-2 border-dashed border-ink/15" />
          <ul className="space-y-2.5 font-mono text-[13px]">
            <Line label="Domaine" value={categoryLabel} />
            <Line label="Prestation" value={serviceLabel} />
            <Line label="Nature" value={quote.requestType ? requestTypes[quote.requestType] : undefined} />
            <Line label="Délai" value={quote.timing ? timings[quote.timing] : undefined} />
            <Line label="Bien" value={quote.property ? properties[quote.property] : undefined} />
            <Line label="Localité" value={locality} />
            <Line label="Photos" value={photoCount ? String(photoCount) : undefined} />
          </ul>

          {amount !== undefined && (
            <div className="mt-5 rounded-2xl bg-gradient-to-b from-[#0a1330] to-ink px-4 py-3 shadow-[inset_0_2px_12px_rgba(0,0,0,0.6)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber/70">Prix affiché</p>
              <p className="font-mono text-3xl font-bold tabular-nums text-amber [text-shadow:0_0_14px_rgba(249,188,45,0.5)]">
                {amount}€ <span className="text-xs font-normal text-white/60">TVAC</span>
              </p>
            </div>
          )}

          <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-ink/15" />
          <ul className="space-y-2 text-sm font-medium text-ink">
            {["Devis gratuit", "Sans engagement", "Réponse sous 24h", "Le prix annoncé est le prix payé"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <FaCheck className="h-3 w-3 text-green-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          aria-hidden="true"
          className="h-3 bg-[radial-gradient(circle_at_10px_100%,transparent_7px,#fff_7.5px)] bg-[length:20px_100%] bg-repeat-x"
        />
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-[#00040f] via-ink to-navy p-6 text-white shadow-soft">
        <p className="text-xs font-bold uppercase tracking-wide text-amber">Panne en cours ?</p>
        <p className="mt-2 font-semibold leading-snug">
          N&apos;attendez pas le devis : un technicien intervient sous 24h, 7j/7.
        </p>
        <PhoneLink className="mt-4 w-full" />
      </div>

      <div className="flex justify-center">
        <GoogleRating />
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { fr } from "@/lib/typography";
import { company } from "@/app/data/company";
import { quoteNextSteps } from "@/lib/quote/messages";
import type { QuoteRequest } from "@/lib/quote/schema";
import { PhoneButton } from "../v2/ui";

interface QuoteSuccessProps {
  quote: QuoteRequest;
  reference: string;
  /** false = mode développement, e-mail pas encore réellement envoyé. */
  delivered?: boolean;
  /** true = récapitulatif envoyé au client par e-mail. */
  confirmed?: boolean;
}

export function QuoteSuccess({ quote, reference, delivered, confirmed }: QuoteSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstName = quote.name.trim().split(/\s+/)[0];

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const next = quoteNextSteps(quote);

  return (
    <div className="py-2 sm:py-4">
      {delivered === false && (
        <p className="mb-8 rounded-2xl border border-dashed border-flame/40 bg-flame/[0.04] px-4 py-3 text-xs text-flame">
          Mode développement : l&apos;e-mail n&apos;a pas été envoyé (Resend pas encore branché). La demande est
          affichée dans la console du serveur.
        </p>
      )}

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative flex h-16 w-16 items-center justify-center rounded-full bg-night text-white"
      >
        <FaCheck className="h-6 w-6" aria-hidden="true" />
        <span aria-hidden="true" className="v2-energy absolute -bottom-2 left-3 right-3 h-[3px] rounded-full" />
      </motion.div>

      <h2 ref={headingRef} tabIndex={-1} className="v2-title mt-8 text-[1.9rem] outline-none sm:text-[2.3rem]">
        {fr(`Demande envoyée, merci ${firstName} !`)}
      </h2>
      <p className="mt-3 max-w-lg text-[17px] leading-relaxed text-night/65">
        Votre demande est bien arrivée chez nos techniciens. Gardez votre référence :
      </p>
      <p className="mt-4 inline-flex items-center gap-3 rounded-2xl bg-chalk px-5 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-night/45">Référence</span>
        <span className="v2-semi font-display text-lg font-bold tracking-wider text-night">{reference}</span>
      </p>
      {confirmed && (
        <p className="mt-3 text-sm text-night/60">
          Récapitulatif envoyé à <strong className="font-semibold text-night">{quote.email}</strong>.
        </p>
      )}

      <ol className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3">
        {next.map((step, index) => (
          <li key={step.title} className="border-t-2 border-night/10 pt-5">
            <span className="v2-wide font-display text-sm font-bold text-ember">{String(index + 1).padStart(2, "0")}</span>
            <p className="v2-semi mt-2 font-display text-[17px] font-bold leading-snug text-night">{fr(step.title)}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-night/60">{fr(step.text)}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col gap-3 border-t border-night/[0.08] pt-7 sm:flex-row sm:items-center">
        <span className="text-sm text-night/55 sm:mr-1">Une urgence&nbsp;? Appelez-nous {company.promises.emergency}</span>
        <PhoneButton variant="primary" className="min-h-[52px] px-6" />
        <Link href="/tarifs" className="group inline-flex items-center justify-center gap-1.5 px-3 py-3 font-semibold text-night hover:text-flame">
          Voir nos tarifs
          <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

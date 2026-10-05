"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { PhoneLink } from "@/components/site/Actions";
import { callbackSlots, type QuoteRequest } from "@/lib/quote/schema";

interface QuoteSuccessProps {
  quote: QuoteRequest;
  reference: string;
  /** false = mode développement, e-mail pas encore réellement envoyé. */
  delivered?: boolean;
}

export function QuoteSuccess({ quote, reference, delivered }: QuoteSuccessProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstName = quote.name.trim().split(/\s+/)[0];
  const slot = quote.callbackSlot === "indifferent" ? "" : ` (${callbackSlots[quote.callbackSlot].toLowerCase()})`;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const next = [
    {
      title: quote.contactPreference === "email" ? "Nous vous écrivons sous 24h" : `Nous vous rappelons sous 24h${slot}`,
      text: "Un technicien relit votre demande et vous contacte pour préciser ce qui doit l'être.",
    },
    {
      title: "Visite technique si nécessaire",
      text: "Pour certains projets, un passage sur place permet de chiffrer au plus juste.",
    },
    {
      title: "Votre devis détaillé, gratuit",
      text: "Vous décidez ensuite, sans pression et sans engagement.",
    },
  ];

  return (
    <div className="py-4 text-center sm:py-8">
      {delivered === false && (
        <p className="mx-auto mb-8 max-w-md rounded-xl border border-dashed border-flame/50 bg-flame/[0.05] px-4 py-2 text-xs text-flame">
          Mode développement : l&apos;e-mail n&apos;a pas été envoyé (Resend pas encore branché). La demande est
          affichée dans la console du serveur.
        </p>
      )}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="bg-flame mx-auto flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl shadow-flame/30"
      >
        <FaCheck className="h-8 w-8" aria-hidden="true" />
      </motion.div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-gradient mt-6 text-3xl font-bold tracking-tighter outline-none md:text-4xl"
      >
        Demande envoyée, merci {firstName}&nbsp;!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-ink/75">
        Votre demande est bien arrivée chez nos techniciens. Gardez votre référence :
      </p>
      <p className="mx-auto mt-3 inline-block rounded-xl bg-lavender px-4 py-2 font-mono text-lg font-bold tracking-wider text-navy">
        {reference}
      </p>

      <ol className="mx-auto mt-10 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
        {next.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-ink/10 bg-white p-5">
            <span className="bg-flame inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="mt-3 font-bold leading-snug text-ink">{step.title}</p>
            <p className="mt-1 text-sm text-ink/65">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PhoneLink variant="secondary">Une urgence ? Appelez-nous</PhoneLink>
        <Link href="/tarifs" className="group inline-flex items-center gap-1.5 px-3 py-3 font-bold text-navy hover:text-flame">
          Voir nos tarifs
          <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

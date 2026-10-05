"use client";
import { useId, useState } from "react";
import { RichText } from "@/components/site/RichText";
import { cn } from "@/lib/utils";
import { fr } from "@/lib/typography";
import type { FaqItem } from "@/app/data/services/types";
import { cardBg, toneBg, type Tone } from "./tones";
import { ButtonLink, Eyebrow } from "./ui";

/**
 * FAQ refondue : une question ouverte à la fois. Les réponses restent dans le
 * HTML même repliées (lisibles par les moteurs de recherche, sans JavaScript).
 */
export function FaqV2({
  faqs,
  title,
  rappelHref,
  id,
  tone = "white",
}: {
  faqs: FaqItem[];
  title: string;
  rappelHref: string;
  id?: string;
  tone?: Tone;
}) {
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);
  const baseId = useId();

  return (
    <section id={id} className={cn("scroll-mt-24 py-20 lg:py-28", toneBg[tone])} aria-labelledby="faq-titre">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Questions fréquentes</Eyebrow>
          <h2 id="faq-titre" className="v2-title mt-5 text-[1.9rem] sm:text-[2.3rem] lg:text-[2.5rem]">
            {fr(title)}
          </h2>
          <p className="mt-5 max-w-sm text-night/70">{fr("Votre question n'y est pas ? Laissez votre numéro, nous vous rappelons.")}</p>
          <ButtonLink href={rappelHref} variant="outline" arrow className="mt-6">
            Être rappelé
          </ButtonLink>
        </div>

        <div className="border-t border-night/10">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const panelId = `${baseId}-faq-${faq.id}`;
            return (
              <div key={faq.id} className="border-b border-night/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-water-light"
                  >
                    <span className="v2-semi font-display text-lg font-bold text-night lg:text-xl">{fr(faq.question)}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                        isOpen ? "bg-night text-white" : cn(cardBg[tone], "text-night group-hover:bg-night/10")
                      )}
                    >
                      <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
                      <span className={cn("absolute h-3.5 w-[2px] rounded-full bg-current transition-transform duration-300", isOpen && "rotate-90")} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  className={cn(
                    "grid transition-[grid-template-rows,visibility] duration-300 ease-out",
                    isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-[17px] leading-relaxed text-night/70">
                      <RichText text={faq.answer} />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

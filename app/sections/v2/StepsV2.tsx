"use client";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { fr } from "@/lib/typography";
import type { Step } from "@/app/data/services/types";
import { MediaSlot } from "./media";
import { cardBg, toneBg, type Tone } from "./tones";
import { ButtonLink, SectionTitle } from "./ui";

/**
 * Process en étapes. Desktop : visuel collant à gauche qui suit l'étape lue,
 * trait aux trois énergies qui se remplit au défilement. Mobile : visuel au
 * dessus de chaque étape.
 */
export function StepsV2({
  eyebrow,
  title,
  intro,
  steps,
  ctaHref,
  ctaLabel,
  tone = "white",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  steps: Step[];
  ctaHref: string;
  ctaLabel: string;
  tone?: Tone;
}) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 65%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const current = steps[active];
  // Étapes sans visuel (la plupart des pages) : une seule colonne, pas d'emplacement vide.
  const hasMedia = steps.some((step) => step.image);

  return (
    <section className={cn("py-20 lg:py-32", toneBg[tone])} aria-labelledby="etapes-titre">
      <div className="container">
        <SectionTitle id="etapes-titre" eyebrow={eyebrow ?? "Votre projet, étape par étape"} title={title} intro={intro} />

        <div className={cn("mt-12 grid gap-12 lg:mt-20 lg:gap-20", hasMedia && "lg:grid-cols-2")}>
          {/* Visuel collant (desktop) */}
          <div className={cn("hidden", hasMedia && "lg:block")}>
            <div className="sticky top-28">
              <div className={cn("relative h-[min(620px,calc(100vh-9rem))] overflow-hidden rounded-[28px]", cardBg[tone])}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <StepMedia step={current} sizes="(min-width: 1024px) 40vw, 0px" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full bg-white/95 py-2 pl-2 pr-4 text-sm font-semibold text-night shadow-lg">
                  <span className="v2-wide flex h-8 min-w-8 items-center justify-center rounded-full bg-night px-2 font-display text-xs font-bold text-white">
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  {current.title}
                </div>
              </div>
            </div>
          </div>

          <div className={cn("relative", !hasMedia && "max-w-3xl")}>
            {/* Rail + remplissage aux couleurs du logo */}
            <div aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-[2px] rounded-full bg-night/[0.08] lg:left-[27px]" />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: progress }}
              className="v2-energy-y absolute bottom-2 left-[19px] top-2 w-[2px] origin-top rounded-full lg:left-[27px]"
            />

            <ol ref={list} className="relative space-y-14 lg:space-y-0">
              {steps.map((step, index) => (
                <StepItem
                  key={step.title}
                  step={step}
                  index={index}
                  active={index === active}
                  onActive={() => setActive(index)}
                  compact={!hasMedia}
                  tone={tone}
                />
              ))}
            </ol>

            <div className="mt-12 pl-14 lg:mt-4 lg:pl-[76px]">
              <ButtonLink href={ctaHref} variant="dark" arrow>
                {ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  step,
  index,
  active,
  onActive,
  compact,
  tone,
}: {
  step: Step;
  index: number;
  active: boolean;
  onActive: () => void;
  /** Sans visuel : étapes plus serrées, toutes lisibles. */
  compact?: boolean;
  tone: Tone;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <li ref={ref} className={cn("relative pl-14 lg:pl-[76px]", compact ? "lg:py-6" : "lg:flex lg:min-h-[44vh] lg:items-center")}>
      <span
        className={cn(
          "v2-wide absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold transition-colors duration-300 lg:h-14 lg:w-14 lg:text-base",
          compact ? "lg:top-5" : "lg:top-1/2 lg:-translate-y-1/2",
          active ? "bg-night text-white" : "bg-white text-night/40 ring-1 ring-night/10"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        {step.image && (
          <div className={cn("relative mb-6 aspect-[4/3] overflow-hidden rounded-3xl lg:hidden", cardBg[tone])}>
            <StepMedia step={step} sizes="92vw" />
          </div>
        )}
        <h3
          className={cn(
            "v2-title transition-colors duration-300",
            compact ? "text-[1.4rem] lg:text-[1.7rem]" : "text-[1.6rem] lg:text-[2.2rem]",
            !active && !compact && "lg:text-night/35"
          )}
        >
          {fr(step.title)}
        </h3>
        <p
          className={cn(
            "mt-3 max-w-xl text-[17px] leading-relaxed text-night/70 transition-colors duration-300",
            !active && !compact && "lg:text-night/35"
          )}
        >
          {fr(step.description)}
        </p>
      </div>
    </li>
  );
}

function StepMedia({ step, sizes }: { step: Step; sizes: string }) {
  return <MediaSlot image={step.image} sizes={sizes} className="absolute inset-0 rounded-none border-0" />;
}

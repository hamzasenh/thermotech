import Link from "next/link";
import type { ReactNode } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { fr } from "@/lib/typography";
import { company } from "@/app/data/company";

// Primitives du design refondu (boutons, sur-titres, titres de section).

export type V2Variant = "primary" | "light" | "dark" | "outline" | "outlineLight";

/**
 * Fond des sections « fortes » (haut de page, garantie, bandeau d'appel, footer).
 * Lavande = choix validé le 2026-10-04 (préféré au bleu nuit après comparaison) ;
 * « night » reste disponible.
 */
export type Surface = "night" | "lavender";

const variantClass: Record<V2Variant, string> = {
  primary: "v2-btn-primary",
  light: "bg-white text-night shadow-[0_12px_32px_-14px_rgba(0,0,0,0.45)] hover:bg-chalk",
  dark: "bg-night text-white hover:bg-black",
  outline: "border border-night/15 bg-white text-night hover:border-night/40",
  outlineLight: "border border-white/25 text-white hover:border-white/50 hover:bg-white/10",
};

export function btn(variant: V2Variant, className?: string) {
  return cn("v2-btn", variantClass[variant], className);
}

export function ButtonLink({
  href,
  variant = "primary",
  arrow,
  className,
  children,
}: {
  href: string;
  variant?: V2Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const content = (
    <>
      {children}
      {arrow && (
        <BsArrowRight className="h-[18px] w-[18px] flex-shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      )}
    </>
  );
  return /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("group", btn(variant, className))}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cn("group", btn(variant, className))}>
      {content}
    </Link>
  );
}

export function PhoneButton({
  variant = "outline",
  className,
  children,
}: {
  variant?: V2Variant;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <a href={company.phone.href} className={btn(variant, cn("whitespace-nowrap tabular-nums", className))}>
      <FaPhoneAlt className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {children ?? company.phone.display}
    </a>
  );
}

/** Sur-titre de section, précédé du trait aux trois énergies du logo. */
export function Eyebrow({ children, tone = "dark", className }: { children: ReactNode; tone?: "dark" | "light"; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.2em]",
        tone === "dark" ? "text-night/60" : "text-white/70",
        className
      )}
    >
      <span className="v2-energy h-[3px] w-7 flex-shrink-0 rounded-full" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  tone = "dark",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cn(
          "v2-title text-[2.1rem] sm:text-[2.6rem] lg:text-[3.2rem]",
          eyebrow && "mt-5",
          tone === "light" && "text-white"
        )}
      >
        {fr(title)}
      </h2>
      {intro && (
        <p className={cn("mt-5 max-w-2xl text-[17px] leading-relaxed", tone === "dark" ? "text-night/70" : "text-white/70")}>
          {fr(intro)}
        </p>
      )}
    </div>
  );
}

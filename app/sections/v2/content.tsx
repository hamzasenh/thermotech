import Link from "next/link";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { RichText } from "@/components/site/RichText";
import { cn } from "@/lib/utils";
import { fr } from "@/lib/typography";
import { contactActionHref } from "@/app/data/company";
import { resolvePrice, type PriceRef } from "@/app/data/pricing";
import { categoryLabels } from "@/app/data/categories";
import { serviceHref, type Feature, type Fact, type ImageSpec, type Option, type Service } from "@/app/data/services";
import type { AssetId } from "@/app/data/assets-needed";
import { MediaSlot } from "./media";
import { cardBg, toneBg, type Tone } from "./tones";
import { ButtonLink, Eyebrow, SectionTitle } from "./ui";

// Blocs de contenu du design refondu (pages service et catégorie).

const num = (index: number) => String(index + 1).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Liste numérotée (remplace les blocs à pictogrammes)                 */
/* ------------------------------------------------------------------ */

export function FeaturesV2({
  eyebrow,
  title,
  intro,
  items,
  layout = "columns",
  note,
  tone = "white",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: Feature[];
  layout?: "columns" | "list";
  note?: string;
  tone?: Tone;
}) {
  return (
    <section className={cn("py-16 lg:py-28", toneBg[tone])}>
      <div className="container">
        <SectionTitle eyebrow={eyebrow} title={title} intro={intro} />
        {layout === "columns" ? (
          <ol
            className={cn(
              "mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-14",
              items.length === 3 ? "lg:grid-cols-3" : items.length >= 4 ? "lg:grid-cols-4" : ""
            )}
          >
            {items.map((item, index) => (
              <li key={item.title} className="border-t-2 border-night/10 pt-6">
                <span className="v2-wide font-display text-sm font-bold text-flame">{num(index)}</span>
                <h3 className="v2-semi mt-3 font-display text-xl font-bold leading-snug text-night">{fr(item.title)}</h3>
                <p className="mt-2 leading-relaxed text-night/70">
                  <RichText text={item.text} />
                </p>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mt-10 grid gap-x-12 md:grid-cols-2 lg:mt-14">
            {items.map((item, index) => (
              <li key={item.title} className="flex gap-5 border-t border-night/10 py-6">
                <span className="v2-wide w-8 flex-shrink-0 pt-1 font-display text-sm font-bold text-flame">{num(index)}</span>
                <div>
                  <h3 className="v2-semi font-display text-lg font-bold leading-snug text-night">{fr(item.title)}</h3>
                  <p className="mt-1.5 leading-relaxed text-night/70">
                    <RichText text={item.text} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
        {note && (
          <p className="mt-10 max-w-3xl border-l-2 border-flame pl-5 text-night/75">
            <RichText text={note} />
          </p>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Checklist : photo + liste cochée                                    */
/* ------------------------------------------------------------------ */

export function ChecklistV2({
  eyebrow,
  title,
  intro,
  items,
  note,
  image,
  tone = "white",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: string[];
  note?: string;
  image: ImageSpec;
  tone?: Tone;
}) {
  return (
    <section className={cn("py-16 lg:py-28", toneBg[tone])}>
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <MediaSlot image={image} sizes="(min-width: 1024px) 45vw, 92vw" className="aspect-[4/3] rounded-[28px] lg:aspect-[4/5]" />
        <div>
          <SectionTitle eyebrow={eyebrow} title={title} intro={intro} />
          <ul className="mt-8 divide-y divide-night/10 border-y border-night/10">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-4 py-4">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-night text-white">
                  <FaCheck className="h-2.5 w-2.5" aria-hidden="true" />
                </span>
                <span className="text-night/85">
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
          {note && (
            <p className="mt-6 text-sm text-night/60">
              <RichText text={note} />
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Comparatif d'options                                                */
/* ------------------------------------------------------------------ */

export function OptionsV2({
  eyebrow,
  title,
  intro,
  items,
  tone = "white",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: Option[];
  tone?: Tone;
}) {
  return (
    <section className={cn("py-16 lg:py-28", toneBg[tone])}>
      <div className="container">
        <SectionTitle eyebrow={eyebrow} title={title} intro={intro} />
        <ul className={cn("mt-10 grid gap-4 lg:mt-14", items.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3")}>
          {items.map((item) => (
            <li
              key={item.title}
              className={cn(
                "relative flex flex-col overflow-hidden rounded-3xl p-6 sm:p-8",
                item.badge ? "bg-night text-white" : cn(cardBg[tone], "text-night")
              )}
            >
              {item.badge && <span aria-hidden="true" className="v2-energy absolute inset-x-0 top-0 h-[3px]" />}
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="v2-semi font-display text-xl font-bold">{fr(item.title)}</h3>
                {item.badge && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className={cn("mt-3 leading-relaxed", item.badge ? "text-white/75" : "text-night/70")}>
                <RichText text={item.text} />
              </p>
              {item.points && (
                <ul className="mt-5 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm">
                      <FaCheck className={cn("mt-1 h-3 w-3 flex-shrink-0", item.badge ? "text-bolt" : "text-flame")} aria-hidden="true" />
                      <span className={item.badge ? "text-white/85" : "text-night/80"}>
                        <RichText text={point} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Carte des prix (version compacte de la « carte » de /tarifs)       */
/* ------------------------------------------------------------------ */

export function PricingV2({
  eyebrow = "Des tarifs clairs, sans surprise",
  title,
  intro,
  items,
  note,
  context,
  tone = "white",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: PriceRef[];
  note?: string;
  context?: string;
  tone?: Tone;
}) {
  const resolved = items.map(resolvePrice);
  return (
    <section className={cn("py-16 lg:py-28", toneBg[tone])} aria-label={title}>
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div>
          <SectionTitle eyebrow={eyebrow} title={title} intro={intro} />
          <p className="mt-6 max-w-md text-sm text-night/60">
            <RichText text={note ?? "Prix TVAC. Devis gratuit et prix annoncé avant toute intervention : le prix annoncé est le prix payé."} />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={contactActionHref("devis", context)} variant="dark" arrow>
              Demander un devis gratuit
            </ButtonLink>
            <Link href="/tarifs" className="group inline-flex items-center gap-1.5 px-2 py-3 font-semibold text-night hover:text-flame">
              Voir tous nos tarifs
              <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="relative isolate overflow-hidden rounded-[28px] bg-night px-5 py-6 text-white sm:px-8 sm:py-8">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]"
          />
          <ul>
            {resolved.map((item) => (
              <li key={item.label} className="flex items-baseline gap-3 border-b border-white/10 py-4 last:border-0">
                <span className="min-w-0">
                  <span className="font-semibold text-white">{item.label}</span>
                  {item.note && <span className="mt-0.5 block text-sm text-white/55">{item.note}</span>}
                </span>
                <span aria-hidden="true" className="hidden min-w-[1.5rem] flex-1 -translate-y-1 self-baseline border-b-2 border-dotted border-white/20 sm:block" />
                <span className="ml-auto flex flex-shrink-0 items-baseline gap-2 tabular-nums">
                  {item.originalAmount !== undefined && <span className="text-sm text-white/40 line-through">{item.originalAmount}€</span>}
                  {item.amount === undefined ? (
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">Sur devis</span>
                  ) : (
                    <span className="v2-semi font-display text-xl font-bold text-bolt">
                      {item.from && <span className="mr-1 text-xs font-medium text-white/60">dès</span>}
                      {item.amount}€<span className="ml-1 text-[10px] font-normal text-white/45">TVAC</span>
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Alerte (sécurité) ou information                                    */
/* ------------------------------------------------------------------ */

export function AlertV2({
  title,
  paragraphs,
  tone = "danger",
  bg = "white",
  attached,
}: {
  title: string;
  paragraphs: string[];
  tone?: "danger" | "info";
  /** Fond de la section (l'encadré lui-même suit `tone`). */
  bg?: Tone;
  /** Prolonge la section précédente (même fond) : pas de marge haute. */
  attached?: boolean;
}) {
  const danger = tone === "danger";
  return (
    <section className={cn(toneBg[bg], attached ? "-mt-8 pb-16 lg:-mt-12 lg:pb-28" : "py-12 lg:py-16")}>
      <div className="container">
        <div
          role={danger ? "note" : undefined}
          className={cn(
            "relative overflow-hidden rounded-3xl p-6 pl-8 sm:p-8 sm:pl-10 lg:max-w-4xl",
            danger ? "bg-flame/[0.06]" : "bg-lavender"
          )}
        >
          <span aria-hidden="true" className={cn("absolute bottom-0 left-0 top-0 w-1.5", danger ? "bg-flame" : "bg-water")} />
          <p className={cn("flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]", danger ? "text-flame" : "text-water")}>
            {danger && <FaExclamationTriangle className="h-3.5 w-3.5" aria-hidden="true" />}
            {danger ? "Sécurité" : "Bon à savoir"}
          </p>
          <h2 className="v2-title mt-3 text-[1.5rem] lg:text-[1.9rem]">{fr(title)}</h2>
          <div className="mt-4 space-y-3 text-night/80">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Guide : texte éditorial long                                        */
/* ------------------------------------------------------------------ */

export function GuideV2({
  eyebrow = "Le conseil du technicien",
  title,
  paragraphs,
  image,
  tone = "white",
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  image?: ImageSpec;
  tone?: Tone;
}) {
  return (
    <section className={cn("py-16 lg:py-28", toneBg[tone])}>
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle eyebrow={eyebrow} title={title} />
          {image && <MediaSlot image={image} sizes="(min-width: 1024px) 40vw, 92vw" className="mt-8 aspect-[3/2] rounded-[28px]" />}
        </div>
        <div className="max-w-2xl space-y-5 text-[17px] leading-relaxed text-night/80">
          {paragraphs.map((paragraph) =>
            paragraph.startsWith("## ") ? (
              <h3 key={paragraph} className="v2-semi pt-5 font-display text-xl font-bold text-night lg:text-2xl">
                {fr(paragraph.slice(3))}
              </h3>
            ) : (
              <p key={paragraph}>
                <RichText text={paragraph} />
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Grille de services (pages catégorie, accueil)                       */
/* ------------------------------------------------------------------ */

export function startingPrice(service: Service): string | undefined {
  if (!service.price) return undefined;
  const price = resolvePrice(service.price);
  if (price.amount === undefined) return undefined;
  return `${price.from ? "Dès " : ""}${price.amount}€ TVAC`;
}

/** Carte mise en avant : photo (ou emplacement) + titre + prix. */
export function FeaturedServiceCard({ service, asset, priceLabel }: { service: Service; asset?: AssetId; priceLabel?: string }) {
  const price = priceLabel ?? startingPrice(service);
  return (
    <Link
      href={serviceHref(service)}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-night/[0.07] transition-shadow duration-300 hover:shadow-[0_24px_60px_-28px_rgba(11,18,34,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-water-light"
    >
      <MediaSlot
        image={service.hero.image}
        asset={asset}
        sizes="(min-width: 1024px) 30vw, 92vw"
        className="aspect-[4/3] rounded-none border-0"
        compact
      />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="v2-semi font-display text-xl font-bold leading-snug text-night">{service.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-night/65">{service.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          {price ? <span className="v2-semi font-display text-lg font-bold text-flame">{price}</span> : <span className="text-sm font-semibold text-night/60">Devis gratuit</span>}
          <BsArrowRight className="h-5 w-5 text-night transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

/** Carte compacte, typographique (pas de photo) : titre, résumé, prix. */
export function ServiceCardV2({ service, showCategory, tone = "white" }: { service: Service; showCategory?: boolean; tone?: Tone }) {
  const price = startingPrice(service);
  return (
    <Link
      href={serviceHref(service)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:bg-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-water-light",
        cardBg[tone]
      )}
    >
      <span className="v2-energy absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
      {showCategory && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-night/45 group-hover:text-white/50">
          {categoryLabels[service.category]}
        </span>
      )}
      <span className={cn("v2-semi font-display text-lg font-bold leading-snug text-night group-hover:text-white", showCategory && "mt-1.5")}>
        {service.name}
      </span>
      <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-night/65 group-hover:text-white/65">{service.summary}</span>
      <span className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span className={cn("text-sm font-semibold", price ? "text-flame group-hover:text-bolt" : "text-night/60 group-hover:text-white/60")}>
          {price ?? "Devis gratuit"}
        </span>
        <BsArrowRight className="h-4 w-4 text-night transition-transform group-hover:translate-x-1 group-hover:text-white" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function ServiceGridV2({
  eyebrow,
  title,
  intro,
  featured = [],
  featuredTitle,
  services,
  othersTitle,
  tone = "white",
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  featured?: Service[];
  featuredTitle?: string;
  services: Service[];
  othersTitle?: string;
  tone?: Tone;
  id?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 lg:py-28", toneBg[tone])}>
      <div className="container">
        <SectionTitle eyebrow={eyebrow} title={title} intro={intro} />
        {featured.length > 0 && (
          <>
            {featuredTitle && <p className="v2-semi mt-10 font-display text-lg font-bold text-night lg:mt-14">{featuredTitle}</p>}
            <ul className={cn("grid gap-4 md:grid-cols-3", featuredTitle ? "mt-5" : "mt-10 lg:mt-14")}>
              {featured.map((service) => (
                <li key={serviceHref(service)}>
                  <FeaturedServiceCard service={service} />
                </li>
              ))}
            </ul>
          </>
        )}
        {services.length > 0 && (
          <>
            {othersTitle && <p className="v2-semi mt-12 font-display text-lg font-bold text-night">{othersTitle}</p>}
            <ul className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", othersTitle ? "mt-5" : featured.length ? "mt-4" : "mt-10 lg:mt-14")}>
              {services.map((service) => (
                <li key={serviceHref(service)}>
                  <ServiceCardV2 service={service} tone={tone} showCategory={service.category !== featured[0]?.category && featured.length > 0} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bandeau de chiffres / engagements                                   */
/* ------------------------------------------------------------------ */

export function TrustStripV2({ items, eyebrow, tone = "white" }: { items: Fact[]; eyebrow?: string; tone?: Tone }) {
  return (
    <section className={cn("py-12 lg:py-16", toneBg[tone])}>
      <div className="container">
        {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.stat} className="border-t-2 border-night/10 pt-5">
              <dt className="v2-semi font-display text-lg font-bold leading-tight text-night lg:text-xl">{item.stat}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-night/60">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}


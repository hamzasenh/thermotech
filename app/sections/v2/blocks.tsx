import Image from "next/image";
import Link from "next/link";
import { FaCheck, FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
// Copie nettoyée (ombre noire semi-transparente retirée) de technicien_noir_debout_souriant_doigt_sur_tablette_coupe_aux_cuisses.png.
import technicienTablette from "@/assets/refonte/technicien-tablette-detoure.png";
import { Icon } from "@/components/site/Icon";
import { Reveal } from "@/components/site/Motion";
import { RichText } from "@/components/site/RichText";
import { cn } from "@/lib/utils";
import { fr } from "@/lib/typography";
import { boilerBrands, certifications } from "@/app/data/brands";
import { categoryLabels } from "@/app/data/categories";
import { company, contactActionHref } from "@/app/data/company";
import { getServiceByRef, serviceHref, type ServiceIntent, type ServiceRef, type Verdict } from "@/app/data/services";
import { zonesIntervention } from "@/app/data/zones-intervention";
import { cardBg, toneBg, type Tone } from "./tones";
import { ButtonLink, Eyebrow, PhoneButton, SectionTitle, type Surface } from "./ui";

/* ------------------------------------------------------------------ */
/* Marques                                                             */
/* ------------------------------------------------------------------ */

export function BrandsV2({ title, intro, tone = "white" }: { title: string; intro?: string; tone?: Tone }) {
  return (
    <section className={cn("py-20 lg:py-28", toneBg[tone])} aria-labelledby="marques-titre">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <SectionTitle id="marques-titre" eyebrow="Marques installées" title={title} intro={intro} />
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-night/[0.07] ring-1 ring-night/[0.07] sm:grid-cols-4">
            {boilerBrands.map((brand) => (
              <li key={brand.alt} className="group flex h-24 items-center justify-center bg-white px-5 lg:h-28">
                <Image
                  src={brand.src}
                  alt={brand.alt}
                  sizes="160px"
                  className="max-h-9 w-auto object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </li>
            ))}
            <li className="bg-night">
              <Link
                href="/chauffage/entretien-chaudiere"
                className="group flex h-24 items-center justify-center gap-2 px-5 text-center text-sm font-semibold text-white lg:h-28"
              >
                Entretien de chaudière
                <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Encadré comparatif (gaz / mazout / PAC)                             */
/* ------------------------------------------------------------------ */

// Verdicts typographiques : barre de couleur du logo + statut en grand, sans pictogramme.
const verdictTone: Record<Verdict["tone"], { bar: string; status: string }> = {
  flame: { bar: "bg-flame", status: "text-flame" },
  water: { bar: "bg-water", status: "text-water" },
  off: { bar: "bg-night/15", status: "text-night/35" },
};

export function CalloutV2({
  title,
  paragraphs,
  verdicts,
  tone = "white",
}: {
  title: string;
  paragraphs: string[];
  verdicts?: Verdict[];
  tone?: Tone;
}) {
  return (
    <section className={cn("py-20 lg:py-28", toneBg[tone])} aria-labelledby="choix-titre">
      <div className={cn("container grid gap-12 lg:gap-20", verdicts?.length ? "lg:grid-cols-[1.05fr_0.95fr]" : "")}>
        <div className={verdicts?.length ? undefined : "max-w-3xl"}>
          <SectionTitle id="choix-titre" eyebrow="Bien choisir" title={title} />
          <div className="mt-8 space-y-4 border-l-2 border-night/10 pl-6 text-[17px] leading-relaxed text-night/75">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} linkClassName="font-semibold text-water underline underline-offset-4 hover:text-night" />
              </p>
            ))}
          </div>
        </div>

        {verdicts && verdicts.length > 0 && (
          <ul className="divide-y divide-night/10 self-center border-y border-night/10">
            {verdicts.map((verdict) => {
              const tone = verdictTone[verdict.tone];
              const off = verdict.tone === "off";
              return (
                <li key={verdict.label} className="relative flex items-center justify-between gap-6 py-6 pl-6">
                  <span aria-hidden="true" className={cn("absolute bottom-6 left-0 top-6 w-1 rounded-full", tone.bar)} />
                  <div>
                    <p className={cn("v2-semi font-display text-lg font-bold text-night", off && "text-night/45 line-through decoration-2")}>
                      {verdict.label}
                    </p>
                    <p className="mt-1 text-sm text-night/60">{fr(verdict.note)}</p>
                  </div>
                  <p className={cn("v2-wide flex-shrink-0 text-right font-display text-xl font-extrabold tracking-tight lg:text-2xl", tone.status)}>
                    {fr(verdict.status)}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Chiffres mis en avant (garantie)                                    */
/* ------------------------------------------------------------------ */

export function HighlightV2({
  eyebrow,
  title,
  figures,
  paragraphs,
  note,
  surface = "lavender",
}: {
  eyebrow?: string;
  title: string;
  figures: { value: string; label: string }[];
  paragraphs: string[];
  note?: string;
  surface?: Surface;
}) {
  const light = surface === "lavender";
  return (
    <section
      className={cn("relative isolate overflow-hidden py-20 lg:py-28", light ? "bg-lavender text-night" : "bg-night text-white")}
      aria-labelledby="garantie-titre"
    >
      <div aria-hidden="true" className="v2-glow" />
      <div className="container">
        {eyebrow && <Eyebrow tone={light ? "dark" : "light"}>{eyebrow}</Eyebrow>}
        <div className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-8 lg:gap-x-12">
          {figures.map((figure, index) => (
            <div key={figure.label} className="flex items-start gap-8 lg:gap-12">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className={cn("v2-wide pt-2 font-display text-5xl font-light leading-none lg:text-7xl", light ? "text-night/25" : "text-white/25")}
                >
                  +
                </span>
              )}
              <div>
                <p className="v2-wide font-display text-[4.2rem] font-extrabold leading-[0.9] tracking-[-0.04em] sm:text-[5rem] lg:text-[6.5rem]">
                  {figure.value}
                </p>
                <p className={cn("mt-4 text-sm", light ? "text-night/60" : "text-white/60")}>{figure.label}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={cn("mt-14 grid gap-8 border-t pt-10 lg:grid-cols-2 lg:gap-20", light ? "border-night/10" : "border-white/10")}>
          <h2 id="garantie-titre" className={cn("v2-title text-[2rem] lg:text-[2.4rem]", light ? "text-night" : "text-white")}>
            {fr(title)}
          </h2>
          <div className={cn("space-y-4 text-[17px] leading-relaxed", light ? "text-night/75" : "text-white/75")}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} strongClassName={cn("font-semibold", light ? "text-night" : "text-white")} />
              </p>
            ))}
          </div>
        </div>
        {note && <p className={cn("mt-12 max-w-3xl text-[13px] leading-relaxed", light ? "text-night/55" : "text-white/50")}>{fr(note)}</p>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bandeau d'appel (milieu de page)                                    */
/* ------------------------------------------------------------------ */

// Textes par défaut du bandeau d'appel, par intention (repris de l'ancien CallBand).
// Les pages chauffage gardent la version « chaudière » de la page pilote.
const callBandCopy: Record<ServiceIntent | "chaudiere", { eyebrow: string; title: string; text: string }> = {
  chaudiere: {
    eyebrow: "Une question avant de vous lancer ?",
    title: "Parlons de votre chaudière.",
    text: `Remplacer ou réparer, gaz ou pompe à chaleur : appelez-nous ${company.promises.availability}, ou laissez votre numéro et nous vous rappelons.`,
  },
  urgence: {
    eyebrow: "Dépannage 7j/7",
    title: "Une panne ? Un technicien chez vous sous 24h.",
    text: "Un appel suffit : nous évaluons la situation avec vous et planifions l'intervention au plus vite, week-end compris.",
  },
  installation: {
    eyebrow: "Devis gratuit",
    title: "Votre projet mérite un devis clair.",
    text: "Visite technique, conseils et devis détaillé sous 24h — gratuit et sans engagement. Un seul interlocuteur du premier rendez-vous à la mise en service.",
  },
  entretien: {
    eyebrow: "Entretien planifié",
    title: "Réservez votre créneau en un appel.",
    text: "Nous fixons ensemble un rendez-vous rapide, généralement sous 24h, au prix affiché à l'avance. Vous n'avez plus qu'à ouvrir la porte.",
  },
};

export function CallBandV2({
  context,
  surface = "lavender",
  intent = "installation",
  title,
  text,
  tone = "white",
  attached,
}: {
  /** Page d'origine transmise au rappel / rendez-vous (absente sur /contact). */
  context?: string;
  surface?: Surface;
  intent?: ServiceIntent;
  /** Surcharges venant des données (bloc `callBand`). */
  title?: string;
  text?: string;
  /** Fond de la section prolongée (le bandeau n'a pas de fond propre, voir tones.ts). */
  tone?: Tone;
  /** Prolonge la section précédente : pas de marge haute. */
  attached?: boolean;
}) {
  const light = surface === "lavender";
  const copy = callBandCopy[context?.startsWith("chauffage") ? "chaudiere" : intent];
  const second =
    intent === "entretien"
      ? { href: contactActionHref("rendezVous", context), label: "Prendre rendez-vous" }
      : { href: contactActionHref("rappel", context), label: "Être rappelé" };
  return (
    // Pas de fond propre : la section reprend celui de la section qu'elle prolonge, seule la carte lavande se voit.
    <section className={cn(toneBg[tone], attached ? "pb-16 lg:pb-28" : "py-16 lg:py-24")} aria-label="Parler à un technicien">
      <div className="container">
        <Reveal>
          <div
            className={cn(
              "relative isolate overflow-hidden rounded-[32px] px-6 pt-10 sm:px-10 lg:grid lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-10 lg:px-14 lg:pt-0",
              light ? "bg-lavender text-night" : "bg-night text-white"
            )}
          >
            <div aria-hidden="true" className="v2-glow" />
            <div className="lg:py-14">
              <Eyebrow tone={light ? "dark" : "light"}>{copy.eyebrow}</Eyebrow>
              <h2 className={cn("v2-title mt-5 text-[1.9rem] lg:text-[2.6rem]", light ? "text-night" : "text-white")}>{fr(title ?? copy.title)}</h2>
              <p className={cn("mt-4 max-w-xl", light ? "text-night/70" : "text-white/70")}>{fr(text ?? copy.text)}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PhoneButton variant="primary" className="min-h-[56px] px-7 text-base" />
                <ButtonLink href={second.href} variant="light" className="min-h-[56px]">
                  {second.label}
                </ButtonLink>
              </div>
            </div>
            <div className="relative mx-auto mt-10 h-[280px] w-[240px] sm:h-[340px] sm:w-[290px] lg:mt-0 lg:h-[400px] lg:w-full">
              <Image
                src={technicienTablette}
                alt="Technicien Radialec avec sa tablette"
                fill
                sizes="(min-width: 1024px) 340px, 290px"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Preuve : note Google + agréments                                    */
/* ------------------------------------------------------------------ */

export function ProofV2({ tone = "white", footnote }: { tone?: Tone; /** Note sous la section (ex. info à fournir). */ footnote?: React.ReactNode }) {
  const { rating, reviewCount, url } = company.google;
  return (
    <section className={cn("py-20 lg:py-28", toneBg[tone])} aria-labelledby="confiance-titre">
      <div className="container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Ils nous font confiance</Eyebrow>
          <h2 id="confiance-titre" className="sr-only">
            Ils nous font confiance
          </h2>
          <div className="mt-6 flex items-end gap-5">
            <p className="v2-wide font-display text-[5.5rem] font-extrabold leading-none tracking-[-0.04em] text-night lg:text-[7rem]">
              {rating}/5
            </p>
            <div className="pb-3">
              <span className="flex text-bolt drop-shadow-[0_1px_0_rgba(11,18,34,0.25)]" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className="h-5 w-5" />
                ))}
              </span>
              <p className="mt-1.5 text-sm font-semibold text-night">{reviewCount} avis sur Google</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-night/70">
            {fr(`${company.promises.clients} à Bruxelles et en périphérie. Leurs avis sont publics : lisez-les avant de nous appeler.`)}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 font-semibold text-night underline decoration-night/20 underline-offset-[6px] transition-colors hover:decoration-flame"
          >
            Lire les avis sur Google
            <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        <div className="lg:pt-12">
          <p className="v2-semi font-display text-xl font-bold text-night">Techniciens agréés dans les trois régions</p>
          <p className="mt-2 text-night/65">
            {fr("Des interventions conformes aux normes en vigueur, à Bruxelles, en Flandre et en Wallonie.")}
          </p>
          <ul className="mt-8 grid grid-cols-3 gap-3">
            {certifications.map((logo) => (
              <li key={logo.alt} className={cn("flex h-24 items-center justify-center rounded-2xl p-4", cardBg[tone])}>
                <Image src={logo.src} alt={logo.alt} sizes="160px" className="max-h-full w-auto object-contain" />
              </li>
            ))}
          </ul>
          <ul className="mt-8 space-y-3 text-night/75">
            {[
              // Repris du texte validé de la page (intro, CTA).
              "Devis détaillé sous 24 heures",
              "Normes en vigueur respectées (PEB, RGIE)",
              "Un seul interlocuteur, du premier rendez-vous à la mise en service",
            ].map(
              (point) => (
                <li key={point} className="flex items-start gap-3">
                  <FaCheck className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-flame" aria-hidden="true" />
                  {point}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      {footnote && <div className="container mt-12">{footnote}</div>}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Zone d'intervention                                                 */
/* ------------------------------------------------------------------ */

export function ZonesV2({ intro, tone = "white" }: { intro?: string; tone?: Tone }) {
  return (
    <section className={cn("scroll-mt-24 py-20 lg:py-28", toneBg[tone])} aria-labelledby="zones-titre" id="zones">
      <div className="container">
        <SectionTitle
          id="zones-titre"
          eyebrow="Zone d'intervention"
          title="Bruxelles et sa périphérie"
          intro={intro ?? "Les 19 communes bruxelloises et une partie du Brabant flamand et du Brabant wallon."}
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {zonesIntervention.map((zone) => (
            <div key={zone.region}>
              <h3 className="v2-semi font-display text-base font-bold text-night">{zone.region}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {zone.communes.map((commune) => (
                  <li key={commune} className={cn("rounded-full px-3.5 py-1.5 text-sm text-night/75 ring-1 ring-night/[0.06]", cardBg[tone])}>
                    {commune}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services liés (maillage interne)                                    */
/* ------------------------------------------------------------------ */

export function RelatedV2({
  refs,
  eyebrow = "Nos autres services",
  title = "Un autre besoin ?",
  intro,
  tone = "white",
}: {
  refs: ServiceRef[];
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: Tone;
}) {
  if (refs.length === 0) return null;
  const related = refs.map(getServiceByRef);
  return (
    <section className={cn("py-20 lg:py-28", toneBg[tone])} aria-labelledby="lies-titre">
      <div className="container">
        <SectionTitle id="lies-titre" eyebrow={eyebrow} title={title} intro={intro} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((service) => (
            <li key={serviceHref(service)}>
              <Link
                href={serviceHref(service)}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:bg-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-water-light",
                  cardBg[tone]
                )}
              >
                <span className="v2-energy absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                <span className={cn("inline-flex h-11 w-11 items-center justify-center rounded-xl text-night transition-colors group-hover:bg-white/10 group-hover:text-white", toneBg[tone])}>
                  <Icon name={service.icon} className="h-4 w-4" />
                </span>
                <span className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-night/45 group-hover:text-white/50">
                  {categoryLabels[service.category]}
                </span>
                <span className="v2-semi mt-1.5 font-display text-lg font-bold leading-snug text-night group-hover:text-white">
                  {service.name}
                </span>
                <span className="mt-2 line-clamp-3 text-sm leading-relaxed text-night/65 group-hover:text-white/65">{service.summary}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-night group-hover:text-white">
                  Découvrir
                  <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

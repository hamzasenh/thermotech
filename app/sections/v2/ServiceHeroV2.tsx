import Link from "next/link";
import { FaChevronRight, FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { Icon } from "@/components/site/Icon";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { currentHeating, type CurrentHeating } from "@/lib/quote/schema";
import { fr } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { company, contactActionHref } from "@/app/data/company";
import type { AssetId } from "@/app/data/assets-needed";
import type { Fact, ImageSpec, ServiceIntent } from "@/app/data/services/types";
import { MediaSlot, resolvePhoto } from "./media";
import { ButtonLink, Eyebrow, PhoneButton, type Surface } from "./ui";

/** Raccourcis discrets sous les boutons (pastilles), jamais posés sur le visuel. */
export interface HeroShortcuts {
  label: string;
  links: { label: string; href: string }[];
}

interface ServiceHeroV2Props {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  /** Photo de la colonne de droite (ou son emplacement réservé). */
  image?: ImageSpec;
  /** Contenu de la colonne de droite à la place de la photo (pages catégorie). */
  panel?: React.ReactNode;
  facts: Fact[];
  /** Service d'origine (« categorie/slug ») transmis au devis. */
  context: string;
  /** Affiche le « devis express » (chauffage actuel) en raccourcis — pages chaudière. */
  quickStart?: boolean;
  /** Autres raccourcis (ex. « Votre chaudière est… » sur l'accueil). */
  shortcuts?: HeroShortcuts;
  surface?: Surface;
  /** Ordre et choix des actions : appel puis devis / rendez-vous / rappel. */
  intent?: ServiceIntent;
  /** Vidéo facultative qui peut remplacer la photo (emplacement réservé). */
  video?: AssetId;
}

/**
 * Haut de page refondu : fond lavande, titre large, téléphone en action n°1,
 * preuves (Google, garantie, délai), raccourcis discrets, visuel 4:5 (ou
 * panneau) à droite. Chiffres clés en pied de hero.
 */
export function ServiceHeroV2({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  image,
  panel,
  facts,
  context,
  quickStart,
  shortcuts,
  surface = "lavender",
  intent = "installation",
  video,
}: ServiceHeroV2Props) {
  const light = surface === "lavender";
  const secondary =
    intent === "entretien"
      ? { href: contactActionHref("rendezVous", context), label: "Prendre rendez-vous" }
      : intent === "urgence"
        ? { href: contactActionHref("rappel", context), label: "Être rappelé" }
        : { href: contactActionHref("devis", context), label: "Demander un devis gratuit" };
  // Devis express : la première question du devis (chauffage actuel), ouvre /devis pré-rempli.
  const quick: HeroShortcuts | undefined = quickStart
    ? {
        label: "Devis express · votre chauffage actuel :",
        links: (Object.keys(currentHeating) as CurrentHeating[]).map((key) => ({
          label: currentHeating[key],
          href: `${contactActionHref("devis", context)}&actuel=${key}`,
        })),
      }
    : shortcuts;

  return (
    <section className={cn("relative isolate overflow-hidden", light ? "bg-lavender text-night" : "bg-night text-white")}>
      {breadcrumbs.length > 1 && <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />}
      {/* Lueur rouge sur toute la partie basse (passe derrière les chiffres clés), touche d'eau en haut à droite. */}
      <div aria-hidden="true" className="v2-glow" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[460px] w-[460px] rounded-full bg-water/25 blur-[120px]" />

      <div className="container pb-10 pt-24 sm:pt-28 lg:pb-14 lg:pt-32">
        {breadcrumbs.length > 1 && (
        <nav aria-label="Fil d'Ariane" className="text-[13px]">
          <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", light ? "text-night/55" : "text-white/55")}>
            {breadcrumbs.map((crumb, index) => {
              const last = index === breadcrumbs.length - 1;
              return (
                <li key={crumb.href} className="flex items-center gap-2">
                  {last ? (
                    <span aria-current="page" className={light ? "text-night/85" : "text-white/85"}>
                      {crumb.label}
                    </span>
                  ) : (
                    <>
                      <Link href={crumb.href} className={cn("transition-colors", light ? "hover:text-night" : "hover:text-white")}>
                        {crumb.label}
                      </Link>
                      <FaChevronRight className="h-2 w-2 opacity-50" aria-hidden="true" />
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        )}

        <div className="mt-7 grid items-center gap-12 lg:mt-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Eyebrow tone={light ? "dark" : "light"}>{eyebrow}</Eyebrow>
            <h1 className={cn("v2-title mt-5 text-[2.05rem] sm:text-[2.6rem] lg:text-[2.75rem] xl:text-[3.2rem]", light ? "text-night" : "text-white")}>
              {fr(title)}
            </h1>
            <p className={cn("mt-5 max-w-2xl text-base leading-relaxed lg:text-[17px]", light ? "text-night/70" : "text-white/70")}>{fr(intro)}</p>

            {/* Le téléphone est l'action n°1 du site ; la 2e action dépend de l'intention de la page. */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <PhoneButton variant="primary" className="min-h-[56px] px-7 text-base" />
              <ButtonLink href={secondary.href} variant="light" arrow className="min-h-[56px] px-7 text-base">
                {secondary.label}
              </ButtonLink>
            </div>

            <ul className={cn("mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm", light ? "text-night/80" : "text-white/80")}>
              <li>
                <a
                  href={company.google.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("group inline-flex items-center gap-2", light ? "hover:text-night" : "hover:text-white")}
                >
                  <span className="flex text-bolt" aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar key={i} className="h-3.5 w-3.5" />
                    ))}
                  </span>
                  <span className="underline-offset-4 group-hover:underline">
                    <strong className={cn("font-semibold", light ? "text-night" : "text-white")}>{company.google.rating}/5</strong> · {company.google.reviewCount} avis Google
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-water-light" />
                {company.promises.warranty}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-water-light" />
                {company.promises.quote}
              </li>
            </ul>

            {quick && <Shortcuts {...quick} light={light} />}
          </div>

          {(panel || image) && (
            <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
              {panel ?? (
                <>
                  <MediaSlot
                    image={image}
                    video={video}
                    priority
                    sizes="(min-width: 1024px) 42vw, 92vw"
                    className={cn("aspect-[4/5] rounded-[28px] ring-1 max-lg:aspect-[4/3]", light ? "ring-night/10" : "ring-white/10")}
                  />
                  {resolvePhoto(image) && (
                    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 rounded-b-[28px] bg-gradient-to-t from-night/50 to-transparent" />
                  )}
                  <span aria-hidden="true" className="v2-energy absolute -bottom-px left-8 right-8 h-[3px] rounded-full" />
                </>
              )}
            </div>
          )}
        </div>

        {facts.length > 0 && (
          <dl
            className={cn(
              "mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl ring-1 backdrop-blur-md lg:mt-16 lg:grid-cols-4",
              light ? "bg-night/10 ring-night/10" : "bg-white/15 ring-white/15"
            )}
          >
            {facts.map((fact) => (
              <div key={fact.stat} className={cn("px-5 py-5 lg:px-6", light ? "bg-white/75" : "bg-night/75")}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <p className={cn("v2-semi font-display text-lg font-bold leading-tight lg:text-xl", light ? "text-night" : "text-white")}>
                    {fact.stat}
                  </p>
                  <p className={cn("mt-1 text-sm", light ? "text-night/60" : "text-white/55")}>{fact.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

/** Raccourcis en pastilles, séparés des boutons par un filet : présents mais discrets. */
function Shortcuts({ label, links, light }: HeroShortcuts & { light: boolean }) {
  return (
    <div className={cn("mt-7 max-w-xl border-t pt-6", light ? "border-night/10" : "border-white/10")}>
      <p className={cn("text-[13px] font-semibold", light ? "text-night/60" : "text-white/60")}>{fr(label)}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "group inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 transition-colors",
                light ? "bg-white/70 text-night ring-night/10 hover:bg-white hover:ring-night/25" : "bg-white/5 text-white ring-white/15 hover:bg-white/10"
              )}
            >
              {link.label}
              <BsArrowRight className="h-3.5 w-3.5 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:text-flame group-hover:opacity-100" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { FaEnvelope, FaStar } from "react-icons/fa";
import logo from "@/assets/logo.png";
import { CookieSettingsButton } from "@/components/site/CookieConsent";
import { fr } from "@/lib/typography";
import { company, contactActionHref } from "@/app/data/company";
import { getNavGroups, type NavGroup } from "@/app/data/navigation";
import { cn } from "@/lib/utils";
import { ButtonLink, Eyebrow, PhoneButton, type Surface } from "./ui";

/* ------------------------------------------------------------------ */
/* Appel à l'action final                                              */
/* ------------------------------------------------------------------ */

/** Titre avec un passage mis en avant (ex. « (presque) »). */
function Highlighted({ title, highlight, className }: { title: string; highlight?: string; className: string }) {
  const text = fr(title);
  if (!highlight || !text.includes(highlight)) return <>{text}</>;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className={className}>{highlight}</span>
      {after}
    </>
  );
}

export function FinalCtaV2({
  eyebrow,
  title,
  highlight,
  body,
  image,
  imageAlt,
  context,
  tone = "lavender",
  secondary = "devis",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  body?: string;
  image: StaticImageData;
  imageAlt: string;
  /** Page d'origine transmise au devis / rendez-vous (absente sur les pages générales). */
  context?: string;
  /** lavender : toutes les pages depuis le 2026-10-05 · flame : aplat rouge, conservé mais plus utilisé. */
  tone?: "flame" | "lavender";
  secondary?: "devis" | "rendezVous";
}) {
  const flame = tone === "flame";
  const second =
    secondary === "rendezVous"
      ? { href: contactActionHref("rendezVous", context), label: "Prendre rendez-vous" }
      : { href: contactActionHref("devis", context), label: "Demander un devis gratuit" };
  return (
    <section
      className={cn("relative isolate overflow-hidden", flame ? "v2-flame-solid text-white" : "bg-lavender text-night")}
      aria-labelledby="cta-final-titre"
    >
      {!flame && <div aria-hidden="true" className="v2-glow" />}
      <div className="container grid items-end gap-6 pt-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12 lg:pt-24">
        <div className="pb-10 lg:pb-24">
          <Eyebrow tone={flame ? "light" : "dark"} className={flame ? "text-white/80" : undefined}>
            {eyebrow}
          </Eyebrow>
          <h2
            id="cta-final-titre"
            className={cn("v2-title mt-5 text-[2.1rem] sm:text-[3rem] lg:text-[3.6rem]", flame ? "text-white" : "text-night")}
          >
            <Highlighted title={title} highlight={highlight} className={flame ? "text-night" : "text-flame"} />
          </h2>
          {body && (
            <p className={cn("mt-6 max-w-2xl text-[17px] leading-relaxed", flame ? "font-medium text-white" : "text-night/75")}>{fr(body)}</p>
          )}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {/* Sur l'aplat orange : appel en blanc (texte noir), 2e action en noir. */}
            <PhoneButton variant={flame ? "light" : "primary"} className="min-h-[56px] px-7 text-base font-bold" />
            <ButtonLink href={second.href} variant={flame ? "dark" : "light"} arrow className="min-h-[56px] px-7 text-base">
              {second.label}
            </ButtonLink>
          </div>
          <p className={cn("mt-5 text-sm font-medium", flame ? "text-white" : "text-night/70")}>
            Pas le temps maintenant ?{" "}
            <Link
              href={contactActionHref("rappel", context)}
              className={cn("font-semibold underline underline-offset-4 hover:no-underline", flame ? "text-white" : "text-night")}
            >
              Être rappelé
            </Link>
          </p>
        </div>
        <div className="relative mx-auto h-[340px] w-[260px] sm:h-[420px] sm:w-[320px] lg:h-[540px] lg:w-full">
          <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 420px, 320px" className="object-contain object-bottom drop-shadow-[0_30px_40px_rgba(11,18,34,0.35)]" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pied de page                                                        */
/* ------------------------------------------------------------------ */

const companyLinks = [
  { label: "Accueil", href: "/" },
  { label: "Demander un devis", href: "/devis" },
  { label: "Prendre rendez-vous", href: "/rendez-vous" },
  { label: "Nos tarifs", href: "/tarifs" },
  { label: "Syndics & copropriétés", href: "/professionnels" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

function FooterColumn({
  title,
  href,
  links,
  light,
}: {
  title: string;
  href?: string;
  links: { label: string; href: string }[];
  light?: boolean;
}) {
  return (
    <div>
      <p className={cn("v2-semi font-display text-sm font-bold", light ? "text-night" : "text-white")}>
        {href ? (
          <Link href={href} className={light ? "hover:text-flame" : "hover:text-bolt"}>
            {title}
          </Link>
        ) : (
          title
        )}
      </p>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={cn("transition-colors", light ? "text-night/65 hover:text-night" : "text-white/60 hover:text-white")}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Footer bleu nuit (demande du 2026-10-05) ; « lavender » reste disponible. */
export function FooterV2({ surface = "night" }: { surface?: Surface }) {
  const groups = getNavGroups();
  const group = (category: NavGroup["category"]) => groups.find((g) => g.category === category)!;
  const own = (g: NavGroup) => g.items.filter((item) => item.href.startsWith(g.href));
  const light = surface === "lavender";
  const muted = light ? "text-night/65 hover:text-night" : "text-white/70 hover:text-white";

  return (
    <footer className={cn("pb-24 text-sm lg:pb-0", light ? "bg-lavender text-night" : "bg-night text-white")}>
      <div className="v2-energy h-[3px]" aria-hidden="true" />
      <div className="container py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Radialec — accueil">
              <Image src={logo} alt="" height={48} width={43} />
              <span className={cn("font-sans text-[28px] font-extrabold tracking-tight", light && "text-ink")}>Radialec</span>
            </Link>
            <p className={cn("mt-5 max-w-sm text-[15px] leading-relaxed", light ? "text-night/65" : "text-white/60")}>{company.description}</p>
            <PhoneButton variant="primary" className="mt-8 min-h-[52px] px-6 text-base" />
            <p className={cn("mt-3", light ? "text-night/55" : "text-white/50")}>
              {company.promises.availability} · {company.promises.intervention.toLowerCase()}
            </p>
            <a href={`mailto:${company.email}`} className={cn("mt-5 inline-flex items-center gap-3", muted)}>
              <FaEnvelope className="h-3.5 w-3.5" aria-hidden="true" />
              {company.email}
            </a>
            {company.address && (
              // Siège social uniquement : pas d'accueil du public (Q20).
              <p className={cn("mt-5", light ? "text-night/65" : "text-white/60")}>
                <span className={cn("block text-xs font-semibold uppercase tracking-[0.14em]", light ? "text-night/45" : "text-white/40")}>
                  Siège social
                </span>
                {company.address.street}, {company.address.postalCode} {company.address.city}
              </p>
            )}
            <a
              href={company.google.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("mt-5 flex w-fit items-center gap-2", muted)}
            >
              <span className="flex text-bolt" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar key={i} className="h-3 w-3" />
                ))}
              </span>
              {company.google.rating}/5 sur Google
            </a>
          </div>

          <nav aria-label="Plan du site" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            <FooterColumn title="Chauffage" href="/chauffage" links={group("chauffage").items} light={light} />
            <FooterColumn title="Électricité" href="/electricite" links={group("electricite").items} light={light} />
            <div className="space-y-10">
              <FooterColumn title="Climatisation" href="/climatisation" links={own(group("climatisation"))} light={light} />
              <FooterColumn title="Plomberie" href="/plomberie" links={group("plomberie").items} light={light} />
            </div>
            <FooterColumn title="Radialec" links={companyLinks} light={light} />
          </nav>
        </div>

        <p className={cn("mt-14 max-w-3xl leading-relaxed", light ? "text-night/55" : "text-white/45")}>
          {fr(
            "Chauffagiste, électricien et plombier à Bruxelles : intervention dans les 19 communes de la Région bruxelloise, en Brabant flamand (Rhode-Saint-Genèse, Wezembeek-Oppem, Kraainem, Tervuren, Overijse…) et en Brabant wallon (Waterloo, Lasne, La Hulpe, Rixensart…)."
          )}
        </p>
      </div>

      <div className={cn("border-t", light ? "border-night/10" : "border-white/10")}>
        <div className={cn("container flex flex-col items-center justify-between gap-4 py-6 sm:flex-row", light ? "text-night/55" : "text-white/50")}>
          <p>
            &copy; {new Date().getFullYear()} {company.name}. Tous droits réservés.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <li>
              <Link href="/mentions-legales" className={light ? "hover:text-night" : "hover:text-white"}>
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className={light ? "hover:text-night" : "hover:text-white"}>
                Confidentialité
              </Link>
            </li>
            <li>
              <Link href="/cookies" className={light ? "hover:text-night" : "hover:text-white"}>
                Cookies
              </Link>
            </li>
            <li>
              <CookieSettingsButton className={light ? "hover:text-night" : "hover:text-white"} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

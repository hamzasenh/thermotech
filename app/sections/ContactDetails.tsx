import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconKey } from "@/components/site/Icon";
import { MissingInfo } from "@/components/site/MissingInfo";
import { Stars } from "@/components/site/GoogleRating";
import { SectionHeading } from "@/components/site/SectionHeading";
import { company } from "../data/company";
import { cn } from "@/lib/utils";
import { cardBg, toneBg, type Tone } from "./v2/tones";
import { PhoneButton } from "./v2/ui";

function Row({ icon, label, children, tone }: { icon: IconKey; label: string; children: ReactNode; tone: Tone }) {
  return (
    <li className="flex gap-4 border-b border-ink/10 py-5 last:border-0">
      <span className={cn("inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl text-night", cardBg[tone])}>
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-ink/50">{label}</p>
        <div className="mt-1 text-ink">{children}</div>
      </div>
    </li>
  );
}

/**
 * Coordonnées (source : app/data/company.ts). Pas d'adresse ni de carte : le
 * siège social n'accueille pas le public (Q20) ; il figure dans le pied de page
 * et les mentions légales.
 */
export function ContactDetails({ tone = "white" }: { tone?: Tone }) {
  const { email, hours, google } = company;

  return (
    <section className={cn("py-16 lg:py-24", toneBg[tone])} aria-labelledby="coordonnees">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="coordonnees"
              title="Nos coordonnées"
              intro="Le plus rapide reste le téléphone : un technicien vous répond et organise l'intervention."
              align="left"
              size="md"
            />
          </div>
          <div>
            <ul className="lg:-mt-5">
              <Row tone={tone} icon="phone" label="Téléphone">
                <PhoneButton variant="primary" className="mt-1 min-h-[48px] px-5 text-base" />
                <p className="mt-2 text-sm text-night/60">
                  {company.promises.availability} · {company.promises.intervention.toLowerCase()}
                </p>
              </Row>
              <Row tone={tone} icon="envelope" label="E-mail">
                <a href={`mailto:${email}`} className="font-semibold text-navy underline-offset-4 hover:underline">
                  {email}
                </a>
              </Row>
              <Row tone={tone} icon="clock" label="Horaires">
                <p className="font-semibold">Disponible {hours.summary}</p>
                {hours.detail ? (
                  <p className="text-sm text-ink/70">{hours.detail}</p>
                ) : (
                  <div className="mt-1">
                    <MissingInfo>À fournir : horaires détaillés (ex. lun–ven 7h30–19h, week-end sur urgence)</MissingInfo>
                  </div>
                )}
              </Row>
              <Row tone={tone} icon="home" label="Zone d'intervention">
                Les 19 communes bruxelloises, le Brabant flamand et le Brabant wallon —{" "}
                <Link href="#zones" className="font-semibold text-navy underline underline-offset-2 hover:text-flame">
                  voir toutes les communes
                </Link>
              </Row>
              <Row tone={tone} icon="award" label="Avis clients">
                <a href={google.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2">
                  <Stars />
                  <span className="font-semibold group-hover:underline">
                    {google.rating}/5 sur Google
                  </span>
                </a>
              </Row>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

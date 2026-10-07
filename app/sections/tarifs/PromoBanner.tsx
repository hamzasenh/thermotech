import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import chaudiereAccueil from "@/assets/refonte/chaudiere-accueil.png";
import { fr } from "@/lib/typography";
import { contactActionHref } from "../../data/company";
import { prices, pricingPolicy } from "../../data/pricing";
import { cn } from "@/lib/utils";
import { toneBg, type Tone } from "../v2/tones";
import { ButtonLink, Eyebrow } from "../v2/ui";

/**
 * Rappel saisonnier : entretien chaudière gaz (prix issu de pricing.ts ; mention de
 * validité seulement si pricingPolicy.promoValidity est renseigné).
 * Carte lavande sans fond propre : elle prolonge la section précédente (v2/tones.ts).
 */
export function PromoBanner({ tone = "white", attached }: { tone?: Tone; attached?: boolean }) {
  const { amount } = prices.entretienChaudiereGaz;

  return (
    <section className={cn(toneBg[tone], attached ? "pb-16 lg:pb-28" : "py-16 lg:py-24")} aria-labelledby="offre-du-moment">
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-lavender px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <div aria-hidden="true" className="v2-glow" />
          <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <Eyebrow>Avant l&apos;hiver</Eyebrow>
              <h2 id="offre-du-moment" className="v2-title mt-5 text-[2rem] lg:text-[2.8rem]">
                {fr("L'hiver arrive, faites entretenir votre chaudière !")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-night/75">
                Entretien de chaudière gaz à{" "}
                <strong className="v2-semi font-display text-2xl font-bold tabular-nums text-night">{amount}€</strong> TVAC{pricingPolicy.promoValidity ? ` (${pricingPolicy.promoValidity.toLowerCase()})` : ""} : contrôle complet, tests de sécurité et
                attestation remise le jour même.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={contactActionHref("rendezVous", "chauffage/entretien-chaudiere")} variant="dark" arrow>
                  Réserver mon entretien
                </ButtonLink>
                <Link
                  href="/chauffage/entretien-chaudiere"
                  className="group inline-flex items-center justify-center gap-1.5 px-2 py-3 font-semibold text-night underline-offset-4 hover:underline"
                >
                  Pourquoi c&apos;est obligatoire
                  <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[200px] md:max-w-[240px]">
              <Image src={chaudiereAccueil} alt="Chaudière murale gaz à condensation" sizes="240px" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

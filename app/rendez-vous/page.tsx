import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GoogleRating } from "@/components/site/GoogleRating";
import { Icon } from "@/components/site/Icon";
import { pageMetadata } from "@/lib/seo";
import { fr } from "@/lib/typography";
import { categoryLabels, categoryOrder } from "../data/categories";
import { company, onlineBooking } from "../data/company";
import { services } from "../data/services";
import { BookingPanel } from "../sections/booking/BookingPanel";
import { ProofV2, ZonesV2 } from "../sections/v2/blocks";
import { backgrounds } from "../sections/v2/tones";
import { Eyebrow } from "../sections/v2/ui";

export const metadata = pageMetadata({
  title: "Prendre rendez-vous en ligne à Bruxelles",
  description:
    "Réservez en ligne l'entretien de votre chaudière à Bruxelles, ou laissez votre numéro pour être rappelé : Radialec, chauffage, électricité, plomberie et climatisation.",
  path: "/rendez-vous",
});

// Libellés des pages d'où peut partir un « Prendre rendez-vous » (?service=).
const originLabels: Record<string, string> = Object.fromEntries([
  ...services.map((s) => [`${s.category}/${s.slug}`, s.name]),
  ...categoryOrder.map((c) => [c, categoryLabels[c]]),
]);

export default function RendezVousPage() {
  const bg = backgrounds();
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lavender pb-16 pt-24 sm:pt-28 md:pb-24 lg:pt-32">
        <div aria-hidden="true" className="v2-glow" />
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Prendre rendez-vous", href: "/rendez-vous" },
            ]}
          />

          <div className="mb-10 mt-8 max-w-3xl md:mb-12 md:mt-10">
            <Eyebrow>Rendez-vous · Bruxelles et environs</Eyebrow>
            <h1 className="v2-title mt-5 text-[2.1rem] sm:text-[2.7rem] lg:text-[3.4rem]">
              {fr("Prenez rendez-vous avec Radialec")}
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-night/70 lg:text-lg">
              {fr(
                "Choisissez votre créneau directement dans notre agenda. Pour une prestation qui ne se réserve pas encore en ligne, laissez votre numéro : nous vous rappelons pour fixer le rendez-vous."
              )}
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-ink">
              <li>
                <GoogleRating />
              </li>
              <li className="flex items-center gap-2">
                <Icon name="users" className="h-4 w-4 text-navy" />
                {company.promises.clients}
              </li>
              <li className="flex items-center gap-2">
                <Icon name="map" className="h-4 w-4 text-navy" />
                <a href="#zones" className="underline-offset-4 hover:underline">
                  Vérifier que votre commune est desservie
                </a>
              </li>
            </ul>
          </div>

          <BookingPanel
            events={onlineBooking.events}
            defaultEvent={onlineBooking.defaultEvent}
            brandColor={onlineBooking.brandColor}
            labels={originLabels}
          />
        </div>
      </section>

      <ProofV2 tone={bg.next()} />
      <ZonesV2 tone={bg.next()} />
    </>
  );
}

import { MissingInfo } from "@/components/site/MissingInfo";
import { pageMetadata } from "@/lib/seo";
import { company } from "../data/company";
import type { Fact } from "../data/services/types";
import { PageHeader } from "../sections/PageHeader";
import { ProofV2, ZonesV2 } from "../sections/v2/blocks";
import { FinalCtaV2 } from "../sections/v2/chrome";
import { TrustStripV2 } from "../sections/v2/content";
import { finalCtaVisual } from "../sections/v2/cta";
import { MediaSlot } from "../sections/v2/media";
import { cn } from "@/lib/utils";
import { backgrounds, toneBg } from "../sections/v2/tones";
import { PhoneButton, SectionTitle } from "../sections/v2/ui";

export const metadata = pageMetadata({
  title: "À propos de Radialec, chauffagiste à Bruxelles",
  description: `Radialec : chauffage, électricité, plomberie et climatisation à Bruxelles et ses environs. ${company.promises.availability}, ${company.promises.intervention.toLowerCase()}, ${company.promises.warranty.toLowerCase()}.`,
  path: "/a-propos",
});

// Uniquement des promesses validées (app/data/company.ts).
const engagements: Fact[] = [
  { icon: "clock", stat: `Disponible ${company.promises.availability}`, label: "Week-end compris" },
  { icon: "stopwatch", stat: company.promises.intervention, label: "À Bruxelles et en périphérie" },
  { icon: "clipboard", stat: company.promises.quote, label: "Gratuit et sans engagement" },
  { icon: "shield", stat: company.promises.warranty, label: "Sur nos pièces et interventions" },
];

export default function AProposPage() {
  const visual = finalCtaVisual.installation;
  // Fonds blanc / beige en alternance, dans l'ordre des sections (voir sections/v2/tones.ts).
  const bg = backgrounds();
  const tones = { story: bg.next(), trust: bg.next(), proof: bg.next(), zones: bg.next() };
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "À propos", href: "/a-propos" },
        ]}
        eyebrow="À propos · Bruxelles et environs"
        title="Radialec, votre technicien à Bruxelles"
        intro="Chauffage, électricité, plomberie, climatisation : un seul interlocuteur pour tout votre habitat, joignable 7j/7."
      >
        <div className="mt-8">
          <PhoneButton variant="primary" className="min-h-[56px] px-7 text-base" />
        </div>
      </PageHeader>

      <section className={cn("py-16 lg:py-24", toneBg[tones.story])} aria-labelledby="histoire-titre">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <SectionTitle id="histoire-titre" eyebrow="Qui sommes-nous" title="Un seul interlocuteur pour tout votre habitat" />
            <div className="mt-6 space-y-4">
              <MissingInfo>
                À fournir (Q26) : date de création, nombre de techniciens, prénom et parcours du fondateur, passage de ThermoTech à
                Radialec.
              </MissingInfo>
              <MissingInfo>À fournir (Q20) : adresse du siège ou de l&apos;atelier.</MissingInfo>
            </div>
          </div>
          <MediaSlot asset="P62" sizes="(min-width: 1024px) 45vw, 92vw" className="aspect-[3/2] rounded-[28px]" />
        </div>
      </section>

      <TrustStripV2 items={engagements} eyebrow="Nos engagements" tone={tones.trust} />

      <ProofV2
        tone={tones.proof}
        footnote={
          <MissingInfo>À fournir (Q25) : intitulés exacts et numéros des agréments (Bruxelles Environnement, VEKA, AwAC).</MissingInfo>
        }
      />

      <ZonesV2 tone={tones.zones} />
      <FinalCtaV2
        eyebrow="Parlons de votre projet"
        title="Un projet d'installation ? Votre devis, sans mauvaise surprise."
        image={visual.image}
        imageAlt={visual.alt}
      />
    </>
  );
}

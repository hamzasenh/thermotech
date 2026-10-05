import { JsonLd } from "@/components/site/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { company } from "../data/company";
import { prices } from "../data/pricing";
import type { FaqItem } from "../data/services/types";
import { ContactActions } from "../sections/ContactActions";
import { ContactDetails } from "../sections/ContactDetails";
import { PageHeader } from "../sections/PageHeader";
import { CallbackForm } from "../sections/CallbackForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CallBandV2, ZonesV2 } from "../sections/v2/blocks";
import { FaqV2 } from "../sections/v2/FaqV2";
import { cn } from "@/lib/utils";
import { backgrounds, toneBg } from "../sections/v2/tones";
import { PhoneButton } from "../sections/v2/ui";

export const metadata = pageMetadata({
  title: "Contact et devis gratuit à Bruxelles",
  description:
    "Devis gratuit sous 24h, rendez-vous en ligne ou rappel : contactez Radialec pour votre chauffage, électricité ou plomberie à Bruxelles, 7j/7.",
  path: "/contact",
});

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Le devis est-il vraiment gratuit ?",
    answer:
      "Oui. Le devis est gratuit et sans engagement, et vous le recevez sous 24h. Le prix annoncé est le prix payé : pas de frais cachés sur la facture.",
  },
  {
    id: 2,
    question: "Dans quel délai pouvez-vous intervenir ?",
    answer: `Nous intervenons sous 24h, 7j/7, à Bruxelles et en périphérie. Pour une urgence, le plus rapide est de nous appeler au **${company.phone.display}**.`,
  },
  {
    id: 3,
    question: "Combien coûte un dépannage ?",
    answer: `Le dépannage est facturé ${prices.depannage.amount}€ TVAC, déplacement, diagnostic et première heure compris. Si une réparation supplémentaire est nécessaire, le prix vous est annoncé avant toute intervention. Voir [tous nos tarifs](/tarifs).`,
  },
  {
    id: 4,
    question: "Quelles communes desservez-vous ?",
    answer:
      "Les 19 communes de la Région bruxelloise, ainsi qu'une partie du Brabant flamand et du Brabant wallon : [voir la liste complète](#zones).",
  },
  {
    id: 5,
    question: "Intervenez-vous pour les syndics et les copropriétés ?",
    answer:
      "Oui, nous accompagnons syndics et gestionnaires pour les installations des parties communes : [découvrir nos services pour professionnels](/professionnels).",
  },
  {
    id: 6,
    question: "Que préparer avant de nous appeler ?",
    answer:
      "Si possible, la marque et le modèle de l'appareil, une description du problème (code erreur, bruit, fuite…) et une photo. Cela nous aide à poser un premier diagnostic et à venir avec le bon matériel.",
  },
];

export default function ContactPage() {
  // Fonds blanc / beige en alternance, dans l'ordre des sections (voir sections/v2/tones.ts).
  const bg = backgrounds();
  const tones = { actions: bg.next(), rappel: bg.next(), band: bg.attach(), details: bg.next(), zones: bg.next(), faq: bg.next() };

  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHeader
        breadcrumbs={[
          { label: "Accueil", href: "/" },
          { label: "Contact", href: "/contact" },
        ]}
        eyebrow="Contact · Bruxelles et environs"
        title="Contactez Radialec, votre technicien à Bruxelles"
        intro="Chauffage, électricité, plomberie, climatisation : un seul interlocuteur, joignable 7j/7. Choisissez ce qui vous convient, on s'occupe du reste."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <PhoneButton variant="primary" className="min-h-[60px] px-8 text-lg" />
          <p className="text-sm text-night/60">
            {company.promises.availability} · {company.promises.intervention.toLowerCase()}
          </p>
        </div>
      </PageHeader>
      <ContactActions tone={tones.actions} />

      <section
        id="formulaire-rappel"
        className={cn("scroll-mt-24 py-16 lg:py-24", toneBg[tones.rappel])}
        aria-labelledby="rappel-titre"
      >
        <div className="container grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="rappel-titre"
              eyebrow="Être rappelé"
              title="Laissez votre numéro, on vous rappelle"
              intro={`Pas le temps d'appeler maintenant ? Indiquez quand vous êtes joignable : nous vous rappelons${
                company.promises.callback ? ` ${company.promises.callback}` : ""
              } pour répondre à votre question ou organiser l'intervention. Sans engagement.`}
              align="left"
              size="md"
            />
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-night/70">
              Une panne en cours ? Appelez plutôt :
              <PhoneButton variant="primary" className="min-h-[44px] px-4 text-sm" />
            </p>
          </div>
          <div className="rounded-[28px] bg-white p-6 ring-1 ring-night/[0.06] sm:p-8">
            <CallbackForm />
          </div>
        </div>
      </section>
      <CallBandV2
        intent="urgence"
        title="Une urgence ? N'attendez pas de formulaire."
        text="Panne de chauffage, fuite d'eau, coupure de courant : appelez-nous directement. Nous intervenons 7j/7, sous 24h, à Bruxelles et en périphérie."
        tone={tones.band.tone}
        attached={tones.band.attached}
      />
      <ContactDetails tone={tones.details} />
      <ZonesV2 tone={tones.zones} />
      <FaqV2 faqs={faqs} title="Questions fréquentes" rappelHref="/contact#formulaire-rappel" tone={tones.faq} />
    </>
  );
}

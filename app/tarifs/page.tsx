import localFont from "next/font/local";
import { BsArrowDown } from "react-icons/bs";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GoogleRating } from "@/components/site/GoogleRating";
import { JsonLd } from "@/components/site/JsonLd";
import { absoluteUrl, BUSINESS_ID, faqJsonLd, pageMetadata } from "@/lib/seo";
import { fr } from "@/lib/typography";
import { prices } from "../data/pricing";
import type { Fact, FaqItem } from "../data/services/types";
import { getPolicyRows, getTarifGroups } from "../data/tarifs";
import { resolveCta } from "../sections/ctaDefaults";
import { PriceMenu } from "../sections/tarifs/PriceMenu";
import { PromoBanner } from "../sections/tarifs/PromoBanner";
import { QuoteProcess } from "../sections/tarifs/QuoteProcess";
import { FinalCtaV2 } from "../sections/v2/chrome";
import { TrustStripV2 } from "../sections/v2/content";
import { finalCtaVisual } from "../sections/v2/cta";
import { FaqV2 } from "../sections/v2/FaqV2";
import { backgrounds } from "../sections/v2/tones";
import { ButtonLink, Eyebrow, PhoneButton } from "../sections/v2/ui";
import { contactActionHref } from "../data/company";

// Chargée uniquement sur cette page : chiffres de la carte des prix.
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const year = new Date().getFullYear();
const p = prices;

export const metadata = pageMetadata({
  title: `Tarifs ${year} : chauffagiste et plombier à Bruxelles`,
  description: `Entretien chaudière gaz ${p.entretienChaudiereGaz.amount}€, dépannage ${p.depannage.amount}€ déplacement compris, débouchage ${p.debouchage.amount}€ : tous nos prix TVAC à Bruxelles, sans frais cachés.`,
  path: "/tarifs",
});

const engagements: Fact[] = [
  { icon: "euro", stat: "Prix TVAC affichés", label: "Entretiens et dépannages à prix fixe" },
  { icon: "handshake", stat: "Rien sans votre accord", label: "Tout supplément annoncé avant l'intervention" },
  { icon: "clipboard", stat: "Devis gratuit sous 24h", label: "Pour toute installation, sans engagement" },
  { icon: "shield", stat: "Garantie 2 ans", label: "Sur nos pièces et interventions" },
];

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Combien coûte un entretien de chaudière à Bruxelles ?",
    answer: `${p.entretienChaudiereGaz.amount}€ TVAC pour une chaudière gaz et ${p.entretienChaudiereMazout.amount}€ TVAC pour une chaudière mazout. Contrôle complet, tests de sécurité et attestation remise le jour même compris. [En savoir plus sur l'entretien](/chauffage/entretien-chaudiere).`,
  },
  {
    id: 2,
    question: "Quel est le prix d'un dépannage ?",
    answer: `${p.depannage.amount}€ TVAC, déplacement, diagnostic et première heure compris — que la panne touche votre chaudière, votre sanitaire, votre électricité ou votre clim / PAC. Si une pièce ou du temps supplémentaire est nécessaire, le prix vous est annoncé avant toute intervention.`,
  },
  {
    id: 3,
    question: "Combien coûte un débouchage de canalisation ?",
    answer: `${p.debouchage.amount}€ TVAC pour déboucher un évier, un lavabo ou un WC. [Tout savoir sur le débouchage](/plomberie/debouchage).`,
  },
  {
    id: 4,
    question: "Quel est le prix de l'entretien d'une pompe à chaleur ?",
    answer: `${p.entretienPac.amount}€ TVAC. Un entretien régulier préserve le rendement de votre PAC et sa durée de vie : [voir le détail](/climatisation/entretien-climatisation).`,
  },
  {
    id: 5,
    question: "Combien coûte l'entretien d'un chauffe-eau ou d'un boiler ?",
    answer: `${p.entretienChauffeEau.amount}€ TVAC pour un chauffe-eau et ${p.entretienBoilerElectrique.amount}€ TVAC pour un boiler électrique. [Chauffe-eau et boiler : ce que nous contrôlons](/chauffage/entretien-chauffe-eau-boiler).`,
  },
  {
    id: 6,
    question: "Vos prix sont-ils TVA comprise ?",
    answer: "Oui, tous les prix affichés sur notre site sont TVAC : c'est le montant que vous payez.",
  },
  {
    id: 7,
    question: "Pourquoi certains services sont-ils « sur devis » ?",
    answer:
      "Une installation ou une rénovation dépend de votre logement : puissance, emplacement, état de l'existant. Nous préférons un devis précis à un prix d'appel trompeur. Il est gratuit, sans engagement, et vous le recevez sous 24h : [demander un devis](/contact#devis).",
  },
  {
    id: 8,
    question: "Y a-t-il des frais cachés ?",
    answer: "Non. Le prix annoncé est le prix payé, et rien n'est facturé sans votre accord préalable.",
  },
  {
    id: 9,
    question: "Vos interventions sont-elles garanties ?",
    answer:
      "Oui, nos pièces et nos interventions sont couvertes par une garantie de 2 ans. Pour une nouvelle chaudière, la garantie fabricant de 2 ans sur les pièces s'ajoute à notre garantie de 2 ans sur la pose.",
  },
];

export default function TarifsPage() {
  const groups = getTarifGroups();
  const cta = resolveCta("installation", {
    body: "Installation, remplacement ou rénovation : décrivez-nous votre projet, nous revenons vers vous avec un devis détaillé sous 24h. Gratuit, sans engagement, et le prix annoncé est le prix payé.",
  });

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `Tarifs Radialec ${year} — chauffage, plomberie, électricité, climatisation à Bruxelles`,
    url: absoluteUrl("/tarifs"),
    itemListElement: groups.flatMap((group) =>
      group.lines
        .filter((line) => line.amount !== undefined)
        .map((line) => ({
          "@type": "Offer",
          name: line.label,
          url: absoluteUrl(line.href),
          price: line.amount,
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: line.amount,
            priceCurrency: "EUR",
            valueAddedTaxIncluded: true,
          },
          offeredBy: { "@id": BUSINESS_ID },
          itemOffered: { "@type": "Service", name: line.serviceName, areaServed: "Bruxelles" },
        }))
    ),
  };

  // Fonds blanc / beige en alternance, dans l'ordre des sections (voir sections/v2/tones.ts).
  const bg = backgrounds();
  const tones = { menu: bg.next(), trust: bg.next(), promo: bg.attach(), process: bg.next(), faq: bg.next() };

  return (
    <div className={geistMono.variable}>
      <JsonLd data={offerCatalog} />
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="relative isolate overflow-hidden bg-lavender pb-14 pt-24 sm:pt-28 lg:pb-20 lg:pt-32">
        <div aria-hidden="true" className="v2-glow" />
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Tarifs", href: "/tarifs" },
            ]}
          />
          <div className="mt-8 max-w-3xl lg:mt-10">
            <Eyebrow>{`Tarifs ${year} · Prix TVAC`}</Eyebrow>
            <h1 className="v2-title mt-5 text-[2.1rem] sm:text-[2.7rem] lg:text-[3.4rem]">
              {fr("Tarifs chauffagiste, électricien et plombier à Bruxelles")}
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-night/70 lg:text-lg">
              {fr(
                "Entretien, dépannage : le prix est affiché ici, TVA comprise, avant même que vous nous appeliez. Pour une installation, le devis est gratuit et vous l'avez sous 24h."
              )}
            </p>
            <div className="mt-6">
              <GoogleRating />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PhoneButton variant="primary" className="min-h-[56px] px-7 text-base" />
              <ButtonLink href={contactActionHref("devis")} variant="light" arrow className="min-h-[56px] px-7 text-base">
                Demander un devis gratuit
              </ButtonLink>
            </div>
          </div>

          {/* Raccourcis vers chaque métier de la carte, avec le prix d'appel */}
          <nav aria-label="Aller aux tarifs par métier" className="mt-12">
            <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {groups.map((group) => {
                const fixed = group.lines.flatMap((line) => (line.amount === undefined ? [] : [line.amount]));
                return (
                  <li key={group.id}>
                    <a
                      href={`#tarifs-${group.id}`}
                      className="group flex h-full items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-night/[0.06] transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(11,18,34,0.5)] sm:p-4"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="v2-semi block font-display font-bold leading-tight text-night">{group.shortLabel}</span>
                        <span className="mt-0.5 block text-xs font-semibold text-flame">
                          {fixed.length ? `Dès ${Math.min(...fixed)}€` : "Sur devis"}
                        </span>
                      </span>
                      <BsArrowDown
                        aria-hidden="true"
                        className="hidden h-4 w-4 flex-shrink-0 text-night/30 transition-all group-hover:translate-y-0.5 group-hover:text-flame sm:block"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </section>

      <PriceMenu groups={groups} policies={getPolicyRows()} tone={tones.menu} />
      <TrustStripV2 items={engagements} eyebrow="Nos engagements" tone={tones.trust} />
      <PromoBanner tone={tones.promo.tone} attached={tones.promo.attached} />
      <QuoteProcess tone={tones.process} />
      <FaqV2 faqs={faqs} title="Questions fréquentes sur nos tarifs" rappelHref={contactActionHref("rappel")} tone={tones.faq} />

      <FinalCtaV2
        eyebrow={cta.eyebrow}
        title={cta.title}
        body={cta.body}
        image={finalCtaVisual.installation.image}
        imageAlt={finalCtaVisual.installation.alt}
        context="chauffage"
      />
    </div>
  );
}

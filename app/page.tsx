import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import chaudiereAccueil from "@/assets/refonte/chaudiere-accueil.png";
import chaudiereIcon from "@/assets/chaudiere-icon.png";
import panelIcon from "@/assets/panel-icon.png";
import toiletIcon from "@/assets/toilet-icon.png";
import climIcon from "@/assets/clim-icon.png";
import { JsonLd } from "@/components/site/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { fr } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { company, contactActionHref } from "./data/company";
import { homeFaqs } from "./data/home";
import type { PriceRef } from "./data/pricing";
import { getServiceByRef } from "./data/services";
import type { Fact } from "./data/services/types";
import { ctaDefaults } from "./sections/ctaDefaults";
import { ProofV2, ZonesV2 } from "./sections/v2/blocks";
import { FinalCtaV2 } from "./sections/v2/chrome";
import { PricingV2, ServiceGridV2 } from "./sections/v2/content";
import { finalCtaVisual } from "./sections/v2/cta";
import { FaqV2 } from "./sections/v2/FaqV2";
import { ServiceHeroV2 } from "./sections/v2/ServiceHeroV2";
import { backgrounds, cardBg, toneBg } from "./sections/v2/tones";
import { SectionTitle } from "./sections/v2/ui";

export const metadata = pageMetadata({
  title: "Chauffagiste, électricien et plombier à Bruxelles | Radialec",
  description: company.description,
  path: "/",
  absoluteTitle: true,
});

// Bandeau confiance (validé, brief accueil) : chiffres clés du haut de page.
const trust: Fact[] = [
  { icon: "users", stat: company.promises.clients, label: "Ils nous recommandent partout à Bruxelles." },
  { icon: "shield", stat: company.promises.warranty, label: "Toutes nos pièces et interventions couvertes." },
  { icon: "clock", stat: company.promises.intervention, label: "Une urgence ? On est chez vous le jour même. 7/7" },
  { icon: "euro", stat: "Prix transparents", label: "Le prix annoncé est le prix payé, point final." },
];

// Les 4 métiers (brief accueil) : sous-services cliquables.
const trades: { title: string; href: string; image: StaticImageData; links: { label: string; href: string }[] }[] = [
  {
    title: "Chauffage",
    href: "/chauffage",
    image: chaudiereIcon,
    links: [
      { label: "Dépannage chaudière", href: "/chauffage/depannage-chaudiere" },
      { label: "Entretien chaudière gaz", href: "/chauffage/entretien-chaudiere" },
      { label: "Radiateurs", href: "/chauffage/installation-radiateurs" },
      { label: "Désembouage", href: "/chauffage/desembouage" },
    ],
  },
  {
    title: "Électricité",
    href: "/electricite",
    image: panelIcon,
    links: [
      { label: "Installation électrique", href: "/electricite/installation-electricite" },
      { label: "Dépannage électrique", href: "/electricite/depannage-electrique" },
      { label: "Mise en conformité", href: "/electricite/mise-en-conformite-electrique" },
      { label: "Bornes de recharge", href: "/electricite/installation-borne-recharge" },
    ],
  },
  {
    title: "Plomberie & sanitaire",
    href: "/plomberie",
    image: toiletIcon,
    links: [
      { label: "Dépannage plomberie", href: "/plomberie/depannage" },
      { label: "Détartrage", href: "/plomberie/detartrage" },
      { label: "Débouchage", href: "/plomberie/debouchage" },
    ],
  },
  {
    title: "Climatisation & pompes à chaleur",
    href: "/climatisation",
    image: climIcon,
    links: [
      { label: "Installation airco", href: "/climatisation/installation-climatisation" },
      { label: "Entretien clim & PAC", href: "/climatisation/entretien-climatisation" },
      { label: "Dépannage clim & PAC", href: "/climatisation/depannage-climatisation" },
      { label: "Pompes à chaleur (PAC)", href: "/chauffage/pompe-a-chaleur" },
    ],
  },
];

// Tarifs mis en avant (ordre et montants : app/data/pricing.ts).
const pricing: PriceRef[] = [
  { key: "entretienChaudiereGaz" },
  { key: "depannage" },
  { key: "entretienChaudiereMazout" },
  { key: "entretienChauffeEau" },
  { key: "entretienBoilerElectrique" },
  { key: "debouchage" },
  { key: "ramonage" },
  { key: "entretienPac" },
];

const boilerServices = ["chauffage/entretien-chaudiere", "chauffage/depannage-chaudiere", "chauffage/remplacement-chaudiere"] as const;

export default function Home() {
  const urgence = ctaDefaults.urgence;
  const visual = finalCtaVisual.urgence;
  // Fonds blanc / beige en alternance, dans l'ordre des sections (voir sections/v2/tones.ts).
  const bg = backgrounds();
  const tones = { boilers: bg.next(), trades: bg.next(), pricing: bg.next(), proof: bg.next(), zones: bg.next(), faq: bg.next() };

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />

      <ServiceHeroV2
        breadcrumbs={[{ label: "Accueil", href: "/" }]}
        eyebrow="Chauffagiste à Bruxelles · 7j/7"
        title="Votre chaudière, notre spécialité."
        intro="Entretien, dépannage et installation de chaudières à Bruxelles et ses environs, 7/7. Nous intervenons également pour vos équipements électriques."
        panel={
          // Chaudière détourée (ombre douce comprise) : le cœur de métier, sans cadre photo.
          <div className="relative mx-auto aspect-[743/900] w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[400px]">
            <Image
              src={chaudiereAccueil}
              alt="Chaudière murale gaz à condensation"
              fill
              priority
              sizes="(min-width: 1024px) 400px, 320px"
              className="object-contain"
            />
          </div>
        }
        facts={trust}
        context="chauffage"
        intent="installation"
        shortcuts={{
          label: "Votre chaudière est…",
          links: [
            { label: "En panne", href: "/chauffage/depannage-chaudiere" },
            { label: "À entretenir", href: "/chauffage/entretien-chaudiere" },
            { label: "À remplacer", href: "/chauffage/remplacement-chaudiere" },
            { label: "Autre besoin", href: "/#metiers" },
          ],
        }}
      />

      <ServiceGridV2
        eyebrow="Notre spécialité"
        title="Entretien, dépannage, remplacement : tout pour votre chaudière"
        featured={boilerServices.map((ref) => getServiceByRef(ref))}
        services={[]}
        tone={tones.boilers}
      />

      <section id="metiers" className={cn("scroll-mt-24 py-16 lg:py-28", toneBg[tones.trades])} aria-labelledby="metiers-titre">
        <div className="container">
          <SectionTitle
            id="metiers-titre"
            eyebrow="Nos métiers"
            title="Spécialistes en chauffage, oui mais pas que..."
            intro="Une équipe technique qualifiée au service de tout votre habitat à Bruxelles et ses environs. Découvrez notre gamme complète de prestations en chauffage, plomberie & sanitaire, climatisation et électricité."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {trades.map((trade) => (
              <li key={trade.href} className={cn("flex flex-col rounded-[28px] p-6 ring-1 ring-night/[0.06]", cardBg[tones.trades])}>
                <Link href={trade.href} className="group flex items-center justify-between gap-3">
                  <h3 className="v2-semi font-display text-xl font-bold leading-snug text-night group-hover:text-flame">{fr(trade.title)}</h3>
                  <Image src={trade.image} alt="" sizes="96px" className="h-20 w-20 flex-shrink-0 object-contain transition-transform duration-300 group-hover:scale-105" />
                </Link>
                <ul className="mt-4 divide-y divide-night/[0.07] border-t border-night/[0.07]">
                  {trade.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group flex items-center justify-between gap-3 py-3 text-[15px] text-night/80 hover:text-night">
                        {link.label}
                        <BsArrowRight className="h-4 w-4 flex-shrink-0 text-night/30 transition-all group-hover:translate-x-0.5 group-hover:text-flame" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={trade.href} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-flame hover:underline">
                  Tous les services
                  <BsArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PricingV2
        title="Tarifs chauffage, électricité et plomberie à Bruxelles"
        intro="Des interventions au juste prix, sans frais cachés ni mauvaise surprise sur votre facture. Nos techniciens qualifiés assurent des prestations soignées et durables, avec une garantie de 2 ans sur l'ensemble de nos travaux. Devis gratuit avant chaque intervention."
        items={pricing}
        tone={tones.pricing}
      />
      <ProofV2 tone={tones.proof} />
      <ZonesV2 tone={tones.zones} />
      <FaqV2 id="faqs" faqs={homeFaqs} title="Questions fréquentes" rappelHref={contactActionHref("rappel")} tone={tones.faq} />
      <FinalCtaV2
        eyebrow={urgence.eyebrow}
        title={urgence.title}
        highlight={urgence.highlight}
        body="Chaudière en panne, fuite d'eau, coupure de courant : une urgence technique ne prévient jamais. Nos techniciens agréés interviennent 7j/7 à Bruxelles et dans toute la région, avec un délai garanti sous 24h. Décrivez votre problème, on s'occupe du reste."
        image={visual.image}
        imageAlt={visual.alt}
        secondary={visual.secondary}
        context="chauffage"
      />
    </>
  );
}

import localFont from "next/font/local";
import chaudiereIcon from "@/assets/chaudiere-icon.png";
import panelIcon from "@/assets/panel-icon.png";
import toiletIcon from "@/assets/toilet-icon.png";
import climIcon from "@/assets/clim-icon.png";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GoogleRating } from "@/components/site/GoogleRating";
import { Icon } from "@/components/site/Icon";
import { JsonLd } from "@/components/site/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { fr } from "@/lib/typography";
import { company } from "../data/company";
import { categories } from "../data/categories";
import { prices, resolvePrice } from "../data/pricing";
import { getServiceByRef, type ServiceCategory } from "../data/services";
import type { FaqItem } from "../data/services/types";
import { zonesIntervention } from "../data/zones-intervention";
import { HowItWorks } from "../sections/devis/HowItWorks";
import { QuoteForm, type CategoryOption, type ServiceOption } from "../sections/devis/QuoteForm";
import { ProofV2, RelatedV2, ZonesV2 } from "../sections/v2/blocks";
import { FaqV2 } from "../sections/v2/FaqV2";
import { backgrounds } from "../sections/v2/tones";
import { Eyebrow } from "../sections/v2/ui";

// Chiffres du récapitulatif « ticket » (même esthétique que /tarifs).
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = pageMetadata({
  title: "Devis gratuit chauffage, électricité, plomberie à Bruxelles",
  description:
    "Demandez votre devis gratuit en 2 minutes : chaudière, pompe à chaleur, électricité, plomberie, climatisation à Bruxelles. Réponse sous 24h, sans engagement.",
  path: "/devis",
});

const categoryOptions: CategoryOption[] = [
  {
    id: "chauffage",
    label: "Chauffage",
    image: chaudiereIcon,
    icon: "fire",
    placeholder: "Ex. : chaudière gaz d'une quinzaine d'années à remplacer, maison 3 façades, 4 radiateurs par étage…",
  },
  {
    id: "electricite",
    label: "Électricité",
    image: panelIcon,
    icon: "bolt",
    placeholder: "Ex. : tableau à fusibles à remplacer avant la vente de la maison, contrôle RGIE prévu le mois prochain…",
  },
  {
    id: "plomberie",
    label: "Plomberie",
    image: toiletIcon,
    icon: "faucet",
    placeholder: "Ex. : évier de cuisine qui s'écoule très mal depuis une semaine, appartement au 3e étage…",
  },
  {
    id: "climatisation",
    label: "Clim & PAC",
    image: climIcon,
    icon: "snowflake",
    placeholder: "Ex. : airco réversible pour 2 chambres à l'étage, maison mitoyenne, jardin à l'arrière…",
  },
  {
    id: "professionnels",
    label: "Syndic / copropriété",
    icon: "building",
    placeholder: "Ex. : immeuble de 12 logements, entretien annuel de la chaufferie collective et du parlophone…",
  },
  {
    id: "autre",
    label: "Autre besoin",
    icon: "comments",
    placeholder: "Décrivez votre besoin : nous vous orientons vers la bonne solution.",
  },
];

// Prestations proposées pour chaque domaine : celles du hub correspondant
// (inclut les renvois croisés, ex. la PAC dans « Clim & PAC »).
const serviceOptions: ServiceOption[] = (Object.keys(categories) as ServiceCategory[]).flatMap((category) =>
  categories[category].services.map((ref) => {
    const service = getServiceByRef(ref);
    return {
      ref,
      category,
      label: service.title,
      amount: service.price ? resolvePrice(service.price).amount : undefined,
      intent: service.intent,
    };
  })
);

const communes = zonesIntervention.flatMap((zone) => zone.communes);

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "Le devis est-il vraiment gratuit ?",
    answer: "Oui. Le devis est gratuit et sans engagement : si vous ne l'acceptez pas, vous ne nous devez rien.",
  },
  {
    id: 2,
    question: "Sous quel délai vais-je recevoir mon devis ?",
    answer:
      "Un technicien vous recontacte sous 24h. Pour la plupart des demandes, vous recevez ensuite votre devis détaillé sous 24h ; un projet plus important peut demander une visite sur place au préalable.",
  },
  {
    id: 3,
    question: "Faut-il une visite technique avant le devis ?",
    answer:
      "Pas toujours. Pour un remplacement de chaudière, une installation électrique ou une pompe à chaleur, un passage sur place permet de chiffrer au plus juste. Nous vous le proposons seulement si c'est utile.",
  },
  {
    id: 4,
    question: "Quelles informations préparer ?",
    answer:
      "L'essentiel : ce qui doit être fait et où. Si vous le pouvez, ajoutez des photos (l'appareil, sa plaque signalétique, le tableau électrique…), la marque et l'âge de l'installation. Plus la demande est précise, plus le devis est juste.",
  },
  {
    id: 5,
    question: "J'ai une panne, dois-je demander un devis ?",
    answer: `Non, appelez-nous directement au **${company.phone.display}**. Le dépannage a un prix fixe de ${prices.depannage.amount}€ TVAC (déplacement, diagnostic et première heure) et nous intervenons sous 24h, 7j/7.`,
  },
  {
    id: 6,
    question: "Faites-vous des devis pour les syndics et les copropriétés ?",
    answer:
      "Oui, pour les parties communes comme pour les logements : chaufferie collective, parlophonie, colonnes, électricité des communs. [Nos services pour les professionnels](/professionnels).",
  },
  {
    id: 7,
    question: "Que devient ma demande ?",
    answer:
      "Elle est transmise directement à nos techniciens. Vos coordonnées servent uniquement à traiter votre demande de devis.",
  },
];

export default function DevisPage() {
  // Fonds blanc / beige en alternance, dans l'ordre des sections (voir sections/v2/tones.ts).
  const bg = backgrounds();
  const tones = { how: bg.next(), related: bg.next(), proof: bg.next(), faq: bg.next(), zones: bg.next() };

  return (
    <div className={geistMono.variable}>
      <JsonLd data={faqJsonLd(faqs)} />

      <section className="relative isolate overflow-hidden bg-lavender pb-16 pt-24 sm:pt-28 md:pb-24 lg:pt-32">
        <div aria-hidden="true" className="v2-glow" />
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: "Demander un devis", href: "/devis" },
            ]}
          />

          <div className="mb-10 mt-8 max-w-3xl md:mb-12 md:mt-10">
            <Eyebrow>Devis gratuit · Réponse sous 24h</Eyebrow>
            <h1 className="v2-title mt-5 text-[2.1rem] sm:text-[2.7rem] lg:text-[3.4rem]">
              {fr("Demandez votre devis gratuit à Bruxelles")}
            </h1>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-night/70 lg:text-lg">
              {fr(
                "Chauffage, électricité, plomberie, climatisation : décrivez votre besoin en 2 minutes, un technicien vous recontacte sous 24h avec un devis clair et sans engagement."
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
                <Icon name="shield" className="h-4 w-4 text-navy" />
                {company.promises.warranty}
              </li>
            </ul>
          </div>

          <QuoteForm categories={categoryOptions} services={serviceOptions} communes={communes} />
        </div>
      </section>

      <HowItWorks tone={tones.how} />
      <RelatedV2
        title="Les devis les plus demandés à Bruxelles"
        intro="Vous préférez d'abord vous renseigner ? Chaque page détaille la prestation, le déroulement et les questions fréquentes."
        refs={[
          "chauffage/remplacement-chaudiere",
          "chauffage/pompe-a-chaleur",
          "electricite/installation-borne-recharge",
          "electricite/mise-en-conformite-electrique",
          "electricite/renovation",
          "climatisation/installation-climatisation",
          "chauffage/installation-radiateurs",
          "chauffage/desembouage",
        ]}
        tone={tones.related}
      />
      <ProofV2 tone={tones.proof} />
      <FaqV2 faqs={faqs} title="Questions fréquentes sur nos devis" rappelHref="/contact#formulaire-rappel" tone={tones.faq} />
      <ZonesV2 tone={tones.zones} />
    </div>
  );
}

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { categoryLabels, categoryOrder } from "./data/categories";
import { contactActionHref } from "./data/company";
import { ButtonLink, Eyebrow, PhoneButton } from "./sections/v2/ui";

export const metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

const boiler = [
  { label: "Dépannage chaudière", href: "/chauffage/depannage-chaudiere" },
  { label: "Entretien chaudière", href: "/chauffage/entretien-chaudiere" },
  { label: "Remplacement chaudière", href: "/chauffage/remplacement-chaudiere" },
];

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-lavender pb-20 pt-28 sm:pt-32 lg:pb-28 lg:pt-40">
      <div aria-hidden="true" className="v2-glow" />
      <div className="container grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <Eyebrow>Erreur 404</Eyebrow>
          <h1 className="v2-title mt-5 text-[2.4rem] sm:text-[3rem] lg:text-[4rem]">Cette page a pris la fuite.</h1>
          <p className="mt-6 max-w-xl text-lg text-night/70">
            Le lien est peut-être ancien ou mal saisi. Pas d&apos;inquiétude : votre technicien, lui, est toujours joignable.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PhoneButton variant="primary" className="min-h-[56px] px-7 text-base" />
            <ButtonLink href={contactActionHref("devis")} variant="light" arrow className="min-h-[56px] px-7 text-base">
              Demander un devis gratuit
            </ButtonLink>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-night/55">Votre chaudière</p>
            <ul className="mt-3 divide-y divide-night/10 border-y border-night/10">
              {boiler.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group flex items-center justify-between py-3.5 font-semibold text-night hover:text-flame">
                    {link.label}
                    <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex flex-wrap gap-2">
            {categoryOrder.map((category) => (
              <li key={category}>
                <Link href={`/${category}`} className="chip">
                  {categoryLabels[category]}
                  <BsArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

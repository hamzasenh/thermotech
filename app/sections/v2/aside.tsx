import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { fr } from "@/lib/typography";
import { serviceHref, type Service } from "@/app/data/services";
import { startingPrice } from "./content";

/**
 * Colonne de droite du hero des pages catégorie (à la place du rendu 3D) :
 * aiguillage direct vers les fiches service, avec le prix de départ quand il
 * existe (montants : app/data/pricing.ts). Ne recouvre rien.
 */
export function ServicesPanel({ eyebrow, title, services }: { eyebrow: string; title: string; services: Service[] }) {
  return (
    <div className="rounded-[28px] bg-white/80 p-6 text-night ring-1 ring-night/[0.07] backdrop-blur-sm sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-flame">{eyebrow}</p>
      <p className="v2-semi mt-1.5 font-display text-xl font-bold leading-snug">{fr(title)}</p>
      <ul className="mt-5 divide-y divide-night/[0.08] border-t border-night/[0.08]">
        {services.map((service) => {
          const price = startingPrice(service);
          return (
            <li key={serviceHref(service)}>
              <Link href={serviceHref(service)} className="group flex min-h-[56px] items-center justify-between gap-4 py-3">
                <span className="font-semibold leading-snug group-hover:text-flame">{service.title}</span>
                <span className="flex flex-shrink-0 items-center gap-3">
                  {price && <span className="text-sm font-semibold tabular-nums text-night/55">{price}</span>}
                  <BsArrowRight className="h-4 w-4 text-night/30 transition-all group-hover:translate-x-0.5 group-hover:text-flame" aria-hidden="true" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { GoogleRating } from "@/components/site/GoogleRating";
import type { Crumb } from "@/lib/seo";
import { fr } from "@/lib/typography";
import { Eyebrow } from "./v2/ui";

interface PageHeaderProps {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}

/**
 * En-tête compact des pages utilitaires (contact, À propos…) : fond lavande
 * comme les hauts de page du design refondu, lueur en bas.
 */
export function PageHeader({ breadcrumbs, eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden bg-lavender pb-14 pt-24 sm:pt-28 lg:pb-20 lg:pt-32">
      <div aria-hidden="true" className="v2-glow" />
      <div className="container">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 max-w-3xl lg:mt-10">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="v2-title mt-5 text-[2.1rem] sm:text-[2.7rem] lg:text-[3.4rem]">{fr(title)}</h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-night/70 lg:text-lg">{fr(intro)}</p>
          <div className="mt-6">
            <GoogleRating />
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

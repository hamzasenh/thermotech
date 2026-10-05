import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { MissingInfo } from "@/components/site/MissingInfo";
import { fr } from "@/lib/typography";

interface LegalPageProps {
  title: string;
  path: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}

const otherPages = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/confidentialite" },
  { label: "Politique cookies", href: "/cookies" },
];

/** Gabarit des pages légales : en-tête compact + article à la typographie de lecture. */
export function LegalPage({ title, path, updated, intro, children }: LegalPageProps) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-lavender pb-12 pt-24 sm:pt-28 md:pb-16 lg:pt-32">
        <div aria-hidden="true" className="v2-glow" />
        <div className="container">
          <Breadcrumbs
            items={[
              { label: "Accueil", href: "/" },
              { label: title, href: path },
            ]}
          />
          <div className="mt-8 max-w-3xl lg:mt-10">
            <h1 className="v2-title text-[2.1rem] sm:text-[2.7rem] lg:text-[3.2rem]">
              {fr(title)}
            </h1>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-night/55">
              Dernière mise à jour : {updated}
            </p>
            {intro && <p className="mt-6 text-lg leading-relaxed text-night/75">{fr(intro)}</p>}
            <p className="mt-6">
              <MissingInfo>
                Modèle rédigé pour Radialec : à compléter et à faire relire par un juriste avant publication.
              </MissingInfo>
            </p>
          </div>
        </div>
      </section>
      <div className="bg-white pb-20 pt-12 md:pb-28 md:pt-16">
        <article
          className="container max-w-3xl text-base text-night/80 md:text-[17px]
            [&_a]:font-semibold [&_a]:text-night [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-flame
            [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-night md:[&_h2]:text-[28px]
            [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-night
            [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed
            [&_strong]:font-semibold [&_strong]:text-night
            [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li::marker]:text-flame"
        >
          {children}

          <nav aria-label="Autres informations légales" className="mt-16 border-t border-ink/10 pt-8">
            <ul className="!mt-0 flex !list-none flex-wrap gap-2 !pl-0">
              {otherPages
                .filter((page) => page.href !== path)
                .map((page) => (
                  <li key={page.href} className="!mt-0">
                    <Link href={page.href} className="chip !no-underline">
                      {page.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </article>
      </div>
    </>
  );
}

/** Tableau défilable horizontalement sur mobile. */
export function LegalTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead className="bg-lavender/60 text-ink">
          <tr>
            {head.map((cell) => (
              <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-ink/10 align-top">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

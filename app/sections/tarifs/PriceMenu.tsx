import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Reveal } from "@/components/site/Motion";
import { fr } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { getPolicyRows, ResolvedGroup } from "../../data/tarifs";
import { toneBg, type Tone } from "../v2/tones";

/** Répartit les métiers (dans l'ordre) en deux colonnes de hauteur équivalente. */
function balanceColumns(groups: ResolvedGroup[]): ResolvedGroup[][] {
  const total = groups.reduce((sum, g) => sum + g.lines.length + 2, 0);
  const left: ResolvedGroup[] = [];
  let height = 0;
  for (const group of groups) {
    if (height >= total / 2) break;
    left.push(group);
    height += group.lines.length + 2;
  }
  return [left, groups.slice(left.length)];
}

/**
 * « La carte » : tous les prix, métier par métier, façon ardoise de
 * comptoir. Rendue côté serveur — c'est la section qui porte le SEO
 * (chaque ligne est un lien vers sa page service).
 */
export function PriceMenu({
  groups,
  policies,
  tone = "white",
}: {
  groups: ResolvedGroup[];
  tone?: Tone;
  /** Conditions générales (pied de carte), seulement celles qui sont décidées. */
  policies: ReturnType<typeof getPolicyRows>;
}) {
  return (
    <section className={cn("section-y", toneBg[tone])} aria-labelledby="carte-tarifs">
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#00040f] via-ink to-navy px-5 py-12 text-white shadow-soft sm:px-10 md:px-14 md:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:32px_32px]"
          />
          <div
            aria-hidden="true"
            className="absolute -left-40 -top-40 -z-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(249,188,45,0.18),transparent_65%)] blur-2xl"
          />

          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber">La carte complète</p>
            <h2 id="carte-tarifs" className="mt-4 text-3xl font-bold tracking-tighter md:text-5xl md:leading-[1.08]">
              {fr("Tous nos tarifs à Bruxelles, métier par métier")}
            </h2>
            <p className="mt-5 text-white/70 md:text-lg">
              Prix TVAC. Entretiens et dépannages à prix fixe ; installations et rénovations sur devis
              gratuit, détaillé et sans engagement.
            </p>
          </div>

          <div className="mt-14 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            {balanceColumns(groups).map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-12">
                {column.map((group) => (
                  <Reveal key={group.id} delay={columnIndex * 0.08}>
                    <div id={`tarifs-${group.id}`} className="scroll-mt-28">
                      <div className="flex items-end justify-between gap-4 border-b-2 border-white/15 pb-4">
                        <h3 className="text-2xl font-bold tracking-tight">{group.label}</h3>
                        <Link
                          href={group.href}
                          className="group hidden flex-shrink-0 items-center gap-1 text-sm font-semibold text-white/60 hover:text-amber sm:inline-flex"
                        >
                          Les services
                          <BsArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </div>

                      <ul>
                        {group.lines.map((line) => (
                          <li key={line.id}>
                            <Link
                              href={line.href}
                              className="group flex items-baseline gap-3 rounded-xl py-3.5 transition-colors sm:-mx-3 sm:px-3 sm:hover:bg-white/[0.04]"
                            >
                              <span className="min-w-0">
                                <span className="font-semibold text-white/90 group-hover:text-amber">{line.label}</span>
                                {line.note && <span className="mt-0.5 block text-sm text-white/50">{line.note}</span>}
                              </span>
                              <span
                                aria-hidden="true"
                                className="hidden min-w-[1.5rem] flex-1 -translate-y-1 self-baseline border-b-2 border-dotted border-white/20 sm:block"
                              />
                              <span className="ml-auto flex flex-shrink-0 items-baseline gap-2 font-mono tabular-nums">
                                {line.originalAmount !== undefined && (
                                  <span className="text-sm text-white/40 line-through">{line.originalAmount}€</span>
                                )}
                                {line.amount === undefined ? (
                                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
                                    sur devis
                                  </span>
                                ) : (
                                  <span className="text-xl font-bold text-amber">
                                    {line.amount}€<span className="ml-1 text-[10px] font-normal text-white/45">TVAC</span>
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-14 border-t-2 border-white/15 pt-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-amber">Conditions</p>
            <ul className="mt-4 grid gap-x-14 gap-y-3 text-sm sm:grid-cols-2">
              <li className="flex items-baseline gap-3">
                <span className="text-white/80">TVA</span>
                <span aria-hidden="true" className="min-w-[1.5rem] flex-1 -translate-y-1 border-b-2 border-dotted border-white/15" />
                <span className="font-mono font-semibold text-white">comprise dans tous les prix</span>
              </li>
              {policies.map((policy) => (
                <li key={policy.label} className="flex items-baseline gap-3">
                  <span className="text-white/80">{policy.label}</span>
                  <span aria-hidden="true" className="min-w-[1.5rem] flex-1 -translate-y-1 border-b-2 border-dotted border-white/15" />
                  <span className="text-right font-mono font-semibold text-white">{policy.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-12 text-center text-sm text-white/60">
            Syndic, gestionnaire ou copropriété ?{" "}
            <Link href="/professionnels" className="font-semibold text-white underline underline-offset-4 hover:text-amber">
              Parlons de vos parties communes
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

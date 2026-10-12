import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { JsonLd } from "@/components/site/JsonLd";
import { RichText } from "@/components/site/RichText";
import { cn } from "@/lib/utils";
import { fr } from "@/lib/typography";
import { absoluteUrl, faqJsonLd } from "@/lib/seo";
import { categoryLabels } from "@/app/data/categories";
import { company, contactActionHref } from "@/app/data/company";
import { guideHref, type Guide, type GuideBlock, type GuideSection } from "@/app/data/guides";
import { prices } from "@/app/data/pricing";
import { getServiceByRef, serviceHref } from "@/app/data/services";
import { resolveCta } from "../ctaDefaults";
import { CallBandV2, ProofV2, RelatedV2 } from "../v2/blocks";
import { FinalCtaV2 } from "../v2/chrome";
import { AlertV2 } from "../v2/content";
import { finalCtaVisual } from "../v2/cta";
import { DraftBanner } from "../v2/DraftBanner";
import { FaqV2 } from "../v2/FaqV2";
import { MediaSlot } from "../v2/media";
import { backgrounds, cardBg, toneBg, type Tone } from "../v2/tones";
import { Eyebrow, PhoneButton, WhatsAppButton } from "../v2/ui";
import { GuideToc, type TocItem } from "./GuideToc";

/**
 * Gabarit « guide d'aide » (codes d'erreur, pression, panne…) : répondre vite,
 * rassurer, et amener à l'appel au bon moment.
 * - Haut de page lavande : la réponse courte, le temps de lecture, appel +
 *   WhatsApp, et un accès direct aux sections (tuiles de codes ou sommaire).
 * - Encadré de sécurité (texte validé) juste après.
 * - Colonne de lecture large et aérée (18 px), sommaire collant et carte
 *   d'aide à droite sur ordinateur ; chaque section finit sur « … revient ? »
 *   avec l'appel et la photo WhatsApp.
 * - Puis le parcours habituel : bandeau d'appel, avis, FAQ, liens, CTA final.
 */
export function GuidePage({ guide }: { guide: Guide }) {
  const path = guideHref(guide);
  const parent = guide.parent ? getServiceByRef(guide.parent) : undefined;
  const context = guide.parent ?? guide.category;
  const urgence = guide.intent === "urgence";
  const codes = guide.sections.filter((section) => section.code);
  const helpService = guide.related.length ? getServiceByRef(guide.related[0]) : undefined;

  const breadcrumbs = [
    { label: "Accueil", href: "/" },
    { label: categoryLabels[guide.category], href: `/${guide.category}` },
    ...(parent ? [{ label: parent.title, href: serviceHref(parent) }] : [{ label: "Guides", href: "/guide" }]),
    { label: guide.breadcrumb, href: path },
  ];

  const toc: TocItem[] = [
    ...(guide.reflexes ? [{ id: "reflexes", label: "Les bons réflexes" }] : []),
    ...guide.sections.map((section) => ({ id: section.id, label: section.label, code: section.code })),
    { id: "faq", label: "Questions fréquentes" },
  ];

  const cta = resolveCta(guide.intent, guide.cta);
  const visual = finalCtaVisual[guide.intent];

  // Fonds : lavande (haut) → sécurité (blanc) → lecture → bandeau prolongé → avis → FAQ → liens.
  const bg = backgrounds();
  const safety = guide.safety ? bg.attach() : undefined;
  const article = bg.next();
  const band = bg.attach();
  const proof = bg.next();
  const faq = bg.next();
  const related = bg.next();

  return (
    <>
      <JsonLd data={articleJsonLd(guide, path)} />
      <JsonLd data={faqJsonLd(guide.faqs)} />
      {guide.draft && <DraftBanner />}

      {/* Haut de page */}
      <section className="relative isolate overflow-clip bg-lavender pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
        <div aria-hidden="true" className="v2-glow" />
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
          <div>
            <Breadcrumbs items={breadcrumbs} />
            <Eyebrow className="mt-8 lg:mt-10">{guide.eyebrow}</Eyebrow>
            <h1 className="v2-title mt-5 text-[2.3rem] sm:text-[3rem] lg:text-[3.5rem]">{fr(guide.title)}</h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-night/75 lg:text-[19px]">{fr(guide.intro)}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-night/55">
              <span>{readingMinutes(guide)} min de lecture</span>
              <span aria-hidden="true">·</span>
              <span>Mis à jour le {formatDate(guide.updated)}</span>
              {guide.reviewedBy && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Relu par {guide.reviewedBy}</span>
                </>
              )}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PhoneButton variant="primary" className="min-h-[56px] px-7 text-base" />
              <WhatsAppButton topic={guide.topic} variant="light" className="min-h-[56px] px-7 text-base">
                {guide.photoLabel ?? "Envoyer une photo"}
              </WhatsAppButton>
            </div>
          </div>

          {codes.length > 0 ? (
            <nav
              aria-labelledby="guide-index"
              className="rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-32px_rgba(11,18,34,0.4)] ring-1 ring-night/[0.06] sm:p-7"
            >
              <p id="guide-index" className="text-[12px] font-semibold uppercase tracking-[0.2em] text-night/55">
                {guide.indexTitle ?? "Aller directement à"}
              </p>
              <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {codes.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group flex h-full flex-col rounded-2xl bg-chalk px-4 py-3.5 transition-colors duration-200 hover:bg-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-water-light"
                    >
                      <span className="v2-wide font-display text-[1.55rem] font-extrabold leading-none tracking-[-0.03em] text-night group-hover:text-white">
                        {section.code}
                      </span>
                      <span className="mt-1.5 text-[13px] leading-snug text-night/60 group-hover:text-white/70">{section.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-night/60">
                Un autre code&nbsp;?{" "}
                <WhatsAppButton topic={guide.topic} kind="link" className="text-night">
                  Envoyez-nous une photo
                </WhatsAppButton>
              </p>
            </nav>
          ) : (
            <div className="rounded-[28px] bg-white p-6 ring-1 ring-night/[0.06] sm:p-7">
              <GuideToc items={toc} />
            </div>
          )}
        </div>
      </section>

      {guide.safety && safety && (
        <div id="securite" className="scroll-mt-28">
          <AlertV2 title={guide.safety.title} paragraphs={guide.safety.paragraphs} bg={safety.tone} attached={safety.attached} />
        </div>
      )}

      {/* Lecture */}
      <section className={cn(toneBg[article], "py-16 lg:py-24")} aria-label={guide.title}>
        <div className="container lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 xl:gap-24">
          <article className="mx-auto max-w-[44rem] lg:mx-0">
            {guide.reflexes && (
              <section id="reflexes" aria-labelledby="reflexes-titre" className="scroll-mt-28">
                <h2 id="reflexes-titre" className="v2-title text-[1.7rem] sm:text-[2.1rem]">
                  {fr(guide.reflexes.title)}
                </h2>
                <ol className={cn("mt-8 divide-y divide-night/[0.07] rounded-3xl px-6 sm:px-8", cardBg[article])}>
                  {guide.reflexes.items.map((item, index) => (
                    <li key={item.title} className="flex gap-5 py-6 sm:gap-7">
                      <span className="v2-wide w-9 flex-shrink-0 font-display text-[1.6rem] font-extrabold leading-none text-ember">
                        {index + 1}
                      </span>
                      <div>
                        <p className="v2-semi font-display text-[18px] font-bold leading-snug text-night">{fr(item.title)}</p>
                        <p className="mt-1.5 text-[16px] leading-relaxed text-night/70">
                          <RichText text={item.text} />
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {guide.sections.map((section, index) => (
              <GuideSectionView
                key={section.id}
                section={section}
                tone={article}
                topic={section.topic ?? guide.topic}
                first={!guide.reflexes && index === 0}
              />
            ))}

            {(guide.disclaimer || guide.sources?.length) && (
              <footer className="mt-16 border-t border-night/10 pt-6 text-sm leading-relaxed text-night/55">
                {guide.disclaimer && <p>{fr(guide.disclaimer)}</p>}
                {guide.sources?.length ? (
                  <>
                    <p className="mt-4 font-semibold text-night/65">Sources</p>
                    <ul className="mt-1.5 space-y-1">
                      {guide.sources.map((source) => (
                        <li key={source}>{source}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </footer>
            )}
          </article>

          {/* Ordinateur : sommaire qui suit la lecture + aide toujours à portée */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <GuideToc items={toc} />
              <div className="relative overflow-hidden rounded-[28px] bg-night p-6 text-white">
                <span aria-hidden="true" className="v2-energy absolute inset-x-0 top-0 h-[3px]" />
                <p className="v2-semi font-display text-lg font-bold">{urgence ? "Besoin d'un technicien ?" : "Une question ?"}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                  {urgence
                    ? `Intervention sous 24h, ${company.promises.availability}. Dépannage ${prices.depannage.amount} € TVAC, déplacement et diagnostic compris.`
                    : `Un technicien vous répond ${company.promises.availability}.`}
                </p>
                <PhoneButton variant="primary" className="mt-5 min-h-[52px] w-full text-base" />
                <WhatsAppButton topic={guide.topic} variant="outlineLight" className="mt-2.5 min-h-[48px] w-full text-sm">
                  Envoyer une photo
                </WhatsAppButton>
                {helpService && (
                  <Link
                    href={serviceHref(helpService)}
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline"
                  >
                    {helpService.name}
                    <BsArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Texte de l'intention (dépannage, entretien…), pas celui des projets chaudière. */}
      <CallBandV2
        context={context}
        copyKey={guide.intent}
        topic={guide.topic}
        intent={guide.intent}
        tone={band.tone}
        attached={band.attached}
      />
      <ProofV2 tone={proof} context={{ intent: guide.intent, category: guide.category }} />
      <FaqV2
        id="faq"
        faqs={guide.faqs}
        title="Questions fréquentes"
        rappelHref={contactActionHref("rappel", context)}
        topic={guide.topic}
        tone={faq}
      />
      <RelatedV2 refs={guide.related} eyebrow="Pour aller plus loin" title="Nos services liés" tone={related} />
      <FinalCtaV2
        eyebrow={cta.eyebrow}
        title={cta.title}
        highlight={cta.highlight}
        body={cta.body}
        image={visual.image}
        imageAlt={visual.alt}
        secondary={visual.secondary}
        context={context}
        topic={guide.topic}
      />
    </>
  );
}

function GuideSectionView({ section, tone, topic, first }: { section: GuideSection; tone: Tone; topic: string; first: boolean }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-titre`}
      className={cn("scroll-mt-28", first ? "" : "mt-14 border-t border-night/10 pt-12 lg:mt-16 lg:pt-14")}
    >
      {(section.code || section.status) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {section.code && (
            <span className="v2-wide font-display text-[2.75rem] font-extrabold leading-none tracking-[-0.04em] text-night sm:text-[3.25rem]">
              {section.code}
            </span>
          )}
          {section.status && (
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-semibold",
                section.status === "pro" ? "bg-flame/[0.08] text-flame" : "bg-water/[0.1] text-water"
              )}
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
              {section.status === "pro" ? "Technicien nécessaire" : "À vérifier vous-même d'abord"}
            </span>
          )}
        </div>
      )}
      <h2 id={`${section.id}-titre`} className="v2-title mt-4 text-[1.6rem] leading-[1.12] sm:text-[2rem]">
        {fr(section.title)}
      </h2>
      <div className="mt-6 space-y-7">
        {section.blocks.map((block, index) => (
          <GuideBlockView key={index} block={block} tone={tone} />
        ))}
      </div>
      {section.help && (
        <div className={cn("mt-8 flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6", cardBg[tone])}>
          <div>
            <p className="v2-semi font-display text-[17px] font-bold text-night">{fr(section.help)}</p>
            <p className="mt-0.5 text-sm text-night/60">Un technicien chez vous sous 24h, {company.promises.availability}.</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <PhoneButton variant="primary" className="min-h-[48px] px-5 text-sm" />
            <WhatsAppButton topic={topic} kind="link" className="text-sm text-night">
              Envoyer une photo
            </WhatsAppButton>
          </div>
        </div>
      )}
    </section>
  );
}

function GuideBlockView({ block, tone }: { block: GuideBlock; tone: Tone }) {
  switch (block.type) {
    case "text":
      return (
        <div className="space-y-4 text-[18px] leading-[1.75] text-night/80">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              <RichText text={paragraph} />
            </p>
          ))}
        </div>
      );
    case "checks":
      return (
        <div className={cn("rounded-3xl p-6 sm:p-7", cardBg[tone])}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-water">
            {block.title ?? "Ce que vous pouvez vérifier sans risque"}
          </p>
          <ol className="mt-5 space-y-4">
            {block.items.map((item, index) => (
              <li key={item} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-night text-[13px] font-bold text-white"
                >
                  {index + 1}
                </span>
                <span className="pt-0.5 text-[17px] leading-relaxed text-night/85">
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "callIf":
      return (
        <div className="relative pl-6">
          <span aria-hidden="true" className="absolute bottom-1 left-0 top-1 w-1 rounded-full bg-flame" />
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-flame">{block.title ?? "Appelez un technicien si…"}</p>
          <ul className="mt-3 space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-night/85">
                <span aria-hidden="true" className="mt-[0.8em] h-[2px] w-3 flex-shrink-0 rounded-full bg-flame" />
                <span>
                  <RichText text={item} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    case "note":
      return (
        <p className="rounded-2xl bg-lavender/70 px-5 py-4 text-[15px] leading-relaxed text-night/75">
          <strong className="font-semibold text-night">Bon à savoir · </strong>
          <RichText text={block.text} />
        </p>
      );
    case "image":
      return (
        <figure>
          <MediaSlot image={block.image} sizes="(min-width: 1024px) 44rem, 100vw" className="aspect-[3/2] rounded-3xl" compact />
          {block.caption && <figcaption className="mt-3 text-sm leading-relaxed text-night/55">{fr(block.caption)}</figcaption>}
        </figure>
      );
  }
}

/** Temps de lecture de l'article (≈ 200 mots/minute), sans la FAQ. */
function readingMinutes(guide: Guide): number {
  const plain = (text: string) => text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const texts = [
    guide.intro,
    ...(guide.reflexes?.items.flatMap((item) => [item.title, item.text]) ?? []),
    ...guide.sections.flatMap((section) => [
      section.title,
      ...section.blocks.flatMap((block) =>
        block.type === "text"
          ? block.paragraphs
          : block.type === "checks" || block.type === "callIf"
            ? block.items
            : block.type === "note"
              ? [block.text]
              : [block.caption ?? ""]
      ),
    ]),
  ];
  const words = texts.map(plain).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("fr-BE", { day: "numeric", month: "long", year: "numeric" });
}

function articleJsonLd(guide: Guide, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    dateModified: guide.updated,
    inLanguage: "fr-BE",
    mainEntityOfPage: absoluteUrl(path),
    author: { "@type": "Organization", name: company.name, url: company.siteUrl },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: `${company.siteUrl}/logo-signature.png` },
    },
  };
}

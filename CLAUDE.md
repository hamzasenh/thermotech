# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server (localhost:3000)
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # ESLint (next/core-web-vitals, next/typescript)
```

There is no test suite configured in this project (no test runner, no test files).

## Architecture

Next.js 15 App Router marketing site for **Radialec**, a Belgian home-services company (heating, electricity, plumbing, air conditioning/heat pumps, services for property managers) in Brussels and its region. TypeScript + Tailwind CSS + Framer Motion, no backend/database/CMS. Everything is statically generated. The ventilation section was removed on 2026-10-04.

### Content is data, pages are templates

All page content lives in `app/data/`; routes are thin wrappers around templates in `app/sections/` (design components in `app/sections/v2/`):

| Data file | What it holds |
|---|---|
| `app/data/company.ts` | **Single source** for phone (`display`, short `local` format, `href`), email, address (null = placeholder), hours, Google rating/link, socials, promises (7j/7, sous 24h, garantie 2 ans…; `callback` delay null = no delay promised), `siteUrl`, `contactActions` (devis / rendez-vous / rappel links) and `onlineBooking` (Cal.com event types ↔ services they cover). Never hardcode these elsewhere. |
| `app/data/pricing.ts` | **Single source** for every price (TVAC). Pages reference prices by key (`PriceRef`); no amount is written in prose except via this file. Also `pricingPolicy` (extra hour, surcharges, travel, VAT rate, payment, promo validity): `null` = shown as « à confirmer » in the /tarifs « Conditions » footer. |
| `app/data/tarifs.ts` | /tarifs price lines per trade and their linked service page (`getTarifGroups()`), conditions rows (`getPolicyRows()`); open owner questions listed in its header comment. |
| `app/data/services/<category>.ts` | One rich `Service` object per detail page (hero, facts, ordered `blocks`, FAQs, related services, CTA). Optional `path` overrides the URL (`professionnels/syndics-coproprietes` is served at `/professionnels`). Types in `services/types.ts`; helpers (`getService`, `getServiceByRef`, `serviceHref`…) in `services/index.ts`. |
| `app/data/categories.ts` | Hub-page content per category (`CategoryContent`) + `categoryOrder` / `categoryLabels`. Must only `import type` from `./services/types` (no import of the services index → avoids a cycle). |
| `app/data/navigation.ts` | Nav tree derived from categories + services. Computed server-side in `app/layout.tsx` and passed as a prop to the client `HeaderV2` — never import services/categories data into a client component (it would ship all page copy to the browser). |
| `app/data/home.ts` | Homepage FAQ (`homeFaqs`). |
| `app/data/assets-needed.ts` | Registry of every refonte photo/video, delivered or not (IDs P01…P65, V01–V02 from `prompts/refonte/02-assets.md`: file name, subject, format). `ImageSpec.asset` points to it. |
| `app/data/photos.ts` | Delivered photos (`assets/refonte/*.png`) by asset ID, with an optional crop focus (`position`). An `ImageSpec` with `asset: "Pxx"` shows the photo automatically once it is listed here (`resolvePhoto()` in `app/sections/v2/media.tsx`); data files only carry IDs + accurate alt texts. |
| `app/data/brands.ts`, `zones-intervention.ts` | Boiler brand logos, certification logos, communes served. |

Routes:
- `/` — homepage (`app/page.tsx`, composed from v2 sections).
- `/<category>` (chauffage, electricite, plomberie, climatisation) — `CategoryPage` template (`app/sections/CategoryPage.tsx`).
- `/<category>/[slug]` — service template `app/sections/v2/ServicePageV2.tsx` via `serviceRoute(category)` (`app/sections/ServicePage.tsx`). Each category has its own `app/<category>/[slug]/page.tsx` because route segments can't be parameterized across top-level folders — deliberate, keeps clean URLs. `dynamicParams = false`: unknown slugs 404. Services with a `path` override get no `[slug]` page.
- `/professionnels` — single page (category + syndics service merged): renders `ServicePageV2` for the syndics service.
- `/contact`, `/tarifs`, `/devis`, `/rendez-vous`, `/a-propos`, `not-found.tsx`, `sitemap.ts` (deduplicated), `robots.ts`.
- `/mentions-legales`, `/confidentialite`, `/cookies` — `LegalPage` template; missing company data comes from `company.legal` (null = visible « À fournir » placeholder). Drafts to be reviewed by a lawyer.
- Redirects (permanent) in `next.config.ts`: `/ventilation(/*)` → `/climatisation`, `/chauffage/reparation-chaudiere` → `/chauffage/depannage-chaudiere`, `/professionnels/syndics-coproprietes` → `/professionnels`.
- `/api/rappel` (POST) — « Être rappelé » form (`app/sections/CallbackForm.tsx`, schema `lib/quote/callback.ts`: name + phone required, time slot, optional topic/message, origin page, `purpose`) on `/contact#formulaire-rappel` and on `/rendez-vous`; same anti-spam (shorter minimum fill time: autofill) and Resend pipeline, reference `RAP-…`.
- `opengraph-image.tsx` at the root, in each category folder and each `[slug]` folder — share previews generated at build by `lib/og.tsx` (`next/og`, Geist static weights in `assets/fonts/`). `pageMetadata()` defaults `openGraph.images` to `/opengraph-image`.
- `/api/devis` (POST, multipart) — validates the quote request, anti-spam (honeypot `website` + minimum fill time), up to 3 photos, builds a structured e-mail (`lib/quote/email.ts`) and sends it (`lib/quote/send.ts`) to `QUOTE_TO_EMAIL`, reply-to = customer.

To add a service: append a `Service` object to its category file (slug = URL). Page, hub card (if listed in `categories.ts` `services`), header/footer menus and sitemap follow automatically. A `ServiceRef` pointing at a missing slug throws at build time.

Service page block types (`Block` union) and their v2 component: `features` → `FeaturesV2` (numbered, no pictograms), `checklist` → `ChecklistV2` (photo + ticks), `steps` → `StepsV2` (sticky photos if any step has an image, else a compact single column), `callout` → `CalloutV2` (+ optional `verdicts`), `options` → `OptionsV2`, `pricing` → `PricingV2` (navy price board), `brands` → `BrandsV2`, `alert` → `AlertV2`, `highlight` → `HighlightV2` (big figures + small-print `note`), `callBand` → `CallBandV2` (auto-inserted after the 2nd block if absent; boiler copy on chauffage pages, intent copy elsewhere). Text fields accept a minimal rich format rendered by `components/site/RichText.tsx`: `**bold**` and `[label](/path)`.

`intent` (`urgence` / `installation` / `entretien`) drives the hero's 2nd action (rappel / devis / rendez-vous — the phone is always first), the call band copy and the final CTA's technician visual + 2nd action (`app/sections/v2/cta.ts`). The final CTA is **lavender on every page** (2026-10-05; the solid-red `tone="flame"` variant still exists but is unused). Titles/eyebrows still come from `app/sections/ctaDefaults.ts`.

The two pages built first by hand (`/chauffage/remplacement-chaudiere`, `/chauffage/entretien-chaudiere`) were migrated into `services/chauffage.ts` with their validated copy kept verbatim (`draft: false`).

### Design (« les trois énergies », redesign 2026-10-04, applied site-wide)

Constraints: zero budget (free fonts/libs/tools only), the logo (flame + bolt + drop, « Radialec » wordmark in Geist) never changes, conversion + SEO first, boilers are the core business. Plan, assets and open questions: `prompts/refonte/01-plan.md`, `02-assets.md`, `03-questions.md`. **Step A (design on every page, ventilation removal, URL changes, /a-propos) is done; step B (content/SEO page by page, boiler cluster first) waits for the owner's answers.** A backup of the pre-redesign tree is at `../backup-avant-refonte-20261004-1848.tgz` (36 legacy components were deleted).

- Layout (`app/layout.tsx`): `HeaderV2` (client, floating light bar; mobile: logo + « Radialec » + number button + « MENU »), `<main id="contenu">`, `FooterV2`, `MobileActionBar` (client, « Appeler » + « Devis gratuit », hidden on /devis and /rendez-vous, devis context derived from the URL). Body font = Archivo (`font-display`), wordmark spans keep `font-sans` (Geist). Every page starts with a lavender header that has top padding for the fixed bar.
- Components (`app/sections/v2/`): `ui.tsx` (`ButtonLink`, `PhoneButton`, `Eyebrow`, `SectionTitle`, `btn()`, `Surface`), `media.tsx` (`MediaSlot`), `ServiceHeroV2` (lavender hero used by service pages, categories and home: breadcrumbs, intent CTAs, right column = photo/`MediaSlot` or a `panel`, facts strip; `shortcuts` / chaudière « devis express » `?actuel=` rendered as discreet pills under the buttons), `aside.tsx` (`ServicesPanel`: category hero right column, services + starting prices), `tones.ts` (section background rule), `StepsV2`, `content.tsx` (`FeaturesV2`, `ChecklistV2`, `OptionsV2`, `PricingV2`, `AlertV2`, `GuideV2`, `ServiceGridV2`, `FeaturedServiceCard`, `ServiceCardV2`, `TrustStripV2`), `blocks.tsx` (`BrandsV2`, `CalloutV2`, `HighlightV2`, `CallBandV2`, `ProofV2`, `ZonesV2`, `RelatedV2`), `FaqV2`, `chrome.tsx` (`FinalCtaV2`, `FooterV2`), `cta.ts`, `fonts.ts`.
- Tokens: `night #0B1222` (text, « Devis » buttons, small elements, price board), `lavender #EAEEFE` (**strong sections**: heroes, guarantee, call band card, final CTA — chosen over a dark navy version after a side-by-side test), `chalk #F6F3EE` (alternating reading sections), `blaze #E83C1C` (former solid final CTA, unused), `ember #ED7020`, `bolt #FFD505` (never as text on light), `water #3468AF` / `water-light #38B7E8`. Legacy tokens (`navy`, `ink`, `amber`) remain for the forms and the /tarifs board. CSS helpers in `globals.css`: `.v2-title`, `.v2-wide`, `.v2-semi`, `.v2-energy(-y)` (flame→bolt→drop gradient, thin rules only), `.v2-btn(-primary)`, `.v2-glow` (soft red glow rising from the bottom of lavender sections), `.v2-flame-solid`, `.v2-grade` (shared photo grade). The legacy classes `.btn*`, `.text-gradient`, `.section-title`, `.eyebrow`, `.chip`, `.callout` were restyled to the same look (still used by the forms, `SectionHeading`, `ContactActions`…). **Never use `bg-flame`** for a surface: the legacy `.bg-flame` class adds a gradient.
- Owner/user rules: **the phone number is the n°1 conversion element** — a button with the number + phone icon everywhere, styled exactly like the old homepage hero button (logo red `#E52619` sliding to the flame orange); « Être rappelé » / « Demander un devis » on lavender are white with black text. No gradients on large surfaces. No generic pictograms in coloured tiles (« vibe coded ») — use typography (numbers, coloured bars, big statuses). Guarantee condition: legible, right under the promise, not small print (Q38). Photos: **real photos framed on hands/details** (no Radialec uniform yet), AI only for posed cut-outs or people-free interiors; every rectangular photo gets `.v2-grade`.
- Placeholders: `MediaSlot` renders the image (graded, blur placeholder, `photos.ts` focus) or a dashed frame with the asset ID, file name, subject and format from `assets-needed.ts`. To deliver a photo: drop the PNG in `assets/refonte/`, add it to `photos.ts`, and make sure each alt text describes what the photo really shows. The homepage hero uses the boiler cut-out `assets/refonte/chaudiere-accueil.png` (transparent margins trimmed). Missing business facts use `MissingInfo` (« À fournir (Qxx) »). `assets/refonte/` holds new assets (e.g. `technicien-tablette-detoure.png`, a cleaned copy of the tablet cut-out whose original has a semi-transparent black shadow).
- **Section backgrounds (owner rule 2026-10-05)** — one pattern on every page, applied with `backgrounds()` from `app/sections/v2/tones.ts` (each section component takes a `tone` prop, its cards use the opposite tone via `cardBg`): after any lavender section (hero, guarantee `HighlightV2`) start with white, then strictly alternate white / chalk in display order. **Never reorder sections to make colours fit — change the colour.** Lavender cards (`CallBandV2`, `PromoBanner`) and `AlertV2` have **no background of their own**: `attach()` makes them extend the previous section, white or chalk, with no top padding (only right after a lavender section do they take a white slot). Owner asked twice — the band must never bring its own white or beige strip. Final CTA lavender, footer night (`FooterV2` default). No hero card may overlap the visual.
- Category heroes have **no image**: the right column is `ServicesPanel` (« Votre besoin ? », first 5 services + starting price). Home and service pages keep their photo slot.
- **No 3D trade renders anywhere** (owner answer Q8, 2026-10-05): `chaudiere-icon.png`, `panel-icon.png`, `toilet-icon.png`, `clim-icon.png` stay in `assets/` but are not imported. Home « Nos métiers » cards use photos (P05, P20, P30, P43), /tarifs is typographic, the promo and the chauffage share image use the boiler cut-out, the devis category picker uses the same pictograms as its other choices.
- Causerie chat widget: **removed from the site on 2026-10-08 at the owner's request** (`<ChatWidget />` no longer mounted in the layout, its rows removed from /confidentialite and /cookies). To restore it, mount it again and restore the legal rows (git history). When mounted, it is loaded by `components/site/ChatWidget.tsx` (`next/script` `lazyOnload`, so it no longer edits `<html>` before hydration). Its teaser bubble (text and auto-open are set in the Causerie dashboard) is hidden on mobile, and once closed or clicked it stays hidden for the visit (`sessionStorage` `radialec_chat_bubble_closed` → `html[data-chat-bubble="closed"]`). The launcher is lifted above the mobile action bar via CSS (`body:has(.v2-mobile-bar)` in `globals.css`).

### Owner decisions (`prompts/refonte/04-reponses-claude-code-2026-10-06.md`, applied 2026-10-08)

- **Delay promises stay**: « sous 24h », « intervention en 24 heures », « (presque) déjà en route » and the running-technician final CTA (with its « intervention en 24 heures » annotation) are kept. The owner reversed D5/Q28 on 2026-10-08: never remove them.
- Calls are taken **7j/7, 10h–21h** (`company.hours.detail`); callback promise « sous 2 h, entre 10h et 21h » (`company.promises.callback`); e-mail `info@radialec.be`.
- Google rating: show « 5/5 sur Google » + link, **never a hard-coded review count** (`company.google` has no `reviewCount`).
- Address = **registered office only** (Lange Eikstraat 46, 1970 Wezembeek-Oppem, no premises): footer « Siège social » and legal pages only; never a visit address, no map on /contact. LocalBusiness JSON-LD: postal code + locality (no street) + `openingHoursSpecification` 10:00–21:00.
- **VAT: no percentage anywhere on the site** (owner, 08/10/2026). Prices are shown TVAC; never write « TVA 6 % / 21 % ». Entretien gaz back to 149 € on 2026-10-08 (no promo; `pricingPolicy.promoValidity` null — set it again only for a real, dated offer, never a strikethrough price). /tarifs « Conditions » only shows decided rows (`getPolicyRows()` drops `null`). Manager's answers (08/10): surcharges week-end +20 €, jours fériés +50 €, urgence (intervention within 2 hours) +50 €; travel included up to 50 km; payment cash or banking app (Wero, Payconiq); chauffe-eau gaz 129 €, boiler électrique 160 €, ramonage 149 € with attestation, débouchage 200 € (colonne/égout extra), PAC 180 €, airco 240 € + 90 € per indoor unit, détartrage 300 €, mise en conformité 990 € (repérage, schémas, organisme agréé, if nothing to modify), contrat d'entretien particulier 130 € for 2 years; everything else « sur devis ». Dépannage 149 € and the extra hour were not re-confirmed. **Every amount in page copy is a `${prices.…}` template** — never type a price in prose.
- Brands block title « Les marques que nous installons » (no « partenaires » without a proven partnership). **The brand list = the logos in `app/data/brands.ts`** (Vaillant, Bulex, Bosch, Buderus, Junkers, Viessmann, Chaffoteaux, owner answer 08/10): copy cites them via `boilerBrandNames`, never « toutes les marques ». Approvals belong to the **technicians** (« nos techniciens sont agréés »), never to the company; no approval titles or numbers without proof.
- Legal identity verified on the public BCE (08/10/2026): Thermo Tech Solutions SRL, BE 1008.693.201, created 2024; host Vercel Inc. Processors' locations on /confidentialite are sourced in a code comment (Resend: DPF + SCCs per its DPA). Quote requests are received at info@radialec.be (its mail host is still « à préciser »; on 08/10 the domain had **no MX record**, see the owner). Cal.com cookie details remain « à vérifier » (no public cookie policy found). Publisher: Houdaifa Senhaji (manager). Approval numbers: none, not published (owner: remove). Retention of quote requests: 24 months. No founder story on /a-propos (owner: not needed).
- Commercial priority (Q13): `categoryOrder` = chauffage, électricité, climatisation, plomberie; boiler services ordered dépannage → entretien → remplacement on the home and chauffage hub. Plumbing is complementary: never move it up.
- Photos of unknown licence are removed (Q42) and replaced by delivered photos: ramonage hero P18, installation électrique checklist P22, parlophonie checklist P52; Professionnels hero P50. No team photo (P62 dropped, owner 08/10): /a-propos has no photo. Every image slot on the site now has a real photo.
- Ads attribution: `AttributionCapture` (layout, `components/site/useAttribution.ts`) stores the landing page, referrer, UTM and gclid in `sessionStorage` (`radialec_attribution`) on arrival; the devis and rappel forms send it with the request (declared on /cookies; owner chose on 08/10 not to ask for consent: session-only, sent only with a submitted request).
- French only (no NL/EN). No per-commune pages unless they carry real local content (Uccle first).
- Q21: a service without a confirmed price shows « sur devis » / quote request — never an estimated price.
- Q31 (boiler service content: steps for gas and oil, ~1 hour, attestation de conformité in PDF), Q32 (scope of prices) and Q35 (repairs guaranteed 2 years with the same exclusivity condition, FAQ on the 4 dépannage pages) were answered by the manager on 08/10. **Q33 (gas-safety wording) is still unvalidated.**

### Draft content

All services and categories were validated by the manager on 2026-10-08 (`draft: false` everywhere). New AI-written content must be added with `draft: true` until the owner reviews it; never treat a `draft: true` text as verified business fact (pricing, certifications, guarantees, durations).

### Contact actions & quote requests

`contactActions` in `company.ts`: `devis.href = "/devis"`, `rendezVous.href = "/rendez-vous"`, `rappel.href = "/contact#formulaire-rappel"`. `contactActionHref(key, context)` appends `?service=<context>` (before any `#anchor`) so the destination opens pre-filled — the v2 templates pass the page's context automatically.

`/rendez-vous` (`app/sections/booking/`): `BookingPanel` (client) reads `?service=` and shows the Cal.com agenda (`CalBooker`, `@calcom/embed-react`, loaded with `next/dynamic` only when shown) of the `onlineBooking.events` entry whose `services` include it; no context → `defaultEvent`; a service without an event type → `CallbackForm` with `purpose="rendez-vous"` (never another service's agenda). A confirmed booking fires GA `generate_lead` (`form_name: "rendez-vous"`). Cal.com is declared on /confidentialite and /cookies (details « à vérifier »).

`/devis` = 3-step client form (`app/sections/devis/QuoteForm.tsx`; shared schema/validation in `lib/quote/schema.ts`). It captures attribution (UTM, gclid, landing, referrer), accepts `?service=` and `?actuel=` prefills and fires GA `generate_lead` on success.

Env vars (`.env.local`, gitignored — must also be set on the host): `QUOTE_TO_EMAIL` (recipient), `RESEND_API_KEY` (send-only key), optional `QUOTE_FROM_EMAIL` (defaults to Resend's test sender `onboarding@resend.dev`, which can only mail the Resend account owner — set a verified-domain sender before e-mailing customers). Sending uses the Resend REST API via `fetch` in `lib/quote/send.ts` (no SDK), with the request reference as idempotency key. Without the key, dev logs the e-mail to the server console and shows a dev banner; production returns 503 (never fake a success).

### Shared primitives

- `components/site/`: `Actions` (`ActionLink`, `PhoneLink` — legacy, used by the forms), `SectionHeading`, `RichText`, `ImageSlot`/`ImagePlaceholder`, `Icon` (string keys → react-icons, serializable in data), `Motion` (`Reveal`, `Float`, `MotionProvider` with reduced-motion support), `Breadcrumbs` (+ JSON-LD), `GoogleRating`, `JsonLd`, `MissingInfo`, `FormFields`, `useAttribution`, `CookieConsent`, `ClickTracking`.
- `lib/typography.ts` `fr()` inserts non-breaking spaces before `? ! : ;` — applied in headings and `RichText`.
- `tailwind-merge` (`twMerge`) / `cn` (`lib/utils.ts`) wherever class lists are composed conditionally.
- Path alias `@/*` maps to the repo root.

### Cookies & analytics

Google Analytics is loaded **only after consent** by `components/site/CookieConsent.tsx` (mounted in the layout): no GA script before the choice, refuse = accept in prominence, choice stored 6 months in `localStorage` (`radialec_consent`), withdrawing deletes `_ga` cookies. `openCookieSettings()` / `CookieSettingsButton` reopen the banner (footer, /cookies). GA id: `company.analyticsId` (env `NEXT_PUBLIC_GA_ID`). Always call `window.gtag?.()` (typed in `types/gtag.d.ts`). The banner sits above the Causerie chat widget (z-index 9999–10000). Never add another tracker without routing it through this consent. `components/site/ClickTracking.tsx` (layout) sends `click_to_call` / `click_email` for every `tel:` / `mailto:` link via one delegated listener (no per-link code); the forms and the Cal.com agenda send `generate_lead` (`form_name`: `devis` | `rappel` | `rendez-vous`). Mark these as key events in GA4.

### SEO

`app/layout.tsx`: `lang="fr-BE"`, title template `%s | Radialec` (so `metaTitle` fields omit the suffix), LocalBusiness JSON-LD (`lib/seo.ts`). Every page sets a canonical via `pageMetadata()`. Service pages emit Service + FAQPage + BreadcrumbList JSON-LD. `company.siteUrl` (env `NEXT_PUBLIC_SITE_URL`) must be the real production domain.

### Navigation

`HeaderV2` shows Chauffage, Électricité, Plomberie, Climatisation (mega-menus from the `groups` prop) + Tarifs + Contact (no « Accueil » link — the logo goes home), « Devis gratuit » (lg+, dark) and the phone button. Professionnels and À propos are footer-only. `FooterV2` (server) builds the sitemap columns from `getNavGroups()`. FAQs are reached via `/#faqs` (homepage section).

### Client vs server components

Only interactive pieces are `"use client"`: `HeaderV2`, `MobileActionBar`, `StepsV2`, `FaqV2`, the forms (`QuoteForm`, `CallbackForm`), `booking/*`, `CookieConsent`/`ClickTracking`, and the `components/site/Motion.tsx` wrappers. Everything else (templates, blocks, pages) is a server component — keep it that way for SEO/perf. Data exported from a `"use client"` module can't be read on the server: keep data in `app/data/`.

**Next.js 15 gotcha**: `params` on page/`generateMetadata` is a `Promise` — always `await params`.

### Other docs

`prompts/` holds the owner's content/design briefs (validated copy for remplacement/entretien chaudière, homepage bands, CTA). `ANALYSE_COMPLETE.md` (if present) predates the multi-page architecture — treat routing details there as historical.

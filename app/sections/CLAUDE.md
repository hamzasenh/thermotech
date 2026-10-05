# app/sections/ cheatsheet

Quick reference so you don't have to open every file. Keep it in sync whenever a route, data source, or shared behavior changes. Content lives in `app/data/` (see root `CLAUDE.md`), not in these files. Design = « les trois énergies » (redesign 2026-10-04), components in `v2/`. Every template/page assigns section backgrounds with `backgrounds()` (`v2/tones.ts`): white after a lavender section, then white / chalk alternation in display order; lavender cards (call band, promo) and alerts take the background of the section they extend (`attach()`).

## Templates
| File | Route(s) | Notes |
|---|---|---|
| `v2/ServicePageV2.tsx` | `/<category>/[slug]`, `/professionnels` | Renders a `Service`: `ServiceHeroV2` (+ facts, chaudière « devis express » pills) → blocks (call band auto-inserted after the 2nd) → `ProofV2` → `FaqV2` → `ZonesV2` → `RelatedV2` → `FinalCtaV2`. |
| `ServicePage.tsx` | — | Only `serviceRoute(category)` (static params, metadata, page) used by the `[slug]/page.tsx` files; services with a `path` override are excluded. |
| `CategoryPage.tsx` | `/<category>` | `ServiceHeroV2` with `ServicesPanel` (« Votre besoin ? », no image) → `ServiceGridV2` (chauffage: 3 boiler services featured) → `CallBandV2` → why (`FeaturesV2`) / `PricingV2` / `BrandsV2` / `GuideV2` → proof → zones → FAQ → final CTA. `categoryMetadata()`. |
| `LegalPage.tsx` | legal pages | Lavender header + reading typography + `LegalTable`. |

## Design components (`v2/`)
| File | Notes |
|---|---|
| `ui.tsx` | `ButtonLink`, `PhoneButton` (the call button: number + icon, homepage-hero flame style), `Eyebrow`, `SectionTitle`, `btn(variant)`, `Surface` type. |
| `media.tsx` | `MediaSlot`: graded photo (`src`, or the delivered photo for `asset` via `resolvePhoto()` / `app/data/photos.ts`), or a dashed placeholder showing the asset ID / file / subject from `app/data/assets-needed.ts`. |
| `ServiceHeroV2.tsx` | Lavender hero (surface prop), breadcrumbs (skipped when only one crumb), intent-aware CTAs, right column = `MediaSlot` or `panel`, `shortcuts` / `quickStart` as pills under the buttons (never over the visual), facts strip. |
| `aside.tsx` | `ServicesPanel` — category hero right column: services + starting price. |
| `tones.ts` | `Tone` (white/chalk), `toneBg`, `cardBg` (cards = opposite tone), `backgrounds()` sequencer (`next`, `card`, `attach`, `lavender`). |
| `StepsV2.tsx` (client) | Sticky photo + energy rail when steps have images; compact single column otherwise. |
| `content.tsx` | `FeaturesV2`, `ChecklistV2`, `OptionsV2`, `PricingV2`, `AlertV2`, `GuideV2`, `ServiceGridV2` / `FeaturedServiceCard` / `ServiceCardV2`, `TrustStripV2`. |
| `blocks.tsx` | `BrandsV2`, `CalloutV2` (verdicts), `HighlightV2`, `CallBandV2` (copy by intent, boiler copy on chauffage), `ProofV2`, `ZonesV2`, `RelatedV2`. |
| `FaqV2.tsx` (client) | One open at a time; answers stay in the HTML (SEO). Optional `id` (`/#faqs`). |
| `chrome.tsx` | `FinalCtaV2` (lavender by default; flame variant unused), `FooterV2` (night by default). |
| `HeaderV2.tsx` (client), `MobileActionBar.tsx` (client) | Global chrome, mounted in `app/layout.tsx`. |
| `cta.ts` | Final CTA technician visual + 2nd action per intent. `fonts.ts`: Archivo. |

## Other sections
| File | Used on | Notes |
|---|---|---|
| `PageHeader.tsx` | `/contact`, `/a-propos` | Compact lavender header (v2 style). |
| `ContactActions.tsx`, `ContactDetails.tsx` | `/contact` | 3 numbered action cards (devis / rendez-vous / rappel) and coordinates (phone button, address/hours placeholders). |
| `CallbackForm.tsx` (client) | `/contact#formulaire-rappel`, `/rendez-vous` | « Être rappelé » → `/api/rappel`. |
| `booking/*` (client) | `/rendez-vous` | Cal.com agenda or callback form per origin service. |
| `devis/*` | `/devis` | `QuoteForm` (client, 3 steps), `PhotoPicker`, `QuoteRecap`, `QuoteSuccess`, `HowItWorks`. |
| `tarifs/*` | `/tarifs` | `PriceMenu` (navy price board the owner likes — kept as is), `PromoBanner` (lavender card, extends the previous section: `tone` + `attached`), `QuoteProcess` (numbered steps). |
| `ctaDefaults.ts` | templates | Final CTA titles/eyebrows per intent (validated copy). |

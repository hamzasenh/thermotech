# État du site Radialec — Audit en lecture seule

Date: 2026-10-05 | Contexte: Refonte « les trois énergies » (Étape A terminée)

---

## 1. Stack & Déploiement

| Élément | Valeur |
|---------|--------|
| **Runtime** | Next.js 15.5.27, React 18.2.0, TypeScript 5 |
| **Styling** | Tailwind CSS 3.4.1, tailwind-merge 2.5.4 |
| **Animations** | Framer Motion 11.11.17 |
| **Booking** | @calcom/embed-react 1.5.3 |
| **Icons** | react-icons 5.3.0, lucide-react 1.45.0 |
| **ESLint** | next/core-web-vitals, next/typescript |
| **Hébergement** | Non déductible du repo |
| **Tests** | Absent — aucune suite configurée |
| **Env vars** | `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_SITE_URL`, `QUOTE_TO_EMAIL`, `RESEND_API_KEY`, opt: `QUOTE_FROM_EMAIL` |

---

## 2. Routes & Pages (23 total)

| Route | Title | Statut | Notes |
|-------|-------|--------|-------|
| `/` | Chauffagiste, électricien... \| Radialec | ✅ | Hero + 4 métiers + tarifs + zones + FAQ |
| `/chauffage` | Chauffage \| Radialec | ✅ | CategoryPage, 3 vedettes |
| `/chauffage/depannage-chaudiere` | Dépannage chaudière... | ✅ | `draft: false` (validé) |
| `/chauffage/entretien-chaudiere` | Entretien chaudière... | ✅ | `draft: false` (validé) |
| `/chauffage/remplacement-chaudiere` | Remplacement chaudière... | ✅ | `draft: false` (validé) |
| `/chauffage/entretien-chaudiere-mazout` | Entretien mazout... | ✅ | `draft: true` |
| `/chauffage/installation-radiateurs` | Installation radiateurs... | ✅ | `draft: true` |
| `/chauffage/desembouage` | Désembouage radiateurs... | ✅ | `draft: true` |
| `/chauffage/pompe-a-chaleur` | Pompe à chaleur... | ✅ | `draft: true` |
| `/electricite` | Électricité \| Radialec | ✅ | CategoryPage, 3 vedettes |
| `/electricite/[slug]` (8) | Divers | ✅ | Tous `draft: true` |
| `/plomberie` | Plomberie \| Radialec | ✅ | CategoryPage, 3 vedettes |
| `/plomberie/[slug]` (3) | Divers | ✅ | Tous `draft: true` |
| `/climatisation` | Climatisation \| Radialec | ✅ | CategoryPage, 3 vedettes |
| `/climatisation/[slug]` (3) | Divers | ✅ | Tous `draft: true` |
| `/professionnels` | Professionnels... | ✅ | ServicePageV2, path override, `draft: true` |
| `/devis` | Devis gratuit... | ✅ | QuoteForm 3 étapes, `generate_lead` GA |
| `/rendez-vous` | Rendez-vous... | ✅ | Cal.com ou CallbackForm |
| `/contact` | Contact & Urgence | ✅ | 3 actions, GoogleRating |
| `/tarifs` | Tarifs & Conditions | ✅ | PriceMenu, PromoBanner |
| `/a-propos` | À propos | ✅ | PageHeader + contenu |
| `/mentions-legales` | Mentions légales | ⚠️ | Placeholder (tous champs null) |
| `/confidentialite` | Politique de confidentialité | ⚠️ | Placeholder (tous champs null) |
| `/cookies` | Politique des cookies | ⚠️ | Placeholder (tous champs null) |

**Redirects 301:** `/ventilation/*` → `/climatisation`, `/chauffage/reparation-chaudiere` → `/chauffage/depannage-chaudiere`, `/professionnels/syndics-coproprietes` → `/professionnels`

---

## 3. Contenu & Données

### Manquant (Données en null)

| Source | Champ | Impact | Statut |
|--------|-------|--------|--------|
| `company.ts` | `address` | Footer, JSON-LD | 🔴 À FOURNIR |
| `company.ts` | `hours.detail` | Affichage horaires | 🔴 À FOURNIR |
| `company.ts` | `socials` (IG, TikTok) | Footer masqués si null | 🔴 À FOURNIR |
| `company.ts` | `promises.callback` | Formulaire rappel | 🔴 À FOURNIR |
| `company.ts` | `legal.*` (6 champs) | Pages légales | 🔴 À FOURNIR |
| `pricing.ts` | `pricingPolicy` (5 champs) | `/tarifs` footer « à confirmer » | 🔴 À CONFIRMER |

### Photos livrées

**44/65 assets wired** (P01–P33 livré, manquent P10–P11, P15, P18, P22, P28–P29, P34–P39, P41–P42, P45–P65)

- ✅ Chauffage (remplacement, entretien, dépannage, PAC, radiateurs, désembouage)
- ✅ Électricité (tableaux, borne recharge, interphone, schéma)
- ✅ Plomberie (siphon, débouchage, robinet, boiler)
- ✅ Climatisation (murale, filtre, installation, manomètres, nettoyage)

### Contenu rédigé

| Catégorie | Validés | Brouillons | Total |
|-----------|---------|-----------|-------|
| Chauffage | 2 | 6 | 8 |
| Électricité | 0 | 8 | 8 |
| Plomberie | 0 | 3 | 3 |
| Climatisation | 0 | 3 | 3 |
| Professionnels | 0 | 1 | 1 |
| **Total** | **2** | **21** | **23** |

⚠️ **Seuls 2 services sont validés** (`draft: false`). Tous les autres attendent relecture métier.

---

## 4. Composants Globaux

### Header (`HeaderV2`, client)

- ✅ Barre flottante légère, mega-menus dynamiques
- ✅ 4 catégories visibles (Chauffage, Électricité, Plomberie, Climatisation)
- ✅ Tarifs, Contact dans la nav
- ✅ Professionnels et À propos en footer seulement
- ✅ Bouton « Devis gratuit » (LG+, style dark)
- ✅ Bouton téléphone (chaque page)
- ✅ Logo → `/`

### Footer (`FooterV2`, serveur)

- ✅ Sitemap colonnes depuis `getNavGroups()`
- ✅ Google Rating (5★, 19 avis)
- ✅ Tél + Email
- ⚠️ Adresse/horaires placeholder (address/hours.detail null)
- ⚠️ Réseaux sociaux masqués (null)
- ✅ Liens légales

### Banneau mobile (`MobileActionBar`, client)

- ✅ Appel + Devis (< 1024px)
- ✅ Masqué sur `/devis`, `/rendez-vous`
- ✅ Au-dessus du chat (z-index)

### Consentement cookies (`CookieConsent`, client)

- ✅ GA chargé **après consentement uniquement**
- ✅ Stockage localStorage (6 mois)
- ✅ Retrait supprime les cookies `_ga`

### Suivi (`ClickTracking`, client)

- ✅ `click_to_call` / `click_email` (delegué)
- ✅ `generate_lead` (devis/rappel/rendez-vous)

### Chat Causerie

- ✅ Script `lazyOnload`
- ⚠️ Bulle masquée mobile
- ✅ `sessionStorage` fermeture

---

## 5. Formulaires & API

| Formulaire | Endpoint | Envoi | GA |
|-----------|----------|-------|-----|
| `/devis` | POST `/api/devis` | Resend → `QUOTE_TO_EMAIL` | `generate_lead` |
| `/rendez-vous` | Cal.com ou `/api/rappel` | Si fallback: Resend | `generate_lead` |
| `/contact#formulaire-rappel` | POST `/api/rappel` | Resend → `QUOTE_TO_EMAIL` | `generate_lead` |

**Validation:** Honeypot `website`, délai minimum (anti-spam), 3 photos max

**Dev:** Sans `RESEND_API_KEY`, logs console + banner dev (prod: 503)

---

## 6. JSON-LD & SEO

| Type | Où | Statut |
|------|-----|--------|
| LocalBusiness | Toutes | ✅ (adresse null masquée) |
| FAQPage | Pages avec FAQ | ✅ |
| BreadcrumbList | Service, catégories | ✅ |
| Service (schema.org) | Pages service | ✅ |
| Image OG | Build-time | ✅ |
| Canonical | Toutes | ✅ |
| Title template | Toutes | `%s \| Radialec` |
| Meta description | Par page | ✅ |
| Lang | Root | `fr-BE` |
| Robots | Toutes | `index: true, follow: true` |
| Sitemap | Build-time | ✅ (dédupliqué, pas `/ventilation`) |

---

## 7. Environnement

| Var | Utilisée | Défaut | Statut |
|-----|----------|--------|--------|
| `NEXT_PUBLIC_GA_ID` | Client GA | `G-T01KFFNNN3` | ✅ OK |
| `NEXT_PUBLIC_SITE_URL` | Canonical, sitemap | `https://www.radialec.be` | ⚠️ Vérifier prod |
| `QUOTE_TO_EMAIL` | API devis/rappel | — | 🔴 À configurer |
| `RESEND_API_KEY` | Resend (envoi) | — | 🔴 À configurer |
| `QUOTE_FROM_EMAIL` (opt) | Sender | `onboarding@resend.dev` | ⚠️ Test only |

---

## 8. Bloqueurs vs Nice-to-have

### 🔴 Bloqueurs (avant lancement en prod)

- `company.ts` address, hours.detail, legal.* (placeholder en user-facing)
- `pricing.ts` pricingPolicy (affiche « à confirmer »)
- `QUOTE_TO_EMAIL`, `RESEND_API_KEY` (devis inutile)

### ⚠️ Nice-to-have

- 21 services `draft: true` (contenu à valider)
- Socials null (footer OK)
- Pages légales vides (risque juridique)

### ✅ Prêt

- Design finalisé (refonte 2026-10-04)
- Toutes routes implémentées
- Forms + GA instrumentation
- Photos wired (44/65)
- JSON-LD structuré

---

## Résumé

**20 routes ✅ implémentées** | **3 placeholders ⚠️** | **2/23 services validés** | **5 champs company + 5 pricing + 2 env à configurer** 🔴


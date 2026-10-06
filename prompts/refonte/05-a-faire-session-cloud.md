# Refonte Radialec, 05 · À faire (passation vers une session Claude Code cloud)

Rédigé le 6 octobre 2026 par la session locale. Destinataire : une autre instance de Claude Code, sans accès à la mémoire de la session locale. Tout ce qu'il faut savoir est ici, dans `CLAUDE.md` et dans les fichiers cités.

## 0. Avant de commencer

1. Lire, dans cet ordre :
   - `CLAUDE.md` (architecture, design, règles) ;
   - `app/sections/CLAUDE.md` (aide-mémoire des composants) ;
   - `prompts/refonte/04-reponses-claude-code-2026-10-06.md` : **source des décisions**. ✅ = à appliquer ; ⏳ = ne rien publier ;
   - `prompts/refonte/03-questions.md` (questions d'origine et « Suite donnée »).
   - `SITE_STATE.md` (racine) est un audit externe du 5 octobre, en lecture seule. Il contient des inexactitudes (par exemple une page `entretien-chaudiere-mazout` qui n'existe pas). En cas de désaccord, le code, `CLAUDE.md` et ce fichier font foi.
2. Règles de travail :
   - Répondre à l'utilisateur **en français**.
   - Ne rien inventer : pas de prix, de délai, d'agrément, de chiffre ni de photo sans source. Un manque se signale par un placeholder (`MissingInfo`, `MediaSlot`).
   - Ne jamais envoyer de vrai e-mail en testant `/api/devis` ou `/api/rappel`. Sans `RESEND_API_KEY` (cas de la session cloud), le dev se contente d'écrire l'e-mail dans la console.
   - Commiter seulement si l'utilisateur le demande.
3. Préférences design de l'utilisateur. La plupart sont déjà dans `CLAUDE.md`, je rappelle les plus sensibles :
   - le téléphone est un bouton rouge avec le numéro, partout ;
   - pas de dégradé sur une grande surface ;
   - pas de pictogrammes génériques dans des pastilles (« vibe coded ») ;
   - CTA final lavande, footer bleu nuit ;
   - fonds blanc et beige en alternance stricte via `backgrounds()`. **Ne jamais réordonner les sections pour que les couleurs tombent juste** : c'est la couleur qui s'adapte ;
   - le bandeau d'appel lavande n'a **aucun fond propre** (`attach()`) ;
   - rien ne doit recouvrir le visuel d'un haut de page ;
   - pas de rendus 3D des métiers ;
   - sobriété plutôt que gadget.
4. Vérifier après chaque lot :
   - `npx tsc --noEmit` ;
   - `npm run lint` ;
   - `npm run build` : 72 pages statiques ;
   - les 36 URL de `/sitemap.xml` répondent 200 sur `npm run start`.

## 1. Déjà fait le 6 octobre (session locale, non commité au moment de l'écriture)

- **`app/data/company.ts`** :
  - e-mail `info@radialec.be` ;
  - `hours.detail` « 7j/7, de 10h à 21h » ;
  - `promises.callback` « sous 2 h, entre 10h et 21h » ;
  - `promises.intervention` = « De 10h à 21h » (la clé garde son nom, elle ne promet plus de délai) ;
  - `promises.quote` = « Devis gratuit » ;
  - description sans « sous 24h » ;
  - `google.reviewCount` supprimé.
- **Compteur d'avis Google** retiré de l'affichage : `ServiceHeroV2`, `ProofV2`, `FooterV2`, `GoogleRating`, `ContactDetails`, `lib/og.tsx`. Seule la note « 5/5 sur Google » reste, avec le lien vers la fiche.
- **Promo entretien gaz :**
  - 129 € sans prix barré (`originalAmount` supprimé dans `pricing.ts`) ;
  - `pricingPolicy.promoValidity` = « Prix de lancement jusqu'au 31 décembre 2026 » ;
  - `PromoBanner` et la FAQ de `/tarifs` corrigés.
- Accueil : le chiffre clé « On est chez vous le jour même » est remplacé.
- Juste avant (5 octobre) :
  - rendus 3D retirés (accueil, tarifs, promo, devis, images de partage) ;
  - Next.js passé en 15.5.27 ;
  - photos de la refonte branchées par identifiant (`app/data/photos.ts`).

## 2. À faire, dans cet ordre

### 2.1 Supprimer toute promesse de délai (D5 et Q28) — le plus gros lot

Décision : aucun « sous 24h », « intervention en 24 heures », « jour même » (au sens intervention), « 24h/24 », « au plus vite » ni « (presque) déjà en route » sur le site. Le seul délai autorisé est **le rappel sous 2 h, entre 10h et 21h** (`company.promises.callback`). Les appels sont pris 7j/7 de 10h à 21h : rien ne doit suggérer un service de nuit (« jour et nuit », « à toute heure »…).

Pour les trouver :

```bash
grep -rnE "24 ?h|24 heures|24h/24|en route|au plus vite|le plus vite|jour même|jour et nuit|toute heure" app components lib
```

Il y en a environ 180, surtout dans :

| Fichier | Occurrences |
|---|---|
| `app/data/services/electricite.ts` | ~45 |
| `app/data/services/chauffage.ts` | ~41 |
| `app/data/categories.ts` | ~24 |
| `app/data/services/plomberie.ts` | ~17 |
| `app/data/services/climatisation.ts` | ~15 |
| `app/data/services/professionnels.ts` | ~10 |

Composants concernés :
- `app/tarifs/page.tsx`, `app/devis/page.tsx`, `app/contact/page.tsx`, `app/page.tsx` (corps du CTA final) ;
- `app/sections/v2/blocks.tsx` (`callBandCopy`, puces de `ProofV2`) ;
- `app/sections/ctaDefaults.ts`, `app/sections/v2/cta.ts` ;
- `app/sections/ContactActions.tsx`, `app/sections/tarifs/QuoteProcess.tsx` ;
- `app/sections/devis/HowItWorks.tsx`, `QuoteForm.tsx` (intro de l'étape 3), `QuoteRecap.tsx`, `QuoteSuccess.tsx` (titre « Nous vous rappelons sous 24h »).

**À garder :** « attestation remise le jour même » / « sur place le jour même ». C'est la description de l'entretien (texte validé), pas un délai d'intervention.

Règles de réécriture, sans ajouter de nouvelle promesse :

| Avant | Après |
|---|---|
| « Devis gratuit / détaillé / clair sous 24h » | retirer « sous 24h » |
| « Intervention sous 24h, 7j/7 » ; « …, sous 24h, … » | « 7j/7 », ou « 7j/7, de 10h à 21h » ; supprimer la mention |
| Chiffre clé `{ stat: "Sous 24h", label: "Intervention rapide" }` | `{ icon: "clock", stat: "Rappel sous 2 h", label: "Entre 10h et 21h, 7j/7" }`. Vérifier qu'il ne double pas un autre chiffre clé de la page. |
| Chiffre clé `{ stat: "Créneau rapide", label: "Généralement sous 24h" }` | `{ icon: "calendarCheck", stat: "7j/7", label: "De 10h à 21h" }`, si la page n'a pas déjà un chiffre « 7j/7 » |
| Chiffre clé `{ stat: "Devis gratuit", label: "Sous 24h…" }` | label « Sans engagement » |
| Sur-titre « Dépannage 7j/7 · Sous 24h » | « Dépannage 7j/7 · 10h–21h » |
| `metaTitle` / `metaDescription` | retirer « sous 24h » ; titre ≤ 60 caractères, description ≤ 155 |
| « planifions l'intervention sous 24h / au plus vite » | « planifions l'intervention avec vous » |
| Étape d'entretien : « Un créneau rapide, en ligne ou par téléphone — généralement sous 24h. » | « Un créneau en ligne ou par téléphone, selon vos disponibilités. » |
| Titres d'étapes « Devis sous 24h » | « Devis détaillé » |
| Devis, `QuoteSuccess` et `QuoteForm` | aucun délai : « Nous vous recontactons » (+ créneau choisi) ; le délai de 2 h vaut pour « Être rappelé », pas pour le devis |
| `QuoteRecap` : « Réponse sous 24h » | retirer la puce |
| `QuoteRecap` : « un technicien intervient sous 24h, 7j/7 » | « appelez-nous, 7j/7 de 10h à 21h » |
| `HowItWorks` : étiquette « Sous 24h » | « Par téléphone » |

### 2.2 « (presque) déjà en route » (Q37) et le technicien qui court (Q10)

Titres de CTA final à remplacer :
- `app/sections/ctaDefaults.ts` (urgence) ;
- `app/data/categories.ts` (cta des catégories chauffage, électricité, plomberie) ;
- `app/data/services/*.ts` (dépannage chaudière, dépannage électrique, dépannage plomberie, débouchage, dépannage clim).

Proposition : « <Problème> ? Un appel suffit. » avec `highlight: "Un appel suffit"`. Exemples : « Plus de chauffage ? Un appel suffit. », « Ça bouche ? Un appel suffit. ». Retirer aussi `imageAlt` « …en route… ».

L'image `assets/technicien_courant_…intervention-en-24-heures….png` porte l'annotation « intervention en 24 heures » : **ne plus l'utiliser**.
- Dans `app/sections/v2/cta.ts` (`finalCtaVisual.urgence`), la remplacer par un détourage sans annotation. Par exemple `assets/technicien_debout_souriant_bras_croisés.png` : vérifier visuellement qu'il est propre, sinon reprendre `assets/refonte/technicien-tablette-detoure.png`.
- Dans `ctaDefaults.ts`, les champs `image` / `imageAlt` ne sont plus lus par les gabarits (ils utilisent `finalCtaVisual`) : les supprimer avec les imports.

### 2.3 Adresse du siège (Q20)

- `company.address = { street: "Lange Eikstraat 46", postalCode: "1970", city: "Wezembeek-Oppem" }`. C'est le **siège social, sans local** ni accueil du public.
- Affichage uniquement :
  - dans le **pied de page**, sous le libellé « Siège social » (`app/sections/v2/chrome.tsx`, `FooterV2`) ;
  - dans les **mentions légales** (et l'identité du responsable de traitement sur `/confidentialite`).
- Jamais comme adresse de visite. Dans `app/sections/ContactDetails.tsx` :
  - retirer la ligne « Adresse » (placeholder actuel) ;
  - retirer l'`ImagePlaceholder` « Composant à intégrer » de la carte Google Maps (pas de carte) ;
  - les horaires lisent `company.hours.detail`.
- JSON-LD (`lib/seo.ts`, `localBusinessJsonLd`) :
  - `PostalAddress` avec `postalCode`, `addressLocality`, `addressCountry` uniquement, **sans `streetAddress`** ;
  - garder `areaServed` ;
  - ajouter `openingHoursSpecification` du lundi au dimanche, 10:00–21:00.
- `/a-propos` : retirer le `MissingInfo` Q20.

### 2.4 Tarifs, TVA et conditions (Q22, Q23)

- `app/data/tarifs.ts`, `getPolicyRows()` : **ne pas afficher les lignes à `null`**. Le site ne doit rien dire sur le déplacement, le paiement, les majorations ni l'heure supplémentaire tant qu'ils ne sont pas décidés. Supprimer donc le « à confirmer » visible.
- `pricingPolicy.vatRate` = « 6 % sur le remplacement de chaudière si le logement a au moins 10 ans ». Jamais « TVA 6 % » sans la condition, rien pour les autres prestations.
- Page remplacement (`app/data/services/chauffage.ts`, slug `remplacement-chaudiere`, `draft: false`) :
  - chiffre clé `{ stat: "Devis sous 24h", label: "Clair et sans surprise" }` → `{ icon: "euro", stat: "TVA 6 %", label: "Si le logement a au moins 10 ans" }` ;
  - titre d'étape « Devis sous 24h » → « Devis détaillé » ;
  - retirer « sous 24h » des meta.
- Page pompe à chaleur : retirer « TVA 6% depuis 2026 » de la `metaDescription`. Chercher `grep -rnE "6 ?%" app/data` et retirer toute autre TVA 6 % hors remplacement de chaudière.
- **Ne pas toucher** au prix du dépannage. `pricing.ts` dit 149 €, le document 04 parle de 140 € « à reconfirmer » (⏳).

### 2.5 Marques (Q24) et agréments (Q25)

- Remplacer les titres de blocs `brands` « Nos partenaires de confiance » par « Les marques que nous installons » (`grep -rn "partenaires" app/data`). N'ajouter aucune nouvelle promesse « toutes marques ».
- Agréments (`grep -rn "agréé" app components lib`) : le sujet doit être les techniciens (« nos techniciens sont agréés »), jamais « Radialec est agréée » ni « entreprise agréée ». Ne publier aucun intitulé ni numéro.

### 2.6 Consignes gaz (Q33), FAQ de l'accueil (Q34), garantie (Q38)

**Bloc `alert` de `depannage-chaudiere`** (`app/data/services/chauffage.ts`) : consignes officielles Sibelga / Fluvius.
- Ouvrir portes et fenêtres.
- Aucune flamme ni étincelle : pas d'interrupteur, pas de lampe, pas d'appareil électrique, pas de téléphone dans le logement.
- Fermer le robinet du compteur seulement s'il est accessible sans allumer.
- Quitter le logement, puis appeler depuis l'extérieur.

Numéros gratuits à indiquer :

| Zone | Gestionnaire | Numéro |
|---|---|---|
| Bruxelles | Sibelga | 0800 19 400 |
| Brabant flamand | Fluvius | 0800 65 0 65 |
| Brabant wallon | ORES | 0800 87 087 |
| Partout | — | 112 |

La page reste `draft: true` : la formulation exacte attend la validation du technicien.

**FAQ de l'accueil** (`app/data/home.ts`) : dans « Comment obtenir un devis pour une nouvelle chaudière ? », retirer « ou au mazout » et renvoyer vers `[remplacement de chaudière](/chauffage/remplacement-chaudiere)`. Ne citer aucune interdiction réglementaire.

**Garantie** : la `note` de `HighlightV2` (`app/sections/v2/blocks.tsx`) doit être lisible et proche de la promesse, pas en petites lignes. Taille du corps de texte (`text-base`, `text-night/75`), placée juste après le titre et les paragraphes, sans gros `mt-12`.

### 2.7 Photos sans licence connue (Q42)

Retirer les images dont l'origine est inconnue :

| Image | Utilisée sur | Remplacer par |
|---|---|---|
| `assets/entretienbIS.jpg` | haut de page ramonage | `asset: "P18"` (placeholder) |
| `assets/parlophone.jpeg` | checklist parlophonie | `asset: "P52"` (placeholder) |
| `assets/installation_elec.jpg` | checklist installation électrique | `asset: "P22"` (placeholder) |

- Ces trois images sont importées dans `app/data/services/chauffage.ts` et `electricite.ts`.
- Vérifier aussi qu'aucun fichier n'importe `borne.jpg`, `conformite.jpg`, `videophone.jpg`, `repair.jpg`, `entretien.png`.
- `boiler-maintenance.png` est une image IA du propriétaire : elle reste.
- Les textes alternatifs doivent décrire la photo attendue.

### 2.8 Légal (Q43, Q46, Q26)

**`company.legal`** :
- `companyName` : « Thermo Tech Solutions SRL » ;
- `legalForm` : « Société à responsabilité limitée (SRL) » ;
- TVA : BE 1008.693.201.
- `enterpriseNumber` : vérifier sur la BCE publique (kbopub.economie.fgov.be, en principe les mêmes chiffres). Ne publier qu'après vérification, sinon garder « À fournir ».
- `host` : Vercel Inc. Relever l'adresse officielle sur vercel.com (pages légales), ne pas l'écrire de mémoire.
- `publisher` : afficher « Le gérant de Thermo Tech Solutions SRL » avec un `MissingInfo` pour le nom (⏳).

**`/confidentialite`** :
- Durée de conservation : `MissingInfo` « 24 mois après le dernier contact (proposition à valider) ».
- Localisation des prestataires (Resend, Google Gmail, Google Analytics, Causerie, Cal.com, Vercel) : la relever dans la politique de confidentialité de chacun. Mettre la source en commentaire dans le code. En cas de doute, laisser « à vérifier ».

**`/a-propos`** :
- Écrire « Radialec est le nom commercial de Thermo Tech Solutions SRL, créée en 2024 ».
- Garder les `MissingInfo` pour le prénom et le parcours du fondateur, et pour l'histoire ThermoTech → Radialec (⏳).
- Ne jamais écrire :
  - la taille de l'équipe ;
  - l'autre employeur du technicien ;
  - les marges internes.

### 2.9 Priorités commerciales (Q13)

Ordre de priorité : dépannage chaudière, entretien, installation et remplacement, électricité, PAC et clim, plomberie. Ne jamais remonter la plomberie.

- `app/page.tsx` : `boilerServices` dans l'ordre dépannage → entretien → remplacement ; métiers (`trades`) dans l'ordre Chauffage, Électricité, Climatisation, Plomberie.
- `app/sections/CategoryPage.tsx` : `featuredByCategory.chauffage` dans le même ordre.
- `app/data/categories.ts` : `categoryOrder` = chauffage, electricite, climatisation, plomberie (et professionnels si présent).
- Ajuster en conséquence les colonnes de `FooterV2` et l'ordre des groupes de `app/data/tarifs.ts`.

### 2.10 Suivi Google Ads (Q19)

Vérifier que UTM, gclid, page d'arrivée et référent sont :
- capturés à la première page vue ;
- conservés pendant la navigation (stockage de session) ;
- envoyés avec **le devis et le rappel** (`app/sections/CallbackForm.tsx`, `lib/quote/callback.ts`, constructeur d'e-mail dans `lib/quote/`) ;
- imprimés dans l'e-mail reçu.

Le devis le fait déjà, probablement pas le rappel. Le « consent mode » de Google : à étudier seulement, ne pas l'implémenter sans accord.

### 2.11 Documentation

- **`prompts/refonte/01-plan.md`** :
  - § 3.1 : volumes réels (D1). Le fichier Keyword Planner n'est pas dans le repo, reprendre les repères de 04.
  - § 6.9 : pas de pages par commune sauf contenu réel ; Uccle comme premier candidat (D2).
  - Français uniquement (D4).
  - Priorités Q13.
- **`CLAUDE.md`** : règles « aucun délai sauf rappel sous 2 h », « adresse = siège social, footer et mentions légales seulement », « pas de compteur d'avis en dur ».
- **`03-questions.md`** : compléter la « Suite donnée ».

## 3. Ne pas faire (en attente du propriétaire, ⏳)

- Prix du dépannage (140 ou 149 €).
- Heure supplémentaire et mention « même tarif soir et week-end » : à n'écrire qu'après accord.
- Déplacement, moyens de paiement.
- Prix « à partir de » (Q21) et questions sur les prix existants (Q32).
- Liste des marques, intitulés et numéros d'agrément.
- Parcours du fondateur.
- Garantie sur les dépannages (Q35), contrats (Q30), contenu de l'entretien (Q31).
- Événements Cal.com, numéro de suivi d'appels, modifications de la fiche Google (en re-vérification).
- La phrase « rappel le lendemain dès 10h » (après 21h) : c'est une proposition, à ne pas publier.

## 4. Points à signaler au propriétaire

- **Q40 :** le document 04 dit « tenue sombre unie, pas de faux logo ». Or plusieurs photos livrées le 5 octobre montrent un pull au logo Radialec : P02 `hero-remplacement-chaudiere`, P13 `pac-unite-interieure`, P43 `airco-installation`, ainsi que les détourages de technicien des CTA. Faut-il les garder ?
- **Dépannage :** 149 € sur le site, 140 € dans le document 04.
- Le fichier Keyword Planner cité en D1 n'est pas dans le repo.

## 5. Vérification finale

- `grep -rnE "24 ?h|24 heures|24h/24|en route|au plus vite"` sur `app components lib` ne doit plus rien renvoyer. « jour même » ne doit rester que pour l'attestation d'entretien.
- tsc, lint et build OK ; 36 pages en 200 ; redirections de `next.config.ts` OK.
- Captures desktop (1440 px) et mobile (390 px), sans débordement horizontal, de :
  - l'accueil ;
  - `/chauffage/depannage-chaudiere` ;
  - `/chauffage/remplacement-chaudiere` ;
  - `/tarifs` ;
  - `/contact` ;
  - les mentions légales.

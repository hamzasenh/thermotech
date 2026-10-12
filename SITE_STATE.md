# État du site Radialec

Mis à jour le 12 octobre 2026. Remplace l'audit du 5 octobre.

## En bref

- **En ligne** sur https://www.radialec.be (Vercel, déploiement automatique depuis la branche `main` de GitHub), indexé par Google.
- **Refonte « les trois énergies » appliquée à tout le site**, 36 pages publiques.
- **Contenu validé par le gestionnaire le 08/10/2026** : les 23 services sont en `draft: false`. Les prix viennent de ses réponses.
- **Demandes de devis et de rappel :**
  - fonctionnent par e-mail (Resend) ;
  - alerte Telegram instantanée et confirmation au client codées, mais **pas encore activées** (identifiants à fournir) ;
  - suivi Google Ads et Microsoft Clarity codés, mais **pas encore activés**.
- **Il reste surtout des réglages de comptes** (Resend, Telegram, Google Ads, Clarity) et quelques décisions du propriétaire (section 13).

## 1. Technique et hébergement

| Élément | Valeur |
|---|---|
| Framework | Next.js 15.5.27 (App Router), React 18.2, TypeScript 5 |
| Style | Tailwind CSS 3.4, tailwind-merge, `cn` (fusion de classes) |
| Animations | Framer Motion 11 |
| Icônes | react-icons |
| Réservation | @calcom/embed-react (Cal.com) |
| Polices | Archivo pour tout le site ; Geist pour le mot « Radialec » du logo seulement ; Geist Mono sur /tarifs |
| Hébergement | Vercel (en-tête `server: Vercel` vérifié) |
| Base de données / CMS | Aucun : tout le contenu est dans `app/data/`, pages générées à la construction (72 pages statiques, images de partage comprises) |
| Tests | Aucune suite automatisée ; vérifications par build, lint, TypeScript et contrôle visuel |
| Ménage du 11/10 | Restes du kit shadcn et d'un ancien modèle SaaS supprimés (aucun changement visible, vérifié sur 13 pages) |

## 2. Pages

### Pages publiques (36 URL dans le plan du site)

| Page | Gabarit / notes |
|---|---|
| `/` | Accueil : chaudière détourée, raccourcis « Votre chaudière est… », 3 cartes chaudière (dépannage, entretien, remplacement), métiers en photos, tarifs, avis, zones, FAQ (`/#faqs`), CTA final |
| `/chauffage`, `/electricite`, `/climatisation`, `/plomberie` | Pages métier (`CategoryPage`) : haut de page sans image avec le panneau « Votre besoin ? » (5 services + prix de départ) |
| `/<métier>/<service>` (22 pages) | Fiches service (`ServicePageV2`), voir section 3 |
| `/professionnels` | Syndics et copropriétés (fiche service servie à cette adresse) |
| `/devis` | Formulaire en 3 étapes, deux colonnes, récapitulatif sobre (pas de « ticket de caisse »), un avis court sur ordinateur |
| `/rendez-vous` | Agenda Cal.com (entretien chaudière) ou formulaire de rappel |
| `/contact` | Téléphone, WhatsApp, 3 actions, formulaire « Être rappelé », coordonnées, zones, FAQ |
| `/tarifs` | Grille de prix (tableau bleu nuit) et « Conditions » |
| `/a-propos` | Sans photo (pas de photo d'équipe, choix du propriétaire) |
| `/mentions-legales`, `/confidentialite`, `/cookies` | Complétées (voir section 10) ; à faire relire par un juriste |

### Autres adresses

- **Formulaires :** `POST /api/devis` (avec photos) et `POST /api/rappel`.
- **`/avis`** : redirection temporaire (307) vers le formulaire « Écrire un avis » Google, vérifiée en ligne le 12/10.
- **`/logo-signature.png`** : logo pour la signature e-mail, en ligne.
- **`/email/radialec-logo.png`** : logo des e-mails de confirmation.
- **Fichiers techniques :** `sitemap.xml`, `robots.txt`, images de partage (`opengraph-image`) par page.
- **Page 404 :** `not-found` personnalisée.
- **Redirections permanentes (301) :**
  - `/ventilation(/*)` → `/climatisation` ;
  - `/chauffage/reparation-chaudiere` → `/chauffage/depannage-chaudiere` ;
  - `/professionnels/syndics-coproprietes` → `/professionnels`.

## 3. Services (23, tous validés)

Ordre commercial des métiers : chauffage, électricité, climatisation, plomberie (complémentaire). L'**intention** détermine les boutons de la page (section 6).

| Métier | Service (adresse) | Intention |
|---|---|---|
| Chauffage | Remplacement et installation de chaudière (`remplacement-chaudiere`) | installation |
| | Entretien de chaudière (`entretien-chaudiere`) | entretien |
| | Dépannage et réparation de chaudière (`depannage-chaudiere`) | urgence |
| | Entretien de chauffe-eau et boiler (`entretien-chauffe-eau-boiler`) | entretien |
| | Désembouage (`desembouage`) | entretien |
| | Radiateurs (`installation-radiateurs`) | installation |
| | Pompe à chaleur (`pompe-a-chaleur`) | installation |
| | Ramonage (`ramonage-cheminee`) | entretien |
| Électricité | Dépannage électrique (`depannage-electrique`) | urgence |
| | Installation électrique (`installation-electricite`) | installation |
| | Mise en conformité (`mise-en-conformite-electrique`) | installation |
| | Borne de recharge (`installation-borne-recharge`) | installation |
| | Parlophone (`installation-parlophonie`) | installation |
| | Vidéophone (`installation-videophonie`) | installation |
| | Schéma unifilaire (`schema-electrique`) | installation |
| | Rénovation électrique (`renovation`) | installation |
| Plomberie | Dépannage (`depannage`) | urgence |
| | Débouchage (`debouchage`) | urgence |
| | Détartrage (`detartrage`) | entretien |
| Climatisation | Installation (`installation-climatisation`) | installation |
| | Entretien clim et PAC (`entretien-climatisation`) | entretien |
| | Dépannage clim et PAC (`depannage-climatisation`) | urgence |
| Professionnels | Syndics et copropriétés (`/professionnels`) | installation |

**Contenu validé ou appliqué le 08/10 :**
- étapes de l'entretien gaz et mazout, environ 1 heure, attestation PDF ;
- garantie 2 ans sur les réparations (FAQ des 4 pages de dépannage) ;
- consignes gaz validées : ne pas les reformuler sans le gestionnaire ;
- marques = celles des logos (Vaillant, Bulex, Bosch, Buderus, Junkers, Viessmann, Chaffoteaux).

Tout nouveau texte rédigé par l'IA doit repasser en `draft: true` jusqu'à relecture.

## 4. Prix (`app/data/pricing.ts`, TVAC, jamais de pourcentage de TVA affiché)

| Prestation | Prix |
|---|---|
| Dépannage (chaudière, sanitaire, électrique, clim/PAC) : déplacement, diagnostic et 1ère heure | 149 € |
| Heure supplémentaire de dépannage | 60 € |
| Entretien chaudière gaz | 149 € |
| Entretien chaudière mazout | 219 € |
| Entretien chauffe-eau gaz | 129 € |
| Entretien boiler électrique | 160 € |
| Ramonage (attestation comprise) | 149 € |
| Entretien pompe à chaleur | 180 € |
| Entretien airco | 240 € + 90 € par unité intérieure |
| Débouchage (colonne et égout chiffrés à part) | 200 € |
| Détartrage | 300 € |
| Mise en conformité électrique (repérage, schémas, organisme agréé, si rien à modifier) | 990 € |
| Contrat d'entretien chaudière, particuliers, 2 ans | 130 € |
| Tout le reste | Sur devis (jamais de prix estimé) |

**Conditions affichées sur /tarifs :**
- suppléments : week-end +20 €, jours fériés +50 €, urgence (intervention dans les 2 heures) +50 € ;
- déplacement compris jusqu'à 50 km ;
- paiement en espèces ou par application bancaire (Wero, Payconiq) ;
- pas de taux de TVA ni de promotion en cours.

Toute somme écrite dans un texte passe par `${prices.…}`, jamais tapée en dur.

## 5. Données de l'entreprise (`app/data/company.ts`)

| Donnée | Valeur |
|---|---|
| Téléphone | +32 486 44 21 86 (bouton rouge, action n°1 partout) |
| WhatsApp | même numéro, 7j/7 de 10h à 21h ; **compte WhatsApp (Business) actif à confirmer** |
| E-mail | info@radialec.be (Zoho Mail, configuré, voir section 12) |
| Siège social | Lange Eikstraat 46, 1970 Wezembeek-Oppem (pas d'accueil du public, pas de carte) |
| Horaires | 7j/7, de 10h à 21h |
| Promesses | Intervention sous 24h · 7j/7 · devis gratuit sous 24h · garantie 2 ans · +200 clients · rappel sous 2 h entre 10h et 21h · **urgence 24h/24** (ajoutée le 12/10, voir section 13) |
| Google | 5/5, « plus de 30 avis » (31 le 11/10), lien vers la fiche, lien d'avis `/avis` |
| Réseaux sociaux | Aucun (Instagram et TikTok non renseignés, masqués) |
| Société | Thermo Tech Solutions SRL, BE 1008.693.201 (vérifié à la BCE) ; éditeur : Houdaifa Senhaji, gérant ; hébergeur : Vercel Inc. |
| Rendez-vous en ligne | Cal.com, un seul type : « Entretien de chaudière » (60 min, lien `radialec/entretien-60-min`) |

## 6. Conversion : boutons d'action, WhatsApp, avis

Analyse complète dans `prompts/refonte/06-cta-whatsapp-avis.md`.

| Intention de la page | Action n°1 | Action n°2 | Repli |
|---|---|---|---|
| Urgence | Appeler | WhatsApp « Envoyer une photo » | Être rappelé |
| Entretien | Appeler | Prendre rendez-vous | WhatsApp, être rappelé |
| Installation, accueil, pages métier | Appeler | Demander un devis | WhatsApp, être rappelé |

- **Couleurs :** appel = bouton rouge avec le numéro ; devis et rendez-vous = bleu nuit, ou blanc sur lavande ; WhatsApp = bouton blanc à icône verte ; rappel = lien.
- **Barre mobile du bas :** urgence = Appeler + WhatsApp ; ailleurs = Appeler + Rendez-vous ou Devis + icône WhatsApp. Masquée sur /devis et /rendez-vous.
- **WhatsApp est présent sur :**
  - le haut de page, le bandeau d'appel, la FAQ, le CTA final ;
  - le menu mobile, la page contact, le pied de page, l'aide « panne en cours » du devis.

  Le message s'ouvre pré-rempli avec le nom de la page. Pas de bulle flottante.
- **Avis Google :** 9 avis réels copiés mot pour mot (`app/data/reviews.ts`).
  - 3 par page, choisis selon le service ; défilement horizontal sur mobile.
  - Tous les avis lus portent sur des chaudières : les pages électricité, plomberie et clim affichent donc des avis chaudière.
  - Pas de données structurées « AggregateRating ».
  - Lien discret « Déjà client ? Laissez-nous un avis » dans le pied de page et sur /contact.
- **Chat Causerie :** retiré le 08/10 à la demande du propriétaire (réactivable).

## 7. Demandes : ce qui se passe à l'envoi

| Formulaire | Où | Ce qui part |
|---|---|---|
| Devis | `/devis` → `/api/devis` | E-mail à `QUOTE_TO_EMAIL` (avec photos, réponse au client) + alerte Telegram + confirmation au client avec récapitulatif |
| Être rappelé | `/contact#formulaire-rappel` → `/api/rappel` | E-mail + alerte Telegram + confirmation au client **s'il a laissé son e-mail** (champ facultatif depuis le 12/10) |
| Rendez-vous | `/rendez-vous` | Réservation Cal.com, ou formulaire de rappel « rendez-vous à fixer » |

**Anti-spam :** champ piège et temps de remplissage minimum. Photos : 3 au maximum, compressées dans le navigateur.

**Provenance :** page d'arrivée, page précédente, paramètres UTM et `gclid` sont joints à la demande (`radialec_attribution`, stockage de session).

**Alerte Telegram** (`lib/quote/telegram.ts`) :
- un résumé lisible sur téléphone, avec le numéro cliquable ;
- les photos ;
- un bouton « Écrire sur WhatsApp » (pour les numéros de GSM) ;
- l'origine du client.

**Fiabilité :** la demande est acceptée si l'e-mail **ou** l'alerte est passé. Le client voit « appelez-nous » seulement si personne ne l'a reçue.

**Confirmation client** (`lib/quote/confirmation.ts`) contient :
- la référence ;
- la suite : rappel sous 2 h entre 10h et 21h, ou le créneau choisi ; devis sous 24h ;
- l'encadré « Une urgence ? Appelez-nous 24h/24 » avec le numéro ;
- le récapitulatif.

Elle ne part qu'avec un expéditeur sur un domaine vérifié dans Resend (`QUOTE_FROM_EMAIL`), **ce qui n'est pas encore le cas**. Les écrans de succès du site disent la même chose.

**État au 12/10 :**
- les e-mails de demande partent de l'expéditeur de test de Resend vers la boîte du titulaire du compte Resend ;
- confirmations et alertes Telegram inactives tant que les variables manquent.

## 8. Mesure et cookies

**Bannière par finalité :**
- « Mesure d'audience » : Google Analytics, et Microsoft Clarity une fois activé ;
- « Publicité » : Google Ads, une fois activé.

**Règles :**
- aucun outil chargé avant l'accord (mode de consentement v2 « de base ») ;
- pas de remarketing ;
- le choix est gardé 6 mois ;
- un nouvel outil activé fait reproposer la bannière.

| Outil | État |
|---|---|
| Google Analytics 4 (`G-T01KFFNNN3`) | Actif après accord |
| Microsoft Clarity | Prêt, inactif (manque `NEXT_PUBLIC_CLARITY_ID`) ; formulaires masqués dans les enregistrements |
| Google Ads | Prêt, inactif (manque `NEXT_PUBLIC_GOOGLE_ADS_ID` et les 5 libellés de conversion dans `company.ts`) ; conversions améliorées et référence anti-doublon prévues |

**Événements GA4 :**
- `generate_lead` (devis, rappel, rendez-vous) ;
- `click_to_call` ;
- `click_whatsapp` ;
- `click_email`.

À marquer comme **événements clés** dans GA4. Guide de mise en route : `prompts/refonte/07-suivi-ads-clarity.md`.

## 9. Référencement

- Titre `%s | Radialec`, langue `fr-BE`, URL canonique sur chaque page, description par page.
- **Données structurées :**
  - LocalBusiness (code postal et localité, horaires 10h–21h) ;
  - Service, FAQPage et BreadcrumbList sur les fiches.
- **Fichiers :** images de partage générées à la construction ; plan du site dédoublonné ; `robots.txt`.
- **Search Console :** deux vérifications Google présentes dans le DNS. Le site apparaît dans Google avec des liens annexes.

## 10. Pages légales

- **Remplies :** société, BCE, éditeur, hébergeur, durée de conservation des demandes (24 mois).
- **Prestataires déclarés :** Resend, Zoho Mail, Google Analytics, Google Ads et Clarity (affichés seulement une fois activés), Cal.com, WhatsApp, Telegram, Vercel. Lieu de stockage et cadre de transfert indiqués pour chacun.
- **Encore marqué « à vérifier » sur le site :**
  - région du compte Zoho : les MX pointent vers `zoho.eu`, on peut donc écrire « Union européenne » ;
  - durée et détail des cookies Cal.com sur /cookies.
- **À faire relire par un juriste.**

## 11. Variables d'environnement

| Variable | Rôle | En local | Sur Vercel |
|---|---|---|---|
| `QUOTE_TO_EMAIL` | Boîte qui reçoit les demandes (et les réponses des clients aux confirmations) | Renseignée | À vérifier : doit être la boîte de la personne qui traite les demandes |
| `RESEND_API_KEY` | Envoi des e-mails | Renseignée | À vérifier |
| `QUOTE_FROM_EMAIL` | Expéditeur sur domaine vérifié, ex. `Radialec <devis@radialec.be>` ; **requis pour les confirmations** | Absente | Absente |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Alerte instantanée (`npm run telegram -- ids`, puis `-- test`) | Absentes | Absentes |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity | Absente | Absente |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Balise Google Ads (`AW-…`) | Absente | Absente |
| `NEXT_PUBLIC_GA_ID` | Google Analytics (sinon `G-T01KFFNNN3`) | Valeur par défaut | Valeur par défaut |
| `NEXT_PUBLIC_SITE_URL` | Domaine canonique (sinon `https://www.radialec.be`) | Valeur par défaut | Valeur par défaut |

## 12. Messagerie et DNS (Hostinger, vérifié le 12/10)

- **Zoho Mail configuré :** MX `mx.zoho.eu`, `mx2.zoho.eu` et `mx3.zoho.eu`, SPF `include:zohomail.eu`, DKIM `zmail` et vérification Zoho présents. `info@radialec.be` peut recevoir.
- **Pas de DMARC** (`_dmarc.radialec.be`) : conseillé, au minimum `v=DMARC1; p=none`.
- **Domaine pas encore vérifié dans Resend** (aucun enregistrement `send.` ni `resend._domainkey`). C'est ce qui bloque les confirmations client.
  - Ajouter les enregistrements que Resend fournira, puis `QUOTE_FROM_EMAIL`.
  - Le SPF Resend se met sur le sous-domaine `send.` et ne touche pas celui de Zoho.

## 13. À faire

### Comptes et réglages (le propriétaire, avec Claude Code si besoin)

1. **Valider radialec.be dans Resend**, puis mettre `QUOTE_FROM_EMAIL` sur Vercel et redéployer. Ça active les confirmations client et un vrai expéditeur pour les demandes.
2. **Vérifier `QUOTE_TO_EMAIL` sur Vercel.**
3. **Créer le bot Telegram** (@BotFather), récupérer l'identifiant de conversation (`npm run telegram -- ids`), puis mettre les deux variables sur Vercel.
4. **Confirmer que WhatsApp (Business) est actif** sur le +32 486 44 21 86. Idéalement : message d'accueil, horaires, réponses rapides.
5. **Marquer comme événements clés dans GA4** : `generate_lead`, `click_to_call`, `click_whatsapp`.
6. **Clarity** : créer le projet, puis mettre `NEXT_PUBLIC_CLARITY_ID` sur Vercel.
7. **Google Ads** : créer les 5 conversions, puis donner l'identifiant `AW-…` et les 5 libellés. Activer les conversions améliorées. Ne lancer aucune campagne avant « Enregistrement des conversions ».
8. **Ajouter un DMARC.**

### Décisions et contenus (le propriétaire)

1. **Urgence 24h/24 ou 10h–21h ?** Les confirmations disent « appelez-nous 24h/24 », le reste du site « 7j/7 de 10h à 21h ». Si les urgences de nuit sont réelles, l'annoncer partout ; sinon, corriger les confirmations.
2. **Adresse :** la fiche Google dit « Rue du Long Chêne 46 », le site « Lange Eikstraat 46 ». C'est la même rue, mais il faut choisir une seule écriture pour le référencement local.
3. **Contrat d'entretien (130 € / 2 ans) :** préciser ce qu'il comprend avant de le mettre en avant (et avant d'envoyer le message n°3 du kit avis).
4. **Une vraie photo du technicien** pour remplacer les images de technicien générées par IA (bandeau d'appel, CTA final). C'est le seul élément « IA » visible pour un client.
5. **« plus de 30 avis » :** affiché comme minimum (la règle d'origine était « jamais de nombre ») ; à confirmer.
6. **Nouveaux avis Google** : les envoyer chaque mois (les 31 n'ont pas pu être lus, seulement 10).
7. **Relecture juridique** des pages légales ; détails des cookies Cal.com.
8. **Réseaux sociaux** : les ajouter s'ils existent.

### Guides d'aide (plan du 12/10 : `prompts/refonte/08-guides.md`)

- **Rédigés en brouillon, invisibles en production :** `/chauffage/vaillant` (page marque) et `/chauffage/vaillant/codes-erreur` (F.20, F.22, F.27, F.28, F.29, F.75). À relire par le gestionnaire (liste de contrôle dans le fichier 08) ; photos P64 à P66 à fournir.
- **Suite du plan :**
  1. Bulex et ses codes d'erreur ;
  2. chaudière en panne, avec la page d'accueil `/guide` ;
  3. pression chaudière ;
  4. renforcer la page Entretien (réglementation) ;
  5. purger un radiateur ;
  6. chaudière à condensation (sans pourcentage de TVA ni prix) ;
  7. monoxyde de carbone.

### Prochaines pistes (proposées, non commencées)

- **Une page par commune** (Uccle d'abord), seulement avec de vraies réalisations sur place.
- **Option « Urgence en 2 heures » (+50 €)** rendue visible sur les pages de dépannage (texte à valider).
- **Contenu de la fiche Google Business** et textes WhatsApp Business prêts à coller.
- **Audit de vitesse sur mobile.**
- **Import des devis signés dans Google Ads** (conversions hors ligne, grâce au `gclid` déjà présent dans chaque demande).

## 14. Photos et visuels

- **Photos :** 35 livrées sur les 45 du registre (`app/data/assets-needed.ts`). Toutes les places d'image du site ont une photo. Les 10 non livrées ne sont utilisées nulle part : P10, P11, P15, P51, P60 à P63 et les vidéos V01, V02.
- **Pas de rendus 3D**, pas de photo d'équipe.
- **Images de technicien :** ce sont des détourages générés par IA (bandeau d'appel, CTA final).
- **Favicon :** logo Radialec.

## 15. Documents utiles

| Fichier | Contenu |
|---|---|
| `CLAUDE.md`, `app/sections/CLAUDE.md` | Guide du code et décisions du propriétaire (à lire en premier) |
| `prompts/refonte/01-plan.md` à `05-a-faire-session-cloud.md` | Plan de la refonte, photos, questions, réponses du propriétaire |
| `prompts/refonte/06-cta-whatsapp-avis.md` | Boutons d'action, WhatsApp, avis : analyse et règles |
| `prompts/refonte/07-suivi-ads-clarity.md` | Mise en route de Google Ads et Clarity |
| `prompts/refonte/kit-avis/` | Cartes QR à imprimer (format imprimeur et planche A4), QR seul, messages SMS/WhatsApp, modèles de réponse aux avis |
| `scripts/telegram.mjs` | Mise en route du bot (`npm run telegram -- ids`, puis `-- test`) |

## 16. Historique récent

| Date | Changement |
|---|---|
| 08/10 | Réponses du gestionnaire appliquées (prix, conditions, entretien, garanties) ; toutes les pages validées ; Causerie retiré ; pages légales complétées |
| 11/10 | Devis refait (deux colonnes, plus de ticket) ; boutons par intention, WhatsApp, vrais avis Google ; alerte Telegram ; suivi Ads et Clarity préparés ; kit avis et `/avis` ; ménage du code |
| 12/10 | E-mails de confirmation client (devis avec récapitulatif, rappel) ; champ e-mail facultatif sur le rappel ; `/logo-signature.png` |

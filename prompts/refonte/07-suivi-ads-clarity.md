# Refonte Radialec, 07 · Suivi Google Ads et Microsoft Clarity

Préparé le 11 octobre 2026. Tout est codé et désactivé tant que les identifiants ne sont pas renseignés : le site se comporte alors exactement comme avant (Google Analytics seul).

## 1. Ce qui est en place dans le site

**Consentement par finalité** (bannière cookies) :

| Finalité | Outils | Chargés quand |
|---|---|---|
| Mesure d'audience | Google Analytics, Microsoft Clarity | le visiteur accepte « Mesure d'audience » |
| Publicité | Google Ads (mesure des conversions) | le visiteur accepte « Publicité » |

- Rien n'est chargé avant l'accord, pas même une requête sans cookie (mode de consentement « de base »).
- Les signaux du mode de consentement v2 sont transmis à Google, comme il l'exige pour les visiteurs européens.
- Pas de remarketing ni de publicité ciblée : `ad_personalization` reste refusé.
- Quand un nouvel outil est activé, la bannière est reproposée à tous les visiteurs. C'est normal : il s'agit d'une nouvelle finalité, il faut un nouvel accord.
- Les pages /cookies et /confidentialite décrivent automatiquement les outils actifs.

**Conversions Google Ads :**

| Action du visiteur | Événement GA4 | Conversion Ads (clé dans `company.ts`) | Recommandation |
|---|---|---|---|
| Demande de devis envoyée | `generate_lead` (devis) | `devis` | Principale |
| Demande de rappel envoyée | `generate_lead` (rappel) | `rappel` | Principale |
| Rendez-vous réservé (Cal.com) | `generate_lead` (rendez-vous) | `rendezVous` | Principale |
| Clic sur le numéro | `click_to_call` | `appel` | Principale (le téléphone est l'action n°1, mais un clic n'est pas toujours un appel) |
| Clic WhatsApp | `click_whatsapp` | `whatsapp` | Secondaire au début (observation) |

- **Conversions améliorées :** au moment de l'envoi d'un formulaire, l'e-mail et le téléphone du client sont transmis à Google sous forme hachée, uniquement si le visiteur a accepté « Publicité ». Google relie ainsi mieux les demandes aux annonces.
- **Pas de doublon :** la référence de la demande (RAD-…, RAP-…) sert d'identifiant de transaction.
- **Clarity :** tout ce que le client saisit ou relit dans les formulaires (devis, rappel) est masqué dans les enregistrements.

## 2. Microsoft Clarity (5 minutes, gratuit)

1. Sur [clarity.microsoft.com](https://clarity.microsoft.com), connectez-vous avec un compte Microsoft ou Google.
2. Créez un projet « Radialec », site `https://www.radialec.be`.
3. **N'installez pas le script proposé**, ni via l'extension ni via Google Tag Manager : le site le charge lui-même, après accord.
4. Récupérez l'identifiant du projet : Paramètres → Vue d'ensemble (une dizaine de caractères).
5. Dans Vercel → Settings → Environment Variables, ajoutez `NEXT_PUBLIC_CLARITY_ID` = l'identifiant (Production), puis faites un **Redeploy**.
6. Facultatif : Paramètres → Configuration → associer Google Analytics.

## 3. Google Ads

1. Créez le compte Google Ads : fuseau horaire Bruxelles, devise EUR.
2. Allez dans Objectifs → Conversions → « Nouvelle action de conversion » → Site web → `radialec.be` → « Ajouter une action de conversion manuellement ». Créez ces cinq actions :

   | Nom | Catégorie | Comptabilisation |
   |---|---|---|
   | Demande de devis | Envoi de formulaire pour prospects | Une |
   | Demande de rappel | Envoi de formulaire pour prospects | Une |
   | Rendez-vous en ligne | Réservation de rendez-vous | Une |
   | Clic sur le numéro | Contact (ou Appel téléphonique) | Une |
   | Clic WhatsApp | Contact, en action **secondaire** | Une |

   Pour la valeur, laissez « aucune valeur » au début, ou une valeur moyenne par demande si vous la connaissez. Libellés des catégories : prenez le plus proche, ils changent selon les versions de Google Ads.
3. Pour chaque action, ouvrez « Configuration de la balise » → « Utiliser la balise Google » → « Installer vous-même ». Notez :
   - l'**ID de la balise**, `AW-123456789`, le même pour toutes les actions ;
   - le **libellé** de chaque action : la partie après la barre dans `send_to: 'AW-123456789/AbCdEfGh…'`.

   **N'installez aucun code vous-même.**
4. Envoyez les 5 libellés à Claude Code, qui les mettra dans `app/data/company.ts` (`googleAds.conversions`). Ou modifiez ce fichier vous-même.
5. Dans Vercel, ajoutez `NEXT_PUBLIC_GOOGLE_ADS_ID` = `AW-…` (Production), puis faites un **Redeploy**.
6. Activez les conversions améliorées : Objectifs → Paramètres → « Conversions améliorées pour les prospects » → activer, méthode « Balise Google ». Acceptez les conditions relatives aux données client.
7. Vérifiez sur [tagassistant.google.com](https://tagassistant.google.com) : ouvrez radialec.be, acceptez les cookies, puis cliquez sur le numéro. La conversion « Clic sur le numéro » doit apparaître. Dans Google Ads, l'état des conversions passe à « Enregistrement des conversions » sous 24 à 48 h.

**À éviter :**
- **Importer aussi les événements clés GA4 comme conversions principales :** chaque demande serait comptée deux fois. Liez GA4 et Google Ads (GA4 → Administration → Associations de produits) pour voir les données, mais gardez les conversions de la balise Ads comme principales.
- **Lancer une campagne avant que les conversions soient en « Enregistrement des conversions ».**

## 4. Plus tard

- **Ventes réelles :** chaque e-mail de demande contient le `gclid` des visiteurs venus d'une annonce. On pourra importer dans Google Ads les devis réellement signés (« conversions hors connexion ») pour que Google optimise sur les ventes, pas seulement sur les demandes.
- **Mode de consentement « avancé » :** Google estimerait les conversions des visiteurs qui refusent, mais ses balises seraient chargées avant l'accord. Ce n'est pas retenu, par prudence RGPD : à décider avec un juriste.

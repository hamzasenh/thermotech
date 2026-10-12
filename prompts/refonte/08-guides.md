# Refonte Radialec, 08 · Guides d'aide et pages marque

Plan validé le 12 octobre 2026, avec les réponses du propriétaire :
- **TVA :** jamais de pourcentage.
- **Entretien obligatoire :** on renforce la page Entretien existante au lieu de créer un guide.
- **Bulex :** ajouté au plan.
- **Ordre des pages :** révisé (voir le tableau).
- **Prix :** aucune fourchette, un devis.
- **Monoxyde de carbone :** en dernier.
- **Vaillant :** aucun agrément.

## 1. Ordre de publication

| # | Page | Statut |
|---|---|---|
| 1 | `/chauffage/vaillant` (page marque) + `/chauffage/vaillant/codes-erreur` (F.20, F.22, F.27, F.28, F.29, F.75) | **Rédigées, en brouillon, à relire** |
| 2 | `/chauffage/bulex` + `/chauffage/bulex/codes-erreur` (« Bulex F.28 = Vaillant F.28 » seulement si le technicien le confirme) | À faire |
| 3 | `/guide/chaudiere-en-panne-que-faire` + la page d'accueil `/guide` | À faire (route `/guide/<slug>` à créer avec elle) |
| 4 | `/guide/pression-chaudiere` (procédure de remplissage seulement si validée) | À faire |
| 5 | Renforcer `/chauffage/entretien-chaudiere` : fréquence, attestation, locataire ou propriétaire (réglementation bruxelloise à vérifier) | À faire |
| 6 | `/guide/purger-radiateur` (liens vers désembouage et entretien) | À faire |
| 7 | `/guide/chaudiere-condensation` (ni pourcentage de TVA, ni prix : devis) | À faire |
| 8 | `/guide/monoxyde-de-carbone-chaudiere` (sources officielles, à valider) | À faire |

**Règles pour toutes les pages :**
- pas de pourcentage de TVA ;
- pas de prix estimé : soit un prix de `pricing.ts`, soit « sur devis » ;
- aucun agrément de marque ;
- consignes de sécurité reprises telles quelles (`app/data/safety.ts`) ;
- tout nouveau texte en `draft: true` jusqu'à la relecture.

## 2. Comment ça marche dans le code

**Brouillons** (`app/data/visibility.ts`) : un service ou un guide en `draft: true` n'existe pas en production. Pas de page (404), pas d'entrée dans le plan du site, les menus ni la barre mobile.

Pour le voir :
- **en local :** `npm run dev`, puis ouvrir l'adresse de la page ;
- **en aperçu Vercel :** mettre `SHOW_DRAFTS=1` dans les variables de l'environnement *Preview* seulement, puis pousser sur une autre branche que `main`.

Dans les deux cas, la page affiche une pastille « Brouillon à valider » et porte une balise « noindex ».

**Guides :**
- **Contenu :** `app/data/guides/` (un fichier par guide, types dans `types.ts`).
- **Modèle de page :** `app/sections/guide/GuidePage.tsx`.
- **Adresse :** un guide rattaché à une page (`parent`) est servi à `/<parent>/<slug>` par `app/chauffage/[slug]/[guide]/page.tsx`. Un guide sans parent sera servi à `/guide/<slug>` (route à créer avec le premier). Un guide reste caché tant que sa page parente est un brouillon.

**Page marque :** c'est une fiche service ordinaire (`app/data/services/chauffage.ts`, `slug: "vaillant"`). Elle n'est volontairement pas listée dans `categories.ts` : elle n'apparaît pas dans le menu Chauffage.

**Structure d'un guide, pensée pour l'acquisition :**
1. **Haut de page :** la réponse courte, le temps de lecture et la date, Appeler + WhatsApp « Envoyer une photo de l'écran », puis l'accès direct aux codes.
2. **Encadré « Odeur de gaz »** (texte validé Q33).
3. **Les trois réflexes.**
4. **Pour chaque code :**
   - ce que ça veut dire ;
   - « Ce que vous pouvez vérifier sans risque » ;
   - « Appelez un technicien si… » ;
   - une aide en fin de section (« F.28 revient ? » + appel + photo WhatsApp).
5. **Sur ordinateur :** sommaire qui suit la lecture et carte d'aide toujours visible (dépannage 149 € TVAC).
6. **Fin de page :** bandeau dépannage, avis de dépannage, FAQ, services liés, CTA final (urgence → WhatsApp).
7. **Données structurées :** Article, FAQPage, BreadcrumbList.

## 3. À relire par le gestionnaire avant publication

### Page `/chauffage/vaillant`
- [ ] Nous entretenons et dépannons les chaudières Vaillant (marque présente dans nos logos).
- [ ] FAQ « Êtes-vous un service agréé Vaillant ? » : « Non, chauffagiste indépendant […] Nos techniciens sont agréés ».
- [ ] Prix repris de `pricing.ts` : entretien gaz 149 €, dépannage 149 €, heure supplémentaire 60 €, remplacement sur devis.
- [ ] Le bouton « Prendre rendez-vous » ouvre l'agenda Cal.com « Entretien de chaudière ».

### Guide `/chauffage/vaillant/codes-erreur`

Sens des codes, repris de vaillant.be et de la notice ecoTEC plus :

| Code | Sens |
|---|---|
| F.20 | Surchauffe, limiteur de sécurité |
| F.22 | Manque d'eau |
| F.27 | Flamme détectée brûleur éteint |
| F.28 | Échec d'allumage au démarrage |
| F.29 | Flamme perdue en fonctionnement |
| F.75 | Pas de hausse de pression au démarrage de la pompe |

Gestes conseillés au client, **à valider un par un** :
- [ ] Trois réflexes : noter le code et photographier la plaque signalétique, réarmer **une seule fois**, lire la pression (« entre 1 et 2 bar à froid », formulation déjà validée sur la page dépannage).
- [ ] **F.20** : laisser refroidir quelques minutes, vérifier la pression, purger les radiateurs froids en haut, réarmer une fois.
- [ ] **F.22** : sous 1 bar, remplissage « en suivant la notice de votre chaudière », chercher une trace d'eau. Phrase « une pression qui baisse un peu après la purge des radiateurs, c'est normal ».
- [ ] **F.27** : ne pas réarmer, laisser à l'arrêt, appeler.
- [ ] **F.28** : robinet gaz de la chaudière ouvert, tester la cuisinière au gaz, réarmer une fois.
- [ ] **F.29** : autres appareils au gaz, réarmer une fois.
- [ ] **F.75** : remplissage si sous 1 bar, réarmer une fois.
- [ ] FAQ : « nous vous disons s'il faut intervenir » sur photo WhatsApp, supplément week-end et jours fériés.
- [ ] Mention « Relu par … » : à ajouter (`reviewedBy`) seulement si le gestionnaire accepte d'être nommé.

**Pour publier :** passer `draft: false` sur la page Vaillant (`chauffage.ts`) et sur le guide (`vaillant-codes-erreur.ts`). Ensuite, ajouter des liens vers le guide depuis la fiche Dépannage chaudière et, idéalement, faire du logo Vaillant du bloc « marques » un lien vers la page marque.

## 4. Photos à fournir (placeholders affichés en attendant)

| ID | Sujet |
|---|---|
| P64 | Écran d'une Vaillant ecoTEC affichant un code d'erreur (ex. F.28), une main qui montre l'écran (4:3) |
| P65 | Manomètre de chaudière, aiguille entre 1 et 2 bar (4:3) |
| P66 | Chaudière murale Vaillant ecoTEC en situation, mains du technicien sur la façade (paysage) |

À livrer dans `assets/refonte/` puis à déclarer dans `app/data/photos.ts` (même procédure que les autres photos).

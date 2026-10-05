# Refonte Radialec — 01 · Plan complet

Version 2 · 4 octobre 2026 · mise à jour après les retours sur la page pilote. Hors page pilote, rien n'est encore codé.

- Les renvois **[Q12]** pointent vers les questions de `03-questions.md`.
- Les renvois **P05**, **G02**… pointent vers les assets de `02-assets.md`.
- La page pilote `/chauffage/remplacement-chaudiere` est la référence visuelle de tout le site.

### État d'avancement (4 octobre 2026)

**Étape A faite** : le nouveau design est en place sur toutes les pages. Les textes sont ceux d'avant (étape B à venir).

- Accueil, 4 pages catégorie, 23 pages services, Professionnels (page unique), tarifs, contact, devis, rendez-vous, À propos (nouvelle), pages légales, 404.
- Ventilation supprimée ; URL renommées avec redirections permanentes : `/ventilation` → `/climatisation`, `/chauffage/reparation-chaudiere` → `/chauffage/depannage-chaudiere`, `/professionnels/syndics-coproprietes` → `/professionnels`.
- Chaque photo manquante est remplacée par un emplacement réservé qui affiche son identifiant (P06…), le nom de fichier et le sujet (`02-assets.md`). Les faits manquants affichent « À fournir (Qxx) ».
- Mes recommandations ont été appliquées pour les questions de démarrage, sauf Q1 (pas de commit : une archive de sauvegarde a été faite à la place) et Q9 (Next.js pas encore mis à jour).
- Services liés qui pointaient vers la VMC : ramonage → désembouage, détartrage → entretien chaudière, installation clim → dépannage clim, entretien clim → entretien chaudière.

Retours du 5 octobre, appliqués :

- Fonds de section : un seul motif sur tout le site. Après chaque section lavande, on part sur blanc puis on alterne blanc / beige. L'ordre des sections ne bouge jamais, c'est la couleur qui s'adapte.
- Bandeau d'appel du milieu de page (et promo de /tarifs) : seulement la carte lavande, sans fond propre. Il prolonge la section qui le précède et en prend la couleur, blanche ou beige.
- Promo entretien chaudière gaz : 129 € au lieu de 149 € (`pricing.ts`).
- CTA final en lavande sur toutes les pages, footer en bleu nuit.
- Accueil : section « Les marques que nous installons » retirée.
- Pages catégorie : plus de rendu 3D dans le haut de page ; à la place, la liste « Votre besoin ? » avec les prix de départ.
- Raccourcis du haut de page (« Votre chaudière est… », devis express) : pastilles sous les boutons, plus de carte posée sur l'image.
- Bulle du chat Causerie : masquée sur mobile ; une fois fermée, elle ne revient plus de la visite.

### Ce qui a changé depuis la version 1

Décisions prises sur la page pilote, déjà appliquées dans ce plan :

| Sujet | Décision |
|---|---|
| Fond des sections fortes | **Lavande** (haut de page, garantie, bandeau d'appel, footer), préféré au bleu nuit après comparaison côte à côte. Le bleu nuit reste pour le texte, les boutons « Devis » et les petits éléments |
| Bouton du numéro | Le numéro (jamais seulement « Appeler » dans l'en-tête) avec l'icône téléphone, **exactement dans le style du bouton « Demander un devis gratuit » de l'accueil** : rouge du logo qui glisse vers l'orange de la flamme. Ni rouge vif uni, ni orange uni |
| En-tête mobile | Logo + « Radialec » + bouton numéro (format court `0486 44 21 86`) + libellé « MENU » à côté du burger |
| CTA final | Aplat uni `#E83C1C` (teinte moyenne du bouton d'appel), sans dégradé. Numéro en bouton blanc à texte noir ; « Demander un devis gratuit » en noir |
| Bandeau d'appel | « Être rappelé » en bouton blanc à texte noir |
| Garantie | La condition d'exclusivité en petit, en bas du bloc |
| Comparatif gaz / mazout / PAC | Pas de pictogrammes : barre de couleur + statut en grand (« Interdit », « Possible », « TVA 6 % ») |
| Photos | Pas de scène de travail générée par IA : vraies photos cadrées sur les mains et les détails, en tenue sombre unie sans logo ; traitement photo commun |
| Images des techniciens | Renommées par le propriétaire avec des noms descriptifs (voir `02-assets.md` § 6) |
| Ventilation | Supprimée du site (étape A) |

## Sommaire

1. Objectif et règles du jeu
2. Système de design
3. Stratégie SEO
4. Arborescence, navigation et suppression de la ventilation
5. Gabarits
6. Les pages, une par une
7. Ordre de réalisation

---

## 1. Objectif et règles du jeu

### 1.1 Objectif

- **Être n°1 sur Google à Bruxelles sur les requêtes chaudière** (chauffagiste, entretien, dépannage, remplacement), puis sur les autres métiers.
- **Convertir.** Chaque page pousse vers l'appel (action n°1), puis le devis, le rappel et le rendez-vous.
- **Mesurer.** Clics sur le numéro (`click_to_call`), demandes envoyées (`generate_lead` : devis, rappel, rendez-vous), positions et clics dans Search Console sur les requêtes prioritaires.

### 1.2 Ce que le site peut faire, et ce qu'il ne peut pas faire seul

Sur « chauffagiste Bruxelles », Google affiche d'abord la carte avec trois fiches Google Business, puis les résultats classiques. Le classement dépend de quatre choses :

1. la pertinence des pages ;
2. la fiche Google (catégories, avis, proximité) ;
3. l'autorité du site (les liens qui pointent vers lui) ;
4. l'expérience (vitesse, mobile).

Le site couvre la pertinence, la technique et la conversion. La fiche Google, les avis et les liens se travaillent à côté (§ 3.4). Sans eux, même un site parfait ne suffit pas pour être n°1. Je le dis maintenant pour qu'on s'y attaque en parallèle.

### 1.3 Règles de design (non négociables)

Ce qui donne l'impression d'un site « codé à l'arrache par une IA », et ce qu'on fait à la place :

| Banni | À la place |
|---|---|
| Pictogrammes génériques dans des pastilles colorées | Typographie (chiffres, statuts), vraies photos, rendus 3D maison des 4 métiers |
| Dégradés sur de grandes surfaces, titres en dégradé | Aplats : lavande, blanc, craie. Le dégradé flamme reste réservé au petit bouton d'appel. Seule lueur : le léger rosé qui monte du bas des sections lavande |
| Scènes de travail générées par IA, photos de banque présentées comme nos réalisations | Vraies photos cadrées sur le geste, avec un traitement commun. L'IA seulement pour des poses ou des objets |
| Tout centré, sections identiques empilées | Grille 12 colonnes, mises en page qui alternent, rythme lavande / blanc / craie |
| Emojis, phrases creuses (« passionnés », « solutions sur mesure ») | Phrases concrètes : chiffres, prix, délais, communes bruxelloises |
| Animations décoratives (particules, parallaxe, confettis) | Mouvement utile : les étapes suivent la lecture, apparitions sobres, respect du réglage « réduire les animations » |
| Un numéro écrit en texte avec une icône | Un vrai bouton orange avec le numéro, partout |
| Emplacements gris, faux contenus | Chaque gabarit a une version sans photo, soignée et typographique |

Concrètement, ce qui fait « fin 2026 » :

- une police variable (largeur et graisse) et des chiffres alignés ;
- une typographie française propre (espaces insécables avant `? ! : ;`) ;
- des transitions fluides entre les pages ;
- des animations au défilement en CSS, sans JavaScript lourd ;
- des états soignés : survol, focus clavier, chargement sans saut de mise en page ;
- un affichage principal en moins de 2 secondes en 4G.

---

## 2. Système de design

Tout est déjà en place sur la page pilote. Il reste à le généraliser.

### 2.1 Couleurs

| Token | Hex | Usage |
|---|---|---|
| `lavender` | `#EAEEFE` | **Sections fortes** : haut de page, garantie, bandeau d'appel, footer |
| `blaze` | `#E83C1C` | Aplat du CTA final : teinte moyenne du bouton d'appel. **Le bouton d'appel** reprend exactement celui de l'accueil : rouge du logo vers l'orange de la flamme |
| `flame` | `#E52619` | Rouge du logo : lueur en bas des sections lavande, petits accents (sur-titres, verdict « gaz ») |
| `night` | `#0B1222` | Titres et texte, boutons « Devis », petits éléments (pastilles des étapes, FAQ ouverte), carte des prix |
| `chalk` | `#F6F3EE` | Fonds de lecture alternés |
| blanc | `#FFFFFF` | Fond principal |
| `water` / `water-light` | `#3468AF` / `#38B7E8` | Liens, eau, froid, pompe à chaleur |
| `ember` | `#ED7020` | Accent flamme, rare |
| `bolt` | `#FFD505` | Étoiles Google. **Jamais en texte sur fond clair** |

Le dégradé des trois énergies (flamme → éclair → goutte) ne sert qu'aux filets fins : sur-titres, rail des étapes, haut du footer.

### 2.2 Typographie

- **Archivo**, variable : les titres en version large (112,5 à 125 %) et très grasse, le texte en largeur normale.
- **Geist** : uniquement le mot « Radialec » du logo, qui ne change jamais.
- **Geist Mono** : les prix, sur la carte des tarifs.
- Échelle :
  - H1 : 33 → 51 px (mobile → grand écran) ;
  - H2 : 34 → 51 px ;
  - H3 : 22 → 35 px ;
  - texte : 17 px ;
  - petits textes : 13–14 px.

### 2.3 Grille et rythme

- Conteneur de 1 120 à 1 280 px, grille de 12 colonnes.
- Espacements sur une base de 8 px. Sections de 80 à 112 px en hauteur sur ordinateur, 64 à 80 px sur mobile.
- Alternance des fonds : lavande (moments forts) → blanc (lecture) → craie (respiration). Jamais deux sections lavande qui se suivent.

### 2.4 Photos

- Traitement commun `.v2-grade` sur toute photo rectangulaire : noirs bleu nuit, tons chauds, grain fin.
- Formats : 4:5 en portrait (haut de page, étapes) et 3:2 en paysage (cartes, guides). Angles arrondis de 28 px.
- Pas de photo ? La section passe en version typographique. Jamais d'emplacement vide en production.

### 2.5 Boutons et actions

| Action | Style | Où |
|---|---|---|
| **Appeler** | Style du bouton « Demander un devis gratuit » de l'accueil (rouge du logo → orange de la flamme), avec le numéro et l'icône téléphone. Blanc à texte noir sur le CTA orange | Partout : en-tête (numéro aussi sur mobile), barre mobile, hauts de page, bandeaux, footer |
| Demander un devis | Nuit ou blanc | Pages installation, en-tête |
| Prendre rendez-vous | Nuit ou contour | Pages entretien |
| Être rappelé | Blanc à texte noir sur les bandeaux lavande, contour sur fond blanc | Bandeaux, FAQ, pages urgence |

L'ordre dépend de l'intention de la page :

| Intention | Ordre des actions |
|---|---|
| Urgence | Appeler → Être rappelé |
| Entretien | Appeler → Prendre rendez-vous |
| Installation | Appeler → Devis (+ devis express) |

### 2.6 Composants

**Déjà faits (page pilote) :**

- en-tête, footer, barre d'actions mobile ;
- haut de page service avec devis express ;
- étapes, marques, encadré comparatif avec verdicts, chiffres mis en avant (garantie) ;
- bandeau d'appel, preuve (Google + agréments), FAQ, zones, services liés, CTA final.

**À créer :**

| Composant | Rôle |
|---|---|
| Haut de page d'accueil | Avec aiguillage « Votre chaudière est… » |
| Haut de page catégorie | Rendu 3D du métier ou photo + aiguillage |
| Grille de services (catégories) | Groupes, prix « dès », photos |
| Liste numérotée (remplace les blocs à icônes) | Sans pictogramme : numéro, titre, texte |
| Checklist | Photo + liste cochée |
| Comparatif d'options | 2 à 3 cartes, ou tableau sur ordinateur |
| Carte des prix | La « carte » nuit de /tarifs, que le propriétaire aime, avec pointillés et prix en mono. Seule grande surface foncée conservée : à revoir si elle détonne à côté du lavande |
| Alerte sécurité | Bloc à fort contraste avec le numéro d'urgence |
| Guide (texte long) | Sommaire collant, intertitres, encadrés |
| En-tête des pages utilitaires | Version compacte du haut de page |
| Formulaires v2 | Devis (3 étapes), rappel, prise de rendez-vous (Cal.com) |
| Pages légales v2 et 404 v2 | — |
| Carte des communes | SVG tracé à partir de données ouvertes (UrbIS / Statbel) |
| Méga-menu groupé | « Votre chaudière » d'un côté, « Chauffage » de l'autre |

### 2.7 Accessibilité et performance

- Contraste AA visé partout. Le texte blanc des boutons d'appel est en gras.
- Focus visible, navigation au clavier, libellés ARIA.
- Pages générées en statique. Image du haut de page prioritaire, le reste en chargement différé. Polices préchargées.
- Budget : moins de 120 ko de JavaScript ajouté par page, aucun saut de mise en page.

---

## 3. Stratégie SEO

### 3.1 Requêtes prioritaires

Ce sont des hypothèses, à confirmer avec Search Console [Q11, Q13].

| Requête (et variantes) | Intention | Page cible | Priorité |
|---|---|---|---|
| chauffagiste bruxelles | Trouver un pro | Accueil | P1 |
| entretien chaudière bruxelles · prix entretien chaudière · attestation entretien chaudière | Entretien | `/chauffage/entretien-chaudiere` | P1 |
| entretien chaudière gaz / mazout bruxelles | Entretien | Idem (sections gaz / mazout) | P1 |
| dépannage chaudière bruxelles · chaudière en panne · réparation chaudière · plus d'eau chaude | Urgence | `/chauffage/depannage-chaudiere` | P1 |
| remplacement chaudière bruxelles · installation chaudière · prix nouvelle chaudière | Projet | `/chauffage/remplacement-chaudiere` | P1 |
| pompe à chaleur bruxelles · installation PAC · prix PAC | Projet | `/chauffage/pompe-a-chaleur` | P2 |
| chauffage bruxelles · installateur chauffage | Général | `/chauffage` | P2 |
| entretien / dépannage chaudière + marque (Vaillant, Bulex…) | Entretien, urgence | Pages marques (étape C) | P2 |
| code erreur + marque + code (ex. « Vaillant F28 ») | Info → urgence | Pages codes erreur (étape C) | P3 |
| chauffagiste + commune (Uccle, Ixelles…) | Local | Pages communes (étape C) | P3 |
| électricien bruxelles · électricien urgence | Urgence | `/electricite`, dépannage électrique | P2 |
| plombier bruxelles · plombier urgence · débouchage wc bruxelles | Urgence | `/plomberie`, dépannage, débouchage | P2 |
| mise en conformité électrique · borne de recharge · parlophone | Projet | Pages concernées | P3 |
| installation airco · entretien airco · PAC bruxelles | Projet, entretien | `/climatisation` et pages | P3 |

Bruxelles est bilingue et compte beaucoup d'expatriés. Des versions néerlandaise et anglaise pourraient peser lourd [Q15].

### 3.2 Architecture et maillage interne

**Une page par intention.** Deux pages ne visent jamais la même requête principale. Pour éviter que l'accueil et la page Chauffage se concurrencent :

- **l'accueil vise « chauffagiste Bruxelles »** : c'est elle qui reçoit le lien de la fiche Google ;
- **`/chauffage` vise « chauffage Bruxelles »** et la vue d'ensemble des services. Son H1 change en conséquence.

**Le cluster chaudière :**

```
Accueil
└── /chauffage
    ├── entretien ↔ dépannage ↔ remplacement   (liens croisés systématiques)
    ├── pompe à chaleur, radiateurs, désembouage, boiler, ramonage
    └── étape C : marques, codes erreur, guides
```

Chaque page service a des liens vers :

- sa catégorie et 3 à 4 pages sœurs ;
- `/tarifs` et `/devis` (ou `/rendez-vous`) ;
- des pages liées directement dans le texte (« Réparer ou remplacer ? » → remplacement), avec des ancres descriptives.

Le fil d'Ariane est visible partout, et le footer donne le plan complet du site.

### 3.3 Règles par page

- **Title** : 60 caractères maximum, « Service à Bruxelles + différenciateur » (prix, 7j/7, délai). Les prix sont générés depuis `pricing.ts` pour rester synchronisés.
- **Meta description** : 155 caractères maximum, avec prix ou promesse, puis une action.
- **Un seul H1**, avec la requête principale et « Bruxelles ».
- **L'introduction répond à l'intention en deux phrases** (prix, délai, zone), avant tout le reste.
- **Le prix est visible dès le haut de page** quand il est validé : c'est le premier levier de clic et de conversion.
- **Les H2 sont de vrais sujets ou de vraies questions**, inspirés des « Autres questions posées » de Google.
- **Les images sont originales**, avec un nom de fichier et un texte alternatif descriptifs.
- **« Mis à jour le … » visible** sur les pages services, pour la fraîcheur et la crédibilité.

### 3.4 SEO local, hors site (premier levier pour la carte Google)

**Fiche Google Business [Q12] :**

- une catégorie principale liée au chauffage, plus plombier et électricien en secondaire (intitulés exacts à choisir dans l'interface) ;
- les services avec leurs prix, de vraies photos, les horaires, la zone desservie ;
- des posts réguliers ;
- un lien vers l'accueil avec un paramètre de suivi.

**Avis :**

- demander un avis à chaque intervention, avec un lien direct et un QR code sur une carte remise au client (je la conçois, c'est gratuit) [Q18] ;
- répondre à chaque avis.

**Cohérence et liens :**

- **Nom, adresse et téléphone identiques partout.** L'adresse manque encore [Q20].
- **Annuaires gratuits** : Pages d'Or, Infobel, Cylex, Hotfrog, Yelp, Bing Places, Apple Business Connect, Facebook [Q16].
- **Liens entrants** : listes d'installateurs des marques de chaudières (si vous y êtes référencés), fournisseurs, syndics partenaires, presse locale [Q16].

### 3.5 Technique

- Génération statique, sitemap, robots et URL canoniques : déjà en place.
- **Redirections 301** pour l'ancien site éventuel [Q3], les pages ventilation si elles sont indexées [Q2] et les URL renommées [Q4, Q5].
- **Données structurées :**

| Type | Contenu |
|---|---|
| `LocalBusiness` | Typé `HVACBusiness` + `Plumber` + `Electrician`, avec `areaServed` (communes) |
| `Service` + `Offer` | Prix TVAC, par page service |
| `BreadcrumbList` | Fil d'Ariane |
| `FAQPage` | Aide la compréhension. Depuis 2023, Google ne l'affiche plus en résultat enrichi pour ce type de site |

  Pas de balisage d'avis sur notre propre site : Google l'ignore pour les entreprises locales.
- **Si NL/EN** : balises `hreflang` et URL `/nl/…` et `/en/…` [Q15].

### 3.6 Mesure

- **GA4 est en place** (`click_to_call`, `click_email`, `generate_lead`). Ces événements sont à marquer comme événements clés.
- **Search Console à connecter** [Q11]. Les positions se suivent avec Search Console (gratuit).
- Un point mensuel : requêtes, positions, clics, appels, demandes.

---

## 4. Arborescence, navigation et suppression de la ventilation

### 4.1 Arborescence cible

```
/                                         Accueil
/chauffage                                Catégorie chauffage
  /chauffage/remplacement-chaudiere       ✓ pilote
  /chauffage/entretien-chaudiere
  /chauffage/depannage-chaudiere          (aujourd'hui reparation-chaudiere) [Q4]
  /chauffage/pompe-a-chaleur
  /chauffage/entretien-chauffe-eau-boiler
  /chauffage/desembouage
  /chauffage/installation-radiateurs
  /chauffage/ramonage-cheminee
/electricite                              + 8 pages
/plomberie                                + 3 pages (+ lien vers boiler)
/climatisation                            + 3 pages (+ lien vers pompe à chaleur)
/professionnels                           page unique (fusion avec syndics-coproprietes) [Q5]
/tarifs  /devis  /rendez-vous  /contact
/a-propos                                 nouvelle page
/mentions-legales  /confidentialite  /cookies  + page 404
Étape C (à valider) : pages marques, codes erreur, guides, communes, versions NL/EN
```

### 4.2 Navigation

**En-tête :**

- liens : Chauffage, Électricité, Plomberie, Climatisation, Tarifs, Contact ;
- boutons : « Devis gratuit » (nuit) et le numéro (style flamme, avec l'icône téléphone, aussi sur mobile) ;
- méga-menu Chauffage en deux groupes :
  - **Votre chaudière** : Entretien, Dépannage, Remplacement ;
  - **Chauffage** : Pompe à chaleur, Radiateurs, Désembouage, Boiler, Ramonage.

**Footer :** plan complet, plus Professionnels, À propos, Rendez-vous et les pages légales.

**Mobile :** en-tête avec logo, « Radialec », numéro et « MENU » ; barre fixe « Appeler » (style flamme) et « Devis gratuit » (nuit).

### 4.3 Suppression de la section ventilation

**À supprimer :**

- `/ventilation` et `/ventilation/entretien` : pages, images de partage, `app/data/services/ventilation.ts` ;
- l'entrée `ventilation` de `categories.ts`.

**À retirer ailleurs :**

- en-tête, footer, sitemap ;
- option « Ventilation » du formulaire de devis ;
- sujet « Ventilation » du formulaire de rappel ;
- liste des services de la catégorie Climatisation ;
- services liés qui pointent vers la VMC :

| Page | Lien VMC remplacé par |
|---|---|
| Ramonage | Désembouage |
| Détartrage | Entretien boiler |
| Installation climatisation | Dépannage climatisation |
| Entretien climatisation | Pompe à chaleur |

Si ces pages sont déjà indexées par Google : redirection 301 vers `/climatisation` [Q2].

Ces fichiers n'ont jamais été commités. Je propose un commit de sauvegarde avant de commencer, pour pouvoir les retrouver un jour [Q1].

---

## 5. Gabarits

### 5.1 Page service (généralisation du pilote)

1. **Haut de page lavande** :
   - fil d'Ariane, sur-titre, H1, introduction ;
   - boutons selon l'intention (§ 2.5) et prix « dès … » s'il est validé ;
   - preuves (Google, garantie, délai), photo 4:5 ;
   - module d'aiguillage selon l'intention :

| Intention | Module |
|---|---|
| Installation | Devis express (« Quel chauffage avez-vous aujourd'hui ? ») |
| Urgence | Diagnostic express (« Quel est le problème ? ») |
| Entretien | Créneau express (agenda) |

   - chiffres clés en pied de haut de page.
2. **Blocs de contenu**, dans l'ordre des données. Le bandeau d'appel s'insère après le 2e bloc.
3. **Preuve** : note Google et agréments.
4. **FAQ.**
5. **Zone d'intervention** : carte et communes.
6. **Services liés.**
7. **CTA final** en aplat uni `#E83C1C`, avec le technicien détouré : numéro en bouton blanc à texte noir, « Demander un devis gratuit » en noir.

Correspondance des blocs :

| Bloc | Composant v2 |
|---|---|
| `features` | Liste numérotée, sans icônes |
| `checklist` | Photo + liste |
| `options` | Comparatif |
| `pricing` | Carte des prix nuit |
| `alert` | Alerte sécurité |
| `callout` | Encadré éditorial (+ verdicts) |
| `steps` | Étapes (avec photos si elles existent, sinon version texte) |
| `highlight` | Chiffres mis en avant |
| `brands` | Marques |

### 5.2 Page catégorie (hub)

1. Haut de page lavande : H1, introduction, appel et devis, rendu 3D du métier ou photo, aiguillage vers les services.
2. Grille des services : groupes, photos, prix « dès … » validés.
3. Chiffres clés.
4. Bandeau d'appel.
5. « Pourquoi Radialec » en liste numérotée.
6. Carte des prix du métier.
7. Marques (chauffage seulement).
8. Guide : le texte SEO long, avec sommaire.
9. Preuve.
10. Zones.
11. FAQ.
12. CTA final.

### 5.3 Pages utilitaires

En-tête compact lavande, contenu sur blanc ou craie, actions (appel, devis), FAQ si utile.

### 5.4 Pages légales et 404

Typographie de lecture soignée, sommaire, mise à jour datée. La 404 propose les trois services chaudière et le numéro.

---

## 6. Les pages, une par une

Format de chaque fiche :

- statut du contenu (validé / brouillon) ;
- requêtes visées ;
- title, meta description, H1 ;
- sections et contenu ;
- maillage ;
- assets ;
- points à valider.

« Brouillon » veut dire un texte rédigé par IA, pas encore relu par le propriétaire : je le reprends et le complète à l'étape B, puis il est validé avant publication.

### 6.1 Accueil `/`

- **Statut** :
  - validés : bandeau confiance, services et tarifs (brief accueil), CTA urgence (brief CTA) ;
  - brouillon : le reste.
- **Requêtes** : chauffagiste bruxelles, Radialec.
- **Title** : « Chauffagiste à Bruxelles – chaudière, entretien, dépannage »
- **Meta** : « Chauffagiste à Bruxelles : entretien de chaudière dès 149 € TVAC, dépannage 7j/7 sous 24h, remplacement sur devis gratuit. Électricité et plomberie aussi. »
- **H1** : « Chauffagiste à Bruxelles : votre chaudière, notre spécialité » (le slogan actuel avec le mot-clé).

**Sections :**

1. **Haut de page lavande.**
   - Sur-titre « Chauffage · Électricité · Plomberie · 7j/7 », puis le H1.
   - Introduction : l'actuelle (« Entretien, dépannage et installation de chaudières à Bruxelles et ses environs, 7j/7… »), complétée par la plomberie et la climatisation.
   - Boutons Appeler et Devis gratuit. Preuves : 5/5 Google · 19 avis, +200 clients, garantie 2 ans.
   - Photo P06 ou P02.
   - **Aiguillage « Votre chaudière est… »** :

| Choix | Mène vers |
|---|---|
| En panne | Dépannage |
| À entretenir | Entretien |
| À remplacer | Remplacement |
| Autre besoin | Les 3 autres métiers |

2. **Bandeau confiance (validé)** : +200 clients satisfaits · Disponible 7j/7 · Intervention sous 24h · Prix transparents, sans surprise.
3. **« Votre chaudière »** : les 3 services phares en grand, avec photo.
   - H2 proposé : « Entretien, dépannage, remplacement : tout pour votre chaudière ».
   - Entretien : dès 149 € TVAC.
   - Dépannage : 149 € TVAC, déplacement + diagnostic + 1re heure.
   - Remplacement : devis sous 24h, garantie 2 ans + 2 ans.
4. **Les 4 métiers (validé)** :
   - Chauffage, Électricité, Plomberie & sanitaire, Climatisation & PAC ;
   - sous-services cliquables (exigence du brief), rendus 3D maison.
5. **Tarifs (validé)** : « Des tarifs clairs, sans surprise ».
   - Dépannage 149 €, entretien gaz 149 €, chauffe-eau dès 129 €, installation sur devis.
   - Présentés sur la carte nuit, avec un lien vers /tarifs.
6. **Comment ça se passe** (brouillon) : vous appelez → on fixe le créneau → prix annoncé avant de commencer → intervention garantie.
7. **Preuve** : note Google, agréments des 3 régions.
8. **Zones** : carte et communes.
9. **FAQ** : les 5 questions actuelles, plus « Combien coûte un entretien de chaudière ? ».
   - **La réponse 1 propose des devis « au mazout », ce qui contredit l'interdiction bruxelloise** [Q34].
10. **CTA final urgence (validé)** : « Une urgence ? Votre technicien est (presque) déjà en route. » [Q10]

- **Maillage** : 3 services chaudière, 4 catégories, tarifs, devis, contact.
- **Assets** : P02 ou P06, P05, P09, rendus 3D, G02, G03, `technicien-cta.png`.

### 6.2 Chauffage

#### Catégorie `/chauffage`

- **Statut** : brouillon.
- **Requêtes** : chauffage bruxelles, installateur chauffage bruxelles.
- **Title** : « Chauffage à Bruxelles : chaudière, PAC, radiateurs »
- **Meta** : « Chaudière, pompe à chaleur, radiateurs, boiler : installation, entretien et dépannage de chauffage à Bruxelles, 7j/7. Prix affichés, devis gratuit sous 24h. »
- **H1** : « Chauffage à Bruxelles : chaudières, pompes à chaleur et radiateurs ». Il remplace « Chauffagiste à Bruxelles… », pour laisser cette requête à l'accueil.

**Sections :**

- Haut de page avec rendu 3D de chaudière ou P05, et l'aiguillage panne / entretien / remplacement / autre.
- Services en deux groupes :
  - **« Votre chaudière »** en grand : remplacement, entretien, dépannage ;
  - **« Le reste de votre chauffage »** : PAC, radiateurs, désembouage, boiler, ramonage.
- Chiffres clés.
- Bandeau d'appel.
- Pourquoi Radialec : la section « why » actuelle, en liste numérotée.
- **Carte des prix chauffage (validés)** :

| Prestation | Prix TVAC |
|---|---|
| Entretien chaudière gaz | 149 € |
| Entretien chaudière mazout | 219 € |
| Dépannage | 149 € |
| Entretien chauffe-eau | 129 € |
| Entretien boiler électrique | 149 € |
| Ramonage | 149 € |
| Entretien PAC | 180 € |

- Marques.
- Guide : le texte « guide » actuel, relu, avec sommaire.
- Preuve, zones, FAQ de la catégorie (sans doublon avec les pages services), CTA final.

**Assets** : P05, P06, P09, P12, P16, `chaudiere-icon.png`.

#### `/chauffage/remplacement-chaudiere` — page pilote, faite

Il reste :

- les photos P01 à P05 ;
- un prix « à partir de » [Q21] ;
- la TVA 6 % sur la rénovation [Q23] ;
- le titre « Nos partenaires de confiance » ou « Les marques que nous installons » [Q24].

#### `/chauffage/entretien-chaudiere`

- **Statut** : **validé** (textes conservés mot pour mot, nouvelle mise en forme).
- **Requêtes** : entretien chaudière bruxelles, prix entretien chaudière, entretien chaudière gaz / mazout, attestation entretien chaudière.
- **Title** : « Entretien de chaudière à Bruxelles dès 149 € TVAC » (prix tiré de `pricing.ts`).
- **Meta** : la meta validée, avec le prix ajouté : « Entretien de chaudière obligatoire à Bruxelles : gaz ou mazout, technicien agréé, attestation remise immédiatement. Dès 149 € TVAC, RDV en ligne. » (à valider)
- **H1 (validé)** : « Entretien de chaudière à Bruxelles et ses environs ».
- **Intention entretien** : Appeler + Prendre rendez-vous. **Nouveau** : l'agenda Cal.com directement dans la page, en section « Choisissez votre créneau », chargé seulement quand il devient visible [Q44].

**Sections :**

1. Haut de page avec « dès 149 € TVAC » (et 169 € barré tant que la promo est active [Q22]).
2. Chiffres validés : dès 149 €, environ 45 min, attestation immédiate, technicien agréé.
3. « Un entretien obligatoire, pas une option ».
4. « Ce qui est inclus dans votre entretien » : checklist et photo P07.
5. Process, avec les photos P06, P03 et P08.
6. Marques.
7. Tarifs : gaz 149 €, mazout 219 €.
8. FAQ : les 8 questions validées.
9. Preuve, zones.
10. CTA « Votre entretien est (bientôt) dû ? Prenons rendez-vous. »

**Ajout SEO à valider** : un H2 « Chaudière gaz ou mazout : fréquence et prix », bâti uniquement sur les réponses déjà validées.

- **Maillage** : dépannage, désembouage, boiler, ramonage, tarifs, rendez-vous.
- **Assets** : P06, P07, P08, P03.

#### `/chauffage/depannage-chaudiere` (aujourd'hui `/reparation-chaudiere`) [Q4]

- **Statut** : brouillon.
- **Requêtes** : dépannage chaudière bruxelles, chaudière en panne, réparation chaudière, plus d'eau chaude, chaudière perd de la pression.
- **Title** : « Dépannage chaudière à Bruxelles 7j/7 – 149 € TVAC »
- **Meta** (actuelle, bonne) : « Chaudière en panne à Bruxelles ? Dépannage 7j/7, intervention sous 24h, toutes marques. 149 € TVAC déplacement + diagnostic + 1re heure. Appelez-nous. »
- **H1** : « Dépannage et réparation de chaudière à Bruxelles, 7j/7 ».
- **Intention urgence** :
  - le numéro en très grand, puis Être rappelé ;
  - **diagnostic express** « Quel est le problème ? » : plus de chauffage, plus d'eau chaude, pression qui baisse, code erreur, fuite. Chaque choix mène à la réponse utile, puis à l'appel.

**Sections :**

1. Haut de page.
2. Chiffres : 149 €, sous 24h, 7j/7, garantie 2 ans.
3. « Les pannes de chaudière que nous réparons ».
4. **Alerte « Odeur de gaz ? »** : réflexes et numéro d'urgence gaz, à faire valider [Q33].
5. « Avant d'appeler : 3 vérifications rapides ».
6. Process.
7. Tarif : 149 €, puis l'heure supplémentaire [Q22].
8. « Toutes marques » [Q24].
9. FAQ (8 questions), preuve, zones.
10. CTA urgence.

**À vérifier** : « toutes marques », la garantie sur les dépannages [Q35], les consignes gaz [Q33].

- **Maillage** : remplacement (« Réparer ou remplacer ? »), entretien, codes erreur (étape C).
- **Assets** : P09, P10, P03.

#### `/chauffage/pompe-a-chaleur`

- **Statut** : brouillon.
- **Requêtes** : pompe à chaleur bruxelles, installation pac, prix pompe à chaleur, pac air-eau.
- **Title** : « Pompe à chaleur à Bruxelles : installation, TVA 6 % »
- **Meta** : l'actuelle. **H1** : « Installation de pompe à chaleur à Bruxelles et ses environs ».
- **Sections** :
  - haut de page avec devis express (chauffage actuel) et chiffres (TVA 6 %, validée sur la page pilote) ;
  - « Pourquoi passer à la PAC » ;
  - comparatif air-eau / air-air / hybride ;
  - étapes ;
  - checklist « Ce que nous vérifions avant d'installer » ;
  - tarifs : sur devis [Q21] + entretien PAC 180 € ;
  - FAQ (8 questions). La réponse sur les primes doit dire que RENOLUTION est suspendu (validé) et renvoyer vers environnement.brussels ;
  - CTA.
- **À vérifier par un technicien** : bruit, efficacité en hiver, compatibilité des radiateurs.
- **Assets** : P12, P13.

#### `/chauffage/entretien-chauffe-eau-boiler`

- **Statut** : brouillon.
- **Requêtes** : entretien boiler bruxelles, entretien chauffe-eau, boiler qui goutte.
- **Title** : « Entretien de boiler et chauffe-eau à Bruxelles dès 129 € »
- **H1** : l'actuel.
- **Partage des requêtes avec le détartrage** : cette page vise l'entretien du boiler et du chauffe-eau ; la page détartrage vise la robinetterie, les canalisations et le calcaire, et renvoie ici pour le boiler.
- **Sections** : les actuelles (pourquoi, checklist, comparatif des appareils, signes d'alerte, tarifs 129 € / 149 €), FAQ (7 questions).
- **À préciser** : le type d'appareil à 129 € [Q32].
- **Assets** : P17.

#### `/chauffage/desembouage`

- **Statut** : brouillon.
- **Requêtes** : désembouage chauffage bruxelles, radiateurs froids en bas, prix désembouage.
- **Title** : « Désembouage de radiateurs et chauffage à Bruxelles »
- **H1** : l'actuel.
- **Sections** : signes, méthodes (comparatif), étapes, « Nouvelle chaudière ou PAC ? Désembouez d'abord », FAQ (7 questions).
- **À fournir** : un prix « à partir de » [Q21].
- **Assets** : P16. C'est la photo la plus parlante : l'eau boueuse dans un récipient transparent.

#### `/chauffage/installation-radiateurs`

- **Statut** : brouillon.
- **Requêtes** : installation radiateur bruxelles, remplacement radiateur.
- **Title** : « Installation et remplacement de radiateurs à Bruxelles »
- **Sections** : les actuelles (comparatif des radiateurs, interventions, étapes, alerte « pas forcément à remplacer », radiateurs et PAC), FAQ (7 questions).
- **À fournir** : un prix « à partir de » [Q21].
- **Assets** : P14, P15.

#### `/chauffage/ramonage-cheminee`

- **Statut** : brouillon.
- **Requêtes** : ramonage bruxelles, prix ramonage cheminée.
- **Title** : « Ramonage de cheminée à Bruxelles – 149 € TVAC »
- **Sections** : les actuelles, FAQ (7 questions).
- **À vérifier** : la question « Le ramonage est-il obligatoire ? » (réglementation) et l'attestation incluse ou non [Q32].
- **Lien VMC remplacé** par le désembouage.
- **Assets** : P18. `ramonage.jpg` ne fait que 275 px : il est trop petit.

### 6.3 Électricité

Même gabarit. Tous les contenus sont des brouillons. Seul prix validé : le dépannage à 149 €.

| Page | Title proposé | Requêtes | Points à valider | Assets |
|---|---|---|---|---|
| `/electricite` | « Électricien à Bruxelles 7j/7 – dépannage, conformité » | électricien bruxelles | Texte du guide | P20, P21, `panel-icon.png` |
| `/electricite/depannage-electrique` | « Électricien en urgence à Bruxelles – 149 € TVAC » | électricien urgence bruxelles, panne de courant | Consignes de sécurité | P20, P22 |
| `/electricite/installation-electricite` | « Installation électrique à Bruxelles (RGIE) » | installation électrique bruxelles | Prix « dès » [Q21] | P21 |
| `/electricite/mise-en-conformite-electrique` | « Mise en conformité électrique à Bruxelles (RGIE) » | mise en conformité électrique, contrôle RGIE vente | **Seul un organisme agréé délivre le certificat** : la FAQ doit le dire clairement | P21, P25 |
| `/electricite/renovation` | « Rénovation électrique et tableau à Bruxelles » | remplacement tableau électrique | Prix « dès » [Q21] | P21 |
| `/electricite/schema-electrique` | « Schéma électrique unifilaire à Bruxelles » | schéma unifilaire bruxelles | Prix [Q21] | P25 |
| `/electricite/installation-borne-recharge` | « Installation de borne de recharge à Bruxelles » | borne de recharge bruxelles | Réseau 3×230 V : à vérifier par un technicien | P23 |
| `/electricite/installation-parlophonie` | « Installation de parlophone à Bruxelles » | parlophone bruxelles | Prix [Q21] | P24, P52 |
| `/electricite/installation-videophonie` | « Installation de vidéophone à Bruxelles » | vidéophone bruxelles | Prix [Q21] | P24 |

Sur toutes ces pages :

- **H1 et sections** : ceux des données actuelles, repris dans le nouveau gabarit. Les blocs à icônes deviennent des listes numérotées, les tarifs passent sur la carte nuit.
- **Requêtes secondaires** : la question principale de chaque FAQ (« Pourquoi mon différentiel saute-t-il ? »…).

### 6.4 Plomberie

| Page | Title proposé | Requêtes | Points à valider | Assets |
|---|---|---|---|---|
| `/plomberie` | « Plombier à Bruxelles 7j/7 – fuite, débouchage » | plombier bruxelles | Guide | P30, `toilet-icon.png` |
| `/plomberie/depannage` | « Plombier en urgence à Bruxelles – 149 € TVAC » | plombier urgence bruxelles, fuite d'eau | La FAQ « assurance » doit rester générale | P30 |
| `/plomberie/debouchage` | « Débouchage WC et canalisation à Bruxelles – 200 € » | débouchage wc bruxelles | Colonne et égout inclus ? [Q32] | P31 |
| `/plomberie/detartrage` | « Détartrage de robinetterie et canalisations à Bruxelles » | détartrage bruxelles, eau calcaire | Dureté de l'eau bruxelloise à sourcer ; lien VMC → boiler | P32, P17 |

### 6.5 Climatisation

| Page | Title proposé | Requêtes | Points à valider | Assets |
|---|---|---|---|---|
| `/climatisation` | « Climatisation et pompe à chaleur à Bruxelles » | airco bruxelles | La VMC sort de la liste des services | P40, P12, `clim-icon.png` |
| `/climatisation/installation-climatisation` | « Installation de climatisation à Bruxelles » | installation airco bruxelles | Autorisation d'urbanisme en façade : à vérifier ; prix [Q21] | P40 |
| `/climatisation/entretien-climatisation` | « Entretien airco et pompe à chaleur à Bruxelles » | entretien airco bruxelles | Airco au même tarif que la PAC (180 €) ? [Q32] | P41 |
| `/climatisation/depannage-climatisation` | « Dépannage climatisation et PAC à Bruxelles – 149 € » | dépannage airco bruxelles | — | P42 |

### 6.6 Professionnels `/professionnels` (fusion) [Q5]

- **Recommandation** : une seule page. La catégorie ne contient qu'un service (syndics), donc deux pages se concurrencent sur « syndic ». `/professionnels/syndics-coproprietes` est redirigée en 301 vers `/professionnels`.
- **Title** : « Technicien pour syndics et copropriétés à Bruxelles »
- **Sections** :
  - haut de page (façade d'immeuble P50) ;
  - « Tout le technique de vos parties communes » ;
  - « Comment nous travaillons avec vous » ;
  - bandeau d'appel ;
  - « Un partenaire pensé pour les gestionnaires » ;
  - entretiens périodiques ;
  - tarifs et contrats [Q30] ;
  - FAQ (6 questions) ;
  - un formulaire de demande adapté aux syndics (immeuble, nombre de logements).
- **Assets** : P50, P51, P52.

### 6.7 Pages utilitaires

#### `/tarifs`

- **Requêtes** : prix entretien chaudière bruxelles, tarif dépannage chauffagiste, tarif plombier bruxelles.
- **Title** : « Tarifs chauffagiste, plombier et électricien à Bruxelles »
- **H1** : « Nos tarifs à Bruxelles, TVAC et annoncés à l'avance ».
- **Sections** :
  1. Haut de page avec liens vers chaque métier.
  2. Bandeau promo entretien gaz (149 € au lieu de 169 €, validité [Q22]).
  3. **La carte des prix nuit**, que le propriétaire aime, par métier.
  4. « Ce qui se fait sur devis », avec devis express.
  5. **Conditions** : heure supplémentaire, majorations, déplacement, TVA, paiement [Q22].
  6. FAQ prix, CTA.

#### `/devis`

- **Title** : « Devis gratuit chaudière, chauffage, électricité à Bruxelles »
- **Contenu** : le formulaire en 3 étapes (logique conservée, nouveau design), récapitulatif, « Comment ça se passe », preuve, FAQ (7 questions actuelles).
- Les paramètres `?service=` et `?actuel=` sont conservés.

#### `/rendez-vous`

- **Title** : l'actuel.
- **Contenu** : agenda Cal.com en version v2, un type de rendez-vous par service réservable en ligne [Q44], repli vers le rappel pour les autres.
- **À corriger** : l'événement actuel s'appelle « Dépannage » sur Cal.com alors que le lien parle d'entretien.

#### `/contact`

- **Title** : « Contact – chauffagiste à Bruxelles, 7j/7 »
- **Sections** :
  - le numéro en très grand ;
  - 3 actions : devis, rendez-vous, rappel ;
  - formulaire de rappel ;
  - coordonnées : adresse et horaires [Q20], carte quand l'adresse existe ;
  - zones, FAQ.

#### `/a-propos` (nouvelle page)

Cette page sert la crédibilité auprès de Google et des clients.

- **Title** : « À propos de Radialec, chauffagiste agréé à Bruxelles »
- **Sections** :
  - qui nous sommes : histoire, création, de ThermoTech à Radialec [Q26] ;
  - agréments, avec logos et numéros [Q25] ;
  - nos engagements : uniquement les promesses validées (7j/7, sous 24h, garantie 2 ans, prix annoncés) ;
  - en chiffres : +200 clients, 5/5 Google ;
  - zone ;
  - l'équipe, quand de vraies photos existeront ;
  - CTA.

### 6.8 Pages légales et 404

- **Mentions légales, Confidentialité, Cookies** :
  - nouvelle typographie et sommaire ;
  - contenu inchangé, champs « À fournir » à compléter [Q46] ;
  - ventilation retirée si elle est citée.
- **404** :
  - nouveau design, phrase actuelle conservée (« Cette page a pris la fuite. ») ;
  - liens vers les 3 services chaudière, les 4 métiers et le numéro ;
  - mascotte à trancher [Q7].

### 6.9 Étape C — expansion SEO (à valider) [Q17]

| Type | URL | Contenu | Condition |
|---|---|---|---|
| Pages marques (7) | `/chauffage/chaudiere-vaillant`… | Entretien, dépannage et remplacement de la marque à Bruxelles : modèles courants, pannes fréquentes, codes erreur principaux, prix validés, FAQ | Un technicien relit chaque page |
| Codes erreur | `/chauffage/codes-erreur/vaillant`… | Signification de chaque code, ce que l'on peut faire soi-même, quand appeler (→ dépannage 149 €) | Sources : notices des fabricants + relecture |
| Guides | `/conseils/…` | Prix d'une nouvelle chaudière en 2026, entretien obligatoire (réglementation à sourcer), pression qui baisse, sortir du mazout, chaudière ou PAC | Prix et faits validés |
| Pages communes | `/chauffagiste/uccle`… | Seulement avec du contenu vraiment local (interventions, type de bâti, délais) : sinon Google les traite comme des pages satellites | Démarrer par 5 communes |
| NL / EN | `/nl/…`, `/en/…` | Traduction des pages chaudière d'abord, avec `hreflang` | Relecture par une personne native [Q15] |

---

## 7. Ordre de réalisation

**Étape A — Design complet, d'un coup.**

- Composants restants, tous les gabarits, en-tête et footer v2 partout, suppression de la ventilation.
- Tout le site bascule en une fois : jamais de site à moitié refait.
- Les textes restent ceux d'aujourd'hui.
- Je vérifie chaque page sur ordinateur et sur mobile, puis on relit ensemble en local.

**Étape B — Contenu et SEO, page par page, le cluster chaudière d'abord.**

Ordre :

1. Accueil
2. Entretien
3. Dépannage
4. Catégorie chauffage
5. Pompe à chaleur
6. Tarifs
7. Contact et À propos
8. Électricité, plomberie, climatisation, professionnels

Pour chaque page :

1. je rédige le contenu final selon sa fiche ;
2. le propriétaire valide ;
3. je publie.

Les photos arrivent au fil de l'eau : chaque page fonctionne sans elles.

**Étape C — Expansion SEO**, selon les réponses : marques, codes erreur, guides, communes, NL/EN.

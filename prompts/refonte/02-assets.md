# Refonte Radialec — 02 · Assets nécessaires, page par page

Version 2 · 4 octobre 2026 (noms des images de techniciens mis à jour, fonds lavande). Complète `01-plan.md`. Remplace `prompts/REFONTE_assets-pilote.md` : les 5 photos de la page pilote y sont reprises sous les mêmes noms de fichiers (P01 à P05).

**Budget : zéro.** Tout ce qui est listé ici se produit gratuitement : photos au smartphone, outils gratuits, ressources libres.

## État des livraisons (5 octobre 2026)

Photos livrées en PNG dans `assets/refonte/` et intégrées (`app/data/photos.ts`) : P01 à P09, P12, P13, P14, P16, P17, P20, P21, P24, P25, P30, P31, P32, P40, P41.

Photos livrées sans nom, renommées et ajoutées au registre :

| ID | Fichier | Contenu | Page |
|---|---|---|---|
| P13 | `pac-unite-interieure.png` | Technicien Radialec au module intérieur, ballon à côté | Pompe à chaleur (checklist) |
| P19 | `boiler-resistance.png` | Résistance entartrée à côté d'une neuve | Chauffe-eau et boiler (checklist) |
| P26 | `tableau-armoire.png` | Tableau neuf dans son armoire | Installation électrique (haut de page) |
| P33 | `boiler-vidange.png` | Vidange d'un boiler, résistance au sol | Détartrage (checklist) |
| P43 | `airco-installation.png` | Pose d'une airco au niveau | Installation clim (haut de page) |
| P44 | `airco-nettoyage.png` | Désinfection de l'échangeur | Entretien clim (checklist) |
| — | `chaudiere-accueil.png` | Chaudière Vaillant détourée | Accueil (haut de page) |

Les étapes de l'entretien chaudière sont illustrées par P04, P03, P09 et P08.

Livrées ensuite et intégrées : P23 borne (haut de page de la borne ; la checklist de cette page montre P21, le tableau neuf), P27 écran de vidéophone, P42 manomètres clim.

**Encore affichés « Photo à fournir » sur le site :** P50 façade d'immeuble (Professionnels), P62 équipe (À propos). Composant en attente : carte Google Maps de /contact (attend l'adresse, Q20).

**Prévus pour l'étape B, pas encore placés :** P05 (livrée), P10, P11, P15, P18 (ramonage, l'ancienne photo est encore en place), P22, P51, P52, P60, P61 (remplacerait l'ancienne photo de l'étape « Devis » du remplacement), P63, vidéos V01 et V02.

## Sommaire

1. Ce que tu n'as pas à fournir
2. Assets communs à tout le site (G)
3. Photos réelles (P) : la séance photo
4. Vidéos courtes réelles (V), facultatif
5. Images IA autorisées (A), facultatif
6. Assets existants : réutilisés ou retirés
7. Récapitulatif par page
8. Livraison

---

## 1. Ce que tu n'as pas à fournir

Je m'en occupe, gratuitement :

| Élément | Comment |
|---|---|
| Polices | Archivo (Google Fonts) ; Geist et Geist Mono (déjà dans le repo) |
| Couleurs | Tokens définis dans `tailwind.config.ts`, relevés sur le logo |
| Composants, animations | Codés dans le repo (Framer Motion déjà installé). Aucune librairie payante |
| Icônes | Pas de jeu d'icônes générique : typographie, photos, rendus 3D existants |
| Traitement photo | Appliqué en code à toutes les photos (`.v2-grade`) : pas de retouche à faire |
| Carte des communes | Tracée en SVG à partir des données ouvertes (UrbIS / Statbel) |
| Images de partage (réseaux, WhatsApp) | Générées automatiquement par page (`opengraph-image`) |
| Carte « Laissez-nous un avis » + QR code | Je la conçois, à imprimer. J'ai besoin du lien d'avis Google (G05) |
| Favicon et icônes d'application | Générés à partir du logo, de préférence vectoriel (G01) |

---

## 2. Assets communs (G)

| ID | Quoi | Format attendu | Où trouver | Priorité |
|---|---|---|---|---|
| **G01** | **Logo Radialec vectoriel** : symbole seul + symbole avec le mot « Radialec » | SVG, AI, EPS ou PDF vectoriel | Le graphiste qui a créé le logo, ou l'imprimeur des cartes de visite | Haute |
| **G02** | Logos officiels des marques : Vaillant, Bulex, Bosch, Buderus, Junkers, Viessmann, Chaffoteaux | SVG (ou PNG ≥ 600 px de large, fond transparent) | Kits presse des marques, ou Wikimedia Commons. **Je peux les récupérer moi-même si tu me donnes le feu vert** | Moyenne |
| **G03** | Logos des agréments : Bruxelles Environnement, VEKA, AwAC (Wallonie) | SVG ou PNG transparent ≥ 600 px | Sites officiels, ou documents d'agrément | Moyenne |
| **G04** | Numéros d'agrément et intitulés exacts (texte) | Texte | Documents d'agrément | Haute (voir [Q25]) |
| **G05** | Lien direct « Laisser un avis » de la fiche Google | URL | Fiche Google Business → « Demander des avis » | Haute |
| **G06** | Photo de la camionnette, si elle est floquée Radialec | Photo P (voir P63) | — | Basse |

Sans G01, je garde `assets/logo.png` (625 × 704 px). Ça suffit pour l'en-tête, mais c'est limite pour les grandes tailles et le favicon.

---

## 3. Photos réelles (P) : la séance photo

### 3.1 Consignes valables pour toutes les photos

- **Smartphone, objectif ×1, sans zoom, lumière du jour.** Mode portrait (arrière-plan flou) pour les gros plans.
- **À la verticale** (portrait), sauf mention « paysage ». Pour les photos marquées « les deux », prends les deux.
- **Tenue sombre unie** (navy ou noir), **sans aucun logo**, en attendant les pulls Radialec.
- **Zone de travail rangée** : outils alignés, bâche de protection, pas de déchets.
- **Chez un client** :
  - son accord avant de photographier ;
  - aucun visage de client ;
  - ni adresse, ni plaque d'immatriculation, ni document lisible avec ses données.
- **Pas de retouche**, pas d'assombrissement : le traitement est fait dans le site.
- **Envoi des originaux** par AirDrop, Google Drive ou e-mail. Jamais par WhatsApp, qui compresse.
- **Plusieurs prises par sujet**, je choisis la meilleure.

### 3.2 La liste

**Priorité 1 : chaudière (accueil, pilote, entretien, dépannage, catégorie chauffage).** C'est le cœur du SEO : à faire en premier.

| ID | Fichier | Sujet et cadrage | Format | Pages |
|---|---|---|---|---|
| **P01** | `etape-3-installation.jpg` | Gros plan : les mains serrent un raccord en laiton sur les tuyaux en cuivre sous une chaudière. Pas de visage | Portrait | Remplacement (étape 3) |
| **P02** | `hero-remplacement-chaudiere.jpg` | Technicien de dos ou de trois-quarts, face à une chaudière murale neuve, main sur l'appareil ou en train de refermer le capot. Visage non visible ou de profil | Portrait | Remplacement (haut de page), accueil |
| **P03** | `etape-4-suivi.jpg` | Gros plan sur l'écran ou le manomètre d'une chaudière en marche, aiguille dans le vert, un doigt qui règle | Portrait | Remplacement (étape 4), entretien, dépannage |
| **P04** | `etape-2-planification.jpg` | Caisse à outils ouverte au pied d'une chaudière, sur la bâche de protection | Portrait | Remplacement (étape 2) |
| **P05** | `chaudiere-neuve.jpg` | Chaudière neuve installée, propre, raccords visibles, en plan large | Les deux | Images de partage, catégorie chauffage, accueil |
| **P06** | `entretien-chaudiere.jpg` | Chaudière capot ouvert : mains qui nettoient le brûleur ou l'échangeur | Les deux | Entretien (haut de page), accueil |
| **P07** | `entretien-mesure.jpg` | Appareil de mesure (analyse de combustion) branché sur la chaudière, écran lisible. Si cela fait partie de votre entretien [Q31] | Portrait | Entretien (checklist) |
| **P08** | `entretien-attestation.jpg` | L'attestation d'entretien remplie, posée sur la chaudière, **sans données client lisibles** | Portrait | Entretien (étapes) |
| **P09** | `depannage-chaudiere.jpg` | Chaudière capot ouvert, diagnostic : multimètre ou lampe frontale, mains au travail | Les deux | Dépannage (haut de page), accueil |
| **P10** | `depannage-piece.jpg` | Une pièce remplacée tenue en main (pompe, vanne, carte), chaudière floue derrière | Portrait | Dépannage |
| **P11** | `ancienne-chaudiere.jpg` | Une vieille chaudière au sol dans une cave bruxelloise, avant remplacement | Paysage | Remplacement (bloc gaz / mazout / PAC), guides |

**Priorité 2 : le reste du chauffage.**

| ID | Fichier | Sujet et cadrage | Format | Pages |
|---|---|---|---|---|
| P12 | `pac-unite-exterieure.jpg` | Unité extérieure de pompe à chaleur installée (jardin, façade arrière ou toit plat) | Les deux | Pompe à chaleur, climatisation |
| P13 | `pac-unite-interieure.jpg` | Module intérieur ou ballon de la PAC, raccords propres | Portrait | Pompe à chaleur |
| P14 | `radiateur-neuf.jpg` | Radiateur neuf posé sous une fenêtre bruxelloise | Les deux | Radiateurs |
| P15 | `radiateur-purge.jpg` | Gros plan : mains qui purgent ou règlent une vanne thermostatique | Portrait | Radiateurs, désembouage |
| P16 | `desembouage-eau.jpg` | L'eau boueuse du circuit dans un récipient transparent, à côté de la machine de désembouage | Portrait | Désembouage. **La photo la plus parlante du site** |
| P17 | `boiler-anode.jpg` | Anode entartrée tenue en main, ou groupe de sécurité d'un boiler | Portrait | Boiler, détartrage |
| P18 | `ramonage.jpg` | Hérisson ou brosse dans un conduit, ou mains qui ramonent | Portrait | Ramonage |

**Priorité 3 : électricité, plomberie, climatisation, professionnels.**

| ID | Fichier | Sujet et cadrage | Format | Pages |
|---|---|---|---|---|
| P20 | `tableau-ouvert.jpg` | Tableau électrique ouvert, mains avec un tournevis isolé | Les deux | Électricité, dépannage électrique |
| P21 | `tableau-neuf.jpg` | Tableau neuf, rangé, différentiels étiquetés | Portrait | Rénovation, conformité, installation |
| P22 | `testeur-prise.jpg` | Testeur ou multimètre sur une prise | Portrait | Dépannage électrique |
| P23 | `borne-recharge.jpg` | Borne murale installée (garage, parking), câble branché | Les deux | Borne de recharge |
| P24 | `platine-rue.jpg` | Platine de parlophone ou vidéophone sur une façade bruxelloise | Portrait | Parlophonie, vidéophonie |
| P25 | `schema-unifilaire.jpg` | Schéma unifilaire (papier ou tablette) posé près d'un tableau | Paysage | Schéma électrique, conformité |
| P30 | `plomberie-siphon.jpg` | Mains qui réparent un siphon ou un raccord sous un évier | Les deux | Plomberie, dépannage plomberie |
| P31 | `debouchage-furet.jpg` | Furet ou déboucheur en action, cadrage propre | Portrait | Débouchage |
| P32 | `robinet-calcaire.jpg` | Gros plan d'un pommeau ou mousseur entartré | Portrait | Détartrage |
| P40 | `airco-murale.jpg` | Unité intérieure d'airco murale installée | Les deux | Climatisation, installation |
| P41 | `airco-filtre.jpg` | Mains qui retirent ou nettoient le filtre d'une airco | Portrait | Entretien airco |
| P42 | `manometres-clim.jpg` | Manomètres frigorifiques branchés sur une unité extérieure | Portrait | Dépannage airco |
| P50 | `immeuble-facade.jpg` | Façade d'immeuble à appartements bruxellois, sans personne ni plaque | Les deux | Professionnels |
| P51 | `chaufferie-collective.jpg` | Chaufferie collective d'immeuble, si vous y avez accès | Paysage | Professionnels |
| P52 | `parlophone-immeuble.jpg` | Platine de parlophone d'immeuble avec plusieurs boutons, **noms illisibles ou masqués** | Portrait | Professionnels, parlophonie |

**Sans priorité (dès que possible).**

| ID | Fichier | Sujet et cadrage | Format | Pages |
|---|---|---|---|---|
| P60 | `rue-bruxelles.jpg` | Rue bruxelloise typique (façades), sans personne ni plaque lisible | Paysage | Accueil (zones), À propos, contact |
| P61 | `devis-tablette.jpg` | Mains qui notent sur une tablette ou un bloc devant une installation | Portrait | Devis, contact |
| P62 | `equipe.jpg` | Portrait d'équipe, **seulement le jour où les tenues Radialec existent** | Paysage | À propos |
| P63 | `camionnette.jpg` | Camionnette, si elle est floquée Radialec | Paysage | À propos, accueil |

---

## 4. Vidéos courtes réelles (V), facultatif

Une vraie vidéo de quelques secondes, utilisée en boucle discrète, donne de la vie sans faire « IA ».

| ID | Fichier | Sujet | Spécifications | Pages |
|---|---|---|---|---|
| V01 | `video-ecran-chaudiere.mp4` | L'écran d'une chaudière qui s'allume, ou la flamme visible par le hublot (si le modèle le permet) | Vertical, 4K ou 1080p, 30 i/s, 6 à 10 s, téléphone posé (pas à main levée), sans son | Accueil, entretien |
| V02 | `video-raccord.mp4` | Mains qui serrent un raccord | Mêmes spécifications | Remplacement, dépannage |

Je les compresse moi-même (moins de 2 Mo), avec une image fixe affichée d'abord. Elles ne se chargent jamais avant le contenu.

---

## 5. Images IA autorisées (A), facultatif

Uniquement des **objets ou des intérieurs sans personne**, ou des **poses** (pas de geste technique). À générer avec un outil gratuit (ex. Gemini). Ce sont des solutions d'attente : une vraie photo les remplace toujours.

Phrase de style à ajouter à chaque prompt :

```
Documentary-style photograph, soft natural daylight, warm highlights and cool shadows, 35mm lens, realistic textures, unbranded equipment, no people, no text, no watermark.
```

| ID | Fichier | Prompt | Pages |
|---|---|---|---|
| A01 | `ia-chaudiere-cuisine.jpg` | `Brand-new white wall-hung condensing gas boiler installed in a Brussels townhouse kitchen with plaster mouldings and herringbone parquet, copper pipes neatly connected underneath.` | Cartes de services (en attendant P05) |
| A02 | `ia-cave-chaufferie.jpg` | `Clean basement boiler room in an old Brussels house: brick walls, a modern white floor-standing boiler, tidy pipework.` | Catégorie chauffage, guides |
| A03 | `ia-pac-jardin.jpg` | `White air-to-water heat pump outdoor unit on wall brackets in a small Brussels backyard with brick walls and potted plants, overcast light.` | Pompe à chaleur (en attendant P12) |

---

## 6. Assets existants : réutilisés ou retirés

| Fichier | Taille | Décision | Pages |
|---|---|---|---|
| `technicien_debout_souriant_bras_croises_coupés_aux_cuisses.png` | 1024 × 1536 | **Réutilisé** | CTA final installation |
| `technicien_noir_debout_souriant_doigt_sur_tablette_coupe_aux_cuisses.png` | 1024 × 1536 | **Réutilisé** | Bandeaux d'appel |
| `technicien_debout_souriant_bras_croisés_coupé_aux_hanches.png` | 833 × 1236 | **Réutilisé** | CTA entretien |
| `technicien_debout_souriant_bras_croisés.png` | 1024 × 1536 | Réutilisable (en pied) | À propos, 404 |
| `climatisation-murale.png` (rendu airco) | 1953 × 805 | Réutilisable | Climatisation (en attendant P40) |
| `technicien_courant_avec_boite_outils_en_main_écriture-sur-image-technicien-agree-et-intervention-en-24-heures-avec-fleches-sortantes.png` (qui court, annotations rouges) | 1369 × 1149 | Réutilisé **sur fond clair (lavande ou blanc)**, jamais sur l'aplat orange du CTA final, où les annotations rouges disparaissent [Q10] | CTA urgence |
| `technicien_debout_regarde_devis_et_ecrit_ecriture-sur-image-technicien-agrée-et-devis-clair-et-transparent-avec-flèche-sortantes.png` (annotations) | 1024 × 1536 | Retiré (remplacé par le technicien bras croisés) | — |
| `boiler-maintenance.png` | 1536 × 1024 | **Réutilisé** | Remplacement (étape 1), entretien |
| `boiler-installation.png` (IA) | 1586 × 992 | En attente, remplacé par P02 | Remplacement |
| `technicien-assis-fait-entretien-chaudière-avec-appareil.png` (scène IA, en attendant P06/P07), `entretienbIS.jpg` | 1400 / 1640 px | À vérifier visuellement (origine [Q42]) | Entretien, ramonage |
| `chaudiere-icon.png`, `panel-icon.png`, `toilet-icon.png`, `clim-icon.png` (rendus 3D) | ~1300 px | **Retirés du site** (réponse Q8, 5 octobre) : photos par métier sur l'accueil, chaudière détourée pour la promo et l'image de partage | — |
| Logos marques et agréments (PNG) | 72 à 917 px de haut | Réutilisés en attendant G02 et G03 | Marques, preuve |
| `borne.jpg`, `conformite.jpg`, `videophone.jpg`, `repair.jpg`, `ramonage.jpg` | 275 à 740 px | **Trop petits** pour le nouveau design, et origine inconnue [Q42] | Remplacés par P18, P21, P23, P24 |
| `depannage_elec.webp`, `installation_elec.jpg`, `installation.jpg`, `parlophone.jpeg` | 1000 à 1600 px | Utilisables si la licence est OK [Q42] | Électricité |
| `phone.jpg`, `email.jpg`, `chauffage.png`, `elec.png`, `boiler.png`, `811a….png`, `values.avif` | — | Non utilisés par la refonte. À trier | — |
| Mascotte façon dessin animé (404, Causerie) | — | Retirée du site [Q7] | 404 |

---

## 7. Récapitulatif par page

Légende :

- **Requis** : la page attend ces assets pour être complète. Elle fonctionne quand même sans, en version typographique.
- **Existants** : déjà dans le repo.
- **Facultatifs** : un plus.

| Page | Requis | Existants | Facultatifs |
|---|---|---|---|
| Accueil | P02 ou P06, P05, P09 | 3D ×4, technicien qui court, G02, G03 | V01, P60, P63 |
| `/chauffage` | P05, P06, P09, P16, P12 | `chaudiere-icon.png` | A02 |
| Remplacement (pilote) | P01, P02, P03, P04, P11 | `boiler-maintenance.png`, technicien bras croisés, technicien à la tablette | V02 |
| Entretien | P06, P07, P08, P03 | `boiler-maintenance.png`, technicien bras croisés (hanches) | V01 |
| Dépannage | P09, P10, P03 | technicien qui court | V02 |
| Pompe à chaleur | P12, P13 | — | A03 |
| Boiler / chauffe-eau | P17 | — | — |
| Désembouage | P16, P15 | — | — |
| Radiateurs | P14, P15 | — | — |
| Ramonage | P18 | — | — |
| `/electricite` + 8 pages | P20, P21, P22, P23, P24, P25 | `panel-icon.png`, `installation_elec.jpg`, `depannage_elec.webp` (licence) | — |
| `/plomberie` + 3 pages | P30, P31, P32, P17 | `toilet-icon.png` | — |
| `/climatisation` + 3 pages | P40, P41, P42, P12 | `clim-icon.png` | A03 |
| `/professionnels` | P50, P51, P52 | — | — |
| `/tarifs` | — | 3D ×4 | — |
| `/devis` | — | 3D ×4 | P61 |
| `/rendez-vous` | — | — | — |
| `/contact` | — | — | P60, P61 |
| `/a-propos` | G04 | Logos agréments | P60, P62, P63 |
| Légal, 404 | — | — | — |

Les données à fournir (prix, horaires, adresse, agréments…) sont dans `03-questions.md`.

---

## 8. Livraison

- **Dossier** : `assets/refonte/`, avec exactement les noms de fichiers ci-dessus. Pour une photo prise dans les deux formats, ajoute `-portrait` ou `-paysage` au nom.
- **Ordre conseillé** :
  1. P01 à P11 (chaudière) ;
  2. G01, G05 ;
  3. P12 à P18 ;
  4. le reste.
- Dis-moi quand un lot est déposé : je recadre, je branche et je vérifie sur ordinateur et sur mobile.

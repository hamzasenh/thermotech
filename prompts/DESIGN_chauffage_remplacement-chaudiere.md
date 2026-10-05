# DIRECTIVE DESIGN — Page Remplacement / Installation de chaudière

**Portée** : layout et couleur uniquement. Le contenu texte est fixé dans
`PAGE_chauffage_remplacement-chaudiere.md` — ne pas le modifier depuis ce fichier.

**Statut** : v2. Applique le gabarit "fiche service" validé en session de design
(2026-08-31) et intègre les décisions issues d'un mockup HTML explorant les
détails visuels (steps, marques, bloc info, CTA). Ce gabarit sera réutilisé sur
les 12 pages de service — cette page sert de première implémentation de
référence.

---

## 0. Note pour Claude Code — comment lire cette directive

Ce fichier décrit une **intention design**, pas un patch à appliquer tel quel.
Avant d'implémenter :

1. Lis les composants et tokens déjà présents dans le repo (Header, Footer,
   Faqs.tsx, LogoTicker.tsx, agregation.tsx, globals.css) — ils font foi en cas
   de divergence avec ce document.
2. Adapte chaque intention ci-dessous au design system existant. Ne crée pas de
   nouveau composant si un composant équivalent existe déjà (steps, accordéon,
   ticker de logos).
3. Si une intention nécessite une nouvelle dépendance (police, lib, composant) —
   demande avant d'implémenter, conformément aux Ordres permanents du projet.
   N'improvise pas de solution "à peu près" pour éviter de demander.
4. En cas de conflit entre une intention visuelle de ce fichier et un pattern
   déjà en place ailleurs sur le site, le pattern existant gagne — signale le
   conflit plutôt que de trancher seul.

---

## 1. Principe général

Le lavande (`#EAEEFE` ou équivalent token DS) est réservé aux moments
d'accroche : navbar, bandeau titre. Tout le contenu de lecture (texte, listes,
FAQ, preuve sociale) reste sur fond blanc, pour préserver le contraste. Un seul
dégradé lavande → blanc, positionné entre le bandeau titre et le corps de
page — aucun texte dedans. Le bloc CTA final est un aplat plein en dégradé
flamme (`#e52619` → `#f9bc2d`, celui déjà utilisé sur les CTA existants du
site) — pas de dégradé de transition en fin de page, pas de lavande à cet
endroit.

## 2. Structure de la page, section par section

| # | Bloc | Couleur | Contenu |
|---|---|---|---|
| 1 | Navbar | Lavande, sticky | Nav standard existante |
| 2 | Bandeau titre | Lavande | H1 + Intro uniquement. Pas d'autre contenu dans ce bloc. |
| 3 | Transition | Dégradé lavande → blanc | Aucun texte dans cette zone |
| 4 | Corps de page | Blanc | Dans l'ordre : Process d'installation (steps) → Marques installées → Gaz/mazout/PAC → FAQ → Zone d'intervention → Ils nous font confiance |
| 5 | Bloc CTA final | Aplat plein, dégradé flamme existant | CTA "Demander un devis gratuit" + téléphone cliquable, texte blanc |
| 6 | Footer | Navy (existant) | Inchangé |

## 3. Détails visuels par bloc

Ces points affinent le bloc 4 du tableau ci-dessus. Chaque intention est
suivie de sa contrainte d'implémentation.

**Process d'installation (steps)**
Intention : liste verticale, connecteur vertical entre les étapes, puce
numérotée par étape (légitime ici — c'est une vraie séquence de 4 étapes).
Contrainte : réutiliser un composant "steps" du DS s'il existe déjà ailleurs
sur le site. Sinon, créer un seul composant réutilisable pour les 12 pages
(pas un composant par page). Le connecteur peut reprendre le dégradé flamme
déjà utilisé sur les CTA, pas une nouvelle couleur.

**Marques installées**
Intention : afficher les marques (Vaillant, Bulex, Bosch, Buderus, Junkers,
Viessmann, Chaffoteaux) avec leurs vrais logos.
Contrainte : réutiliser le composant `LogoTicker` existant, ou une variante
statique du même composant si l'animation en carrousel ne convient pas hors du
hero — laissé à ton appréciation technique. Ne jamais fabriquer, redessiner ou
approximer un logo de marque : les assets réels existent déjà dans le repo.

**Bloc "Gaz, mazout ou pompe à chaleur : que choisir en 2026 ?"**
Intention : le distinguer visuellement du texte courant sans en faire une carte
colorée (pas de fond teinté, pas de radius sur une bordure simple côté — cf.
règles anti-slop du projet sur les cards clonées).
Contrainte : une bordure gauche simple suffit. Utiliser un composant "callout"
ou "note" du DS s'il existe déjà ; sinon structure minimale, pas de nouveau
composant complexe pour un seul bloc de texte.

**FAQ**
Intention : accordéon, une question ouverte à la fois.
Contrainte : reprendre exactement le pattern déjà en production dans
`Faqs.tsx` (icône `+` qui tourne à 45° à l'ouverture). Ne pas recréer un
nouveau composant accordéon.

**Zone d'intervention**
Contenu en attente (voir fichier contenu, §4). Traitement visuel simple,
cohérent avec le reste du corps de page — pas de priorité de design tant que
la liste des communes n'est pas confirmée.

**Ils nous font confiance**
Intention : la note Google (5/5, 19 avis) et les agréments doivent rester
lisibles comme le reste du corps de page (fond blanc, pas de bloc d'accroche —
c'est de la preuve, pas un moment de conversion). Les chiffres (note, nombre
d'avis) peuvent être mis en évidence par le poids ou la taille de police, pas
par une nouvelle couleur.
Contrainte : réutiliser le composant existant pour les logos d'agréments
(`agregation.tsx` affiche déjà Bruxelles Environnement, VEKA, Awac) plutôt que
d'en recréer un nouveau.

**CTA final**
Intention : aplat plein en dégradé flamme, texte blanc, téléphone cliquable
mis en évidence.
Contrainte : réutiliser la classe/le composant CTA plein déjà existant
(`.btn-primary` ou équivalent) plutôt qu'en créer un nouveau.

## 4. Typographie — point ouvert, à vérifier avant d'implémenter

Le mockup de référence explore un traitement typographique pour les chiffres
(numéros d'étape, téléphone, note Google) : chiffres tabulaires, en écho aux
afficheurs digitaux déjà visibles sur nos propres photos de chaudière.

Avant d'introduire une nouvelle police mono ou un nouvel import de police :
vérifier si Geist Sans (déjà utilisé dans tout le repo) supporte les chiffres
tabulaires via `font-feature-settings: "tnum"` ou une classe utilitaire
équivalente — c'est probable, et ça évite toute nouvelle dépendance. N'ajoute
une police mono séparée que si Geist ne le permet pas, et demande avant de
l'implémenter, conformément à la règle du projet sur les nouvelles
dépendances.

## 5. Dépendances / points à vérifier une fois avant l'implémentation

- Token couleur lavande déjà défini dans le DS (sinon le créer une fois, pas
  par page).
- Composant CTA plein existant, réutilisable pour le bloc 5.
- Support des chiffres tabulaires via Geist Sans (voir §4) avant d'envisager
  une police mono séparée.
- Existence d'un composant "steps" réutilisable ailleurs sur le site.

## 6. Référence visuelle

Un mockup HTML (`radialec_mockup_remplacement-chaudiere.html`) illustre
l'intention ci-dessus : hiérarchie, rythme des blocs, traitement des chiffres.
C'est une référence d'intention, pas du code à copier tel quel — en cas de
divergence avec un pattern déjà en place dans le repo, le repo gagne.
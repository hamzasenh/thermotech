# Instructions Claude Code — Contenu Homepage Radialec

**Scope : contenu (texte, structure sémantique, données) + composants via shadcn en suivant la charte graphique existante du repo. .**

Ordre de page validé : Hero (existant) → Carousel marques (existant) → **Bandeau confiance** → **Services** → **Tarifs** → Agréations (existant) → FAQ (existant)

**Design** : utiliser shadcn (déjà installé globalement sur le pc) pour générer les composants nécessaires à ces 3 sections. Respecter la charte graphique déjà en place dans le repo (couleurs, typo, tokens existants).

---

## 1. Bandeau confiance

4 items, format court, pas de paragraphe.

| Item | Contenu | Note |
|---|---|---|
| 1 | **+200 clients satisfaits**
| 2 | **Disponible 7j/7** | |
| 3 | **Intervention sous 24h** | |
| 4 | **Prix transparents, sans surprise** | |

Chiffre/mot-clé fort + label court (3-5 mots) par item. Pas de texte long — c'est de la réassurance, pas une section explicative.

SEO : ces éléments servent la conversion, pas le ranking. Pas de keyword stuffing ici.

---

## 2. Section Services (teaser)

Objectif : confirmer en un coup d'œil que Radialec couvre le besoin du visiteur, lien vers la page service détaillée. Chauffage en premier.

**Titre de section** : Une phrase d'accroche, je te laisse choisir ici (inspire toi de ce qui a été fait dans agréations).

**Sous-titre** (optionnel, une phrase) : résume le positionnement — un seul interlocuteur, chauffage et électricité, zone Bruxelles. Ne pas réinventer le positionnement ici.

4 cartes, dans cet ordre :

1. **🔥 Chauffage** — Chaudières, chauffe-eau, radiateurs, désembouage → `/chauffage`
2. **⚡ Électricité** — Installation, dépannage, mise en conformité, bornes de recharge, parlophonie, vidéophonie → `/electricite`
3. **🚿 Plomberie & sanitaire** — Dépannage, détartrage, débouchage → URL réelle à vérifier dans le repo
4. **❄️ Climatisation & pompes à chaleur** — Airco, entretien et dépannage PAC → URL réelle à vérifier dans le repo

Chaque carte : titre + 3-4 mots-clés de sous-services + CTA "En savoir plus →" ou équivalent.

**Pas de prix ici** — section tarifs juste en dessous, pas de redondance.

**SEO** : caser naturellement les intitulés exacts recherchés (dépannage chaudière, installation borne de recharge...) dans les libellés eux-mêmes. `<h3>` par carte, `<h2>` pour le titre de section.

---

## 3. Section Tarifs (teaser)

Objectif : lever l'objection prix sans donner la grille complète, renvoyer vers devis/contact pour le reste.

**Titre de section** : "Des tarifs clairs, sans surprise" (cohérent avec le point 4 du bandeau confiance).

**Contenu**, 4 lignes maximum :

| Service affiché | Prix à afficher |
|---|---|
| Dépannage (chaudière, sanitaire, électrique, clim/PAC) | **149€ TVAC** — déplacement + diagnostic + 1ère heure |
| Entretien chaudière gaz | **149€ TVAC** |
| Entretien chauffe-eau / boiler électrique | **À partir de 129€ TVAC** |
| Installation, mise en conformité, rénovation | **Sur devis** |

Exclure : mazout, désembouage, ramonage, détail PAC — la page service détaillée s'en charge.


**CTA de section** : "Voir tous nos tarifs" (si page tarifs existe) ou "Demander un devis gratuit" → formulaire.

**SEO** : requêtes à forte intention commerciale ("tarif dépannage chauffage Bruxelles", "prix entretien chaudière") — les intégrer dans le texte environnant, pas seulement dans un tableau. `<h2>` explicite type "Tarifs chauffage, électricité et plomberie à Bruxelles".


---

## Rappel transverse pour Claude Code

- Scope strictement ces 3 sections — ne pas toucher au Hero, carousel, agréations, FAQ déjà en place.
- Fais un design incroyable, moderne, 2026 (pas de tailwind-design like, utilise un max les dernières recommendations en terme de design web et utilise bien shadcn)


Corrections : 

1. Les icones des statistiques doivent être en bleu, mais le titre souligné en orange (un soulignement astrait un peu à la main je sais pas si tu sais trouver ça)
2. Pour les services, je veux que les services representés dans chaque card(ex radiateurs dépannage soient cliquables, fais ens sorte que l'ux soit top parce qu'oublie pas que lorsque je passe la souris sur la card celle ci change de couleur donc comment le user va savoir que les sous services soont aussi cliqables ? les rendre en liens ?)
La chaudière est bien dans la card, le souci c'est que en format mobile enne disparait, le site doit être responsive
Pour les autres services tu as les images panel-icon.png, clim-icon.png, toilet-icon.png, panel pour electrecité, clim pour climatisation et toilet pour plomberie. Fais ça bien


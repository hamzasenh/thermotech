# DIRECTIVE CONTENU — Page Remplacement / Installation de chaudière

**Statut** : nouvelle page dédiée, remplace le contenu actuellement affiché en modal
("Installation") sous `/services#chauffage`.

**Portée de cette directive** : contenu texte et structure sémantique (H1/H2/H3) UNIQUEMENT.
Ne pas modifier le design, les composants, les couleurs ou le layout — ce sujet est traité
séparément. Réutiliser les composants du design system existants pour afficher ce contenu.

---

## 1. URL & métadonnées SEO

| Champ | Valeur |
|---|---|
| URL | `/chauffage/remplacement-chaudiere` |
| Meta title | Remplacement et installation de chaudière à Bruxelles \| Radialec |
| Meta description | Remplacement et installation de chaudières à Bruxelles et ses environs. Devis sous 24h, garantie 2 ans. Gaz à condensation, pompe à chaleur. |

**Note sur le choix de l'URL** : "remplacement" est privilégié plutôt que "installation" seule,
car c'est l'intention de recherche dominante pour une clientèle résidentielle en zone urbaine
dense (chaudière existante en fin de vie, plutôt que première installation en construction
neuve). Le mot "installation" reste présent dans le H1 et le contenu pour capter aussi cette
recherche.

**Lien interne à mettre à jour** : la carte "Installation" actuellement dans le composant de
services chauffage (modal) doit pointer vers cette URL au lieu d'ouvrir une modal.

---

## 2. Contenu de la page

### H1
> Remplacement et installation de chaudières à Bruxelles et ses environs

### Intro (sous le H1)
> Nous remplaçons votre ancienne chaudière ou installons un nouveau système de chauffage,
> adapté à votre logement et à votre budget : chaudière à gaz à condensation, pompe à chaleur
> ou système de chauffage central. Chaque installation respecte les normes en vigueur (PEB,
> RGIE), avec un devis détaillé sous 24 heures.

### H2 — Notre process d'installation
Présenter en 4 étapes (liste numérotée ou composant "steps" du DS si disponible) :
1. **Devis sous 24h** — Nous évaluons votre besoin et vous transmettons un devis clair, sans
   surprise.
2. **Planification** — Nous fixons ensemble une date d'intervention adaptée à votre
   disponibilité.
3. **Installation** — Pose de votre nouvelle chaudière par un technicien qualifié (comptez
   1 à 2 jours pour une installation standard).
4. **Suivi** — Vérification du bon fonctionnement et conseils d'entretien.

### H2 — Les marques que nous installons
> Vaillant, Bulex, Bosch, Buderus, Junkers, Viessmann, Chaffoteaux.

(Réutiliser le composant LogoTicker existant si pertinent visuellement, sinon simple liste.)

### H2 — Gaz, mazout ou pompe à chaleur : que choisir en 2026 ?
> La Région bruxelloise interdit désormais l'installation de nouvelles chaudières au mazout.
> Les primes RENOLUTION pour le remplacement de chaudière sont actuellement suspendues, mais
> la TVA réduite à 6% s'applique aux pompes à chaleur depuis janvier 2026. Nous vous
> conseillons sur la solution la plus adaptée à votre logement et vous orientons vers les
> informations à jour sur [environnement.brussels](https://environnement.brussels).

**Important** : ne jamais afficher de montant de prime chiffré sur cette page — les primes
RENOLUTION sont suspendues et les chiffres qui circulent en ligne sont obsolètes. Toujours
renvoyer vers la source officielle plutôt que citer un montant.

### H2 — FAQ Remplacement et installation de chaudière

| Question | Réponse |
|---|---|
| Combien de temps dure une installation de chaudière ? | Comptez 1 à 2 jours pour une installation standard. |
| Quelle garantie sur l'installation ? | Votre nouvelle chaudière bénéficie d'une garantie fabricant de 2 ans sur les pièces, ainsi que d'une garantie de 2 ans de Radialec sur la pose. Pendant cette période de 2 ans, aucune autre entreprise ne doit intervenir sur votre installation, sous peine d'annulation de la garantie. |
| Puis-je encore installer une chaudière au mazout à Bruxelles ? | Non, l'installation de nouvelles chaudières au mazout n'est plus autorisée en Région bruxelloise. Nous vous accompagnons vers une alternative (gaz à condensation ou pompe à chaleur). |
| Dois-je être présent lors de l'installation ? | Non pas necessaire, on s'occupe de tout (reformule cette phrase)

### H2 — Zone d'intervention
**[EN ATTENTE — liste précise des communes desservies à confirmer avant publication]**

### H2 — Ils nous font confiance
- Note Google : 5/5 — 19 avis (widget d'avis Google réels, lien vers la fiche GBP)
- Mention des agréments : Bruxelles Environnement, VEKA, Awac (réels et à jour, confirmés)

---

## 3. Contraintes de contenu (rappel)

- La garantie 2 ans + 2 ans et sa clause d'exclusivité d'intervention sont confirmées réelles
  — à afficher clairement, pas en petites lignes cachées.

## 4. Points en attente avant publication

- [ ] Liste précise des communes desservies (zone d'intervention) : Pour l'instant -> Bruxelles et Wezembeek

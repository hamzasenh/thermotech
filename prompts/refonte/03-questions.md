# Refonte Radialec — 03 · Questions avant de coder

Version 2 · 4 octobre 2026 (Q10 mise à jour après le passage au lavande). Complète `01-plan.md` et `02-assets.md`.

**Comment répondre :** par numéro (« Q4 : oui », « Q21 : remplacement dès 2 900 € »…). Pour chaque question, je donne ma recommandation : si elle te va, réponds simplement « ok ».

**Priorité :**

| Tag | Signification |
|---|---|
| **[Démarrage]** | J'en ai besoin avant de coder l'étape A (le design de tout le site) |
| **[Avant la page]** | J'en ai besoin avant de rédiger la page concernée (étape B) |
| **[Bonus]** | Utile, pas urgent |

Les 10 questions [Démarrage] : Q1, Q2, Q4, Q5, Q6, Q7, Q8, Q9, Q10, Q29.

---

## A. Démarrage

**Q1 — Commit de sauvegarde [Démarrage]**
Une grande partie du site n'a jamais été commitée dans git (pages, données, formulaires). Si un fichier est supprimé ou écrasé, il est perdu.
→ *Reco : je fais un commit de sauvegarde de l'état actuel avant de commencer, puis je travaille sur une branche `refonte`.*

**Q2 — Le site est-il déjà en ligne ? [Démarrage]**
Sur quel domaine (`radialec.be` ?) et depuis quand ? Si des pages sont indexées par Google (ventilation, URL qu'on renomme), il faut des redirections 301 pour ne pas perdre leur référencement.
→ *Reco : si le site n'est pas encore en ligne, on supprime et on renomme librement.*

**Q3 — L'ancien site ThermoTech [Avant la page]**
L'adresse e-mail `info@thermotechs.be` laisse penser qu'un ancien site existe ou a existé. Est-il en ligne ? A-t-il des visites, des liens, un historique Google ?
→ *Reco : rediriger chaque ancienne URL vers la page équivalente. C'est souvent un gros gain SEO gratuit.*

**Q4 — Renommer l'URL du dépannage chaudière [Démarrage]**
Passer de `/chauffage/reparation-chaudiere` à `/chauffage/depannage-chaudiere`, plus proche de la requête principale.
→ *Reco : oui, avec une redirection 301 si l'ancienne URL est indexée.*

**Q5 — Fusionner les pages Professionnels [Démarrage]**
`/professionnels` et `/professionnels/syndics-coproprietes` visent la même requête. On ne garde qu'une page, `/professionnels`.
→ *Reco : oui.*

**Q6 — Logo vectoriel [Démarrage]**
Existe-t-il un fichier SVG, AI, EPS ou PDF du logo (G01) ? Le mot « Radialec » a-t-il une police officielle, ou est-il simplement écrit en Geist comme aujourd'hui ?
→ *Reco : si rien n'existe, je garde le PNG actuel et le mot en Geist, sans rien modifier.*

**Q7 — La mascotte façon dessin animé [Démarrage]**
Elle apparaît sur la page 404 et dans le chat Causerie. Elle détonne avec le nouveau design, réaliste et sobre.
→ *Reco : la retirer du site (404 typographique). Le chat Causerie garde son avatar, qui se règle dans Causerie.*

**Q8 — Les rendus 3D des métiers [Démarrage]**
Chaudière, tableau électrique, WC, climatisation : ils avaient été choisis par le propriétaire.
→ *Reco : les garder pour la navigation par métier uniquement (accueil, catégories, tarifs, devis). Ils sont cohérents entre eux et ne font pas « icône générique ».*

**Q9 — Mise à jour de Next.js [Démarrage]**
Passer de 15.0.3 à la dernière version 15.x : gratuit. Ça apporte des transitions fluides entre les pages et des correctifs.
→ *Reco : oui, en début d'étape A, en vérifiant que tout fonctionne encore.*

**Q10 — Le technicien qui court (CTA urgence) [Démarrage]**
Ses annotations rouges (« technicien agréé », « intervention en 24 heures ») disparaissent sur l'aplat orange des CTA finaux.
→ *Reco : CTA urgence sur fond lavande avec cette image (les annotations y restent lisibles). Les CTA installation et entretien restent en aplat orange `#E83C1C`, avec les techniciens sans annotations.*

---

## B. SEO

**Q11 — Search Console et Analytics [Avant la page]**
Peux-tu me donner un accès en lecture à Search Console et GA4, ou un export des requêtes (12 derniers mois) ? Si Search Console n'est pas installée : as-tu accès au DNS du domaine pour la vérifier ?
→ *Reco : on installe Search Console dès la mise en ligne. C'est indispensable pour suivre le « n°1 ».*

**Q12 — Fiche Google Business [Avant la page]**
Existe-t-elle ? Sous quel nom, quelle catégorie principale ? Adresse affichée, ou zone desservie seulement ? Les 19 avis sont-ils bien sur cette fiche ? Peux-tu m'y donner accès (gestionnaire) ?
→ *Reco : c'est le levier n°1 pour apparaître dans la carte Google. Je te prépare une liste d'optimisations.*

**Q13 — Requêtes et services prioritaires [Avant la page]**
Confirme ou corrige la liste du plan (§ 3.1). Quels services rapportent le plus (marge, volume) ? Lesquels voulez-vous en priorité pour remplir l'agenda ?
→ *Reco : chaudière d'abord (entretien, dépannage, remplacement), puis PAC, puis plomberie et électricité en urgence.*

**Q14 — Concurrents à battre [Bonus]**
Heat Me et qui d'autre ? Donne-moi les noms ou les sites : j'analyse leurs pages et leurs mots-clés gratuitement.

**Q15 — Néerlandais et anglais [Bonus]**
Avez-vous des clients néerlandophones ou anglophones ? Seriez-vous prêts à les servir (au téléphone, sur place) ? Quelqu'un de natif peut-il relire les traductions ?
→ *Reco : à Bruxelles, une version NL des pages chaudière est souvent le plus gros gain SEO après le français. Étape C.*

**Q16 — Annuaires et liens [Bonus]**
Où Radialec est-il déjà inscrit (Pages d'Or, Infobel, Facebook…) ? Êtes-vous référencés comme installateurs chez une marque (localisateur d'installateurs Vaillant, Bulex…) ?
→ *Reco : je dresse la liste des inscriptions gratuites à faire, avec les mêmes nom, adresse et téléphone partout.*

**Q17 — Étape C : expansion SEO [Bonus]**
OK pour les pages marques, codes erreur, guides et communes (plan § 6.9) ? Un technicien peut-il relire chaque page (environ 30 min) avant publication ?
→ *Reco : oui, en commençant par les 3 marques les plus courantes chez vos clients et 5 communes.*

**Q18 — Carte « Laissez-nous un avis » [Bonus]**
OK pour une carte avec QR code, remise après chaque intervention ?
→ *Reco : oui. 19 avis, c'est peu face aux concurrents. L'objectif est de 5 à 10 nouveaux avis par mois.*

**Q19 — Publicité Google Ads [Bonus]**
Des campagnes tournent-elles, ou sont-elles prévues ? Le site suit déjà les paramètres de campagne (UTM, gclid).

---

## C. Faits métier (pour écrire le contenu sans rien inventer)

**Q20 — Adresse et horaires [Avant la page]**
Adresse du siège ou de l'atelier (pour Google, les mentions légales, la page contact), et horaires détaillés (« 7j/7 » : de quelle heure à quelle heure ? jours fériés ?).
→ *Reco : si l'adresse est un domicile, Google permet de la masquer (zone desservie) ; elle reste dans les mentions légales.*

**Q21 — Prix « à partir de » [Avant la page]**
Pour chaque prestation sur devis, un prix d'appel réaliste « à partir de … € TVAC » :
- remplacement de chaudière gaz standard ;
- pompe à chaleur ;
- radiateur posé ;
- désembouage ;
- installation électrique (point lumineux, prise, circuit) ;
- rénovation de tableau ;
- schéma unifilaire ;
- borne de recharge ;
- parlophone, vidéophone ;
- airco mono-split ;
- détartrage ;
- contrat syndic.

→ *Reco : afficher un prix est le premier levier de clic sur Google et de conversion. Même une fourchette suffit. À défaut : « sur devis gratuit sous 24h ».*

**Q22 — Conditions tarifaires [Avant la page]**
- Prix de l'heure supplémentaire après la 1re heure de dépannage.
- Majorations soir, week-end et jours fériés.
- Frais de déplacement hors Bruxelles.
- TVA appliquée (6 % ou 21 %).
- Moyens de paiement.
- **Jusqu'à quand l'entretien gaz est-il à 129 € au lieu de 149 € ?** (promo mise à jour le 5 octobre 2026)

**Q23 — TVA 6 % sur la rénovation [Avant la page]**
Appliquez-vous la TVA à 6 % sur le remplacement de chaudière dans les logements de plus de 10 ans ?
→ *Reco : si oui, c'est un argument fort sur la page remplacement. Je ne l'écris pas tant que ce n'est pas confirmé.*

**Q24 — Marques [Avant la page]**
- Liste exacte des marques que vous installez.
- Réparez-vous et entretenez-vous **toutes** les marques, comme le dit le brouillon de la page dépannage ?
- « Nos partenaires de confiance » (titre actuel) suppose un partenariat officiel : est-ce le cas, ou faut-il écrire « Les marques que nous installons » (brief validé) ?

**Q25 — Agréments [Avant la page]**
Intitulés exacts et numéros :
- Bruxelles Environnement : quelle(s) catégorie(s) (chaudière gaz, mazout…) ?
- VEKA ;
- Wallonie / AwAC.

Qui est agréé : l'entreprise, ou chaque technicien ?

**Q26 — L'entreprise [Avant la page]**
Pour la page À propos :
- date de création, nombre de techniciens ;
- le fondateur (prénom, parcours) ;
- le passage de ThermoTech à Radialec ;
- l'assurance responsabilité civile professionnelle.

**Q27 — Délai de rappel [Avant la page]**
Pour le formulaire « Être rappelé » : en combien de temps l'équipe rappelle-t-elle, réellement (ex. « sous 1 h en journée ») ?

**Q28 — Zone d'intervention [Avant la page]**
Le brief disait « Bruxelles et Wezembeek » ; le site liste aujourd'hui une quarantaine de communes (Bruxelles, Brabant flamand, Brabant wallon). Quelle est la liste définitive ?
→ *Reco : n'afficher que les communes où vous intervenez vraiment, avec des délais tenables.*

**Q29 — Services réellement proposés [Démarrage]**
En dehors de la ventilation, faut-il retirer d'autres services ? Par exemple ramonage, schéma unifilaire, vidéophonie, climatisation.
→ *Reco : chaque page doit correspondre à un service que vous faites vraiment, sinon elle génère des appels inutiles.*

**Q30 — Contrats d'entretien [Avant la page]**
Proposez-vous des contrats annuels (particuliers, syndics) ? À quel prix ?

**Q31 — Le contenu exact d'un entretien [Avant la page]**
Que faites-vous lors d'un entretien gaz, et lors d'un entretien mazout (nettoyage, analyse de combustion, contrôle de sécurité…) ? Combien de temps ? Quelle attestation remettez-vous ?

**Q32 — Questions ouvertes sur les prix existants [Avant la page]**
- Chauffe-eau à 129 € : quel type d'appareil ?
- Ramonage à 149 € : attestation incluse ?
- Débouchage à 200 € : colonne et égout inclus ?
- Entretien PAC à 180 € : l'airco (air-air) au même tarif ?

**Q33 — Consignes gaz [Avant la page]**
La page dépannage affiche des réflexes en cas d'odeur de gaz. Je veux y mettre le numéro d'urgence officiel du gestionnaire de réseau, et vous faire valider les consignes mot pour mot.

**Q34 — FAQ de l'accueil [Avant la page]**
La réponse « Comment obtenir un devis pour une nouvelle chaudière ? » parle de chaudière « au gaz ou au mazout ». Or l'installation de nouvelles chaudières au mazout est interdite à Bruxelles.
→ *Reco : retirer « ou au mazout » et renvoyer vers la page remplacement.*

**Q35 — Garantie sur les dépannages [Avant la page]**
Les brouillons annoncent « Garantie 2 ans, pièces et interventions » sur les dépannages. Est-ce la même garantie que pour les installations ? Avec la même condition d'exclusivité ?

---

## D. Contenu et validation

**Q36 — Qui valide les textes, et comment ? [Avant la page]**
Le propriétaire relit-il chaque page ? Sous quelle forme : un document commentable, ou le site en local ? Dans quel délai ?
→ *Reco : je livre chaque page rédigée en local et en document commentable. On valide par lots : chaudière d'abord.*

**Q37 — Ton [Avant la page]**
On garde le vouvoiement et la touche d'humour légère (« (presque) déjà en route ») partout ?
→ *Reco : oui. Vouvoiement, phrases courtes, une touche d'humour par page au maximum.*

**Q38 — Condition de garantie en petit [Bonus]**
Tu as demandé de mettre la condition d'exclusivité en petit en bas du bloc garantie. L'ancien brief du propriétaire demandait de ne pas la cacher en petites lignes. Le prévenir ?

---

## E. Photos et assets

**Q39 — Qui prend les photos, et quand ? [Avant la page]**
Qui peut faire la séance (le technicien sur ses chantiers ?), dans quel délai ? Avez-vous des chantiers prévus où le client accepterait les photos ?

**Q40 — Tenues Radialec [Bonus]**
Une date prévue pour les pulls ou vestes au logo ?
→ *Reco : en attendant, tenue sombre unie, pas de faux logo.*

**Q41 — Camionnette [Bonus]**
Est-elle floquée Radialec ? Si oui, c'est une photo forte (P63).

**Q42 — Origine des photos existantes [Avant la page]**
`borne.jpg`, `conformite.jpg`, `videophone.jpg`, `repair.jpg`, `installation_elec.jpg`, `depannage_elec.webp`, `parlophone.jpeg`, `entretien.png`, `entretienbIS.jpg` : d'où viennent-elles ? Si elles ont été trouvées sur Google Images, elles sont protégées par le droit d'auteur.
→ *Reco : retirer toute image dont on ne connaît pas la licence.*

---

## F. Technique et outils

**Q43 — Hébergement et domaine [Avant la mise en ligne]**
Où le site sera-t-il hébergé (Vercel, offre gratuite ?) et qui a accès au DNS du domaine ? Il en faut l'accès pour Search Console, l'envoi d'e-mails (Resend) et une adresse @radialec.

**Q44 — Prise de rendez-vous Cal.com [Avant la page]**
- Quels services se réservent en ligne, et pour quelle durée ? Par exemple entretien gaz, entretien mazout, entretien PAC, ramonage, boiler.
- Le compte Cal.com reste-t-il le tien, ou un compte Radialec ?
- L'événement actuel s'appelle « Dépannage » alors que son lien parle d'« entretien chaudière » : lequel est le bon ?

→ *Reco : un événement par service d'entretien, au nom de Radialec, et pas de dépannage en ligne (urgence = téléphone).*

**Q45 — E-mail professionnel [Bonus]**
Une adresse @radialec (ex. info@radialec.be) pour remplacer info@thermotechs.be ?

---

## G. Légal (rappel)

**Q46 — Informations légales manquantes [Avant la mise en ligne]**
- Dénomination sociale, forme juridique, numéro BCE.
- Hébergeur, responsable de la publication.
- Durée de conservation des demandes de devis.
- Localisation des prestataires (Resend, Gmail, Google Analytics, Causerie, Cal.com).



## G. Réponses 

Voici les réponses pour les questions [Démarrage] :

Q1 : Trop tard, toutes les modifications ont été faites directement sur la branche principale (main/master). Fais un commit de sauvegarde de l'état actuel directement ici avant de continuer.
Q2 : Oui, le site est en ligne mais ultra basique, on a modifié 99 % du site. 
Q4 : Oui pour renommer l'URL en /chauffage/depannage-chaudiere si tu estimes que c'est meilleur pour le SEO.
Q5 : Oui, on fusionne les deux pages en une seule (/professionnels).
Q6 : Pas de logo vectoriel disponible. On conserve le PNG actuel
Q7 : Fais comme tu préfères 
Q8 : Non, on ne garde pas les rendus 3D des métiers.
Q9 : Oui pour la mise à jour Next.js vers la dernière version 15.x.
Q10 : Oui, validé pour le CTA urgence sur fond lavande avec cette image.
Q29 : Non, en dehors de la ventilation, on ne retire aucun autre service 

### Suite donnée (5 octobre 2026)

- Q1 : commit de sauvegarde fait sur main (`aa300bd`).
- Q2 : la version en ligne n'a qu'une page (l'accueil) : aucune ancienne URL à rediriger. Les redirections existantes sont gardées, sans effet négatif.
- Q4, Q5, Q6, Q10, Q29 : déjà appliqués à l'étape A.
- Q7 : la mascotte n'est plus utilisée (404 typographique). L'avatar du chat se change dans Causerie.
- Q8 : rendus 3D retirés partout (accueil, tarifs, promo, devis, images de partage).
- Q9 : Next.js passé de 15.0.3 à 15.5.27 (dernière 15.x), React 18 conservé. Build, pages et redirections vérifiés.

### Suite donnée (8 octobre 2026, réponses du fichier 04)

- Délais : le propriétaire garde les « sous 24h », « intervention en 24 heures » et le CTA du technicien qui court (revirement sur D5 et Q28).
- Q20 : adresse du siège dans le pied de page (« Siège social ») et les mentions légales seulement ; plus d'adresse ni de carte sur /contact. Horaires 7j/7, 10h–21h. Données structurées : commune sans la rue, horaires d'ouverture.
- Q22 : promo à 129 € sans prix barré, « prix de lancement jusqu'au 31 décembre 2026 ». Les conditions non décidées n'apparaissent plus sur /tarifs. Dépannage laissé à 149 € (140 € à reconfirmer).
- Q23 : TVA 6 % annoncée seulement pour le remplacement de chaudière, avec la condition des 10 ans (FAQ de la page remplacement et conditions de /tarifs). Mentions de TVA 6 % sur les pompes à chaleur retirées.
- Q24 : titres « Les marques que nous installons ». Q25 : agréments formulés au nom des techniciens (déjà le cas).
- Q26 et Q46 : Thermo Tech Solutions SRL, BE 1008.693.201, créée en 2024 (vérifié sur la BCE publique). Hébergeur Vercel Inc. Prestataires de /confidentialite renseignés avec leurs sources. Restent à fournir : nom du gérant, numéros d'agrément, parcours du fondateur.
- Q27 : rappel « sous 2 h, entre 10h et 21h ». Q45 : info@radialec.be partout.
- Q33 : consignes gaz officielles et numéros d'urgence par région sur la page dépannage chaudière (formulation à valider par le technicien).
- Q34 : FAQ de l'accueil sans « ou au mazout », avec un lien vers le remplacement. Q38 : condition de garantie lisible, juste sous la promesse.
- Q42 : photos de licence inconnue retirées (ramonage, installation électrique, parlophonie), remplacées par des emplacements à fournir (P18, P22, P52).
- Q13 : ordre chauffage, électricité, climatisation, plomberie partout ; dépannage, entretien, remplacement pour la chaudière.
- Q19 : origine de la visite (UTM, gclid, page d'arrivée) mémorisée dès l'arrivée et jointe au devis comme au rappel.
- D1, D2, D4 : plan SEO mis à jour (volumes réels, pas de pages communes sans contenu local, français uniquement).


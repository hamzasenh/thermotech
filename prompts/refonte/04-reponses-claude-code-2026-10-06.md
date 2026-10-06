# Refonte Radialec, 04 · Réponses aux questions de 03-questions.md

Version du 6 octobre 2026, mise à jour à 03h30 avec les réponses de Mohammed. À déposer dans le repo à côté de `03-questions.md`. Complète la section « G. Réponses » (étape A déjà traitée).

**Légende.** ✅ réponse donnée. ⏳ seul Mohammed peut répondre (une ligne « Réponse : » à remplir). Rien n'est inventé : ce qui n'est pas connu est marqué ⏳.

**Tranchés le 06/10/2026 :** Q20 (adresse, horaires), Q23 (TVA 6 %), Q27 (rappel), Q43 (hébergement Vercel). **Reste bloquant avant la mise en ligne :** le nom du gérant pour Q46. Q22 est tranché (voir ci-dessous) et la boîte `info@radialec.be` fonctionne (Q43, Q45).

---

## 1. Ce qui change dans le plan (à appliquer maintenant)

Le plan SEO a changé sur cinq points. Le reste de `01-plan.md` (architecture des pages de services, URL, JSON-LD, design) ne bouge pas.

**D1. Requêtes (§ 3.1).** Remplacer la liste d'hypothèses par les volumes réels du Keyword Planner (Bruxelles, sept. 2025 à août 2026, fourchettes, pas des chiffres exacts). Repères :
- `chauffagiste bruxelles` : 1K-10K ; `entretien chaudière` et `entretien chaudière bruxelles` : 100-1K ; `chauffagiste uccle` : 100-1K.
- `dépannage chaudière`, `réparation chaudière`, `remplacement chaudière`, `installation chaudière` : 10-100 chacun.
- `électricien bruxelles` et `panne électricité` : 100-1K.
- Plomberie : volumes élevés (`plombier bruxelles`, `débouchage canalisation` : 1K-10K) mais enchères de 5 à 30 €, et la plomberie reste un service complémentaire. Ne pas la remonter dans les priorités.
Fichier source : `claude/keyword-planner-bxl-vs-belgique-2026-10-06.md` (118 mots-clés), fourni séparément par Mohammed.

**D2. Pages communes (§ 6.9, étape C).** Pas de pages par commune par défaut. Google classe comme « doorway abuse » les pages créées pour des villes précises qui renvoient vers une même page ([spam policies](https://developers.google.com/search/docs/essentials/spam-policies)). Une page commune n'est créée que si elle contient du contenu réel de cette commune (réalisations, photos, avis). Premier candidat : Uccle, seule requête par commune testée au-dessus de 100 recherches par mois. Cela remplace « 5 communes » de Q17.

**D3. Zone desservie (Q28).** Les 41 communes de `ZONE_DESSERVIE.md` restent desservies. Elles sont maintenant classées par niveau (tableau en Q28). Le site affiche la liste des communes dans le texte, sans URL par commune.

**D4. Langues (Q15).** Français uniquement. Pas de version NL ni EN pour l'instant.

**D5. Faits à corriger sur le site.**
- La fiche Google affiche **29 avis** (note 5,0) au 05/10/2026. Le pied de page et `GoogleRating` affichent « 5★, 19 avis » en dur : ne plus coder ce chiffre. Afficher la donnée réelle de la fiche, sinon retirer le compteur.
- Aucune promesse « 24h/24 » : les appels sont pris **7j/7 de 10h à 21h**. La page dépannage et les CTA urgence ne doivent pas suggérer un service de nuit. **Aucun « sous 24h »** ni « intervention en 24 heures » nulle part sur le site (décision du 06/10/2026, Q28), y compris dans les annotations du technicien (Q10). Le seul délai confirmé est le rappel : sous 2 h en journée (Q27).

---

## 2. A. Démarrage (Q1 à Q10, Q29)

✅ Déjà traitées et appliquées (voir « Suite donnée », 5 octobre).

---

## 3. B. SEO

**Q11 ✅ Search Console et Analytics.**
- Search Console : propriété Domaine `radialec.be` créée et vérifiée le 05/10/2026 par enregistrement TXT DNS (Hostinger). Ne jamais supprimer ce TXT.
- Historique : la propriété est neuve. Mohammed exporte les données (jusqu'à 16 mois) si elles existent.
- GA4 : propriété `www.radialec.be`, ID `G-T01KFFNNN3` (à confirmer dans Admin, Flux de données).
- Claude Code n'a pas besoin d'accès. Mohammed fournit les exports quand c'est utile.
- DNS : Hostinger, accessible à Mohammed.

**Q12 ✅ Fiche Google Business.**
- Elle existe : nom RADIALEC, catégorie principale « Heating contractor », **29 avis** (et non 19), note 5,0.
- Adresse actuellement affichée : Lange Eikstraat 46, 1970 Wezembeek-Oppem. Affichage à décider (voir Q20).
- La fiche est en **re-vérification** (vidéo demandée par Google). Aucune modification de la fiche tant que ce n'est pas validé.
- La liste d'optimisations de la fiche est préparée dans le Projet stratégie, pas dans le repo. Aucun accès à donner à Claude Code.

**Q13 ✅ Services prioritaires.**
- Priorité commerciale : 1 dépannage chaudière, 2 entretien chaudière, 3 installation et remplacement, 4 électricité, 5 pompes à chaleur, climatisation, 6 plomberie.
- Marge, du plus élevé au plus bas : entretien, installation et remplacement, dépannage, puis le reste. Chiffres internes confirmés : environ 100 € par entretien (hors promo) et 1 500 € par remplacement, avant salaire du technicien (le frère de Mohammed, non rémunéré pour l'instant). Ne jamais les publier.
- Une différence avec ta recommandation : l'électricité passe avant les pompes à chaleur.

**Q14 ⏳ Concurrents (Bonus).** Heat Me est la référence. Les autres noms viendront des trois premières fiches Maps sur « dépannage chaudière Bruxelles ». Réponse :

**Q15 ✅ Néerlandais et anglais.** Non pour l'instant (français uniquement). À réévaluer après 3 mois de données Ads et Search Console. Rien à traduire, rien à préparer.

**Q16 ⏳ Annuaires et liens (Bonus).** Où Radialec est-il déjà inscrit (Pages d'Or, Infobel, Facebook, localisateurs d'installateurs de marques) ? Réponse :
Ta recommandation (liste d'inscriptions gratuites, mêmes nom, adresse, téléphone partout) est ok, mais l'adresse à utiliser dépend de la décision Q20.

**Q17 ✅ avec une condition. Étape C.**
- Pages marques, codes erreur, guides : ok, une fois Q24 (marques) répondue et à condition qu'un technicien relise chaque page. ⏳ Mohammed confirme qu'un technicien peut relire environ 30 minutes par page. Réponse :
- Pages communes : voir D2.
- Avant d'ajouter des pages : valider les 21 services encore en brouillon (`draft: true`).

**Q18 ✅ Carte « Laissez-nous un avis ».** Oui, carte avec QR code remise après chaque intervention, sans contrepartie offerte. L'objectif de 5 à 10 avis par mois est à ajuster au volume réel d'interventions.

**Q19 ✅ Google Ads.**
- Aucune campagne active (l'ancienne était mal montée).
- Prévu : test de 3 mois à 600 € par mois, 3 campagnes (remplacement et installation, entretien, dépannage), lancées seulement quand le nouveau site est en ligne avec suivi des appels.
- Besoins côté site :
  1. Une page d'atterrissage par campagne : `/chauffage/remplacement-chaudiere`, `/chauffage/entretien-chaudiere`, `/chauffage/depannage-chaudiere`.
  2. UTM et gclid conservés jusqu'à l'envoi du devis ou du rappel, et inscrits dans l'e-mail reçu.
  3. Événements `click_to_call` et `generate_lead` (déjà en place).
  4. Un numéro de téléphone de suivi (choix du prestataire par Mohammed, ⏳). Les appels sont pris de 10h à 21h : les annonces seront programmées sur ces heures.
  5. GA4 ne se charge qu'après consentement : les conversions des visiteurs qui refusent ne seront pas vues. Prévoir la mesure par le numéro de suivi et par le champ source du formulaire, et étudier le « consent mode » de Google avant le lancement. Google exige un consentement valide pour la personnalisation des annonces dans l'EEE ([EU user consent policy](https://www.google.com/about/company/user-consent-policy/)).

---

## 4. C. Faits métier

**Q20 ✅ Adresse et horaires.**
- Lange Eikstraat 46, 1970 Wezembeek-Oppem est le **siège social, sans local** ni accueil du public. À confirmer comme siège à la BCE (Q46).
- Site : l'adresse figure dans les mentions légales (obligatoire) et dans le pied de page sous le libellé « Siège social ». Jamais présentée comme une adresse de visite (pas de « venez nous voir », pas de carte). JSON-LD : à ton jugement, tant que l'adresse n'est pas présentée comme un lieu d'accueil.
- Google : l'adresse sera masquée (entreprise qui se déplace chez ses clients, [guidelines Google](https://support.google.com/business/answer/3038177)). Mohammed le fait après la re-vérification de la fiche, pas avant.
- Horaires : **7j/7, de 10h à 21h**, à renseigner dans `company.ts` (`hours.detail`). « Tous les jours » a été répondu : jours fériés inclus, à reconfirmer si besoin. Jamais « 24h/24 ».

**Q21 ⏳ Prix « à partir de ».** Prix réellement pratiqués, TVAC. Les prix déjà dans `pricing.ts` (à jour au 5 octobre) restent la référence. À compléter : remplacement de chaudière gaz standard, pompe à chaleur, radiateur posé, schéma unifilaire, borne de recharge, parlophone et vidéophone, airco mono-split, contrat syndic, installation électrique, rénovation de tableau. Réponse :
Sans prix confirmé, ne rien afficher plutôt que d'estimer.

**Q22 ⏳ Conditions tarifaires (bloquant, `pricingPolicy`).**
- Dépannage : 140 € TVAC (déplacement, diagnostic, première heure), heure supplémentaire 60 € TVAC (valeurs d'août, à reconfirmer). ⏳ Réponse :
- Majorations : ✅ **aucune au lancement** (conseil retenu). Même prix 7j/7 de 10h à 21h. Raisons : le problème est la demande, la clientèle est sensible au prix, et les horaires sont déjà limités. À revoir après 3 mois, ou si les appels du soir et du week-end dépassent la capacité d'un seul technicien. Écrire « Même tarif en soirée, le week-end et les jours fériés » seulement après accord final de Mohammed.
- Frais de déplacement hors Bruxelles : ⏳ pas encore décidé. Le site n'affiche rien sur ce point (pas de « déplacement offert » ni de supplément).
- TVA : 21 % par défaut, 6 % sur le remplacement de chaudière si le logement a au moins 10 ans (Q23). ✅ Pour les autres prestations : ⏳ Réponse :
- Moyens de paiement : ⏳ pas encore décidé. Le site n'affiche rien sur ce point.
- Promo entretien gaz à 129 € au lieu de 149 € : ✅ **recommandation retenue en attendant l'accord de Mohammed** : afficher « 129 € » sans prix barré, avec la mention « prix de lancement jusqu'au 31 décembre 2026 » (date proposée). Pas de « au lieu de 149 € » : on ne sait pas si 149 € était le prix des 30 derniers jours. Décision de remonter à 149 € en janvier selon les réservations. Coût : environ 17 à 19 € HT de marge en moins par entretien. Si Mohammed préfère une autre date, il l'indique ici. ⏳ Réponse :
  Point d'attention : en Belgique, une annonce de réduction doit indiquer comme prix de référence le prix le plus bas pratiqué pendant les 30 jours précédents ([SPF Économie](https://news.economie.fgov.be/215879-soldes-fini-les-fausses-promos/)). Si 129 € est affiché depuis plus de 30 jours, « au lieu de 149 € » peut devenir trompeur. À faire valider pour les services avant de publier un prix barré.

**Q23 ✅ TVA 6 %.**
- Règle générale : taux réduit de 6 % pour les travaux dans un logement privé d'au moins 10 ans ([Wikifin, mis à jour le 2 juin 2026](https://www.wikifin.be/fr/logement-et-emprunt-hypothecaire/acheter-construire-renover-une-habitation/construire-et-renover/un)). Les matériaux achetés directement par le client restent à 21 %.
- Radialec l'applique sur le remplacement de chaudière quand les conditions sont remplies (réponse de Mohammed).
- À écrire : « TVA 6 % si le logement a au moins 10 ans », jamais « TVA 6 % » sans condition. Pour les autres prestations, ne rien annoncer.

**Q24 ⏳ Marques.**
- Liste exacte des marques installées. Réponse :
- Réparation et entretien de toutes les marques ? Réponse :
- Titre : écrire « Les marques que nous installons » (brief validé). Pas de « partenaires de confiance » sans partenariat officiel prouvé.

**Q25 ⏳ Agréments.**
- Les agréments (Bruxelles Environnement, VEKA, Awac) appartiennent aux techniciens, personnes physiques, jamais à l'entreprise. Écrire « nos techniciens sont agréés », jamais « Radialec est agréée ». Le pluriel est valable : les sous-traitants ont leurs propres agréments.
- Intitulés exacts, catégories et numéros : Mohammed fournit les justificatifs. Réponse :
- Sans justificatif, ne publier aucun intitulé ni numéro.

**Q26 ⏳ L'entreprise.**
- Connu : Thermo Tech Solutions SRL, créée en 2024, nom commercial Radialec. Le fondateur est technicien (formation en électricité puis en chauffage à Bruxelles). Le dirigeant digital développe l'entreprise avec lui.
- Effectif : un technicien à plein temps cet hiver, plus des sous-traitants réguliers. Ne pas écrire « équipe de X techniciens » sans validation.
- Ne pas mentionner l'autre employeur du technicien.
- À compléter : prénom et parcours à publier, passage ThermoTech vers Radialec (version à publier), assurance RC professionnelle. Réponse :

**Q27 ✅ Délai de rappel (`promises.callback`).** Rappel **sous 2 h en journée**, c'est-à-dire entre 10h et 21h. Libellé proposé : « Rappelé sous 2 h, entre 10h et 21h ». Une demande reçue après 21h : rappel le lendemain dès 10h (proposition, ne pas écrire autre chose).

**Q28 ✅ Zone d'intervention.** La liste définitive reste les 41 communes de `ZONE_DESSERVIE.md`. Classement interne :

| Niveau | Communes |
|---|---|
| 1A (8) | Wezembeek-Oppem, Kraainem, Tervuren, Woluwe-Saint-Pierre, Woluwe-Saint-Lambert, Auderghem, Watermael-Boitsfort, Uccle |
| 1B (4) | Etterbeek, Ixelles, Bruxelles-Ville, Schaerbeek |
| 2 (8) | Lasne, Hoeilaart, Rhode-Saint-Genèse, Overijse, Waterloo, La Hulpe, Rixensart, Linkebeek |
| 2bis (3) | Oud-Heverlee, Keerbergen, Chaumont-Gistoux |
| 3 (18) | Anderlecht, Molenbeek, Saint-Josse, Koekelberg, Saint-Gilles, Evere, Forest, Berchem-Sainte-Agathe, Jette, Ganshoren, Drogenbos, Meise, Grimbergen, Tremelo, Braine-l'Alleud, Grez-Doiceau, Beauvechain, Incourt |

Délais : ✅ aucun « sous 24h » sur le site, pour aucun niveau. Seul le rappel sous 2 h en journée (Q27) est annoncé. Les niveaux ne sont jamais affichés sur le site.

**Q30 ⏳ Contrats d'entretien.** Contrats annuels proposés (particuliers, syndics) ? Prix ? Réponse :
Cette réponse compte aussi pour la rentabilité de la campagne Ads « entretien ».

**Q31 ⏳ Contenu d'un entretien.** À faire décrire par le technicien : gaz, mazout, durée, attestation remise. Réponse :

**Q32 ⏳ Prix existants.**
- Chauffe-eau à 129 € : quel type d'appareil ? Réponse :
- Ramonage à 149 € : attestation incluse ? Réponse :
- Débouchage à 200 € : colonne et égout inclus ? Réponse :
- Entretien PAC à 180 € : airco au même tarif ? Réponse :

**Q33 ✅ Consignes gaz.** Numéros d'urgence vérifiés sur les sites officiels (gratuits, 24h/24) :
- Bruxelles, Sibelga : **0800 19 400** ou 112 ([Sibelga](https://www.sibelga.be/en/outages-streetworks/smell-of-gas)).
- Flandre (communes du Brabant flamand), Fluvius : **0800 65 0 65** ([Fluvius](https://www.fluvius.be/nl/storingen-en-werken/storing-aardgas/veiligheidsvoorschriften-bij-gasgeur)).
- Wallonie (Brabant wallon), ORES : **0800 87 087** ([ORES](https://www.ores.be/faq/gaz-naturel)).
Afficher un bloc court par région plus le 112. Consignes officielles à reprendre (Sibelga et Fluvius) : ouvrir portes et fenêtres, pas de flamme ni d'étincelle (pas d'interrupteur, pas de lampe, pas d'appareil électrique, pas de téléphone dans le logement), fermer le robinet du compteur seulement s'il est accessible sans allumer de lumière, quitter le logement, puis appeler depuis l'extérieur. ⏳ Mohammed (technicien) valide la formulation mot pour mot, et vérifie que chaque commune de la liste dépend bien du gestionnaire indiqué. Réponse :

**Q34 ✅ FAQ de l'accueil.** Oui, retirer « ou au mazout » et renvoyer vers la page remplacement. Ne pas écrire d'interdiction précise sans source officielle : les règles diffèrent selon la région.

**Q35 ⏳ Garantie sur les dépannages.** Même garantie de 2 ans que les installations ? Même condition d'exclusivité ? Réponse :

---

## 5. D. Contenu et validation

**Q36 ⏳ Validation.** Qui relit (le propriétaire, le technicien) ? Sous quelle forme, dans quel délai ? Ta recommandation (lots, chaudière d'abord, page en local et document commentable) est ok. Réponse :

**Q37 ✅ Ton.** Vouvoiement, phrases courtes, une touche d'humour par page au maximum. Pas d'humour qui laisse entendre un délai non confirmé : « (presque) déjà en route » est à retirer tant que Q20, Q27 et Q28 ne sont pas répondues.

**Q38 ✅ Condition de garantie en petit.** Oui, prévenir le propriétaire. La condition doit rester lisible et près de la promesse « garantie 2 ans », pas en petites lignes : une condition importante cachée peut être jugée trompeuse. À faire valider si besoin par un juriste.

---

## 6. E. Photos et assets

**Q39 ⏳ Séance photo.** Qui, quand, quels chantiers avec accord du client ? Réponse :

**Q40 ✅ Tenues.** Ta recommandation est ok : tenue sombre unie, pas de faux logo. ⏳ Date prévue pour les vêtements au logo. Réponse :

**Q41 ⏳ Camionnette.** Floquée Radialec ? Réponse :

**Q42 ⏳ Origine des photos.** Pour `borne.jpg`, `conformite.jpg`, `videophone.jpg`, `repair.jpg`, `installation_elec.jpg`, `depannage_elec.webp`, `parlophone.jpeg`, `entretien.png`, `entretienbIS.jpg`. Réponse :
Ta recommandation est ok : retirer toute image dont la licence n'est pas connue.

---

## 7. F. Technique et outils

**Q43 ✅ Hébergement et domaine.**
- Domaine acheté chez Hostinger, DNS chez Hostinger (accès : Mohammed).
- Hébergement du site : **Vercel, vérifié par Mohammed** (06/10/2026).
- Pour Resend et l'adresse @radialec : Mohammed ajoute les enregistrements dans Hostinger. Ne jamais supprimer ni modifier les MX, SPF et DKIM existants. Un domaine ne doit avoir qu'un seul enregistrement SPF : fusionner, ne pas en ajouter un second.

**Q44 ✅ avec une décision de Mohammed. Cal.com.** Ta recommandation est ok : un événement par service d'entretien, au nom de Radialec, pas de dépannage en ligne (urgence = téléphone). Reste à décider : compte Cal.com au nom de Radialec (avec l'adresse info@radialec.be) plutôt que personnel. Durées et services réservables en ligne : Réponse :

**Q45 ✅ E-mail professionnel.** Oui, `info@radialec.be` remplace `info@thermotechs.be` partout (décision déjà prise). ✅ La boîte existe et fonctionne.

**Q3 (rappel, [Avant la page]).** ✅ Probablement aucun ancien site : la version en ligne n'avait qu'une page (Q2) et Search Console n'avait aucune propriété pour le compte utilisé. `thermotechs.be` sert sans doute seulement pour l'e-mail. ⏳ Mohammed ouvre `thermotechs.be` dans un navigateur pour confirmer. Réponse :

---

## 8. G. Légal

**Q46 ⏳ Informations légales (bloquant).**
- Dénomination : Thermo Tech Solutions SRL. TVA : BE 1008.693.201. Numéro BCE : en général les mêmes chiffres que le numéro de TVA, à vérifier sur la BCE. Réponse :
- Hébergeur : Vercel (vérifié).
- Responsable de la publication : ✅ le gérant de Thermo Tech Solutions. ⏳ Nom exact du gérant à fournir. Réponse :
- Durée de conservation des demandes de devis : proposition de départ à valider, 24 mois après le dernier contact. Réponse :
- Localisation des prestataires (Resend, Gmail, Google Analytics, Causerie, Cal.com) : à relever dans la politique de confidentialité de chacun. Mohammed n'a rien à fournir ici.

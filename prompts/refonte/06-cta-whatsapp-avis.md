# Refonte Radialec, 06 · Boutons d'action, WhatsApp et avis Google

Analyse et décisions du 11 octobre 2026. Objectif : que chaque page pousse la bonne action, au bon moment, sans surcharge, sur ordinateur comme sur mobile.

## 1. Ce que cherche un visiteur, selon la page

| Intention de la page | État d'esprit du visiteur | Action n°1 | Action n°2 | En repli |
|---|---|---|---|---|
| **Urgence** (dépannage chaudière, électricité, plomberie, clim) | Stressé, veut une solution maintenant | Appeler | WhatsApp, pour envoyer une photo de la panne ou du code erreur | Être rappelé |
| **Entretien** (chaudière, chauffe-eau, ramonage, clim) | Planifie, compare les prix | Appeler | Prendre rendez-vous | WhatsApp, être rappelé |
| **Installation / projet** (remplacement, PAC, borne, tableau…) | Réfléchit, veut un prix précis | Appeler | Demander un devis | WhatsApp pour envoyer des photos, être rappelé |
| **Pages générales** (accueil, tarifs, contact) | Découvre | Appeler | Demander un devis | WhatsApp, être rappelé |

Le téléphone reste l'action n°1 partout : c'est ce qui convertit le mieux pour un artisan local, et le propriétaire l'a fixé comme règle. La deuxième action dépend de l'intention. Avant cette analyse, plusieurs endroits proposaient un devis sur des pages d'urgence ou d'entretien à prix affiché : ces incohérences sont corrigées (section 4).

## 2. Hiérarchie visuelle (couleurs)

| Niveau | Rôle | Style | Où |
|---|---|---|---|
| 1 | Appeler | Bouton rouge du logo (dégradé flamme) avec le numéro et l'icône | Partout, toujours le plus visible |
| 2 | Devis / rendez-vous | Bouton bleu nuit plein (blanc sur fond lavande dans les hauts de page) | Selon l'intention |
| 3 | WhatsApp | Bouton blanc, icône WhatsApp verte | Deuxième action sur les pages d'urgence, sinon troisième |
| 4 | Être rappelé | Lien ou bouton à contour | Repli : FAQ, CTA final, bandeau d'appel |

**Pourquoi WhatsApp n'est pas entièrement vert :** le vert WhatsApp (#25D366) attire l'œil autant que le rouge. En aplat, il volerait la vedette au bouton d'appel et casserait la palette du site. L'icône verte suffit pour être reconnue au premier coup d'œil, le bouton reste blanc.

## 3. WhatsApp : pourquoi et où

**Pourquoi.** À Bruxelles, WhatsApp est le canal de conversation le plus naturel. Il capte trois profils que le téléphone perd :
- celui qui ne peut pas appeler (au travail, en réunion, le soir) ;
- celui qui n'aime pas téléphoner ;
- celui qui veut montrer le problème : la photo d'une chaudière, d'un code erreur, d'une fuite ou d'un tableau. C'est aussi le meilleur outil de diagnostic pour le technicien.

Le message s'ouvre pré-rempli avec la page d'origine : moins d'effort pour le client, du contexte pour Radialec. Chaque clic est mesuré (`click_whatsapp` dans GA4, à marquer comme événement clé).

**Où.**

| Emplacement | Mobile | Ordinateur |
|---|---|---|
| Barre d'actions en bas d'écran | Bouton icône dans la barre (urgence : bouton « WhatsApp » avec libellé) | — |
| Haut de page | Via la barre | Urgence : deuxième bouton « Envoyer une photo » ; ailleurs : petit bouton icône à côté des deux boutons |
| Bandeau d'appel (milieu de page) | Deuxième bouton (sauf entretien : rendez-vous, avec WhatsApp en lien) | Idem |
| FAQ « Votre question n'y est pas ? » | Bouton WhatsApp, puis lien « être rappelé » | Idem |
| CTA final | Pages de dépannage : deuxième bouton « Envoyer une photo ». Ailleurs (y compris pages métier et accueil, qui restent sur le devis) : lien « Écrire sur WhatsApp » à côté de « Être rappelé » | Idem |
| Menu mobile | Bouton sous le téléphone | — |
| Contact, pied de page, devis (aide « panne en cours ») | Lien ou ligne dédiée | Idem |

**Ce qu'on évite :** une bulle flottante sur ordinateur. Elle recouvrirait le contenu, ce que le propriétaire a déjà reproché au chat Causerie. Sur mobile, la barre du bas joue ce rôle sans rien masquer.

**À confirmer :** WhatsApp doit être actif sur le +32 486 44 21 86, idéalement avec WhatsApp Business : message d'accueil, horaires 10h–21h, réponse rapide.

## 4. Incohérences corrigées

- **Barre mobile :** « Devis gratuit » s'affichait sur toutes les pages, y compris dépannage et entretien. Elle s'adapte désormais à l'intention de la page.
- **Bloc tarifs des pages d'entretien et de dépannage :** il proposait « Demander un devis » alors que le prix est affiché. Il propose maintenant « Prendre rendez-vous » (entretien) ou le téléphone (urgence).
- **Bloc étapes des pages de dépannage :** il finissait sur « Demander un devis ». Il finit maintenant sur le téléphone.
- **CTA final des pages de dépannage :** « Demander un devis » devient « Envoyer une photo » (WhatsApp), cohérent avec « décrivez-nous la panne ».

## 5. Avis Google : combien, lesquels, où

**Combien.** Trois avis par section, plus la note globale et un lien vers tous les avis :
- au-delà de trois, les visiteurs survolent un mur de texte et le site ressemble à un widget générique ;
- en dessous, la preuve paraît mince ;
- la note globale (5,0) et le volume (« plus de 30 avis ») apportent la crédibilité statistique, les trois avis apportent l'émotion et le détail ;
- sur mobile, les trois avis défilent horizontalement : la section ne s'allonge pas.

**Lesquels.**
- **Pertinents :** sur une page d'entretien, des avis d'entretien ; sur une page de dépannage, des avis de dépannage.
- **Récents :** les plus récents d'abord. Un avis daté de plus d'un an rassure moins.
- **Précis :** ils citent un fait (« fuite un vendredi soir et un jour férié », « code erreur incompréhensible », « prix correct »). Les avis vagues (« très bon service ») ne servent qu'en complément.

**Où.**
- Dans la section « Ils nous font confiance » de chaque page. C'est la même section qu'avant, elle reste au même endroit, mais les avis y passent au premier plan.
- Dans la colonne de gauche de /devis : un avis court, au moment où l'on hésite à envoyer.
- La note reste aussi dans le haut de page et le pied de page.

**Règles.**
- Avis copiés mot pour mot, avec prénom et initiale, date approximative et source « Avis Google ».
- Jamais d'avis réécrits ou inventés.
- Pas de données structurées « AggregateRating » : Google ne les affiche pas pour des avis sur sa propre entreprise.
- Le nombre d'avis est formulé « plus de 30 » : reste vrai quand le nombre augmente, contrairement à un chiffre exact codé en dur.

**Mise à jour.** Les avis vivent dans `app/data/reviews.ts`. À rafraîchir chaque mois avec les nouveaux avis précis. Solution automatique possible plus tard : l'API Google Places, dans son quota gratuit, avec une clé fournie par le propriétaire.

## 6. Mesure

À marquer comme événements clés dans GA4 :
- `click_to_call` (appels) ;
- `click_whatsapp` (nouveau) ;
- `generate_lead` (devis, rappel, rendez-vous).

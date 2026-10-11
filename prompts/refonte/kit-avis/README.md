# Kit avis Google · Radialec

Objectif : obtenir un avis après chaque intervention. Plus d'avis, c'est plus d'appels venant de la carte Google (« chauffagiste près de chez moi »), et une preuve plus forte sur le site.

## Le lien à utiliser partout : radialec.be/avis

`https://www.radialec.be/avis` ouvre directement le formulaire « Écrire un avis » de la fiche RADIALEC, sur téléphone comme sur ordinateur. Vérifié le 11/10/2026.

Utilisez-le dans les SMS, les messages WhatsApp, la signature e-mail, les devis et les factures. Si Google change un jour son lien, il suffit de le changer sur le site (`company.google.reviewUrl` dans `app/data/company.ts`) : les cartes déjà imprimées continuent de fonctionner.

## Les cartes

| Fichier | Pour quoi faire |
|---|---|
| `carte-avis-imprimeur.pdf` | À envoyer à un imprimeur en ligne : carte de visite 85 × 55 mm, recto et verso, 3 mm de fond perdu déjà inclus. Papier mat épais conseillé. |
| `carte-avis-a4.pdf` | À imprimer soi-même : 10 cartes (recto seul) sur une feuille A4 épaisse, à découper le long des pointillés. |
| `qr-avis.png`, `qr-avis.svg` | Le QR code seul, pour un devis, une facture, un autocollant sur la camionnette… |

- **Recto :** remerciement et QR code vers radialec.be/avis.
- **Verso :** « Votre prochain entretien : le … » (le technicien écrit la date) et le numéro de téléphone. La carte reste sur le frigo et ramène l'entretien suivant.

Pour modifier la carte, éditez `carte-avis.html` ou `carte-avis-a4.html`, puis réexportez en PDF depuis ce dossier :

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --virtual-time-budget=8000 --print-to-pdf="$PWD/carte-avis-imprimeur.pdf" "file://$PWD/carte-avis.html"
```

## Quand et comment demander

1. **Sur place, en fin d'intervention**, en tendant la carte : « Si vous avez 30 secondes, un avis Google nous aide énormément. Le QR code vous emmène directement au bon endroit. »
2. **Le soir même**, le message n°1 ci-dessous.
3. **Une seule relance**, 3 jours plus tard, s'il n'y a pas d'avis (message n°2). Jamais plus.

**Règles de Google :** si elles ne sont pas respectées, les avis peuvent être supprimés et la fiche sanctionnée.
- Demander à **tous** les clients, pas seulement à ceux qui ont l'air contents.
- **Aucune contrepartie** : ni réduction, ni cadeau en échange d'un avis.
- Ne jamais écrire l'avis à la place du client, ni depuis un téléphone ou un compte de Radialec.

## Messages prêts à copier (SMS ou WhatsApp)

À remplacer : {prénom}, {prestation} (« l'entretien de votre chaudière », « le dépannage de votre chaudière »…), {date}. Adaptez la signature.

**1. Le soir de l'intervention**
> Bonjour {prénom}, merci d'avoir fait appel à Radialec aujourd'hui pour {prestation}. Votre avis nous aide beaucoup à nous faire connaître, il prend 30 secondes : radialec.be/avis
> Une question sur l'intervention ? Répondez simplement à ce message. Bonne soirée ! Houdaifa · Radialec

**2. Relance, 3 jours après (une seule fois)**
> Bonjour {prénom}, tout fonctionne bien depuis notre passage ? Si vous avez un instant, votre avis Google nous aiderait vraiment : radialec.be/avis. Merci ! Houdaifa · Radialec

**3. Après un entretien : proposer le contrat**
> Bonjour {prénom}, merci encore pour votre confiance. Pour ne plus avoir à y penser, nous proposons un contrat d'entretien sur 2 ans à 130 € TVAC. Intéressé(e) ? Répondez « oui » et je vous explique ce qu'il comprend. Houdaifa · Radialec

À compléter par Houdaifa avant d'envoyer ce message : ce que comprend le contrat (nombre de visites, priorité en cas de panne…). Le prix vient de `app/data/pricing.ts` (`contratEntretien`).

**4. Rappel d'entretien**
À envoyer un mois avant l'échéance fixée par le technicien.
> Bonjour {prénom}, l'entretien de votre chaudière (dernier passage le {date}) arrive bientôt à échéance. On vous réserve un créneau ? Répondez à ce message ou choisissez une date sur radialec.be/rendez-vous. Houdaifa · Radialec

## Répondre aux avis sur Google

Répondez à **chaque** avis, sous 48 heures. Google en tient compte, et les futurs clients lisent les réponses. Citez naturellement la prestation et la commune, sans forcer : ça aide le référencement local.

**Avis positif détaillé**
> Merci {prénom} pour ce retour ! Ravis que votre chaudière soit repartie rapidement à {commune}. Au plaisir de vous revoir pour l'entretien. Houdaifa, Radialec

**Avis positif court**
> Merci beaucoup {prénom}, au plaisir de vous revoir !

**Avis négatif** (rester calme, ne jamais se justifier en détail ni donner d'informations privées, proposer d'en parler)
> Bonjour {prénom}, merci d'avoir pris le temps de nous écrire. Nous sommes désolés que notre intervention ne vous ait pas donné entière satisfaction. Appelez-nous au +32 486 44 21 86, nous voulons trouver une solution avec vous. Houdaifa, Radialec

## Sur le site

- **Lien discret « Déjà client ? Laissez-nous un avis »** dans le pied de page et sur /contact : là où les clients reviennent chercher le numéro. Volontairement absent du parcours des prospects, qui doivent lire des avis et appeler, pas en écrire.
- **Avis affichés sur le site :** ils sont dans `app/data/reviews.ts`, copiés mot pour mot. Envoyez chaque mois les nouveaux avis à Claude Code pour les ajouter.

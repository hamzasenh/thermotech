import Link from "next/link";
import { MissingInfo, OrMissing } from "@/components/site/MissingInfo";
import { pageMetadata } from "@/lib/seo";
import { company } from "../data/company";
import { LegalPage, LegalTable } from "../sections/LegalPage";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Radialec collecte et utilise vos données (demande de devis, contact, mesure d'audience) et comment exercer vos droits RGPD.",
  path: "/confidentialite",
});

export default function ConfidentialitePage() {
  const { legal, address } = company;

  return (
    <LegalPage
      title="Politique de confidentialité"
      path="/confidentialite"
      updated="4 octobre 2026"
      intro="Vos données servent à répondre à vos demandes et à intervenir chez vous, rien d'autre. Cette page explique lesquelles nous collectons, pourquoi, combien de temps, et comment exercer vos droits."
    >
      <h2>Responsable du traitement</h2>
      <p>
        {company.name} — <OrMissing value={legal.companyName} what="dénomination sociale" />,{" "}
        <OrMissing
          value={address ? `${address.street}, ${address.postalCode} ${address.city}` : null}
          what="adresse du siège"
        />
        , numéro d&apos;entreprise <OrMissing value={legal.enterpriseNumber} what="numéro BCE" />.
      </p>
      <p>
        Pour toute question sur vos données&nbsp;: <a href={`mailto:${company.email}`}>{company.email}</a> ou{" "}
        <a href={company.phone.href}>{company.phone.display}</a>.
      </p>

      <h2>Les données que nous collectons</h2>
      <h3>Quand vous demandez un devis</h3>
      <ul>
        <li>vos nom, téléphone, adresse e-mail, code postal, commune et, si vous la donnez, votre adresse ;</li>
        <li>la description de votre besoin, la prestation concernée, le délai souhaité, le type de bien ;</li>
        <li>les photos que vous choisissez de joindre ;</li>
        <li>votre préférence de contact et le créneau de rappel souhaité ;</li>
        <li>
          la provenance de votre visite (page d&apos;arrivée, page précédente, éventuels paramètres de campagne
          publicitaire), pour savoir quels canaux nous amènent des clients.
        </li>
      </ul>
      <h3>Quand vous demandez à être rappelé</h3>
      <ul>
        <li>vos nom et téléphone, le moment où vous souhaitez être rappelé ;</li>
        <li>si vous les indiquez, le sujet et votre message ;</li>
        <li>la page d&apos;où part votre demande et la provenance de votre visite, comme pour un devis.</li>
      </ul>
      <h3>Quand vous réservez un rendez-vous en ligne</h3>
      <p>
        L&apos;agenda de la page « Prendre rendez-vous » est fourni par Cal.com. Les informations que vous y
        saisissez (nom, adresse e-mail et autres champs du formulaire de réservation) et le créneau choisi sont
        enregistrés par Cal.com et nous sont transmis pour organiser l&apos;intervention.
      </p>
      <h3>Quand vous nous appelez ou nous écrivez</h3>
      <p>Les informations que vous nous communiquez pour organiser l&apos;intervention.</p>
      <h3>Quand vous naviguez sur le site</h3>
      <p>
        Uniquement si vous l&apos;acceptez&nbsp;: des statistiques de visite via Google Analytics (pages vues, type
        d&apos;appareil, provenance). Voir notre <Link href="/cookies">politique cookies</Link>.
      </p>

      <h2>Pourquoi et sur quelle base</h2>
      <LegalTable
        head={["Finalité", "Base légale (RGPD)"]}
        rows={[
          ["Répondre à votre demande de devis ou de rendez-vous", "Mesures précontractuelles à votre demande (art. 6.1.b)"],
          ["Réaliser l'intervention, la facturer, assurer la garantie", "Exécution du contrat (art. 6.1.b)"],
          ["Tenir notre comptabilité", "Obligation légale (art. 6.1.c)"],
          ["Mesurer l'audience du site", "Votre consentement (art. 6.1.a), retirable à tout moment"],
          ["Savoir quels canaux nous amènent des demandes", "Intérêt légitime à évaluer nos actions commerciales (art. 6.1.f)"],
        ]}
      />
      <p>Nous ne vendons ni ne louons vos données, et nous ne les utilisons pas pour de la prospection sans votre accord.</p>

      <h2>Qui y a accès</h2>
      <p>
        Nos techniciens et notre équipe administrative. Nous faisons aussi appel à des prestataires qui traitent
        certaines données pour notre compte&nbsp;:
      </p>
      {/*
        Localisations relevées le 08/10/2026 dans la politique de confidentialité de chaque prestataire :
        resend.com/legal/privacy-policy (traitement aux États-Unis, mécanisme de transfert non précisé),
        policies.google.com/privacy/frameworks (Google LLC certifiée EU-U.S. Data Privacy Framework),
        causeriebot.com/confidentialite (hébergement UE, requêtes envoyées à des fournisseurs d'IA),
        cal.com/privacy (États-Unis, DPF + clauses contractuelles types),
        vercel.com/legal/privacy-policy (États-Unis et autres pays, DPF + clauses contractuelles types).
      */}
      <LegalTable
        head={["Prestataire", "Rôle", "Localisation"]}
        rows={[
          [
            "Resend",
            "Acheminement des demandes de devis et de rappel par e-mail",
            <span key="r">
              États-Unis. <MissingInfo>garanties de transfert à vérifier dans le contrat de traitement de Resend</MissingInfo>
            </span>,
          ],
          [
            "Google (Gmail)",
            "Réception et stockage des e-mails de demande",
            <span key="g">
              Google LLC (États-Unis), certifiée EU-U.S. Data Privacy Framework.{" "}
              <MissingInfo>à confirmer : boîte qui reçoit les demandes (Gmail ou info@radialec.be)</MissingInfo>
            </span>,
          ],
          ["Google (Analytics)", "Mesure d'audience, uniquement avec votre accord", "Google LLC (États-Unis), certifiée EU-U.S. Data Privacy Framework"],
          [
            "Causerie",
            "Assistant de discussion du site",
            "Hébergement dans l'Union européenne ; les messages sont transmis à des fournisseurs d'intelligence artificielle (notamment aux États-Unis) pour générer les réponses, sans servir à entraîner leurs modèles",
          ],
          ["Cal.com", "Réservation de rendez-vous en ligne", "Cal.com, Inc. (États-Unis), certifiée EU-U.S. Data Privacy Framework, clauses contractuelles types"],
          [
            <OrMissing key="h" value={legal.host} what="hébergeur" />,
            "Hébergement du site",
            "États-Unis et autres pays, certifiée EU-U.S. Data Privacy Framework, clauses contractuelles types",
          ],
        ]}
      />
      <p>
        Lorsque des données sont transférées hors de l&apos;Union européenne, ces transferts sont encadrés par le
        cadre de protection des données UE–États-Unis (Data Privacy Framework) ou par des clauses contractuelles
        types, selon le prestataire.
      </p>

      <h2>Combien de temps nous les conservons</h2>
      <ul>
        <li>
          Demande de devis non suivie d&apos;intervention&nbsp;:{" "}
          <MissingInfo>24 mois après le dernier contact (proposition à valider)</MissingInfo>
        </li>
        <li>Données clients liées à une intervention&nbsp;: pendant la relation et la durée de la garantie, puis archivées.</li>
        <li>Factures et pièces comptables&nbsp;: pendant la durée imposée par la législation comptable et fiscale belge.</li>
        <li>Statistiques Google Analytics&nbsp;: 13 mois maximum pour les cookies.</li>
      </ul>

      <h2>Vos droits</h2>
      <p>Vous pouvez à tout moment&nbsp;:</p>
      <ul>
        <li>accéder à vos données et en obtenir une copie ;</li>
        <li>les faire rectifier ou compléter ;</li>
        <li>demander leur effacement, ou la limitation de leur traitement ;</li>
        <li>vous opposer à un traitement fondé sur notre intérêt légitime ;</li>
        <li>recevoir les données que vous nous avez fournies dans un format lisible (portabilité) ;</li>
        <li>retirer votre consentement à la mesure d&apos;audience, via « Gérer mes cookies » en bas de page.</li>
      </ul>
      <p>
        Écrivez-nous à <a href={`mailto:${company.email}`}>{company.email}</a> : nous répondons dans un délai
        d&apos;un mois. Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une plainte
        auprès de l&apos;Autorité de protection des données, rue de la Presse 35, 1000 Bruxelles —{" "}
        <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer">
          autoriteprotectiondonnees.be
        </a>
        .
      </p>

      <h2>Sécurité</h2>
      <p>
        Le site est servi en HTTPS, les demandes de devis transitent de manière chiffrée et l&apos;accès aux données
        est limité aux personnes qui en ont besoin pour traiter votre demande.
      </p>

      <h2>Modifications</h2>
      <p>
        Cette politique peut évoluer, notamment si nous ajoutons de nouveaux services. La date de dernière mise à
        jour figure en haut de la page.
      </p>
    </LegalPage>
  );
}

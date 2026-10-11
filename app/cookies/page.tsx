import Link from "next/link";
import { CookieSettingsButton } from "@/components/site/CookieConsent";
import { MissingInfo } from "@/components/site/MissingInfo";
import { pageMetadata } from "@/lib/seo";
import { company } from "../data/company";
import { LegalPage, LegalTable } from "../sections/LegalPage";

// Outils activés par leur identifiant (company.ts) : la page ne décrit que ce qui tourne réellement.
const clarity = Boolean(company.clarityId);
const ads = Boolean(company.googleAds.id);
const audience = clarity ? "Google Analytics et Microsoft Clarity" : "Google Analytics";

export const metadata = pageMetadata({
  title: "Politique cookies",
  description: ads
    ? `Les cookies utilisés sur le site Radialec : mesure d'audience (${audience}) et mesure de nos annonces Google Ads, uniquement avec votre accord. Gérez vos choix à tout moment.`
    : `Les cookies utilisés sur le site Radialec : uniquement la mesure d'audience (${audience}), avec votre accord. Gérez vos choix à tout moment.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique cookies"
      path="/cookies"
      updated="11 octobre 2026"
      intro={
        ads
          ? `La mesure d'audience (${audience}) et la mesure de nos annonces Google Ads ne sont chargées que si vous les acceptez, séparément. Pas de publicité ciblée.`
          : `Nous n'utilisons aucun cookie publicitaire. La mesure d'audience du site (${audience}) n'est chargée que si vous l'acceptez.`
      }
    >
      <h2>Gérer vos choix</h2>
      <p>
        Vous pouvez accepter ou refuser la mesure d&apos;audience{ads ? " et la mesure de nos annonces" : ""}, et changer
        d&apos;avis quand vous voulez.
      </p>
      <p>
        <CookieSettingsButton className="btn btn-secondary btn-sm !mt-0" />
      </p>
      <p>
        Votre choix est conservé 6 mois dans votre navigateur, puis nous vous le redemandons. Refuser n&apos;a
        aucune incidence sur l&apos;utilisation du site&nbsp;: toutes les pages et le formulaire de devis fonctionnent
        normalement.
      </p>

      <h2>Ce que le site dépose dans votre navigateur</h2>
      <LegalTable
        head={["Nom", "Fournisseur", "Finalité", "Durée", "Accord requis"]}
        rows={[
          ["radialec_consent (stockage local)", company.name, "Mémoriser votre choix sur les cookies", "6 mois", "Non (nécessaire)"],
          [
            "radialec_attribution (stockage de session)",
            company.name,
            "Mémoriser la page d'arrivée et la campagne d'origine, jointes uniquement à une demande de devis ou de rappel que vous envoyez",
            "Fin de la visite",
            // Option A retenue par le propriétaire le 08/10/2026 : pas d'accord demandé.
            "Non (transmis uniquement avec votre demande)",
          ],
          ["_ga", "Google Analytics", "Distinguer les visiteurs de façon anonyme", "13 mois", "Oui"],
          ["_ga_<identifiant>", "Google Analytics", "Conserver l'état de la visite", "13 mois", "Oui"],
          ...(clarity
            ? [
                ["_clck", "Microsoft Clarity", "Reconnaître votre navigateur d'une visite à l'autre (identifiant anonyme)", "1 an", "Oui"],
                ["_clsk", "Microsoft Clarity", "Regrouper les pages d'une même visite", "1 jour", "Oui"],
              ]
            : []),
          ...(ads
            ? [
                ["_gcl_au", "Google Ads", "Relier une demande envoyée à l'annonce qui vous a amené", "90 jours", "Oui"],
                ["_gcl_aw", "Google Ads", "Mémoriser le clic sur l'annonce", "90 jours", "Oui"],
              ]
            : []),
          [
            "Agenda de réservation",
            "Cal.com",
            "Afficher les créneaux et enregistrer votre réservation (page « Prendre rendez-vous » uniquement)",
            <MissingInfo key="cd">à vérifier</MissingInfo>,
            <MissingInfo key="cc">à vérifier auprès de Cal.com</MissingInfo>,
          ],
        ]}
      />
      <p>
        Les adresses IP collectées par Google Analytics 4 ne sont pas conservées. Les statistiques nous servent
        uniquement à comprendre quelles pages sont utiles et à améliorer le site.
      </p>
      {clarity && (
        <p>
          Microsoft Clarity enregistre votre parcours de façon anonymisée (clics, défilement) pour repérer ce qui gêne
          sur le site. Ce que vous saisissez dans les formulaires n&apos;est jamais enregistré. Les enregistrements sont
          conservés 30 jours.
        </p>
      )}
      {ads && (
        <p>
          Google Ads nous dit combien de demandes chaque annonce nous apporte, pour ne pas payer des annonces inutiles.
          Aucune publicité ciblée ni remarketing.
        </p>
      )}

      <h2>Paramétrer votre navigateur</h2>
      <p>
        Vous pouvez aussi bloquer ou supprimer les cookies depuis les réglages de votre navigateur (Chrome,
        Safari, Firefox, Edge). Le site restera utilisable.
      </p>

      <h2>En savoir plus</h2>
      <p>
        L&apos;usage de vos données personnelles est détaillé dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>. Pour toute question :{" "}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>
    </LegalPage>
  );
}

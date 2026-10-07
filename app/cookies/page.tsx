import Link from "next/link";
import { CookieSettingsButton } from "@/components/site/CookieConsent";
import { MissingInfo } from "@/components/site/MissingInfo";
import { pageMetadata } from "@/lib/seo";
import { company } from "../data/company";
import { LegalPage, LegalTable } from "../sections/LegalPage";

export const metadata = pageMetadata({
  title: "Politique cookies",
  description:
    "Les cookies utilisés sur le site Radialec : uniquement la mesure d'audience Google Analytics, avec votre accord. Gérez vos choix à tout moment.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage
      title="Politique cookies"
      path="/cookies"
      updated="4 octobre 2026"
      intro="Nous n'utilisons aucun cookie publicitaire. La seule mesure d'audience du site, Google Analytics, n'est chargée que si vous l'acceptez."
    >
      <h2>Gérer vos choix</h2>
      <p>Vous pouvez accepter ou refuser la mesure d&apos;audience, et changer d&apos;avis quand vous voulez.</p>
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
            <MissingInfo key="at">à valider</MissingInfo>,
          ],
          ["_ga", "Google Analytics", "Distinguer les visiteurs de façon anonyme", "13 mois", "Oui"],
          ["_ga_<identifiant>", "Google Analytics", "Conserver l'état de la visite", "13 mois", "Oui"],
          [
            // causeriebot.com/confidentialite (08/10/2026) : stockage local, pas de cookie, durée non précisée.
            "Identifiant de visiteur et conversations (stockage local)",
            "Causerie",
            "Retrouver votre conversation d'une page à l'autre",
            <MissingInfo key="d">durée non précisée par Causerie</MissingInfo>,
            <MissingInfo key="c">à vérifier auprès de Causerie</MissingInfo>,
          ],
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

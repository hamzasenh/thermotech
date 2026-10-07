import Link from "next/link";
import { MissingInfo, OrMissing } from "@/components/site/MissingInfo";
import { pageMetadata } from "@/lib/seo";
import { company } from "../data/company";
import { LegalPage } from "../sections/LegalPage";

export const metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Radialec : éditeur, hébergement, agréments, propriété intellectuelle et droit applicable.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  const { legal, address } = company;

  return (
    <LegalPage title="Mentions légales" path="/mentions-legales" updated="1er octobre 2026">
      <h2>Éditeur du site</h2>
      <ul>
        <li>
          <strong>Nom commercial&nbsp;:</strong> {company.name}
        </li>
        <li>
          <strong>Dénomination sociale&nbsp;:</strong> <OrMissing value={legal.companyName} what="dénomination sociale" />
        </li>
        <li>
          <strong>Forme juridique&nbsp;:</strong> <OrMissing value={legal.legalForm} what="forme juridique (ex. SRL)" />
        </li>
        <li>
          <strong>Siège social&nbsp;:</strong>{" "}
          <OrMissing
            value={address ? `${address.street}, ${address.postalCode} ${address.city}` : null}
            what="adresse du siège"
          />
        </li>
        <li>
          <strong>Numéro d&apos;entreprise (BCE) / TVA&nbsp;:</strong>{" "}
          <OrMissing value={legal.enterpriseNumber} what="numéro BCE, ex. BE 0123.456.789" />
        </li>
        <li>
          <strong>Téléphone&nbsp;:</strong> <a href={company.phone.href}>{company.phone.display}</a>
        </li>
        <li>
          <strong>E-mail&nbsp;:</strong> <a href={`mailto:${company.email}`}>{company.email}</a>
        </li>
        <li>
          <strong>Responsable de la publication&nbsp;:</strong>{" "}
          {legal.publisher ?? (
            <>
              le gérant de {legal.companyName ?? company.name} <MissingInfo>À fournir : nom du gérant</MissingInfo>
            </>
          )}
        </li>
      </ul>

      <h2>Agréments</h2>
      <p>
        Nos techniciens sont agréés par Bruxelles Environnement, la VEKA (Vlaams Energie- en Klimaatagentschap) et
        la Wallonie.
      </p>

      <h2>Hébergement</h2>
      <p>
        <OrMissing value={legal.host} what="hébergeur du site (nom, adresse, contact), ex. Vercel Inc." />
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus de ce site (textes, photographies, illustrations, logo, mise en page) est la
        propriété de {company.name}, sauf mention contraire. Les logos des marques et des organismes d&apos;agrément
        appartiennent à leurs titulaires respectifs et ne sont reproduits qu&apos;à titre informatif.
      </p>
      <p>
        Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est
        interdite.
      </p>

      <h2>Informations et tarifs</h2>
      <p>
        Les informations publiées sur ce site sont fournies à titre indicatif et peuvent évoluer. Les prix affichés
        s&apos;entendent TVA comprise et sont valables à la date de consultation. Pour toute installation ou
        rénovation, seul le devis remis par {company.name} fait foi.
      </p>
      <p>
        Le site peut contenir des liens vers des sites tiers (organismes publics, partenaires)&nbsp;: {company.name}{" "}
        n&apos;exerce aucun contrôle sur leur contenu et n&apos;en assume pas la responsabilité.
      </p>

      <h2>Données personnelles et cookies</h2>
      <p>
        Le traitement de vos données est décrit dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>, et l&apos;usage des cookies dans notre{" "}
        <Link href="/cookies">politique cookies</Link>.
      </p>

      <h2>Droit applicable et litiges</h2>
      <p>
        Le présent site et ses mentions légales sont régis par le droit belge. En cas de litige, et à défaut de
        solution amiable, les tribunaux de l&apos;arrondissement judiciaire du siège social de {company.name} sont
        compétents.
      </p>
      <p>
        Si vous êtes un consommateur, vous pouvez également vous adresser gratuitement au Service de Médiation pour
        le Consommateur&nbsp;:{" "}
        <a href="https://mediationconsommateur.be" target="_blank" rel="noopener noreferrer">
          mediationconsommateur.be
        </a>
        .
      </p>
    </LegalPage>
  );
}

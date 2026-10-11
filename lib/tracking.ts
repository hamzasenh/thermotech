// Mesure : charge Google Analytics, Google Ads et Microsoft Clarity selon le
// consentement (lib/consent.ts), puis envoie les événements. Navigateur uniquement.
//
// Mode de consentement « de base » : aucune balise n'est chargée avant l'accord,
// pas même de requête sans cookie. Les signaux du mode de consentement v2
// (ad_storage, ad_user_data, ad_personalization, analytics_storage) sont transmis
// au chargement, comme l'exige Google pour les visiteurs européens. Pas de
// remarketing : ad_personalization reste refusé.

import { company, type AdsConversion } from "@/app/data/company";
import { internationalDigits } from "@/lib/quote/schema";
import { allowed, readConsent, type Consent } from "./consent";

const loaded = { gtag: false, ga: false, ads: false, clarity: false };

function addScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // gtag.js attend l'objet `arguments` lui-même, pas un tableau.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  return window.gtag;
}

/** Charge ou met à jour les outils acceptés. Idempotent : appelé à chaque choix. */
export function applyConsent(consent: Consent | null) {
  const ga = allowed(consent, "ga");
  const ads = allowed(consent, "googleAds");

  if (ga || ads) {
    const gtag = ensureGtag();
    const state = {
      analytics_storage: ga ? "granted" : "denied",
      ad_storage: ads ? "granted" : "denied",
      ad_user_data: ads ? "granted" : "denied",
      ad_personalization: "denied",
    };
    if (!loaded.gtag) {
      gtag("consent", "default", state);
      gtag("js", new Date());
      addScript(`https://www.googletagmanager.com/gtag/js?id=${ga ? company.analyticsId : company.googleAds.id}`);
      loaded.gtag = true;
    } else {
      gtag("consent", "update", state);
    }
    if (ga && !loaded.ga) {
      gtag("config", company.analyticsId, { cookie_expires: 34128000 });
      loaded.ga = true;
    }
    if (ads && !loaded.ads) {
      // Conversions améliorées : e-mail / téléphone du formulaire, hachés par la balise avant envoi.
      gtag("config", company.googleAds.id, { allow_enhanced_conversions: true });
      loaded.ads = true;
    }
  }

  if (allowed(consent, "clarity") && !loaded.clarity) {
    // File d'attente du script officiel : les appels sont rejoués une fois Clarity chargé.
    const clarity: NonNullable<Window["clarity"]> =
      window.clarity ||
      function queue() {
        // eslint-disable-next-line prefer-rest-params
        (clarity.q = clarity.q || []).push(arguments);
      };
    window.clarity = clarity;
    addScript(`https://www.clarity.ms/tag/${company.clarityId}`);
    // Pas de Microsoft Advertising : stockage publicitaire refusé.
    clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
    loaded.clarity = true;
  }
}

/** Retrait de l'accord : signaux « refusé » puis suppression des cookies du site (la page est ensuite rechargée). */
export function revokeTracking() {
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.clarity?.("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });

  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter((name) => /^(_ga(_.*)?|_gid|_gcl_.*|_clck|_clsk)$/.test(name))
    .forEach((name) =>
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
      })
    );
}

function gaEvent(name: string, params: Record<string, unknown>) {
  if (!allowed(readConsent(), "ga")) return;
  window.gtag?.("event", name, { send_to: company.analyticsId, ...params });
}

function adsConversion(kind: AdsConversion, params: Record<string, unknown> = {}, user?: { email?: string; phone?: string }) {
  const label = company.googleAds.conversions[kind];
  if (!label || !allowed(readConsent(), "googleAds")) return;
  if (user) {
    const phone = user.phone ? internationalDigits(user.phone) : undefined;
    window.gtag?.("set", "user_data", {
      ...(user.email ? { email: user.email.trim().toLowerCase() } : {}),
      ...(phone ? { phone_number: `+${phone}` } : {}),
    });
  }
  window.gtag?.("event", "conversion", { send_to: `${company.googleAds.id}/${label}`, ...params });
}

const leadConversion = { devis: "devis", rappel: "rappel", "rendez-vous": "rendezVous" } as const;

/**
 * Demande envoyée (devis, rappel, rendez-vous) : `generate_lead` dans GA4 et la
 * conversion Google Ads correspondante. La référence évite les doublons côté Ads.
 */
export function trackLead(
  form: keyof typeof leadConversion,
  details: Record<string, unknown>,
  { reference, email, phone }: { reference?: string; email?: string; phone?: string } = {}
) {
  gaEvent("generate_lead", { form_name: form, ...details });
  adsConversion(leadConversion[form], reference ? { transaction_id: reference } : {}, email || phone ? { email, phone } : undefined);
}

/** Clic sur un numéro (tel:), WhatsApp ou e-mail. */
export function trackContactClick(kind: "appel" | "whatsapp" | "email", params: Record<string, unknown>) {
  gaEvent(kind === "appel" ? "click_to_call" : kind === "whatsapp" ? "click_whatsapp" : "click_email", params);
  if (kind !== "email") adsConversion(kind);
}

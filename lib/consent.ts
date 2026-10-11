// Consentement aux cookies : finalités, outils actifs et choix mémorisé.
// Partagé par la bannière (components/site/CookieConsent.tsx) et le suivi
// (lib/tracking.ts). Navigateur uniquement pour la lecture / l'écriture.
//
// Un outil n'est actif que si son identifiant est renseigné (company.ts). Le
// choix mémorise la liste des outils présentés : quand un nouvel outil est
// activé (Clarity, Google Ads…), la bannière est reproposée, et en attendant
// seuls les outils déjà acceptés sont chargés.

import { company } from "@/app/data/company";

export type Purpose = "analytics" | "ads";
export type Vendor = "ga" | "clarity" | "googleAds";

export const vendorInfo: Record<Vendor, { purpose: Purpose; name: string; enabled: boolean }> = {
  ga: { purpose: "analytics", name: "Google Analytics", enabled: Boolean(company.analyticsId) },
  clarity: { purpose: "analytics", name: "Microsoft Clarity", enabled: Boolean(company.clarityId) },
  googleAds: { purpose: "ads", name: "Google Ads", enabled: Boolean(company.googleAds.id) },
};

export const activeVendors = (Object.keys(vendorInfo) as Vendor[]).filter((vendor) => vendorInfo[vendor].enabled);
export const activePurposes: Purpose[] = (["analytics", "ads"] as const).filter((purpose) =>
  activeVendors.some((vendor) => vendorInfo[vendor].purpose === purpose)
);
export const vendorNames = (purpose: Purpose) =>
  activeVendors.filter((vendor) => vendorInfo[vendor].purpose === purpose).map((vendor) => vendorInfo[vendor].name);

export interface Consent {
  analytics: boolean;
  ads: boolean;
  /** Outils présentés au moment du choix. */
  vendors: Vendor[];
  date: number;
  version: 2;
}

const STORAGE_KEY = "radialec_consent";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182; // ~6 mois
export const OPEN_EVENT = "radialec:cookie-settings";

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Omit<Partial<Consent>, "version"> & { version?: number };
    if (!parsed.date || Date.now() - parsed.date > MAX_AGE_MS) return null;
    // Version 1 (Google Analytics seul) : le choix reste valable pour GA.
    if (parsed.version === 1) return { analytics: Boolean(parsed.analytics), ads: false, vendors: ["ga"], date: parsed.date, version: 2 };
    if (parsed.version !== 2 || !Array.isArray(parsed.vendors)) return null;
    return parsed as Consent;
  } catch {
    return null;
  }
}

export function writeConsent(choice: Pick<Consent, "analytics" | "ads">): Consent {
  const next: Consent = { ...choice, vendors: activeVendors, date: Date.now(), version: 2 };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Stockage indisponible (navigation privée stricte) : le choix vaut pour la page.
  }
  return next;
}

/** Faut-il (re)demander ? Aucun choix, ou un outil activé depuis le dernier choix. */
export function needsPrompt(consent: Consent | null): boolean {
  return !consent || activeVendors.some((vendor) => !consent.vendors.includes(vendor));
}

/** L'outil est actif et le visiteur l'a accepté (finalité acceptée, outil présenté). */
export function allowed(consent: Consent | null, vendor: Vendor): boolean {
  const info = vendorInfo[vendor];
  return Boolean(info.enabled && consent?.[info.purpose] && consent.vendors.includes(vendor));
}

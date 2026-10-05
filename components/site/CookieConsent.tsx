"use client";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useId, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { company } from "@/app/data/company";

// Consentement aux cookies (RGPD / ePrivacy) :
//  - Google Analytics n'est chargé QU'APRÈS consentement (rien avant, pas même
//    de requête « sans cookie ») ;
//  - refuser est aussi simple qu'accepter ;
//  - le choix est conservé 6 mois dans le navigateur (localStorage), puis redemandé ;
//  - retirer son accord supprime les cookies _ga existants ;
//  - n'importe quel bouton peut rouvrir le bandeau via openCookieSettings().

const STORAGE_KEY = "radialec_consent";
const CONSENT_VERSION = 1;
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182; // ~6 mois
const OPEN_EVENT = "radialec:cookie-settings";

interface Consent {
  analytics: boolean;
  date: number;
  version: number;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== CONSENT_VERSION || Date.now() - parsed.date > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function deleteAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid")
    .forEach((name) =>
      domains.forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain ? `; domain=${domain}` : ""}`;
      })
    );
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [analyticsDraft, setAnalyticsDraft] = useState(false);
  const titleId = useId();

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setOpen(!stored);

    const reopen = () => {
      const current = readConsent();
      setAnalyticsDraft(current?.analytics ?? false);
      setCustomizing(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const save = useCallback(
    (analytics: boolean) => {
      const next: Consent = { analytics, date: Date.now(), version: CONSENT_VERSION };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Stockage indisponible (navigation privée stricte) : le choix vaut pour la session.
      }
      if (!analytics) {
        window.gtag?.("consent", "update", { analytics_storage: "denied" });
        deleteAnalyticsCookies();
        // Analytics déjà chargé dans cette page : on recharge pour le décharger proprement.
        if (consent?.analytics) window.location.reload();
      }
      setConsent(next);
      setOpen(false);
      setCustomizing(false);
    },
    [consent]
  );

  return (
    <>
      {consent?.analytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${company.analyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${company.analyticsId}', { cookie_expires: 34128000 });
            `}
          </Script>
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          // z-index au-dessus du widget Causerie (9999-10000) : le choix doit rester accessible.
          className="fixed inset-x-3 bottom-3 z-[10001] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[420px]"
        >
          <div className="rounded-3xl border border-ink/10 bg-white p-5 shadow-[0_24px_60px_-12px_rgba(1,13,62,0.35)] sm:p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-lavender text-navy">
                <FaCookieBite className="h-4 w-4" aria-hidden="true" />
              </span>
              <p id={titleId} className="text-lg font-bold tracking-tight text-ink">
                Votre vie privée
              </p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">
              Avec votre accord, nous utilisons Google Analytics pour mesurer l&apos;audience du site et
              l&apos;améliorer. Aucun cookie publicitaire. Vous pouvez changer d&apos;avis à tout moment.{" "}
              <Link href="/cookies" className="font-semibold text-navy underline underline-offset-2 hover:text-flame">
                En savoir plus
              </Link>
            </p>

            {customizing && (
              <ul className="mt-4 space-y-2">
                <li className="flex items-center justify-between gap-4 rounded-2xl bg-lavender/60 px-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-ink">Nécessaires</span>
                    <span className="block text-xs text-ink/60">Mémoriser votre choix. Toujours actifs.</span>
                  </span>
                  <span className="text-xs font-semibold text-ink/50">Toujours</span>
                </li>
                <li>
                  <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-ink/10 px-4 py-3">
                    <span>
                      <span className="block text-sm font-semibold text-ink">Mesure d&apos;audience</span>
                      <span className="block text-xs text-ink/60">Google Analytics, statistiques de visite.</span>
                    </span>
                    <input
                      type="checkbox"
                      role="switch"
                      checked={analyticsDraft}
                      onChange={(e) => setAnalyticsDraft(e.target.checked)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-navy peer-focus-visible:ring-offset-2",
                        analyticsDraft ? "bg-navy" : "bg-ink/20"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                          analyticsDraft ? "translate-x-[22px]" : "translate-x-0.5"
                        )}
                      />
                    </span>
                  </label>
                </li>
              </ul>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => save(false)} className="btn btn-secondary btn-sm w-full">
                Tout refuser
              </button>
              <button type="button" onClick={() => save(true)} className="btn btn-secondary btn-sm w-full">
                Tout accepter
              </button>
            </div>
            {customizing ? (
              <button
                type="button"
                onClick={() => save(analyticsDraft)}
                className="mt-2 w-full rounded-lg py-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
              >
                Enregistrer mes choix
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAnalyticsDraft(consent?.analytics ?? false);
                  setCustomizing(true);
                }}
                className="mt-2 w-full rounded-lg py-2 text-sm font-semibold text-ink/70 underline-offset-4 hover:text-navy hover:underline"
              >
                Personnaliser
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/** Bouton « Gérer mes cookies » (footer, page cookies). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Gérer mes cookies
    </button>
  );
}

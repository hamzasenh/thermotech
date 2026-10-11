"use client";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { cn } from "@/lib/utils";
import {
  activePurposes,
  needsPrompt,
  OPEN_EVENT,
  readConsent,
  vendorNames,
  writeConsent,
  type Consent,
} from "@/lib/consent";
import { applyConsent, revokeTracking } from "@/lib/tracking";

// Consentement aux cookies (RGPD / ePrivacy), par finalité :
//  - mesure d'audience (Google Analytics, Microsoft Clarity si activé) ;
//  - publicité (Google Ads, si activé) : mesure des conversions, sans remarketing.
// Aucun outil n'est chargé avant l'accord (lib/tracking.ts) ; refuser est aussi
// simple qu'accepter ; le choix est conservé 6 mois (lib/consent.ts) ; un outil
// activé plus tard fait reproposer la bannière ; retirer son accord supprime
// les cookies du site. openCookieSettings() rouvre la bannière.

const adsActive = activePurposes.includes("ads");
const analyticsNames = vendorNames("analytics");
const analyticsText = analyticsNames.includes("Microsoft Clarity")
  ? "statistiques Google Analytics et parcours anonymisés Microsoft Clarity"
  : "Google Analytics";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <li>
      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-ink/10 px-4 py-3">
        <span>
          <span className="block text-sm font-semibold text-ink">{label}</span>
          <span className="block text-xs text-ink/60">{description}</span>
        </span>
        <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
        <span
          aria-hidden="true"
          className={cn(
            "relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-navy peer-focus-visible:ring-offset-2",
            checked ? "bg-navy" : "bg-ink/20"
          )}
        >
          <span
            className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-[22px]" : "translate-x-0.5")}
          />
        </span>
      </label>
    </li>
  );
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [draft, setDraft] = useState({ analytics: false, ads: false });
  const titleId = useId();

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setDraft({ analytics: stored?.analytics ?? false, ads: stored?.ads ?? false });
    setOpen(needsPrompt(stored));
    // Choix déjà fait : les outils acceptés se chargent (ceux ajoutés depuis attendent la nouvelle réponse).
    applyConsent(stored);

    const reopen = () => {
      const current = readConsent();
      setDraft({ analytics: current?.analytics ?? false, ads: current?.ads ?? false });
      setCustomizing(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const save = useCallback(
    (choice: { analytics: boolean; ads: boolean }) => {
      const next = writeConsent({ analytics: choice.analytics, ads: adsActive && choice.ads });
      const revoked = (consent?.analytics && !next.analytics) || (consent?.ads && !next.ads);
      setConsent(next);
      setOpen(false);
      setCustomizing(false);
      if (revoked) {
        // Outils déjà chargés dans cette page : signaux « refusé », cookies supprimés, puis rechargement pour les décharger.
        revokeTracking();
        window.location.reload();
        return;
      }
      applyConsent(next);
    },
    [consent]
  );

  return (
    <>
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
              Avec votre accord, nous mesurons l&apos;audience du site pour l&apos;améliorer ({analyticsText})
              {adsActive ? " et l'efficacité de nos annonces Google Ads. Pas de publicité ciblée." : ". Aucun cookie publicitaire."}{" "}
              Vous pouvez changer d&apos;avis à tout moment.{" "}
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
                <Toggle
                  label="Mesure d'audience"
                  description={
                    analyticsNames.includes("Microsoft Clarity")
                      ? "Statistiques de visite (Google Analytics) et parcours anonymisés (Microsoft Clarity)."
                      : "Google Analytics, statistiques de visite."
                  }
                  checked={draft.analytics}
                  onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
                />
                {adsActive && (
                  <Toggle
                    label="Publicité"
                    description="Google Ads : savoir quelles annonces nous amènent des demandes. Pas de publicité ciblée."
                    checked={draft.ads}
                    onChange={(ads) => setDraft((d) => ({ ...d, ads }))}
                  />
                )}
              </ul>
            )}

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button type="button" onClick={() => save({ analytics: false, ads: false })} className="btn btn-secondary btn-sm w-full">
                Tout refuser
              </button>
              <button type="button" onClick={() => save({ analytics: true, ads: true })} className="btn btn-secondary btn-sm w-full">
                Tout accepter
              </button>
            </div>
            {customizing ? (
              <button
                type="button"
                onClick={() => save(draft)}
                className="mt-2 w-full rounded-lg py-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
              >
                Enregistrer mes choix
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDraft({ analytics: consent?.analytics ?? false, ads: consent?.ads ?? false });
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

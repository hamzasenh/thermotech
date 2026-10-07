"use client";
import { useEffect, useRef } from "react";
import { ATTRIBUTION_KEYS, type QuoteAttribution } from "@/lib/quote/schema";

const STORAGE_KEY = "radialec_attribution";
const CAMPAIGN_KEYS = ATTRIBUTION_KEYS.filter((key) => key !== "landing" && key !== "referrer");

/** Page d'arrivée, site référent, UTM et gclid de la page actuelle. */
function fromCurrentPage(): QuoteAttribution {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer;
  const sameOrigin = referrer.startsWith(window.location.origin);
  const collected: QuoteAttribution = {
    landing: window.location.pathname + window.location.search,
    referrer: referrer ? (sameOrigin ? new URL(referrer).pathname : referrer) : undefined,
  };
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (value) collected[key] = value;
  }
  return collected;
}

function readStored(): QuoteAttribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuoteAttribution) : null;
  } catch {
    return null;
  }
}

/**
 * Mémorise l'origine de la visite dès la page d'arrivée (monté dans le layout),
 * pour qu'un gclid ou des UTM arrivés sur une page service soient encore joints
 * au devis ou au rappel envoyé quelques pages plus loin (Q19, campagnes Ads).
 * Stockage de session uniquement, transmis seulement avec une demande envoyée.
 * Une nouvelle arrivée par campagne (UTM ou gclid dans l'URL) remplace la précédente.
 */
export function AttributionCapture() {
  useEffect(() => {
    const current = fromCurrentPage();
    const hasCampaign = CAMPAIGN_KEYS.some((key) => current[key]);
    try {
      if (hasCampaign || !readStored()) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch {}
  }, []);
  return null;
}

/**
 * Contexte d'acquisition joint aux formulaires : celui mémorisé à l'arrivée sur
 * le site (AttributionCapture), sinon celui de la page du formulaire.
 */
export function useAttribution() {
  const attribution = useRef<QuoteAttribution>({});

  useEffect(() => {
    attribution.current = readStored() ?? fromCurrentPage();
  }, []);

  return attribution;
}

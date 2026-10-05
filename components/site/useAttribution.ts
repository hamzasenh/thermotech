"use client";
import { useEffect, useRef } from "react";
import { ATTRIBUTION_KEYS, type QuoteAttribution } from "@/lib/quote/schema";

/**
 * Contexte d'acquisition joint aux formulaires : page d'arrivée, page
 * précédente (ou site référent), paramètres UTM et gclid de l'URL.
 */
export function useAttribution() {
  const attribution = useRef<QuoteAttribution>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    const sameOrigin = referrer.startsWith(window.location.origin);
    const collected: QuoteAttribution = {
      landing: window.location.pathname + window.location.search,
      referrer: referrer ? (sameOrigin ? new URL(referrer).pathname : referrer) : undefined,
    };
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key);
      if (value && key !== "landing" && key !== "referrer") collected[key] = value;
    }
    attribution.current = collected;
  }, []);

  return attribution;
}

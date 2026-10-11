// Outils de mesure, présents seulement après consentement (lib/tracking.ts) :
// toujours les appeler avec `?.`, ou passer par trackLead / trackContactClick.
interface Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
}

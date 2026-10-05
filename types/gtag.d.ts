// gtag (Google Analytics) n'existe que si le visiteur a consenti à la mesure
// d'audience (components/site/CookieConsent.tsx) : toujours l'appeler avec `?.`.
interface Window {
  gtag?: (...args: unknown[]) => void;
}

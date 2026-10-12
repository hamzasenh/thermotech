/**
 * Pastille des brouillons (aperçu uniquement : en production, un brouillon
 * n'a pas de page). Rappelle que le contenu attend la relecture du gestionnaire.
 */
export function DraftBanner() {
  return (
    <p
      role="status"
      className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-night px-4 py-2 text-xs font-semibold text-white shadow-lg lg:bottom-6"
    >
      Brouillon à valider · invisible sur le site en ligne
    </p>
  );
}

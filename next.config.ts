import type { NextConfig } from "next";
import { company } from "./app/data/company";

const nextConfig: NextConfig = {
  // Refonte 2026 : anciennes URL redirigées (301) vers leur équivalent, au cas
  // où elles auraient été indexées ou partagées.
  async redirects() {
    return [
      // Section ventilation supprimée.
      { source: "/ventilation", destination: "/climatisation", permanent: true },
      { source: "/ventilation/:slug*", destination: "/climatisation", permanent: true },
      // Dépannage chaudière : URL alignée sur la requête principale.
      { source: "/chauffage/reparation-chaudiere", destination: "/chauffage/depannage-chaudiere", permanent: true },
      // Professionnels : la catégorie et l'unique page service ne font plus qu'une.
      { source: "/professionnels/syndics-coproprietes", destination: "/professionnels", permanent: true },
      // Lien court des cartes QR, SMS et WhatsApp : ouvre le formulaire d'avis Google.
      // Temporaire (307) : la cible peut changer sans que les navigateurs gardent l'ancienne.
      { source: "/avis", destination: company.google.reviewUrl, permanent: false },
    ];
  },
};

export default nextConfig;

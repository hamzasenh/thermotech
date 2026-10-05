import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;

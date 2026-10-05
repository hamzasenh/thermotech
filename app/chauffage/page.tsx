import { CategoryPage, categoryMetadata } from "../sections/CategoryPage";

// Contenu : app/data/categories.ts (hub) et app/data/services/ (cartes).
export const metadata = categoryMetadata("chauffage");

export default function Page() {
  return <CategoryPage category="chauffage" />;
}

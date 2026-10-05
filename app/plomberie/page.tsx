import { CategoryPage, categoryMetadata } from "../sections/CategoryPage";

// Contenu : app/data/categories.ts (hub) et app/data/services/ (cartes).
export const metadata = categoryMetadata("plomberie");

export default function Page() {
  return <CategoryPage category="plomberie" />;
}

import { guideRoute } from "../../../sections/guide/guideRoute";

// Guides rattachés à une page chauffage (ex. /chauffage/vaillant/codes-erreur).
// Contenu : app/data/guides/. Les brouillons n'ont pas de page en production.
const route = guideRoute("chauffage");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;

import { serviceRoute } from "../../sections/ServicePage";

// Contenu : app/data/services/chauffage.ts — une page statique par service.
const route = serviceRoute("chauffage");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;

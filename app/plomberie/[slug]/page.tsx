import { serviceRoute } from "../../sections/ServicePage";

// Contenu : app/data/services/plomberie.ts — une page statique par service.
const route = serviceRoute("plomberie");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;

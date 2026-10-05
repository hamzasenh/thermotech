import { serviceRoute } from "../../sections/ServicePage";

// Contenu : app/data/services/climatisation.ts — une page statique par service.
const route = serviceRoute("climatisation");

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;

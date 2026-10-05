import { getServicesByCategory } from "../../data/services";
import { serviceOgImage } from "@/lib/og";

export const alt = "Radialec — service à Bruxelles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getServicesByCategory("plomberie").map((service) => ({ slug: service.slug }));
}

export default serviceOgImage("plomberie");

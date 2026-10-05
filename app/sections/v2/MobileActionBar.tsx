"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { company, contactActionHref } from "@/app/data/company";
import { btn } from "./ui";

const categories = ["chauffage", "electricite", "plomberie", "climatisation", "professionnels"];

/** Page d'origine déduite de l'URL (« /chauffage/entretien-chaudiere » → « chauffage/entretien-chaudiere »). */
function contextFrom(pathname: string): string | undefined {
  const [first, second] = pathname.split("/").filter(Boolean);
  if (!first || !categories.includes(first)) return undefined;
  return second ? `${first}/${second}` : first;
}

/** Mobile uniquement : appeler / devis toujours à portée de pouce, sur toutes les pages. */
export function MobileActionBar() {
  const pathname = usePathname();
  // Inutile sur les pages qui sont déjà un formulaire de contact.
  if (pathname === "/devis" || pathname === "/rendez-vous") return null;
  return (
    <div className="v2-mobile-bar fixed inset-x-0 bottom-0 z-30 border-t border-night/[0.08] bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-2">
        <a href={company.phone.href} className={btn("primary", "min-h-[50px] text-sm")}>
          <FaPhoneAlt className="h-3.5 w-3.5" aria-hidden="true" />
          Appeler
        </a>
        <Link href={contactActionHref("devis", contextFrom(pathname))} className={btn("dark", "min-h-[50px] text-sm")}>
          Devis gratuit
        </Link>
      </div>
    </div>
  );
}

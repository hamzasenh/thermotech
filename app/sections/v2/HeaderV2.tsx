"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import Logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";
import { company, contactActionHref } from "@/app/data/company";
import type { NavGroup } from "@/app/data/navigation";
import type { ServiceCategory } from "@/app/data/services/types";
import { btn } from "./ui";

interface NavLink {
  label: string;
  href: string;
  category?: ServiceCategory;
}

// Même arborescence que l'ancien header (Professionnels reste dans le footer).
const navLinks: NavLink[] = [
  { label: "Chauffage", href: "/chauffage", category: "chauffage" },
  { label: "Électricité", href: "/electricite", category: "electricite" },
  { label: "Plomberie", href: "/plomberie", category: "plomberie" },
  { label: "Climatisation", href: "/climatisation", category: "climatisation" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Contact", href: "/contact" },
];

/**
 * En-tête refondu : barre claire flottante (le logo reste sur fond clair,
 * exactement tel quel), téléphone toujours visible, devis en action n°1.
 */
export function HeaderV2({ groups }: { groups: NavGroup[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const itemsFor = (category?: ServiceCategory) => groups.find((g) => g.category === category)?.items ?? [];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const closeAll = () => {
    setIsOpen(false);
    setExpandedMobile(null);
    setOpenDropdown(null);
  };

  useEffect(() => {
    setIsOpen(false);
    setExpandedMobile(null);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      setOpenDropdown(null);
    };
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleEnter = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(label);
  };
  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };
  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenDropdown(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-2 pt-2 sm:px-4 sm:pt-3">
      <div
        className={cn(
          "mx-auto max-w-[1360px] rounded-2xl bg-white/90 ring-1 ring-night/[0.06] backdrop-blur-xl transition-shadow duration-300",
          scrolled || isOpen ? "shadow-[0_14px_40px_-18px_rgba(11,18,34,0.45)]" : "shadow-[0_8px_30px_-20px_rgba(11,18,34,0.35)]"
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 pl-3 pr-1.5 sm:gap-3 sm:pl-5 sm:pr-2.5 lg:h-[72px]">
          <Link href="/" aria-label="Radialec — accueil" className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2" onClick={closeAll}>
            <Image src={Logo} alt="" height={44} width={39} priority className="h-8 w-auto min-[380px]:h-9 md:h-11" />
            <span className="font-sans text-[17px] font-extrabold tracking-tight text-ink min-[360px]:text-[19px] min-[380px]:text-[21px] sm:text-[28px] xl:text-[24px] 2xl:text-[28px]">
              Radialec
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 font-display xl:flex">
            {navLinks.map((link) => {
              const items = itemsFor(link.category);
              const hasMenu = items.length > 0;
              const menuId = `menu-v2-${link.category}`;
              const open = openDropdown === link.label;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={hasMenu ? () => handleEnter(link.label) : undefined}
                  onMouseLeave={hasMenu ? handleLeave : undefined}
                  onFocus={hasMenu ? () => handleEnter(link.label) : undefined}
                  onBlur={hasMenu ? handleBlur : undefined}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    aria-haspopup={hasMenu ? "true" : undefined}
                    aria-expanded={hasMenu ? open : undefined}
                    aria-controls={hasMenu && open ? menuId : undefined}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-medium text-night/75 transition-colors hover:bg-night/[0.04] hover:text-night",
                      isActive(link.href) && "text-night"
                    )}
                  >
                    {isActive(link.href) && <span className="h-1.5 w-1.5 rounded-full bg-flame" aria-hidden="true" />}
                    {link.label}
                    {hasMenu && (
                      <FaChevronDown aria-hidden="true" className={cn("h-2.5 w-2.5 opacity-60 transition-transform", open && "rotate-180")} />
                    )}
                  </Link>

                  {hasMenu && (
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          id={menuId}
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                          className={cn(
                            "absolute left-1/2 top-full mt-3 -translate-x-1/2 rounded-2xl bg-white p-2.5 shadow-[0_24px_60px_-20px_rgba(11,18,34,0.4)] ring-1 ring-night/[0.06]",
                            items.length > 4 ? "w-[500px]" : "w-[300px]"
                          )}
                        >
                          <ul className={cn("grid gap-0.5", items.length > 4 && "grid-cols-2")}>
                            {items.map((item) => (
                              <li key={item.href}>
                                <Link
                                  href={item.href}
                                  onClick={closeAll}
                                  aria-current={pathname === item.href ? "page" : undefined}
                                  className={cn(
                                    "block rounded-xl px-3 py-2.5 text-sm font-medium text-night/80 transition-colors hover:bg-chalk hover:text-night focus-visible:bg-chalk focus-visible:outline-none",
                                    pathname === item.href && "bg-chalk text-night"
                                  )}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link
                            href={link.href}
                            onClick={closeAll}
                            className="mt-1.5 flex items-center justify-between rounded-xl bg-night px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black"
                          >
                            Tous nos services {link.label.toLowerCase()}
                            <BsArrowRight className="h-4 w-4" aria-hidden="true" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href={contactActionHref("devis")} className={btn("dark", "hidden min-h-[44px] px-5 text-sm lg:inline-flex")}>
              Devis gratuit
            </Link>
            {/* Le numéro : l'élément de conversion n°1, en rouge partout. */}
            <a
              href={company.phone.href}
              className={btn("primary", "min-h-[44px] gap-1.5 whitespace-nowrap px-3 text-[13px] tabular-nums max-[359px]:gap-1 max-[359px]:px-2 max-[359px]:text-xs sm:gap-2 sm:px-4 sm:text-sm")}
              aria-label={`Appeler le ${company.phone.display}`}
            >
              <FaPhoneAlt className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">{company.phone.display}</span>
              <span className="sm:hidden">{company.phone.local}</span>
            </a>
            <button
              type="button"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="menu-mobile-v2"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-11 min-w-11 flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-night transition-colors hover:bg-night/[0.05] sm:flex-row sm:gap-2 sm:px-3 xl:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="h-5 w-5 sm:h-[22px] sm:w-[22px]">
                <line x1="4" y1="7" x2="20" y2="7" className={cn("origin-center transition", isOpen && "translate-y-[5px] rotate-45")} />
                <line x1="4" y1="17" x2="20" y2="17" className={cn("origin-center transition", isOpen && "-translate-y-[5px] -rotate-45")} />
              </svg>
              <span aria-hidden="true" className="font-display text-[10px] font-bold uppercase leading-none tracking-[0.12em] sm:text-[13px]">
                {isOpen ? "Fermer" : "Menu"}
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="menu-mobile-v2"
              aria-label="Navigation mobile"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden xl:hidden"
            >
              <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-night/[0.06] px-4 pb-5 pt-2 font-display">
                <ul className="divide-y divide-night/[0.06]">
                  {navLinks.map((link) => {
                    const items = itemsFor(link.category);
                    const expanded = expandedMobile === link.label;
                    return (
                      <li key={link.label}>
                        <div className="flex items-center justify-between">
                          <Link
                            href={link.href}
                            onClick={closeAll}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            className="flex-1 py-3.5 text-lg font-semibold text-night"
                          >
                            {link.label}
                          </Link>
                          {items.length > 0 && (
                            <button
                              type="button"
                              aria-label={`${expanded ? "Masquer" : "Afficher"} les services ${link.label}`}
                              aria-expanded={expanded}
                              onClick={() => setExpandedMobile(expanded ? null : link.label)}
                              className="flex h-11 w-11 items-center justify-center rounded-xl text-night hover:bg-night/[0.05]"
                            >
                              <FaChevronDown aria-hidden="true" className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
                            </button>
                          )}
                        </div>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                              {items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    onClick={closeAll}
                                    className="block rounded-lg py-2.5 pl-3 text-base text-night/75 hover:bg-chalk hover:text-night"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                              <li className="pb-3">
                                <Link href={link.href} onClick={closeAll} className="block py-2.5 pl-3 text-sm font-semibold text-flame">
                                  Tous nos services {link.label.toLowerCase()} →
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <a href={company.phone.href} className={btn("primary", "w-full tabular-nums")}>
                    <FaPhoneAlt className="h-3.5 w-3.5" aria-hidden="true" />
                    {company.phone.display}
                  </a>
                  <Link href={contactActionHref("devis")} onClick={closeAll} className={btn("dark", "w-full")}>
                    Demander un devis gratuit
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

"use client";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { FaPhoneAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const navLinks = [
  { label: "Accueil", href: "hero" },
  { label: "Chauffage", href: "chauffage" },
  { label: "Électricité", href: "elec" },
  { label: "Témoignages", href: "testimonials" },
  { label: "FAQs", href: "faqs" },
  { label: "Contact", href: "contact" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const section = document.getElementById(id); 
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 300); 
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-10">
      <div className="container py-5">
        <div>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="logo" height={50} width={50} />
              <div className="hidden md:flex flex-col">
                <div className="text-gray font-extrabold text-[32px] mt-2">
                  Radialec
                </div>
              </div>
            </div>

            {/* Navigation et numéro de téléphone */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Numéro de téléphone */}
              <a
                className="flex items-center gap-2 btn btn-primary lg:hidden"
                href="tel:+32489745620"
              >
                <FaPhoneAlt />
                048957893
              </a>

              {/* Menu hamburger visible sur mobile et tablette */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu lg:hidden cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  className={twMerge(
                    "origin-left transition",
                    isOpen && "rotate-45 -translate-y-1"
                  )}
                ></line>
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  className={twMerge("transition", isOpen && "opacity-0")}
                ></line>
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  className={twMerge(
                    "origin-left transition",
                    isOpen && "-rotate-45 translate-y-1"
                  )}
                ></line>
              </svg>

              {/* Navigation complète visible sur lg+ */}
              <nav className="hidden lg:flex gap-6 font-medium">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={`#${link.href}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              {/* Numéro de téléphone visible à droite sur lg+ */}
              <a 
                className="hidden lg:flex items-center gap-2 btn btn-primary"
                href="tel:+32486442186"
              >
                <FaPhoneAlt />
                +32 486 44 21 86
              </a>
            </div>
          </div>

          {/* Menu mobile/tablette */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="flex flex-col items-center gap-4 py-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={`#${link.href}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(link.href);
                      }}
                      className="py-2 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

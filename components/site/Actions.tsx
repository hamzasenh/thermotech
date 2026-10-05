import Link from "next/link";
import type { ReactNode } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import {
  company,
  contactActionHref,
  contactActions,
  type ContactActionKey,
} from "@/app/data/company";

export type ButtonVariant = "primary" | "secondary" | "dark" | "glass" | "light";

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  dark: "btn btn-dark",
  glass: "btn btn-glass",
  light: "btn bg-white text-flame shadow-lg hover:bg-lavender",
};

interface ActionLinkProps {
  action: ContactActionKey;
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
  arrow?: boolean;
  /** Service ou catégorie d'origine, pour pré-remplir la demande de devis. */
  context?: string;
}

/**
 * CTA de conversion (devis / rendez-vous / question). Mène vers l'ancre
 * correspondante de /contact, ou directement vers le lien configuré dans
 * `contactActions` (ex. Calendly) dès qu'il est renseigné.
 */
export function ActionLink({
  action,
  variant = "primary",
  className,
  children,
  arrow,
  context,
}: ActionLinkProps) {
  const href = contactActionHref(action, context);
  const content = (
    <>
      {children ?? contactActions[action].label}
      {arrow && <BsArrowRight className="h-5 w-5 flex-shrink-0" aria-hidden="true" />}
    </>
  );
  const classes = cn(variantClass[variant], className);

  return /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

interface PhoneLinkProps {
  variant?: ButtonVariant;
  className?: string;
  children?: ReactNode;
}

export function PhoneLink({ variant = "primary", className, children }: PhoneLinkProps) {
  return (
    <a
      href={company.phone.href}
      className={cn(variantClass[variant], "whitespace-nowrap tabular-nums", className)}
    >
      <FaPhoneAlt className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      {children ?? company.phone.display}
    </a>
  );
}

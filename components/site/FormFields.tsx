"use client";
import type { ComponentProps, ReactNode } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

// Champs de formulaire du design « les trois énergies » (devis, rappel) :
// typographie Archivo, encre night, aucun pictogramme décoratif.

export function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-flame">
      <FaExclamationCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}

export function FieldLabel({
  htmlFor,
  children,
  optional,
  as = "label",
  id,
}: {
  htmlFor?: string;
  children: ReactNode;
  optional?: boolean;
  as?: "label" | "legend";
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} htmlFor={as === "label" ? htmlFor : undefined} className="mb-3 block text-[15px] font-semibold text-night">
      {children}
      {optional && <span className="ml-1.5 font-normal text-night/45">(facultatif)</span>}
    </Tag>
  );
}

export const inputClass =
  "block w-full rounded-2xl border border-night/[0.12] bg-white px-4 text-base text-night placeholder:text-night/35 transition-[border-color,box-shadow] duration-200 hover:border-night/25 focus:border-night focus:outline-none focus:ring-4 focus:ring-night/[0.06] aria-[invalid=true]:border-flame aria-[invalid=true]:ring-flame/10";

interface TextFieldProps extends Omit<ComponentProps<"input">, "name"> {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  hint?: string;
}

export function TextField({ name, label, error, optional, hint, className, ...props }: TextFieldProps) {
  const id = `field-${name}`;
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <FieldLabel htmlFor={id} optional={optional}>
        {label}
      </FieldLabel>
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(inputClass, "h-14")}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-night/55">
          {hint}
        </p>
      )}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

interface OptionCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  /** Précision sous le libellé (ex. exemples de prestations). */
  hint?: string;
  /** Numéro affiché en tête de carte (« 01 »). */
  index?: number;
  describedBy?: string;
  className?: string;
}

/**
 * Bouton radio en carte typographique : numéro, libellé, précision et pastille
 * de sélection. Sélectionnée, la carte passe en night (pas de pictogramme).
 */
export function OptionCard({ name, value, checked, onChange, label, hint, index, describedBy, className }: OptionCardProps) {
  return (
    <label className={cn("group relative block cursor-pointer", className)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        aria-describedby={describedBy}
        className="peer sr-only"
      />
      <span
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl p-4 transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-water-light/40 sm:p-5",
          checked
            ? "bg-night text-white shadow-[0_18px_40px_-22px_rgba(11,18,34,0.7)]"
            : "bg-white text-night ring-1 ring-night/[0.1] group-hover:-translate-y-0.5 group-hover:ring-night/30 group-hover:shadow-[0_14px_30px_-22px_rgba(11,18,34,0.45)]"
        )}
      >
        {checked && <span aria-hidden="true" className="v2-energy absolute inset-x-0 top-0 h-[3px]" />}
        <span className="flex items-start justify-between gap-3">
          {index !== undefined ? (
            <span className={cn("v2-wide font-display text-xs font-bold", checked ? "text-bolt" : "text-ember")}>
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : (
            <span />
          )}
          <span
            aria-hidden="true"
            className={cn(
              "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
              checked ? "border-white" : "border-night/20 group-hover:border-night/40"
            )}
          >
            <span className={cn("h-2 w-2 rounded-full transition-transform", checked ? "scale-100 bg-white" : "scale-0")} />
          </span>
        </span>
        <span className={cn("v2-semi font-display text-[17px] font-bold leading-snug", index !== undefined ? "mt-4" : "mt-2")}>
          {label}
        </span>
        {hint && <span className={cn("mt-1 text-sm leading-snug", checked ? "text-white/65" : "text-night/55")}>{hint}</span>}
      </span>
    </label>
  );
}

interface PillProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  children: ReactNode;
  describedBy?: string;
}

/** Bouton radio compact (prestation, délai, créneau). */
export function Pill({ name, value, checked, onChange, children, describedBy }: PillProps) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        aria-describedby={describedBy}
        className="peer sr-only"
      />
      <span
        className={cn(
          "inline-flex min-h-[46px] items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-water-light/40",
          checked ? "bg-night text-white" : "bg-white text-night ring-1 ring-night/[0.12] hover:ring-night/35"
        )}
      >
        {children}
      </span>
    </label>
  );
}

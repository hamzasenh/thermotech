"use client";
import Image, { type StaticImageData } from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { FaCheck, FaExclamationCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Icon, type IconKey } from "@/components/site/Icon";

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
    <Tag id={id} htmlFor={as === "label" ? htmlFor : undefined} className="mb-2.5 block text-sm font-semibold text-ink">
      {children}
      {optional && <span className="ml-1.5 font-normal text-ink/50">(facultatif)</span>}
    </Tag>
  );
}

export const inputClass =
  "block w-full rounded-xl border border-ink/15 bg-white px-4 text-base text-ink placeholder:text-ink/35 transition-shadow focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10 aria-[invalid=true]:border-flame aria-[invalid=true]:ring-flame/10";

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
        className={cn(inputClass, "h-12")}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-sm text-ink/55">
          {hint}
        </p>
      )}
      <ErrorText id={`${id}-error`}>{error}</ErrorText>
    </div>
  );
}

interface ChoiceCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  description?: string;
  icon?: IconKey;
  image?: StaticImageData;
  describedBy?: string;
  /** Pictogramme au-dessus du libellé (automatique avec une image). */
  stacked?: boolean;
  className?: string;
}

/** Bouton radio sous forme de carte (sélection du domaine, de la nature, du bien). */
export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  label,
  description,
  icon,
  image,
  describedBy,
  stacked,
  className,
}: ChoiceCardProps) {
  const vertical = stacked || Boolean(image);
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
          "flex h-full items-center gap-3 rounded-2xl border bg-white p-3.5 transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-navy/20",
          vertical && "flex-col justify-center gap-2 px-2 py-4 text-center",
          checked
            ? "border-navy shadow-[0_0_0_1px_#001E80] bg-navy/[0.03]"
            : "border-ink/10 hover:border-navy/40 hover:shadow-sm"
        )}
      >
        {image ? (
          <Image src={image} alt="" sizes="64px" className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-14" />
        ) : icon ? (
          <span
            className={cn(
              "inline-flex flex-shrink-0 items-center justify-center rounded-xl transition-colors",
              vertical ? "h-12 w-12 sm:h-14 sm:w-14" : "h-10 w-10",
              checked ? "bg-navy text-white" : "bg-lavender text-navy"
            )}
          >
            <Icon name={icon} className={vertical ? "h-5 w-5 sm:h-6 sm:w-6" : "h-4 w-4"} />
          </span>
        ) : null}
        <span className="min-w-0">
          <span className="block text-sm font-semibold leading-snug text-ink sm:text-[15px]">{label}</span>
          {description && <span className="mt-0.5 block text-xs text-ink/55">{description}</span>}
        </span>
      </span>
      {checked && (
        <span className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-flame text-white shadow-md">
          <FaCheck className="h-2.5 w-2.5" aria-hidden="true" />
        </span>
      )}
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

/** Bouton radio compact (délai, créneau, prestation). */
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
          "inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-navy/20",
          checked ? "border-navy bg-navy text-white shadow-md" : "border-ink/15 bg-white text-ink hover:border-navy/40"
        )}
      >
        {children}
      </span>
    </label>
  );
}

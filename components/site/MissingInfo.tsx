import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Information que Radialec doit encore fournir : volontairement visible. */
export function MissingInfo({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-lg border border-dashed border-flame/40 bg-flame/[0.04] px-2 py-0.5 text-[0.85em] text-flame",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Affiche la valeur si elle existe, sinon un placeholder « À fournir : … ». */
export function OrMissing({ value, what }: { value: string | null | undefined; what: string }) {
  return value ? <>{value}</> : <MissingInfo>À fournir : {what}</MissingInfo>;
}

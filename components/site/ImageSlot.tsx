import Image from "next/image";
import { FaCamera } from "react-icons/fa";
import { cn } from "@/lib/utils";
import type { ImageSpec } from "@/app/data/services/types";

interface ImagePlaceholderProps {
  description: string;
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}

/**
 * Emplacement réservé à un visuel qui n'existe pas encore. Volontairement
 * visible : le texte décrit précisément l'image à produire.
 */
export function ImagePlaceholder({
  description,
  tone = "light",
  className,
  label = "Image à fournir",
}: ImagePlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-6 text-center",
        tone === "light"
          ? "border-navy/25 bg-[repeating-linear-gradient(135deg,#F4F6FE_0_12px,#EDF0FD_12px_24px)] text-ink"
          : "border-white/30 bg-white/5 text-white",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full",
          tone === "light" ? "bg-white text-navy shadow-sm" : "bg-white/10 text-white"
        )}
      >
        <FaCamera className="h-4 w-4" />
      </span>
      <p className="text-xs font-bold uppercase tracking-wide text-flame">{label}</p>
      <p className={cn("max-w-sm text-sm", tone === "light" ? "text-ink/70" : "text-white/75")}>
        {description}
      </p>
    </div>
  );
}

interface ImageSlotProps {
  image: ImageSpec;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Classe du placeholder quand l'image manque (hauteur/ratio). */
  placeholderClassName?: string;
}

/** Affiche l'image si elle existe, sinon un placeholder décrivant l'image attendue. */
export function ImageSlot({
  image,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  placeholderClassName,
}: ImageSlotProps) {
  if (!image.src) {
    return (
      <ImagePlaceholder
        description={image.placeholder ?? image.alt}
        className={cn("aspect-[4/3] w-full", placeholderClassName)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      className={cn("h-auto w-full rounded-3xl object-cover shadow-xl", className)}
    />
  );
}

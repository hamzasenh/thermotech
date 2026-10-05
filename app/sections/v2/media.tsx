import Image from "next/image";
import { cn } from "@/lib/utils";
import { neededAssets, type AssetId } from "@/app/data/assets-needed";
import { photos, type Photo } from "@/app/data/photos";
import type { ImageSpec } from "@/app/data/services/types";

/** Photo à afficher : `src` explicite, sinon la photo livrée pour son identifiant (app/data/photos.ts). */
export function resolvePhoto(image?: ImageSpec, asset?: AssetId): Photo | undefined {
  if (image?.src) return { src: image.src };
  const id = image?.asset ?? asset;
  return id ? photos[id] : undefined;
}

interface MediaSlotProps {
  image?: ImageSpec;
  /** Asset attendu quand il n'y a pas d'image (sinon `image.asset`). */
  asset?: AssetId;
  /** Vidéo facultative qui peut remplacer la photo (mentionnée dans l'emplacement). */
  video?: AssetId;
  sizes: string;
  priority?: boolean;
  /** Classes du conteneur : ratio (aspect-*) ou hauteur, arrondi. */
  className?: string;
  imageClassName?: string;
  /** Version compacte de l'emplacement (cartes). */
  compact?: boolean;
}

/**
 * Photo du design refondu : l'image (avec le traitement commun .v2-grade) si
 * elle existe — `src` ou photo livrée pour son identifiant —, sinon un
 * emplacement réservé qui dit exactement quoi fournir (identifiant de
 * 02-assets.md, nom de fichier, sujet, format).
 */
export function MediaSlot({ image, asset, video, sizes, priority, className, imageClassName, compact }: MediaSlotProps) {
  const photo = resolvePhoto(image, asset);
  if (photo) {
    return (
      <div className={cn("v2-grade relative overflow-hidden", className)}>
        <Image
          src={photo.src}
          alt={image?.alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={cn("object-cover", imageClassName)}
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      </div>
    );
  }

  const id = image?.asset ?? asset;
  const info = id ? neededAssets[id] : undefined;
  const videoInfo = video ? neededAssets[video] : undefined;

  return (
    <div
      role="img"
      aria-label={image?.alt ?? "Image à venir"}
      className={cn(
        "relative flex flex-col justify-start overflow-hidden border-2 border-dashed border-night/15 bg-[repeating-linear-gradient(135deg,rgba(11,18,34,0.025)_0_14px,transparent_14px_28px)] bg-white/60 text-night",
        compact ? "gap-2 p-4" : "gap-4 p-5 sm:p-6",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-night px-2 py-1 font-mono text-[11px] font-bold tracking-wider text-white">{id ?? "Photo"}</span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-flame">Photo à fournir</span>
      </div>
      <div>
        <p className={cn("text-night/75", compact ? "line-clamp-3 text-xs" : "text-sm leading-relaxed")}>
          {info?.subject ?? image?.placeholder ?? image?.alt}
        </p>
        {!compact && (info || videoInfo) && (
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-night/50">
            {info && (
              <>
                {info.file} · {info.format}
              </>
            )}
            {videoInfo && (
              <>
                {info && <br />}
                Ou vidéo {video} (facultatif) : {videoInfo.file}
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

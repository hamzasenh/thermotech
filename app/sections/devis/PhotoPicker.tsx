"use client";
import { useEffect, useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { PHOTO_LIMITS } from "@/lib/quote/schema";
import { ErrorText, FieldLabel } from "@/components/site/FormFields";

const MAX_SIDE = 1600;

/** Redimensionne et recompresse en JPEG côté navigateur (envoi léger, pièces jointes raisonnables). */
async function compress(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.82));
    if (!blob) throw new Error("compression");
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.jpg`, { type: "image/jpeg" });
  } catch {
    // Format que le navigateur ne sait pas décoder (ex. HEIC hors Safari) : envoyé tel quel s'il est léger.
    if (file.size <= PHOTO_LIMITS.maxBytes) return file;
    throw new Error("Format non pris en charge ou photo trop lourde.");
  }
}

interface Photo {
  file: File;
  url: string;
}

export function PhotoPicker({ onChange }: { onChange: (files: File[]) => void }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const update = (next: Photo[]) => {
    setPhotos(next);
    onChange(next.map((p) => p.file));
  };

  const add = async (list: FileList | null) => {
    if (!list?.length) return;
    setError(undefined);
    const room = PHOTO_LIMITS.maxCount - photos.length;
    const selected = Array.from(list).slice(0, room);
    if (list.length > room) setError(`${PHOTO_LIMITS.maxCount} photos maximum.`);
    setBusy(true);
    const added: Photo[] = [];
    for (const file of selected) {
      try {
        const compressed = await compress(file);
        added.push({ file: compressed, url: URL.createObjectURL(compressed) });
      } catch (e) {
        setError(`« ${file.name} » : ${(e as Error).message}`);
      }
    }
    setBusy(false);
    update([...photos, ...added]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (index: number) => {
    URL.revokeObjectURL(photos[index].url);
    update(photos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <FieldLabel htmlFor="field-photos" optional>
        Photos
      </FieldLabel>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((photo, index) => (
          <div key={photo.url} className="relative aspect-square overflow-hidden rounded-2xl border border-ink/10 bg-lavender">
            {/* eslint-disable-next-line @next/next/no-img-element -- aperçu local (URL blob) */}
            <img src={photo.url} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(index)}
              aria-label={`Retirer la photo ${index + 1}`}
              className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/80 text-white hover:bg-flame"
            >
              <FaTimes className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        ))}
        {photos.length < PHOTO_LIMITS.maxCount && (
          <label
            htmlFor="field-photos"
            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-navy/25 bg-[repeating-linear-gradient(135deg,#F7F8FE_0_10px,#EFF2FD_10px_20px)] p-2 text-center text-navy transition-colors hover:border-navy/60 focus-within:ring-4 focus-within:ring-navy/20"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <FaCamera className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold">{busy ? "Préparation…" : "Ajouter"}</span>
          </label>
        )}
      </div>
      <input
        ref={inputRef}
        id="field-photos"
        type="file"
        accept={PHOTO_LIMITS.accept}
        multiple
        onChange={(e) => add(e.target.files)}
        aria-describedby="field-photos-hint"
        className="sr-only"
      />
      <p id="field-photos-hint" className="mt-2 text-sm text-ink/55">
        Jusqu&apos;à {PHOTO_LIMITS.maxCount} photos : l&apos;appareil, sa plaque signalétique, la fuite ou le tableau.
        Elles nous aident à chiffrer au plus juste.
      </p>
      <ErrorText id="field-photos-error">{error}</ErrorText>
    </div>
  );
}

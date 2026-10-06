import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { company } from "@/app/data/company";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("flex text-amber", className)} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar key={i} />
      ))}
    </span>
  );
}

/** Note Google cliquable (fiche Google Business). */
export function GoogleRating({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const { rating, url } = company.google;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex w-fit items-center gap-2 rounded-full transition-colors duration-300",
        className
      )}
    >
      <Stars />
      <span
        className={cn(
          "text-sm font-medium underline-offset-4 group-hover:underline",
          tone === "light" ? "text-ink" : "text-white/90"
        )}
      >
        {rating}/5 sur Google
      </span>
      <BsArrowRight
        aria-hidden="true"
        className={cn(
          "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1",
          tone === "light" ? "text-ink" : "text-white/80"
        )}
      />
    </a>
  );
}

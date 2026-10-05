import { cn } from "@/lib/utils";
import { RichText } from "./RichText";
import { fr } from "@/lib/typography";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  /** lg : titre de section standard (54px) · md : sections secondaires / layouts en colonnes (44px) */
  size?: "lg" | "md";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  size = "lg",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        id={id}
        className={cn(
          "section-title",
          align === "left" && "text-left",
          size === "md" && "md:text-[44px] md:leading-[1.1]",
          eyebrow && "mt-3"
        )}
      >
        {fr(title)}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-ink/75 md:text-lg">
          <RichText text={intro} />
        </p>
      )}
    </div>
  );
}

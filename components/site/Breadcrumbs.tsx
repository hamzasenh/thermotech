import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

/** Fil d'Ariane visible + données structurées BreadcrumbList. */
export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Fil d'Ariane" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-ink/60">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className="transition-colors hover:text-navy hover:underline">
                      {item.label}
                    </Link>
                    <FaChevronRight className="h-2.5 w-2.5 text-ink/30" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

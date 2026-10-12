"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
  code?: string;
}

/**
 * Sommaire collant du guide (ordinateur) : la section en cours de lecture est
 * soulignée du filet rouge. Les liens restent de simples ancres (sans JS).
 */
export function GuideToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Une section devient « en cours » quand elle passe dans le premier tiers de l'écran.
      { rootMargin: "-20% 0px -65% 0px" }
    );
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sur cette page">
      <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-night/50">Sur cette page</p>
      <ol className="mt-4 border-l border-night/10">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "-ml-px flex items-baseline gap-3 border-l-2 py-1.5 pl-4 text-[15px] leading-snug transition-colors duration-200",
                  current ? "border-flame font-semibold text-night" : "border-transparent text-night/55 hover:text-night"
                )}
              >
                {item.code && <span className="v2-wide w-10 flex-shrink-0 font-display text-[13px] font-bold">{item.code}</span>}
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

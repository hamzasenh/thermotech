import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fr } from "@/lib/typography";

// Format enrichi minimal utilisé dans les données de contenu :
//   **texte**          → gras
//   [libellé](/url)    → lien interne (next/link) ou externe (nouvel onglet)
const TOKEN = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

interface RichTextProps {
  text: string;
  linkClassName?: string;
  strongClassName?: string;
}

export function RichText({ text, linkClassName, strongClassName }: RichTextProps) {
  const nodes: ReactNode[] = [];
  const source = fr(text);
  const pattern = new RegExp(TOKEN.source, "g");
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(source))) {
    if (match.index > last) nodes.push(source.slice(last, match.index));

    if (match[1] !== undefined) {
      nodes.push(
        <strong key={key++} className={cn("font-semibold text-ink", strongClassName)}>
          {match[1]}
        </strong>
      );
    } else {
      const [label, href] = [match[2], match[3]];
      const className = cn(
        "font-semibold text-navy underline underline-offset-2 transition-colors hover:text-flame",
        linkClassName
      );
      nodes.push(
        /^https?:\/\//.test(href) ? (
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {label}
          </a>
        ) : (
          <Link key={key++} href={href} className={className}>
            {label}
          </Link>
        )
      );
    }
    last = pattern.lastIndex;
  }

  if (last < source.length) nodes.push(source.slice(last));
  return <>{nodes}</>;
}

/** Version texte brut (données structurées, meta). */
export function toPlainText(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1");
}

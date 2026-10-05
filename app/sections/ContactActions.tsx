import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { cn } from "@/lib/utils";
import type { IconKey } from "@/components/site/Icon";
import { Reveal } from "@/components/site/Motion";
import { contactActions, type ContactActionKey } from "../data/company";
import { cardBg, toneBg, type Tone } from "./v2/tones";

interface ActionCard {
  key: ContactActionKey;
  icon: IconKey;
  title: string;
  text: string;
  points: string[];
  button: string;
}

const cards: ActionCard[] = [
  {
    key: "devis",
    icon: "clipboard",
    title: "Demander un devis gratuit",
    text: "Installation, remplacement de chaudière, mise en conformité, rénovation : décrivez votre projet, nous vous répondons avec un devis détaillé.",
    points: ["Gratuit et sans engagement", "Devis détaillé sous 24h", "Le prix annoncé est le prix payé"],
    button: "btn btn-dark",
  },
  {
    key: "rendezVous",
    icon: "calendarCheck",
    title: "Prendre rendez-vous",
    text: "Entretien de chaudière : choisissez votre créneau en ligne. Pour une autre prestation, nous vous rappelons pour fixer le rendez-vous.",
    points: ["Réservation en ligne, en quelques clics", "Vous choisissez le jour et l'heure", "Tarif affiché à l'avance"],
    button: "btn btn-secondary",
  },
  {
    key: "rappel",
    icon: "phone",
    title: "Être rappelé",
    text: "Pas le temps d'appeler maintenant ? Laissez votre numéro et le moment où vous êtes joignable : nous vous rappelons.",
    points: ["Sans engagement", "Au moment qui vous arrange", "Pour une question comme pour une intervention"],
    button: "btn btn-secondary",
  },
];

/**
 * Les trois actions de la page contact. Si `contactActions[key].href` est
 * vide, le bouton est rendu inerte : il n'envoie nulle part. Renseigner le
 * lien dans app/data/company.ts suffit à l'activer.
 */
export function ContactActions({ tone = "white" }: { tone?: Tone }) {
  return (
    <section className={cn("py-14 lg:py-20", toneBg[tone])} aria-label="Comment pouvons-nous vous aider ?">
      <div className="container">
        <ul className="grid gap-4 lg:grid-cols-3">
          {cards.map((card, index) => {
            const action = contactActions[card.key];
            return (
              <li key={card.key} id={action.anchor} className="scroll-mt-28">
                <Reveal delay={index * 0.08} className="h-full">
                  <div className={cn("relative flex h-full flex-col overflow-hidden rounded-[28px] p-7 md:p-8", cardBg[tone])}>
                    {index === 0 && <span aria-hidden="true" className="v2-energy absolute inset-x-0 top-0 h-[3px]" />}
                    <span className="v2-wide font-display text-sm font-bold text-flame">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="v2-semi mt-3 font-display text-2xl font-bold text-night">{card.title}</h2>
                    <p className="mt-3 leading-relaxed text-night/70">{card.text}</p>
                    <ul className="mt-5 space-y-2">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-night/80">
                          <FaCheck className="mt-1 h-3 w-3 flex-shrink-0 text-flame" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-8">
                      {action.href?.startsWith("/") ? (
                        <Link href={action.href} className={cn(card.button, "w-full")}>
                          {action.label}
                        </Link>
                      ) : action.href ? (
                        <a
                          href={action.href}
                          target={/^https?:\/\//.test(action.href) ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className={cn(card.button, "w-full")}
                        >
                          {action.label}
                        </a>
                      ) : (
                        // Volontairement inerte pour l'instant : aucun envoi, aucune navigation.
                        <button type="button" data-action={card.key} className={cn(card.button, "w-full")}>
                          {action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

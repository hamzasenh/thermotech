import { fr } from "@/lib/typography";
import { contactActionHref } from "../../data/company";
import { cn } from "@/lib/utils";
import { toneBg, type Tone } from "../v2/tones";
import { ButtonLink, PhoneButton, SectionTitle } from "../v2/ui";

const steps = [
  {
    title: "Vous nous décrivez le projet",
    description:
      "Par téléphone ou via notre demande de devis : type d'installation, logement, contraintes. Si besoin, nous passons voir sur place.",
  },
  {
    title: "Devis détaillé sous 24h",
    description:
      "Un document clair et détaillé — matériel, main-d'œuvre, TVA — pour savoir exactement ce que vous payez.",
  },
  {
    title: "Vous décidez, sans pression",
    description:
      "Le devis est gratuit et sans engagement. S'il vous convient, nous planifions l'intervention ; sinon, vous ne nous devez rien.",
  },
];

/** Pour tout ce qui est « sur devis » : comment le prix est établi. */
export function QuoteProcess({ tone = "white" }: { tone?: Tone }) {
  return (
    <section className={cn("py-16 lg:py-28", toneBg[tone])} aria-labelledby="sur-devis">
      <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionTitle
            id="sur-devis"
            eyebrow="Installation & rénovation"
            title="Sur devis, mais jamais au hasard"
            intro="Une chaudière, une borne ou un tableau électrique ne se chiffrent pas sans connaître votre logement. Plutôt qu'un prix d'appel trompeur, nous vous remettons un devis précis — et gratuit."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PhoneButton variant="primary" />
            <ButtonLink href={contactActionHref("devis")} variant="dark" arrow>
              Demander un devis gratuit
            </ButtonLink>
          </div>
        </div>
        <ol className="space-y-0">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-5 border-t border-night/10 py-7">
              <span className="v2-wide w-10 flex-shrink-0 font-display text-sm font-bold text-flame">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="v2-semi font-display text-xl font-bold text-night">{fr(step.title)}</h3>
                <p className="mt-2 leading-relaxed text-night/70">{fr(step.description)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

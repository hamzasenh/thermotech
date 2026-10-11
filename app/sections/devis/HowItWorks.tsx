import { Reveal } from "@/components/site/Motion";
import { fr } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { toneBg, type Tone } from "../v2/tones";
import { SectionTitle } from "../v2/ui";

const steps = [
  { tag: "2 min", title: "Vous décrivez votre besoin", text: "Le formulaire ci-dessus, avec des photos si vous en avez. Aucun compte à créer." },
  { tag: "Sous 24h", title: "Un technicien vous recontacte", text: "Il relit votre demande et vous contacte pour préciser ce qui doit l'être." },
  { tag: "Gratuit", title: "Vous recevez un devis détaillé", text: "Matériel, main-d'œuvre, TVA : vous savez exactement ce que vous payez." },
  { tag: "Sans engagement", title: "Vous décidez", text: "S'il vous convient, nous planifions l'intervention. Sinon, vous ne nous devez rien." },
];

/** « Comment se passe votre devis ? » : 4 étapes numérotées, même gabarit que les listes du site. */
export function HowItWorks({ tone = "white" }: { tone?: Tone }) {
  return (
    <section className={cn("py-16 lg:py-28", toneBg[tone])} aria-labelledby="deroule-devis">
      <div className="container">
        <SectionTitle
          id="deroule-devis"
          eyebrow="Simple et transparent"
          title="Comment se passe votre devis ?"
          intro="De votre demande à l'intervention, un seul interlocuteur et aucune surprise."
        />
        <ol className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.08} className="h-full border-t-2 border-night/10 pt-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="v2-wide font-display text-sm font-bold text-ember">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-night/45">{step.tag}</span>
                </div>
                <h3 className="v2-semi mt-3 font-display text-xl font-bold leading-snug text-night">{fr(step.title)}</h3>
                <p className="mt-2 leading-relaxed text-night/70">{fr(step.text)}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

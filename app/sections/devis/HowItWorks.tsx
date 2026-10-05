import { Reveal } from "@/components/site/Motion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { cn } from "@/lib/utils";
import { toneBg, type Tone } from "../v2/tones";

const steps = [
  { tag: "2 min", title: "Vous décrivez votre besoin", text: "Le formulaire ci-dessus, avec des photos si vous en avez. Aucun compte à créer." },
  { tag: "Sous 24h", title: "Un technicien vous recontacte", text: "Il relit votre demande et vous contacte pour préciser ce qui doit l'être." },
  { tag: "Gratuit", title: "Vous recevez un devis détaillé", text: "Matériel, main-d'œuvre, TVA : vous savez exactement ce que vous payez." },
  { tag: "Sans engagement", title: "Vous décidez", text: "S'il vous convient, nous planifions l'intervention. Sinon, vous ne nous devez rien." },
];

/** « Comment se passe votre devis ? » — frise en 4 étapes. */
export function HowItWorks({ tone = "white" }: { tone?: Tone }) {
  return (
    <section className={cn("section-y", toneBg[tone])} aria-labelledby="deroule-devis">
      <div className="container">
        <SectionHeading
          id="deroule-devis"
          eyebrow="Simple et transparent"
          title="Comment se passe votre devis ?"
          intro="De votre demande à l'intervention, un seul interlocuteur et aucune surprise."
        />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-ink/15 lg:block"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="bg-flame relative inline-flex h-14 w-14 items-center justify-center rounded-2xl font-mono text-xl font-bold text-white shadow-lg shadow-flame/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-lavender px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-navy">
                    {step.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

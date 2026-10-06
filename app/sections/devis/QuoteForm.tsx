"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { Icon, type IconKey } from "@/components/site/Icon";
import { PhoneLink } from "@/components/site/Actions";
import { useAttribution } from "@/components/site/useAttribution";
import { fr } from "@/lib/typography";
import {
  currentHeating,
  type CurrentHeating,
  callbackSlots,
  contactPreferences,
  emptyQuote,
  LIMITS,
  OTHER_SERVICE,
  properties,
  requestTypes,
  stepFields,
  timings,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteRequest,
  type RequestType,
} from "@/lib/quote/schema";
import type { ServiceIntent } from "../../data/services/types";
import { ChoiceCard, ErrorText, FieldLabel, inputClass, Pill, TextField } from "@/components/site/FormFields";
import { PhotoPicker } from "./PhotoPicker";
import { QuoteRecap } from "./QuoteRecap";
import { QuoteSuccess } from "./QuoteSuccess";

export interface CategoryOption {
  id: string;
  label: string;
  icon: IconKey;
  placeholder: string;
}

export interface ServiceOption {
  ref: string;
  category: string;
  label: string;
  amount?: number;
  intent: ServiceIntent;
}

const intentToType: Record<ServiceIntent, RequestType> = {
  installation: "installation",
  entretien: "entretien",
  urgence: "reparation",
};

const requestIcons: Record<RequestType, IconKey> = {
  installation: "tools",
  entretien: "calendarCheck",
  reparation: "wrench",
  autre: "comments",
};

const propertyIcons: Record<keyof typeof properties, IconKey> = {
  maison: "home",
  appartement: "layers",
  professionnel: "userTie",
  copropriete: "users",
};

const steps = [
  { label: "Votre projet", title: "Quel est votre projet ?", intro: "Choisissez le domaine, puis la prestation qui s'en rapproche le plus." },
  { label: "Les détails", title: "Parlez-nous de votre besoin", intro: "Plus c'est précis, plus le devis sera juste. Deux minutes suffisent." },
  { label: "Vos coordonnées", title: "Où et comment vous joindre ?", intro: "Un technicien vous recontacte sous 24h avec votre devis." },
];

type Status = "idle" | "sending" | "success" | "error";

export function QuoteForm({
  categories,
  services,
  communes,
}: {
  categories: CategoryOption[];
  services: ServiceOption[];
  communes: string[];
}) {
  const [quote, setQuote] = useState<QuoteRequest>(emptyQuote);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [photos, setPhotos] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>();
  const [result, setResult] = useState<{ reference: string; delivered?: boolean }>();
  const startedAt = useRef(0);
  const attribution = useAttribution();
  const honeypot = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const category = categories.find((c) => c.id === quote.category);
  const categoryServices = services.filter((s) => s.category === quote.category);
  const service = services.find((s) => s.ref === quote.service);

  // Préremplissage depuis la page d'origine (?service=chauffage/… ou ?service=chauffage).
  useEffect(() => {
    startedAt.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    const context = params.get("service");
    const preset = services.find((s) => s.ref === context);
    // « Devis express » des pages refondues : le chauffage actuel amorce la description.
    const current = params.get("actuel");
    if (current && Object.prototype.hasOwnProperty.call(currentHeating, current)) {
      const label = currentHeating[current as CurrentHeating];
      setQuote((q) => ({ ...q, description: q.description || `Chauffage actuel : ${label.toLowerCase()}. ` }));
    }
    if (preset) {
      setQuote((q) => ({ ...q, category: preset.category, service: preset.ref, requestType: intentToType[preset.intent] }));
      setStep(1);
    } else if (context && categories.some((c) => c.id === context)) {
      setQuote((q) => ({ ...q, category: context }));
    }
  }, [services, categories]);

  const set = <K extends QuoteField>(key: K, value: QuoteRequest[K]) => {
    setQuote((q) => ({ ...q, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const chooseCategory = (id: string) => {
    setQuote((q) => ({
      ...q,
      category: id,
      service: id === "autre" ? OTHER_SERVICE : q.category === id ? q.service : "",
    }));
    setErrors((e) => ({ ...e, category: undefined, service: undefined }));
  };

  const chooseService = (ref: string) => {
    const option = services.find((s) => s.ref === ref);
    setQuote((q) => ({
      ...q,
      service: ref,
      requestType: q.requestType || (option ? intentToType[option.intent] : q.requestType),
    }));
    setErrors((e) => ({ ...e, service: undefined }));
  };

  const scrollToCard = () => {
    const top = cardRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 80) cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const focusFirstError = (found: QuoteErrors) => {
    const field = stepFields.flat().find((f) => found[f]);
    if (!field) return;
    requestAnimationFrame(() => {
      const el =
        document.getElementById(`field-${field}`) ?? document.querySelector<HTMLElement>(`[name="${field}"]`);
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  const goTo = (target: number) => {
    setStep(target);
    setServerMessage(undefined);
    if (status === "error") setStatus("idle");
    scrollToCard();
  };

  const submit = async () => {
    const all = validateQuote(quote);
    if (Object.keys(all).length) {
      setErrors(all);
      const index = stepFields.findIndex((fields) => fields.some((f) => all[f]));
      if (index !== step) setStep(index);
      focusFirstError(all);
      return;
    }

    setStatus("sending");
    setServerMessage(undefined);
    const body = new FormData();
    (Object.keys(quote) as QuoteField[]).forEach((key) => body.append(key, String(quote[key])));
    body.append("startedAt", String(startedAt.current));
    body.append("website", honeypot.current?.value ?? "");
    body.append("attribution", JSON.stringify(attribution.current));
    photos.forEach((file) => body.append("photos", file, file.name));

    try {
      const response = await fetch("/api/devis", { method: "POST", body });
      const data = (await response.json()) as {
        ok: boolean;
        reference?: string;
        delivered?: boolean;
        errors?: QuoteErrors;
        message?: string;
      };
      if (response.ok && data.ok && data.reference) {
        setResult({ reference: data.reference, delivered: data.delivered });
        setStatus("success");
        window.gtag?.("event", "generate_lead", {
          form_name: "devis",
          service: quote.service,
          category: quote.category,
          request_type: quote.requestType,
        });
        scrollToCard();
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        const index = stepFields.findIndex((fields) => fields.some((f) => data.errors?.[f]));
        setStep(index >= 0 ? index : 2);
        setStatus("idle");
        focusFirstError(data.errors);
        return;
      }
      setServerMessage(data.message ?? "Une erreur est survenue. Réessayez ou appelez-nous.");
      setStatus("error");
    } catch {
      setServerMessage("Connexion impossible. Vérifiez votre réseau ou appelez-nous directement.");
      setStatus("error");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      const found = validateQuote(quote, stepFields[step]);
      if (Object.keys(found).length) {
        setErrors((e) => ({ ...e, ...found }));
        focusFirstError(found);
        return;
      }
      goTo(step + 1);
      return;
    }
    submit();
  };

  const err = (field: QuoteField) => (errors[field] ? `field-${field}-error` : undefined);
  const sending = status === "sending";

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-12">
      <div
        ref={cardRef}
        className="min-w-0 scroll-mt-28 rounded-[2rem] bg-white p-5 shadow-soft ring-1 ring-ink/5 sm:p-8 md:p-10"
      >
        {status === "success" && result ? (
          <QuoteSuccess quote={quote} reference={result.reference} delivered={result.delivered} />
        ) : (
          <form noValidate onSubmit={handleSubmit} aria-labelledby="quote-step-title">
            {/* Progression */}
            <div className="mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink/55">
                Étape {step + 1} sur {steps.length}
              </p>
              <ol className="mt-3 grid grid-cols-3 gap-2">
                {steps.map((s, index) => (
                  <li key={s.label} aria-current={index === step ? "step" : undefined}>
                    <button
                      type="button"
                      disabled={index >= step}
                      onClick={() => goTo(index)}
                      className="group w-full text-left disabled:cursor-default"
                    >
                      <span
                        className={cn(
                          "block h-1.5 rounded-full transition-colors duration-500",
                          index < step ? "bg-navy group-hover:bg-flame" : index === step ? "bg-flame" : "bg-ink/10"
                        )}
                      />
                      <span
                        className={cn(
                          "mt-2 hidden text-xs sm:block",
                          index === step ? "font-bold text-ink" : index < step ? "text-navy underline-offset-2 group-hover:underline" : "text-ink/40"
                        )}
                      >
                        {s.label}
                        {index < step && <span className="sr-only"> (terminée, modifier)</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 id="quote-step-title" className="text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {fr(steps[step].title)}
                </h2>
                <p className="mt-2 text-ink/65">{fr(steps[step].intro)}</p>

                <div className="mt-8 space-y-8">
                  {step === 0 && (
                    <>
                      <fieldset>
                        <legend className="sr-only">Domaine</legend>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {categories.map((c) => (
                            <ChoiceCard
                              key={c.id}
                              name="category"
                              value={c.id}
                              checked={quote.category === c.id}
                              onChange={chooseCategory}
                              label={c.label}
                              icon={c.icon}
                              describedBy={err("category")}
                              stacked
                            />
                          ))}
                        </div>
                        <ErrorText id="field-category-error">{errors.category}</ErrorText>
                      </fieldset>

                      {category && category.id !== "autre" && (
                        <fieldset>
                          <FieldLabel as="legend">Quelle prestation ?</FieldLabel>
                          <div className="flex flex-wrap gap-2">
                            {categoryServices.map((s) => (
                              <Pill
                                key={s.ref}
                                name="service"
                                value={s.ref}
                                checked={quote.service === s.ref}
                                onChange={chooseService}
                                describedBy={err("service")}
                              >
                                {s.label}
                                {s.amount !== undefined && (
                                  <span className={cn("font-mono text-xs", quote.service === s.ref ? "text-amber" : "text-navy")}>
                                    {s.amount}€
                                  </span>
                                )}
                              </Pill>
                            ))}
                            <Pill
                              name="service"
                              value={OTHER_SERVICE}
                              checked={quote.service === OTHER_SERVICE}
                              onChange={chooseService}
                              describedBy={err("service")}
                            >
                              Autre / je ne sais pas
                            </Pill>
                          </div>
                          <ErrorText id="field-service-error">{errors.service}</ErrorText>
                        </fieldset>
                      )}

                      {service?.amount !== undefined && service.intent !== "installation" && (
                        <div className="flex gap-3 rounded-2xl bg-lavender p-4 text-sm text-ink">
                          <Icon name="euro" className="mt-0.5 h-4 w-4 flex-shrink-0 text-navy" />
                          <p>
                            <strong>Bon à savoir :</strong> cette prestation a un prix affiché de{" "}
                            <strong className="font-mono">{service.amount}€ TVAC</strong>. Pas besoin d&apos;attendre un
                            devis : continuez et nous vous rappelons pour fixer l&apos;intervention — ou appelez-nous
                            directement.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <fieldset>
                        <FieldLabel as="legend">Nature de la demande</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {(Object.keys(requestTypes) as RequestType[]).map((key) => (
                            <ChoiceCard
                              key={key}
                              name="requestType"
                              value={key}
                              checked={quote.requestType === key}
                              onChange={(v) => set("requestType", v as RequestType)}
                              label={requestTypes[key]}
                              icon={requestIcons[key]}
                              describedBy={err("requestType")}
                            />
                          ))}
                        </div>
                        <ErrorText id="field-requestType-error">{errors.requestType}</ErrorText>
                      </fieldset>

                      <fieldset>
                        <FieldLabel as="legend">Délai souhaité</FieldLabel>
                        <div className="flex flex-wrap gap-2">
                          {(Object.keys(timings) as (keyof typeof timings)[]).map((key) => (
                            <Pill
                              key={key}
                              name="timing"
                              value={key}
                              checked={quote.timing === key}
                              onChange={(v) => set("timing", v as keyof typeof timings)}
                              describedBy={err("timing")}
                            >
                              {timings[key]}
                            </Pill>
                          ))}
                        </div>
                        <ErrorText id="field-timing-error">{errors.timing}</ErrorText>
                        {quote.timing === "asap" && quote.requestType === "reparation" && (
                          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink/75">
                            Panne en cours ? Le plus rapide reste l&apos;appel :
                            <PhoneLink variant="secondary" className="btn-sm" />
                          </p>
                        )}
                      </fieldset>

                      <fieldset>
                        <FieldLabel as="legend">Type de bien</FieldLabel>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {(Object.keys(properties) as (keyof typeof properties)[]).map((key) => (
                            <ChoiceCard
                              key={key}
                              name="property"
                              value={key}
                              checked={quote.property === key}
                              onChange={(v) => set("property", v as keyof typeof properties)}
                              label={properties[key]}
                              icon={propertyIcons[key]}
                              describedBy={err("property")}
                            />
                          ))}
                        </div>
                        <ErrorText id="field-property-error">{errors.property}</ErrorText>
                      </fieldset>

                      <div>
                        <FieldLabel htmlFor="field-description">Votre besoin en quelques mots</FieldLabel>
                        <textarea
                          id="field-description"
                          name="description"
                          rows={5}
                          maxLength={LIMITS.description}
                          value={quote.description}
                          onChange={(e) => set("description", e.target.value)}
                          placeholder={category?.placeholder ?? "Décrivez votre besoin…"}
                          aria-invalid={errors.description ? true : undefined}
                          aria-describedby={errors.description ? "field-description-error" : "field-description-count"}
                          className={cn(inputClass, "resize-y py-3 leading-relaxed")}
                        />
                        <div className="mt-1.5 flex justify-end">
                          <span id="field-description-count" className="font-mono text-xs text-ink/40">
                            {quote.description.length}/{LIMITS.description}
                          </span>
                        </div>
                        <ErrorText id="field-description-error">{errors.description}</ErrorText>
                      </div>

                      <PhotoPicker onChange={setPhotos} />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <TextField
                        name="name"
                        label="Nom et prénom"
                        autoComplete="name"
                        value={quote.name}
                        onChange={(e) => set("name", e.target.value)}
                        error={errors.name}
                        maxLength={LIMITS.name}
                      />
                      <div className="grid gap-6 sm:grid-cols-2">
                        <TextField
                          name="phone"
                          label="Téléphone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="0486 12 34 56"
                          value={quote.phone}
                          onChange={(e) => set("phone", e.target.value)}
                          error={errors.phone}
                        />
                        <TextField
                          name="email"
                          label="E-mail"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="vous@exemple.be"
                          value={quote.email}
                          onChange={(e) => set("email", e.target.value)}
                          error={errors.email}
                        />
                      </div>
                      <div className="grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-4 sm:gap-6">
                        <TextField
                          name="postalCode"
                          label="Code postal"
                          inputMode="numeric"
                          autoComplete="postal-code"
                          maxLength={4}
                          placeholder="1050"
                          value={quote.postalCode}
                          onChange={(e) => set("postalCode", e.target.value.replace(/\D/g, ""))}
                          error={errors.postalCode}
                        />
                        <TextField
                          name="commune"
                          label="Commune"
                          autoComplete="address-level2"
                          list="communes-desservies"
                          placeholder="Ixelles"
                          value={quote.commune}
                          onChange={(e) => set("commune", e.target.value)}
                          error={errors.commune}
                          maxLength={LIMITS.commune}
                          hint={
                            quote.commune.trim().length > 2 &&
                            !communes.some((c) => c.toLowerCase() === quote.commune.trim().toLowerCase())
                              ? "Hors de nos communes habituelles ? Envoyez quand même : nous vous confirmons si nous intervenons."
                              : undefined
                          }
                        />
                        <datalist id="communes-desservies">
                          {communes.map((c) => (
                            <option key={c} value={c} />
                          ))}
                        </datalist>
                      </div>
                      <TextField
                        name="address"
                        label="Adresse"
                        optional
                        autoComplete="street-address"
                        placeholder="Rue et numéro"
                        value={quote.address}
                        onChange={(e) => set("address", e.target.value)}
                        error={errors.address}
                        maxLength={LIMITS.address}
                      />

                      <fieldset>
                        <FieldLabel as="legend">Comment préférez-vous être contacté ?</FieldLabel>
                        <div className="flex flex-wrap gap-2">
                          {(Object.keys(contactPreferences) as (keyof typeof contactPreferences)[]).map((key) => (
                            <Pill
                              key={key}
                              name="contactPreference"
                              value={key}
                              checked={quote.contactPreference === key}
                              onChange={(v) => set("contactPreference", v as keyof typeof contactPreferences)}
                            >
                              <Icon name={key === "telephone" ? "phone" : "envelope"} className="h-3.5 w-3.5" />
                              {contactPreferences[key]}
                            </Pill>
                          ))}
                        </div>
                      </fieldset>

                      {quote.contactPreference === "telephone" && (
                        <fieldset>
                          <FieldLabel as="legend">Meilleur moment pour vous rappeler</FieldLabel>
                          <div className="flex flex-wrap gap-2">
                            {(Object.keys(callbackSlots) as (keyof typeof callbackSlots)[]).map((key) => (
                              <Pill
                                key={key}
                                name="callbackSlot"
                                value={key}
                                checked={quote.callbackSlot === key}
                                onChange={(v) => set("callbackSlot", v as keyof typeof callbackSlots)}
                              >
                                {callbackSlots[key]}
                              </Pill>
                            ))}
                          </div>
                        </fieldset>
                      )}

                      {/* Champ piège anti-robots : invisible pour les humains. */}
                      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                        <label htmlFor="field-website">Site web</label>
                        <input ref={honeypot} id="field-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {status === "error" && serverMessage && (
              <div role="alert" className="mt-8 rounded-2xl border border-flame/30 bg-flame/[0.05] p-4 text-sm text-ink">
                <p className="font-semibold text-flame">{serverMessage}</p>
                <PhoneLink className="btn-sm mt-3" />
              </div>
            )}

            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-ink/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="btn btn-text gap-2 text-ink/70 hover:text-navy"
                >
                  <FaArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Retour
                </button>
              ) : (
                <p className="hidden font-mono text-xs uppercase tracking-[0.15em] text-ink/45 sm:block">
                  2 minutes · gratuit · sans engagement
                </p>
              )}
              <button type="submit" disabled={sending} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
                {step < steps.length - 1 ? "Continuer" : sending ? "Envoi en cours…" : "Envoyer ma demande de devis"}
                {!sending && <BsArrowRight className="h-5 w-5" aria-hidden="true" />}
              </button>
            </div>

            {step === steps.length - 1 && (
              <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink/55">
                <FaLock className="mt-0.5 h-3 w-3 flex-shrink-0" aria-hidden="true" />
                <span>
                  Vos coordonnées servent uniquement à traiter votre demande de devis.{" "}
                  <Link href="/confidentialite" className="font-semibold text-navy underline underline-offset-2 hover:text-flame">
                    Politique de confidentialité
                  </Link>
                </span>
              </p>
            )}
          </form>
        )}
      </div>

      <aside className="min-w-0 lg:sticky lg:top-28" aria-label="Récapitulatif de votre demande">
        <QuoteRecap
          quote={quote}
          categoryLabel={category?.label}
          serviceLabel={quote.service === OTHER_SERVICE ? "Autre besoin" : service?.label}
          amount={service?.intent !== "installation" ? service?.amount : undefined}
          photoCount={photos.length}
        />
      </aside>
    </div>
  );
}

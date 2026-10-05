"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaLock } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { ErrorText, FieldLabel, inputClass, Pill, TextField } from "@/components/site/FormFields";
import { PhoneLink } from "@/components/site/Actions";
import { useAttribution } from "@/components/site/useAttribution";
import { LIMITS } from "@/lib/quote/schema";
import {
  callbackTimes,
  callbackTopics,
  emptyCallback,
  topicFromContext,
  validateCallback,
  type CallbackErrors,
  type CallbackField,
  type CallbackRequest,
  type CallbackTime,
  type CallbackTopic,
} from "@/lib/quote/callback";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Formulaire court « Être rappelé », envoyé par e-mail via /api/rappel.
 * `context` = page d'origine (« categorie/slug » ou « categorie ») : pré-sélectionne
 * le sujet et figure dans l'e-mail. Absent, il est lu dans `?service=` de l'URL.
 * `purpose="rendez-vous"` : l'e-mail est titré « Rendez-vous à fixer ».
 */
export function CallbackForm({ context, purpose = "" }: { context?: string; purpose?: CallbackRequest["purpose"] }) {
  const [callback, setCallback] = useState<CallbackRequest>({ ...emptyCallback, purpose });
  const [errors, setErrors] = useState<CallbackErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string>();
  const [result, setResult] = useState<{ reference: string; delivered?: boolean }>();
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const attribution = useAttribution();

  useEffect(() => {
    startedAt.current = Date.now();
    const origin = context ?? new URLSearchParams(window.location.search).get("service") ?? "";
    if (origin) setCallback((c) => ({ ...c, service: origin, topic: c.topic || topicFromContext(origin) }));
  }, [context]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = <K extends CallbackField>(key: K, value: CallbackRequest[K]) => {
    setCallback((c) => ({ ...c, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const focusFirstError = (found: CallbackErrors) => {
    const field = (["name", "phone", "message"] as CallbackField[]).find((f) => found[f]);
    if (field) requestAnimationFrame(() => document.getElementById(`field-${field}`)?.focus());
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validateCallback(callback);
    if (Object.keys(found).length) {
      setErrors(found);
      focusFirstError(found);
      return;
    }

    setStatus("sending");
    setServerMessage(undefined);
    const body = new FormData();
    (Object.keys(callback) as CallbackField[]).forEach((key) => body.append(key, callback[key]));
    body.append("startedAt", String(startedAt.current));
    body.append("website", honeypot.current?.value ?? "");
    body.append("attribution", JSON.stringify(attribution.current));

    try {
      const response = await fetch("/api/rappel", { method: "POST", body });
      const data = (await response.json()) as {
        ok: boolean;
        reference?: string;
        delivered?: boolean;
        errors?: CallbackErrors;
        message?: string;
      };
      if (response.ok && data.ok && data.reference) {
        setResult({ reference: data.reference, delivered: data.delivered });
        setStatus("success");
        window.gtag?.("event", "generate_lead", {
          form_name: "rappel",
          topic: callback.topic || "autre",
          callback_time: callback.time,
        });
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
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

  if (status === "success" && result) {
    const firstName = callback.name.trim().split(/\s+/)[0];
    return (
      <div className="py-6 text-center">
        {result.delivered === false && (
          <p className="mx-auto mb-6 max-w-sm rounded-xl border border-dashed border-flame/50 bg-flame/[0.05] px-4 py-2 text-xs text-flame">
            Mode développement : l&apos;e-mail n&apos;a pas été envoyé (voir la console du serveur).
          </p>
        )}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="bg-flame mx-auto flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl shadow-flame/30"
        >
          <FaCheck className="h-6 w-6" aria-hidden="true" />
        </motion.div>
        <h3 ref={successRef} tabIndex={-1} className="text-gradient mt-5 text-2xl font-bold tracking-tighter outline-none md:text-3xl">
          C&apos;est noté, {firstName}&nbsp;!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-ink/75">
          Nous vous rappelons au <strong className="whitespace-nowrap text-ink">{callback.phone}</strong>,{" "}
          {callbackTimes[callback.time].toLowerCase()}.
        </p>
        <p className="mx-auto mt-4 inline-block rounded-xl bg-lavender px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-navy">
          {result.reference}
        </p>
        <p className="mx-auto mt-6 flex max-w-sm flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink/70">
          C&apos;est urgent ?
          <PhoneLink variant="secondary" className="btn-sm" />
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="name"
          label="Votre nom"
          autoComplete="name"
          value={callback.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
          maxLength={LIMITS.name}
        />
        <TextField
          name="phone"
          label="Téléphone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0486 12 34 56"
          value={callback.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
        />
      </div>

      <fieldset>
        <FieldLabel as="legend">Quand vous rappeler&nbsp;?</FieldLabel>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(callbackTimes) as CallbackTime[]).map((key) => (
            <Pill key={key} name="time" value={key} checked={callback.time === key} onChange={(v) => set("time", v as CallbackTime)}>
              {callbackTimes[key]}
            </Pill>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <FieldLabel as="legend" optional>
          Sujet
        </FieldLabel>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(callbackTopics) as CallbackTopic[]).map((key) => (
            <Pill key={key} name="topic" value={key} checked={callback.topic === key} onChange={(v) => set("topic", v as CallbackTopic)}>
              {callbackTopics[key]}
            </Pill>
          ))}
        </div>
      </fieldset>

      <div>
        <FieldLabel htmlFor="field-message" optional>
          Votre question ou votre besoin
        </FieldLabel>
        <textarea
          id="field-message"
          name="message"
          rows={3}
          maxLength={LIMITS.description}
          placeholder="Ex. : chaudière en panne, devis pour une borne de recharge, une question sur votre installation…"
          value={callback.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "field-message-error" : undefined}
          className={cn(inputClass, "resize-y py-3 leading-relaxed")}
        />
        <ErrorText id="field-message-error">{errors.message}</ErrorText>
      </div>

      {/* Champ piège anti-robots : invisible pour les humains. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="callback-website">Site web</label>
        <input ref={honeypot} id="callback-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="rounded-2xl border border-flame/30 bg-flame/[0.05] p-4 text-sm text-ink">
          <p className="font-semibold text-flame">{serverMessage}</p>
          <PhoneLink className="btn-sm mt-3" />
        </div>
      )}

      <div>
        <button type="submit" disabled={sending} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
          {sending ? "Envoi en cours…" : "Rappelez-moi"}
          {!sending && <BsArrowRight className="h-5 w-5" aria-hidden="true" />}
        </button>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-ink/55">
          <FaLock className="mt-0.5 h-3 w-3 flex-shrink-0" aria-hidden="true" />
          <span>
            Votre numéro sert uniquement à vous rappeler.{" "}
            <Link href="/confidentialite" className="font-semibold text-navy underline underline-offset-2 hover:text-flame">
              Politique de confidentialité
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}

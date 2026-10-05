"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

/**
 * Agenda Cal.com intégré (vue mois). Chargé uniquement sur /rendez-vous, à la
 * demande du visiteur. Une réservation confirmée envoie `generate_lead`
 * (form_name « rendez-vous ») à Google Analytics — si le visiteur a consenti.
 */
export function CalBooker({ calLink, label, brandColor }: { calLink: string; label: string; brandColor: string }) {
  const namespace = calLink.split("/").pop() ?? "rendez-vous";

  useEffect(() => {
    let active = true;
    let cal: Awaited<ReturnType<typeof getCalApi>> | undefined;
    const onBooked = () => window.gtag?.("event", "generate_lead", { form_name: "rendez-vous", booking_type: label });

    getCalApi({ namespace }).then((api) => {
      if (!active) return;
      cal = api;
      api("ui", {
        cssVarsPerTheme: { light: { "cal-brand": brandColor }, dark: { "cal-brand": brandColor } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      api("on", { action: "bookingSuccessfulV2", callback: onBooked });
    });

    return () => {
      active = false;
      cal?.("off", { action: "bookingSuccessfulV2", callback: onBooked });
    };
  }, [namespace, label, brandColor]);

  return (
    <Cal
      namespace={namespace}
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
    />
  );
}

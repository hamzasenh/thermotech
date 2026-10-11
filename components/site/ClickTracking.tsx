"use client";
import { useEffect } from "react";

/**
 * Mesure les clics « appeler » (tel:), « écrire » (mailto:) et WhatsApp (wa.me)
 * partout sur le site, sans toucher à chaque lien : un seul écouteur délégué.
 * N'envoie rien si Google Analytics n'est pas chargé (pas de consentement).
 *
 * Événements GA4 : `click_to_call`, `click_email` et `click_whatsapp`, avec la page et
 * l'emplacement du lien (header, footer, menu mobile, contenu). À marquer
 * comme « événements clés » dans GA4 pour en faire des conversions.
 */
export function ClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.<HTMLAnchorElement>(
        'a[href^="tel:"], a[href^="mailto:"], a[href^="https://wa.me/"]'
      );
      if (!link || !window.gtag) return;

      const isPhone = link.href.startsWith("tel:");
      const isWhatsapp = link.href.startsWith("https://wa.me/");
      const location = link.closest(".v2-mobile-bar")
        ? "barre_mobile"
        : link.closest("#menu-mobile")
        ? "menu_mobile"
        : link.closest("header")
          ? "header"
          : link.closest("footer")
            ? "footer"
            : link.closest('[role="dialog"]')
              ? "dialog"
              : "contenu";

      window.gtag("event", isPhone ? "click_to_call" : isWhatsapp ? "click_whatsapp" : "click_email", {
        link_location: location,
        page_path: window.location.pathname,
        link_text: link.textContent?.trim().slice(0, 80),
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}

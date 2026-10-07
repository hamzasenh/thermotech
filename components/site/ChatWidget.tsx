"use client";
import Script from "next/script";
import { useEffect } from "react";

const BUBBLE_CLOSED_KEY = "radialec_chat_bubble_closed";

/**
 * Chatbot Causerie (widget tiers). NON MONTÉ depuis le 08/10/2026 (retiré à la
 * demande du propriétaire). Pour le remettre : <ChatWidget /> dans app/layout.tsx,
 * et rétablir ses lignes sur /confidentialite et /cookies (voir l'historique git).
 *
 * Le texte de la bulle d'accroche et l'ouverture automatique se règlent dans le
 * tableau de bord Causerie ; ici,
 * on le rend discret :
 * - chargé quand la page est prête (`lazyOnload`) : n'alourdit pas le premier
 *   affichage et ne modifie plus <html> avant React (erreur d'hydratation) ;
 * - bulle d'accroche masquée sur mobile (globals.css), où elle couvre le contenu ;
 * - bulle fermée ou utilisée une fois = plus affichée pendant toute la visite
 *   (Causerie ne s'en souvient pas d'une page à l'autre).
 */
export function ChatWidget() {
  useEffect(() => {
    const hide = () => document.documentElement.setAttribute("data-chat-bubble", "closed");
    try {
      if (sessionStorage.getItem(BUBBLE_CLOSED_KEY)) hide();
    } catch {}

    const onClick = (event: MouseEvent) => {
      if (!(event.target as Element | null)?.closest?.("#causerie-bubble")) return;
      try {
        sessionStorage.setItem(BUBBLE_CLOSED_KEY, "1");
      } catch {}
      hide();
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return (
    <Script
      src="https://dashboard.causeriebot.com/widget.js"
      strategy="lazyOnload"
      data-id="6f362cd0-0ef1-4381-a488-302f52960c7f"
      data-url="https://dashboard.causeriebot.com"
    />
  );
}

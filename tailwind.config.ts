import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Archivo (variable en graisse et en largeur) : la police du site, y compris par défaut.
        sans: ["var(--font-archivo)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-archivo)", ...defaultTheme.fontFamily.sans],
        // Geist : uniquement le mot « Radialec » du logo (identité inchangeable).
        wordmark: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        // Geist Mono n'est chargée que là où elle sert (afficheur de prix de /tarifs).
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        // Palette de marque Radialec — utiliser ces tokens plutôt que les hex bruts.
        lavender: "#EAEEFE",
        navy: "#001E80",
        ink: "#010D3E",
        flame: "#e52619",
        amber: "#f9bc2d",
        // Refonte « les trois énergies » : couleurs relevées sur le logo + neutres.
        ember: "#ED7020", // flamme, partie orange
        blaze: "#E83C1C", // teinte moyenne du bouton d'appel (dégradé flamme) — aplat du CTA final
        bolt: "#FFD505", // éclair — jamais en texte sur fond clair
        water: { DEFAULT: "#3468AF", light: "#38B7E8" }, // goutte
        night: "#0B1222", // fonds « cinéma », texte des titres
        chalk: "#F6F3EE", // fond de lecture chaud (remplace le lavande)
      },
      // Couleur des bordures sans couleur explicite (gris neutre clair).
      borderColor: { DEFAULT: "#e5e5e5" },
      boxShadow: {
        soft: "0 20px 60px -15px rgba(0, 30, 128, 0.25)",
      },
      borderRadius: {
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

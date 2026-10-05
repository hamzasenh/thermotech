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
        sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
        // Geist Mono n'est chargée que là où elle sert (afficheur de prix de /tarifs).
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
        // Refonte : Archivo (variable en graisse et en largeur), chargée sur les pages refondues.
        display: ["var(--font-archivo)", ...defaultTheme.fontFamily.sans],
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
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--primary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      boxShadow: {
        soft: "0 20px 60px -15px rgba(0, 30, 128, 0.25)",
        card: "0 7px 14px #EAEAEA",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

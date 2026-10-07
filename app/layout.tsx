import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import logo from "@/assets/logo.png";
import { ClickTracking } from "@/components/site/ClickTracking";
import { AttributionCapture } from "@/components/site/useAttribution";
import { CookieConsent } from "@/components/site/CookieConsent";
import { JsonLd } from "@/components/site/JsonLd";
import { MotionProvider } from "@/components/site/Motion";
import { localBusinessJsonLd } from "@/lib/seo";
import { company } from "./data/company";
import { getNavGroups } from "./data/navigation";
import { FooterV2 } from "./sections/v2/chrome";
import { archivo } from "./sections/v2/fonts";
import { HeaderV2 } from "./sections/v2/HeaderV2";
import { MobileActionBar } from "./sections/v2/MobileActionBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.siteUrl),
  title: {
    default: "Chauffagiste, électricien et plombier à Bruxelles | Radialec",
    template: "%s | Radialec",
  },
  description: company.description,
  applicationName: company.name,
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: company.name,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#EAEEFE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-BE">
      <body className={`${geistSans.variable} ${archivo.variable} bg-white font-display text-night antialiased`}>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-3 focus:font-bold focus:text-white"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <HeaderV2 groups={getNavGroups()} />
          <main id="contenu">{children}</main>
          <FooterV2 />
          <MobileActionBar />
        </MotionProvider>

        <JsonLd data={localBusinessJsonLd(`${company.siteUrl}${logo.src}`)} />

        {/* Bandeau cookies + Google Analytics (chargé uniquement après consentement) */}
        <CookieConsent />
        <ClickTracking />
        <AttributionCapture />

      </body>
    </html>
  );
}

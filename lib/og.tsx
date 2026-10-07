import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { company } from "@/app/data/company";
import { categoryLabels, getCategory } from "@/app/data/categories";
import { getService, type ServiceCategory } from "@/app/data/services";

// Images d'aperçu (Open Graph) générées au build : ce qu'affichent WhatsApp,
// Facebook, LinkedIn… quand on partage un lien du site. Charte Radialec :
// fond navy, pastille flamme, police Geist (graisses statiques extraites de la
// police variable du repo, assets/fonts/).

export const OG_SIZE = { width: 1200, height: 630 };

interface Visual {
  path: string;
  width: number;
  height: number;
  /** Personnage : pleine hauteur, posé en bas. Sinon : appareil, contenu à droite. */
  person?: boolean;
}

const visuals = {
  technicien: { path: "assets/technicien_debout_souriant_bras_croises_coupés_aux_cuisses.png", width: 1024, height: 1536, person: true },
  // Chaudière détourée de l'accueil. Plus de rendus 3D par métier (réponse Q8).
  chaudiere: { path: "assets/refonte/chaudiere-accueil.png", width: 743, height: 900 },
} satisfies Record<string, Visual>;

// Les autres métiers gardent le technicien (visuel par défaut).
const categoryVisual: Partial<Record<ServiceCategory, Visual>> = {
  chauffage: visuals.chaudiere,
};

const file = (path: string) => readFile(join(process.cwd(), path));
const dataUrl = (buffer: Buffer) => `data:image/png;base64,${buffer.toString("base64")}`;

function Star() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24">
      <path fill="#f9bc2d" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
    </svg>
  );
}

export async function renderOgImage({
  eyebrow,
  title,
  visual = visuals.technicien,
}: {
  eyebrow: string;
  title: string;
  visual?: Visual;
}) {
  const [bold, medium, logo, image] = await Promise.all([
    file("assets/fonts/Geist-Bold.ttf"),
    file("assets/fonts/Geist-Medium.ttf"),
    file("assets/logo.png"),
    file(visual.path),
  ]);

  // Personnage : pleine hauteur, posé en bas. Appareil : contenu dans 380 × 400 px, à droite.
  const isPortrait = Boolean(visual.person);
  const scale = isPortrait ? 600 / visual.height : Math.min(400 / visual.height, 380 / visual.width);
  const visualHeight = Math.round(visual.height * scale);
  const visualWidth = Math.round(visual.width * scale);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          padding: 64,
          fontFamily: "Geist",
          background: "linear-gradient(135deg, #00040f 0%, #010D3E 45%, #001E80 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -140,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(249,188,45,0.38) 0%, rgba(229,38,25,0.14) 45%, rgba(0,0,0,0) 70%)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- rendu satori, pas de next/image */}
        <img
          src={dataUrl(image)}
          width={visualWidth}
          height={visualHeight}
          style={{ position: "absolute", right: isPortrait ? 40 : 64, bottom: isPortrait ? 0 : 110 }}
          alt=""
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 720, height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- rendu satori, pas de next/image */}
            <img src={dataUrl(logo)} width={50} height={56} alt="" />
            <span style={{ marginLeft: 16, color: "white", fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
              {company.name}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 20px",
                borderRadius: 999,
                background: "linear-gradient(90deg, #e52619, #f9bc2d)",
                color: "white",
                fontSize: 22,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                marginTop: 24,
                color: "white",
                fontSize: title.length > 70 ? 50 : title.length > 50 ? 58 : 66,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: -2,
              }}
            >
              {title}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.88)", fontSize: 24, fontWeight: 500 }}>
            <div style={{ display: "flex", marginRight: 12 }}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <span>
              {company.google.rating}/5 sur Google · Sous 24h, 7j/7 · {company.phone.display}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: bold, weight: 700, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}

/** Image par défaut du site. */
export function defaultOgImage() {
  return renderOgImage({
    eyebrow: "Bruxelles et environs · 7j/7",
    title: "Chauffagiste, électricien et plombier à Bruxelles",
  });
}

/** Image d'une page catégorie (hub). */
export function categoryOgImage(category: ServiceCategory) {
  return async function Image() {
    const content = getCategory(category);
    return renderOgImage({
      eyebrow: `${content.label} · Bruxelles`,
      title: content.hero.title,
      visual: categoryVisual[category],
    });
  };
}

/** Image d'une fiche service (/<categorie>/<slug>). */
export function serviceOgImage(category: ServiceCategory) {
  return async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = getService(category, slug);
    return renderOgImage({
      eyebrow: `${categoryLabels[category]} · Bruxelles`,
      title: service?.pageTitle ?? categoryLabels[category],
      visual: categoryVisual[category],
    });
  };
}

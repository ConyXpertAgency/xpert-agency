import { existsSync } from "node:fs";
import { join } from "node:path";
import { getCasesStudies, type ContentReader } from "@/lib/data";
import type { Lang } from "@/lib/supabase/types";

/**
 * Única fuente para la franja de confianza/industrias.
 * Replica el listado del marquee de /industries (studies del CMS +
 * logos locales + storage) sin tocar esa página: mismos assets,
 * mismos formatos originales, sin marcas inventadas.
 */
export async function getTrustBandLogos(lang: Lang, configuredLogos?: string[], reader?: ContentReader): Promise<string[]> {
  if (configuredLogos?.length) {
    return [...new Set(configuredLogos.map((logo) => logo.trim()).filter(Boolean))];
  }
  const studies = await getCasesStudies(lang, reader);
  const studyLogosRaw = studies.items
    .map((s) => s.logo)
    .filter((v): v is string => Boolean(v));
  // Mapea los PNG de Supabase a WebP locales optimizados (public/logos/).
  const studyLogos = studyLogosRaw.map((p) => {
    const base = p.split("/").pop()!.replace(/\.png$/i, ".webp").toLowerCase();
    const localPath = `/logos/${base}`;
    return existsSync(join(process.cwd(), "public", localPath.slice(1))) ? localPath : p;
  });
  // Logos locales de clients sin logo en DB (ver public/logos).
  const localLogos = [
    "/logos/heineken.png",
    "/logos/diageo.png",
    "/logos/nestle.svg",
    "/logos/bayer.webp",
    "/logos/bmw.svg",
    "/logos/audi.svg",
    "/logos/siemens.svg",
    "/logos/ab-inbev.png",
    "/logos/bosch.svg",
    "/logos/sony.svg",
    "/logos/vw.svg",
  ];
  // Marcas desde Supabase Storage (bucket "uploads", vía resolveStorageUrl).
  const storageLogos = [
    "/uploads/cocacola.jpg",
    "/uploads/gillete.webp",
    "/uploads/hermes.png",
    "/uploads/osram.png",
  ];
  // Marcas reconocibles al frente para la primera impresión.
  const priority = [
    "heineken",
    "diageo",
    "nestle",
    "bayer",
    "cocacola",
    "gillete",
    "hermes.png",
    "bmw",
    "audi",
    "birkenstock",
    "almarai",
    "siemens.svg",
    "osram",
    "infineon",
    "continental",
    "rohde",
  ];
  const rank = (p: string) => {
    const i = priority.findIndex((k) => p.includes(k));
    return i === -1 ? priority.length : i;
  };
  return [...new Set([...studyLogos, ...localLogos, ...storageLogos])].sort(
    (a, b) => rank(a) - rank(b)
  );
}

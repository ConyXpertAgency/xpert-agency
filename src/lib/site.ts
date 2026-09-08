import type { Metadata } from "next";

/**
 * Dominio público canónico. Valor explícito de producción; nunca construir
 * URLs de SEO (canonical, hreflang, sitemap, OG) desde Supabase.
 */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim() || "https://www.xpert-im.agency";

/** Únicos idiomas públicos válidos. Cualquier otro segmento → 404. */
export const LOCALES = ["en", "es", "de"] as const;

export type SiteLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: SiteLocale = "en";

export const SITE_NAME = "Xpert Agency";

/** Imagen Open Graph global (1200×630). */
export const OG_IMAGE_URL = `${SITE_URL}/og/xpert-agency.jpg`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const isValidLocale = (value: unknown): value is SiteLocale =>
  typeof value === "string" && (LOCALES as readonly string[]).includes(value);

interface PageMetadataInput {
  lang: string;
  /** "" para el home, "/about", "/services", ... para el resto. */
  path: string;
  title?: string;
  description?: string;
}

/**
 * Canonical + hreflang EN/ES/DE + x-default y OG básico para una página
 * pública. Todas las URLs salen de SITE_URL (dominio público real).
 */
export function pageMetadata({ lang, path, title, description }: PageMetadataInput): Metadata {
  const locale: SiteLocale = isValidLocale(lang) ? lang : DEFAULT_LOCALE;
  const canonical = `${SITE_URL}/${locale}${path}`;
  const urlFor = (l: SiteLocale) => `${SITE_URL}/${l}${path}`;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      canonical,
      languages: {
        en: urlFor("en"),
        es: urlFor("es"),
        de: urlFor("de"),
        "x-default": urlFor(DEFAULT_LOCALE),
      },
    },
    openGraph: {
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [OG_IMAGE_URL],
    },
  };
}

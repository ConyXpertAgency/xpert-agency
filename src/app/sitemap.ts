import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, ENGLISH_ONLY_PATHS, LOCALES, SITE_URL } from "@/lib/site";

const MULTILANG_PATHS = [
  "",
  "/about",
  "/services",
  "/industries",
  "/cases",
  "/contact",
];

const fullAlternates = (path: string) => ({
  en: `${SITE_URL}/en${path}`,
  es: `${SITE_URL}/es${path}`,
  de: `${SITE_URL}/de${path}`,
  "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
});

const englishOnlyAlternates = (path: string) => ({
  en: `${SITE_URL}/en${path}`,
  "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...LOCALES.flatMap((lang) =>
      MULTILANG_PATHS.map((path) => ({
        url: `${SITE_URL}/${lang}${path}`,
        alternates: { languages: fullAlternates(path) },
      })),
    ),
    ...ENGLISH_ONLY_PATHS.map((path) => ({
      url: `${SITE_URL}/en${path}`,
      alternates: { languages: englishOnlyAlternates(path) },
    })),
  ];
}

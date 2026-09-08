import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "@/lib/site";

const PATHS = [
  "",
  "/about",
  "/services",
  "/industries",
  "/filling-packaging",
  "/cases",
  "/rbe",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((lang) =>
    PATHS.map((path) => ({
      url: `${SITE_URL}/${lang}${path}`,
      alternates: {
        languages: {
          en: `${SITE_URL}/en${path}`,
          es: `${SITE_URL}/es${path}`,
          de: `${SITE_URL}/de${path}`,
          "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
        },
      },
    })),
  );
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ENGLISH_ONLY_PATHS, LOCALES } from "@/lib/site";

// Idiomas públicos válidos (centralizado en lib/site). Cualquier otro
// segmento se redirige a /en/... y termina en 404 si la ruta no existe.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/");
  const pathLang = segments[1];

  // RBE y Filling & Packaging solo existen en inglés: ES/DE van a /en/... (308).
  if (
    (pathLang === "es" || pathLang === "de") &&
    segments.length > 2 &&
    (ENGLISH_ONLY_PATHS as readonly string[]).includes(`/${segments[2]}`)
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/en/${segments.slice(2).join("/")}`;
    return NextResponse.redirect(url, 308);
  }

  if (pathLang && (LOCALES as readonly string[]).includes(pathLang)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|sitemap.xml|icon.png|apple-icon.png|manifest.webmanifest|api|admin|.*\\..*).*)"],
};

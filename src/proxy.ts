import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES } from "@/lib/site";

// Idiomas públicos válidos (centralizado en lib/site). Cualquier otro
// segmento se redirige a /en/... y termina en 404 si la ruta no existe.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLang = pathname.split("/")[1];
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

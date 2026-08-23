import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cualquier código de locale válido (en, es, de, fr, pt-BR, ...). Los idiomas
// nuevos creados desde el admin funcionan sin tocar este archivo.
const LOCALE_RE = /^[a-z]{2,3}(-[a-z]{2})?$/i;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLang = pathname.split("/")[1];
  if (pathLang && LOCALE_RE.test(pathLang)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|admin|.*\\..*).*)"],
};

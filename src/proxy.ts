import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "es", "de"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLang = pathname.split("/")[1];
  if (pathLang && LOCALES.includes(pathLang)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|admin|.*\\..*).*)"],
};

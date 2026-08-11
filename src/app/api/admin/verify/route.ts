import { verifyAdminToken } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token: string | undefined =
    body?.token ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!token) {
    return Response.json({ authorized: false }, { status: 401 });
  }

  const admin = await verifyAdminToken(token);
  if (!admin) {
    return Response.json({ authorized: false }, { status: 403 });
  }

  return Response.json({
    authorized: true,
    email: admin.email ?? null,
    role: admin.role ?? null,
  });
}

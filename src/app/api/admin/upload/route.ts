import { adminClient, requireAdmin, serviceClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

function tokenOf(request: NextRequest) {
  return request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!file || typeof file === "string") {
    return Response.json({ error: "No se recibió ningún archivo" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-") || "file";
  const path = `${Date.now()}-${safeName}`;

  // La service_role key (si existe) evita errores de RLS en Storage. Esta
  // ruta ya está protegida por requireAdmin, así que es seguro usarla.
  // Si no hay service role, se intenta como usuario autenticado (requiere
  // los policies de supabase_admin_migration.sql).
  const client = serviceClient() ?? adminClient(tokenOf(request));
  const { data, error } = await client.storage
    .from("uploads")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) {
    const message = /policy|row-level|permission|denied|rls/i.test(error.message)
      ? `${error.message} — Solución: añade SUPABASE_SERVICE_ROLE_KEY a .env.local o ejecuta los policies de Storage del archivo supabase_admin_migration.sql.`
      : error.message;
    return Response.json({ error: message }, { status: 500 });
  }

  const { data: pub } = client.storage.from("uploads").getPublicUrl(data.path);
  return Response.json({ path: `/uploads/${data.path}`, url: pub.publicUrl });
}

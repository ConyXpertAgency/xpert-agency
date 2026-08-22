import { adminClient, requireAdmin, serviceClient } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

function tokenOf(request: NextRequest) {
  return request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
}

const IMAGE_RE = /\.(png|jpe?g|gif|svg|webp|avif|bmp)$/i;

// Lista todas las imágenes subidas al bucket "uploads" (más recientes primero)
// para la galería del modal de imágenes del panel admin.
export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const client = serviceClient() ?? adminClient(tokenOf(request));
  const { data, error } = await client.storage
    .from("uploads")
    .list("", { limit: 300, sortBy: { column: "created_at", order: "desc" } });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  const images = (data ?? [])
    .filter((file) => file.name && !file.name.endsWith("/") && IMAGE_RE.test(file.name))
    .map((file) => ({
      name: file.name,
      path: `/uploads/${file.name}`,
      url: client.storage.from("uploads").getPublicUrl(file.name).data.publicUrl,
    }));

  return Response.json({ images });
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

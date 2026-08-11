import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function adminClient(token: string) {
  return createClient(url ?? "", anonKey ?? "", {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Cliente con la service_role key: se usa SOLO en rutas que ya validaron al
// admin (requireAdmin) para operaciones que RLS bloquearía (p.ej. subir
// archivos a Storage). La service_role bypassa RLS.
export function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export interface AdminSession {
  id: string;
  email?: string;
  role?: string | null;
}

export async function verifyAdminToken(token: string): Promise<AdminSession | null> {
  if (!token || !url || !anonKey) return null;
  const client = adminClient(token);
  const {
    data: { user },
  } = await client.auth.getUser(token);
  if (!user) return null;

  const { data: legacy } = await client
    .from("legacy_users")
    .select("email, migrated_to, role");

  if (!legacy) return null;
  const match = legacy.find(
    (r) =>
      (r.email && user.email && r.email === user.email) ||
      (r.migrated_to && user.id === r.migrated_to)
  );
  if (!match) return null;

  return { id: user.id, email: user.email ?? undefined, role: match.role ?? null };
}

export async function requireAdmin(request: Request): Promise<AdminSession | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  return verifyAdminToken(token);
}

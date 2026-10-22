import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function adminClient(token: string) {
  return createClient(url ?? "", anonKey ?? "", {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// Cliente con la service_role key. Solo se usa en el servidor después de
// validar el token de Auth, para consultar el rol de administración y para
// operaciones que RLS bloquearía. La service_role bypassa RLS.
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

  try {
    const client = adminClient(token);
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser(token);
    if (authError || !user) return null;

    // Prefer the stable Auth user ID after migration. Fall back to the exact
    // email match for legacy rows that have not been linked yet. Limit each
    // lookup and reject ambiguous records instead of choosing one arbitrarily.
    // Existing deployments can read their own legacy role through RLS.
    // Use that authenticated client when no server key is configured; query
    // failures still reject access, and the same explicit role check applies.
    const roleClient = serviceClient() ?? client;

    const columns = "email, migrated_to, role";
    const { data: migratedRows, error: migratedError } = await roleClient
      .from("legacy_users")
      .select(columns)
      .eq("migrated_to", user.id)
      .limit(2);
    if (migratedError || !migratedRows || migratedRows.length > 1) return null;

    let match = migratedRows[0] ?? null;
    if (!match && user.email) {
      const { data: emailRows, error: emailError } = await roleClient
        .from("legacy_users")
        .select(columns)
        .eq("email", user.email)
        .limit(2);
      if (emailError || !emailRows || emailRows.length > 1) return null;
      match = emailRows[0] ?? null;
    }

    // The CMS is for authorized content editors as well as administrators.
    // Roles come from the server-side table, never user-editable metadata.
    const role = typeof match?.role === "string" ? match.role.trim().toLowerCase() : "";
    if (!["admin", "editor"].includes(role) || (match?.migrated_to && match.migrated_to !== user.id)) {
      return null;
    }

    return { id: user.id, email: user.email ?? undefined, role };
  } catch {
    // Fail closed if Auth or the role lookup is unavailable.
    return null;
  }
}

export async function requireAdmin(request: Request): Promise<AdminSession | null> {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return null;
  return verifyAdminToken(token);
}

"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let _admin: SupabaseClient | null = null;

export function getAdminClient(): SupabaseClient {
  if (!_admin) {
    if (!url || !anonKey) {
      throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local");
    }
    _admin = createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: "xpert-admin-session" },
    });
  }
  return _admin;
}

export async function getAccessToken(): Promise<string | null> {
  const { data } = await getAdminClient().auth.getSession();
  return data.session?.access_token ?? null;
}

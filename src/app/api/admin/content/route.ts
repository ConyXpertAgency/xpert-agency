import { revalidatePath } from "next/cache";
import { getSectionLanguages, LANGS } from "@/lib/adminSchema";
import { getEditorContentRows } from "@/lib/adminContent";
import { isPlainAdminField, validateContactTeamsPlainText } from "@/lib/adminTextPolicy";
import { sanitizeAdminRichText } from "@/lib/adminRichText";
import { adminClient, requireAdmin } from "@/lib/supabase/server";
import type { ContentRow } from "@/lib/supabase/types";
import type { NextRequest } from "next/server";

const supportedLanguages = new Set<string>(LANGS);

function tokenOf(request: NextRequest) {
  return request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
}

function unsafeChangedText(next: unknown, previous: unknown, collection: string, keyname: string, path: string[] = []): string | null {
  if (typeof next === "string") {
    if (next === previous) return null;
    const unsafe = isPlainAdminField(collection, keyname, path)
      ? validateContactTeamsPlainText({ value: next }) !== null
      : /<\s*\/?\s*[a-z]|&(?:#[0-9]+|[a-z][a-z0-9]+);/i.test(next) && sanitizeAdminRichText(next) !== next;
    return unsafe ? path.join(".") : null;
  }
  if (Array.isArray(next)) {
    for (let i = 0; i < next.length; i++) {
      const problem = unsafeChangedText(next[i], Array.isArray(previous) ? previous[i] : undefined, collection, keyname, [...path, String(i)]);
      if (problem) return problem;
    }
  } else if (next && typeof next === "object") {
    for (const [key, value] of Object.entries(next)) {
      const prior = previous && typeof previous === "object" && !Array.isArray(previous)
        ? (previous as Record<string, unknown>)[key] : undefined;
      const problem = unsafeChangedText(value, prior, collection, keyname, [...path, key]);
      if (problem) return problem;
    }
  }
  return null;
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const { data, error } = await adminClient(tokenOf(request))
    .from("content")
    .select("*")
    .in("lang", [...LANGS])
    .order("collection", { ascending: true })
    .order("keyname", { ascending: true })
    .order("lang", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  const rows = await getEditorContentRows((data ?? []) as ContentRow[]);
  return Response.json({ rows });
}

export async function PUT(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.collection !== "string" || typeof body.keyname !== "string" || typeof body.lang !== "string" || !supportedLanguages.has(body.lang)) {
    return Response.json({ error: "collection, keyname y lang son obligatorios" }, { status: 400 });
  }
  if (body.data === null || body.data === undefined || typeof body.data !== "object") {
    return Response.json({ error: "data debe ser un objeto o array JSON" }, { status: 400 });
  }
  if (!getSectionLanguages(body.collection).some((lang) => lang === body.lang)) {
    return Response.json({ error: "Esta página se administra únicamente en inglés." }, { status: 400 });
  }

  // An explicit editor save owns the complete list, including deletions.
  const contentData = body.collection === "nav" && body.keyname === "items" && Array.isArray(body.data)
    ? { items: body.data, editor_managed: true }
    : body.collection === "cases" && body.keyname === "studies" && Array.isArray(body.data.items)
    ? { ...body.data, include_default_cases: false }
    : body.data;

  if (body.collection === "contact" && body.keyname === "teams") {
    const invalidPath = validateContactTeamsPlainText(contentData);
    if (invalidPath) {
      return Response.json({ error: `El campo ${invalidPath} debe contener texto sin HTML.` }, { status: 400 });
    }
  }

  const client = adminClient(tokenOf(request));
  const { data: existing, error: readError } = await client.from("content")
    .select("data")
    .eq("collection", body.collection)
    .eq("keyname", body.keyname)
    .eq("lang", body.lang)
    .maybeSingle();
  if (readError) return Response.json({ error: readError.message }, { status: 500 });
  const unsafePath = unsafeChangedText(contentData, existing?.data, body.collection, body.keyname);
  if (unsafePath) {
    return Response.json({ error: `El campo ${unsafePath} contiene HTML no permitido.` }, { status: 400 });
  }

  const { error } = await client
    .from("content")
    .upsert(
      {
        collection: body.collection,
        keyname: body.keyname,
        lang: body.lang,
        data: contentData,
        order_index: typeof body.order_index === "number" ? body.order_index : 0,
      },
      { onConflict: "collection,keyname,lang" }
    );

  if (error) return Response.json({ error: error.message }, { status: 500 });

  // Public locale pages are statically generated. Expire their route tree so
  // the next public visit renders the saved CMS content from Supabase.
  revalidatePath("/[locale]", "layout");
  return Response.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.collection !== "string" || typeof body.keyname !== "string" || typeof body.lang !== "string" || !supportedLanguages.has(body.lang)) {
    return Response.json({ error: "collection, keyname y lang son obligatorios" }, { status: 400 });
  }

  const { error } = await adminClient(tokenOf(request))
    .from("content")
    .delete()
    .eq("collection", body.collection)
    .eq("keyname", body.keyname)
    .eq("lang", body.lang);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  // A removed CMS block also needs to regenerate pages that consumed it.
  revalidatePath("/[locale]", "layout");
  return Response.json({ ok: true });
}

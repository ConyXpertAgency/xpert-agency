import { adminClient, requireAdmin } from "@/lib/supabase/server";
import type { NextRequest } from "next/server";

function tokenOf(request: NextRequest) {
  return request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const { data, error } = await adminClient(tokenOf(request))
    .from("content")
    .select("*")
    .order("collection", { ascending: true })
    .order("keyname", { ascending: true })
    .order("lang", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ rows: data });
}

export async function PUT(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.collection !== "string" || typeof body.keyname !== "string" || typeof body.lang !== "string") {
    return Response.json({ error: "collection, keyname y lang son obligatorios" }, { status: 400 });
  }
  if (body.data === null || body.data === undefined || typeof body.data !== "object") {
    return Response.json({ error: "data debe ser un objeto o array JSON" }, { status: 400 });
  }

  const { error } = await adminClient(tokenOf(request))
    .from("content")
    .upsert(
      {
        collection: body.collection,
        keyname: body.keyname,
        lang: body.lang,
        data: body.data,
        order_index: typeof body.order_index === "number" ? body.order_index : 0,
      },
      { onConflict: "collection,keyname,lang" }
    );

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return Response.json({ error: "forbidden" }, { status: 403 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.collection !== "string" || typeof body.keyname !== "string" || typeof body.lang !== "string") {
    return Response.json({ error: "collection, keyname y lang son obligatorios" }, { status: 400 });
  }

  const { error } = await adminClient(tokenOf(request))
    .from("content")
    .delete()
    .eq("collection", body.collection)
    .eq("keyname", body.keyname)
    .eq("lang", body.lang);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}

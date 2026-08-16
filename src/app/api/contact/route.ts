import { Resend } from "resend";
import type { NextRequest } from "next/server";

interface ContactBody {
  name?: string;
  cname?: string;
  email?: string;
  topic?: string;
  message?: string;
}

const REQUIRED = ["name", "cname", "email", "message"] as const;

const renderValue = (label: string, value?: string) =>
  `<p style="margin:0 0 12px;color:#333;"><strong style="display:inline-block;min-width:110px;">${label}:</strong>${value || "—"}</p>`;

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as ContactBody | null;

  if (!body) {
    return Response.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const missing = REQUIRED.filter((key) => !body[key]?.trim());
  if (missing.length > 0) {
    return Response.json(
      { ok: false, error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 },
    );
  }

  const recipient = process.env.CONTACT_EMAIL?.trim() || "contacto@xpert.agency";
  const from = process.env.RESEND_FROM?.trim() || "Xpert Agency <onboarding@resend.dev>";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { ok: false, error: "Email service is not configured (missing RESEND_API_KEY)" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2 style="margin:0 0 16px;color:#111;">Nuevo mensaje de contacto</h2>
    ${renderValue("Nombre", body.name)}
    ${renderValue("Empresa", body.cname)}
    ${renderValue("Correo", body.email)}
    ${renderValue("Interés", body.topic)}
    <p style="margin:16px 0 4px;color:#333;"><strong>Mensaje</strong></p>
    <p style="margin:0;padding:12px;background:#f5f5f5;border-radius:8px;color:#333;white-space:pre-wrap;">${body.message}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: body.email,
      subject: `Nuevo mensaje de contacto de ${body.name}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }
}

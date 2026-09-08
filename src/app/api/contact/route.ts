import { Resend } from "resend";
import type { NextRequest } from "next/server";

interface ContactBody {
  name?: string;
  cname?: string;
  email?: string;
  topic?: string;
  message?: string;
  contactId?: string;
  contactLabel?: string;
  lang?: string;
}

const REQUIRED = ["name", "cname", "email", "message"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ConfirmLang = "en" | "es" | "de";

const normalizeLang = (lang?: string): ConfirmLang =>
  lang === "es" ? "es" : lang === "de" ? "de" : "en";

const confirmationCopy = (lang: ConfirmLang) => {
  switch (lang) {
    case "es":
      return {
        subject: "Hemos recibido tu solicitud — Xpert Agency",
        greeting: "Hola",
        thanks: "Gracias por contactar a Xpert Agency.",
        received:
          "Hemos recibido tu solicitud y nuestro equipo la revisará en breve. Normalmente respondemos en 1 día hábil.",
        summary: "Resumen",
        company: "Empresa",
        interest: "Área de interés",
        messageLabel: "Mensaje",
        regards: "Saludos cordiales",
      };
    case "de":
      return {
        subject: "Wir haben Ihre Anfrage erhalten — Xpert Agency",
        greeting: "Hallo",
        thanks: "Vielen Dank für Ihre Kontaktaufnahme mit Xpert Agency.",
        received:
          "Wir haben Ihre Anfrage erhalten und unser Team wird sie in Kürze prüfen. In der Regel antworten wir innerhalb eines Werktages.",
        summary: "Zusammenfassung",
        company: "Unternehmen",
        interest: "Interessengebiet",
        messageLabel: "Nachricht",
        regards: "Mit freundlichen Grüßen",
      };
    default:
      return {
        subject: "We've received your request — Xpert Agency",
        greeting: "Hi",
        thanks: "Thank you for contacting Xpert Agency.",
        received:
          "We've received your request and our team will review it shortly. We typically respond within 1 business day.",
        summary: "Summary",
        company: "Company",
        interest: "Area of interest",
        messageLabel: "Message",
        regards: "Best regards",
      };
  }
};

const escapeHtml = (value?: string) =>
  (value || "-").replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

const renderValue = (label: string, value?: string) =>
  `<p style="margin:0 0 12px;color:#333;"><strong style="display:inline-block;min-width:110px;">${label}:</strong>${escapeHtml(value)}</p>`;

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

  const email = (body.email ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Invalid email address" }, { status: 400 });
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
  const lang = normalizeLang(body.lang);
  const topic = body.topic?.trim() ? body.topic : undefined;

  const internalHtml = `
    <h2 style="margin:0 0 16px;color:#111;">Nuevo mensaje de contacto</h2>
    ${renderValue("Nombre", body.name)}
    ${renderValue("Empresa", body.cname)}
    ${renderValue("Correo", email)}
    ${body.contactLabel?.trim() ? renderValue("Región / Equipo", body.contactLabel) : ""}
    ${renderValue("Interés", topic)}
    <p style="margin:16px 0 4px;color:#333;"><strong>Mensaje</strong></p>
    <p style="margin:0;padding:12px;background:#f5f5f5;border-radius:8px;color:#333;white-space:pre-wrap;">${escapeHtml(body.message)}</p>
  `;

  try {
    // A) Correo interno: si falla, todo falla (500). Éxito solo con
    // receipt explícito de Resend (data.id).
    const internal = await resend.emails.send({
      from,
      to: [recipient],
      replyTo: email,
      subject: `Nuevo mensaje de contacto de ${body.name}`,
      html: internalHtml,
    });

    if (internal.error || !internal.data?.id) {
      console.error("Resend error:", internal.error ?? "missing receipt id");
      return Response.json({ ok: false, error: "Failed to send email" }, { status: 500 });
    }

    // B) Confirmación al visitante: best-effort DESPUÉS del interno.
    // Si falla, NO se convierte en error: el mensaje principal ya salió
    // y un retry del usuario no debe duplicarlo. Solo se registra.
    const t = confirmationCopy(lang);
    const name = escapeHtml(body.name);
    const confirmationHtml = `
      <p style="margin:0 0 12px;color:#111;">${t.greeting} ${name},</p>
      <p style="margin:0 0 12px;color:#333;">${t.thanks}</p>
      <p style="margin:0 0 16px;color:#333;">${t.received}</p>
      <p style="margin:0 0 8px;color:#111;"><strong>${t.summary}:</strong></p>
      ${renderValue(t.company, body.cname)}
      ${renderValue(t.interest, topic)}
      <p style="margin:0 0 4px;color:#333;"><strong>${t.messageLabel}</strong></p>
      <p style="margin:0;padding:12px;background:#f5f5f5;border-radius:8px;color:#333;white-space:pre-wrap;">${escapeHtml(body.message)}</p>
      <p style="margin:16px 0 0;color:#333;">${t.regards},<br/>Xpert Agency</p>
    `;

    let confirmationId: string | null = null;
    try {
      const conf = await resend.emails.send({
        from,
        to: [email],
        replyTo: recipient,
        subject: t.subject,
        html: confirmationHtml,
      });
      if (!conf.error && conf.data?.id) confirmationId = conf.data.id;
      else console.error("Resend confirmation error:", conf.error ?? "missing receipt id");
    } catch (confErr) {
      console.error("Resend confirmation error:", confErr);
    }

    return Response.json({ ok: true, internalId: internal.data.id, confirmationId });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }
}

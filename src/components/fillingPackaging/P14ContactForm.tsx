"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "@/styles/fillingPackaging/FillingPackaging.module.css";

export default function P14ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim(),
      cname: String(form.get("cname") || "").trim(),
      email: String(form.get("email") || "").trim(),
      topic: "", // P14 not asking topic, keep compatible with /api/contact
      message: String(form.get("message") || "").trim(),
    };

    // reuse same validation as /api/contact (REQUIRED: name, cname, email, message)
    if (!payload.name || !payload.cname || !payload.email || !payload.message) {
      setStatus("error");
      setError("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.P14FormCard}>
      {/* decorative X behind form — low opacity, not competing */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/x.png" alt="" aria-hidden="true" className={styles.P14FormX} />
      <div className={styles.P14FormInner}>
        <h3 className={styles.P14FormTitle}>Send inquiry</h3>
        <p className={styles.P14FormSubtitle}>Tell us about your line, challenge and timeline.</p>
        <form onSubmit={handleSubmit} className={styles.P14Form} noValidate>
          <label className={styles.P14Field}>
            <span>Name *</span>
            <input name="name" placeholder="Your name" required type="text" autoComplete="name" />
          </label>
          <label className={styles.P14Field}>
            <span>Company *</span>
            <input name="cname" placeholder="Company name" required type="text" autoComplete="organization" />
          </label>
          <label className={styles.P14Field}>
            <span>Email *</span>
            <input name="email" placeholder="you@company.com" required type="email" autoComplete="email" />
          </label>
          <label className={styles.P14Field}>
            <span>Message *</span>
            <textarea name="message" placeholder="Project brief, scope and goals..." required rows={4} />
          </label>

          {status === "sending" && <p className={styles.P14Status}>Sending…</p>}
          {status === "success" && <p className={styles.P14StatusSuccess}>Message sent! We will reply soon.</p>}
          {status === "error" && <p className={styles.P14StatusError}>{error}</p>}

          <Button type="submit" variant="full" arrow>
            {status === "sending" ? "Sending…" : "Send inquiry"}
          </Button>
          <p className={styles.P14Privacy}>By submitting, you agree to our Privacy Policy.</p>
        </form>
      </div>
    </div>
  );
}

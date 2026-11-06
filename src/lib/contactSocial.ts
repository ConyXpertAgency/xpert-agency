import type { RegionalContact } from "@/lib/supabase/types";

const digits = (value: string) => value.replace(/\D/g, "");

/** Only numbers approved for WhatsApp, never every phone in a contact card. */
export function approvedWhatsAppHref(contact: Pick<RegionalContact, "id" | "phones">): string | undefined {
  const approved = contact.id === "maria-concepcion-lona-romero"
    ? "525534315953"
    : contact.id === "elmar-a-beckord"
      ? "491718892788"
      : undefined;
  if (!approved || !contact.phones?.some((phone) => digits(phone) === approved)) return undefined;
  return `https://wa.me/${approved}`;
}

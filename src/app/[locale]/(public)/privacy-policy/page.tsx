import { connection } from "next/server";
import { locale } from "next/root-params";
import type { Metadata } from "next";
import LegalDraftPage from "@/components/legal/LegalDraftPage";
import { isValidLocale } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy - draft",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function Page() {
  await connection();
  const raw = (await locale()) as string;
  return <LegalDraftPage lang={isValidLocale(raw) ? raw : "en"} kind="privacy-policy" />;
}

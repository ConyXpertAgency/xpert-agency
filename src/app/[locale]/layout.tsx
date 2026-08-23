import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locale } from "next/root-params";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import { getNav, getAvailableLangs } from "@/lib/data";
import type { Lang } from "@/lib/supabase/types";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  const langs = await getAvailableLangs();
  return langs.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = (await locale()) as Lang;
  const langs = await getAvailableLangs();
  return {
    title: "Xpert.agency",
    description: "Experts for integrated manufacturing & logistics improvement",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://localhost:3000"),
    alternates: {
      languages: Object.fromEntries(langs.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      locale:
        lang.startsWith("es")
          ? "es_ES"
          : lang.startsWith("de")
            ? "de_DE"
            : lang.startsWith("en")
              ? "en_US"
              : `${lang}_${lang.toUpperCase()}`,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = (await locale()) as Lang;
  const [nav, langs] = await Promise.all([getNav(lang), getAvailableLangs()]);
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar lang={lang} items={nav} langs={langs} />
        {children}
      </body>
    </html>
  );
}

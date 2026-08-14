import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locale } from "next/root-params";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import { getNav, LOCALES } from "@/lib/data";
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
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await locale();
  return {
    title: "Xpert.agency",
    description: "Experts for integrated manufacturing & logistics improvement",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://localhost:3000"),
    alternates: {
      languages: {
        en: "/en",
        es: "/es",
        de: "/de",
      },
    },
    icons: {
      icon: "/isotipo_xpert.png",
      apple: "/isotipo_xpert.png",
    },
    openGraph: {
      locale: lang === "es" ? "es_ES" : lang === "de" ? "de_DE" : "en_US",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = (await locale()) as Lang;
  const nav = await getNav(lang);
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar lang={lang} items={nav} />
        {children}
      </body>
    </html>
  );
}

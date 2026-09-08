import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { locale } from "next/root-params";
import { notFound } from "next/navigation";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import PublicFooter from "@/components/ui/PublicFooter";
import { getNav, getAvailableLangs, getSettings } from "@/lib/data";
import { SITE_URL, isValidLocale } from "@/lib/site";
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
  return langs.filter(isValidLocale).map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const raw = (await locale()) as string;
  if (!isValidLocale(raw)) notFound();
  const lang = raw;
  return {
    title: {
      default: "Xpert Agency",
      template: "%s | Xpert Agency",
    },
    description: "Experts for integrated manufacturing & logistics improvement",
    metadataBase: new URL(SITE_URL),
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
  const raw = (await locale()) as string;
  if (!isValidLocale(raw)) notFound();
  const lang = raw as Lang;
  const [nav, langs, settings] = await Promise.all([
    getNav(lang),
    getAvailableLangs(),
    getSettings(lang),
  ]);
  // Structured data global. sameAs se omite: el CMS no tiene perfiles
  // sociales confirmados. contactPoint sale del CMS y se omite si está vacío.
  const contactEmail = (settings.contact_email ?? "").trim();
  const contactPhone = (settings.whatsapp ?? "").replace(/[^\d+]/g, "");
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Xpert Agency",
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    ...(contactEmail || contactPhone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            ...(contactEmail ? { email: contactEmail } : {}),
            ...(contactPhone ? { telephone: contactPhone } : {}),
            contactType: "sales",
          },
        }
      : {}),
  };
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json">{JSON.stringify(organization)}</script>
        <Navbar lang={lang} items={nav} langs={langs} />
        {children}
        <PublicFooter lang={lang} nav={nav} settings={settings} />
      </body>
    </html>
  );
}

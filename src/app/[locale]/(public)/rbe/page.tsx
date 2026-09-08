import { locale } from "next/root-params";
import type { Metadata } from "next";
import First from '@/components/rbe/First'
import Five from '@/components/rbe/Five'
import Footer from '@/components/rbe/Footer'
import Four from '@/components/rbe/Four'
import Second from '@/components/rbe/Second'
import Third from '@/components/rbe/Third'
import { getRbeFirst, getRbeSecond, getRbeThird, getRbeFour, getRbeFive, getRbeFooter } from "@/lib/data";
import { isValidLocale, pageMetadata } from "@/lib/site";
import type { Lang } from "@/lib/supabase/types";

const META = {
  en: {
    title: "RBE™ Ramp-up & Risk Mitigation",
    description:
      "RBE™ interim management: prepare, safeguard and preform — elevate performance safely and quickly.",
  },
  es: {
    title: "RBE™ Ramp-up y mitigación de riesgos",
    description:
      "Interim management RBE™: preparar, proteger y rendir — eleva el desempeño de forma segura y rápida.",
  },
  de: {
    title: "RBE™ Ramp-up & Risikominderung",
    description:
      "RBE™ Interim-Management: vorbereiten, absichern, leisten – Leistung sicher und schnell steigern.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const raw = (await locale()) as string;
  const lang = isValidLocale(raw) ? raw : "en";
  const t = META[lang];
    return pageMetadata({ lang, path: "/rbe", title: t.title, description: t.description, englishOnly: true });
}

const page = async () => {
  const lang = (await locale()) as Lang;
  const [first, second, third, four, five, footer] = await Promise.all([
    getRbeFirst(lang),
    getRbeSecond(lang),
    getRbeThird(lang),
    getRbeFour(lang),
    getRbeFive(lang),
    getRbeFooter(lang),
  ]);
  return (
    <main className='AppShell RbePage'>
        <First first={first} lang={lang} />
        <Second second={second} />
        <Third third={third} />
        <Four four={four} />
        <Five five={five} />
        <Footer footer={footer} lang={lang} />
    </main>
  )
}

export default page

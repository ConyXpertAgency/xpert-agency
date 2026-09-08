import { locale } from "next/root-params";
import type { Metadata } from "next";
import { First, Second } from '@/components/about'
import { getAboutFirst, getAboutSecond } from "@/lib/data";
import { isValidLocale, pageMetadata } from "@/lib/site";
import type { Lang } from "@/lib/supabase/types";

const META = {
  en: {
    title: "About us",
    description:
      "Who we are: deep manufacturing, logistics and supply chain expertise, from strategy to implementation and continuous improvement.",
  },
  es: {
    title: "Quiénes somos",
    description:
      "Quiénes somos: experiencia en manufactura, logística y cadena de suministro, de la estrategia a la mejora continua.",
  },
  de: {
    title: "Über uns",
    description:
      "Wer wir sind: fundierte Expertise in Fertigung, Logistik und Supply Chain – von der Strategie bis zur kontinuierlichen Verbesserung.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const raw = (await locale()) as string;
  const lang = isValidLocale(raw) ? raw : "en";
  const t = META[lang];
  return pageMetadata({ lang, path: "/about", title: t.title, description: t.description });
}

const page = async () => {
  const lang = (await locale()) as Lang;
  const [first, second] = await Promise.all([
    getAboutFirst(lang),
    getAboutSecond(lang),
  ]);
  return (
    <main className='AppShell'>
        <First first={first} />
        <Second second={second} heroStats={first.stats} lang={lang} />
    </main>
  )
}

export default page

import { locale } from "next/root-params";
import type { Metadata } from "next";
import { First, Four, HomeFinalCta, Second, Third } from "@/components/home";
import HomeFillingPackagingBanner from "@/components/home/HomeFillingPackagingBanner";
import { getHomeFinalCta, getHomeGlobalReach, getHomeHero, getHomePartners, getHomeRoles } from "@/lib/data";
import { isValidLocale, pageMetadata } from "@/lib/site";
import { expertiseGroups } from "@/lib/expertiseGroups";
import type { Lang } from "@/lib/supabase/types";

const META = {
  en: {
    description:
      "Experts for integrated manufacturing & logistics improvement, delivering projects across Europe, the Americas and Asia.",
  },
  es: {
    description:
      "Expertos en mejora integral de manufactura y logística, con proyectos en Europa, América y Asia.",
  },
  de: {
    description:
      "Experten für integrierte Verbesserung von Fertigung und Logistik – mit Projekten in Europa, Amerika und Asien.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const raw = (await locale()) as string;
  const lang = isValidLocale(raw) ? raw : "en";
  return pageMetadata({ lang, path: "", description: META[lang].description });
}

export default async function Home() {
  const lang = (await locale()) as Lang;

  const [hero, partners, globalReach, roles, finalCta] = await Promise.all([
    getHomeHero(lang),
    getHomePartners(lang),
    getHomeGlobalReach(lang),
    getHomeRoles(lang),
    getHomeFinalCta(lang),
  ]);

  return (
    <main className="AppShell">
      <First hero={hero} />
      <Second partners={partners} lang={lang} />
      <Third globalReach={globalReach} />
      <Four roles={roles} groups={roles.groups ?? expertiseGroups} lang={lang} />
      <HomeFillingPackagingBanner />
      <HomeFinalCta lang={lang} data={finalCta} />
    </main>
  );
}

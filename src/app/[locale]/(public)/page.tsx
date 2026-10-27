import { locale } from "next/root-params";
import type { Metadata } from "next";
import { First, Four, HomeFinalCta, Second, Third } from "@/components/home";
import TrustBand from "@/components/home/TrustBand";
import HomeFillingPackagingBanner from "@/components/home/HomeFillingPackagingBanner";
import { getHomeFinalCta, getHomeFillingBanner, getHomeGlobalReach, getHomeHero, getHomePartners, getHomeRoles, getHomeTrustBand, getPageSeo } from "@/lib/data";
import { getTrustBandLogos } from "@/lib/industryLogos";
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
  const seo = await getPageSeo(lang, "home", { title: "Xpert Agency", ...META[lang] });
  return {
    ...pageMetadata({ lang, path: "", title: seo.title, description: seo.description }),
    title: { absolute: seo.title },
  };
}

export default async function Home() {
  const lang = (await locale()) as Lang;

  const [hero, partners, globalReach, roles, finalCta, trustBand, fillingBanner, trustLogos] = await Promise.all([
    getHomeHero(lang),
    getHomePartners(lang),
    getHomeGlobalReach(lang),
    getHomeRoles(lang),
    getHomeFinalCta(lang),
    getHomeTrustBand(lang),
    getHomeFillingBanner(lang),
    getTrustBandLogos(lang),
  ]);

  const logos = trustBand.show_logos ? (trustBand.logos.length ? trustBand.logos : trustLogos) : [];

  return (
    <main className="AppShell">
      <First hero={hero} />
      <TrustBand logos={logos} caption={trustBand.caption} />
      <Second partners={partners} lang={lang} />
      <Third globalReach={globalReach} lang={lang} />
      <Four roles={roles} groups={roles.groups ?? expertiseGroups} lang={lang} />
      <HomeFillingPackagingBanner data={fillingBanner} lang={lang} />
      <HomeFinalCta lang={lang} data={finalCta} />
    </main>
  );
}

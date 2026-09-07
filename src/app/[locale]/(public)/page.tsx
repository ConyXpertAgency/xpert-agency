import { locale } from "next/root-params";
import { First, Four, HomeFinalCta, Second, Third } from "@/components/home";
import HomeFillingPackagingBanner from "@/components/home/HomeFillingPackagingBanner";
import { getHomeFinalCta, getHomeGlobalReach, getHomeHero, getHomePartners, getHomeRoles } from "@/lib/data";
import { expertiseGroups } from "@/lib/expertiseGroups";
import type { Lang } from "@/lib/supabase/types";

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
      <HomeFillingPackagingBanner lang={lang} />
      <HomeFinalCta lang={lang} data={finalCta} />
    </main>
  );
}

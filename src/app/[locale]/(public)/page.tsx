import { locale } from "next/root-params";
import { First, Four, Second, Third } from "@/components/home";
import { getHomeGlobalReach, getHomeHero, getHomePartners, getHomeRoles } from "@/lib/data";
import type { Lang } from "@/lib/supabase/types";

export default async function Home() {
  const lang = (await locale()) as Lang;

  const [hero, partners, globalReach, roles] = await Promise.all([
    getHomeHero(lang),
    getHomePartners(lang),
    getHomeGlobalReach(lang),
    getHomeRoles(lang),
  ]);

  return (
    <main className="AppShell">
      <First hero={hero} />
      <Second partners={partners} lang={lang} />
      <Third globalReach={globalReach} />
      <Four roles={roles} />
    </main>
  );
}

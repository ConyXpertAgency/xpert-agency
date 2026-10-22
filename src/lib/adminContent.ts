import * as content from "./data";
import { getSectionLanguages, isUsedSection, USED_SECTIONS } from "./adminSchema";
import { getTrustBandLogos } from "./industryLogos";
import { SEO_DEFAULTS, type SeoEntry } from "./seoDefaults";
import type { ContentRow, Lang } from "./supabase/types";

type Resolver = (lang: Lang, reader: content.ContentReader) => Promise<unknown>;

const resolvers: Record<string, Record<string, Resolver>> = {
  home: {
    hero: content.getHomeHero,
    partners: content.getHomePartners,
    global_reach: content.getHomeGlobalReach,
    roles: content.getHomeRoles,
    final_cta: content.getHomeFinalCta,
    trust_band: async (lang, reader) => {
      const data = await content.getHomeTrustBand(lang, reader);
      return { ...data, logos: await getTrustBandLogos(lang, data.logos, reader) };
    },
    filling_banner: content.getHomeFillingBanner,
  },
  about: { first: content.getAboutFirst, second: content.getAboutSecond },
  services: { page: content.getServicesPage },
  industries: {
    page: async (lang, reader) => {
      const data = await content.getIndustriesPage(lang, reader);
      return { ...data, marquee_logos: await getTrustBandLogos(lang, data.marquee_logos, reader) };
    },
  },
  cases: { page: content.getCasesPage, studies: content.getCasesStudies, clients: content.getCasesClients },
  contact: { page: content.getContactPage, teams: content.getContactTeams },
  rbe: {
    first: content.getRbeFirst,
    second: content.getRbeSecond,
    third: content.getRbeThird,
    four: content.getRbeFour,
    five: content.getRbeFive,
    footer: content.getRbeFooter,
  },
  filling_packaging: { page: content.getFillingPackagingPage },
  nav: { items: content.getNav },
  settings: {
    general: content.getSettings,
    seo: async (lang, reader) => {
      const raw = await reader("settings", "seo", lang);
      return Object.fromEntries(Object.entries(SEO_DEFAULTS[lang])
        .filter(([page]) => lang === "en" || !["rbe", "filling_packaging"].includes(page))
        .map(([page, fallback]) => {
          const saved = raw?.[page];
          const value = saved && typeof saved === "object" && !Array.isArray(saved) ? saved as Partial<SeoEntry> : {};
          return [page, {
            title: typeof value.title === "string" && value.title.trim() ? value.title : fallback.title,
            description: typeof value.description === "string" && value.description.trim() ? value.description : fallback.description,
          }];
        }));
    },
  },
};

const rowKey = (collection: string, keyname: string, lang: Lang) => JSON.stringify([collection, keyname, lang]);

/** Resolve the same values as the public pages using one already-authorized read.
 * This prepares editor data only; it does not create or update database rows. */
export async function getEditorContentRows(savedRows: ContentRow[]): Promise<ContentRow[]> {
  const byKey = new Map(savedRows.map((row) => [rowKey(row.collection, row.keyname, row.lang), row]));
  const reader: content.ContentReader = async (collection, keyname, lang) => {
    const row = byKey.get(rowKey(collection, keyname, lang)) ?? byKey.get(rowKey(collection, keyname, "en"));
    return row?.data ?? null;
  };

  const current = await Promise.all(Object.entries(USED_SECTIONS).flatMap(([collection, keys]) =>
    keys.flatMap((keyname) => getSectionLanguages(collection).map(async (lang): Promise<ContentRow> => {
      const resolve = resolvers[collection]?.[keyname];
      if (!resolve) throw new Error(`Missing CMS resolver: ${collection}/${keyname}`);
      const saved = byKey.get(rowKey(collection, keyname, lang));
      const fallback = byKey.get(rowKey(collection, keyname, "en"));
      return {
        collection,
        keyname,
        lang,
        data: await resolve(lang, reader) as Record<string, unknown>,
        order_index: saved?.order_index ?? 0,
        is_default: !saved,
        ...(!saved && fallback && lang !== "en" ? { copied_from: "en" as const } : {}),
      };
    }))
  ));
  const archived = savedRows.filter((row) =>
    !isUsedSection(row.collection, row.keyname) && getSectionLanguages(row.collection).includes(row.lang)
  );
  return [...current, ...archived];
}

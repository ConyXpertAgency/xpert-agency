import { locale } from "next/root-params";
import Image from "next/image";
import type { Metadata } from "next";
import CardContent from '@/components/cases/CardContent'
import LaCostenaFeature from "@/components/home/LaCostenaFeature";
import CaseStudyList from '@/components/cases/CaseStudyList'
import ClientExperienceList from '@/components/cases/ClientExperienceList'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import styles from '@/styles/cases/Cases.module.css'
import theme from '@/styles/theme/SurfaceThemes.module.css'
import { getIcon } from '@/lib/supabase/icons'
import { getCasesClients, getCasesPage, getCasesStudies, getPageSeo } from "@/lib/data";
import { isValidLocale, pageMetadata } from "@/lib/site";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import type { Lang } from "@/lib/supabase/types";
import { publicCaseClients } from "@/lib/publicCaseClients";
import { resolveStorageUrl } from "@/lib/supabase/client";

const LA_COSTENA_ID = "la-costena-mexico-distribution";
const featuredMexico = { en: "Featured Case · Mexico", es: "Caso destacado · México", de: "Referenzprojekt · Mexiko" };

const META = {
  en: {
    title: "Cases",
    description:
      "Proven impact across industries and challenges: manufacturing and logistics results delivered with our clients.",
  },
  es: {
    title: "Casos",
    description:
      "Impacto probado en industrias y retos: resultados en manufactura y logística junto a nuestros clientes.",
  },
  de: {
    title: "Referenzen",
    description:
      "Nachgewiesene Wirkung über Branchen und Herausforderungen: Ergebnisse in Fertigung und Logistik.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const raw = (await locale()) as string;
    const lang = isValidLocale(raw) ? raw : "en";
    const t = await getPageSeo(lang, "cases", META[lang]);
    return pageMetadata({ lang, path: "/cases", title: t.title, description: t.description });
}

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getCasesPage(lang);
    const studies = await getCasesStudies(lang);
    const clients = await getCasesClients(lang);
    const featuredStudies = studies.items.filter((item) => item.featured);
    const laCostena = featuredStudies.find((item) => item.id === LA_COSTENA_ID);
    const standardFeatured = featuredStudies.filter((item) => item.id !== LA_COSTENA_ID);
    const otherStudies = studies.items.filter((item) => !item.featured);
    // Filter before the client boundary so internal copy is not serialized publicly.
    const publicClientItems = publicCaseClients(clients.items);

    return (
        <main className={`${styles.CasesPage} ${theme.LightSurface} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
            {laCostena && <LaCostenaFeature lang={lang} variant="cases" />}
            <div className={`AppShell ${styles.CasesContent}`}>
                <header className={styles.Header}>
                    <article>
                        <strong className='details'><RichText>{data.header.badge}</RichText></strong>
                        <h1><RichText>{data.header.title}</RichText></h1>
                    </article>
                    <p><RichText>{data.header.text}</RichText></p>
                </header>
                {featuredStudies.length > 0 && <section>
                <h2 className={styles.SectionTitle}><RichText>{data.featured_title ?? "Featured case studies"}</RichText></h2>
                <ul className={styles.Content}>
                    {standardFeatured.map((item) => (
                        <CardContent key={item.id} id={item.id} title={item.title} slug={item.industry} description={item.project} logo={item.logo}>
                            {(item.results ?? []).map((result, j) => (
                                <li key={j}>
                                    <PictureSvg icon={getIcon('IoShieldCheckmarkOutline')} />
                                    <p><RichText>{result}</RichText></p>
                                </li>
                            ))}
                        </CardContent>
                    ))}
                    {laCostena && (
                        <li className={styles.ExpandedCase}>
                            <article id="la-costena" tabIndex={-1} aria-labelledby="la-costena-case-title">
                                <header>
                                    {laCostena.logo && <Image src={resolveStorageUrl(laCostena.logo) ?? laCostena.logo} alt="" width={179} height={107} unoptimized />}
                                    <p className={styles.CaseLabel}>{featuredMexico[lang]}</p>
                                    <h3 id="la-costena-case-title"><RichText>{laCostena.title}</RichText></h3>
                                    {laCostena.project && <p><RichText>{laCostena.project}</RichText></p>}
                                </header>
                                {!!laCostena.results?.length && <ul>
                                    {laCostena.results.map((result, index) => (
                                        <li key={index}>
                                            <span aria-hidden="true"><PictureSvg icon={getIcon('IoShieldCheckmarkOutline')} /></span>
                                            <p><RichText>{result}</RichText></p>
                                        </li>
                                    ))}
                                </ul>}
                            </article>
                        </li>
                    )}
                </ul>
                </section>}
                <CaseStudyList title={data.studies_title ?? "More case studies"} items={otherStudies} />
                <ClientExperienceList title={data.clients_title ?? "Clients / Experience"} items={publicClientItems} />
            </div>
        </main>
    )
}

export default page

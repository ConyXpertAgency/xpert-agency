import { locale } from "next/root-params";
import CardContent from '@/components/cases/CardContent'
import CaseStudyList from '@/components/cases/CaseStudyList'
import ClientExperienceList from '@/components/cases/ClientExperienceList'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import styles from '@/styles/cases/Cases.module.css'
import theme from '@/styles/theme/SurfaceThemes.module.css'
import { getIcon } from '@/lib/supabase/icons'
import { getCasesClients, getCasesPage, getCasesStudies } from "@/lib/data";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getCasesPage(lang);
    const studies = await getCasesStudies(lang);
    const clients = await getCasesClients(lang);
    const featuredStudies = studies.items.filter((item) => item.featured);
    const otherStudies = studies.items.filter((item) => !item.featured);
    const publicClientItems = clients.items.map(({ note: _note, ...item }) => item);

    return (
        <main className={`${styles.CasesPage} ${theme.LightSurface} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
            <div className={`AppShell ${styles.CasesContent}`}>
                <header className={styles.Header}>
                    <article>
                        <strong className='details'><RichText>{data.header.badge}</RichText></strong>
                        <h1><RichText>{data.header.title}</RichText></h1>
                    </article>
                    <p><RichText>{data.header.text}</RichText></p>
                </header>
                <ul className={styles.Content}>
                    {featuredStudies.map((item) => (
                        <CardContent key={item.id} title={item.title} slug={item.industry} description={item.project} logo={item.logo}>
                            {(item.results ?? []).map((result, j) => (
                                <li key={j}>
                                    <PictureSvg icon={getIcon('IoShieldCheckmarkOutline')} />
                                    <p><RichText>{result}</RichText></p>
                                </li>
                            ))}
                        </CardContent>
                    ))}
                </ul>
                <CaseStudyList items={otherStudies} />
                <ClientExperienceList title={data.clients_title ?? "Clients / Experience"} items={publicClientItems} />
            </div>
        </main>
    )
}

export default page

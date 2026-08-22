import { locale } from "next/root-params";
import CardContent from '@/components/cases/CardContent'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import styles from '@/styles/cases/Cases.module.css'
import { getIcon } from '@/lib/supabase/icons'
import { getCasesPage } from "@/lib/data";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getCasesPage(lang);

    return (
        <main className={`AppShell ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
            <header className={styles.Header}>
                <article>
                    <strong className='details'><RichText>{data.header.badge}</RichText></strong>
                    <h1><RichText>{data.header.title}</RichText></h1>
                </article>
                <p><RichText>{data.header.text}</RichText></p>
            </header>
            <ul className={styles.Content}>
                {data.items.map((item, i) => (
                    <CardContent key={i} title={item.title} slug={item.slug} description={item.description}>
                        {item.stats.map((stat, j) => (
                            <li key={j}>
                                <PictureSvg icon={getIcon(stat.icon)} />
                                {stat.value && <strong><RichText>{stat.value}</RichText></strong>}
                                <p><RichText>{stat.text}</RichText></p>
                            </li>
                        ))}
                    </CardContent>
                ))}
            </ul>
        </main>
    )
}

export default page

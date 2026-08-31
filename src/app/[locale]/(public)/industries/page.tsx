import { locale } from "next/root-params";
import styles from '@/styles/industries/Industries.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import Link from 'next/link'
import IndustrieCard from '@/components/industries/IndustrieCard'
import { GrGroup } from 'react-icons/gr'
import { FaArrowRight } from 'react-icons/fa'
import { getIcon } from '@/lib/supabase/icons'
import { getIndustriesPage } from "@/lib/data";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getIndustriesPage(lang);

    return (
        <main className={`AppShell ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
            <header className={styles.Header}>
                <strong className="details"><RichText>{data.badge}</RichText></strong>
                <h1><RichText>{data.title}</RichText></h1>
                <p><RichText>{data.subtitle}</RichText></p>
            </header>
            <ul className={styles.Content}>
                {data.items.map((item, i) => (
                    <li key={i}>
                        <IndustrieCard icon={getIcon(item.icon)}>
                            <h1><RichText>{item.title}</RichText></h1>
                            <p><RichText>{item.text}</RichText></p>
                        </IndustrieCard>
                    </li>
                ))}
            </ul>
            <article className={`${styles.InfoCard}`}>
                <header>
                    <PictureSvg icon={GrGroup} variant='full' width={4} height={4} size={32}/>
                    <span className={styles.Text}>
                        <h1>
                            <RichText>{data.info_card.title}</RichText>
                        </h1>
                        <p><RichText>{data.info_card.text}</RichText></p>
                    </span>
                </header>
                <Link href={`/${lang}${data.info_card.cta_href}`}><RichText>{data.info_card.cta}</RichText> <FaArrowRight /></Link>
            </article>
        </main>
    )
}

export default page

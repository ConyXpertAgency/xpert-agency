import { locale } from "next/root-params";
import Link from 'next/link'
import styles from '@/styles/services/Services.module.css'
import theme from '@/styles/theme/SurfaceThemes.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import Button from '@/components/ui/Button'
import { getIcon } from '@/lib/supabase/icons'
import { getServicesPage } from "@/lib/data";
import { sectionBgClass, sectionBgStyle } from "@/lib/sectionBg";
import type { Lang } from "@/lib/supabase/types";
import ServicesExplorer from '@/components/services/ServicesExplorer'
import { serviceGroups } from '@/lib/serviceGroups'

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getServicesPage(lang);

    return (
        <main className={`${styles.ServicesPage} ${theme.LightSurface} ${sectionBgClass(data)}`} style={sectionBgStyle(data)}>
            <div className={`AppShell ${styles.ServicesContent}`}>
                <header className={styles.Header}>
                <article>
                    <strong className='details'><RichText>{data.badge}</RichText></strong>
                    <h1>
                        <RichText>{data.title}</RichText>
                    </h1>
                    <p><RichText>{data.subtitle}</RichText></p>
                </article>
                <article>
                    <p>
                        <strong className='details'><RichText>{data.intro.title}</RichText> </strong>
                        <RichText>{data.intro.text}</RichText>
                    </p>
                </article>
            </header>
                <ServicesExplorer groups={data.groups ?? serviceGroups} />
                <article className={styles.FooterCard}>
                <header>
                    <PictureSvg variant='full' width={5} height={5} size={32} icon={getIcon('FaRegUser')} />
                    <span>
                        <strong><RichText>{data.footer.title}</RichText></strong>
                        <p><RichText>{data.footer.text}</RichText></p>
                    </span>
                </header>
                <Link href={`/${lang}/contact`}>
                    <Button variant='full' arrow={true}><RichText>{data.footer.cta}</RichText></Button>
                </Link>
                </article>
            </div>
        </main>
    )
}

export default page

import { locale } from "next/root-params";
import styles from '@/styles/services/Services.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import Button from '@/components/ui/Button'
import { getIcon } from '@/lib/supabase/icons'
import { getServicesPage } from "@/lib/data";
import type { Lang } from "@/lib/supabase/types";

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getServicesPage(lang);

    return (
        <main className='AppShell'>
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
            <ul className={styles.Content}>
                {data.areas.map((area, i) => (
                    <li key={i}>
                        <PictureSvg size={32} className={styles.Picture} icon={getIcon(area.icon)} variant='full' width={4.5} height={4.5} />
                        <span className={styles.TextCardC}>
                            <h1><RichText>{area.title}</RichText></h1>
                            <p><RichText>{area.text}</RichText></p>
                        </span>
                    </li>
                ))}
            </ul>
            <article className={styles.FooterCard}>
                <header>
                    <PictureSvg variant='full' width={5} height={5} size={32} icon={getIcon('FaRegUser')} />
                    <span>
                        <strong><RichText>{data.footer.title}</RichText></strong>
                        <p><RichText>{data.footer.text}</RichText></p>
                    </span>
                </header>
                <Button variant='full' arrow={true}><RichText>{data.footer.cta}</RichText></Button>
            </article>
        </main>
    )
}

export default page

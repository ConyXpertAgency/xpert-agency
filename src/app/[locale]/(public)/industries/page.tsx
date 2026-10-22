import { locale } from "next/root-params";
import type { Metadata } from "next";
import styles from '@/styles/industries/Industries.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import Link from 'next/link'
import IndustrieCard from '@/components/industries/IndustrieCard'
import { GrGroup } from 'react-icons/gr'
import { FaArrowRight } from 'react-icons/fa'
import { getIcon } from '@/lib/supabase/icons'
import { getIndustriesPage, getPageSeo } from "@/lib/data";
import { isValidLocale, pageMetadata } from "@/lib/site";
import type { Lang } from "@/lib/supabase/types";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { getTrustBandLogos } from "@/lib/industryLogos";

const META = {
  en: {
    title: "Industries",
    description:
      "Manufacturing, food & beverage, retail, warehousing & logistics, consumer goods and industrial operations.",
  },
  es: {
    title: "Industrias",
    description:
      "Manufactura, alimentos y bebidas, retail, almacenaje y logística, bienes de consumo y operaciones industriales.",
  },
  de: {
    title: "Branchen",
    description:
      "Fertigung, Lebensmittel, Handel, Lager & Logistik, Konsumgüter und industrieller Betrieb.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const raw = (await locale()) as string;
    const lang = isValidLocale(raw) ? raw : "en";
    const t = await getPageSeo(lang, "industries", META[lang]);
    return pageMetadata({ lang, path: "/industries", title: t.title, description: t.description });
}

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getIndustriesPage(lang);
    const marqueeLogos = await getTrustBandLogos(lang, data.marquee_logos);

    return (
        <main className={`AppShell ${styles.Page}`}>
            <header className={styles.Header}>
                <div className={styles.HeaderText}>
                    <strong className="details"><RichText>{data.badge}</RichText></strong>
                    <h1><RichText>{data.title}</RichText></h1>
                    <p><RichText>{data.subtitle}</RichText></p>
                </div>
                <LogoMarquee logos={marqueeLogos} />
            </header>
            <ul className={styles.Content}>
                {data.items.map((item, i) => (
                    <li key={i}>
                        <IndustrieCard icon={getIcon(item.icon)} img={item.image}>
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

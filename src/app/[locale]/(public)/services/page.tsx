import { locale } from "next/root-params";
import type { CSSProperties } from "react";
import Link from 'next/link'
import styles from '@/styles/services/Services.module.css'
import theme from '@/styles/theme/SurfaceThemes.module.css'
import PictureSvg from '@/components/ui/PictureSvg'
import RichText from '@/components/ui/RichText'
import Button from '@/components/ui/Button'
import { getIcon } from '@/lib/supabase/icons'
import { getServicesPage } from "@/lib/data";
import { isValidLocale, pageMetadata } from "@/lib/site";
import { resolveStorageUrl } from "@/lib/supabase/client";
import type { Lang } from "@/lib/supabase/types";
import type { Metadata } from "next";
import ServicesExplorer from '@/components/services/ServicesExplorer'
import { serviceGroups } from '@/lib/serviceGroups'

const META = {
  en: {
    title: "Services",
    description:
      "Expert-led transformation: process optimization, automation, project and interim management, lean, supply chain and systems integration.",
  },
  es: {
    title: "Servicios",
    description:
      "Transformación liderada por expertos: optimización de procesos, automatización, gestión de proyectos e interina, lean y cadena de suministro.",
  },
  de: {
    title: "Leistungen",
    description:
      "Expertengestützte Transformation: Prozessoptimierung, Automatisierung, Projekt- und Interim-Management, Lean und Supply Chain.",
  },
} as const;

export async function generateMetadata(): Promise<Metadata> {
    const raw = (await locale()) as string;
    const lang = isValidLocale(raw) ? raw : "en";
    const t = META[lang];
    return pageMetadata({ lang, path: "/services", title: t.title, description: t.description });
}

const page = async () => {
    const lang = (await locale()) as Lang;
    const data = await getServicesPage(lang);
    const ambientImage = resolveStorageUrl(data.background_image || "/uploads/fondo4.png");
    const ambientStyle = ambientImage
        ? ({ "--services-ambient-image": `url("${ambientImage}")` } as CSSProperties)
        : undefined;

    return (
        <main className={`${styles.ServicesPage} ${theme.LightSurface}`} style={ambientStyle}>
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
                <ServicesExplorer groups={data.groups ?? serviceGroups} lang={lang} />
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

import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { BiSolidQuoteAltLeft, BiSolidShield } from 'react-icons/bi'
import { FaRegUser } from 'react-icons/fa'
import styles from '@/styles/about/Second.module.css'
import { TfiReload } from 'react-icons/tfi'
import { getIcon } from '@/lib/supabase/icons'
import type { AboutSecond, TextItem } from '@/lib/supabase/types'
import AboutStatsBar from './AboutStatsBar'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface SecondProps {
    second: AboutSecond
    heroStats: TextItem[]
    lang: string
}

const Second = ({ second, heroStats, lang }: SecondProps) => {
    const rbeBar = second.rbe_bar ?? {
        icon: 'BiSolidShield',
        title: 'RBE™ — Ramp-up & Risk Mitigation',
        text: 'Explore our approach to managing critical ramp-up phases, project risks and operational transitions.',
        cta: 'Explore RBE™',
        href: '/rbe',
    }
    const normalizedRbeHref = rbeBar.href.startsWith('/') ? rbeBar.href : `/${rbeBar.href}`
    const RbeIcon = rbeBar.icon === 'BiSolidShield' ? BiSolidShield : getIcon(rbeBar.icon)

    // Watermark editorial (mismo lenguaje que Expertise/Four): mismo logo
    // repetido en filas staggered sobre canvas sobredimensionado y rotado.
    // Se renderiza de más y cada breakpoint muestra lo necesario para cubrir
    // (las ocultas con display:none ni se descargan). Secciones altas en
    // tablet/mobile exigen muchas más filas que en desktop.
    const patternRows = Array.from({ length: 34 }, (_, i) => i);
    const patternCols = Array.from({ length: 12 }, (_, i) => i);

    return (
        <section className={`${styles.Second} ${sectionBgClass(second)}`} style={sectionBgStyle(second)}>
            <div className={styles.BodyWrap}>
            <div className={styles.LogoPattern} aria-hidden="true">
                {patternRows.map((row) => (
                    <div key={row} className={styles.LogoPatternRow}>
                        {patternCols.map((col) => (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img key={col} src="/logo_largo_blanco2.webp" alt="" draggable={false} />
                        ))}
                    </div>
                ))}
            </div>
            <header className={styles.Header}>
                <span className={styles.TextH}>
                    <strong className='details'><RichText>{second.badge}</RichText></strong>
                    <h1>
                        {second.title.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </h1>
                    <p>
                        {second.text.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </p>
                </span>
                <article className={styles.CardH}>
                    <header>
                        <PictureSvg icon={BiSolidQuoteAltLeft} size={32} />
                        <p>
                            {second.quote.lines.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                        </p>
                    </header>
                    <footer>
                        <PictureSvg icon={FaRegUser} />
                        <span>
                            <strong><RichText>{second.quote.author}</RichText></strong>
                            <p><RichText>{second.quote.sub}</RichText></p>
                        </span>
                    </footer>
                </article>
            </header>
            <ul className={styles.Content}>
                {second.steps.map((step, i) => (
                    <React.Fragment key={i}>
                        <li className={styles.CardO}>
                        <div className={styles.number}>
                            <RichText>{step.number}</RichText>
                        </div>
                            <article>
                                <PictureSvg className={styles.Picture} size={38} variant='full' width={4.5} height={4.5} icon={getIcon(step.icon)} />
                                <h1><RichText>{step.title}</RichText></h1>
                                <div className="line"></div>
                                <span className={styles.CardCText}>
                                    <p>
                                        {step.text.map((line, j) => <RichText as="span" key={j}>{line}</RichText>)}
                                    </p>

                                    <ul>
                                        {step.bullets.map((bullet, k) => (
                                            <li key={k}><RichText>{bullet}</RichText></li>
                                        ))}
                                    </ul>
                                </span>
                            </article>
                        </li>
                    </React.Fragment>
                ))}
            </ul>
            <article className={styles.FooterCard}>
                <PictureSvg icon={TfiReload} size={32} />
                <span className={styles.FooterCardTxt}>
                    <strong><RichText>{second.footer_card.title}</RichText></strong>
                    <p><RichText>{second.footer_card.text}</RichText></p>
                </span>
                <div></div>
            </article>
            </div>
            <div className={styles.StatsBand}>
                <div className={styles.StatsInner}>
                    <AboutStatsBar stats={heroStats} />
                    <article className={styles.RbeBar}>
                        <PictureSvg icon={RbeIcon} size={32} className={styles.RbeIcon} />
                        <div className={styles.RbeContent}>
                            <strong><RichText>{rbeBar.title}</RichText></strong>
                            <p><RichText>{rbeBar.text}</RichText></p>
                        </div>
                        <a href={`/${lang}${normalizedRbeHref}`} className={styles.RbeCTA}>
                            <RichText>{rbeBar.cta}</RichText>
                        </a>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Second

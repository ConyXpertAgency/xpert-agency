import React from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import styles from '@/styles/Home/Third.module.css'
import buttonStyles from '@/styles/ui/Button.module.css'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import GlobalReachMap from './GlobalReachMap'
import { getIcon } from '@/lib/supabase/icons'
import type { HomeGlobalReach } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'
import { localizedPath } from '@/lib/site'

interface ThirdProps {
    globalReach: HomeGlobalReach
    lang: string
}

const Third = ({ globalReach, lang }: ThirdProps) => {
    const rawHref = globalReach.href?.trim()
    const ctaHref = rawHref && (rawHref.startsWith('/') && !rawHref.startsWith('//') || /^https:\/\//i.test(rawHref))
        ? localizedPath(lang, rawHref)
        : undefined
    return (
        <section className={`${styles.Third} ${sectionBgClass(globalReach)}`} style={sectionBgStyle(globalReach)}>
            <header className={styles.Header}>
                <article>
                    <header>
                        <strong className='details'><RichText>{globalReach.badge}</RichText></strong>
                        <h1>
                            <span><RichText>{globalReach.title}</RichText></span>
                        </h1>
                        <div className='line'></div>
                        <p>
                            {globalReach.description.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                        </p>
                    </header>
                    <ul>
                        {globalReach.features.map((feature, i) => (
                            <li key={i}>
                                <PictureSvg variant={'full'} width={3.5} size={32} height={3.5} icon={getIcon(feature.icon)} />
                                <span>
                                    <h1><RichText>{feature.title}</RichText></h1>
                                    <p>
                                        <span><RichText>{feature.text}</RichText></span>
                                    </p>
                                </span>
                            </li>
                        ))}
                    </ul>
                </article>
                <GlobalReachMap nodes={globalReach.nodes} />
            </header>
            <ul className={`${styles.List}`}>
                {globalReach.stats.map((stat, i) => (
                    <li key={i}>
                        <PictureSvg variant={'full'} width={4} height={4} size={32} icon={getIcon(stat.icon)} />
                        <span>
                            <h1><RichText>{stat.value}</RichText></h1>
                            <strong><RichText>{stat.label}</RichText></strong>
                            <p>
                                <span><RichText>{stat.text}</RichText></span>
                            </p>
                        </span>
                    </li>
                ))}
            </ul>
            {ctaHref && <Link className={`${buttonStyles.base} ${buttonStyles.outlineG} ${styles.CtaLink}`} href={ctaHref}>
                <RichText>{globalReach.cta}</RichText><FaArrowRight aria-hidden="true" />
            </Link>}
        </section>
    )
}

export default Third

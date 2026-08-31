import React from 'react'
import Button from '../ui/Button'
import RichText from '../ui/RichText'
import styles from '@/styles/rbe/First.module.css'
import Image from 'next/image'
import type { RbeFirst } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface FirstProps {
    first: RbeFirst
    lang?: string
}

const First = ({ first, lang = "" }: FirstProps) => {
    const ctaHref = first.cta_primary_href
        ? first.cta_primary_href.startsWith('/')
            ? `${lang}${first.cta_primary_href}`
            : first.cta_primary_href
        : `${lang}/rbe`
    return (
        <header className={`${styles.Hero} ${sectionBgClass(first)}`} style={sectionBgStyle(first)}>
            <section className={styles.HeroText}>
                <strong className='details'><RichText>{first.badge}</RichText></strong>
                <h1>
                    {first.title.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                </h1>
                <p className={styles.Lead}><RichText>{first.subtitle}</RichText></p>
                <ul className={styles.Kpis}>
                    {first.list.map((item, i) => (
                        <li key={i}>
                            <span className={styles.KpiDot}></span>
                            <RichText>{item.title}</RichText>
                        </li>
                    ))}
                </ul>
                <div className={styles.Cta}>
                    <a href={ctaHref}>
                        <Button variant='full' arrow={true}><RichText>{first.cta_primary}</RichText></Button>
                    </a>
                </div>
            </section>
            <section className={styles.HeroImage}>
                <div className={styles.ImgWrap}>
                    {first.image && (
                        <Image src={first.image} alt="RBE cover panel" width={420} height={360} className={styles.ImgContain} />
                    )}
                </div>
            </section>
        </header>
    )
}

export default First

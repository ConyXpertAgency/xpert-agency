import Link from 'next/link'
import Image from 'next/image'
import heroPreview from '@/assets/home-hero-preview.webp'
import internationalHeroPreview from '@/assets/home-hero-preview-international.webp'
import React from 'react'
import Button from '../ui/Button'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { CiGlobe } from 'react-icons/ci'
import { GiBullseye, GiChart } from 'react-icons/gi'
import styles from '@/styles/Home/First.module.css'
import { InformationCard } from './index'
import RichText from '../ui/RichText'
import AnimationCards from './AnimationCards'
import type { IconType } from 'react-icons'
import type { HomeHero } from '@/lib/supabase/types'
import { resolveStorageUrl } from '@/lib/supabase/client'

const infoCardIcons: IconType[] = [IoShieldCheckmarkOutline, CiGlobe, GiChart]

interface FirstProps {
    hero: HomeHero
}

const First = ({ hero }: FirstProps) => {
    const lines = hero.title.length > 0 ? hero.title : ['Xpert.agency']
    const heroImage = resolveStorageUrl(hero.background_image)
    // This preview belongs only to the approved asset, never to a new CMS image.
    const preview = heroImage?.endsWith("/uploads/fondo6.png") ? heroPreview
        : heroImage?.endsWith("/uploads/fondo.png") ? internationalHeroPreview : undefined

    return (
        <header className={styles.First}>
            {heroImage && (
                <div className={styles.HeroBackground} aria-hidden="true">
                    <Image
                        src={heroImage}
                        alt=""
                        fill
                        // On mobile, cover scales the wide image to the tall hero,
                        // so its rendered width is larger than the viewport.
                        sizes="(max-width: 992px) 1800px, 100vw"
                        preload
                        fetchPriority="high"
                        placeholder={preview ? 'blur' : 'empty'}
                        blurDataURL={preview?.blurDataURL}
                    />
                </div>
            )}
            <section className={styles.Left}>
                <div className={styles.LeftMain}>
                    <strong className="details"><RichText>{hero.badge}</RichText></strong>
                    <header>
                        <h1>{lines.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}</h1>
                        <p><span><RichText>{hero.subtitle}</RichText></span></p>
                        <article className={styles.Buttons}>
                            <Link href={`${hero.cta_primary_href}`}>
                                <Button variant="full" arrow={true}>
                                    <RichText>{hero.cta_primary}</RichText>
                                </Button>
                            </Link>
                            <Link href={`${hero.cta_secondary_href}`}>
                                <Button arrow={true} variant="outline">
                                    <RichText>{hero.cta_secondary}</RichText>
                                </Button>
                            </Link>
                        </article>
                    </header>
                </div>
                <footer>
                    {hero.info_cards.map((card, i) => (
                        <InformationCard key={i} icon={infoCardIcons[i] ?? infoCardIcons[0]}>
                            <h1><RichText>{card.title}</RichText></h1>
                            <p><RichText>{card.text}</RichText></p>
                        </InformationCard>
                    ))}
                </footer>
            </section>
            <section className={styles.Right}>
                <article>
                    <section>
                        <article className={`${styles.FirstCard} ${styles.CardRight}`}>
                            <header className={styles.KpiHeader}>
                                <span className={styles.KpiIcon} aria-hidden="true"><GiChart /></span>
                                <strong><RichText>{hero.stat_impact.title}</RichText></strong>
                            </header>
                            <article>
                                <span>
                                    <h1><RichText>{hero.stat_impact.value}</RichText></h1>
                                    <p><RichText>{hero.stat_impact.label}</RichText></p>
                                </span>
                                <div className={`${styles.chartContainer}`}>
                                    <svg viewBox="0 0 400 170" aria-hidden="true" focusable="false">
                                        <defs>
                                            <linearGradient id="hero-productivity-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                                                <stop offset="0%" stopColor="#a3e635" />
                                                <stop offset="100%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>
                                        <path className={styles.ChartGrid} d="M20 40H380 M20 80H380 M20 120H380 M20 160H380 M20 28V160 M110 28V160 M200 28V160 M290 28V160 M380 28V160" />
                                        <path className={styles.chartArea} d="M20 145 C65 145 76 122 110 122 S153 125 183 105 S233 93 257 76 S303 63 325 53 S355 44 380 28 L380 160 H20Z" />
                                        <path className={styles.chartLine} d="M20 145 C65 145 76 122 110 122 S153 125 183 105 S233 93 257 76 S303 63 325 53 S355 44 380 28" />
                                        <circle className={styles.glowPoint} cx="380" cy="28" r="5" />
                                    </svg>
                                </div>
                            </article>
                        </article>
                        <article className={`${styles.ThirdCard} ${styles.CardRight}`}>
                            <header className={styles.KpiHeader}>
                                <span className={styles.KpiIcon} aria-hidden="true"><GiBullseye /></span>
                                <strong><RichText>{hero.stat_success.title}</RichText></strong>
                            </header>
                            <div className={`${styles.circularProgress}`}>
                                <span className={`${styles.progressValue}`}><RichText>{hero.stat_success.value}</RichText></span>
                            </div>
                            <p><span><RichText>{hero.stat_success.label}</RichText></span></p>
                        </article>
                    </section>
                    <AnimationCards hero={hero} />
                </article>
            </section>
        </header>
    )
}

export default First

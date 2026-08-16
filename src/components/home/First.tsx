import Link from 'next/link'
import React from 'react'
import Button from '../ui/Button'
import { IoShieldCheckmarkOutline } from 'react-icons/io5'
import { CiGlobe } from 'react-icons/ci'
import { GiChart, GiRobotGrab } from 'react-icons/gi'
import styles from '@/styles/Home/First.module.css'
import { InformationCard } from './index'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { FaArrowRight, FaCogs, FaProjectDiagram, FaTruckMoving } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import type { HomeHero } from '@/lib/supabase/types'

const infoCardIcons: IconType[] = [IoShieldCheckmarkOutline, CiGlobe, GiChart]
const coreAreaIcons: IconType[] = [FaCogs, GiRobotGrab, FaTruckMoving, FaProjectDiagram]

interface FirstProps {
    hero: HomeHero
}

const First = ({ hero }: FirstProps) => {
    const lines = hero.title.length > 0 ? hero.title : ['Xpert.agency']
    return (
        <header className={styles.First}>
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
                            <header>
                                <strong><RichText>{hero.stat_impact.title}</RichText></strong>
                            </header>
                            <article>
                                <span>
                                    <h1><RichText>{hero.stat_impact.value}</RichText></h1>
                                    <p><RichText>{hero.stat_impact.label}</RichText></p>
                                </span>
                                <div className={`${styles.chartContainer}`}>
                                    <svg viewBox="0 0 400 250" width="100%" height="100%">
                                        <defs>
                                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#a3e635" />
                                                <stop offset="100%" stopColor="transparent" />
                                            </linearGradient>
                                        </defs>
                                        <path className={`${styles.chartArea}`} d="M 20 220 Q 80 150, 120 180 T 220 140 T 320 90 T 380 40 L 380 230 L 20 230 Z" />
                                        <path className={`${styles.chartLine}`} d="M 20 220 Q 80 150, 120 180 T 220 140 T 320 90 T 380 40" />
                                        <circle className={`${styles.glowPoint}`} cx="380" cy="40" r="6" />
                                    </svg>
                                </div>
                            </article>
                        </article>
                        <article className={`${styles.ThirdCard} ${styles.CardRight}`}>
                            <strong><RichText>{hero.stat_success.title}</RichText></strong>
                            <div className={`${styles.circularProgress}`}>
                                <span className={`${styles.progressValue}`}><RichText>{hero.stat_success.value}</RichText></span>
                            </div>
                            <p><span><RichText>{hero.stat_success.label}</RichText></span></p>
                        </article>
                    </section>
                    <section className={styles.AnimationCards}>
                        <article className={`${styles.SecondCard} ${styles.CardRight}`}>
                            <h1><RichText>{hero.core_areas_title}</RichText></h1>
                            <ul>
                                {hero.core_areas.map((area, i) => (
                                    <li key={i}>
                                        <PictureSvg variant='full' width={2.5} height={2.5} size={14} icon={coreAreaIcons[i] ?? coreAreaIcons[0]} />
                                        <strong><RichText>{area}</RichText></strong>
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <article className={`${styles.FourCard} ${styles.CardRight}`}>
                            <header>
                                <strong><RichText>{hero.global_delivery.title}</RichText></strong>
                            </header>
                            <article>
                                <section>
                                    <div className={`${styles.mapWrapper}`}>
                                        <div className={styles.mapContainer}></div>
                                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointNa}`}></div>
                                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointSa}`}></div>
                                        <div className={`${styles.hotspot} ${styles.pointEu}`} style={{ top: '28%', left: '51%' }}></div>
                                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAf}`}></div>
                                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAs}`}></div>
                                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAu}`}></div>
                                    </div>
                                    <span className={`${styles.TextFourCard}`}>
                                        <p><RichText>{hero.global_delivery.text}</RichText></p>
                                        <Link href={'/cases'} className='details'>See our cases <FaArrowRight /></Link>
                                    </span>
                                </section>
                            </article>
                        </article>
                    </section>
                </article>
            </section>
        </header>
    )
}

export default First

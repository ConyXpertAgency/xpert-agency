import React from 'react'
import styles from '@/styles/Home/Third.module.css'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import Button from '../ui/Button'
import { getIcon } from '@/lib/supabase/icons'
import type { HomeGlobalReach } from '@/lib/supabase/types'

interface ThirdProps {
    globalReach: HomeGlobalReach
}

const Third = ({ globalReach }: ThirdProps) => {
    return (
        <section className={styles.Third}>
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
                <div className={styles.mapWrapper}>
                    <div className={styles.mapContainer}></div>
                    <svg className={styles.curvesLayer} viewBox="0 0 800 400">
                        <defs>
                            <filter id="glow-line" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <path className={styles.curveLine} d="M 160,140 Q 300,60 408,112" />
                        <path className={styles.curveLine} d="M 408,112 Q 520,60 600,140" />
                        <path className={styles.curveLine} d="M 240,260 Q 350,300 424,220" />
                        <path className={styles.curveLine} d="M 600,140 Q 680,200 656,280" />
                    </svg>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointNa}`}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointSa}`}></div>
                    <div className={`${styles.hotspot} ${styles.pointEu}`} style={{ top: '28%', left: '51%' }}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAf}`}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAs}`}></div>
                    <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAu}`}></div>
                </div>
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
            <Button variant='outlineG' arrow={true}><RichText>{globalReach.cta}</RichText></Button>
        </section>
    )
}

export default Third

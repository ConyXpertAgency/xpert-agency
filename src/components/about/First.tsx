import React from 'react'
import styles from '@/styles/about/First.module.css'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { getIcon } from '@/lib/supabase/icons'
import type { AboutFirst } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface FirstProps {
    first: AboutFirst
}

const First = ({ first }: FirstProps) => {
    return (
        <header className={`${styles.First} ${sectionBgClass(first)}`} style={sectionBgStyle(first)}>
            <section className={styles.Left}>
                <header>
                    <strong className='details'><RichText>{first.badge}</RichText></strong>
                    <h1><RichText>{first.title}</RichText></h1>
                    <h2>
                        {first.heading.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </h2>
                    <p>
                        {first.text.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                    </p>
                    <ul className={styles.ListLeftH}>
                        {first.features.map((feature, i) => (
                            <li key={i}>
                                <PictureSvg size={28} icon={getIcon(feature.icon)} variant='full' width={3.5} height={3.5} />
                                <span className={styles.Text}>
                                    <h1><RichText>{feature.title}</RichText></h1>
                                    <p>
                                        <span><RichText>{feature.text}</RichText></span>
                                    </p>
                                </span>
                            </li>
                        ))}
                    </ul>
                </header>
                <ul className={styles.ListLeft}>
                    {first.stats.map((stat, i) => (
                        <li key={i} className={`${styles.HCardF}`}>
                            <PictureSvg className='details' size={32} width={4} height={4} icon={getIcon(stat.icon)} />
                            <span className={`${styles.TextCardH}`}>
                                <h1><RichText>{stat.value}</RichText></h1>
                                <strong><RichText>{stat.label}</RichText></strong>
                                <p>
                                    <RichText>{stat.text}</RichText>
                                </p>
                            </span>
                        </li>
                    ))}
                </ul>

            </section>
            <section className={styles.Right}>
                <article className={`${styles.PictureCard}`}>
                    <section>
                        <PictureSvg variant='full' radius='var(--radius-md)' size={32} icon={getIcon('CiGlobe')} />
                        <span className={styles.Text}>
                            <h1>
                                {first.right_card.title.map((line, i) => <RichText as="span" key={i}>{line}</RichText>)}
                            </h1>
                            <p>
                                <RichText>{first.right_card.text}</RichText>
                            </p>
                        </span>
                    </section>
                    <div className={`${styles.mapWrapper}`}>
                        <div className={styles.mapContainer}></div>

                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointNa}`}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointSa}`}></div>
                        <div className={`${styles.hotspot} ${styles.pointEu}`} style={{ top: '28%', left: '51%' }}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAf}`}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAs}`}></div>
                        <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAu}`}></div>
                    </div>
                </article>
            </section>
        </header>
    )
}

export default First

'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FaArrowRight, FaCogs, FaProjectDiagram, FaTruckMoving } from 'react-icons/fa'
import { GiRobotGrab } from 'react-icons/gi'
import type { IconType } from 'react-icons'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import styles from '@/styles/Home/First.module.css'
import type { HomeHero } from '@/lib/supabase/types'

const coreAreaIcons: IconType[] = [FaCogs, GiRobotGrab, FaTruckMoving, FaProjectDiagram]

const SWAP_INTERVAL_MS = 3500

interface AnimationCardsProps {
    hero: HomeHero
}

const AnimationCards = ({ hero }: AnimationCardsProps) => {
    const [showFour, setShowFour] = useState(false)
    const [mounted, setMounted] = useState(false)
    const [height, setHeight] = useState<number>()
    const [isDesktop, setIsDesktop] = useState(false)
    const secondRef = useRef<HTMLElement | null>(null)
    const fourRef = useRef<HTMLElement | null>(null)
    const frameRef = useRef(0)

    useEffect(() => {
        const m = window.matchMedia('(min-width: 993px)')
        const update = () => setIsDesktop(m.matches)
        update()
        m.addEventListener('change', update)
        return () => m.removeEventListener('change', update)
    }, [])

    // El contenedor reserva siempre el alto de la card más alta: al cambiar
    // de card la página no se mueve, solo hay crossfade dentro del hueco.
    const syncHeight = useCallback(() => {
        const second = secondRef.current
        const four = fourRef.current
        if (!second || !four) return
        const max = Math.max(
            second.getBoundingClientRect().height,
            four.getBoundingClientRect().height,
        )
        setHeight(Math.ceil(max))
    }, [])

    useEffect(() => {
        const second = secondRef.current
        const four = fourRef.current
        if (!second || !four) return

        const observer = new ResizeObserver(syncHeight)
        observer.observe(second)
        observer.observe(four)

        return () => observer.disconnect()
    }, [syncHeight])

    useEffect(() => {
        const outer = requestAnimationFrame(() => {
            frameRef.current = requestAnimationFrame(() => {
                syncHeight()
                setMounted(true)
            })
        })
        frameRef.current = outer
        return () => cancelAnimationFrame(frameRef.current)
    }, [syncHeight])

    useEffect(() => {
        const id = window.setInterval(() => setShowFour(value => !value), SWAP_INTERVAL_MS)
        return () => window.clearInterval(id)
    }, [])

    return (
        <section
            className={`${styles.AnimationCards} ${mounted ? styles.Mounted : ''}`}
            style={height !== undefined && !isDesktop ? { height: `${height}px`, transition: 'height .45s ease' } : undefined}
        >
            <article
                ref={secondRef}
                className={`${styles.SecondCard} ${showFour ? styles.CardHidden : ''} ${styles.CardRight}`}
            >
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
            <article
                ref={fourRef}
                className={`${styles.FourCard} ${showFour ? '' : styles.CardHidden} ${styles.CardRight}`}
            >
                <article>
                    <section className={styles.FourContent}>
                        <div className={`${styles.mapWrapper}`}>
                            <div className={styles.mapContainer}></div>
                            <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointNa}`}></div>
                            <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointSa}`}></div>
                            <div className={`${styles.hotspot} ${styles.pointEu}`} style={{ top: '28%', left: '51%' }}></div>
                            <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAf}`}></div>
                            <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAs}`}></div>
                            <div className={`${styles.hotspotCluster} ${styles.hotspot} ${styles.pointAu}`}></div>
                        </div>
                        <div className={styles.FourTextColumn}>
                            <strong><RichText>{hero.global_delivery.title}</RichText></strong>
                            <p><RichText>{hero.global_delivery.text}</RichText></p>
                            <Link href={'/cases'} className='details'>See our cases <FaArrowRight /></Link>
                        </div>
                    </section>
                </article>
            </article>
        </section>
    )
}

export default AnimationCards

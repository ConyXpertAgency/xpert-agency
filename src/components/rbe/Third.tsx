import React from 'react'
import RichText from '../ui/RichText'
import styles from '@/styles/rbe/Third.module.css'
import Image from 'next/image'
import type { RbeThird } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface ThirdProps {
    third: RbeThird
}

const Third = ({ third }: ThirdProps) => {
    return (
        <section id="rbe-expectations" className={`${styles.Third} ${sectionBgClass(third)}`} style={sectionBgStyle(third)}>
            <header className={styles.Header}>
                <div className={styles.HeaderText}>
                    <h1><RichText>{third.title}</RichText></h1>
                    <p><RichText>{third.subtitle}</RichText></p>
                </div>
                <div className={styles.Chips}>
                    {third.phases.map((phase, i) => (
                        <span key={i} className={styles.Chip}>
                            <RichText>{phase.title.replace(/\s+phase$/i, '')}</RichText>
                        </span>
                    ))}
                </div>
            </header>

            <div className={styles.Panel}>
                {third.image && (
                    <Image src={third.image} alt="Three phase model panel" width={900} height={220} className={styles.PanelImg} />
                )}
            </div>

            <ul className={styles.Content}>
                {third.phases.map((phase, i) => (
                    <li key={i} className={styles.CardContent}>
                        <header>
                            <h1><RichText>{phase.title}</RichText></h1>
                        </header>
                        <ul className={styles.ListCard}>
                            {phase.items.map((item, j) => (
                                <li key={j}><RichText>{item}</RichText></li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <footer className={styles.Footer}>
                <h1><RichText>{third.footer_title}</RichText></h1>
                <p><RichText>{third.footer_text}</RichText></p>
            </footer>
        </section>
    )
}

export default Third

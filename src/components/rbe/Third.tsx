import React from 'react'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { getIcon } from '@/lib/supabase/icons'
import styles from '@/styles/rbe/Third.module.css'
import type { RbeThird } from '@/lib/supabase/types'

interface ThirdProps {
    third: RbeThird
}

const Third = ({ third }: ThirdProps) => {
    return (
        <section className={styles.Third}>
            <header className={styles.Header}>
                <h1><RichText>{third.title}</RichText></h1>
                <p><RichText>{third.subtitle}</RichText></p>
            </header>
            <ul className={styles.Content}>
                {third.phases.map((phase, i) => (
                    <li key={i} className={styles.CardContent}>
                        <header>
                            <PictureSvg icon={getIcon(phase.icon)} size={68} variant='ghost' />
                            <h1><RichText>{phase.title}</RichText></h1>
                            <p>
                                {phase.subtitle.map((line, j) => <RichText as="span" key={j}>{line}</RichText>)}
                            </p>
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

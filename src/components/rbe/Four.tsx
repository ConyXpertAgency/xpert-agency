import React from 'react'
import styles from '@/styles/rbe/Four.module.css'
import RichText from '../ui/RichText'
import Image from 'next/image'
import type { RbeFour } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface FourProps {
    four: RbeFour
}

const Four = ({ four }: FourProps) => {
    const elements = [...four.left, ...four.right, {
        number: four.extra.number,
        title: four.extra.title,
        text: four.extra.text,
        icon: '',
    }];

    return (
        <section className={`${styles.Four} ${sectionBgClass(four)}`} style={sectionBgStyle(four)}>
            <header className={styles.Header}>
                <h1><RichText>{four.title}</RichText></h1>
                <p><RichText>{four.subtitle}</RichText></p>
            </header>
            <article className={styles.Content}>
                <div className={styles.Grid}>
                    {elements.map((item, i) => (
                        <div key={i} className={styles.Card}>
                            <span className={styles.Number}><RichText>{item.number}</RichText></span>
                            <div className={styles.CardTxt}>
                                <div className={styles.Smallcaps}><RichText>{item.title}</RichText></div>
                                <div className={styles.CardDesc}><RichText>{item.text}</RichText></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.Image}>
                    {four.image && (
                        <Image src={four.image} alt="Elements panel" width={420} height={420} className={styles.ImgContain} />
                    )}
                </div>
            </article>
        </section>
    )
}

export default Four

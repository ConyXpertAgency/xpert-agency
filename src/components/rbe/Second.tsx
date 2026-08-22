import React from 'react'
import styles from '@/styles/rbe/Second.module.css'
import Image from 'next/image'
import RichText from '../ui/RichText'
import type { RbeSecond } from '@/lib/supabase/types'
import { sectionBgClass, sectionBgStyle } from '@/lib/sectionBg'

interface SecondProps {
    second: RbeSecond
}

const Second = ({ second }: SecondProps) => {
    return (
        <section className={`${styles.Second} ${sectionBgClass(second)}`} style={sectionBgStyle(second)}>
            <Image src={second.image} alt='need rbe' width={620} height={620} />
            <article className={styles.Right}>
                <strong className='details'><RichText>{second.badge}</RichText></strong>
                <header className={styles.Text}>
                    <h1><RichText>{second.title}</RichText></h1>
                    <p><RichText>{second.text}</RichText></p>
                </header>
                <ul className={styles.List}>
                    {second.list.map((item, i) => (
                        <li key={i}>
                            <div><RichText>{item.number}</RichText></div>
                            <p><RichText>{item.text}</RichText></p>
                        </li>
                    ))}
                </ul>
                <span className={styles.TextCard}>
                    <p><RichText>{second.text_card}</RichText></p>
                </span>
                <footer className={styles.RBEfocus}>
                    <Image src={second.focus.icon} alt='rbe icon' width={80} height={80} />
                    <span>
                        <strong className='details'><RichText>{second.focus.badge}</RichText></strong>
                        <h1><RichText>{second.focus.title}</RichText></h1>
                    </span>
                </footer>
            </article>
        </section>
    )
}

export default Second

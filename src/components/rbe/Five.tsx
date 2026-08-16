import React from 'react'
import styles from '@/styles/rbe/Five.module.css'
import Image from 'next/image'
import PictureSvg from '../ui/PictureSvg'
import RichText from '../ui/RichText'
import { SlTarget } from 'react-icons/sl'
import { getIcon } from '@/lib/supabase/icons'
import type { RbeFive } from '@/lib/supabase/types'

interface FiveProps {
    five: RbeFive
}

const Five = ({ five }: FiveProps) => {
    return (
        <section className={styles.Five}>
            <header className={styles.Header}>
                <h1><RichText>{five.title}</RichText></h1>
                <p><RichText>{five.subtitle}</RichText></p>
            </header>
            <section className={styles.Content}>
                <picture>
                    <Image src={five.image} alt='rbe meaning' width={600} height={600} />
                </picture>
                <ul>
                    {five.items.map((item, i) => (
                        <li key={i}>
                            <PictureSvg icon={getIcon(item.icon)} variant='full' size={28} width={5} height={5} />
                            <span className={styles.CardTxt}>
                                <h1><RichText>{item.title}</RichText></h1>
                                <p><RichText>{item.text}</RichText></p>
                            </span>
                            <div><RichText>{item.letter}</RichText></div>
                        </li>
                    ))}
                </ul>
            </section>
            <footer className={styles.Footer}>
                <PictureSvg icon={SlTarget} variant='full' size={28} height={4} width={4}/>
                <strong><RichText>{five.footer_text}</RichText></strong>
            </footer>
        </section>
    )
}

export default Five
